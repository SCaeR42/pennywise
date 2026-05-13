<template>
  <div class="flex min-h-screen items-center justify-center bg-background p-4 wrapper">
    <div class="text-center">
      <h1 class="text-6xl font-bold mb-4">404</h1>
      <p class="text-xl text-muted-foreground mb-8">Страница не найдена</p>
      <RouterLink
          to="/"
          class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
      >
        Вернуться на главную
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import {RouterLink} from 'vue-router'
</script>
