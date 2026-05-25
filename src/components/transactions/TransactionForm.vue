<template>
  <form @submit.prevent="handleSubmit" class="mx-auto max-w-lg space-y-6">
    <h1 class="text-2xl font-bold text-foreground">
      {{ editId ? 'Редактировать транзакцию' : 'Новая транзакция' }}
    </h1>

    <!-- Date -->
    <div class="space-y-2">
      <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Дата</label>
      <div class="relative">
        <button
          type="button"
          class="inline-flex items-center justify-start w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          @click="showCalendar = !showCalendar"
        >
          <CalendarIcon class="mr-2 h-4 w-4" />
          {{ date ? formatDate(date) : 'Выберите дату' }}
        </button>
        <div
          v-if="showCalendar"
          class="absolute top-full left-0 z-50 mt-2 rounded-md border bg-card p-3 shadow-lg"
        >
          <input
            type="date"
            :value="formatDateForInput(date)"
            @input="onDateInput"
            class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
        </div>
      </div>
    </div>

    <!-- Amount -->
    <div class="space-y-2">
      <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Сумма</label>
      <input
        v-model="amount"
        type="number"
        step="0.01"
        min="0"
        required
        placeholder="0.00"
        class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      />
    </div>

    <!-- Type -->
    <div class="space-y-2">
      <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Тип</label>
      <select
        v-model="type"
        class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <option value="expense">Расход</option>
        <option value="income">Доход</option>
        <option value="transfer">Перевод</option>
      </select>
    </div>

    <!-- Source Account -->
    <div v-if="showSource" class="space-y-2">
      <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Счёт списания</label>
      <select
        v-model="sourceAccountId"
        class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <option value="">Выберите счёт</option>
        <option v-for="a in accountStore.accounts" :key="a.id" :value="a.id">{{ a.name }}</option>
      </select>
    </div>

    <!-- Destination Account -->
    <div v-if="showDestination" class="space-y-2">
      <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Счёт зачисления</label>
      <select
        v-model="destinationAccountId"
        class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <option value="">Выберите счёт</option>
        <option v-for="a in accountStore.accounts" :key="a.id" :value="a.id">{{ a.name }}</option>
      </select>
    </div>

    <!-- Category -->
    <div class="space-y-2">
      <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Категория</label>
      <select
        v-model="categoryId"
        class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <option value="">Выберите категорию</option>
        <option v-for="c in categoryStore.categories" :key="c.id" :value="c.id">{{ c.name }}</option>
      </select>
    </div>

    <!-- Tags -->
    <div class="space-y-2">
      <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Теги</label>
      <div class="flex flex-wrap gap-2">
        <span
          v-for="tag in tagStore.tags"
          :key="tag.id"
          class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors cursor-pointer"
          :class="selectedTags.includes(tag.id) ? 'bg-primary text-primary-foreground border-primary' : 'bg-background text-foreground'"
          @click="toggleTag(tag.id)"
        >
          {{ tag.name }}
          <X v-if="selectedTags.includes(tag.id)" class="ml-1 h-3 w-3" />
        </span>
      </div>
    </div>

    <!-- Comment -->
    <div class="space-y-2">
      <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Комментарий</label>
      <textarea
        v-model="comment"
        placeholder="Описание транзакции..."
        rows="3"
        class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      />
    </div>

    <!-- Buttons -->
    <div class="flex gap-4">
      <button
        type="submit"
        class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 flex-1"
      >
        {{ editId ? 'Сохранить' : 'Добавить' }}
      </button>
      <button
        type="button"
        class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
        @click="router.push('/app/transactions')"
      >
        Отмена
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useTransactionStore } from '@/stores/transactions'
import { useCategoryStore }    from '@/stores/categories'
import { useAccountStore }     from '@/stores/accounts'
import { useTagStore }         from '@/stores/tags'
import { useToast } from '@/composables/useToast'
import { CalendarIcon, X } from 'lucide-vue-next'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import type { TransactionType } from '@/types/finance'

const props = defineProps<{
  editId?: string
}>()

const transactionStore = useTransactionStore()
const categoryStore    = useCategoryStore()
const accountStore     = useAccountStore()
const tagStore         = useTagStore()
const router = useRouter()
const route = useRoute()
const { toast } = useToast()

const showCalendar = ref(false)

// Find existing transaction for edit mode
const existing = computed(() => {
  if (props.editId) {
    return transactionStore.transactions.find(t => t.id === props.editId)
  }
  return null
})

const date = ref<Date>(existing.value ? new Date(existing.value.date) : new Date())
const amount = ref(existing.value?.amount?.toString() || '')
const type = ref<TransactionType>(existing.value?.type || 'expense')
const sourceAccountId = ref(existing.value?.sourceAccountId || '')
const destinationAccountId = ref(existing.value?.destinationAccountId || '')
const categoryId = ref(existing.value?.categoryId || '')
const selectedTags = ref<string[]>(existing.value?.tagIds || [])
const comment = ref(existing.value?.comment || '')

const showSource = computed(() => type.value === 'expense' || type.value === 'transfer')
const showDestination = computed(() => type.value === 'income' || type.value === 'transfer')

const toggleTag = (tagId: string) => {
  selectedTags.value = selectedTags.value.includes(tagId)
    ? selectedTags.value.filter(id => id !== tagId)
    : [...selectedTags.value, tagId]
}

const formatDate = (d: Date) => format(d, 'PPP', { locale: ru })
const formatDateForInput = (d: Date) => d.toISOString().split('T')[0]

const onDateInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.value) {
    date.value = new Date(target.value)
    showCalendar.value = false
  }
}

const handleSubmit = () => {
  const data = {
    date: date.value.toISOString(),
    amount: parseFloat(amount.value),
    type: type.value,
    sourceAccountId: showSource.value ? sourceAccountId.value : undefined,
    destinationAccountId: showDestination.value ? destinationAccountId.value : undefined,
    categoryId: categoryId.value,
    tagIds: selectedTags.value,
    comment: comment.value,
  }

  if (props.editId) {
    transactionStore.updateTransaction(props.editId, data)
    toast.success('Транзакция обновлена')
  } else {
    transactionStore.addTransaction(data)
    toast.success('Транзакция добавлена')
  }
  router.push('/app/transactions')
}
</script>
