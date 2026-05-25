/**
 * Pinia Store — управление финансовыми счетами
 *
 * Отвечает за:
 * - Хранение пользовательских счетов в localStorage
 * - CRUD-операции над счетами
 * - Вычисление effectiveAccounts с учётом demoMode из useSettingsStore
 *
 * @module useAccountStore
 */
import { defineStore } from 'pinia'
import { reactive, computed, watch } from 'vue'
import type { Account } from '@/types/finance'
import { getItem, setItem, generateId } from '@/lib/storage'
import { DEFAULT_ACCOUNTS } from '@/lib/defaults'
import { DEMO_ACCOUNTS } from '@/lib/demoData'
import { useSettingsStore } from '@/stores/settings'

export const useAccountStore = defineStore('accounts', () => {
    // ==================== State ====================

    const state = reactive({
        accounts: getItem<Account[]>('accounts', DEFAULT_ACCOUNTS),
    })

    // Автосинхронизация с localStorage
    watch(
        state,
        (s) => setItem('accounts', s.accounts),
        { deep: true }
    )

    // ==================== Computed ====================

    /**
     * Эффективный список счетов.
     * В demoMode возвращает DEMO_ACCOUNTS + пользовательские,
     * иначе — только пользовательские.
     */
    const accounts = computed(() => {
        const settingsStore = useSettingsStore()
        const accs = state.accounts || []
        return settingsStore.demoMode ? [...DEMO_ACCOUNTS, ...accs] : accs
    })

    // ==================== Actions ====================

    /**
     * Добавить новый счёт
     * @param a Данные счёта без id
     */
    const addAccount = (a: Omit<Account, 'id'>) => {
        state.accounts = [...state.accounts, { ...a, id: generateId() }]
    }

    /**
     * Обновить существующий счёт
     * @param id Идентификатор счёта
     * @param patch Поля для обновления
     */
    const updateAccount = (id: string, patch: Partial<Account>) => {
        state.accounts = state.accounts.map(x => x.id === id ? { ...x, ...patch } : x)
    }

    /**
     * Удалить счёт по ID
     * @param id Идентификатор счёта
     */
    const deleteAccount = (id: string) => {
        state.accounts = state.accounts.filter(x => x.id !== id)
    }

    // ==================== Public API ====================

    return {
        accounts,
        addAccount,
        updateAccount,
        deleteAccount,
    }
})
