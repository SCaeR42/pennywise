<template>
  <section class="relative overflow-hidden py-24 md:py-36">
    <div class="container mx-auto px-4">
      <div class="grid items-center gap-12 lg:grid-cols-2">
        <!-- Left column -->
        <div class="max-w-xl">
          <p class="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">
            Эстетика вашего капитала
          </p>
          <h1 class="mb-6 text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Ваши деньги под <span class="text-primary">умным</span> присмотром
          </h1>
          <p class="mb-8 text-lg leading-relaxed text-muted-foreground">
            Философия осознанного потребления в тёплых тонах. Анализируйте, копите и достигайте целей в интерфейсе, который вдохновляет на стабильность.
          </p>
          <div class="flex flex-col gap-4 sm:flex-row">
            <RouterLink
              to="/register"
              class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 gap-2"
            >
              Начать путь <ArrowRight class="h-4 w-4" />
            </RouterLink>
            <RouterLink
              to="/login"
              class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8 gap-2"
            >
              <Play class="h-4 w-4" /> Демо-версия
            </RouterLink>
          </div>
        </div>

        <!-- Right column – decorative card -->
        <div class="relative hidden items-center justify-center lg:flex">
          <div class="relative w-full max-w-md">
            <!-- Glow -->
            <div class="absolute -inset-4 rounded-3xl bg-primary/10 blur-2xl" />
            <div class="relative overflow-hidden rounded-2xl border bg-card p-8 shadow-2xl">
              <!-- Mini chart bars -->
              <div class="mb-6 flex items-end gap-3 h-32">
                <div
                  v-for="(h, i) in [40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 95, 50]"
                  :key="i"
                  class="flex-1 rounded-t-sm bg-primary/70 transition-all hover:bg-primary"
                  :style="{ height: `${h}%` }"
                />
              </div>
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <span class="text-sm text-muted-foreground">Баланс</span>
                  <span class="text-lg font-bold text-foreground">₽ 284 500</span>
                </div>
                <div class="h-2 rounded-full bg-muted overflow-hidden">
                  <div class="h-full w-3/4 rounded-full bg-primary" />
                </div>
                <p class="text-center text-xs text-muted-foreground">Визуализация баланса</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ArrowRight, Play } from 'lucide-vue-next'
</script>
