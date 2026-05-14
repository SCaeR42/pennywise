<template>
  <TransactionForm :edit-id="id" />
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import TransactionForm from '@/components/transactions/TransactionForm.vue'

const route = useRoute()
const id = route.params.id as string
</script>
