<template>
  <div class="space-y-6">
    <!-- Фильтры -->
    <DashboardFilters
        v-model:period="period"
        v-model:customFrom="customFrom"
        v-model:customTo="customTo"
        v-model:accountFilter="accountFilter"
        :accounts="accounts"
    />

    <!-- Карточки статистики -->
    <SummaryCards :cards="summaryCards" />

    <!-- Столбчатая диаграмма: доходы и расходы по месяцам -->
    <BarChart :data="monthlyData" />

    <!-- Линейный график: тренд расходов -->
    <TrendChart :data="trendData" />

    <!-- Круговые диаграммы -->
    <div class="grid gap-6 lg:grid-cols-2">
      <PieChart
          title="Расходы по категориям"
          :data="categoryData"
          :total="categoryTotal"
          :colors="COLORS"
      />
      <PieChart
          title="Распределение средств по счетам"
          :data="accountData"
          :total="accountTotal"
          :colors="COLORS"
      />
    </div>

    <!-- Топ-5 крупнейших транзакций -->
    <TopTransactions
        :transactions="top5"
        :get-category-name="getCategoryName"
        :get-type-label="getTypeLabel"
        :get-type-color="getTypeColor"
        :format-date="formatDate"
        :get-account-info="getAccountInfo"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ArrowDownRight, ArrowUpRight, Repeat, TrendingUp } from 'lucide-vue-next'
import { format, parseISO, startOfMonth, endOfMonth, startOfQuarter, endOfQuarter, startOfYear, endOfYear, endOfDay, isWithinInterval } from 'date-fns'
import { ru } from 'date-fns/locale'
import { useDataStore } from '@/stores/data'
import type { Transaction } from '@/types/finance'

// Виджеты дашборда
import DashboardFilters from '@/components/dashboard/DashboardFilters.vue'
import SummaryCards from '@/components/dashboard/SummaryCards.vue'
import BarChart from '@/components/dashboard/BarChart.vue'
import TrendChart from '@/components/dashboard/TrendChart.vue'
import PieChart from '@/components/dashboard/PieChart.vue'
import TopTransactions from '@/components/dashboard/TopTransactions.vue'

const dataStore = useDataStore()

// Цвета для круговых диаграмм
const COLORS = [
  'hsl(19,56%,40%)', 'hsl(19,56%,55%)', 'hsl(30,50%,45%)', 'hsl(40,60%,50%)',
  'hsl(150,40%,40%)', 'hsl(200,50%,45%)', 'hsl(260,40%,50%)', 'hsl(340,45%,50%)',
  'hsl(80,40%,42%)', 'hsl(10,60%,55%)', 'hsl(180,35%,45%)', 'hsl(300,30%,50%)'
]

// ============================================================
// ФИЛЬТРЫ
// ============================================================
const period = ref('all')
const customFrom = ref('')
const customTo = ref('')
const accountFilter = ref('all')

/** Список счетов для фильтра */
const accounts = computed(() => dataStore.accounts || [])

/** Отфильтрованные транзакции */
const filtered = computed(() => {
  const txs = dataStore.transactions || []
  let from: Date | undefined, to: Date | undefined
  const now = new Date()
  if (period.value === 'month') { from = startOfMonth(now); to = endOfMonth(now) }
  else if (period.value === 'quarter') { from = startOfQuarter(now); to = endOfQuarter(now) }
  else if (period.value === 'year') { from = startOfYear(now); to = endOfYear(now) }
  else if (period.value === 'custom' && customFrom.value && customTo.value) {
    from = new Date(customFrom.value)
    to = endOfDay(new Date(customTo.value))
  }
  return txs.filter(t => {
    if (!t?.date) return false
    if (from && to) {
      try {
        const d = parseISO(t.date)
        if (!isWithinInterval(d, { start: from, end: to })) return false
      } catch { return false }
    }
    if (accountFilter.value !== 'all' &&
        t.sourceAccountId !== accountFilter.value &&
        t.destinationAccountId !== accountFilter.value) return false
    return true
  })
})

// ============================================================
// КАРТОЧКИ СТАТИСТИКИ
// ============================================================
const summaryCards = computed(() => {
  const txs = filtered.value
  const inc = txs.filter(t => t.type === 'income').reduce((s, t) => s + (t.amount || 0), 0)
  const exp = txs.filter(t => t.type === 'expense').reduce((s, t) => s + (t.amount || 0), 0)
  const trf = txs.filter(t => t.type === 'transfer').reduce((s, t) => s + (t.amount || 0), 0)
  return [
    { label: 'Доходы', value: inc, icon: ArrowUpRight, iconBg: 'bg-green-500/10', iconColor: 'text-green-500' },
    { label: 'Расходы', value: exp, icon: ArrowDownRight, iconBg: 'bg-red-500/10', iconColor: 'text-red-500' },
    { label: 'Переводы', value: trf, icon: Repeat, iconBg: 'bg-blue-500/10', iconColor: 'text-blue-500' },
    { label: 'Баланс', value: inc - exp, icon: TrendingUp, iconBg: 'bg-primary/10', iconColor: 'text-primary' },
  ]
})

// ============================================================
// ДАННЫЕ ДЛЯ СТОЛБЧАТОЙ ДИАГРАММЫ
// ============================================================
const monthlyData = computed(() => {
  const map = new Map<string, { income: number; expense: number }>()
  for (const t of filtered.value) {
    if (t.type === 'transfer' || !t.date) continue
    try {
      const key = format(parseISO(t.date), 'yyyy-MM')
      const e = map.get(key) || { income: 0, expense: 0 }
      if (t.type === 'income') e.income += t.amount || 0
      else e.expense += t.amount || 0
      map.set(key, e)
    } catch {}
  }
  return Array.from(map.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => ({
        month: format(parseISO(k + '-01'), 'LLL yy', { locale: ru }),
        income: v.income,
        expense: v.expense
      }))
})

// ============================================================
// ДАННЫЕ ДЛЯ ЛИНЕЙНОГО ГРАФИКА ТРЕНДА
// ============================================================
const trendData = computed(() => {
  const map = new Map<string, number>()
  for (const t of filtered.value) {
    if (t.type !== 'expense' || !t.date) continue
    try {
      const k = format(parseISO(t.date), 'yyyy-MM')
      map.set(k, (map.get(k) || 0) + (t.amount || 0))
    } catch {}
  }
  return Array.from(map.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => ({
        month: format(parseISO(k + '-01'), 'LLL yy', { locale: ru }),
        value: v
      }))
})

// ============================================================
// ДАННЫЕ ДЛЯ КРУГОВЫХ ДИАГРАММ
// ============================================================
const categoryData = computed(() => {
  const map = new Map<string, number>()
  for (const t of filtered.value) {
    if (t.type !== 'expense') continue
    const cat = dataStore.categories.find(c => c.id === t.categoryId)?.name || 'Прочее'
    map.set(cat, (map.get(cat) || 0) + (t.amount || 0))
  }
  return Array.from(map.entries())
      .map(([n, v]) => ({ name: n, value: v }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 12)
})

const categoryTotal = computed(() =>
    categoryData.value.reduce((s, d) => s + d.value, 0)
)

const accountData = computed(() =>
    (dataStore.accounts || [])
        .filter(a => a.balance > 0)
        .map(a => ({ name: a.name, value: a.balance }))
        .sort((a, b) => b.value - a.value)
)

const accountTotal = computed(() =>
    accountData.value.reduce((s, d) => s + d.value, 0)
)

// ============================================================
// ТОП-5 ТРАНЗАКЦИЙ
// ============================================================
const top5 = computed(() =>
    [...filtered.value]
        .sort((a, b) => (b.amount || 0) - (a.amount || 0))
        .slice(0, 5)
)

// ============================================================
// ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ (передаются в TopTransactions)
// ============================================================
const getCategoryName = (id: string) =>
    dataStore.categories.find(c => c.id === id)?.name || '—'

const getTypeLabel = (t: string) =>
    ({ expense: 'Расход', income: 'Доход', transfer: 'Перевод' }[t] || t)

const getTypeColor = (t: string) =>
    ({
      expense: 'bg-destructive/10 text-destructive border-destructive/20',
      income: 'bg-primary/10 text-primary border-primary/20',
      transfer: 'bg-secondary/10 text-secondary border-secondary/20'
    }[t] || '')

const formatDate = (d: string) =>
    format(new Date(d), 'dd.MM.yyyy', { locale: ru })

const getAccountInfo = (t: Transaction) => {
  const gn = (id?: string) =>
      id ? (dataStore.accounts || []).find(a => a.id === id)?.name || '—' : '—'
  if (t.type === 'transfer') return `${gn(t.sourceAccountId)} → ${gn(t.destinationAccountId)}`
  return gn(t.sourceAccountId || t.destinationAccountId)
}
</script>
