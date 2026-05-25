/**
 * Pinia Store — управление категориями транзакций
 *
 * Отвечает за:
 * - Хранение пользовательских категорий в localStorage
 * - CRUD-операции над категориями
 * - Вычисление effectiveCategories с учётом demoMode из useSettingsStore
 *
 * @module useCategoryStore
 */
import { defineStore } from 'pinia'
import { reactive, computed, watch } from 'vue'
import type { Category } from '@/types/finance'
import { getItem, setItem, generateId } from '@/lib/storage'
import { DEFAULT_CATEGORIES } from '@/lib/defaults'
import { useSettingsStore } from '@/stores/settings'

export const useCategoryStore = defineStore('categories', () => {
    // ==================== State ====================

    const state = reactive({
        categories: getItem<Category[]>('categories', DEFAULT_CATEGORIES),
    })

    // Автосинхронизация с localStorage
    watch(
        state,
        (s) => setItem('categories', s.categories),
        { deep: true }
    )

    // ==================== Computed ====================

    /**
     * Эффективный список категорий.
     * В demoMode возвращает DEFAULT_CATEGORIES + пользовательские,
     * иначе — только пользовательские.
     */
    const categories = computed(() => {
        const settingsStore = useSettingsStore()
        const cats = state.categories || []
        return settingsStore.demoMode ? [...DEFAULT_CATEGORIES, ...cats] : cats
    })

    // ==================== Actions ====================

    /**
     * Добавить новую категорию
     * @param c Данные категории без id
     */
    const addCategory = (c: Omit<Category, 'id'>) => {
        state.categories = [...state.categories, { ...c, id: generateId() }]
    }

    /**
     * Обновить существующую категорию
     * @param id Идентификатор категории
     * @param patch Поля для обновления
     */
    const updateCategory = (id: string, patch: Partial<Category>) => {
        state.categories = state.categories.map(x => x.id === id ? { ...x, ...patch } : x)
    }

    /**
     * Удалить категорию по ID
     * @param id Идентификатор категории
     */
    const deleteCategory = (id: string) => {
        state.categories = state.categories.filter(x => x.id !== id)
    }

    // ==================== Public API ====================

    return {
        categories,
        addCategory,
        updateCategory,
        deleteCategory,
    }
})
