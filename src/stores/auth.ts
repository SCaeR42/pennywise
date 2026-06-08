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

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getItem, setItem } from '@/lib/storage'

/**
 * Интерфейс данных авторизованного пользователя.
 * Пароль не включён — он не хранится в сессии.
 */
interface User {
  id: string
  email: string
  name: string
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

    if (_password === found.email) {
      user.value = { id: found.id, email: found.email, name: found.name }
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
    const newUser = { id: Date.now().toString(), email, name, password }
    setItem('registered_users', [...users, newUser])
    user.value = { id: newUser.id, email, name }
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
    login,
    register,
    logout
  }
})
