<template>
  <!-- Фильтры дашборда: период, произвольные даты, счёт -->
  <div class="flex flex-wrap items-center justify-between gap-4">
    <h1 class="text-2xl font-bold text-foreground">Дашборд</h1>
    <div class="flex flex-wrap items-center gap-3">
      <!-- Выбор периода -->
      <div class="flex items-center gap-2">
        <Filter class="h-4 w-4 text-muted-foreground" />
        <select
          :value="period"
          @change="$emit('update:period', ($event.target as HTMLSelectElement).value)"
          class="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
        >
          <option value="month">Текущий месяц</option>
          <option value="quarter">Текущий квартал</option>
          <option value="year">Текущий год</option>
          <option value="all">Всё время</option>
          <option value="custom">Произвольный</option>
        </select>
      </div>
      <!-- Произвольный период -->
      <template v-if="period === 'custom'">
        <div class="flex items-center gap-2">
          <input
            type="date"
            :value="customFrom"
            @input="$emit('update:customFrom', ($event.target as HTMLInputElement).value)"
            class="flex h-9 rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
          <span class="text-muted-foreground">—</span>
          <input
            type="date"
            :value="customTo"
            @input="$emit('update:customTo', ($event.target as HTMLInputElement).value)"
            class="flex h-9 rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
        </div>
      </template>
      <!-- Фильтр по счёту -->
      <select
        :value="accountFilter"
        @change="$emit('update:accountFilter', ($event.target as HTMLSelectElement).value)"
        class="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
      >
        <option value="all">Все счета</option>
        <option v-for="a in accounts" :key="a.id" :value="a.id">{{ a.name }}</option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Filter } from 'lucide-vue-next'
import type { Account } from '@/types/finance'

defineProps<{
  /** Выбранный период */
  period: string
  /** Дата начала произвольного периода */
  customFrom: string
  /** Дата окончания произвольного периода */
  customTo: string
  /** Выбранный счёт */
  accountFilter: string
  /** Список счетов */
  accounts: Account[]
}>()

defineEmits<{
  'update:period': [value: string]
  'update:customFrom': [value: string]
  'update:customTo': [value: string]
  'update:accountFilter': [value: string]
}>()
</script>
