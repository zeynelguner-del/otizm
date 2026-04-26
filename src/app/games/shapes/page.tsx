"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, RefreshCw, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

const TOKENS_KEY = "tokenBalanceV1";
const TOKENS_EVENT = "token-storage";

const addTokens = (amount: number) => {
  if (typeof window === "undefined") return;
  try {
    const currentRaw = localStorage.getItem(TOKENS_KEY);
    const current = currentRaw ? Number(currentRaw) : 0;
    const next = Math.max(0, (Number.isFinite(current) ? current : 0) + amount);
    localStorage.setItem(TOKENS_KEY, String(next));
    window.dispatchEvent(new Event(TOKENS_EVENT));
  } catch {}
};

type Shape = {
  id: string;
  label: string;
  emoji: string;
};

const SHAPES: Shape[] = [
  { id: "circle", label: "Daire", emoji: "⚪" },
  { id: "square", label: "Kare", emoji: "⬜" },
  { id: "triangle", label: "Üçgen", emoji: "🔺" },
  { id: "star", label: "Yıldız", emoji: "⭐" },
];

const shuffle = <T,>(items: T[]) => {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
  }
  return a;
};

const makeQuestion = () => {
  const target = SHAPES[Math.floor(Math.random() * SHAPES.length)];
  const others = SHAPES.filter((s) => s.id !== target.id);
  const options = shuffle([target, ...shuffle(others).slice(0, 2)]);
  return { targetId: target.id, optionIds: options.map((o) => o.id) };
};

export default function ShapesGamePage() {
  const [question, setQuestion] = useState(() => makeQuestion());
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const rewardedRef = useRef(false);

  const target = useMemo(() => SHAPES.find((s) => s.id === question.targetId) ?? SHAPES[0], [question.targetId]);
  const options = useMemo(
    () => question.optionIds.map((id) => SHAPES.find((s) => s.id === id)).filter(Boolean) as Shape[],
    [question.optionIds]
  );

  const isCorrect = selectedId ? selectedId === question.targetId : null;

  useEffect(() => {
    if (!isCorrect) return;
    if (rewardedRef.current) return;
    addTokens(1);
    rewardedRef.current = true;
  }, [isCorrect]);

  const reset = () => {
    rewardedRef.current = false;
    setSelectedId(null);
    setQuestion(makeQuestion());
  };

  return (
    <div className="min-h-screen bg-amber-50 dark:bg-zinc-950 p-6">
      <header className="max-w-2xl mx-auto mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/games"
            className="p-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400"
          >
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Şekilleri Tanı</h1>
        </div>
        <button
          onClick={reset}
          className="p-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-amber-700 hover:bg-amber-50 transition-colors"
        >
          <RefreshCw size={24} />
        </button>
      </header>

      <main className="max-w-2xl mx-auto space-y-6">
        <section className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border-2 border-zinc-200 dark:border-zinc-800 shadow-sm text-center">
          <h2 className="text-lg font-black text-zinc-800 dark:text-zinc-100 mb-4">Bu hangi şekil?</h2>
          <div className="text-7xl leading-none">{target.emoji}</div>
        </section>

        <section className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border-2 border-zinc-200 dark:border-zinc-800 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {options.map((o) => {
              const isSelected = selectedId === o.id;
              const selectedCorrect = isSelected && isCorrect === true;
              const selectedWrong = isSelected && isCorrect === false;
              return (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => setSelectedId(o.id)}
                  disabled={isCorrect === true}
                  className={cn(
                    "p-6 rounded-2xl border-2 font-black text-lg transition-all active:scale-95",
                    selectedCorrect
                      ? "bg-emerald-100 border-emerald-200 text-emerald-700"
                      : selectedWrong
                      ? "bg-rose-100 border-rose-200 text-rose-700"
                      : isSelected
                      ? "bg-amber-100 border-amber-200 text-amber-800"
                      : "bg-zinc-50 dark:bg-zinc-800/50 border-zinc-100 dark:border-zinc-700 text-zinc-800 dark:text-zinc-100 hover:border-amber-200",
                    isCorrect === true && !isSelected && "opacity-60 cursor-default"
                  )}
                >
                  {o.label}
                </button>
              );
            })}
          </div>
        </section>

        {isCorrect && (
          <section className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border-4 border-emerald-400 text-center shadow-xl">
            <div className="inline-block p-4 rounded-full bg-emerald-100 text-emerald-600 mb-4">
              <Trophy size={40} />
            </div>
            <h3 className="text-2xl font-black text-zinc-900 dark:text-zinc-50 mb-2">Tebrikler!</h3>
            <p className="text-zinc-500 dark:text-zinc-400 mb-6">Doğru şekli seçtin. +1 yıldız</p>
            <button
              onClick={reset}
              className="px-8 py-3 rounded-2xl bg-emerald-500 text-white font-black hover:bg-emerald-600 transition-colors"
            >
              Yeni Soru
            </button>
          </section>
        )}
      </main>
    </div>
  );
}
