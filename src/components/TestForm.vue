<script setup lang="ts">
import {useForm} from 'vee-validate'
import {toTypedSchema} from '@vee-validate/zod'
import * as z from 'zod'

import {Button} from '@/components/ui/button'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {Input} from '@/components/ui/input'
import {toast} from 'vue-sonner'

// 1. Определение схемы валидации
const formSchema = toTypedSchema(z.object({
  email: z
      .string({required_error: 'Email обязателен для заполнения'})
      .email('Некорректный формат email'),
}))

// 2. Инициализация формы
const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    email: '',
  },
})

// 3. Обработчик отправки
const onSubmit = form.handleSubmit((values) => {
  toast.success('Данные формы:', {
    description: JSON.stringify(values, null, 2),
  })
})
</script>

<template>
  <section>
    <h2 class="mb-6 text-2xl font-semibold border-l-4 border-primary pl-4">
      shadcn-vue: Форма
    </h2>
    <div class="rounded-xl border border-border p-6 bg-card shadow-sm max-w-md">
      <!-- Важно: используем стандартный тег form с обработчиком vee-validate -->
      <form @submit="onSubmit" class="space-y-6">

        <!-- Контекстный провайдер для поля email -->
        <FormField v-slot="{ componentField }" name="email">
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <!-- v-bind="componentField" связывает события input, blur и значение -->
              <Input
                  type="email"
                  placeholder="Введите email"
                  v-bind="componentField"
              />
            </FormControl>
            <FormDescription>
              Мы никогда не передадим ваш email третьим лицам.
            </FormDescription>
            <FormMessage/>
          </FormItem>
        </FormField>

        <Button type="submit">Отправить</Button>
      </form>
    </div>
  </section>
</template>