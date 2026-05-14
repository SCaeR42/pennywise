<template>
  <div :class="wrapClass">
    <a :href="baseUrl" :class="textClass">
      <Wallet :class="iconClass"/>
    </a>
    <a v-if="!hideText" :href="baseUrl" :class="textClass">{{ APP_CONFIG.NAME }}</a>
  </div>
</template>

<script setup lang="ts">
import {APP_CONFIG} from "@/constants";
import {Wallet} from "lucide-vue-next";

const baseUrl = import.meta.env.BASE_URL

const props = defineProps<{
  wrapClass?: string,
  textClass?: string,
  iconClass?: string,
  hideText?: boolean
}>()

const textClass = props.textClass ?? 'text-lg font-bold text-foreground'
const iconClass = props.iconClass ?? 'h-6 w-6 text-primary'
const wrapClass = props.wrapClass ?? 'flex items-center gap-2'

</script>

<style scoped>
</style>

<!--

<AppLogo />
<AppLogo
    textClass="mb-3 flex items-center gap-2"
    iconClass="h-6 w-6 text-primary"
/>

-->

