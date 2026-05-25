<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-foreground">Счета</h1>
      <button
          class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          @click="openNew"
      >
        <Plus class="mr-2 h-4 w-4" /> Добавить
      </button>
    </div>

    <!-- Dialog -->
    <div v-if="dialogOpen" class="fixed inset-0 z-50 bg-black/50 flex items-center justify-center" @click.self="dialogOpen = false">
      <div class="relative mx-auto max-w-lg rounded-lg border bg-card p-6 shadow-lg">
        <h3 class="text-lg font-semibold">{{ editId ? 'Редактировать' : 'Новый счёт' }}</h3>
        <div class="space-y-4 py-4">
          <div class="space-y-2">
            <label class="text-sm font-medium leading-none">Название</label>
            <input
                v-model="name"
                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                placeholder="Название счёта"
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium leading-none">Валюта</label>
            <input
                v-model="currency"
                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                placeholder="RUB"
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium leading-none">Баланс</label>
            <input
                v-model="balance"
                type="number"
                step="0.01"
                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>
        </div>
        <div class="flex justify-end">
          <button
              class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
              @click="handleSave"
          >
            {{ editId ? 'Сохранить' : 'Добавить' }}
          </button>
        </div>
      </div>
    </div>

    <div class="rounded-lg border">
      <table class="w-full caption-bottom text-sm">
        <thead>
        <tr class="border-b transition-colors hover:bg-muted/50">
          <th class="h-12 px-4 text-left align-middle font-medium">Название</th>
          <th class="h-12 px-4 text-left align-middle font-medium">Валюта</th>
          <th class="h-12 px-4 text-right align-middle font-medium">Баланс</th>
          <th class="h-12 px-4 w-24 align-middle font-medium"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="a in accountStore.accounts" :key="a.id" class="border-b transition-colors hover:bg-muted/50">
          <td class="p-4 align-middle">{{ a.name }}</td>
          <td class="p-4 align-middle">{{ a.currency }}</td>
          <td class="p-4 align-middle text-right font-medium">{{ a.balance.toLocaleString('ru-RU') }} ₽</td>
          <td class="p-4 align-middle">
            <div class="flex gap-1">
              <button
                  class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9"
                  @click="openEdit(a.id)"
              >
                <Pencil class="h-4 w-4" />
              </button>
              <button
                  class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9"
                  @click="handleDelete(a.id)"
              >
                <Trash2 class="h-4 w-4 text-destructive" />
              </button>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAccountStore } from '@/stores/accounts'
import { useToast } from '@/composables/useToast'
import { Plus, Pencil, Trash2 } from 'lucide-vue-next'

const accountStore = useAccountStore()
const { toast } = useToast()

const dialogOpen = ref(false)
const editId = ref<string | null>(null)
const name = ref('')
const currency = ref('RUB')
const balance = ref('0')

const openNew = () => {
  editId.value = null
  name.value = ''
  currency.value = 'RUB'
  balance.value = '0'
  dialogOpen.value = true
}

const openEdit = (id: string) => {
  const a = accountStore.accounts.find(x => x.id === id)
  if (!a) return
  editId.value = id
  name.value = a.name
  currency.value = a.currency
  balance.value = a.balance.toString()
  dialogOpen.value = true
}

const handleSave = () => {
  if (!name.value.trim()) return
  const data = { name: name.value.trim(), currency: currency.value, balance: parseFloat(balance.value) || 0 }
  if (editId.value) {
    accountStore.updateAccount(editId.value, data)
    toast.success('Счёт обновлён')
  } else {
    accountStore.addAccount(data)
    toast.success('Счёт добавлен')
  }
  dialogOpen.value = false
}

const handleDelete = (id: string) => {
  accountStore.deleteAccount(id)
  toast.success('Удалено')
}
</script>
