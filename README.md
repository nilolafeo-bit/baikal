# Глубина Байкала

Интерактивный сайт о самом глубоком озере планеты — формат «прокрути до самого дна».

🌊 **Live: [glubinabaikala.ru](https://glubinabaikala.ru)**

## Что это

- **Главная** — интерактивный скролл от 0 до 1 642 м (и ниже, к настоящему тектоническому дну на 8,5 км). Эндемики, здания-сравнения, ачивки, биолюминесценция, шер-карточка.
- **/obitateli/** — атлас 12 видов с подробными карточками. Эпишура, нерпа, голомянка, гаммарусы и другие.
- **/legendy/** — 7 историй: Шаман-камень, экспедиция «Миров», подводные «ихтиандры», ветра с именами и др.
- **/test/** — личностный квиз «Какой ты обитатель Байкала?». 7 вопросов → 8 архетипов.

## Стек

- [Astro](https://astro.build) — статический генератор (output: static).
- TypeScript, vanilla JS — без React, без тяжёлых либ.
- GitHub Pages + GitHub Actions — деплой по push в main.
- Кастомный домен — `glubinabaikala.ru` (CNAME в `public/`).

## Локально

```bash
npm install
npm run dev      # dev-сервер на :4321
npm run check    # astro check (TypeScript + Astro)
npm run build    # сборка в dist/
npm run preview  # локальный превью прод-сборки
```

## Структура

```
src/
├── data/         # CREATURES, LEGENDS, QUIZ, SCENES, BUILDINGS, SITE
├── components/   # Header, Footer, Illustration, DepthMeter, AchievementToast
├── layouts/      # BaseLayout (мета, OG, JSON-LD)
├── pages/        # /, /obitateli/, /legendy/, /test/, /about/, 404
├── scripts/      # scroll.ts, quiz.ts (клиентский TS, бандлится Astro)
└── styles/       # global.css
public/
├── CNAME         # glubinabaikala.ru
├── og-default.png
├── favicon.svg
└── robots.txt
.github/workflows/
├── deploy.yml    # GitHub Pages deploy при push в main
└── ci.yml        # check + build для PR
```

## Контент

Все факты сверены с открытыми источниками: baikal.ru, UNESCO World Heritage, ЛИН СО РАН, РГО, Wikipedia.
Если нашли ошибку — открывайте issue.

## Лицензия

Контент сайта (тексты, факты) — CC BY 4.0. Код — MIT.
