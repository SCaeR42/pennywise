<template>
  <!-- Карточки суммарной статистики: доходы, расходы, переводы, баланс -->
  <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
    <div
      v-for="card in cards"
      :key="card.label"
      class="rounded-lg border bg-card shadow-sm"
    >
      <div class="flex items-center gap-4 p-6">
        <div class="rounded-full p-3" :class="card.iconBg">
          <component :is="card.icon" class="h-5 w-5" :class="card.iconColor" />
        </div>
        <div>
          <p class="text-sm text-muted-foreground">{{ card.label }}</p>
          <p class="text-xl font-bold text-foreground">
            {{ (card.value ?? 0).toLocaleString('ru-RU') }} ₽
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue'

/** Элемент карточки статистики */
interface SummaryCard {
  label: string
  value: number
  icon: Component
  iconBg: string
  iconColor: string
}

defineProps<{
  /** Массив карточек статистики */
  cards: SummaryCard[]
}>()
</script>
