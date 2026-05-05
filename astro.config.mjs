// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// ВНИМАНИЕ: пока домен glubinabaikala.ru не куплен, временно деплоим под
// https://nilolafeo-bit.github.io/baikal/. Когда купим домен — вернуть:
//   site: 'https://glubinabaikala.ru'
//   убрать base/trailingSlash
//   восстановить public/CNAME с содержимым "glubinabaikala.ru"
export default defineConfig({
  site: 'https://nilolafeo-bit.github.io',
  base: '/baikal',
  trailingSlash: 'always',
  integrations: [sitemap()],
  build: {
    inlineStylesheets: 'auto',
  },
  prefetch: {
    prefetchAll: false,
  },
});
