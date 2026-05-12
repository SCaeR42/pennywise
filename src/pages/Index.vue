<template>
  <div class="min-h-screen bg-background">
    <!-- Header -->
    <header class="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <div class="container mx-auto flex h-14 items-center justify-between px-4">
        <div class="flex items-center gap-2">
          <Wallet class="h-6 w-6 text-primary" />
          <a href="/" class="text-lg font-bold text-foreground">PennyWise</a>
        </div>
        <nav class="flex items-center gap-2">

          <button
              class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9 cursor-pointer"
              @click="toggleTheme"
          >
            <Sun v-if="themeStore.resolvedTheme === 'dark'" class="h-4 w-4" />
            <Moon v-else class="h-4 w-4" />
          </button>



        </nav>
      </div>
    </header>

    <Hero />
    <Features />
    <Pricing />
    <FAQ />
    <Footer />
  </div>
</template>

<script setup lang="ts">
// import { RouterLink } from 'vue-router'
import { Wallet, Moon, Sun } from 'lucide-vue-next'
import { useThemeStore } from '@/stores/theme'


const themeStore = useThemeStore()

const toggleTheme = () => {
  themeStore.setTheme(themeStore.resolvedTheme === 'dark' ? 'light' : 'dark')
}
</script>
