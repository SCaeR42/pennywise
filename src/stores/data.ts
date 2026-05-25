/**
 * Pinia Store для управления финансовыми данными
 *
 * Хранит состояние транзакций, категорий, счетов, тегов и настроек.
 * Поддерживает режим демо-данных, который объединяет пользовательские
 * и демонстрационные данные через computed-свойства.
 *
 * Персистентность обеспечивается через localStorage (модуль storage).
 */
import {defineStore} from 'pinia'
import {ref, computed, reactive, watch} from 'vue'
import type {Transaction, Category, Account, Tag, UserSettings} from '@/types/finance'
import {getItem, setItem, generateId} from '@/lib/storage'
import {DEFAULT_CATEGORIES, DEFAULT_ACCOUNTS, DEFAULT_TAGS} from '@/lib/defaults'
import {getDemoTransactions, DEMO_ACCOUNTS, DEMO_TAGS} from '@/lib/demoData'

export const useDataStore = defineStore('data', () => {
    // ==================== Reactive State ====================

    /**
     * Реактивный объект состояния для персистентности.
     * Watch с { deep: true } автоматически синхронизирует изменения с localStorage.
     */
    const state = reactive({
        transactions: getItem<Transaction[]>('transactions', []),
        categories: getItem<Category[]>('categories', DEFAULT_CATEGORIES),
        accounts: getItem<Account[]>('accounts', DEFAULT_ACCOUNTS),
        tags: getItem<Tag[]>('tags', DEFAULT_TAGS),
        settings: getItem<UserSettings>('settings', {rowsPerPage: 10, theme: 'light' as const, sideBarCollapsed: false}),
        demoMode: getItem<boolean>('demoMode', true)
    })

    // Автоматическая синхронизация состояния с localStorage
    watch(
        state,
        (newState) => {
            setItem('transactions', newState.transactions)
            setItem('categories', newState.categories)
            setItem('accounts', newState.accounts)
            setItem('tags', newState.tags)
            setItem('settings', newState.settings)
            setItem('demoMode', newState.demoMode)
        },
        { deep: true }
    )

    // ==================== Computed Properties ====================

    /**
     * Эффективные транзакции: пользовательские + демо (если включён demoMode)
     * Демо-транзакции идут первыми, чтобы быть видимыми в начале списка
     */
    const effectiveTransactions = computed(() => {
        const txs = state.transactions || []
        return state.demoMode ? [...getDemoTransactions(), ...txs] : txs
    })

    /**
     * Эффективные счета: демо-счета + пользовательские
     */
    const effectiveAccounts = computed(() => {
        const accs = state.accounts || []
        return state.demoMode ? [...DEMO_ACCOUNTS, ...accs] : accs
    })

    /**
     * Эффективные теги: демо-теги + пользовательские
     */
    const effectiveTags = computed(() => {
        const tgs = state.tags || []
        return state.demoMode ? [...DEMO_TAGS, ...tgs] : tgs
    })

    /**
     * Эффективные категории: категории по умолчанию + пользовательские
     */
    const effectiveCategories = computed(() => {
        const cats = state.categories || []
        return state.demoMode ? [...DEFAULT_CATEGORIES, ...cats] : cats
    })

    // ==================== Transaction CRUD ====================

    /**
     * Добавить новую транзакцию
     * @param t Данные транзакции без id и createdAt (генерируются автоматически)
     */
    const addTransaction = (t: Omit<Transaction, 'id' | 'createdAt'>) => {
        const newTransaction = {...t, id: generateId(), createdAt: new Date().toISOString()}
        state.transactions = [...state.transactions, newTransaction]
    }

    /**
     * Обновить существующую транзакцию
     * @param id Идентификатор транзакции
     * @param t Частичные данные для обновления
     */
    const updateTransaction = (id: string, t: Partial<Transaction>) => {
        state.transactions = state.transactions.map(x => x.id === id ? {...x, ...t} : x)
    }

    /**
     * Удалить транзакцию по ID
     */
    const deleteTransaction = (id: string) => {
        state.transactions = state.transactions.filter(x => x.id !== id)
    }

    // ==================== Category CRUD ====================

    /**
     * Добавить новую категорию
     */
    const addCategory = (c: Omit<Category, 'id'>) => {
        const newCategory = {...c, id: generateId()}
        state.categories = [...state.categories, newCategory]
    }

    /**
     * Обновить существующую категорию
     */
    const updateCategory = (id: string, c: Partial<Category>) => {
        state.categories = state.categories.map(x => x.id === id ? {...x, ...c} : x)
    }

    /**
     * Удалить категорию по ID
     */
    const deleteCategory = (id: string) => {
        state.categories = state.categories.filter(x => x.id !== id)
    }

    // ==================== Account CRUD ====================

    /**
     * Добавить новый счёт
     */
    const addAccount = (a: Omit<Account, 'id'>) => {
        const newAccount = {...a, id: generateId()}
        state.accounts = [...state.accounts, newAccount]
    }

    /**
     * Обновить существующий счёт
     */
    const updateAccount = (id: string, a: Partial<Account>) => {
        state.accounts = state.accounts.map(x => x.id === id ? {...x, ...a} : x)
    }

    /**
     * Удалить счёт по ID
     */
    const deleteAccount = (id: string) => {
        state.accounts = state.accounts.filter(x => x.id !== id)
    }

    // ==================== Tag CRUD ====================

    /**
     * Добавить новый тег
     */
    const addTag = (t: Omit<Tag, 'id'>) => {
        const newTag = {...t, id: generateId()}
        state.tags = [...state.tags, newTag]
    }

    /**
     * Обновить существующий тег
     */
    const updateTag = (id: string, t: Partial<Tag>) => {
        state.tags = state.tags.map(x => x.id === id ? {...x, ...t} : x)
    }

    /**
     * Удалить тег по ID
     */
    const deleteTag = (id: string) => {
        state.tags = state.tags.filter(x => x.id !== id)
    }

    // ==================== Settings & Demo Mode ====================

    /**
     * Обновить настройки пользователя (частичное обновление)
     */
    const updateSettings = (s: Partial<UserSettings>) => {
        state.settings = {...state.settings, ...s}
    }

    /**
     * Включить/выключить режим демонстрации
     * @param v Значение флага demoMode
     */
    const setDemoMode = (v: boolean) => {
        state.demoMode = v
    }

    // ==================== Public API ====================

    return {
        // Данные (computed — с учётом demoMode)
        transactions: effectiveTransactions,
        categories: effectiveCategories,
        accounts: effectiveAccounts,
        tags: effectiveTags,
        // CRUD транзакций
        addTransaction,
        updateTransaction,
        deleteTransaction,
        // CRUD категорий
        addCategory,
        updateCategory,
        deleteCategory,
        // CRUD счетов
        addAccount,
        updateAccount,
        deleteAccount,
        // CRUD тегов
        addTag,
        updateTag,
        deleteTag,
        // Настройки
        settings: computed(() => state.settings),
        updateSettings,
        // Демо-режим
        demoMode: computed(() => state.demoMode),
        setDemoMode
    }
})
