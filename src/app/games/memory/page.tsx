"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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

type MemoryType = { type: string; content: string };
type MemoryCard = { id: number; type: string; content: string };

const TYPES: MemoryType[] = [
  { type: "dog", content: "🐶" },
  { type: "cat", content: "🐱" },
  { type: "panda", content: "🐼" },
  { type: "fox", content: "🦊" },
  { type: "frog", content: "🐸" },
  { type: "monkey", content: "🐵" },
  { type: "lion", content: "🦁" },
  { type: "elephant", content: "🐘" },
  { type: "koala", content: "🐨" },
  { type: "penguin", content: "🐧" },
];

const MAX_LEVEL = 5;

const pairCountForLevel = (level: number) => {
  const clamped = Math.min(MAX_LEVEL, Math.max(1, level));
  return 2 + (clamped - 1) * 2;
};

const buildDeck = (level: number): MemoryCard[] => {
  const pairCount = pairCountForLevel(level);
  const pool = [...TYPES].sort(() => Math.random() - 0.5).slice(0, pairCount);
  const next: MemoryCard[] = [];
  for (const p of pool) {
    next.push({ id: next.length + 1, type: p.type, content: p.content });
    next.push({ id: next.length + 1, type: p.type, content: p.content });
  }
  return next.sort(() => Math.random() - 0.5);
};

export default function MemoryGamePage() {
  const [level, setLevel] = useState(1);
  const [cards, setCards] = useState<MemoryCard[]>(() => buildDeck(1));
  const [flipped, setFlipped] = useState<number[]>([]);
  const [solved, setSolved] = useState<number[]>([]);
  const [disabled, setDisabled] = useState(false);
  const [previewing, setPreviewing] = useState(true);
  const [uiSettings] = useState<UiSettings>(() => readJson<UiSettings>(UI_SETTINGS_KEY, { reduceMotion: false }));
  const rewardedRef = useRef(false);
  const previewTimerRef = useRef<number | null>(null);

  const cardsById = useMemo(() => {
    const map = new Map<number, MemoryCard>();
    for (const c of cards) map.set(c.id, c);
    return map;
  }, [cards]);

  const startLevel = (nextLevel: number) => {
    const target = Math.min(MAX_LEVEL, Math.max(1, nextLevel));
    if (previewTimerRef.current) window.clearTimeout(previewTimerRef.current);
    setLevel(target);
    setCards(buildDeck(target));
    setFlipped([]);
    setSolved([]);
    setDisabled(true);
    setPreviewing(true);
    rewardedRef.current = false;
    previewTimerRef.current = window.setTimeout(() => {
      setPreviewing(false);
      setDisabled(false);
    }, 5000);
  };

  const handleCardClick = (id: number) => {
    if (previewing) return;
    if (disabled || solved.includes(id) || flipped.includes(id)) return;
    if (flipped.length === 1) {
      const first = flipped[0];
      const second = id;
      setFlipped([first, second]);
      setDisabled(true);

      const firstType = cardsById.get(first)?.type;
      const secondType = cardsById.get(second)?.type;
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
    startLevel(level);
  };

  const isWon = solved.length === cards.length;

  useEffect(() => {
    if (!isWon) return;
    if (level !== MAX_LEVEL) return;
    if (rewardedRef.current) return;
    addTokens(5);
    rewardedRef.current = true;
  }, [isWon]);

  useEffect(() => {
    startLevel(1);
    return () => {
      if (previewTimerRef.current) window.clearTimeout(previewTimerRef.current);
    };
  }, []);

  const hasPrev = level > 1;
  const hasNext = isWon && level < MAX_LEVEL;

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
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Hafıza Kartları</h1>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm font-bold">Seviye {level}/{MAX_LEVEL}{previewing ? " • 5 saniye bak" : ""}</p>
          </div>
        </div>
        <button
          onClick={resetGame}
          className="p-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-purple-600 hover:bg-purple-50 transition-colors"
        >
          <RefreshCw size={24} />
        </button>
      </header>

      <main className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between gap-3 mb-4">
          <button
            type="button"
            onClick={() => startLevel(level - 1)}
            disabled={!hasPrev}
            className={cn(
              "px-4 py-2 rounded-xl font-black border transition-colors",
              hasPrev
                ? "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                : "bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-400 cursor-not-allowed"
            )}
          >
            Önceki
          </button>
          <div className="text-sm font-black text-zinc-700 dark:text-zinc-200">
            {previewing ? "Kartlar açık" : isWon ? "Tebrikler!" : "Eşleştir"}
          </div>
          <button
            type="button"
            onClick={() => startLevel(level + 1)}
            disabled={!hasNext}
            className={cn(
              "px-4 py-2 rounded-xl font-black border transition-colors",
              hasNext
                ? "bg-emerald-500 border-emerald-500 text-white hover:bg-emerald-600"
                : "bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-400 cursor-not-allowed"
            )}
          >
            Sonraki
          </button>
        </div>

        <div
          className={cn(
            "grid gap-4",
            cards.length <= 4 ? "grid-cols-2" : cards.length <= 12 ? "grid-cols-3 md:grid-cols-4" : "grid-cols-4 md:grid-cols-5"
          )}
        >
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
                  : previewing || flipped.includes(card.id)
                  ? "bg-white border-purple-300"
                  : "bg-purple-200 border-purple-300 hover:bg-purple-300 text-transparent"
              )}
            >
              {(previewing || flipped.includes(card.id) || solved.includes(card.id)) && card.content}
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
              <p className="text-zinc-500 dark:text-zinc-400 mb-6">{level === MAX_LEVEL ? "Tüm seviyeler tamamlandı." : "Seviye tamamlandı."}</p>
              <button
                onClick={() => (level < MAX_LEVEL ? startLevel(level + 1) : resetGame())}
                className="px-8 py-3 rounded-2xl bg-emerald-500 text-white font-bold hover:bg-emerald-600 transition-colors"
              >
                {level < MAX_LEVEL ? "Sonraki Seviye" : "Tekrar Oyna"}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
