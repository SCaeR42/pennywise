import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import LoginForm from '@/pages/Login.vue'
import {createPinia, setActivePinia} from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { useToast } from '@/composables/useToast'
import { createRouter, createWebHistory, type Router } from 'vue-router'
import { routes } from '@/router'


describe('LoginForm.vue - Валидация при отправке', () => {
    let router: Router

    beforeEach(() => {

        setActivePinia(createPinia())

        const authStore = useAuthStore()

        router = createRouter({
            history: createWebHistory(import.meta.env.BASE_URL),
            routes: routes,
        })
    })


    it('должен отображать ошибку обязательного заполнения при отправке пустой формы', async () => {

        await router.push({name: 'Login'})
        await router.isReady()

        const wrapper = mount(LoginForm, {
            global: {
                plugins: [router],
            },
        })

        const form = wrapper.find('form')

        await form.trigger('submit')
        // Критически важно для асинхронного vee-validate!
        await flushPromises()


        // Должны триггернуться required_error из Zod-схемы
        expect(wrapper.html()).toContain('Email обязателен для заполнения')
        expect(wrapper.html()).toContain('Пароль обязателен для заполнения')
    })
})
