<template>
  <!-- Сайдбар приложения: фиксированный, не скролится -->
  <aside class="group peer text-sidebar-foreground md:block "
         :class="sideBarCollapsed ? 'w-14' : 'w-64'"
  >
    <!-- Логотип -->
    <div class="p-4 border-b h-14 ">

      <AppLogo :hideText="sideBarCollapsed"/>

    </div>

    <!-- Навигация -->
    <nav class="space-y-1 p-2 flex-1 overflow-y-auto">
      <RouterLink
          v-for="item in menuItems"
          :key="item.title"
          :to="item.url"
          class="flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors"
          :class="isActive(item.url) ? 'bg-muted text-primary font-medium' : 'hover:bg-muted/50'"
      >
        <component :is="item.icon" class="h-4 w-4"/>
        <span v-if="!sideBarCollapsed">{{ item.title }}</span>
      </RouterLink>
    </nav>

    <!-- Футер: демо-режим, тема, выход -->
    <div class="p-2 border-t space-y-1">
      <!-- Демо-режим -->
      <div
          v-if="!sideBarCollapsed"
          class="flex items-center gap-2 rounded-md px-3 py-2 text-sm cursor-pointer hover:bg-muted/50 transition-colors"
          @click="settingsStore.setDemoMode(!settingsStore.demoMode)"
      >
        <Database :class="settingsStore.demoMode ? 'text-primary' : 'text-muted-foreground'" class="h-4 w-4"/>
        <span v-if="!sideBarCollapsed" :class="settingsStore.demoMode ? 'text-primary font-medium' : 'text-muted-foreground'">Демо</span>
        <button
            role="switch"
            :aria-checked="settingsStore.demoMode"
            class="ml-auto relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50"
            :class="{ 'bg-primary': settingsStore.demoMode, 'bg-input': !settingsStore.demoMode }"
            @click.stop="settingsStore.setDemoMode(!settingsStore.demoMode)"
        >
          <span
              class="pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform duration-200 ease-in-out"
              :class="{ 'translate-x-4': settingsStore.demoMode, 'translate-x-0': !settingsStore.demoMode }"
          />
        </button>
      </div>

      <!-- Переключение темы -->
      <button
          class="flex items-center gap-2 rounded-md px-3 py-2 text-sm cursor-pointer hover:bg-muted/50 transition-colors w-full"
          @click="toggleTheme"
      >
        <Sun v-if="themeStore.resolvedTheme === 'dark'" class="h-4 w-4"/>
        <Moon v-else class="h-4 w-4"/>
        <span v-if="!sideBarCollapsed">{{ themeStore.resolvedTheme === 'dark' ? 'Светлая тема' : 'Тёмная тема' }}</span>
      </button>

      <!-- Выход -->
      <RouterLink
          to="/logout"
          class="flex items-center gap-2 rounded-md px-3 py-2 text-sm cursor-pointer hover:bg-muted/50 transition-colors w-full text-destructive"
      >
        <LogOut class="h-4 w-4"/>
        <span v-if="!sideBarCollapsed">Выйти</span>
      </RouterLink>

      <hr>

      <RouterLink
          to="/testui"
          class="flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors text-primary"
      >
        <component :is="BetweenHorizontalStart" class="h-4 w-4 text-primary"/>
        testUI
      </RouterLink>
    </div>
  </aside>
</template>

<script setup lang="ts">
import {ref, computed} from 'vue'
import {RouterLink, useRoute, useRouter} from 'vue-router'
import {useAuthStore} from '@/stores/auth'
import {useThemeStore}    from '@/stores/theme'
import {useSettingsStore} from '@/stores/settings'
import {
  BetweenHorizontalStart,
  LayoutDashboard,
  ArrowLeftRight,
  FolderOpen,
  CreditCard,
  Tags,
  Settings,
  LogOut,
  Sun,
  Moon,
  Database
} from 'lucide-vue-next'
import {useSidebar} from '@/composables/useSidebar'

const router = useRouter()
const route = useRoute()
const authStore     = useAuthStore()
const settingsStore = useSettingsStore()
const themeStore    = useThemeStore()
import AppLogo from '@/components/common/AppLogo.vue'

const {sideBarCollapsed} = useSidebar()

/** Пункты меню навигации */
const menuItems = [
  {title: 'Дашборд', url: '/app/dashboard', icon: LayoutDashboard},
  {title: 'Транзакции', url: '/app/transactions', icon: ArrowLeftRight},
  {title: 'Категории', url: '/app/categories', icon: FolderOpen},
  {title: 'Счета', url: '/app/accounts', icon: CreditCard},
  {title: 'Теги', url: '/app/tags', icon: Tags},
  {title: 'Настройки', url: '/app/settings', icon: Settings},
]

/** Проверка активности пункта меню */
const isActive = (url: string) => route.path === url

/** Переключение темы */
const toggleTheme = () => {
  themeStore.setTheme(themeStore.resolvedTheme === 'dark' ? 'light' : 'dark')
}


</script>
