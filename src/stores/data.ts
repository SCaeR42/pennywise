/**
 * @deprecated Используйте специализированные сторы напрямую:
 *   - {@link useTransactionStore} из '@/stores/transactions'
 *   - {@link useCategoryStore}   из '@/stores/categories'
 *   - {@link useAccountStore}    из '@/stores/accounts'
 *   - {@link useTagStore}        из '@/stores/tags'
 *   - {@link useSettingsStore}   из '@/stores/settings'
 *
 * Этот файл является фасадом обратной совместимости.
 * Он делегирует все вызовы новым специализированным сторам,
 * сохраняя прежний публичный API useDataStore без изменений.
 */

// Re-export новых сторов для удобного импорта из одного места
export { useTransactionStore } from '@/stores/transactions'
export { useCategoryStore }    from '@/stores/categories'
export { useAccountStore }     from '@/stores/accounts'
export { useTagStore }         from '@/stores/tags'
export { useSettingsStore }    from '@/stores/settings'

import { defineStore } from 'pinia'
import { computed }    from 'vue'
import { useTransactionStore } from '@/stores/transactions'
import { useCategoryStore }    from '@/stores/categories'
import { useAccountStore }     from '@/stores/accounts'
import { useTagStore }         from '@/stores/tags'
import { useSettingsStore }    from '@/stores/settings'

/**
 * Фасад-стор для обратной совместимости.
 * Объединяет публичные API всех доменных сторов в единый объект.
 *
 * @deprecated Мигрируйте на специализированные сторы.
 */
export const useDataStore = defineStore('data', () => {
    const transactionStore = useTransactionStore()
    const categoryStore    = useCategoryStore()
    const accountStore     = useAccountStore()
    const tagStore         = useTagStore()
    const settingsStore    = useSettingsStore()

    return {
        // ── Данные (computed с учётом demoMode) ──────────────────────────
        transactions: computed(() => transactionStore.transactions),
        categories:   computed(() => categoryStore.categories),
        accounts:     computed(() => accountStore.accounts),
        tags:         computed(() => tagStore.tags),

        // ── CRUD транзакций ───────────────────────────────────────────────
        addTransaction:    transactionStore.addTransaction,
        updateTransaction: transactionStore.updateTransaction,
        deleteTransaction: transactionStore.deleteTransaction,

        // ── CRUD категорий ────────────────────────────────────────────────
        addCategory:    categoryStore.addCategory,
        updateCategory: categoryStore.updateCategory,
        deleteCategory: categoryStore.deleteCategory,

        // ── CRUD счетов ───────────────────────────────────────────────────
        addAccount:    accountStore.addAccount,
        updateAccount: accountStore.updateAccount,
        deleteAccount: accountStore.deleteAccount,

        // ── CRUD тегов ────────────────────────────────────────────────────
        addTag:    tagStore.addTag,
        updateTag: tagStore.updateTag,
        deleteTag: tagStore.deleteTag,

        // ── Настройки ─────────────────────────────────────────────────────
        settings:       computed(() => settingsStore.settings),
        updateSettings: settingsStore.updateSettings,

        // ── Демо-режим ────────────────────────────────────────────────────
        demoMode:    computed(() => settingsStore.demoMode),
        setDemoMode: settingsStore.setDemoMode,
    }
})
