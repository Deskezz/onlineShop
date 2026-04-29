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

## ЭТАП 5: Главная страница (Завершён)
- [x] Реализован `HeroSection` со статичным изображением и CTA.
- [x] Реализован `CategoriesGrid` с сеткой категорий (локализованные названия и описания).
- [x] Реализован `FeaturedProducts` с подборкой товаров и кнопкой перехода в каталог.
- [x] Реализован `PromoSection` с промокодом `DEMO`.
- [x] Реализован переиспользуемый `ProductCard` для карточек товаров.
- [x] Добавлены данные категорий: `src/data/categories.ts`.
- [x] Обновлена главная страница `src/app/[locale]/page.tsx` (сборка секций, локализация, выбор featured-товаров).
- [x] Добавлены barrel-экспорты для новых компонентов и данных.
- [x] Проверка сборки `npm run build` прошла успешно.

## ЭТАП 6: Каталог (Завершён)
- [x] Добавлен route каталога: `src/app/[locale]/catalog/page.tsx`.
- [x] Реализована клиентская фильтрация по категории, бренду, цене и рейтингу.
- [x] Реализована сортировка: featured / price asc / price desc / rating / newest.
- [x] Реализована пагинация товаров на клиенте.
- [x] Реализованы бейджи активных фильтров с точечным удалением и общим сбросом.
- [x] Реализован desktop `FilterSidebar`.
- [x] Реализованы мобильные фильтры через drawer (`MobileFiltersDrawer`) с `useScrollLock()`.
- [x] Добавлен компонентный набор каталога (`CatalogPageClient`, `ProductsGrid`, `SortSelect`, `Pagination`, `FilterSidebar`, `ActiveFilters`).
- [x] Сохранён server/client boundary: страница каталога серверная, интерактивная логика в клиентских компонентах.
- [x] Расширен ассортимент до 31 товара с корректным соответствием названий и локальных фото (без тестовых `Tech*` позиций).
- [x] Исправлен мобильный UX каталога для 320px: убрано обрезание карточек/пагинации, переработана адаптивность сортировки.
- [x] Пагинация обновлена: компактный мобильный вид, кнопки навигации `<` и `>`, сокращённый список страниц с `...`.
- [x] Мобильное меню переработано в стабильный левый sidebar (улучшены контраст и зоны клика).
- [x] Проверка сборки `npm run build` прошла успешно.

## ЭТАП 7: Карточка товара (Завершён)
- [x] Добавлен route карточки товара: `src/app/[locale]/product/[slug]/page.tsx`.
- [x] Реализована галерея товара (`ProductGallery`) с выбором миниатюр.
- [x] Реализован info-блок товара (`ProductDetailsClient`) с:
  - [x] выбором варианта (цвет/память) через `ProductVariantSelector`;
  - [x] изменением количества `+/-`;
  - [x] добавлением в корзину (`cartStore`) и избранное (`favoritesStore`);
  - [x] корректной гидратацией persist-сторов через `useHydratedStore`.
- [x] Реализован блок спецификаций (`ProductSpecs`).
- [x] Реализован блок отзывов (`ProductReviews`).
- [x] Реализован блок похожих товаров (`RelatedProducts`) по текущей категории.
- [x] Обновлены ссылки карточек `ProductCard`: переход на `'/product/[slug]'`.
- [x] Для ключевых товаров добавлены варианты (цвет/память) в `src/data/products.ts`.
- [x] Проверка сборки `npm run build` прошла успешно.

## ЭТАП 8: Корзина (Завершён)
- [x] Добавлен route корзины: `src/app/[locale]/cart/page.tsx`.
- [x] Реализован список товаров корзины (`CartItemRow`) с:
  - [x] изменением количества `+/-`;
  - [x] удалением позиции.
- [x] Реализован sticky summary (`CartSummary`) на desktop.
- [x] Реализован промокод `DEMO` со скидкой `-10%` и уведомлениями.
- [x] Реализовано empty-state состояние (`EmptyCart`).
- [x] Реализован переход к checkout (`/checkout`).
- [x] Реализован резолв нормализованных данных корзины из `data/products.ts` + variant modifiers.
- [x] Проверка сборки `npm run build` прошла успешно.

## ЭТАП 9: Checkout (Завершён)
- [x] Добавлен route checkout: `src/app/[locale]/checkout/page.tsx`.
- [x] Реализован checkout wizard на 3 шага: доставка → оплата → подтверждение.
- [x] Реализована валидация форм на `react-hook-form + zod`.
- [x] Добавлено предзаполнение checkout формы демо-данными.
- [x] Добавлена явная demo-пометка об отсутствии реальной оплаты.
- [x] Реализовано создание заказа и сохранение в `ordersStore`.
- [x] Реализована очистка корзины после успешного оформления.
- [x] Добавлен route успеха: `src/app/[locale]/checkout-success/page.tsx`.
- [x] Реализован `checkout-success` экран с анимацией и номером заказа.
- [x] Проверка сборки `npm run build` прошла успешно.

## ЭТАП 10: Профиль (Завершён)
- [x] Добавлен route профиля: `src/app/[locale]/profile/page.tsx`.
- [x] Реализован профиль с разделами: overview / orders / favorites.
- [x] Реализован overview блок с демо-пользователем и агрегатной статистикой.
- [x] Реализован список заказов и детали заказа с timeline.
- [x] Реализован favorites раздел с рендером избранных товаров из `favoritesStore`.
- [x] Подключены локализованные статусы заказов и бейджи товаров.
- [x] Проверка сборки `npm run build` прошла успешно.

## ЭТАП 11: Поиск (Завершён)
- [x] Добавлен компонент поиска `SearchModal` в `src/components/search/SearchModal.tsx`.
- [x] Добавлено открытие поиска по `Cmd+K` / `Ctrl+K`.
- [x] Подключена кнопка открытия поиска в `Header`.
- [x] Реализован debounce `300ms` через `useDebounce`.
- [x] Реализован поиск по товарам через `normalizeQuery()` (имя, бренд, категория).
- [x] Ограничен вывод результатов до 6 позиций.
- [x] Реализованы пустые состояния: пустой запрос и отсутствие результатов.
- [x] Реализовано закрытие модалки по `Esc` и клику вне окна.
- [x] Подключён `useScrollLock()` для модального оверлея поиска.
- [x] Обновлены локализации (`messages/ru.json`, `messages/en.json`) для поиска.
- [x] Проверка сборки `npm run build` прошла успешно.

## Текущий статус
Этап 11 завершён. Ожидаем подтверждения пользователя для перехода к Этапу 12.

## Следующий шаг
ЭТАП 12: Полировка. Hover/focus, микро-анимации, a11y, 404, favicon, базовые meta/OG теги, финальная проверка `npm run build`.
