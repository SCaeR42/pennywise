<template>
  <!-- Линейный график: тренд расходов -->
  <div class="rounded-lg border bg-card shadow-sm">
    <div class="flex flex-col space-y-1.5 p-6">
      <h3 class="text-2xl font-semibold">Тренд расходов</h3>
    </div>
    <div class="p-6 pt-0">
      <p v-if="data.length === 0" class="py-8 text-center text-muted-foreground">Нет данных</p>
      <div v-else ref="chartRef" class="relative px-6">
        <svg
          :viewBox="`0 0 ${svgWidth} 300`"
          class="w-full"
          style="height:300px"
          preserveAspectRatio="xMidYMid meet"
          @mousemove="onMouseMove"
          @mouseleave="onLeave"
        >
          <!-- Горизонтальные линии сетки -->
          <line
            v-for="i in 5"
            :key="i"
            x1="40"
            :y1="260 - i * 45"
            :x2="svgWidth - 20"
            :y2="260 - i * 45"
            stroke="hsl(var(--border))"
            stroke-dasharray="3 3"
          />
          <!-- Заливка области -->
          <path :d="areaPath" fill="hsl(19,56%,40%)" fill-opacity="0.15" />
          <!-- Линия тренда -->
          <path :d="linePath" fill="none" stroke="hsl(19,56%,40%)" stroke-width="2" />
          <!-- Точки с hover -->
          <circle
            v-for="(item, idx) in data"
            :key="idx"
            :cx="45 + idx * groupW"
            :cy="260 - (item.value / maxVal) * 240"
            :r="hoveredIdx === idx ? 6 : 4"
            fill="hsl(19,56%,40%)"
            class="cursor-pointer"
            @mouseenter="hoveredIdx = idx; tip = item"
            @mouseleave="hoveredIdx = null; tip = null"
          />
          <!-- Метки оси X -->
          <text
            v-for="(item, idx) in data"
            :key="'x' + idx"
            :x="45 + idx * groupW"
            y="275"
            text-anchor="middle"
            fill="hsl(var(--muted-foreground))"
            font-size="9"
          >{{ item.month }}</text>
          <!-- Оси -->
          <line x1="40" y1="10" x2="40" y2="260" stroke="hsl(var(--border))" />
          <line x1="40" y1="260" :x2="svgWidth - 20" y2="260" stroke="hsl(var(--border))" />
        </svg>
        <!-- Tooltip -->
        <div
          v-if="tip"
          class="absolute z-10 bg-card border rounded-md shadow-lg px-3 py-2 text-sm pointer-events-none"
          :style="{ left: mx + 15 + 'px', top: my - 10 + 'px' }"
        >
          <p class="font-medium">{{ tip.month }}</p>
          <p>Расходы: {{ tip.value.toLocaleString('ru-RU') }} ₽</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

/** Элемент данных линейного графика */
interface TrendItem {
  month: string
  value: number
}

const props = defineProps<{
  /** Данные тренда расходов */
  data: TrendItem[]
}>()

// ============================================================
// ВЫЧИСЛЯЕМЫЕ РАЗМЕРЫ
// ============================================================
const maxVal = computed(() => Math.max(...props.data.map(d => d.value), 1))
const svgWidth = computed(() => Math.max(500, props.data.length * 50 + 60))
const groupW = computed(() =>
  Math.max((svgWidth.value - 60) / Math.max(props.data.length, 1), 40)
)

/** SVG path для линии тренда */
const linePath = computed(() =>
  props.data.map((item, i) =>
    `${i === 0 ? 'M' : 'L'}${45 + i * groupW.value},${260 - (item.value / maxVal.value) * 240}`
  ).join(' ')
)

/** SVG path для заливки области под линией */
const areaPath = computed(() => {
  if (!props.data.length) return ''
  const pts = props.data.map((item, i) => ({
    x: 45 + i * groupW.value,
    y: 260 - (item.value / maxVal.value) * 240
  }))
  const line = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ')
  return `${line} L${pts[pts.length - 1].x},260 L${pts[0].x},260 Z`
})

// ============================================================
// HOVER И TOOLTIP
// ============================================================
const chartRef = ref<HTMLElement | null>(null)
const mx = ref(0)
const my = ref(0)
const hoveredIdx = ref<number | null>(null)
const tip = ref<TrendItem | null>(null)

const onMouseMove = (e: MouseEvent) => {
  if (chartRef.value) {
    const r = chartRef.value.getBoundingClientRect()
    mx.value = e.clientX - r.left
    my.value = e.clientY - r.top
  }
}

const onLeave = () => {
  hoveredIdx.value = null
  tip.value = null
}
</script>
