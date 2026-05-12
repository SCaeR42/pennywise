<template>
  <footer class="border-t py-12">
    <div class="container mx-auto px-4">
      <div class="grid gap-8 md:grid-cols-3">
        <!-- Brand -->
        <div>
          <div class="mb-3 flex items-center gap-2">
            <Wallet class="h-5 w-5 text-primary" />
            <span class="text-lg font-bold text-foreground">ФинУчёт</span>
          </div>
          <p class="text-sm text-muted-foreground">
            Эстетика управления капиталом в новом свете.
          </p>
        </div>

        <!-- Links -->
        <div>
          <h4 class="mb-3 text-sm font-semibold text-foreground">Продукт</h4>
          <ul class="space-y-2 text-sm text-muted-foreground">
            <li><RouterLink to="/" class="transition-colors hover:text-primary">Функции</RouterLink></li>
            <li><RouterLink to="/" class="transition-colors hover:text-primary">Безопасность</RouterLink></li>
          </ul>
        </div>

        <!-- Newsletter -->
        <div>
          <h4 class="mb-3 text-sm font-semibold text-foreground">Подпишитесь на новости</h4>
          <form @submit.prevent="handleSubscribe" class="flex gap-2">
            <input
              v-model="email"
              type="email"
              placeholder="Email"
              class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <button
              type="submit"
              class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4"
            >
              ОК
            </button>
          </form>
        </div>
      </div>

      <div class="mt-8 border-t pt-6 text-center text-xs text-muted-foreground">
        © {{ currentYear }} ФинУчёт. Стиль и стабильность.
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { Wallet } from 'lucide-vue-next'
import { useToast } from '@/composables/useToast'

const email = ref('')
const { toast } = useToast()

const currentYear = computed(() => new Date().getFullYear())

const handleSubscribe = () => {
  if (email.value) {
    toast.success('Вы подписаны на новости!')
    email.value = ''
  }
}
</script>
