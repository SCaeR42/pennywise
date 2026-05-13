/**
 * Модуль генерации демонстрационных данных
 * Создаёт реалистичные тестовые данные (счета, теги, транзакции)
 * с использованием seeded random для воспроизводимости результатов
 */
import type { Transaction, Account, Tag } from '@/types/finance';
import { DEFAULT_CATEGORIES } from '@/lib/defaults';

/**
 * Генератор псевдослучных чисел с фиксированным seed
 * Обеспечивает одинаковый результат при каждом запуске (seed = 42)
 * Это нужно, чтобы демо-данные были стабильными и не менялись при перезагрузке
 */
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const rand = seededRandom(42);

/** Получить случайный элемент из массива */
const pick = <T>(arr: T[]): T => arr[Math.floor(rand() * arr.length)];

/** Получить случайное целое число в диапазоне [min, max] */
const randInt = (min: number, max: number) => Math.floor(rand() * (max - min + 1)) + min;

/**
 * Демонстрационные счета — расширенный набор
 * Включает рублёвые, валютные, кредитные и накопительные счета
 */
export const DEMO_ACCOUNTS: Account[] = [
  { id: 'demo-acc-1', name: 'Сбербанк Дебетовая', currency: 'RUB', balance: 125400 },
  { id: 'demo-acc-2', name: 'Тинькофф Black', currency: 'RUB', balance: 89200 },
  { id: 'demo-acc-3', name: 'Альфа-Банк Зарплатная', currency: 'RUB', balance: 210000 },
  { id: 'demo-acc-4', name: 'Наличные RUB', currency: 'RUB', balance: 15600 },
  { id: 'demo-acc-5', name: 'Wise USD', currency: 'USD', balance: 2340 },
  { id: 'demo-acc-6', name: 'Revolut EUR', currency: 'EUR', balance: 1870 },
  { id: 'demo-acc-7', name: 'ВТБ Накопительный', currency: 'RUB', balance: 450000 },
  { id: 'demo-acc-8', name: 'Райффайзен Кредитная', currency: 'RUB', balance: -32000 },
  { id: 'demo-acc-9', name: 'Газпромбанк Депозит', currency: 'RUB', balance: 600000 },
  { id: 'demo-acc-10', name: 'Крипто (Binance)', currency: 'USDT', balance: 5200 },
];

/**
 * Пул названий для генерации демо-тегов
 * Охватывает основные сферы расходов и доходов
 */
const TAG_NAMES = [
  'Еда', 'Транспорт', 'Дом', 'Работа', 'Здоровье', 'Спорт', 'Отдых', 'Кафе', 'Одежда', 'Техника',
  'Подарки', 'Образование', 'Книги', 'Кино', 'Музыка', 'Игры', 'Путешествия', 'Отпуск', 'Аптека', 'Врач',
  'Стоматолог', 'Страховка', 'Налоги', 'Штрафы', 'Бензин', 'Парковка', 'Метро', 'Автобус', 'Такси', 'Каршеринг',
  'Самокат', 'Электричка', 'Авиа', 'Поезд', 'Отель', 'Хостел', 'Аренда', 'Ипотека', 'ЖКХ', 'Интернет',
  'Телефон', 'Подписки', 'Netflix', 'Spotify', 'YouTube', 'iCloud', 'VPN', 'Домен', 'Хостинг', 'SaaS',
  'Фриланс', 'Зарплата', 'Премия', 'Бонус', 'Кэшбэк', 'Дивиденды', 'Проценты', 'Возврат', 'Перевод', 'Долг',
  'Кредит', 'Рассрочка', 'Благотворительность', 'Донат', 'Чаевые', 'Ремонт', 'Мебель', 'Сантехника', 'Электрика', 'Стройматериалы',
  'Сад', 'Питомец', 'Ветеринар', 'Корм', 'Косметика', 'Парикмахер', 'Маникюр', 'Массаж', 'Баня', 'Бассейн',
  'Тренажёрка', 'Йога', 'Бег', 'Велосипед', 'Лыжи',
];

/**
 * Палитра цветов для тегов
 * Используется Tailwind-совместимая HEX-палитра
 */
const TAG_COLORS = [
  '#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16',
  '#22c55e', '#14b8a6', '#06b6d4', '#0ea5e9', '#3b82f6',
  '#6366f1', '#8b5cf6', '#a855f7', '#d946ef', '#ec4899',
  '#f43f5e', '#78716c', '#a3a3a3',
];

/**
 * Генерация демо-тегов из пула названий
 * Цвета распределяются циклически по палитре
 */
export const DEMO_TAGS: Tag[] = TAG_NAMES.map((name, i) => ({
  id: `demo-tag-${i + 1}`,
  name,
  color: TAG_COLORS[i % TAG_COLORS.length],
}));

/**
 * Пул комментариев для транзакций
 * Добавляет реалистичности демо-данным
 */
const COMMENTS: string[] = [
  'Плановая покупка на неделю',
  'Срочная необходимость',
  'Подарок на день рождения',
  'Ежемесячный платёж',
  'Возврат долга другу',
  'Пополнение накопительного счёта',
  'Спонтанная покупка — не повторять',
  'Скидка 30% — выгодно',
  'Оплата за прошлый месяц',
  'Поездка на дачу',
  'Совместный ужин с коллегами',
  'Абонемент на 3 месяца',
  'Обновление гардероба к сезону',
  'Ремонт телефона — разбил экран',
  'Доставка из IKEA',
  'Закупка канцелярии в офис',
  'Билеты на концерт',
  'Аренда машины на выходные',
  'Перевод родителям',
  'Инвестиция в ETF',
  'Кэшбэк за ноябрь',
  'Оплата хостинга на год',
  'Утренний кофе — привычка',
  'Страховка на автомобиль',
  'Детский лагерь — предоплата',
  'Возврат товара — Amazon',
  'Подписка на курс по Python',
  'Покупка велосипеда б/у',
  'Ремонт ванной — сантехник',
  'Чаевые курьеру',
];

/**
 * Генерация 590 демо-транзакций за ~2.5 года
 * Распределение типов: 55% расходы, 30% доходы, 15% переводы
 * Суммы варьируются в реалистичных диапазонах
 */
function generateDemoTransactions(): Transaction[] {
  const transactions: Transaction[] = [];
  const categoryIds = DEFAULT_CATEGORIES.map(c => c.id);
  const accountIds = DEMO_ACCOUNTS.map(a => a.id);
  const tagIds = DEMO_TAGS.map(t => t.id);

  // Рассчитываем стартовую дату: сегодня минус ~885 дней (590 * 1.5)
  const totalDays = 590 * 1.5;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const startDate = new Date(today.getTime() - totalDays * 86400000);
  let currentDate = new Date(startDate);

  for (let i = 0; i < 590; i++) {
    // Сдвигаем дату на 1-2 дня вперёд
    currentDate = new Date(currentDate.getTime() + (randInt(1, 2)) * 86400000);
    // Не выходим за пределы сегодняшнего дня
    if (currentDate > today) currentDate = new Date(today);

    // Определяем тип транзакции по вероятности
    const typeRoll = rand();
    const type = typeRoll < 0.55 ? 'expense' : typeRoll < 0.85 ? 'income' : 'transfer';

    // Сумма зависит от типа транзакции
    const amount = type === 'transfer'
      ? randInt(1000, 50000)
      : type === 'income'
        ? randInt(5000, 150000)
        : randInt(50, 25000);

    // Назначаем 0-3 случайных тега
    const numTags = randInt(0, 3);
    const txTags: string[] = [];
    for (let t = 0; t < numTags; t++) {
      const tag = pick(tagIds);
      if (!txTags.includes(tag)) txTags.push(tag);
    }

    // Комментарий добавляется к каждой 10-й, 16-й или 38-й транзакции
    let comment = '';
    if ((i + 1) % 10 === 0 || (i + 1) % 16 === 0 || (i + 1) % 38 === 0) {
      comment = pick(COMMENTS);
    }

    // Определяем счета-источник и назначение
    const sourceAccountId = type === 'expense' || type === 'transfer' ? pick(accountIds) : undefined;
    let destinationAccountId = type === 'income' || type === 'transfer' ? pick(accountIds) : undefined;
    // Для переводов гарантируем разные счета
    if (type === 'transfer' && destinationAccountId === sourceAccountId) {
      destinationAccountId = accountIds.find(a => a !== sourceAccountId) || accountIds[0];
    }

    transactions.push({
      id: `demo-tx-${i + 1}`,
      date: currentDate.toISOString().split('T')[0],
      amount,
      type,
      sourceAccountId,
      destinationAccountId,
      categoryId: pick(categoryIds),
      tagIds: txTags,
      comment,
      createdAt: currentDate.toISOString(),
    });
  }

  return transactions;
}

/**
 * Кэш сгенерированных транзакций
 * Предотвращает повторную генерацию при каждом вызове
 */
let _cachedTransactions: Transaction[] | null = null;

/**
 * Получить демо-транзакции (с кэшированием)
 * @returns Массив из 590 сгенерированных транзакций
 */
export function getDemoTransactions(): Transaction[] {
  if (!_cachedTransactions) {
    _cachedTransactions = generateDemoTransactions();
  }
  return _cachedTransactions;
}
