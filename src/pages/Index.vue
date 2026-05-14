<template>
  <div class="min-h-screen bg-background">
    <!-- Header -->
    <header class="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <div class="container mx-auto flex h-14 items-center justify-between px-4">

        <AppLogo />

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
                :class="btnClass"
            >
              Личный кабинет
            </RouterLink>

            <RouterLink
                to="/logout"
                :class="btnClass"
                @click="authStore.logout()"
            >
              Выйти
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
                :class="btnClass"
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
import {Moon, Sun} from 'lucide-vue-next'
import {useAuthStore} from '@/stores/auth'
import {useThemeStore} from '@/stores/theme'
import Hero from '@/components/landing/Hero.vue'
import Features from '@/components/landing/Features.vue'
import Pricing from '@/components/landing/Pricing.vue'
import FAQ from '@/components/landing/FAQ.vue'
import Footer from '@/components/landing/Footer.vue'
import AppLogo from '@/components/common/AppLogo.vue'

const authStore = useAuthStore()
const themeStore = useThemeStore()

const btnClass = 'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-3 cursor-pointer'

const toggleTheme = () => {
  themeStore.setTheme(themeStore.resolvedTheme === 'dark' ? 'light' : 'dark')
}

const baseUrl = import.meta.env.BASE_URL

</script>
