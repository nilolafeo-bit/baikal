// Главный клиентский скрипт скролла.
// Считает текущую глубину, сохраняет состояние, выдаёт ачивки,
// генерирует финальную шер-карточку.

declare global {
  interface Window {
    __BAIKAL__?: {
      maxScrollDepth: number;
      maxLakeDepth: number;
      endemicTotal: number;
    };
  }
}

interface AchievementMeta {
  id: string;
  emoji: string;
  title: string;
  subtitle: string;
}

const STORAGE_KEY = 'baikal-state-v1';

interface BaikalState {
  endemics: string[];
  achievements: string[];
  maxDepth: number;
  startedAt: number;
}

function loadState(): BaikalState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<BaikalState>;
      return {
        endemics: parsed.endemics ?? [],
        achievements: parsed.achievements ?? [],
        maxDepth: parsed.maxDepth ?? 0,
        startedAt: parsed.startedAt ?? Date.now(),
      };
    }
  } catch {
    // ignore
  }
  return { endemics: [], achievements: [], maxDepth: 0, startedAt: Date.now() };
}

function saveState(state: BaikalState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}

function fmtTime(ms: number): string {
  const total = Math.floor(ms / 1000);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function showToast(meta: AchievementMeta): void {
  const container = document.getElementById('achievement-toasts');
  if (!container) return;
  const el = document.createElement('div');
  el.className = 'achievement-toast';
  el.innerHTML = `
    <span class="achievement-toast__emoji" aria-hidden="true">${meta.emoji}</span>
    <span class="achievement-toast__text">
      <span class="achievement-toast__title">${meta.title}</span>
      <span class="achievement-toast__sub">${meta.subtitle}</span>
    </span>
  `;
  container.appendChild(el);
  requestAnimationFrame(() => el.classList.add('is-visible'));
  setTimeout(() => {
    el.classList.remove('is-visible');
    setTimeout(() => el.remove(), 600);
  }, 4200);
}

async function shareOrCopy(text: string, url: string): Promise<void> {
  if (navigator.share) {
    try {
      await navigator.share({ text, url, title: 'Глубина Байкала' });
      return;
    } catch {
      // fall through
    }
  }
  try {
    await navigator.clipboard.writeText(`${text} — ${url}`);
    flash('Ссылка скопирована');
  } catch {
    window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
  }
}

function flash(text: string): void {
  showToast({ id: 'flash', emoji: '✓', title: text, subtitle: '' });
}

function buildShareCard(state: BaikalState, totalEndemics: number, ms: number): string {
  const canvas = document.getElementById('finale-canvas') as HTMLCanvasElement | null;
  if (!canvas) return '';
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';
  const W = canvas.width;
  const H = canvas.height;

  // Фоновый градиент глубины
  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, '#1a3850');
  grad.addColorStop(0.4, '#07182c');
  grad.addColorStop(1, '#000308');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // Биолюминесценция
  ctx.fillStyle = '#62cdff';
  for (let i = 0; i < 80; i++) {
    const x = Math.random() * W;
    const y = Math.random() * H;
    const r = Math.random() * 1.8 + 0.4;
    ctx.globalAlpha = 0.25 + Math.random() * 0.5;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  // Заголовок
  ctx.fillStyle = '#e6edf6';
  ctx.font = '600 32px "Manrope", system-ui, sans-serif';
  ctx.fillText('ГЛУБИНА БАЙКАЛА', 60, 90);

  ctx.font = '700 96px "Manrope", system-ui, sans-serif';
  ctx.fillStyle = '#62cdff';
  const depthText = `${state.maxDepth} м`;
  ctx.fillText(depthText, 60, 220);

  ctx.font = '500 28px "Manrope", system-ui, sans-serif';
  ctx.fillStyle = '#e6edf6';
  ctx.fillText('я опустился на', 60, 260);

  // Стат-бокс эндемиков
  ctx.font = '500 28px "Manrope", system-ui, sans-serif';
  ctx.fillStyle = '#95a3b8';
  ctx.fillText('эндемиков встречено', 60, 380);
  ctx.font = '700 56px "Manrope", system-ui, sans-serif';
  ctx.fillStyle = '#ffb878';
  ctx.fillText(`${state.endemics.length} / ${totalEndemics}`, 60, 440);

  // Время
  ctx.font = '500 28px "Manrope", system-ui, sans-serif';
  ctx.fillStyle = '#95a3b8';
  ctx.fillText('время погружения', 60, 510);
  ctx.font = '700 56px "Manrope", system-ui, sans-serif';
  ctx.fillStyle = '#e6edf6';
  ctx.fillText(fmtTime(ms), 60, 570);

  // URL
  ctx.font = '500 24px "Manrope", system-ui, sans-serif';
  ctx.fillStyle = '#62cdff';
  ctx.fillText('glubinabaikala.ru', 60, 605);

  // Декоративная линия глубины справа
  const barX = W - 100;
  const barY1 = 60;
  const barY2 = H - 60;
  const lakeFraction = Math.min(state.maxDepth, 1642) / 9000;
  const totalFraction = state.maxDepth / 9000;
  ctx.strokeStyle = 'rgba(230, 237, 246, 0.2)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(barX, barY1);
  ctx.lineTo(barX, barY2);
  ctx.stroke();
  // Прогресс
  ctx.strokeStyle = '#62cdff';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(barX, barY1);
  ctx.lineTo(barX, barY1 + totalFraction * (barY2 - barY1));
  ctx.stroke();
  // Метка дна
  ctx.fillStyle = '#ffb878';
  ctx.beginPath();
  ctx.arc(barX, barY1 + lakeFraction * (barY2 - barY1), 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.font = '500 16px "Manrope", system-ui, sans-serif';
  ctx.fillStyle = '#ffb878';
  ctx.fillText('1642 м · дно', barX - 130, barY1 + lakeFraction * (barY2 - barY1) - 10);

  return canvas.toDataURL('image/png');
}

export function initScroll(): void {
  const cfg = window.__BAIKAL__ ?? {
    maxScrollDepth: 9000,
    maxLakeDepth: 1642,
    endemicTotal: 0,
  };

  const state = loadState();

  const scenes = Array.from(document.querySelectorAll<HTMLElement>('.scene'));
  if (!scenes.length) return;

  const depthCurrentEl = document.getElementById('depth-current');
  const depthProgressEl = document.getElementById('depth-progress');
  const endemicsCountEl = document.getElementById('depth-endemics-count');
  const endemicsTotalEl = document.getElementById('depth-endemics-total');
  const bioEl = document.getElementById('bioluminescence');
  const bgEl = document.querySelector<HTMLElement>('.scroll-bg');

  if (endemicsTotalEl) endemicsTotalEl.textContent = String(cfg.endemicTotal);
  if (endemicsCountEl) endemicsCountEl.textContent = String(state.endemics.length);

  const sceneOffsets = scenes.map((el) => {
    const depth = Number(el.dataset.depth ?? 0);
    return { el, depth };
  });

  function updateDepth(): void {
    const scrollY = window.scrollY;
    const totalH = document.body.scrollHeight - window.innerHeight;
    if (totalH <= 0) return;

    // Вычисляем глубину относительно текущей сцены и следующей.
    let depth = 0;
    const viewportCenter = scrollY + window.innerHeight * 0.4;
    for (let i = 0; i < sceneOffsets.length; i++) {
      const cur = sceneOffsets[i];
      if (!cur) continue;
      const next = sceneOffsets[i + 1];
      const top = cur.el.offsetTop;
      const bottom = next ? next.el.offsetTop : top + cur.el.offsetHeight;
      if (viewportCenter >= top && viewportCenter <= bottom) {
        const fraction = bottom > top ? (viewportCenter - top) / (bottom - top) : 0;
        const nextDepth = next ? next.depth : cfg.maxScrollDepth;
        depth = Math.round(cur.depth + (nextDepth - cur.depth) * fraction);
        break;
      }
      if (i === sceneOffsets.length - 1 && viewportCenter > bottom) {
        depth = cfg.maxScrollDepth;
      }
    }
    if (depth < 0) depth = 0;
    if (depth > cfg.maxScrollDepth) depth = cfg.maxScrollDepth;

    if (depthCurrentEl) depthCurrentEl.textContent = depth.toString();
    if (depthProgressEl) {
      const pct = Math.min(100, (depth / cfg.maxScrollDepth) * 100);
      depthProgressEl.style.height = `${pct}%`;
    }

    if (depth > state.maxDepth) {
      state.maxDepth = depth;
      saveState(state);
    }

    // Биолюминесценция активируется на глубине > 250 м
    if (bioEl) bioEl.classList.toggle('is-active', depth > 220);

    // Затемнение фона по мере погружения — отдельным фильтром.
    if (bgEl) {
      const dim = Math.min(0.85, depth / 1500);
      bgEl.style.filter = `brightness(${1 - dim * 0.4})`;
    }
  }

  function checkSceneVisible(): void {
    const viewportCenter = window.scrollY + window.innerHeight * 0.55;
    for (const sceneEl of scenes) {
      const top = sceneEl.offsetTop;
      const bottom = top + sceneEl.offsetHeight;
      if (viewportCenter < top || viewportCenter > bottom) continue;

      const id = sceneEl.dataset.id ?? '';
      const creature = sceneEl.dataset.creature ?? '';
      const achievementJson = sceneEl.dataset.achievement ?? '';

      // Засчитать эндемика, если в сцене есть creatureSlug.
      if (creature && !state.endemics.includes(creature)) {
        state.endemics.push(creature);
        if (endemicsCountEl) endemicsCountEl.textContent = String(state.endemics.length);
        saveState(state);
      }

      // Засчитать ачивку.
      if (achievementJson && !state.achievements.includes(id)) {
        try {
          const meta = JSON.parse(achievementJson) as AchievementMeta;
          state.achievements.push(id);
          saveState(state);
          showToast(meta);
        } catch {
          // ignore
        }
      }
    }
  }

  // Throttle через rAF
  let rafScheduled = false;
  function onScroll(): void {
    if (rafScheduled) return;
    rafScheduled = true;
    requestAnimationFrame(() => {
      updateDepth();
      checkSceneVisible();
      rafScheduled = false;
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  updateDepth();
  checkSceneVisible();

  // Шер-кнопки на сценах
  document.querySelectorAll<HTMLButtonElement>('.scene__share').forEach((btn) => {
    btn.addEventListener('click', () => {
      const text = btn.dataset.shareText ?? '';
      const depth = btn.dataset.shareDepth ?? '';
      const url = `${location.origin}${location.pathname}#scene-${btn.closest('.scene')?.id ?? ''}`;
      void shareOrCopy(`${text} (${depth} м)`, url);
    });
  });

  // Финальная карточка
  const finaleDepthEl = document.getElementById('finale-depth');
  const finaleEndemicsEl = document.getElementById('finale-endemics');
  const finaleTimeEl = document.getElementById('finale-time');
  const finaleShareBtn = document.getElementById('finale-share') as HTMLButtonElement | null;
  const finaleDownloadEl = document.getElementById('finale-download') as HTMLAnchorElement | null;

  function updateFinale(): void {
    if (finaleDepthEl) finaleDepthEl.textContent = String(state.maxDepth);
    if (finaleEndemicsEl) finaleEndemicsEl.textContent = String(state.endemics.length);
    if (finaleTimeEl) finaleTimeEl.textContent = fmtTime(Date.now() - state.startedAt);
  }
  updateFinale();
  setInterval(updateFinale, 1000);

  if (finaleShareBtn) {
    finaleShareBtn.addEventListener('click', () => {
      const dataUrl = buildShareCard(state, cfg.endemicTotal, Date.now() - state.startedAt);
      if (!dataUrl) return;
      if (finaleDownloadEl) {
        finaleDownloadEl.href = dataUrl;
        finaleDownloadEl.hidden = false;
        finaleDownloadEl.style.display = 'inline-block';
        finaleDownloadEl.style.marginLeft = '1rem';
        finaleDownloadEl.click();
      }
      void shareOrCopy(
        `Я опустился на ${state.maxDepth} м в Байкал. Найди своё дно: `,
        location.origin,
      );
    });
  }
}
