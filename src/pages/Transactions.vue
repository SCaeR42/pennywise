<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-foreground">Транзакции</h1>
      <RouterLink
          to="/app/transactions/new"
          class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
      >
        <Plus class="mr-2 h-4 w-4" /> Добавить
      </RouterLink>
    </div>

    <div v-if="transactionStore.transactions.length === 0" class="rounded-lg border bg-card p-12 text-center text-muted-foreground">
      <p class="mb-4">Транзакций пока нет</p>
      <RouterLink
          to="/app/transactions/new"
          class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
      >
        Добавить первую
      </RouterLink>
    </div>

    <template v-else>
      <div class="rounded-lg border">
        <table class="w-full caption-bottom text-sm">
          <thead>
          <tr class="border-b transition-colors hover:bg-muted/50">
            <th class="h-12 px-4 text-left align-middle font-medium">Дата</th>
            <th class="h-12 px-4 text-left align-middle font-medium">Тип</th>
            <th class="h-12 px-4 text-right align-middle font-medium">Сумма</th>
            <th class="h-12 px-4 text-left align-middle font-medium">Категория</th>
            <th class="h-12 px-4 text-left align-middle font-medium">Счёт</th>
            <th class="h-12 px-4 text-left align-middle font-medium">Теги</th>
            <th class="h-12 px-4 w-24 align-middle font-medium"></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="t in pageItems" :key="t.id" class="border-b transition-colors hover:bg-muted/50">
            <td class="p-4 align-middle">{{ formatDate(new Date(t.date)) }}</td>
            <td class="p-4 align-middle">
                <span
                    class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold"
                    :class="getTypeColor(t.type)"
                >
                  {{ getTypeLabel(t.type) }}
                </span>
            </td>
            <td class="p-4 align-middle text-right font-medium">
              {{ t.type === 'income' ? '+' : t.type === 'expense' ? '-' : '' }}{{ t.amount.toLocaleString('ru-RU') }} ₽
            </td>
            <td class="p-4 align-middle">{{ getCategoryName(t.categoryId) }}</td>
            <td class="p-4 align-middle text-sm text-muted-foreground">
              <template v-if="t.type === 'transfer'">
                {{ getAccountName(t.sourceAccountId) }} → {{ getAccountName(t.destinationAccountId) }}
              </template>
              <template v-else-if="t.type === 'expense'">
                {{ getAccountName(t.sourceAccountId) }}
              </template>
              <template v-else>
                {{ getAccountName(t.destinationAccountId) }}
              </template>
            </td>
            <td class="p-4 align-middle">
              <div class="flex flex-wrap gap-1">
                  <span
                      v-for="tag in getTagNames(t.tagIds)"
                      :key="tag.id"
                      class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold"
                  >
                    {{ tag.name }}
                  </span>
              </div>
            </td>
            <td class="p-4 align-middle">
              <div class="flex gap-1">
                <RouterLink
                    :to="`/app/transactions/${t.id}/edit`"
                    class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9"
                >
                  <Pencil class="h-4 w-4" />
                </RouterLink>
                <button
                    class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9"
                    @click="handleDelete(t.id)"
                >
                  <Trash2 class="h-4 w-4 text-destructive" />
                </button>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

      <div v-if="totalPages > 1" class="flex items-center justify-center gap-2">
        <button
            class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
            :disabled="page === 0"
            @click="page--"
        >
          Назад
        </button>
        <span class="text-sm text-muted-foreground">{{ page + 1 }} / {{ totalPages }}</span>
        <button
            class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
            :disabled="page >= totalPages - 1"
            @click="page++"
        >
          Далее
        </button>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useTransactionStore } from '@/stores/transactions'
import { useCategoryStore }    from '@/stores/categories'
import { useAccountStore }     from '@/stores/accounts'
import { useTagStore }         from '@/stores/tags'
import { useSettingsStore }    from '@/stores/settings'
import { useToast } from '@/composables/useToast'
import { Plus, Pencil, Trash2 } from 'lucide-vue-next'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

const transactionStore = useTransactionStore()
const categoryStore    = useCategoryStore()
const accountStore     = useAccountStore()
const tagStore         = useTagStore()
const settingsStore    = useSettingsStore()
const { toast } = useToast()

const page = ref(0)
const perPage = settingsStore.settings.rowsPerPage || 10

const sorted = computed(() => {
  return [...transactionStore.transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
})

const totalPages = computed(() => Math.ceil(sorted.value.length / perPage))

const pageItems = computed(() => {
  return sorted.value.slice(page.value * perPage, (page.value + 1) * perPage)
})

const getCategoryName = (id: string) => categoryStore.categories.find(c => c.id === id)?.name || '—'
const getAccountName = (id?: string) => (id ? accountStore.accounts.find(a => a.id === id)?.name : '—') || '—'

interface Tag {
  id: string;
  name: string;
  color?: string;
}
const getTagNames = (ids: string[]): Tag[] => {
  return ids.flatMap(id => {
    const foundTag = tagStore.tags.find(t => t.id === id)
    return foundTag ? [foundTag] : []
  })
}

const getTypeLabel = (type: string) => {
  const labels: Record<string, string> = { expense: 'Расход', income: 'Доход', transfer: 'Перевод' }
  return labels[type] || type
}

const getTypeColor = (type: string) => {
  const colors: Record<string, string> = {
    expense: 'bg-destructive/10 text-destructive border-destructive/20',
    income: 'bg-primary/10 text-primary border-primary/20',
    transfer: 'bg-secondary/10 text-secondary border-secondary/20'
  }
  return colors[type] || ''
}

const formatDate = (d: Date) => format(d, 'dd.MM.yyyy', { locale: ru })

const handleDelete = (id: string) => {
  transactionStore.deleteTransaction(id)
  toast.success('Транзакция удалена')
}
</script>
