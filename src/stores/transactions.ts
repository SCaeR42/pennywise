/**
 * Pinia Store — управление финансовыми транзакциями
 *
 * Отвечает за:
 * - Хранение пользовательских транзакций в localStorage
 * - CRUD-операции над транзакциями
 * - Вычисление effectiveTransactions с учётом demoMode из useSettingsStore
 *
 * @module useTransactionStore
 */
import { defineStore } from 'pinia'
import { reactive, computed, watch } from 'vue'
import type { Transaction } from '@/types/finance'
import { getItem, setItem, generateId } from '@/lib/storage'
import { getDemoTransactions } from '@/lib/demoData'
import { useSettingsStore } from '@/stores/settings'

export const useTransactionStore = defineStore('transactions', () => {
    // ==================== State ====================

    const state = reactive({
        transactions: getItem<Transaction[]>('transactions', []),
    })

    // Автосинхронизация с localStorage
    watch(
        state,
        (s) => setItem('transactions', s.transactions),
        { deep: true }
    )

    // ==================== Computed ====================

    /**
     * Эффективный список транзакций.
     * В demoMode демо-транзакции идут первыми (видны в начале списка),
     * затем пользовательские.
     */
    const transactions = computed(() => {
        const settingsStore = useSettingsStore()
        const txs = state.transactions || []
        return settingsStore.demoMode ? [...getDemoTransactions(), ...txs] : txs
    })

    // ==================== Actions ====================

    /**
     * Добавить новую транзакцию
     * @param t Данные транзакции без id и createdAt (генерируются автоматически)
     */
    const addTransaction = (t: Omit<Transaction, 'id' | 'createdAt'>) => {
        state.transactions = [
            ...state.transactions,
            { ...t, id: generateId(), createdAt: new Date().toISOString() },
        ]
    }

    /**
     * Обновить существующую транзакцию
     * @param id Идентификатор транзакции
     * @param patch Поля для обновления
     */
    const updateTransaction = (id: string, patch: Partial<Transaction>) => {
        state.transactions = state.transactions.map(x => x.id === id ? { ...x, ...patch } : x)
    }

    /**
     * Удалить транзакцию по ID
     * @param id Идентификатор транзакции
     */
    const deleteTransaction = (id: string) => {
        state.transactions = state.transactions.filter(x => x.id !== id)
    }

    // ==================== Public API ====================

    return {
        transactions,
        addTransaction,
        updateTransaction,
        deleteTransaction,
    }
})
