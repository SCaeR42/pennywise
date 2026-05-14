<template>
  <div class="flex min-h-screen items-center justify-center bg-background p-4">
    <div class="w-full max-w-md rounded-lg border bg-card text-card-foreground shadow-sm">
      <div class="flex flex-col space-y-1.5 p-6 text-center">
        <div class="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <Wallet class="h-6 w-6 text-primary" />
        </div>
        <h3 class="text-2xl font-semibold leading-none tracking-tight">Вход</h3>
        <p class="text-sm text-muted-foreground">Войдите в свой аккаунт {{ APP_CONFIG.NAME }}</p>
      </div>
      <form @submit.prevent="handleSubmit">
        <div class="p-6 pt-0 space-y-4">
          <div class="space-y-2">
            <label for="email" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Email
            </label>
            <input
              id="email"
              v-model="email"
              type="email"
              required
              placeholder="mail@example.com"
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <div class="space-y-2">
            <label for="password" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Пароль
            </label>
            <input
              id="password"
              v-model="password"
              type="password"
              required
              placeholder="••••••••"
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        </div>
        <div class="flex flex-col gap-4 p-6 pt-0">
          <button
            type="submit"
            class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
          >
            Войти
          </button>
          <p class="text-sm text-muted-foreground">
            Нет аккаунта?
            <RouterLink to="/register" class="text-primary hover:underline">Зарегистрироваться</RouterLink>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useToast } from '@/composables/useToast'
import { Wallet } from 'lucide-vue-next'
import {APP_CONFIG} from '@/constants';

const email = ref('mail@example.com')
const password = ref('123')
const authStore = useAuthStore()
const router = useRouter()
const { toast } = useToast()

const handleSubmit = () => {
  if (authStore.login(email.value, password.value)) {
    toast.success('Добро пожаловать!')
    router.push('/app/dashboard')
  } else {
    toast.error('Неверный email или пароль')
  }
}
</script>
