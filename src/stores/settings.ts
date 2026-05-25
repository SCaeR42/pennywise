/**
 * Pinia Store — настройки пользователя и режим демонстрации
 *
 * Отвечает за:
 * - Персистентные настройки UI (rowsPerPage, theme, sideBarCollapsed)
 * - Глобальный флаг demoMode, который влияет на все доменные сторы
 *
 * @module useSettingsStore
 */
import { defineStore } from 'pinia'
import { reactive, computed, watch } from 'vue'
import type { UserSettings } from '@/types/finance'
import { getItem, setItem } from '@/lib/storage'

export const useSettingsStore = defineStore('settings', () => {
    // ==================== State ====================

    const state = reactive({
        settings: getItem<UserSettings>('settings', {
            rowsPerPage: 10,
            theme: 'light' as const,
            sideBarCollapsed: false,
        }),
        demoMode: getItem<boolean>('demoMode', true),
    })

    // Автосинхронизация с localStorage
    watch(
        state,
        (s) => {
            setItem('settings', s.settings)
            setItem('demoMode', s.demoMode)
        },
        { deep: true }
    )

    // ==================== Computed ====================

    const settings = computed(() => state.settings)
    const demoMode = computed(() => state.demoMode)

    // ==================== Actions ====================

    /**
     * Частичное обновление настроек пользователя
     * @param patch Поля для обновления
     */
    const updateSettings = (patch: Partial<UserSettings>) => {
        state.settings = { ...state.settings, ...patch }
    }

    /**
     * Включить / выключить режим демонстрации
     * @param value Новое значение флага
     */
    const setDemoMode = (value: boolean) => {
        state.demoMode = value
    }

    // ==================== Public API ====================

    return {
        settings,
        demoMode,
        updateSettings,
        setDemoMode,
    }
})
