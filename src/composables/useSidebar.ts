import { ref, watch } from 'vue'
import { useSettingsStore } from '@/stores/settings'

/**
 * Composable для управления состоянием боковой панели (sidebar).
 * Сохраняет состояние `sideBarCollapsed` в useSettingsStore (localStorage).
 */
export function useSidebar() {
  const settingsStore = useSettingsStore()

  /**
   * Реактивное состояние сворачивания сайдбара.
   * Инициализируется из store (localStorage) при первом вызове.
   */
  const sideBarCollapsed = ref(settingsStore.settings.sideBarCollapsed)

  /**
   * Синхронизация с store: если settings.sideBarCollapsed изменился
   * из другого места (например, из другого компонента), обновляем локальное значение.
   */
  watch(
    () => settingsStore.settings.sideBarCollapsed,
    (newVal) => {
      sideBarCollapsed.value = newVal
    }
  )

  /**
   * Переключение состояния сайдбара (сворачивание/разворачивание).
   * Сохраняет новое значение в store (автоматически в localStorage).
   */
  const toggleSidebar = () => {
    sideBarCollapsed.value = !sideBarCollapsed.value
    settingsStore.updateSettings({ sideBarCollapsed: sideBarCollapsed.value })
  }

  return {
    sideBarCollapsed,
    toggleSidebar,
  }
}