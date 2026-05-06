<script setup lang="ts">
/**
 * Компонент для визуального тестирования Tailwind CSS v4.0 и shadcn-vue компонентов.
 * Содержит примеры типографики, палитры, анимаций и UI компонентов.
 */
import { ref } from 'vue'

// Button
import { Button } from '@/components/ui/button'

// Card
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

// Input
import { Input } from '@/components/ui/input'

// Label
import { Label } from '@/components/ui/label'

// Badge
import { Badge } from '@/components/ui/badge'

// Alert
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert'

// Avatar
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'

// Checkbox
import { Checkbox } from '@/components/ui/checkbox'

// Switch
import { Switch } from '@/components/ui/switch'

// Progress
import { Progress } from '@/components/ui/progress'

// Tabs
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'

// Separator
import { Separator } from '@/components/ui/separator'

// Skeleton
import { Skeleton } from '@/components/ui/skeleton'

// Textarea
import { Textarea } from '@/components/ui/textarea'

// Toggle
import { Toggle } from '@/components/ui/toggle'

// Dialog
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogScrollContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

// Select
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

// Breadcrumb
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

// Dropdown Menu
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

// Form
import TransactionForm from '@/components/TestForm.vue'


// Pagination
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

// Popover
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

// Radio Group
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/radio-group'

// Sheet
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

// Sonner (Toast)
import { toast } from 'vue-sonner'


// Table
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

// Reactive state
const progressValue = ref(65)
const switchValue = ref(false)
const checkboxValue = ref(false)
const dialogOpen = ref(false)
const dialogScrollOpen = ref(false)
const dialogFormOpen = ref(false)
const selectedOption = ref('')
const togglePressed = ref(false)
const radioValue = ref('comfortable')
const sheetOpen = ref(false)
const dropdownOpen = ref(false)
const popoverOpen = ref(false)
</script>

<template>
  <div class="min-h-screen bg-background p-8 font-sans text-foreground">
    <header class="mb-12 border-b border-border pb-6">
      <h1 class="text-4xl font-extrabold tracking-tight lg:text-5xl">
        Tailwind CSS v4.0 + shadcn-vue Showcase
      </h1>
      <p class="mt-4 text-xl text-muted-foreground">
        Визуальное руководство по стилям, цветам, анимациям и UI компонентам.
      </p>
    </header>

    <div class="grid gap-12">
      <!-- Раздел 1: Типографика -->
      <section>
        <h2 class="mb-6 text-2xl font-semibold border-l-4 border-primary pl-4">Типографика</h2>
        <div class="space-y-4 rounded-xl border border-border p-6 bg-card shadow-sm">
          <h1 class="text-5xl font-black">Заголовок H1 (Black)</h1>
          <h2 class="text-4xl font-bold">Заголовок H2 (Bold)</h2>
          <h3 class="text-3xl font-medium">Заголовок H3 (Medium)</h3>
          <p class="text-base leading-7">
            Основной текст (Base). <span class="font-bold">Жирный текст</span>,
            <span class="italic">курсив</span> и <span class="underline decoration-primary">подчеркивание</span>.
          </p>
          <p class="text-sm text-muted-foreground">
            Вспомогательный текст (Muted Foreground, Small).
          </p>
          <code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
            const codeSample = "Inline Code Block";
          </code>
        </div>
      </section>

      <!-- Раздел 2: Цветовая палитра -->
      <section>
        <h2 class="mb-6 text-2xl font-semibold border-l-4 border-primary pl-4">Цвета и Фоны</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="flex flex-col gap-2">
            <div class="h-20 w-full rounded-md bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">Primary</div>
            <div class="h-20 w-full rounded-md bg-secondary flex items-center justify-center text-secondary-foreground text-xs font-bold">Secondary</div>
          </div>
          <div class="flex flex-col gap-2">
            <div class="h-20 w-full rounded-md bg-pink-600 flex items-center justify-center text-white text-xs font-bold">Pink-600</div>
            <div class="h-20 w-full rounded-md bg-pink-900 flex items-center justify-center text-white text-xs font-bold">Pink-900</div>
          </div>
          <div class="flex flex-col gap-2">
            <div class="h-20 w-full rounded-md bg-blue-500 flex items-center justify-center text-white text-xs font-bold">Blue-500</div>
            <div class="h-20 w-full rounded-md bg-emerald-500 flex items-center justify-center text-white text-xs font-bold">Emerald-500</div>
          </div>
          <div class="flex flex-col gap-2">
            <div class="h-20 w-full rounded-md bg-destructive flex items-center justify-center text-destructive-foreground text-xs font-bold">Destructive</div>
            <div class="h-20 w-full rounded-md bg-accent flex items-center justify-center text-accent-foreground text-xs font-bold">Accent</div>
          </div>
        </div>
      </section>

      <!-- Раздел 3: Анимации -->
      <section>
        <h2 class="mb-6 text-2xl font-semibold border-l-4 border-primary pl-4">Анимации (tailwindcss-animate)</h2>
        <div class="flex flex-wrap gap-8 p-6 rounded-xl border border-border bg-muted/30">
          <div class="flex flex-col items-center gap-2">
            <div class="h-16 w-16 bg-primary rounded-lg animate-bounce"></div>
            <span class="text-xs">Bounce</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <div class="h-16 w-16 bg-primary rounded-lg animate-pulse"></div>
            <span class="text-xs">Pulse</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <div class="h-16 w-16 bg-primary rounded-lg animate-spin"></div>
            <span class="text-xs">Spin</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <div class="h-16 w-16 bg-pink-600 rounded-lg animate-in fade-in slide-in-from-bottom-4 duration-1000"></div>
            <span class="text-xs">In + Slide</span>
          </div>
        </div>
      </section>

      <!-- Раздел 4: shadcn-vue Buttons -->
      <section>
        <h2 class="mb-6 text-2xl font-semibold border-l-4 border-primary pl-4">shadcn-vue: Кнопки</h2>
        <div class="rounded-xl border border-border p-6 bg-card shadow-sm">
          <div class="flex flex-wrap gap-4">
            <Button variant="default">Default</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
            <Button disabled>Disabled</Button>
            <Button size="sm">Small</Button>
            <Button size="lg">Large</Button>
            <Button size="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </Button>
          </div>
        </div>
      </section>

      <!-- Раздел 5: shadcn-vue Badges -->
      <section>
        <h2 class="mb-6 text-2xl font-semibold border-l-4 border-primary pl-4">shadcn-vue: Бейджи</h2>
        <div class="rounded-xl border border-border p-6 bg-card shadow-sm">
          <div class="flex flex-wrap gap-4">
            <Badge variant="default">Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
          </div>
        </div>
      </section>

      <!-- Раздел 6: shadcn-vue Cards -->
      <section>
        <h2 class="mb-6 text-2xl font-semibold border-l-4 border-primary pl-4">shadcn-vue: Карточки</h2>
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <!-- Карточка 1: Форма входа -->
          <Card>
            <CardHeader>
              <CardTitle>Вход в систему</CardTitle>
              <CardDescription>Введите свои данные для авторизации</CardDescription>
            </CardHeader>
            <CardContent>
              <div class="space-y-4">
                <div class="space-y-2">
                  <Label for="email">Email</Label>
                  <Input id="email" type="email" placeholder="user@example.com" />
                </div>
                <div class="space-y-2">
                  <Label for="password">Пароль</Label>
                  <Input id="password" type="password" />
                </div>
              </div>
            </CardContent>
            <CardFooter class="flex justify-between">
              <Button variant="outline">Отмена</Button>
              <Button>Войти</Button>
            </CardFooter>
          </Card>

          <!-- Карточка 2: Профиль пользователя -->
          <Card>
            <CardHeader>
              <CardTitle>Профиль</CardTitle>
              <CardDescription>Информация о пользователе</CardDescription>
            </CardHeader>
            <CardContent class="space-y-4">
              <div class="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                <div>
                  <p class="font-semibold">shadcn</p>
                  <p class="text-sm text-muted-foreground">@shadcn</p>
                </div>
              </div>
              <Separator />
              <div class="space-y-2">
                <div class="flex justify-between text-sm">
                  <span class="text-muted-foreground">Email</span>
                  <span>user@example.com</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-muted-foreground">Роль</span>
                  <Badge variant="outline">Администратор</Badge>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button class="w-full" variant="outline">Редактировать</Button>
            </CardFooter>
          </Card>

          <!-- Карточка 3: Статистика -->
          <Card>
            <CardHeader>
              <CardTitle>Статистика</CardTitle>
              <CardDescription>Прогресс выполнения задач</CardDescription>
            </CardHeader>
            <CardContent class="space-y-4">
              <div class="space-y-2">
                <div class="flex justify-between text-sm">
                  <span>Прогресс</span>
                  <span class="font-medium">{{ progressValue }}%</span>
                </div>
                <Progress :model-value="progressValue" />
              </div>
              <Separator />
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <Label for="notifications" class="text-sm">Уведомления</Label>
                  <Switch id="notifications" v-model:checked="switchValue" />
                </div>
                <div class="flex items-center space-x-2">
                  <Checkbox id="terms" v-model:checked="checkboxValue" />
                  <Label for="terms" class="text-sm">Принимаю условия</Label>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button size="sm" class="w-full">Обновить</Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      <!-- Раздел 7: shadcn-vue Tabs -->
      <section>
        <h2 class="mb-6 text-2xl font-semibold border-l-4 border-primary pl-4">shadcn-vue: Вкладки</h2>
        <Tabs default-value="account" class="w-full max-w-2xl">
          <TabsList>
            <TabsTrigger value="account">Аккаунт</TabsTrigger>
            <TabsTrigger value="password">Пароль</TabsTrigger>
            <TabsTrigger value="settings">Настройки</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Аккаунт</CardTitle>
                <CardDescription>Управление настройками аккаунта</CardDescription>
              </CardHeader>
              <CardContent class="space-y-4">
                <div class="space-y-2">
                  <Label for="name">Имя</Label>
                  <Input id="name" placeholder="Ваше имя" />
                </div>
                <div class="space-y-2">
                  <Label for="username">Имя пользователя</Label>
                  <Input id="username" placeholder="@username" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Сохранить</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>Пароль</CardTitle>
                <CardDescription>Изменение пароля</CardDescription>
              </CardHeader>
              <CardContent class="space-y-4">
                <div class="space-y-2">
                  <Label for="current">Текущий пароль</Label>
                  <Input id="current" type="password" />
                </div>
                <div class="space-y-2">
                  <Label for="new">Новый пароль</Label>
                  <Input id="new" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Обновить пароль</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Настройки</CardTitle>
                <CardDescription>Общие настройки приложения</CardDescription>
              </CardHeader>
              <CardContent class="space-y-4">
                <div class="space-y-2">
                  <Label for="language">Язык</Label>
                  <Select v-model="selectedOption">
                    <SelectTrigger class="w-full">
                      <SelectValue placeholder="Выберите язык" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="ru">Русский</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="de">Deutsch</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm">Тёмная тема</span>
                  <Switch />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Применить</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      <!-- Раздел 8: shadcn-vue Alerts -->
      <section>
        <h2 class="mb-6 text-2xl font-semibold border-l-4 border-primary pl-4">shadcn-vue: Оповещения</h2>
        <div class="space-y-4">
          <Alert>
            <AlertTitle>По умолчанию</AlertTitle>
            <AlertDescription>Это стандартное оповещение с описанием.</AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <AlertTitle>Ошибка</AlertTitle>
            <AlertDescription>Произошла критическая ошибка. Проверьте данные.</AlertDescription>
          </Alert>
          <Alert class="border-green-500 text-green-600">
            <AlertTitle class="text-green-600">Успех</AlertTitle>
            <AlertDescription>Операция выполнена успешно!</AlertDescription>
          </Alert>
        </div>
      </section>

      <!-- Раздел 9: shadcn-vue Dialog -->
      <section>
        <h2 class="mb-6 text-2xl font-semibold border-l-4 border-primary pl-4">shadcn-vue: Диалог</h2>
        <div class="rounded-xl border border-border p-6 bg-card shadow-sm">
          <div class="flex flex-wrap gap-4">
            <!-- Базовый диалог подтверждения -->
            <Dialog v-model:open="dialogOpen">
              <DialogTrigger as-child>
                <Button>Подтверждение</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Подтверждение действия</DialogTitle>
                  <DialogDescription>
                    Вы уверены, что хотите выполнить это действие? Это нельзя отменить.
                  </DialogDescription>
                </DialogHeader>
                <div class="space-y-4 py-4">
                  <Label for="confirm-text">Введите "подтвердить" для продолжения</Label>
                  <Input id="confirm-text" placeholder="подтвердить" />
                </div>
                <DialogFooter>
                  <Button variant="outline" @click="dialogOpen = false">Отмена</Button>
                  <Button variant="destructive">Подтвердить</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <!-- Диалог с прокруткой -->
            <Dialog v-model:open="dialogScrollOpen">
              <DialogTrigger as-child>
                <Button variant="outline">С прокруткой</Button>
              </DialogTrigger>
              <DialogScrollContent>
                <DialogHeader>
                  <DialogTitle>Условия использования</DialogTitle>
                  <DialogDescription>
                    Пожалуйста, ознакомьтесь с условиями перед продолжением.
                  </DialogDescription>
                </DialogHeader>
                <div class="space-y-4 py-4 max-h-[60vh] overflow-y-auto pr-2">
                  <div v-for="i in 20" :key="i" class="space-y-2">
                    <h4 class="font-medium">Раздел {{ i }}</h4>
                    <p class="text-sm text-muted-foreground">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" @click="dialogScrollOpen = false">Закрыть</Button>
                  <Button>Принимаю</Button>
                </DialogFooter>
              </DialogScrollContent>
            </Dialog>

            <!-- Диалог формы редактирования -->
            <Dialog v-model:open="dialogFormOpen">
              <DialogTrigger as-child>
                <Button variant="secondary">Редактирование</Button>
              </DialogTrigger>
              <DialogContent class="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>Редактировать профиль</DialogTitle>
                  <DialogDescription>
                    Внесите изменения в данные профиля. Нажмите сохранить когда закончите.
                  </DialogDescription>
                </DialogHeader>
                <div class="grid gap-4 py-4">
                  <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="name-edit" class="text-right">Имя</Label>
                    <Input id="name-edit" value="Иван Иванов" class="col-span-3" />
                  </div>
                  <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="username-edit" class="text-right">Логин</Label>
                    <Input id="username-edit" value="@ivanov" class="col-span-3" />
                  </div>
                  <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="email-edit" class="text-right">Email</Label>
                    <Input id="email-edit" type="email" value="ivan@example.com" class="col-span-3" />
                  </div>
                  <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="bio-edit" class="text-right col-start-1">О себе</Label>
                    <Textarea id="bio-edit" class="col-span-3" placeholder="Расскажите о себе..." />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" @click="dialogFormOpen = false">Отмена</Button>
                  <Button @click="dialogFormOpen = false">Сохранить</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <!-- Описание вариантов использования -->
          <div class="mt-6 space-y-3 text-sm text-muted-foreground">
            <p><strong class="text-foreground">Dialog</strong> — базовый диалог для подтверждений и простых форм.</p>
            <p><strong class="text-foreground">DialogScrollContent</strong> — диалог с прокручиваемым содержимым для длинных текстов.</p>
            <p><strong class="text-foreground">Dialog + форма</strong> — диалог для редактирования данных с полями ввода.</p>
          </div>
        </div>
      </section>

      <!-- Раздел 10: shadcn-vue Toggle & Textarea -->
      <section>
        <h2 class="mb-6 text-2xl font-semibold border-l-4 border-primary pl-4">shadcn-vue: Переключатель и Текстовое поле</h2>
        <div class="grid gap-6 md:grid-cols-2">
          <div class="rounded-xl border border-border p-6 bg-card shadow-sm space-y-4">
            <h3 class="text-lg font-semibold">Toggle</h3>
            <div class="flex flex-wrap gap-4">
              <Toggle v-model:pressed="togglePressed">
                {{ togglePressed ? 'Включено' : 'Выключено' }}
              </Toggle>
              <Toggle variant="outline">Outline</Toggle>
              <Toggle disabled>Disabled</Toggle>
            </div>
          </div>
          <div class="rounded-xl border border-border p-6 bg-card shadow-sm space-y-4">
            <h3 class="text-lg font-semibold">Textarea</h3>
            <Textarea placeholder="Введите текст..." />
            <Textarea placeholder="Отключено" disabled />
          </div>
        </div>
      </section>

      <!-- Раздел 11: shadcn-vue Skeleton (загрузка) -->
      <section>
        <h2 class="mb-6 text-2xl font-semibold border-l-4 border-primary pl-4">shadcn-vue: Скелетон загрузки</h2>
        <div class="rounded-xl border border-border p-6 bg-card shadow-sm">
          <div class="flex items-center gap-4">
            <Skeleton class="h-12 w-12 rounded-full" />
            <div class="space-y-2">
              <Skeleton class="h-4 w-[250px]" />
              <Skeleton class="h-4 w-[200px]" />
            </div>
          </div>
          <Separator class="my-4" />
          <div class="space-y-3">
            <Skeleton class="h-4 w-full" />
            <Skeleton class="h-4 w-[90%]" />
            <Skeleton class="h-4 w-[80%]" />
          </div>
        </div>
      </section>

      <!-- Раздел 12: shadcn-vue Avatar -->
      <section>
        <h2 class="mb-6 text-2xl font-semibold border-l-4 border-primary pl-4">shadcn-vue: Аватары</h2>
        <div class="rounded-xl border border-border p-6 bg-card shadow-sm">
          <div class="flex flex-wrap gap-6">
            <div class="flex flex-col items-center gap-2">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
              <span class="text-xs text-muted-foreground">С изображением</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <Avatar class="h-16 w-16">
                <AvatarFallback>AB</AvatarFallback>
              </Avatar>
              <span class="text-xs text-muted-foreground">Без изображения (Large)</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <Avatar class="h-8 w-8">
                <AvatarFallback>SM</AvatarFallback>
              </Avatar>
              <span class="text-xs text-muted-foreground">Small</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Раздел 13: shadcn-vue Breadcrumb -->
      <section>
        <h2 class="mb-6 text-2xl font-semibold border-l-4 border-primary pl-4">shadcn-vue: Навигационная цепочка</h2>
        <div class="rounded-xl border border-border p-6 bg-card shadow-sm">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Главная</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/components">Компоненты</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      <!-- Раздел 14: shadcn-vue Dropdown Menu -->
      <section>
        <h2 class="mb-6 text-2xl font-semibold border-l-4 border-primary pl-4">shadcn-vue: Выпадающее меню</h2>
        <div class="rounded-xl border border-border p-6 bg-card shadow-sm">
          <DropdownMenu v-model:open="dropdownOpen">
            <DropdownMenuTrigger as-child>
              <Button variant="outline">Открыть меню</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent class="w-56">
              <DropdownMenuLabel>Мой аккаунт</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  Профиль
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Настройки
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Клавиши
                  <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Выйти
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </section>

      <!-- Раздел 15: shadcn-vue Form -->
      <section>
        <h2 class="mb-6 text-2xl font-semibold border-l-4 border-primary pl-4">shadcn-vue: Форма</h2>
        <div class="rounded-xl border border-border p-6 bg-card shadow-sm max-w-md">
          <div class="space-y-6">
            <TransactionForm />
          </div>
        </div>
      </section>

      <!-- Раздел 16: shadcn-vue Pagination -->
      <section>
        <h2 class="mb-6 text-2xl font-semibold border-l-4 border-primary pl-4">shadcn-vue: Пагинация</h2>
        <div class="rounded-xl border border-border p-6 bg-card shadow-sm">
          <Pagination v-slot="{ page }" :total="100" :sibling-count="1" show-edges :default-page="2" :items-per-page="10">
            <PaginationContent>
              <PaginationItem :value="1">
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem :value="1" :is-active="page === 1">
                1
              </PaginationItem>
              <PaginationItem :value="2" :is-active="page === 2">
                2
              </PaginationItem>
              <PaginationItem :value="3" :is-active="page === 3">
                3
              </PaginationItem>
              <PaginationItem :value="4">
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem :value="10">
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </section>

      <!-- Раздел 17: shadcn-vue Popover -->
      <section>
        <h2 class="mb-6 text-2xl font-semibold border-l-4 border-primary pl-4">shadcn-vue: Поповер</h2>
        <div class="rounded-xl border border-border p-6 bg-card shadow-sm">
          <Popover v-model:open="popoverOpen">
            <PopoverTrigger as-child>
              <Button variant="outline">Открыть поповер</Button>
            </PopoverTrigger>
            <PopoverContent class="w-80">
              <div class="grid gap-4">
                <div class="space-y-2">
                  <h4 class="font-medium leading-none">Размеры</h4>
                  <p class="text-sm text-muted-foreground">
                    Настройте размеры элемента.
                  </p>
                </div>
                <div class="grid gap-2">
                  <div class="grid grid-cols-3 items-center gap-4">
                    <Label for="width">Ширина</Label>
                    <Input id="width" type="text" default-value="100%" class="col-span-2 h-8" />
                  </div>
                  <div class="grid grid-cols-3 items-center gap-4">
                    <Label for="height">Высота</Label>
                    <Input id="height" type="text" default-value="25px" class="col-span-2 h-8" />
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </section>

      <!-- Раздел 18: shadcn-vue Radio Group -->
      <section>
        <h2 class="mb-6 text-2xl font-semibold border-l-4 border-primary pl-4">shadcn-vue: Группа переключателей</h2>
        <div class="rounded-xl border border-border p-6 bg-card shadow-sm">
          <RadioGroup v-model="radioValue" class="gap-4">
            <div class="flex items-center space-x-2">
              <RadioGroupItem id="r1" value="default" />
              <Label for="r1">По умолчанию</Label>
            </div>
            <div class="flex items-center space-x-2">
              <RadioGroupItem id="r2" value="comfortable" />
              <Label for="r2">Комфортный</Label>
            </div>
            <div class="flex items-center space-x-2">
              <RadioGroupItem id="r3" value="compact" />
              <Label for="r3">Компактный</Label>
            </div>
          </RadioGroup>
          <p class="mt-4 text-sm text-muted-foreground">
            Выбрано: <span class="font-medium">{{ radioValue }}</span>
          </p>
        </div>
      </section>

      <!-- Раздел 19: shadcn-vue Sheet (Боковая панель) -->
      <section>
        <h2 class="mb-6 text-2xl font-semibold border-l-4 border-primary pl-4">shadcn-vue: Боковая панель (Sheet)</h2>
        <div class="rounded-xl border border-border p-6 bg-card shadow-sm">
          <Sheet v-model:open="sheetOpen">
            <SheetTrigger as-child>
              <Button variant="outline">Открыть боковую панель</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Боковая панель</SheetTitle>
                <SheetDescription>
                  Это боковая панель с дополнительной информацией.
                </SheetDescription>
              </SheetHeader>
              <div class="mt-6 space-y-4">
                <p class="text-sm text-muted-foreground">
                  Здесь можно разместить навигацию, настройки или любой другой контент.
                </p>
                <Separator />
                <div class="space-y-2">
                  <Label>Пункт меню 1</Label>
                  <Input placeholder="Введите значение" />
                </div>
                <div class="space-y-2">
                  <Label>Пункт меню 2</Label>
                  <Input placeholder="Введите значение" />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </section>

      <!-- Раздел 20: shadcn-vue Sonner (Toast уведомления) -->
      <section>
        <h2 class="mb-6 text-2xl font-semibold border-l-4 border-primary pl-4">shadcn-vue: Toast уведомления (Sonner)</h2>
        <div class="rounded-xl border border-border p-6 bg-card shadow-sm">
          <div class="flex flex-wrap gap-4">
            <Button @click="toast('Это простое уведомление')">
              Простое
            </Button>
            <Button variant="outline" @click="toast.success('Операция выполнена успешно!')">
              Успех
            </Button>
            <Button variant="outline" @click="toast.error('Произошла ошибка!')">
              Ошибка
            </Button>
            <Button variant="outline" @click="toast.info('Информационное сообщение')">
              Информация
            </Button>
            <Button variant="outline" @click="toast.warning('Предупреждение!')">
              Предупреждение
            </Button>
            <Button variant="outline" @click="toast('Действие выполнено', { description: 'Подробное описание действия', action: { label: 'Отмена', onClick: () => console.log('Отменено') } })">
              С действием
            </Button>
          </div>
        </div>
      </section>

      <!-- Раздел 21: shadcn-vue Table -->
      <section>
        <h2 class="mb-6 text-2xl font-semibold border-l-4 border-primary pl-4">shadcn-vue: Таблица</h2>
        <div class="rounded-xl border border-border p-6 bg-card shadow-sm">
          <Table>
            <TableCaption>Список последних транзакций</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Дата</TableHead>
                <TableHead>Описание</TableHead>
                <TableHead>Категория</TableHead>
                <TableHead class="text-right">Сумма</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell class="font-medium">2024-01-15</TableCell>
                <TableCell>Зарплата</TableCell>
                <TableCell><Badge variant="outline">Доход</Badge></TableCell>
                <TableCell class="text-right text-green-600 font-semibold">+50 000 ₽</TableCell>
              </TableRow>
              <TableRow>
                <TableCell class="font-medium">2024-01-16</TableCell>
                <TableCell>Продукты</TableCell>
                <TableCell><Badge variant="secondary">Еда</Badge></TableCell>
                <TableCell class="text-right text-red-600 font-semibold">-3 500 ₽</TableCell>
              </TableRow>
              <TableRow>
                <TableCell class="font-medium">2024-01-17</TableCell>
                <TableCell>Подписка Netflix</TableCell>
                <TableCell><Badge>Развлечения</Badge></TableCell>
                <TableCell class="text-right text-red-600 font-semibold">-999 ₽</TableCell>
              </TableRow>
              <TableRow>
                <TableCell class="font-medium">2024-01-18</TableCell>
                <TableCell>Такси</TableCell>
                <TableCell><Badge variant="outline">Транспорт</Badge></TableCell>
                <TableCell class="text-right text-red-600 font-semibold">-750 ₽</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>
    </div>

    <footer class="mt-16 text-center text-sm text-muted-foreground border-t pt-8">
      Разработано в рамках проекта "Учёт финансов" на Vue 3 + Tailwind v4.0 + shadcn-vue
    </footer>
  </div>


</template>
