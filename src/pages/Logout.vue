<script setup lang="ts">
import {useRouter} from 'vue-router'
import {useAuthStore} from '@/stores/auth'


const router = useRouter()
const authStore = useAuthStore()
authStore.logout()

router.push('/')

</script>

<template>

</template>

<style scoped>

</style>