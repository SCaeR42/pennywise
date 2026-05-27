/**
 * Pinia Store — настройки пользователя и режим демонстрации
 *
 * Отвечает за:
 * - Персистентные настройки UI (rowsPerPage, theme, sideBarCollapsed)
 * - Глобальный флаг demoMode, который влияет на все доменные сторы
 *
 * @module useSettingsStore
 */
import {defineStore} from 'pinia'
import {ref, watch, readonly} from 'vue'
import type {UserSettings} from '@/types/finance'
import {getItem, setItem} from '@/lib/storage'

export const useSettingsStore = defineStore('settings', () => {

    // ==================== State ====================
    const settings = ref<UserSettings>(
        getItem('settings', {rowsPerPage: 10, theme: 'light', sideBarCollapsed: false})
    )
    const demoMode = ref<boolean>(getItem('demoMode', true))

    const updateSettings = (s: Partial<UserSettings>) => {
        settings.value = {...settings.value, ...s}
    }

    const setDemoMode = (v: boolean) => {
        demoMode.value = v
    }

    const toggleSidebar = () => {
        settings.value.sideBarCollapsed = !settings.value.sideBarCollapsed
    }

    // Автосинхронизация с localStorage
    watch(settings, (newSettings) => setItem('settings', newSettings), {deep: true})
    watch(demoMode, (newMode) => setItem('demoMode', newMode))


    // ==================== Public API ====================

    return {
        settings: readonly(settings), // Защищаем стейт от прямых мутаций снаружи
        demoMode: readonly(demoMode),
        updateSettings,
        toggleSidebar,
        setDemoMode
    }
})

