import type { ProductSpec } from '@/lib/types';

export const productSpecs: Record<string, ProductSpec[]> = {
  'iphone-17-pro': [
    { label: { ru: 'Дисплей', en: 'Display' }, value: { ru: '6.3" OLED 120Hz', en: '6.3" OLED 120Hz' } },
    { label: { ru: 'Чип', en: 'Chip' }, value: { ru: 'A19 Pro', en: 'A19 Pro' } },
    { label: { ru: 'Камера', en: 'Camera' }, value: { ru: '48 МП + 5x Zoom', en: '48 MP + 5x Zoom' } },
    { label: { ru: 'Батарея', en: 'Battery' }, value: { ru: 'До 29 часов видео', en: 'Up to 29h video' } },
  ],
  'xiaomi-17-ultra': [
    { label: { ru: 'Дисплей', en: 'Display' }, value: { ru: '6.8" AMOLED 120Hz', en: '6.8" AMOLED 120Hz' } },
    { label: { ru: 'Процессор', en: 'Processor' }, value: { ru: 'Snapdragon 8 Elite', en: 'Snapdragon 8 Elite' } },
    { label: { ru: 'Камера', en: 'Camera' }, value: { ru: '50 МП + перископ', en: '50 MP + periscope' } },
    { label: { ru: 'Зарядка', en: 'Charging' }, value: { ru: '120W проводная', en: '120W wired' } },
  ],
  'oneplus-15t': [
    { label: { ru: 'Дисплей', en: 'Display' }, value: { ru: '6.7" LTPO 120Hz', en: '6.7" LTPO 120Hz' } },
    { label: { ru: 'Память', en: 'Memory' }, value: { ru: '12 ГБ RAM', en: '12 GB RAM' } },
    { label: { ru: 'Батарея', en: 'Battery' }, value: { ru: '5600 мАч', en: '5600 mAh' } },
    { label: { ru: 'Зарядка', en: 'Charging' }, value: { ru: '100W SuperVOOC', en: '100W SuperVOOC' } },
  ],
  'ipad-pro': [
    { label: { ru: 'Экран', en: 'Display' }, value: { ru: '13" Ultra Retina XDR', en: '13" Ultra Retina XDR' } },
    { label: { ru: 'Чип', en: 'Chip' }, value: { ru: 'M4', en: 'M4' } },
    { label: { ru: 'Поддержка', en: 'Support' }, value: { ru: 'Apple Pencil Pro', en: 'Apple Pencil Pro' } },
    { label: { ru: 'Вес', en: 'Weight' }, value: { ru: '579 г', en: '579 g' } },
  ],
  'xiaomi-pad-8-pro': [
    { label: { ru: 'Экран', en: 'Display' }, value: { ru: '12.1" 144Hz', en: '12.1" 144Hz' } },
    { label: { ru: 'Чип', en: 'Chip' }, value: { ru: 'Snapdragon 8s', en: 'Snapdragon 8s' } },
    { label: { ru: 'Батарея', en: 'Battery' }, value: { ru: '10000 мАч', en: '10000 mAh' } },
    { label: { ru: 'Аудио', en: 'Audio' }, value: { ru: '4 динамика Dolby', en: '4 Dolby speakers' } },
  ],
  'macbook-neo': [
    { label: { ru: 'Чип', en: 'Chip' }, value: { ru: 'Apple M5', en: 'Apple M5' } },
    { label: { ru: 'Экран', en: 'Display' }, value: { ru: '14.2" Liquid Retina', en: '14.2" Liquid Retina' } },
    { label: { ru: 'Память', en: 'Memory' }, value: { ru: '16 ГБ Unified', en: '16 GB Unified' } },
    { label: { ru: 'Порты', en: 'Ports' }, value: { ru: 'Thunderbolt 4 x3', en: 'Thunderbolt 4 x3' } },
  ],
  'mac-mini': [
    { label: { ru: 'Чип', en: 'Chip' }, value: { ru: 'Apple M4', en: 'Apple M4' } },
    { label: { ru: 'Память', en: 'Memory' }, value: { ru: '16 ГБ Unified', en: '16 GB Unified' } },
    { label: { ru: 'SSD', en: 'SSD' }, value: { ru: '512 ГБ', en: '512 GB' } },
    { label: { ru: 'Разъёмы', en: 'I/O' }, value: { ru: 'HDMI, USB-C, Ethernet', en: 'HDMI, USB-C, Ethernet' } },
  ],
  'apple-watch-ultra-3': [
    { label: { ru: 'Корпус', en: 'Case' }, value: { ru: '49 мм, титан', en: '49mm titanium' } },
    { label: { ru: 'Водозащита', en: 'Water resistance' }, value: { ru: '100 м', en: '100m' } },
    { label: { ru: 'Автономность', en: 'Battery life' }, value: { ru: 'До 72 часов', en: 'Up to 72h' } },
    { label: { ru: 'GPS', en: 'GPS' }, value: { ru: 'Двухчастотный', en: 'Dual-frequency' } },
  ],
  'rog-ace-hfx-keyboard': [
    { label: { ru: 'Тип', en: 'Type' }, value: { ru: 'Механическая 75%', en: 'Mechanical 75%' } },
    { label: { ru: 'Подключение', en: 'Connectivity' }, value: { ru: 'USB-C / 2.4GHz', en: 'USB-C / 2.4GHz' } },
    { label: { ru: 'Переключатели', en: 'Switches' }, value: { ru: 'HFX магнитные', en: 'HFX magnetic' } },
    { label: { ru: 'Подсветка', en: 'Backlight' }, value: { ru: 'RGB per-key', en: 'RGB per-key' } },
  ],
  'cuktech-140w-gan-charger': [
    { label: { ru: 'Мощность', en: 'Power' }, value: { ru: 'До 140W', en: 'Up to 140W' } },
    { label: { ru: 'Порты', en: 'Ports' }, value: { ru: '3x USB-C, 1x USB-A', en: '3x USB-C, 1x USB-A' } },
    { label: { ru: 'Технология', en: 'Technology' }, value: { ru: 'GaN', en: 'GaN' } },
    { label: { ru: 'Защита', en: 'Protection' }, value: { ru: 'OVP/OCP/OTP', en: 'OVP/OCP/OTP' } },
  ],
};
