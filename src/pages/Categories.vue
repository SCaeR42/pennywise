<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-foreground">Категории</h1>
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
        <h3 class="text-lg font-semibold">{{ editId ? 'Редактировать' : 'Новая категория' }}</h3>
        <div class="space-y-4 py-4">
          <div class="space-y-2">
            <label class="text-sm font-medium leading-none">Название</label>
            <input
                v-model="name"
                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                placeholder="Название категории"
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
          <th class="h-12 px-4 w-24 align-middle font-medium"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="c in dataStore.categories" :key="c.id" class="border-b transition-colors hover:bg-muted/50">
          <td class="p-4 align-middle">{{ c.name }}</td>
          <td class="p-4 align-middle">
            <div class="flex gap-1">
              <button
                  class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9"
                  @click="openEdit(c.id, c.name)"
              >
                <Pencil class="h-4 w-4" />
              </button>
              <button
                  class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9"
                  @click="handleDelete(c.id)"
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
import { useDataStore } from '@/stores/data'
import { useToast } from '@/composables/useToast'
import { Plus, Pencil, Trash2 } from 'lucide-vue-next'

const dataStore = useDataStore()
const { toast } = useToast()

const dialogOpen = ref(false)
const editId = ref<string | null>(null)
const name = ref('')

const openNew = () => {
  editId.value = null
  name.value = ''
  dialogOpen.value = true
}

const openEdit = (id: string, n: string) => {
  editId.value = id
  name.value = n
  dialogOpen.value = true
}

const handleSave = () => {
  if (!name.value.trim()) return
  if (editId.value) {
    dataStore.updateCategory(editId.value, { name: name.value.trim() })
    toast.success('Категория обновлена')
  } else {
    dataStore.addCategory({ name: name.value.trim() })
    toast.success('Категория добавлена')
  }
  dialogOpen.value = false
}

const handleDelete = (id: string) => {
  dataStore.deleteCategory(id)
  toast.success('Удалено')
}
</script>
