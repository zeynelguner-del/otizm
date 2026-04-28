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

type MatchItem = { id: string; content: string; type: string };

const ITEMS: MatchItem[] = [
  { id: "apple", content: "🍎", type: "apple" },
  { id: "banana", content: "🍌", type: "banana" },
  { id: "grape", content: "🍇", type: "grape" },
  { id: "strawberry", content: "🍓", type: "strawberry" },
  { id: "orange", content: "🍊", type: "orange" },
  { id: "watermelon", content: "🍉", type: "watermelon" },
];

const shuffle = <T,>(arr: T[]) => [...arr].sort(() => Math.random() - 0.5);

export default function MatchingGamePage() {
  const [left, setLeft] = useState<MatchItem[]>(() => shuffle(ITEMS));
  const [right, setRight] = useState<MatchItem[]>(() => shuffle(ITEMS));
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [matched, setMatched] = useState<string[]>([]);
  const [disabled, setDisabled] = useState(false);
  const [uiSettings] = useState<UiSettings>(() => readJson<UiSettings>(UI_SETTINGS_KEY, { reduceMotion: false }));
  const rewardedRef = useRef(false);

  const handlePick = (side: "left" | "right", type: string) => {
    if (disabled) return;
    if (matched.includes(type)) return;

    const nextLeft = side === "left" ? type : selectedLeft;
    const nextRight = side === "right" ? type : selectedRight;

    if (side === "left") setSelectedLeft(type);
    else setSelectedRight(type);

    if (!nextLeft || !nextRight) return;

    const isMatch = nextLeft === nextRight;
    if (isMatch) {
      setMatched((prev) => (prev.includes(nextLeft) ? prev : [...prev, nextLeft]));
      setSelectedLeft(null);
      setSelectedRight(null);
      return;
    }

    setDisabled(true);
    window.setTimeout(() => {
      setSelectedLeft(null);
      setSelectedRight(null);
      setDisabled(false);
    }, 700);
  };

  const resetGame = () => {
    setLeft(shuffle(ITEMS));
    setRight(shuffle(ITEMS));
    setSelectedLeft(null);
    setSelectedRight(null);
    setMatched([]);
    setDisabled(false);
    rewardedRef.current = false;
  };

  const isWon = matched.length === ITEMS.length;

  useEffect(() => {
    if (!isWon) return;
    if (rewardedRef.current) return;
    addTokens(5);
    rewardedRef.current = true;
  }, [isWon]);

  return (
    <div className="min-h-screen bg-sky-50 dark:bg-zinc-950 p-6">
      <header className="max-w-2xl mx-auto mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/games"
            className="p-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400"
          >
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Eşleştirme Oyunu</h1>
        </div>
        <button
          onClick={resetGame}
          className="p-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sky-600 hover:bg-sky-50 transition-colors"
        >
          <RefreshCw size={24} />
        </button>
      </header>

      <main className="max-w-2xl mx-auto">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-3">
            {left.map((item) => (
              <motion.button
                key={`left-${item.id}`}
                whileHover={uiSettings.reduceMotion ? undefined : { scale: 1.03 }}
                whileTap={uiSettings.reduceMotion ? undefined : { scale: 0.98 }}
                onClick={() => handlePick("left", item.type)}
                disabled={disabled || matched.includes(item.type)}
                className={cn(
                  "w-full h-16 rounded-2xl text-3xl flex items-center justify-center transition-all shadow-sm border-4 font-black",
                  matched.includes(item.type)
                    ? "bg-emerald-100 border-emerald-200 opacity-60 cursor-default"
                    : selectedLeft === item.type
                    ? selectedRight && selectedRight !== selectedLeft
                      ? "bg-white border-rose-300"
                      : "bg-white border-sky-400"
                    : "bg-sky-200 border-sky-300 hover:bg-sky-300"
                )}
              >
                {item.content}
              </motion.button>
            ))}
          </div>

          <div className="space-y-3">
            {right.map((item) => (
              <motion.button
                key={`right-${item.id}`}
                whileHover={uiSettings.reduceMotion ? undefined : { scale: 1.03 }}
                whileTap={uiSettings.reduceMotion ? undefined : { scale: 0.98 }}
                onClick={() => handlePick("right", item.type)}
                disabled={disabled || matched.includes(item.type)}
                className={cn(
                  "w-full h-16 rounded-2xl text-3xl flex items-center justify-center transition-all shadow-sm border-4 font-black",
                  matched.includes(item.type)
                    ? "bg-emerald-100 border-emerald-200 opacity-60 cursor-default"
                    : selectedRight === item.type
                    ? selectedLeft && selectedLeft !== selectedRight
                      ? "bg-white border-rose-300"
                      : "bg-white border-sky-400"
                    : "bg-sky-200 border-sky-300 hover:bg-sky-300"
                )}
              >
                {item.content}
              </motion.button>
            ))}
          </div>
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
              <p className="text-zinc-500 dark:text-zinc-400 mb-6">Tüm kartları başarıyla eşleştirdin.</p>
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
