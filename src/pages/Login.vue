<template>
  <div class="flex min-h-screen items-center justify-center bg-background p-4">
    <div class="w-full max-w-md rounded-lg border bg-card text-card-foreground shadow-sm">
      <div class="flex flex-col space-y-1.5 p-6 text-center">
        <div class="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <Wallet class="h-6 w-6 text-primary"/>
        </div>
        <h3 class="text-2xl font-semibold leading-none tracking-tight">Вход</h3>
        <p class="text-sm text-muted-foreground">Войдите в свой аккаунт {{ APP_CONFIG.NAME }}</p>
      </div>

      <form @submit="handleSubmit">
        <div class="p-6 pt-0 space-y-4">

          <div class="space-y-2">
            <label for="email" class="text-sm font-medium leading-none">
              Email
            </label>
            <input
                id="email"
                v-model="email"
                v-bind="emailProps"
                type="email"
                placeholder="mail@example.com"
                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                :class="{ 'border-destructive focus-visible:ring-destructive': errors.email }"
            />
            <p class="text-sm text-destructive" v-if="errors.email">
              {{ errors.email }}
            </p>
          </div>

          <div class="space-y-2">
            <label for="password" class="text-sm font-medium leading-none">
              Пароль
            </label>
            <input
                id="password"
                v-model="password"
                v-bind="passwordProps"
                type="password"
                placeholder="••••••••"
                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                :class="{ 'border-destructive focus-visible:ring-destructive': errors.password }"
            />
            <p class="text-sm text-destructive" v-if="errors.password">
              {{ errors.password }}
            </p>
          </div>
        </div>

        <div class="flex flex-col gap-4 p-6 pt-0">
          <button
              type="submit"
              class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full cursor-pointer"
          >
            Войти
          </button>
          <p class="text-sm text-muted-foreground">
            Нет аккаунта?
            <RouterLink to="/register" class="text-primary hover:underline">Зарегистрироваться</RouterLink>
          </p>
        </div>
      </form>

      <div class="flex flex-col items-center gap-3 p-6 pt-0">
        <span class="text-sm text-muted-foreground">Войти как DEMO:</span>
        <div class="flex flex-row gap-2">
          <button
              type="button"
              @click="fillDemoUser"
              class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-amber-600 text-primary-foreground hover:bg-amber-600/90 h-10 px-4 py-2 cursor-pointer"
          >
            Пользователь
          </button>
          <button
              type="button"
              @click="fillDemoAdmin"
              class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-fuchsia-900 text-primary-foreground hover:bg-fuchsia-900/90 h-10 px-4 py-2 cursor-pointer"
          >
            Админ
          </button>
        </div>
      </div>


    </div>
  </div>
</template>

<script setup lang="ts">
import {useRouter, RouterLink} from 'vue-router'
import {useAuthStore} from '@/stores/auth'
import {useToast} from '@/composables/useToast'
import {Wallet} from 'lucide-vue-next'
import {APP_CONFIG} from '@/constants'
import {useForm} from 'vee-validate'
import * as z from 'zod'
import {toTypedSchema} from '@vee-validate/zod'

// 1. Схема валидации Zod
const schema = z.object({
  email: z
      .string({ required_error: 'Email обязателен для заполнения' })
      .email('Введите корректный email'),       // Перехватит невалидный формат
  password: z
      .string({ required_error: 'Пароль обязателен для заполнения' })
      .min(6, 'Пароль должен содержать минимум 6 символов')
})


// 2. Инициализация формы приложения
const {errors, handleSubmit: handleFormSubmit, defineField} = useForm({
  validationSchema: toTypedSchema(schema),
  // initialValues: {
  //   email: 'mail@example.com',
  //   password: '12345',
  // },
})

// 3. Создание реактивных связок для инпутов из текущего контекста формы
// Опции по умолчанию автоматически включают валидацию по событиям blur и change
const [email, emailProps] = defineField('email')
const [password, passwordProps] = defineField('password')

const authStore = useAuthStore()
const router = useRouter()
const {toast} = useToast()

// 4. Безопасный обработчик отправки формы
const handleSubmit = handleFormSubmit((values) => {
  console.log('Поля формы валидны:', values)

  // if (authStore.login(values.email, values.password)) {
  //   toast.success('Добро пожаловать!')
  //   router.push('/app/dashboard')
  // } else {
  //   toast.error('Неверный email или пароль')
  // }

  if (authStore.loginByJwt(values.email, values.password)) {
    toast.success('Добро пожаловать!')
    router.push('/app/dashboard')
  } else {
    toast.error('Неверный email или пароль')
  }
})

const fillDemoAdmin = () => {
  email.value = authStore.DEMO_USERS.admin.email
  password.value = authStore.DEMO_USERS.admin.password
}

const fillDemoUser = () => {
  email.value = authStore.DEMO_USERS.user.email
  password.value = authStore.DEMO_USERS.user.password
}

</script>