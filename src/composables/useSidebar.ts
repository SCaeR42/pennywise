// src/composables/useSidebar.ts
import {computed} from 'vue'
import {useSettingsStore} from '@/stores/settings'

export function useSidebar() {
    const settingsStore = useSettingsStore()

    return {
        sideBarCollapsed: computed(() => settingsStore.settings.sideBarCollapsed),
        toggleSidebar: settingsStore.toggleSidebar
    }
}
