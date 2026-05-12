<template>
  <section class="border-t py-24">
    <div class="container mx-auto px-4">
      <div class="mx-auto mb-16 max-w-2xl text-center">
        <h2 class="mb-4 text-3xl font-bold text-foreground md:text-4xl">
          Функционал нового поколения
        </h2>
        <p class="text-muted-foreground">
          Мы объединили мощные алгоритмы и природные оттенки комфорта.
        </p>
      </div>
      <div class="grid gap-8 md:grid-cols-3">
        <div
          v-for="f in features"
          :key="f.title"
          class="group rounded-2xl border bg-card p-8 transition-all hover:border-primary/50 hover:shadow-lg"
        >
          <div class="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            <component :is="f.icon" class="h-6 w-6" />
          </div>
          <h3 class="mb-3 text-xl font-semibold text-card-foreground">{{ f.title }}</h3>
          <p class="leading-relaxed text-muted-foreground">{{ f.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Cpu, Globe, ShieldCheck } from 'lucide-vue-next'

const features = [
  {
    icon: Cpu,
    title: 'Автоматизация',
    desc: 'Интеллектуальная система сама распределяет ваши транзакции по категориям.',
  },
  {
    icon: Globe,
    title: 'Мультивалютность',
    desc: 'Единое окно для учёта криптоактивов, фиатных счетов и инвестиций.',
  },
  {
    icon: ShieldCheck,
    title: 'Приватность 3.0',
    desc: 'Ваши данные — только ваши. Локальное хранение с облачной синхронизацией.',
  },
]
</script>
