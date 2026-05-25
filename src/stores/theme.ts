/**
 * Theme Store — управление темой оформления приложения
 *
 * Поддерживает три режима: 'light', 'dark', 'system'.
 * При выборе 'system' тема определяется автоматически
 * через системные настройки пользователя (prefers-color-scheme).
 *
 * Использует localStorage для сохранения выбора между сессиями.
 */

import { defineStore } from 'pinia'
import { ref, computed, watch, readonly } from 'vue'
import { getItem, setItem } from '@/lib/storage'

/**
 * Тип допустимых значений темы:
 * - 'light' — светлая тема
 * - 'dark' — тёмная тема
 * - 'system' — автоматическое определение по настройкам ОС
 */
type Theme = 'light' | 'dark' | 'system'

/**
 * Определяет текущую системную тему через CSS Media Query.
 *
 * @returns 'dark' если в ОС включена тёмная тема, иначе 'light'
 */
function getSystemTheme(): 'light' | 'dark' {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

/**
 * Pinia-хранилище для управления темой.
 *
 * Реализовано через Composition API (setup-функция),
 * что является рекомендуемым паттерном для Pinia.
 */
export const useThemeStore = defineStore('theme', () => {
  /**
   * Выбранная пользователем тема.
   * Инициализируется значением из localStorage или 'dark' по умолчанию.
   */
  const theme = ref<Theme>(getItem('theme', 'dark' as Theme))

  /**
   * Вычисленная (resolved) тема — всегда 'light' или 'dark'.
   * Если пользователь выбрал 'system', возвращает текущую системную тему.
   */
  const resolvedTheme = computed<'light' | 'dark'>(() =>
    theme.value === 'system' ? getSystemTheme() : theme.value
  )

  /**
   * Устанавливает новую тему.
   *
   * @param t — новое значение темы ('light' | 'dark' | 'system')
   */
  const setTheme = (t: Theme) => {
      theme.value = t
  }

  /**
   * Реагирует на изменения темы и resolved-темы.
   *
   * При каждом изменении:
   * 1. Сохраняет выбранную тему в localStorage
   * 2. Переключает CSS-класс 'dark' на <html> элементе
   *
   * Опция { immediate: true } запускает watcher сразу при создании стора,
   * чтобы применить сохранённую тему при загрузке страницы.
   */
  watch([theme, resolvedTheme], () => {
    setItem('theme', theme.value)
    document.documentElement.classList.toggle('dark', resolvedTheme.value === 'dark')
  }, { immediate: true })

  return {
    theme: readonly(theme),
    resolvedTheme,
    setTheme
  }
})
