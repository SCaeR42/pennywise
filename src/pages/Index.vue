<template>
  <div class="min-h-screen bg-background">
    <!-- Header -->
    <header class="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <div class="container mx-auto flex h-14 items-center justify-between px-4">
        <div class="flex items-center gap-2">
          <Wallet class="h-6 w-6 text-primary"/>
          <a href="/" class="text-lg font-bold text-foreground">{{ APP_CONFIG.NAME }}</a>
        </div>
        <nav class="flex items-center gap-2">

          <button
              class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9 cursor-pointer"
              @click="toggleTheme"
          >
            <Sun v-if="themeStore.resolvedTheme === 'dark'" class="h-4 w-4"/>
            <Moon v-else class="h-4 w-4"/>
          </button>

          <template v-if="authStore.isAuthenticated">
            <RouterLink
                to="/app/dashboard"
                class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-3"
            >
              Личный кабинет
            </RouterLink>

            <RouterLink
                to="/logout"
                class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-3 cursor-pointer"
                @click="authStore.logout()"
            >
              Выйти
            </RouterLink>

            <RouterLink
                to="/testui"
                class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-3"
            >
              testUI
            </RouterLink>
          </template>
          <template v-else>
            <RouterLink
                to="/login"
                class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-3"
            >
              Войти
            </RouterLink>

            <RouterLink
                to="/register"
                class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-3"
            >
              Регистрация
            </RouterLink>
          </template>


        </nav>
      </div>
    </header>

    <Hero/>
    <Features/>
    <Pricing/>
    <FAQ/>
    <Footer/>
  </div>
</template>

<script setup lang="ts">
import {RouterLink} from 'vue-router'
import {Wallet, Moon, Sun} from 'lucide-vue-next'
import {useAuthStore} from '@/stores/auth'
import {useThemeStore} from '@/stores/theme'
import { APP_CONFIG } from '@/constants';

const authStore = useAuthStore()
const themeStore = useThemeStore()

const toggleTheme = () => {
  themeStore.setTheme(themeStore.resolvedTheme === 'dark' ? 'light' : 'dark')
}

</script>
