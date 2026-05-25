<template>
  <div class="space-y-6">

    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-foreground">Теги</h1>
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
        <h3 class="text-lg font-semibold">{{ editId ? 'Редактировать' : 'Новый тег' }}</h3>
        <div class="space-y-4 py-4">
          <div class="space-y-2">
            <label class="text-sm font-medium leading-none">Название</label>
            <input
                v-model="name"
                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                placeholder="Название тега"
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium leading-none">Цвет</label>
            <div class="flex gap-2">
              <button
                  v-for="c in colorOptions"
                  :key="c"
                  type="button"
                  class="h-8 w-8 rounded-full border-2"
                  :class="color === c ? 'border-foreground' : 'border-transparent'"
                  :style="{ backgroundColor: c }"
                  @click="color = c"
              />
            </div>
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
          <th class="h-12 px-4 text-left align-middle font-medium">Тег</th>
          <th class="h-12 px-4 w-24 align-middle font-medium"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="t in tagStore.tags" :key="t.id" class="border-b transition-colors hover:bg-muted/50">
          <td class="p-4 align-middle">
              <span
                  class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"
                  :style="{ backgroundColor: t.color, color: '#fff' }"
              >
                {{ t.name }}
              </span>
          </td>
          <td class="p-4 align-middle">
            <div class="flex gap-1">
              <button
                  class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9"
                  @click="openEdit(t.id)"
              >
                <Pencil class="h-4 w-4" />
              </button>
              <button
                  class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9"
                  @click="handleDelete(t.id)"
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
import { useTagStore } from '@/stores/tags'
import { useToast } from '@/composables/useToast'
import { Plus, Pencil, Trash2 } from 'lucide-vue-next'

const tagStore = useTagStore()
const { toast } = useToast()

const colorOptions = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899', '#a3a3a3']

const dialogOpen = ref(false)
const editId = ref<string | null>(null)
const name = ref('')
const color = ref('#3b82f6')

const openNew = () => {
  editId.value = null
  name.value = ''
  color.value = '#3b82f6'
  dialogOpen.value = true
}

const openEdit = (id: string) => {
  const t = tagStore.tags.find(x => x.id === id)
  if (!t) return
  editId.value = id
  name.value = t.name
  color.value = t.color
  dialogOpen.value = true
}

const handleSave = () => {
  if (!name.value.trim()) return
  if (editId.value) {
    tagStore.updateTag(editId.value, { name: name.value.trim(), color: color.value })
    toast.success('Тег обновлён')
  } else {
    tagStore.addTag({ name: name.value.trim(), color: color.value })
    toast.success('Тег добавлен')
  }
  dialogOpen.value = false
}

const handleDelete = (id: string) => {
  tagStore.deleteTag(id)
  toast.success('Удалено')
}



</script>
