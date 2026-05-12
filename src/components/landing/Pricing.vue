<template>
  <section class="border-t py-24">
    <div class="container mx-auto px-4">
      <h2 class="mb-4 text-center text-3xl font-bold text-foreground md:text-4xl">
        Прозрачные тарифы
      </h2>

      <div class="mb-12 flex items-center justify-center gap-3">
        <label for="billing-toggle" class="text-sm text-muted-foreground">Месяц</label>
        <button
          id="billing-toggle"
          role="switch"
          :aria-checked="yearly"
          class="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50"
          :class="{ 'bg-primary': yearly, 'bg-input': !yearly }"
          @click="yearly = !yearly"
        >
          <span
            class="pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform duration-200 ease-in-out"
            :class="{ 'translate-x-5': yearly, 'translate-x-0': !yearly }"
          />
        </button>
        <label for="billing-toggle" class="text-sm text-muted-foreground">
          Год <span class="text-primary font-semibold">-20%</span>
        </label>
      </div>

      <div class="mx-auto grid max-w-3xl gap-8 md:grid-cols-2">
        <div
          v-for="plan in plans"
          :key="plan.id"
          class="relative flex flex-col rounded-2xl border bg-card p-6 shadow-sm"
          :class="plan.popular ? 'border-primary shadow-xl shadow-primary/10' : ''"
        >
          <div
            v-if="plan.popular"
            class="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground"
          >
            ПОПУЛЯРНО
          </div>
          <div class="text-center pb-2">
            <h3 class="text-xl tracking-wide">{{ plan.name }}</h3>
            <div class="mt-4">
              <span class="text-4xl font-bold text-foreground">
                {{ getPlanPrice(plan) === 0 ? '0₽' : `${getPlanPrice(plan).toLocaleString()}₽` }}
              </span>
              <span v-if="getPlanPeriod(plan)" class="text-muted-foreground">{{ getPlanPeriod(plan) }}</span>
            </div>
          </div>
          <div class="flex-1 pt-4">
            <ul class="space-y-3">
              <li v-for="f in plan.features" :key="f.text" class="flex items-center gap-3 text-sm">
                <Check v-if="f.included" class="h-4 w-4 shrink-0 text-primary" />
                <X v-else class="h-4 w-4 shrink-0 text-muted-foreground/50" />
                <span :class="f.included ? 'text-foreground' : 'text-muted-foreground/50'">
                  {{ f.text }}
                </span>
              </li>
            </ul>
          </div>
          <div class="pt-4">
            <RouterLink
              to="/register"
              class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 w-full"
              :class="plan.popular ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'border border-input bg-background hover:bg-accent hover:text-accent-foreground'"
            >
              {{ plan.popular ? 'Активировать' : 'Попробовать' }}
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { Check, X } from 'lucide-vue-next'

interface PlanFeature {
  text: string
  included: boolean
}

interface Plan {
  id: string
  name: string
  monthlyPrice: number
  yearlyPrice: number
  popular?: boolean
  features: PlanFeature[]
}

const yearly = ref(false)

const plans: Plan[] = [
  {
    id: 'basic',
    name: 'BASIC',
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      { text: '3 кошелька', included: true },
      { text: 'Ручной импорт', included: true },
      { text: 'Базовая аналитика', included: true },
      { text: 'Синхронизация с банками', included: false },
    ],
  },
  {
    id: 'premium',
    name: 'PREMIUM',
    popular: true,
    monthlyPrice: 390,
    yearlyPrice: 312 * 12,
    features: [
      { text: 'Безлимитные счета', included: true },
      { text: 'Авто-импорт (API банков)', included: true },
      { text: 'Семейный доступ (до 5 чел)', included: true },
      { text: 'Экспорт в PDF/CSV', included: true },
    ],
  },
]

const getPlanPrice = (plan: Plan) => yearly.value ? plan.yearlyPrice : plan.monthlyPrice
const getPlanPeriod = (plan: Plan) => {
  const price = getPlanPrice(plan)
  return price === 0 ? '' : yearly.value ? '/год' : '/мес'
}
</script>
