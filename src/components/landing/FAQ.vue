<template>
  <section class="border-t py-24">
    <div class="container mx-auto max-w-3xl px-4">
      <div class="mb-12 text-center">
        <h2 class="mb-4 text-3xl font-bold text-foreground md:text-4xl">
          Часто задаваемые вопросы
        </h2>
        <p class="text-muted-foreground">
          Всё, что нужно знать об управлении финансами в ФинУчёт
        </p>
      </div>
      <div class="w-full space-y-3">
        <div
          v-for="(faq, i) in faqs"
          :key="i"
          class="rounded-xl border bg-card px-6"
        >
          <button
            class="flex w-full items-center justify-between py-4 text-left font-medium hover:no-underline"
            @click="toggleItem(i)"
          >
            <span>{{ faq.q }}</span>
            <ChevronDown
              class="h-5 w-5 shrink-0 transition-transform duration-200"
              :class="{ 'rotate-180': openIndex === i }"
            />
          </button>
          <div
            v-show="openIndex === i"
            class="overflow-hidden pb-4"
          >
            <p class="text-muted-foreground leading-relaxed">
              {{ faq.a }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ChevronDown } from 'lucide-vue-next'

const faqs = [
  { q: 'Как работает синхронизация с банками?', a: 'Мы подключаемся к вашим банковским счетам через официальные API в режиме «только чтение». Это позволяет получать данные о транзакциях без доступа к распоряжению средствами.' },
  { q: 'Насколько безопасны мои финансовые данные?', a: 'Все данные шифруются по стандарту AES-256. Мы не храним ваши логины и пароли от банковских сервисов на своих серверах.' },
  { q: 'Могу ли я вести бюджет в разных валютах?', a: 'Да, поддерживается автоматическая конвертация по текущему курсу ЦБ. Можно создавать счета в рублях, долларах, евро и криптовалютах.' },
  { q: 'Как работает семейный доступ?', a: 'В Premium-тарифе можно пригласить до 5 участников. У каждого свой аккаунт, но вы можете создавать общие кошельки для совместных расходов.' },
  { q: 'Что если я захочу удалить свой аккаунт?', a: 'Вы можете полностью удалить свои данные в любой момент. Вся информация о транзакциях и счетах будет безвозвратно удалена.' },
  { q: 'Есть ли мобильное приложение?', a: 'Да, приложение доступно в App Store и Google Play. Веб-версия и мобильные приложения мгновенно синхронизируются.' },
  { q: 'Можно ли импортировать данные из других приложений?', a: 'Поддерживается импорт в форматах CSV и XLS из большинства популярных банковских приложений.' },
  { q: 'Как работает система категорий и тегов?', a: 'Система автоматически распознаёт транзакции. Вы можете создавать свои категории, подкатегории и теги для детального анализа.' },
  { q: 'Нужно ли платить за обновления?', a: 'Все обновления внутри вашего тарифного плана бесплатны. Мы регулярно добавляем новые возможности.' },
]

const openIndex = ref<number | null>(null)

const toggleItem = (index: number) => {
  openIndex.value = openIndex.value === index ? null : index
}
</script>
