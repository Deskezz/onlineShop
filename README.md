# TechHaven

> Демо-проект современного онлайн-магазина электроники для портфолио.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Zustand](https://img.shields.io/badge/State-Zustand-orange)](https://zustand-demo.pmnd.rs/)

---

## О проекте

**TechHaven** — это многостраничный e-commerce демо-сайт с реалистичным пользовательским потоком:

- просмотр каталога и карточек товаров;
- добавление в корзину и избранное;
- checkout в 3 шага;
- профиль с историей заказов;
- мультиязычность (RU/EN), темы (light/dark), поиск по товарам.

Проект создан как **демонстрация уровня Middle/Senior frontend-разработки**: архитектура, типобезопасность, UX-детали, стабильная сборка и аккуратная работа с состоянием.

---

## Что реализовано

### Core функционал

- Главная страница с витриной и категориями
- Каталог: фильтры, сортировка, пагинация, мобильный drawer
- Карточка товара: варианты, количество, отзывы, похожие товары
- Корзина: изменение количества, промокод, summary
- Checkout: wizard + валидация форм
- Success page после оформления
- Профиль: overview, заказы, избранное

### UX и интерфейс

- Единая дизайн-система компонентов
- Адаптивность (desktop/tablet/mobile)
- Поиск с модалкой, debounce и горячими клавишами (`Cmd/Ctrl + K`)
- Корректное закрытие оверлеев, блокировка скролла
- Пустые состояния и визуальный фидбек

### Локализация и валюты

- `RU / EN` через `next-intl`
- Переключение валют `RUB / USD / EUR`
- Корректная конвертация цен (а не простая смена символа валюты)

### Данные и состояние

- Нормализованные мок-данные (товары, отзывы, заказы)
- Клиентские сторы на `Zustand + persist`
- Гидратация persist-стейтов через безопасный слой

---

## Технологический стек

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript (`strict`)
- **Styles:** Tailwind CSS v4, CVA, tailwind-merge
- **State:** Zustand (`persist`)
- **Forms:** React Hook Form + Zod
- **i18n:** next-intl
- **Icons:** Lucide React
- **Animations:** Framer Motion (микро-анимации)

---

## Архитектурные акценты

- Разделение server/client компонентов без смешивания ответственности
- Типобезопасные контракты данных
- Переиспользуемые UI-компоненты и композиция
- Нормализация данных корзины/избранного
- Предсказуемая структура проекта для масштабирования

---

## Структура проекта

```txt
src/
  app/[locale]/            # роутинг и страницы (App Router + i18n)
  components/              # ui, layout, catalog, product, cart, checkout, profile, search
  data/                    # мок-данные: товары, отзывы, заказы, категории
  hooks/                   # custom hooks (debounce, media, scroll-lock, currency)
  lib/                     # типы, утилиты, константы
  stores/                  # Zustand stores
messages/                  # локализации RU/EN
public/assets/products/    # локальные изображения товаров
```

---

## Локальный запуск

```bash
npm install
npm run dev
```

Открыть в браузере: `http://localhost:3000`

Сборка production:

```bash
npm run build
npm run start
```

---

## Что показывает этот проект работодателю

- умение строить **законченный пользовательский продукт**, а не только отдельные экраны;
- владение современным стеком Next.js/TypeScript;
- аккуратная работа с архитектурой, состоянием, типами и UX;
- способность доводить проект до стабильного состояния и полировки.

---

## Контакты

- Telegram: [@deskezz](https://t.me/deskezz)
- GitHub: [Deskezz](https://github.com/Deskezz)
