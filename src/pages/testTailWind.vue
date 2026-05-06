<script setup lang="ts">
/**
 * Компонент для визуального тестирования Tailwind CSS v4.0.
 * Содержит примеры типографики, палитры и анимаций.
 */
</script>

<template>
  <div class="min-h-screen bg-background p-8 font-sans text-foreground">
    <header class="mb-12 border-b border-border pb-6">
      <h1 class="text-4xl font-extrabold tracking-tight lg:text-5xl">
        Tailwind CSS v4.0 Showcase
      </h1>
      <p class="mt-4 text-xl text-muted-foreground">
        Визуальное руководство по стилям, цветам и анимациям в проекте.
      </p>
    </header>

    <div class="grid gap-12">
      <!-- Раздел 1: Типографика -->
      <section>
        <h2 class="mb-6 text-2xl font-semibold border-l-4 border-primary pl-4">Типографика</h2>
        <div class="space-y-4 rounded-xl border border-border p-6 bg-card shadow-sm">
          <h1 class="text-5xl font-black">Заголовок H1 (Black)</h1>
          <h2 class="text-4xl font-bold">Заголовок H2 (Bold)</h2>
          <h3 class="text-3xl font-medium">Заголовок H3 (Medium)</h3>
          <p class="text-base leading-7">
            Основной текст (Base). <span class="font-bold">Жирный текст</span>,
            <span class="italic">курсив</span> и <span class="underline decoration-primary">подчеркивание</span>.
          </p>
          <p class="text-sm text-muted-foreground">
            Вспомогательный текст (Muted Foreground, Small).
          </p>
          <code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
            const codeSample = "Inline Code Block";
          </code>
        </div>
      </section>

      <!-- Раздел 2: Цветовая палитра -->
      <section>
        <h2 class="mb-6 text-2xl font-semibold border-l-4 border-primary pl-4">Цвета и Фоны</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <!-- Основные цвета Shadcn/UI -->
          <div class="flex flex-col gap-2">
            <div class="h-20 w-full rounded-md bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">Primary</div>
            <div class="h-20 w-full rounded-md bg-secondary flex items-center justify-center text-secondary-foreground text-xs font-bold">Secondary</div>
          </div>
          <!-- Акцентные цвета Tailwind -->
          <div class="flex flex-col gap-2">
            <div class="h-20 w-full rounded-md bg-pink-600 flex items-center justify-center text-white text-xs font-bold">Pink-600</div>
            <div class="h-20 w-full rounded-md bg-pink-900 flex items-center justify-center text-white text-xs font-bold">Pink-900</div>
          </div>
          <div class="flex flex-col gap-2">
            <div class="h-20 w-full rounded-md bg-blue-500 flex items-center justify-center text-white text-xs font-bold">Blue-500</div>
            <div class="h-20 w-full rounded-md bg-emerald-500 flex items-center justify-center text-white text-xs font-bold">Emerald-500</div>
          </div>
          <div class="flex flex-col gap-2">
            <div class="h-20 w-full rounded-md bg-destructive flex items-center justify-center text-destructive-foreground text-xs font-bold">Destructive</div>
            <div class="h-20 w-full rounded-md bg-accent flex items-center justify-center text-accent-foreground text-xs font-bold">Accent</div>
          </div>
        </div>
      </section>

      <!-- Раздел 3: Анимации -->
      <section>
        <h2 class="mb-6 text-2xl font-semibold border-l-4 border-primary pl-4">Анимации (tailwindcss-animate)</h2>
        <div class="flex flex-wrap gap-8 p-6 rounded-xl border border-border bg-muted/30">
          <div class="flex flex-col items-center gap-2">
            <div class="h-16 w-16 bg-primary rounded-lg animate-bounce"></div>
            <span class="text-xs">Bounce</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <div class="h-16 w-16 bg-primary rounded-lg animate-pulse"></div>
            <span class="text-xs">Pulse</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <div class="h-16 w-16 bg-primary rounded-lg animate-spin"></div>
            <span class="text-xs">Spin</span>
          </div>
          <!-- Входные анимации (требуют плагин tailwindcss-animate) -->
          <div class="flex flex-col items-center gap-2">
            <div class="h-16 w-16 bg-pink-600 rounded-lg animate-in fade-in slide-in-from-bottom-4 duration-1000"></div>
            <span class="text-xs">In + Slide</span>
          </div>
        </div>
      </section>
    </div>

    <footer class="mt-16 text-center text-sm text-muted-foreground border-t pt-8">
      Разработано в рамках проекта "Учёт финансов" на Vue 3 + Tailwind v4.0
    </footer>
  </div>
</template>