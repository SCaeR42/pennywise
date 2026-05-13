import { ref, watch } from 'vue'
import { useDataStore } from '@/stores/data.ts'

/**
 * Composables для управления состоянием боковой панели (sidebar)
 * Сохраняет состояние `sideBarCollapsed` в UserSettings через Pinia store
 */
export function useSidebar() {
  const dataStore = useDataStore()

  /**
   * Реактивное состояние сворачивания сайдбара
   * Инициализируется из store (localStorage) при первом вызове
   */
  const sideBarCollapsed = ref(dataStore.settings.sideBarCollapsed)

  /**
   * Синхронизация с store: если settings.sideBarCollapsed изменился
   * из другого места (например, из другого компонента), обновляем локальное значение
   */
  watch(
    () => dataStore.settings.sideBarCollapsed,
    (newVal) => {
      sideBarCollapsed.value = newVal
    }
  )

  /**
   * Переключение состояния сайдбара (сворачивание/разворачивание)
   * Сохраняет новое значение в store (автоматически в localStorage)
   */
  const toggleSidebar = () => {
    sideBarCollapsed.value = !sideBarCollapsed.value
    dataStore.updateSettings({ sideBarCollapsed: sideBarCollapsed.value })
  }

  return {
    sideBarCollapsed,
    toggleSidebar
  }
}