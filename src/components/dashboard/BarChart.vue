<template>
  <!-- Столбчатая диаграмма: доходы и расходы по месяцам -->
  <div class="rounded-lg border bg-card shadow-sm">
    <div class="flex flex-col space-y-1.5 p-6">
      <h3 class="text-2xl font-semibold">Доходы и расходы по месяцам</h3>
    </div>
    <div class="p-6 pt-0">
      <p v-if="data.length === 0" class="py-8 text-center text-muted-foreground">
        Нет данных. Включите демо-режим или добавьте транзакции.
      </p>
      <template v-else>
        <div ref="chartRef" class="relative px-6">
          <svg
            :viewBox="`0 0 ${svgWidth} 350`"
            class="w-full"
            style="height:350px"
            preserveAspectRatio="xMidYMid meet"
            @mousemove="onMouseMove"
            @mouseleave="onLeave"
          >
            <!-- Горизонтальные линии сетки -->
            <line
              v-for="i in 5"
              :key="i"
              x1="40"
              :y1="310 - i * 55"
              :x2="svgWidth - 20"
              :y2="310 - i * 55"
              stroke="hsl(var(--border))"
              stroke-dasharray="3 3"
            />
            <!-- Метки оси Y -->
            <text
              v-for="i in 5"
              :key="'y' + i"
              x="35"
              :y="315 - i * 55"
              text-anchor="end"
              fill="hsl(var(--muted-foreground))"
              font-size="10"
            >{{ formatY(i * maxVal / 5) }}</text>
            <!-- Столбцы -->
            <template v-for="(item, idx) in data" :key="idx">
              <!-- Доход -->
              <rect
                :x="45 + idx * barGroupW"
                :y="310 - barH(item.income)"
                :width="barW"
                :height="barH(item.income)"
                fill="hsl(150,40%,40%)"
                rx="2"
                class="cursor-pointer"
                :opacity="hoveredBar === `i${idx}` ? 1 : 0.8"
                @mouseenter="hoveredBar = `i${idx}`; tip = { t: 'Доход', v: item.income, m: item.month }"
                @mouseleave="hoveredBar = null; tip = null"
              />
              <!-- Расход -->
              <rect
                :x="45 + idx * barGroupW + barW + barG"
                :y="310 - barH(item.expense)"
                :width="barW"
                :height="barH(item.expense)"
                fill="hsl(19,56%,40%)"
                rx="2"
                class="cursor-pointer"
                :opacity="hoveredBar === `e${idx}` ? 1 : 0.8"
                @mouseenter="hoveredBar = `e${idx}`; tip = { t: 'Расход', v: item.expense, m: item.month }"
                @mouseleave="hoveredBar = null; tip = null"
              />
              <!-- Метка месяца -->
              <text
                :x="45 + idx * barGroupW + barW + barG / 2"
                y="325"
                text-anchor="middle"
                fill="hsl(var(--muted-foreground))"
                font-size="9"
              >{{ item.month }}</text>
            </template>
            <!-- Оси -->
            <line x1="40" y1="310" :x2="svgWidth - 20" y2="310" stroke="hsl(var(--border))" />
            <line x1="40" y1="10" x2="40" y2="310" stroke="hsl(var(--border))" />
          </svg>
          <!-- Tooltip -->
          <div
            v-if="tip"
            class="absolute z-10 bg-card border rounded-md shadow-lg px-3 py-2 text-sm pointer-events-none"
            :style="{ left: mx + 15 + 'px', top: my - 10 + 'px' }"
          >
            <p class="font-medium">{{ tip.m }}</p>
            <p>{{ tip.t }}: {{ tip.v.toLocaleString('ru-RU') }} ₽</p>
          </div>
        </div>
        <!-- Легенда -->
        <div class="flex justify-center gap-4 mt-2 mb-4 text-xs">
          <div class="flex items-center gap-1.5">
            <span class="inline-block h-2.5 w-2.5 rounded-full" style="background:hsl(150,40%,40%)" />
            <span class="text-muted-foreground">Доходы</span>
          </div>
          <div class="flex items-center gap-1.5">
            <span class="inline-block h-2.5 w-2.5 rounded-full" style="background:hsl(19,56%,40%)" />
            <span class="text-muted-foreground">Расходы</span>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

/** Элемент данных столбчатой диаграммы */
interface BarItem {
  month: string
  income: number
  expense: number
}

const props = defineProps<{
  /** Данные по месяцам */
  data: BarItem[]
}>()

// ============================================================
// ВЫЧИСЛЯЕМЫЕ РАЗМЕРЫ
// ============================================================
const maxVal = computed(() =>
  Math.max(...props.data.map(d => Math.max(d.income, d.expense)), 1)
)
const svgWidth = computed(() =>
  Math.max(500, props.data.length * 50 + 60)
)
const barGroupW = computed(() =>
  Math.max((svgWidth.value - 60) / Math.max(props.data.length, 1), 40)
)
const barW = computed(() => Math.max(barGroupW.value * 0.35, 10))
const barG = computed(() => Math.max(barGroupW.value * 0.1, 2))

/** Высота столбца в пикселях (максимум 275px) */
const barH = (v: number) => maxVal.value > 0 ? (v / maxVal.value) * 275 : 0

/** Форматирование значений оси Y (1000 → '1к') */
const formatY = (v: number) => v >= 1000 ? `${(v / 1000).toFixed(0)}к` : String(v)

// ============================================================
// HOVER И TOOLTIP
// ============================================================
const chartRef = ref<HTMLElement | null>(null)
const mx = ref(0)
const my = ref(0)
const hoveredBar = ref<string | null>(null)
const tip = ref<{ t: string; v: number; m: string } | null>(null)

const onMouseMove = (e: MouseEvent) => {
  if (chartRef.value) {
    const r = chartRef.value.getBoundingClientRect()
    mx.value = e.clientX - r.left
    my.value = e.clientY - r.top
  }
}

const onLeave = () => {
  hoveredBar.value = null
  tip.value = null
}
</script>
