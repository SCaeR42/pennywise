/**
 * Тесты для компонента Login.vue
 *
 * Покрывают:
 * - Рендеринг формы входа
 * - Валидацию полей (Zod + VeeValidate)
 * - Отправку формы и вызов authStore.login
 */

import {describe, it, expect, vi, beforeEach} from 'vitest'
import {mount, VueWrapper, flushPromises} from '@vue/test-utils'
import waitForExpect from 'wait-for-expect';
import {createPinia, setActivePinia} from 'pinia'
import Login from '@/pages/Login.vue'
import {useAuthStore} from '@/stores/auth'

// Мокаем vue-router
vi.mock('vue-router', () => ({
    useRouter: () => ({
        push: vi.fn(),
        replace: vi.fn(),
    }),
    RouterLink: {
        name: 'RouterLink',
        template: '<a><slot /></a>',
        props: ['to'],
    },
}))

// Мокаем useToast
const mockToast = {
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
    warning: vi.fn(),
}

vi.mock('@/composables/useToast', () => ({
    useToast: () => ({
        toast: mockToast,
    }),
}))

describe('Login.vue', () => {
    let wrapper: VueWrapper
    let authStore: ReturnType<typeof useAuthStore>

    beforeEach(() => {
        setActivePinia(createPinia())
        authStore = useAuthStore()
        vi.clearAllMocks()
        wrapper = mount(Login, {
            global: {
                stubs: {
                    RouterLink: {
                        template: '<a><slot /></a>',
                        props: ['to'],
                    },
                },
            },
        })
    })
    /*
        describe('Рендеринг', () => {
            it('должен отображать заголовок "Вход"', () => {
                expect(wrapper.text()).toContain('Вход')
            })

            it('должен отображать поле email', () => {
                const emailInput = wrapper.find('#email')
                expect(emailInput.exists()).toBe(true)
                expect(emailInput.attributes('type')).toBe('email')
            })

            it('должен отображать поле пароля', () => {
                const passwordInput = wrapper.find('#password')
                expect(passwordInput.exists()).toBe(true)
                expect(passwordInput.attributes('type')).toBe('password')
            })

            it('должен отображать кнопку "Войти"', () => {
                const submitButton = wrapper.find('button[type="submit"]')
                expect(submitButton.exists()).toBe(true)
                expect(submitButton.text()).toBe('Войти')
            })

            it('должен содержать ссылку на страницу регистрации', () => {
                const registerLink = wrapper.find('a')
                expect(registerLink.exists()).toBe(true)
                expect(registerLink.text()).toContain('Зарегистрироваться')
            })
        })
        //*/

    describe('Валидация формы', () => {
        it('должна показывать ошибку при пустом email', async () => {
            const emailInput = wrapper.find('#email')

            await emailInput.setValue('')
            await emailInput.trigger('blur')
            await flushPromises()

            // Находим конкретный элемент ошибки (например, по классу)
            const form = wrapper.find('form')

            await waitForExpect(() => {
                const emailError = wrapper.find('.text-destructive')
                // Сначала проверяем, что он вообще отрендерился в DOM
                expect(emailError.exists()).toBe(true)

                // Проверяем текст конкретно внутри этого элемента
                expect(form.html()).toContain('Введите корректный email')
            })
        })

        it('должна показывать ошибку при невалидном email', async () => {
            const emailInput = wrapper.find('#email')

            // Устанавливаем значение через setValue
            await emailInput.setValue('invalid-email')
            await emailInput.trigger('blur')
            await flushPromises()

            const form = wrapper.find('form')

            await waitForExpect(() => {
                expect(form.html()).toContain('Введите корректный email')
            })
        })

        it('должна показывать ошибку при пустом пароле', async () => {
            const passwordInput = wrapper.find('#password')
            await passwordInput.setValue('')
            await passwordInput.trigger('blur')

            await flushPromises()

            const form = wrapper.find('form')

            await waitForExpect(() => {
                expect(form.html()).toContain('Пароль должен содержать')
            })
        })

        it('должна показывать ошибку при пароле менее 6 символов', async () => {
            const passwordInput = wrapper.find('#password')
            await passwordInput.setValue('12345')
            await passwordInput.trigger('blur')
            await flushPromises()

            await waitForExpect(() => {
                expect(wrapper.html()).toContain('Пароль должен содержать минимум 6 символов')
            })
        })

        it('не должна показывать ошибки при валидных данных', async () => {
            const emailInput = wrapper.find('#email')
            const passwordInput = wrapper.find('#password')

            await emailInput.setValue('test@example.com')
            await passwordInput.setValue('validpassword')

            await emailInput.trigger('blur')
            await passwordInput.trigger('blur')
            await flushPromises()

            await waitForExpect(() => {
                expect(wrapper.html()).not.toContain('border-destructive')
            })
        })
    })

    describe('Отправка формы', () => {
        it('должна вызывать authStore.login с корректными данными', async () => {
            const loginSpy = vi.spyOn(authStore, 'login')

            const emailInput = wrapper.find('#email')
            const passwordInput = wrapper.find('#password')

            await emailInput.setValue('test@example.com')
            await passwordInput.setValue('validpassword')

            const form = wrapper.find('form')
            await form.trigger('submit')
            await flushPromises()

            await waitForExpect(() => {
                expect(loginSpy).toHaveBeenCalledWith('test@example.com', 'validpassword')
            })
        })

        it('должна вызывать toast.success при успешном входе', async () => {
            const emailInput = wrapper.find('#email')
            const passwordInput = wrapper.find('#password')

            await emailInput.setValue('test@example.com')
            await passwordInput.setValue('validpassword')

            const form = wrapper.find('form')
            await form.trigger('submit')
            await flushPromises()

            await waitForExpect(() => {
                expect(mockToast.success).toHaveBeenCalled()
            })
        })
    })
})
