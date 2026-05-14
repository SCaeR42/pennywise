<template>
  <div class="mx-auto max-w-2xl space-y-6">
    <h1 class="text-2xl font-bold text-foreground">Настройки</h1>

    <!-- Profile -->
    <div class="rounded-lg border bg-card shadow-sm">
      <div class="flex flex-col space-y-1.5 p-6">
        <h3 class="text-2xl font-semibold leading-none tracking-tight flex items-center gap-2">
          <User class="h-5 w-5"/>
          Профиль
        </h3>
      </div>
      <div class="p-6 pt-0 space-y-4">
        <div class="flex items-center gap-4">
          <div class="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
            {{ authStore.user?.name?.charAt(0)?.toUpperCase() || '?' }}
          </div>
          <div>
            <p class="font-medium text-foreground">{{ authStore.user?.name }}</p>
            <p class="text-sm text-muted-foreground">{{ authStore.user?.email }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Security -->
    <div class="rounded-lg border bg-card shadow-sm">
      <div class="flex flex-col space-y-1.5 p-6">
        <h3 class="text-2xl font-semibold leading-none tracking-tight">Безопасность</h3>
        <p class="text-sm text-muted-foreground">Смена пароля</p>
      </div>
      <div class="p-6 pt-0">
        <form @submit.prevent="handlePasswordChange" class="space-y-4">
          <div class="space-y-2">
            <label class="text-sm font-medium leading-none">Текущий пароль</label>
            <input
                v-model="password"
                type="password"
                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium leading-none">Новый пароль</label>
            <input
                v-model="newPassword"
                type="password"
                minlength="6"
                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>
          <button
              type="submit"
              class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            Сменить пароль
          </button>
        </form>
      </div>
    </div>


    <!-- Display -->
    <div class="rounded-lg border bg-card shadow-sm">
      <div class="flex flex-col space-y-1.5 p-6">
        <h3 class="text-2xl font-semibold leading-none tracking-tight">Отображение</h3>
      </div>
      <div class="p-6 pt-0 space-y-4">
        <div class="space-y-2">
          <label class="text-sm font-medium leading-none">Цветовая тема</label>
          <div class="flex gap-2">
            <button
                v-for="t in themeOptions"
                :key="t.value"
                class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 px-3 gap-2"
                :class="themeStore.theme === t.value ? 'bg-primary text-primary-foreground' : 'border border-input bg-background hover:bg-accent hover:text-accent-foreground'"
                @click="themeStore.setTheme(t.value)"
            >
              <component :is="t.icon" class="h-4 w-4" />
              {{ t.label }}
            </button>
          </div>
        </div>
        <div class="space-y-2">
          <label class="text-sm font-medium leading-none">Строк в списках</label>
          <select
              :value="dataStore.settings.rowsPerPage"
              @change="onRowsPerPageChange"
              class="flex h-10 w-32 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option v-for="n in rowsPerPageList" :key="n" :value="n">{{ n }}</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Billing -->
    <div class="rounded-lg border bg-card shadow-sm">
      <div class="flex flex-col space-y-1.5 p-6">
        <h3 class="text-2xl font-semibold leading-none tracking-tight">Биллинг</h3>
        <p class="text-sm text-muted-foreground">Текущий тариф и подписка</p>
      </div>
      <div class="p-6 pt-0 space-y-4">
        <div class="flex items-center gap-2">
          <span class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">Бесплатный</span>
          <span class="text-sm text-muted-foreground">Активен</span>
        </div>
        <hr class="border-border" />
        <p class="text-sm font-medium text-foreground">Сменить тариф:</p>
        <div class="grid gap-3 md:grid-cols-3">
          <div
              v-for="plan in PRICING_PLANS"
              :key="plan.id"
              class="rounded-lg border p-4"
              :class="plan.popular ? 'border-primary' : ''"
          >
            <p class="font-medium text-foreground">{{ plan.name }}</p>
            <p class="text-lg font-bold text-foreground">
              {{ plan.price === 0 ? 'Бесплатно' : `${plan.price}₽/${plan.period}` }}
            </p>
            <button
                class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 px-3 mt-2 w-full"
                :class="plan.id === 'free' ? 'bg-secondary text-secondary-foreground' : 'border border-input bg-background hover:bg-accent hover:text-accent-foreground'"
                :disabled="plan.id === 'free'"
                @click="toast.info('Оплата будет доступна после подключения backend')"
            >
              {{ plan.id === 'free' ? 'Текущий' : 'Выбрать' }}
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {useAuthStore} from '@/stores/auth'
import {useDataStore} from '@/stores/data'
import {useThemeStore} from '@/stores/theme'
import {useToast} from '@/composables/useToast'
import {User, Moon, Sun, Monitor} from 'lucide-vue-next'
import {PRICING_PLANS} from '@/lib/defaults'

const authStore = useAuthStore()
const dataStore = useDataStore()
const themeStore = useThemeStore()
const {toast} = useToast()

//region Security
const password = ref('')
const newPassword = ref('')

const handlePasswordChange = () => {
  toast.success('Пароль обновлён (демо)')
  password.value = ''
  newPassword.value = ''
}
//endregion Security

const themeOptions = [
  { value: 'light', label: 'Светлая', icon: Sun },
  { value: 'dark', label: 'Тёмная', icon: Moon },
  { value: 'system', label: 'Системная', icon: Monitor },
]

const rowsPerPageList = [5, 10, 20, 50]
const onRowsPerPageChange = (e: Event) => {
  const target = e.target as HTMLSelectElement
  dataStore.updateSettings({rowsPerPage: parseInt(target.value)})
}

</script>
