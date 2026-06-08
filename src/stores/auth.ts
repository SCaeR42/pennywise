/**
 * Auth Store — управление состоянием аутентификации пользователя
 *
 * Реализует mock-авторизацию (без бэкенда) для демонстрационных целей.
 * Данные пользователей хранятся в localStorage.
 *
 * > [!WARNING]
 * > В продакшене необходимо заменить на реальную работу с API
 * > (JWT-токены, HTTP-only cookies и т.д.).
 */

import {defineStore} from 'pinia'
import {computed, ref} from 'vue'
import {getItem, setItem} from '@/lib/storage'
import { jwtDecode } from 'jwt-decode'
import type { JwtPayload } from 'jwt-decode'

/**
 * Интерфейс данных авторизованного пользователя.
 * Пароль не включён — он не хранится в сессии.
 */
interface User {
    id: string
    email: string
    name: string
    role: string
    jwttoken: string
}

// Расширяем стандартный payload вашими кастомными полями
export interface CustomJwtPayload extends JwtPayload {
    role: string
    name: string
    email: string
}

/**
 * Pinia-хранилище для управления состоянием аутентификации.
 *
 * Реализовано через Composition API (setup-функция).
 */
export const useAuthStore = defineStore('auth', () => {
    /**
     * Текущий авторизованный пользователь.
     * `null` если пользователь не вошёл в систему.
     * Инициализируется из localStorage при загрузке.
     */
    const user = ref<User | null>(getItem('auth_user', null))

    /**
     * Вычисляемое свойство: true если пользователь авторизован.
     * Удобно для использования в guards и v-if директивах.
     */
    const isAuthenticated = computed(() => !!user.value)

    /**
     * Выполняет вход пользователя по email и паролю.
     *
     * Логика (mock):
     * 1. Ищет пользователя в localStorage по email.
     * 2. Если найден — устанавливает его как текущего.
     * 3. Если не найден — создаёт демо-пользователя (auto-login).
     *
     * @param email — email пользователя
     * @param _password — пароль (в mock-режиме не проверяется)
     * @returns true при успешном входе
     */
    const login = (email: string, _password: string): boolean => {
        const users = getItem<Array<User & { password: string }>>('registered_users', [])
        const found = users.find(u => u.email === email)

        if (!found) {
            return false
        }

        if (_password === found.password) {
            user.value = {role: 'user', id: found.id, email: found.email, name: found.name, jwttoken: ''}
            setItem('auth_user', user.value)
            return true
        }
        // Демо: автоматический вход для несуществующего email
        // user.value = { id: '1', email, name: email.split('@')[0] }
        // setItem('auth_user', user.value)
        // return true

        return false
    }

    /**
     * Демо-пользователи для быстрой авторизации без регистрации.
     */
    const DEMO_USERS = {
        'admin': {
            email: 'admin@example.com', password: '123456', name: 'Администратор', role: 'admin',
            jwttoken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbkBleGFtcGxlLmNvbSIsIm5hbWUiOiLQotC10YHRgiDQotC10YHRgtC-0LLQuNGHINCQ0LTQvNC40L3QuNGB0YLRgNCw0YLQvtGAIiwiYWRtaW4iOnRydWUsInJvbGUiOiJhZG1pbiIsImlhdCI6MTUxNjIzOTAyMiwiZXhwIjoxODEyNDc0NjU4fQ.uyTKul91WDaYBht7YglTAP2qfaIF5n4o6MnOWYyxGSE'
        },
        'user': {
            email: 'user@example.com', password: '123456', name: 'Пользователь', role: 'user',
            jwttoken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyQGV4YW1wbGUuY29tIiwibmFtZSI6ItCi0LXRgdGCINCi0LXRgdGC0L7QstC40Ycg0J_QvtC70YzQt9C-0LLQsNGC0LXQu9GMIiwiYWRtaW4iOnRydWUsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE4MTI0NzQ2NTh9.cMNI9o-3hI2b7DrsPJmyZDcAWxfNwiER3g3rMgwZalw'
        },
    }


    const loginByJwt = (email: string, password: string): boolean => {
        // 1. Проверка демо-пользователей (поиск по значениям объекта)
        const demoUser = Object.values(DEMO_USERS).find(u => u.email === email && u?.password === password)

        if (demoUser) {
            // const jwttokenDecoded = jwtDecode(demoUser.jwttoken)
            // Передаем CustomJwtPayload в качестве дженерика
            const jwttokenDecoded = jwtDecode<CustomJwtPayload>(demoUser.jwttoken)
            console.log('jwttokenDecoded', jwttokenDecoded);
            user.value = {jwttoken: demoUser.jwttoken, role: jwttokenDecoded.role, id: `demo-${jwttokenDecoded.role}`, email: jwttokenDecoded.sub ?? '', name: jwttokenDecoded.name }
            setItem('auth_user', user.value)
            return true
        }

        // 2. Проверка зарегистрированных пользователей
        const users = getItem<Array<User & { password: string }>>('registered_users', [])
        const found = users.find(u => u.email === email && u.password === password)

        if (found) {
            user.value = {role: 'user', id: found.id, email: found.email, name: found.name, jwttoken: '' }
            setItem('auth_user', user.value)
            return true
        }

        return false
    }

    /**
     * Регистрирует нового пользователя.
     *
     * Логика:
     * 1. Проверяет, не занят ли email.
     * 2. Если свободен — создаёт запись и сразу авторизует.
     *
     * @param email — email нового пользователя
     * @param password — пароль (хранится в localStorage в открытом виде — только для демо!)
     * @param name — отображаемое имя
     * @returns true при успешной регистрации, false если email уже занят
     */
    const register = (email: string, password: string, name: string): boolean => {
        const users = getItem<Array<User & { password: string }>>('registered_users', [])
        if (users.find(u => u.email === email)) return false
        const newUser = {id: Date.now().toString(), email, name, password}
        setItem('registered_users', [...users, newUser])
        user.value = {jwttoken: '', role: 'user', id: newUser.id, email, name}
        setItem('auth_user', user.value)
        return true
    }

    /**
     * Выполняет выход пользователя из системы.
     *
     * Очищает реактивную переменную и удаляет запись из localStorage.
     */
    const logout = () => {
        user.value = null
        localStorage.removeItem('auth_user')
    }

    return {
        user,
        isAuthenticated,
        DEMO_USERS,
        login,
        loginByJwt,
        register,
        logout
    }
})
