import type { Review } from '@/lib/types';

export const productReviews: Record<string, Review[]> = {
  'iphone-17-pro': [
    {
      id: 'r-iphone-17-pro-1',
      author: 'Алексей М.',
      rating: 5,
      date: '2026-02-14',
      text: {
        ru: 'Очень плавная работа, камера ночью впечатляет. Перешел с 15 Pro и разница заметна.',
        en: 'Very smooth performance and impressive night shots. Upgraded from 15 Pro and the difference is clear.',
      },
      verified: true,
    },
    {
      id: 'r-iphone-17-pro-2',
      author: 'Nora K.',
      rating: 4,
      date: '2026-03-01',
      text: {
        ru: 'Отличный экран и автономность, но хотелось бы быстрее зарядку в комплекте.',
        en: 'Great display and battery life, though bundled charging could be faster.',
      },
      verified: true,
    },
    {
      id: 'r-iphone-17-pro-3',
      author: 'Денис К.',
      rating: 5,
      date: '2026-03-19',
      text: {
        ru: 'Стабильная камера и хороший звук в видео. Понравилась работа батареи в поездке.',
        en: 'Stable camera performance and great video audio. Battery life was solid during travel.',
      },
      verified: true,
    },
  ],
  'xiaomi-17-ultra': [
    {
      id: 'r-xiaomi-17-ultra-1',
      author: 'Илья С.',
      rating: 5,
      date: '2026-01-30',
      text: {
        ru: 'Камера и оптика топ, особенно портретный режим. За свои деньги отличный выбор.',
        en: 'Camera and optics are top-tier, especially portrait mode. Great value for money.',
      },
      verified: true,
    },
  ],
  'oneplus-15t': [
    {
      id: 'r-oneplus-15t-1',
      author: 'Максим',
      rating: 4,
      date: '2026-02-12',
      text: {
        ru: 'Очень быстрый интерфейс. Немного греется в тяжелых играх.',
        en: 'Extremely fast UI. Gets a bit warm in heavy gaming sessions.',
      },
      verified: true,
    },
  ],
  'ipad-pro': [
    {
      id: 'r-ipad-pro-1',
      author: 'Мария Д.',
      rating: 5,
      date: '2026-03-08',
      text: {
        ru: 'Использую для иллюстраций и монтажа. Экран и перо просто идеальны.',
        en: 'Using it for illustration and editing. Display and pencil feel are excellent.',
      },
      verified: true,
    },
  ],
  'xiaomi-pad-8-pro': [
    {
      id: 'r-xiaomi-pad-8-pro-1',
      author: 'Dmitry L.',
      rating: 4,
      date: '2026-01-19',
      text: {
        ru: 'Хороший баланс цены и производительности. Подходит для учебы и фильмов.',
        en: 'Good balance of price and performance. Great for study and media.',
      },
      verified: true,
    },
  ],
  'macbook-neo': [
    {
      id: 'r-macbook-neo-1',
      author: 'Олег П.',
      rating: 5,
      date: '2026-02-24',
      text: {
        ru: 'Сборки проектов быстрее, вентиляторы почти не слышно. Лучший рабочий инструмент.',
        en: 'Project builds are faster and fans are barely audible. Best work machine I had.',
      },
      verified: true,
    },
    {
      id: 'r-macbook-neo-2',
      author: 'Lisa T.',
      rating: 4,
      date: '2026-03-11',
      text: {
        ru: 'Очень быстрый для разработки и дизайна. Хотелось бы больше портов в базе.',
        en: 'Very fast for development and design. Would prefer more ports in the base model.',
      },
      verified: true,
    },
  ],
  'mac-mini': [
    {
      id: 'r-mac-mini-1',
      author: 'Roman F.',
      rating: 4,
      date: '2026-03-02',
      text: {
        ru: 'Компактный и тихий. Для офиса и dev-задач более чем достаточно.',
        en: 'Compact and quiet. More than enough for office and dev workflows.',
      },
      verified: true,
    },
  ],
  'apple-watch-ultra-3': [
    {
      id: 'r-apple-watch-ultra-3-1',
      author: 'Екатерина К.',
      rating: 5,
      date: '2026-02-03',
      text: {
        ru: 'Трекинг тренировок точный, батарея держит дольше, чем ожидала.',
        en: 'Workout tracking is accurate and battery lasts longer than expected.',
      },
      verified: true,
    },
  ],
  'rog-ace-hfx-keyboard': [
    {
      id: 'r-rog-ace-hfx-keyboard-1',
      author: 'Andrey G.',
      rating: 4,
      date: '2026-03-10',
      text: {
        ru: 'Очень приятный отклик клавиш, хорошо подходит для FPS игр.',
        en: 'Great key response and works really well for FPS gaming.',
      },
      verified: true,
    },
    {
      id: 'r-rog-ace-hfx-keyboard-2',
      author: 'Никита Ж.',
      rating: 5,
      date: '2026-03-21',
      text: {
        ru: 'Ход клавиш ровный, быстро привык. Для работы вечером шум умеренный.',
        en: 'Key feel is consistent and easy to get used to. Noise level is moderate for evening work.',
      },
      verified: true,
    },
  ],
  'cuktech-140w-gan-charger': [
    {
      id: 'r-cuktech-140w-gan-charger-1',
      author: 'Сергей Р.',
      rating: 5,
      date: '2026-02-27',
      text: {
        ru: 'Заряжает ноутбук и телефон одновременно, не перегревается.',
        en: 'Charges laptop and phone simultaneously without overheating.',
      },
      verified: true,
    },
  ],
};
