<template>
  <!-- Круговая диаграмма (donut chart) -->
  <div class="rounded-lg border bg-card shadow-sm">
    <div class="flex flex-col space-y-1.5 p-6">
      <h3 class="text-2xl font-semibold leading-none tracking-tight">{{ title }}</h3>
    </div>
    <div class="p-6 pt-0">
      <template v-if="data.length === 0">
        <p class="py-8 text-center text-muted-foreground">Нет данных</p>
      </template>
      <template v-else>
        <div class="flex justify-center">
          <svg viewBox="0 0 200 200" class="w-64 h-64">
            <!-- Секторы круговой диаграммы -->
            <template v-for="(item, i) in data" :key="i">
              <path
                :d="getPieSlice(i, data)"
                :fill="colors[i % colors.length]"
                stroke="var(--card)"
                stroke-width="2"
                class="cursor-pointer transition-opacity"
                :opacity="hoveredIndex === i ? 1 : 0.85"
                @mouseenter="hoveredIndex = i"
                @mouseleave="hoveredIndex = null"
              />
            </template>
            <!-- Внутренний круг (donut hole) -->
            <circle cx="100" cy="100" r="45" fill="var(--card)" />
            <!-- Название выбранного сектора -->
            <text x="100" y="95" text-anchor="middle" fill="var(--foreground)" font-size="10" font-weight="500">
              {{ data[hoveredIndex ?? defaultIndex]?.name || '' }}
            </text>
            <!-- Значение выбранного сектора -->
            <text x="100" y="110" text-anchor="middle" fill="var(--muted-foreground)" font-size="9">
              {{ data[hoveredIndex ?? defaultIndex]?.value.toLocaleString('ru-RU') || 0 }} ₽
            </text>
            <!-- Процент выбранного сектора -->
            <text x="100" y="122" text-anchor="middle" fill="var(--muted-foreground)" font-size="8">
              {{ hoveredIndex !== null ? ((data[hoveredIndex].value / total) * 100).toFixed(1) : '' }}%
            </text>
          </svg>
        </div>
        <!-- Легенда -->
        <div class="flex flex-wrap justify-center gap-x-3 gap-y-1 mt-2 mb-4 px-4 text-xs">
          <div v-for="(entry, i) in data" :key="entry.name" class="flex items-center gap-1.5">
            <span class="inline-block h-2.5 w-2.5 rounded-full" :style="{ backgroundColor: colors[i % colors.length] }" />
            <span class="text-muted-foreground">{{ entry.name }}</span>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

/** Элемент данных круговой диаграммы */
interface PieDataItem {
  name: string
  value: number
}

interface Props {
  /** Заголовок диаграммы */
  title: string
  /** Массив данных секторов */
  data: PieDataItem[]
  /** Общая сумма для вычисления процентов */
  total: number
  /** Массив цветов для секторов */
  colors: string[]
  /** Индекс выбранного по умолчанию сектора */
  defaultIndex?: number
}

const props = withDefaults(defineProps<Props>(), {
  defaultIndex: 0,
})

/** Индекс наведённого сектора */
const hoveredIndex = ref<number | null>(null)

/**
 * Генерирует SVG path для сектора круговой диаграммы (donut chart).
 * @param index — индекс сектора в массиве data
 * @param data — массив с полями { name, value }
 * @returns SVG path string
 */
function getPieSlice(index: number, data: PieDataItem[]): string {
  const total = data.reduce((sum, d) => sum + d.value, 0)
  if (total === 0) return ''

  const cx = 100, cy = 100, r = 85 // центр и радиус
  let startAngle = 0
  // Вычисляем начальный угол, суммируя все предыдущие секторы
  for (let i = 0; i < index; i++) {
    startAngle += (data[i].value / total) * 2 * Math.PI
  }
  const sliceAngle = (data[index].value / total) * 2 * Math.PI
  const endAngle = startAngle + sliceAngle

  // Если сектор занимает почти весь круг — рисуем полный круг
  if (sliceAngle >= 2 * Math.PI - 0.001) {
    return `M${cx},${cy - r} A${r},${r} 0 1,1 ${cx - 0.01},${cy - r} Z`
  }

  // Координаты начальной и конечной точек дуги
  const x1 = cx + r * Math.sin(startAngle)
  const y1 = cy - r * Math.cos(startAngle)
  const x2 = cx + r * Math.sin(endAngle)
  const y2 = cy - r * Math.cos(endAngle)

  // largeArc=1 если угол > 180°
  const largeArc = sliceAngle > Math.PI ? 1 : 0

  return `M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${largeArc},1 ${x2},${y2} Z`
}
</script>
