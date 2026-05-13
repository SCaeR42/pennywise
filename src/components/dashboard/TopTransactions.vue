<template>
  <!-- Топ-5 крупнейших транзакций -->
  <div class="rounded-lg border bg-card shadow-sm">
    <div class="flex flex-col space-y-1.5 p-6">
      <h3 class="text-2xl font-semibold">Топ-5 крупнейших транзакций</h3>
    </div>
    <div class="p-6 pt-0">
      <p v-if="transactions.length === 0" class="py-8 text-center text-muted-foreground">Нет данных</p>
      <div v-else class="space-y-3 px-6 pb-6">
        <div
          v-for="(t, i) in transactions"
          :key="t.id"
          class="flex items-center gap-4 rounded-lg border p-3"
        >
          <!-- Номер в рейтинге -->
          <span class="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
            {{ i + 1 }}
          </span>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2">
              <!-- Категория -->
              <span class="font-medium">{{ getCategoryName(t.categoryId) }}</span>
              <!-- Тип транзакции -->
              <span
                class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold"
                :class="getTypeColor(t.type)"
              >{{ getTypeLabel(t.type) }}</span>
            </div>
            <!-- Дата, счёт, комментарий -->
            <p class="text-xs text-muted-foreground truncate">
              {{ formatDate(t.date) }} · {{ getAccountInfo(t) }}
              <template v-if="t.comment"> · {{ t.comment }}</template>
            </p>
          </div>
          <!-- Сумма -->
          <span class="text-lg font-bold whitespace-nowrap">
            {{ (t.amount || 0).toLocaleString('ru-RU') }} ₽
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Transaction } from '@/types/finance'

defineProps<{
  /** Топ-5 транзакций */
  transactions: Transaction[]
  /** Получить название категории по ID */
  getCategoryName: (id: string) => string
  /** Получить метку типа транзакции */
  getTypeLabel: (type: string) => string
  /** Получить CSS-классы для бейджа типа */
  getTypeColor: (type: string) => string
  /** Форматировать дату */
  formatDate: (date: string) => string
  /** Получить информацию о счёте */
  getAccountInfo: (t: Transaction) => string
}>()
</script>
