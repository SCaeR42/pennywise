/**
 * Pinia Store — управление тегами транзакций
 *
 * Отвечает за:
 * - Хранение пользовательских тегов в localStorage
 * - CRUD-операции над тегами
 * - Вычисление effectiveTags с учётом demoMode из useSettingsStore
 *
 * @module useTagStore
 */
import { defineStore } from 'pinia'
import { reactive, computed, watch } from 'vue'
import type { Tag } from '@/types/finance'
import { getItem, setItem, generateId } from '@/lib/storage'
import { DEFAULT_TAGS } from '@/lib/defaults'
import { DEMO_TAGS } from '@/lib/demoData'
import { useSettingsStore } from '@/stores/settings'

export const useTagStore = defineStore('tags', () => {
    // ==================== State ====================

    const state = reactive({
        tags: getItem<Tag[]>('tags', DEFAULT_TAGS),
    })

    // Автосинхронизация с localStorage
    watch(
        state,
        (s) => setItem('tags', s.tags),
        { deep: true }
    )

    // ==================== Computed ====================

    /**
     * Эффективный список тегов.
     * В demoMode возвращает DEMO_TAGS + пользовательские,
     * иначе — только пользовательские.
     */
    const tags = computed(() => {
        const settingsStore = useSettingsStore()
        const tgs = state.tags || []
        return settingsStore.demoMode ? [...DEMO_TAGS, ...tgs] : tgs
    })

    // ==================== Actions ====================

    /**
     * Добавить новый тег
     * @param t Данные тега без id
     */
    const addTag = (t: Omit<Tag, 'id'>) => {
        state.tags = [...state.tags, { ...t, id: generateId() }]
    }

    /**
     * Обновить существующий тег
     * @param id Идентификатор тега
     * @param patch Поля для обновления
     */
    const updateTag = (id: string, patch: Partial<Tag>) => {
        state.tags = state.tags.map(x => x.id === id ? { ...x, ...patch } : x)
    }

    /**
     * Удалить тег по ID
     * @param id Идентификатор тега
     */
    const deleteTag = (id: string) => {
        state.tags = state.tags.filter(x => x.id !== id)
    }

    // ==================== Public API ====================

    return {
        tags,
        addTag,
        updateTag,
        deleteTag,
    }
})
