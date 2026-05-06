<script setup lang="ts">
import { Toaster } from '@/components/ui/sonner'
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />

  <!-- Глобальный провайдер уведомлений -->
  <!-- Оптимальные настройки для Fintech-проекта (Zinc стиль) -->
  <Toaster
      position="top-right"
      rich-colors
      close-button
      :toast-options="{
      style: {
        borderRadius: '12px',
      },
    }"
  />

</template>
