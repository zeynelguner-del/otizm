"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, RefreshCw, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

const makeTarget = () => 1 + Math.floor(Math.random() * 9);

export default function CountingGamePage() {
  const [target, setTarget] = useState(() => makeTarget());
  const [selected, setSelected] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const items = useMemo(() => Array.from({ length: target }, () => "⭐"), [target]);

  const reset = () => {
    setTarget(makeTarget());
    setSelected(null);
    setIsCorrect(null);
  };

  const choose = (n: number) => {
    setSelected(n);
    setIsCorrect(n === target);
  };

  return (
    <div className="min-h-screen bg-emerald-50 dark:bg-zinc-950 p-6">
      <header className="max-w-2xl mx-auto mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/games"
            className="p-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400"
          >
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Sayı Saymaca</h1>
        </div>
        <button
          onClick={reset}
          className="p-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-emerald-600 hover:bg-emerald-50 transition-colors"
        >
          <RefreshCw size={24} />
        </button>
      </header>

      <main className="max-w-2xl mx-auto space-y-6">
        <section className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border-2 border-zinc-200 dark:border-zinc-800 shadow-sm">
          <h2 className="text-lg font-black text-zinc-800 dark:text-zinc-100 mb-4">Kaç tane yıldız var?</h2>
          <div className="flex flex-wrap gap-3 text-4xl leading-none">
            {items.map((s, i) => (
              <span key={i}>{s}</span>
            ))}
          </div>
        </section>

        <section className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border-2 border-zinc-200 dark:border-zinc-800 shadow-sm">
          <div className="grid grid-cols-3 gap-4">
            {Array.from({ length: 9 }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => choose(n)}
                className={cn(
                  "p-6 rounded-2xl border-2 font-black text-2xl transition-all active:scale-95",
                  selected === n
                    ? isCorrect
                      ? "bg-emerald-100 border-emerald-200 text-emerald-700"
                      : "bg-rose-100 border-rose-200 text-rose-700"
                    : "bg-zinc-50 dark:bg-zinc-800/50 border-zinc-100 dark:border-zinc-700 text-zinc-800 dark:text-zinc-100 hover:border-emerald-200"
                )}
              >
                {n}
              </button>
            ))}
          </div>
        </section>

        {isCorrect && (
          <section className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border-4 border-emerald-400 text-center shadow-xl">
            <div className="inline-block p-4 rounded-full bg-emerald-100 text-emerald-600 mb-4">
              <Trophy size={40} />
            </div>
            <h3 className="text-2xl font-black text-zinc-900 dark:text-zinc-50 mb-2">Tebrikler!</h3>
            <p className="text-zinc-500 dark:text-zinc-400 mb-6">Doğru sayıyı buldun.</p>
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
