"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, RefreshCw, Trophy } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

type UiSettings = { reduceMotion: boolean };
const UI_SETTINGS_KEY = "uiSettingsV1";
const TOKENS_KEY = "tokenBalanceV1";
const TOKENS_EVENT = "token-storage";

const readJson = <T,>(key: string, fallback: T): T => {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
};

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

const CARDS = [
  { id: 1, content: "🐶", type: "dog" },
  { id: 2, content: "🐶", type: "dog" },
  { id: 3, content: "🐱", type: "cat" },
  { id: 4, content: "🐱", type: "cat" },
  { id: 5, content: "🐼", type: "panda" },
  { id: 6, content: "🐼", type: "panda" },
  { id: 7, content: "🦊", type: "fox" },
  { id: 8, content: "🦊", type: "fox" },
  { id: 9, content: "🐸", type: "frog" },
  { id: 10, content: "🐸", type: "frog" },
  { id: 11, content: "🐵", type: "monkey" },
  { id: 12, content: "🐵", type: "monkey" },
];

export default function MemoryGamePage() {
  const [cards, setCards] = useState(() => [...CARDS].sort(() => Math.random() - 0.5));
  const [flipped, setFlipped] = useState<number[]>([]);
  const [solved, setSolved] = useState<number[]>([]);
  const [disabled, setDisabled] = useState(false);
  const [uiSettings] = useState<UiSettings>(() => readJson<UiSettings>(UI_SETTINGS_KEY, { reduceMotion: false }));
  const rewardedRef = useRef(false);

  const handleCardClick = (id: number) => {
    if (disabled || solved.includes(id) || flipped.includes(id)) return;
    if (flipped.length === 1) {
      const first = flipped[0];
      const second = id;
      setFlipped([first, second]);
      setDisabled(true);

      const firstType = cards.find((c) => c.id === first)?.type;
      const secondType = cards.find((c) => c.id === second)?.type;
      const isMatch = firstType && secondType && firstType === secondType;

      if (isMatch) {
        setSolved((prev) => [...prev, first, second]);
        setFlipped([]);
        setDisabled(false);
      } else {
        setTimeout(() => {
          setFlipped([]);
          setDisabled(false);
        }, 900);
      }
      return;
    }

    setFlipped([id]);
  };

  const resetGame = () => {
    setCards([...CARDS].sort(() => Math.random() - 0.5));
    setFlipped([]);
    setSolved([]);
    setDisabled(false);
    rewardedRef.current = false;
  };

  const isWon = solved.length === cards.length;

  useEffect(() => {
    if (!isWon) return;
    if (rewardedRef.current) return;
    addTokens(5);
    rewardedRef.current = true;
  }, [isWon]);

  return (
    <div className="min-h-screen bg-purple-50 dark:bg-zinc-950 p-6">
      <header className="max-w-2xl mx-auto mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/games"
            className="p-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400"
          >
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Hafıza Kartları</h1>
        </div>
        <button
          onClick={resetGame}
          className="p-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-purple-600 hover:bg-purple-50 transition-colors"
        >
          <RefreshCw size={24} />
        </button>
      </header>

      <main className="max-w-2xl mx-auto">
        <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
          {cards.map((card) => (
            <motion.button
              key={card.id}
              whileHover={uiSettings.reduceMotion ? undefined : { scale: 1.05 }}
              whileTap={uiSettings.reduceMotion ? undefined : { scale: 0.95 }}
              onClick={() => handleCardClick(card.id)}
              className={cn(
                "aspect-square rounded-2xl text-4xl flex items-center justify-center transition-all shadow-sm border-4",
                solved.includes(card.id)
                  ? "bg-emerald-100 border-emerald-200 opacity-60 cursor-default"
                  : flipped.includes(card.id)
                  ? "bg-white border-purple-300"
                  : "bg-purple-200 border-purple-300 hover:bg-purple-300 text-transparent"
              )}
            >
              {(flipped.includes(card.id) || solved.includes(card.id)) && card.content}
            </motion.button>
          ))}
        </div>

        <AnimatePresence>
          {isWon && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-12 p-8 rounded-3xl bg-white dark:bg-zinc-900 border-4 border-emerald-400 text-center shadow-xl"
            >
              <div className="inline-block p-4 rounded-full bg-emerald-100 text-emerald-600 mb-4">
                <Trophy size={48} />
              </div>
              <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">Tebrikler!</h2>
              <p className="text-zinc-500 dark:text-zinc-400 mb-6">Tüm kartları buldun.</p>
              <button
                onClick={resetGame}
                className="px-8 py-3 rounded-2xl bg-emerald-500 text-white font-bold hover:bg-emerald-600 transition-colors"
              >
                Tekrar Oyna
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
