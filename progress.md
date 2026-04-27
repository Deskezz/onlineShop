# Прогресс разработки: Демо-сайт онлайн-магазина электроники

## ЭТАП 1: Фундамент (Завершён)
- [x] Обновлён план, добавлено правило о запрете git-коммитов ИИ
- [x] Next.js 14+ (фактически 16.x) установлен с поддержкой App Router, TypeScript, Tailwind, ESLint.
- [x] Зависимости установлены: cva, tailwind-merge, clsx, next-intl, zustand, lucide-react, framer-motion, react-hook-form, zod.
- [x] Изображения перемещены в `public/assets/products/`.
- [x] Настроен Tailwind v4 (дизайн-система Soft Obsidian через CSS переменные в globals.css).
- [x] Настроены шрифты Inter + Inter Tight.
- [x] Созданы утилиты: `src/lib/utils.ts` (`cn()`, `formatPrice()`, `normalizeQuery()`, `generateOrderNumber()`, `slugify()`).
- [x] Созданы типы: `src/lib/types.ts`.
- [x] Созданы константы: `src/lib/constants.ts`.
- [x] Созданы хуки: `useHydratedStore`, `useDebounce`, `useMediaQuery`, `useScrollLock`.
- [x] Создан стор темы: `src/stores/themeStore.ts` с поддержкой persist и гидратации через `useHydratedStore`.
- [x] Создан `ThemeProvider` для синхронизации HTML-класса `dark`/`light`.
- [x] Настроен `next-intl` (routing, request config, messages: ru.json, en.json, navigation)
- [x] Создан `proxy.ts` (Next.js 16) вместо middleware.
- [x] Настроен `src/app/[locale]/layout.tsx` с провайдерами `NextIntlClientProvider` и `ThemeProvider`.
- [x] Создана заглушка `src/app/[locale]/page.tsx`.
- [x] Проверка `npm run build`.

## ЭТАП 2: Дизайн-система (Завершён)
- [x] Создан `Button` (cva: default, secondary, outline, ghost, link).
- [x] Создан `Badge` (варианты: new, sale, bestseller, limited, outline).
- [x] Создан `Input` (c поддержкой start/end иконок и состоянием error).
- [x] Создан `Card` и его составные части (Header, Title, Description, Content, Footer).
- [x] Создан `Skeleton` для fallbacks.
- [x] Создан `Rating` компонент на базе `lucide-react` (с половинками звёзд).
- [x] Реализована кастомная `Toast` система через Context и Framer Motion.
- [x] Создан barrel файл `src/components/ui/index.ts`.
- [x] `ToastProvider` добавлен в корневой layout.
- [x] Проверка сборки `npm run build` прошла успешно.

## ЭТАП 3: Layout (Завершён)
- [x] Создан `DemoBanner` (уведомление "Это демо-версия магазина").
- [x] Созданы переключатели `ThemeToggle` и `LanguageToggle`.
- [x] Создан `MobileMenu` (гамбургер-меню с анимацией Framer Motion и блокировкой скролла).
- [x] Создан `Header` (лого, навигация, кнопки поиска/корзины/профиля) с эффектом скрытия при скролле вниз.
- [x] Создан `Footer` с основными ссылками магазина и соцсетями.
- [x] Создан `Breadcrumbs` для динамической навигации.
- [x] `layout.tsx` обновлен: `DemoBanner`, `Header` и `Footer` добавлены в DOM.
- [x] Проверка сборки `npm run build` прошла успешно.

## ЭТАП 4: Данные и стейт (Завершён)
- [x] Добавлены нормализованные моки товаров: `src/data/products.ts`.
- [x] Добавлены спецификации товаров: `src/data/product-specs.ts`.
- [x] Добавлены отзывы товаров: `src/data/product-reviews.ts`.
- [x] Добавлены предзаполненные демо-заказы: `src/data/orders.ts`.
- [x] Добавлен демо-пользователь: `src/data/demo-user.ts`.
- [x] Добавлены barrel-экспорты данных: `src/data/index.ts`.
- [x] Создан `cartStore` с `persist` и лимитами количества/позиций.
- [x] Создан `favoritesStore` с нормализованным хранением (`productId`, `variantKey`).
- [x] Создан `ordersStore` с `persist` и merge логикой статических заказов + сохранённых в localStorage.
- [x] Создан `langStore` с `persist`.
- [x] Добавлен barrel-экспорт сторов: `src/stores/index.ts`.
- [x] Обновлены типы избранного: `FavoriteItem` теперь поддерживает `variantKey`.
- [x] Проверка сборки `npm run build` прошла успешно.

## Текущий статус
Этап 4 завершён. Ожидаем подтверждения пользователя для перехода к Этапу 5.

## Следующий шаг
ЭТАП 5: Главная страница. Hero секция, Categories Grid, Featured Products, Promo секция.
