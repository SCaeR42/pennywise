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
import {ref, computed} from 'vue'
import type {Transaction, Category, Account, Tag, UserSettings} from '@/types/finance'
import {getItem, setItem, generateId} from '@/lib/storage'
import {DEFAULT_CATEGORIES, DEFAULT_ACCOUNTS, DEFAULT_TAGS} from '@/lib/defaults'
import {getDemoTransactions, DEMO_ACCOUNTS, DEMO_TAGS} from '@/lib/demoData'

export const useDataStore = defineStore('data', () => {
    // ==================== Reactive State ====================

    /** Пользовательские транзакции (хранятся в localStorage) */
    const transactions = ref<Transaction[]>(getItem('transactions', []))
    /** Пользовательские категории (по умолчанию — DEFAULT_CATEGORIES) */
    const categories = ref<Category[]>(getItem('categories', DEFAULT_CATEGORIES))
    /** Пользовательские счета (по умолчанию — DEFAULT_ACCOUNTS) */
    const accounts = ref<Account[]>(getItem('accounts', DEFAULT_ACCOUNTS))
    /** Пользовательские теги (по умолчанию — DEFAULT_TAGS) */
    const tags = ref<Tag[]>(getItem('tags', DEFAULT_TAGS))
    /** Настройки пользователя (тема, кол-во строк, состояние сайдбара) */
    const settings = ref<UserSettings>(getItem<UserSettings>('settings', {rowsPerPage: 10, theme: 'light' as const, sideBarCollapsed: false})
    )
    /** Флаг режима демонстрации */
    const demoMode = ref<boolean>(getItem('demoMode', true))

    // ==================== Computed Properties ====================

    /**
     * Эффективные транзакции: пользовательские + демо (если включён demoMode)
     * Демо-транзакции идут первыми, чтобы быть видимыми в начале списка
     */
    const effectiveTransactions = computed(() => {
        const txs = transactions.value || []
        return demoMode.value ? [...getDemoTransactions(), ...txs] : txs
    })

    /**
     * Эффективные счета: демо-счета + пользовательские
     */
    const effectiveAccounts = computed(() => {
        const accs = accounts.value || []
        return demoMode.value ? [...DEMO_ACCOUNTS, ...accs] : accs
    })

    /**
     * Эффективные теги: демо-теги + пользовательские
     */
    const effectiveTags = computed(() => {
        const tgs = tags.value || []
        return demoMode.value ? [...DEMO_TAGS, ...tgs] : tgs
    })

    /**
     * Эффективные категории: категории по умолчанию + пользовательские
     */
    const effectiveCategories = computed(() => {
        const cats = categories.value || []
        return demoMode.value ? [...DEFAULT_CATEGORIES, ...cats] : cats
    })

    // ==================== Transaction CRUD ====================

    /**
     * Добавить новую транзакцию
     * @param t Данные транзакции без id и createdAt (генерируются автоматически)
     */
    const addTransaction = (t: Omit<Transaction, 'id' | 'createdAt'>) => {
        const newTransaction = {...t, id: generateId(), createdAt: new Date().toISOString()}
        transactions.value = [...transactions.value, newTransaction]
        setItem('transactions', transactions.value)
    }

    /**
     * Обновить существующую транзакцию
     * @param id Идентификатор транзакции
     * @param t Частичные данные для обновления
     */
    const updateTransaction = (id: string, t: Partial<Transaction>) => {
        transactions.value = transactions.value.map(x => x.id === id ? {...x, ...t} : x)
        setItem('transactions', transactions.value)
    }

    /**
     * Удалить транзакцию по ID
     */
    const deleteTransaction = (id: string) => {
        transactions.value = transactions.value.filter(x => x.id !== id)
        setItem('transactions', transactions.value)
    }

    // ==================== Category CRUD ====================

    /**
     * Добавить новую категорию
     */
    const addCategory = (c: Omit<Category, 'id'>) => {
        const newCategory = {...c, id: generateId()}
        categories.value = [...categories.value, newCategory]
        setItem('categories', categories.value)
    }

    /**
     * Обновить существующую категорию
     */
    const updateCategory = (id: string, c: Partial<Category>) => {
        categories.value = categories.value.map(x => x.id === id ? {...x, ...c} : x)
        setItem('categories', categories.value)
    }

    /**
     * Удалить категорию по ID
     */
    const deleteCategory = (id: string) => {
        categories.value = categories.value.filter(x => x.id !== id)
        setItem('categories', categories.value)
    }

    // ==================== Account CRUD ====================

    /**
     * Добавить новый счёт
     */
    const addAccount = (a: Omit<Account, 'id'>) => {
        const newAccount = {...a, id: generateId()}
        accounts.value = [...accounts.value, newAccount]
        setItem('accounts', accounts.value)
    }

    /**
     * Обновить существующий счёт
     */
    const updateAccount = (id: string, a: Partial<Account>) => {
        accounts.value = accounts.value.map(x => x.id === id ? {...x, ...a} : x)
        setItem('accounts', accounts.value)
    }

    /**
     * Удалить счёт по ID
     */
    const deleteAccount = (id: string) => {
        accounts.value = accounts.value.filter(x => x.id !== id)
        setItem('accounts', accounts.value)
    }

    // ==================== Tag CRUD ====================

    /**
     * Добавить новый тег
     */
    const addTag = (t: Omit<Tag, 'id'>) => {
        const newTag = {...t, id: generateId()}
        tags.value = [...tags.value, newTag]
        setItem('tags', tags.value)
    }

    /**
     * Обновить существующий тег
     */
    const updateTag = (id: string, t: Partial<Tag>) => {
        tags.value = tags.value.map(x => x.id === id ? {...x, ...t} : x)
        setItem('tags', tags.value)
    }

    /**
     * Удалить тег по ID
     */
    const deleteTag = (id: string) => {
        tags.value = tags.value.filter(x => x.id !== id)
        setItem('tags', tags.value)
    }

    // ==================== Settings & Demo Mode ====================

    /**
     * Обновить настройки пользователя (частичное обновление)
     */
    const updateSettings = (s: Partial<UserSettings>) => {
        settings.value = {...settings.value, ...s}
        setItem('settings', settings.value)
    }

    /**
     * Включить/выключить режим демонстрации
     * @param v Значение флага demoMode
     */
    const setDemoMode = (v: boolean) => {
        demoMode.value = v
        setItem('demoMode', v)
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
        settings,
        updateSettings,
        // Демо-режим
        demoMode,
        setDemoMode
    }
})
