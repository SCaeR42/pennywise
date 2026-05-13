<template>
  <div class="min-h-screen flex w-full">
    <!-- Сайдбар (фиксированный, не скролится) -->
    <AppSidebar />

    <!-- Основной контент (с отступом слева для сайдбара) -->
    <div class="flex-1 flex flex-col min-w-0 transition-margin duration-200">
      <!-- Заголовок страницы с кнопкой бургер-меню -->
      <header class="h-14 flex items-center border-b px-4 ">
        <button
          class="mr-4 h-8 w-8 flex items-center justify-center rounded-md hover:bg-muted/50"
          @click="toggleSidebar"
        >
          <Menu class="h-4 w-4" />
        </button>
        <h1 class="text-lg font-semibold">{{ pageTitle }}</h1>
      </header>

      <!-- Контент страницы (скролится) -->
      <main class="flex-1 p-6 overflow-y-auto">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import AppSidebar from './AppSidebar.vue'
import { Menu } from 'lucide-vue-next'
import { useSidebar } from '@/composables/useSidebar'
import {APP_CONFIG} from '@/constants';

const route = useRoute()
const { toggleSidebar } = useSidebar()

/** Заголовок текущей страницы */
const pageTitle = computed(() => {
  const titles: Record<string, string> = {
    'Dashboard': 'Дашборд',
    'Transactions': 'Транзакции',
    'TransactionNew': 'Новая транзакция',
    'TransactionEdit': 'Редактировать транзакцию',
    'Categories': 'Категории',
    'Accounts': 'Счета',
    'Tags': 'Теги',
    'Settings': 'Настройки'
  }
  return titles[route.name as string] || APP_CONFIG.NAME
})
</script>
