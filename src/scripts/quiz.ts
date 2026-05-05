import type { ArchetypeId, Archetype, QuizQuestion } from '../data/quiz';

interface QuizDataset {
  questions: QuizQuestion[];
  archetypes: Record<ArchetypeId, Archetype>;
}

function getDataset(): QuizDataset | null {
  const root = document.querySelector<HTMLElement>('.quiz');
  if (!root) return null;
  const questions = root.dataset.questions;
  const archetypes = root.dataset.archetypes;
  if (!questions || !archetypes) return null;
  return {
    questions: JSON.parse(questions) as QuizQuestion[],
    archetypes: JSON.parse(archetypes) as Record<ArchetypeId, Archetype>,
  };
}

async function shareOrCopy(text: string, url: string): Promise<void> {
  if (navigator.share) {
    try {
      await navigator.share({ title: 'Какой ты обитатель Байкала?', text, url });
      return;
    } catch {
      // ignore
    }
  }
  try {
    await navigator.clipboard.writeText(`${text} — ${url}`);
    alert('Ссылка скопирована');
  } catch {
    window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
  }
}

export function initQuiz(): void {
  const data = getDataset();
  if (!data) return;
  const { questions, archetypes } = data;

  const intro = document.getElementById('quiz-intro');
  const board = document.getElementById('quiz-board');
  const result = document.getElementById('quiz-result');
  const startBtn = document.getElementById('quiz-start');
  const restartBtn = document.getElementById('quiz-restart');
  const shareBtn = document.getElementById('quiz-share');
  const progressCurrentEl = document.getElementById('quiz-progress-current');
  const progressTotalEl = document.getElementById('quiz-progress-total');
  const questionEl = document.getElementById('quiz-question');
  const optionsEl = document.getElementById('quiz-options');
  const resultEmojiEl = document.getElementById('quiz-result-emoji');
  const resultNameEl = document.getElementById('quiz-result-name');
  const resultTaglineEl = document.getElementById('quiz-result-tagline');
  const resultDescEl = document.getElementById('quiz-result-description');
  const resultGoodEl = document.getElementById('quiz-result-good');
  const resultFactEl = document.getElementById('quiz-result-fact');
  const resultLinkEl = document.getElementById('quiz-result-link') as HTMLAnchorElement | null;

  if (
    !intro ||
    !board ||
    !result ||
    !startBtn ||
    !restartBtn ||
    !questionEl ||
    !optionsEl ||
    !shareBtn
  ) {
    return;
  }

  if (progressTotalEl) progressTotalEl.textContent = String(questions.length);

  let index = 0;
  const scores: Record<string, number> = {};

  function showQuestion(): void {
    if (index >= questions.length) {
      finish();
      return;
    }
    if (progressCurrentEl) progressCurrentEl.textContent = String(index + 1);
    const q = questions[index];
    if (!q) return;
    if (questionEl) questionEl.textContent = q.question;
    if (optionsEl) {
      optionsEl.innerHTML = '';
      q.options.forEach((opt) => {
        const li = document.createElement('li');
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.textContent = opt.text;
        btn.addEventListener('click', () => {
          for (const [arch, w] of Object.entries(opt.weights)) {
            scores[arch] = (scores[arch] ?? 0) + (w ?? 0);
          }
          index += 1;
          showQuestion();
        });
        li.appendChild(btn);
        optionsEl.appendChild(li);
      });
    }
  }

  function finish(): void {
    let topId: ArchetypeId = 'gammarus';
    let topScore = -Infinity;
    for (const [k, v] of Object.entries(scores)) {
      if (v > topScore) {
        topScore = v;
        topId = k as ArchetypeId;
      }
    }
    const arch = archetypes[topId];
    if (!arch) return;

    if (board) board.hidden = true;
    if (result) result.hidden = false;
    if (resultEmojiEl) resultEmojiEl.textContent = arch.emoji;
    if (resultNameEl) resultNameEl.textContent = `Ты — ${arch.name}`;
    if (resultTaglineEl) resultTaglineEl.textContent = arch.tagline;
    if (resultDescEl) resultDescEl.textContent = arch.description;
    if (resultGoodEl) {
      resultGoodEl.innerHTML = '';
      arch.goodAt.forEach((g) => {
        const li = document.createElement('li');
        li.textContent = g;
        resultGoodEl.appendChild(li);
      });
    }
    if (resultFactEl) resultFactEl.textContent = arch.fact;
    if (resultLinkEl) {
      resultLinkEl.href = `/obitateli/${arch.creatureSlug}/`;
      resultLinkEl.textContent = `Подробнее: ${arch.name} →`;
    }

    history.replaceState(null, '', `#result-${topId}`);
  }

  startBtn.addEventListener('click', () => {
    intro.hidden = true;
    board.hidden = false;
    index = 0;
    for (const k of Object.keys(scores)) delete scores[k];
    showQuestion();
  });

  restartBtn.addEventListener('click', () => {
    if (result) result.hidden = true;
    intro.hidden = false;
    history.replaceState(null, '', location.pathname);
  });

  shareBtn.addEventListener('click', () => {
    const name = resultNameEl?.textContent ?? 'мой архетип Байкала';
    void shareOrCopy(`${name}. Узнай свой:`, `${location.origin}/test/`);
  });
}
