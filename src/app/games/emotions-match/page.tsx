"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, RefreshCw, Trophy, Heart } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

type MatchItem = { id: string; content: string; type: string; label: string };

const ITEMS: MatchItem[] = [
  { id: "happy", content: "😊", type: "happy", label: "Mutlu" },
  { id: "sad", content: "😢", type: "sad", label: "Üzgün" },
  { id: "angry", content: "😠", type: "angry", label: "Kızgın" },
  { id: "surprised", content: "😲", type: "surprised", label: "Şaşkın" },
  { id: "scared", content: "😨", type: "scared", label: "Korkmuş" },
  { id: "sleepy", content: "😴", type: "sleepy", label: "Uykulu" },
];

const shuffle = <T,>(arr: T[]) => [...arr].sort(() => Math.random() - 0.5);

export default function EmotionsMatchPage() {
  const [left, setLeft] = useState<MatchItem[]>(() => shuffle(ITEMS));
  const [right, setRight] = useState<MatchItem[]>(() => shuffle(ITEMS));
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [matched, setMatched] = useState<string[]>([]);
  const [disabled, setDisabled] = useState(false);

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
    }, 800);
  };

  const resetGame = () => {
    setLeft(shuffle(ITEMS));
    setRight(shuffle(ITEMS));
    setSelectedLeft(null);
    setSelectedRight(null);
    setMatched([]);
    setDisabled(false);
  };

  const isWon = matched.length === ITEMS.length;

  return (
    <div className="min-h-screen bg-rose-50 dark:bg-zinc-950 p-6">
      <header className="max-w-3xl mx-auto mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/games"
            className="p-3 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50"
          >
            <ArrowLeft size={24} />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">Duyguları Eşleştir</h1>
            <p className="text-sm font-bold text-zinc-500">Aynı duyguyu bul</p>
          </div>
        </div>
        <button
          onClick={resetGame}
          className="p-3 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-rose-600 hover:bg-rose-50 transition-colors shadow-sm"
        >
          <RefreshCw size={24} />
        </button>
      </header>

      <main className="max-w-3xl mx-auto">
        <div className="grid grid-cols-2 gap-4 sm:gap-8">
          <div className="space-y-4">
            {left.map((item) => (
              <motion.button
                key={`left-${item.id}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handlePick("left", item.type)}
                disabled={disabled || matched.includes(item.type)}
                className={cn(
                  "w-full h-24 rounded-3xl text-5xl flex items-center justify-center transition-all shadow-sm border-4 font-black relative overflow-hidden",
                  matched.includes(item.type)
                    ? "bg-emerald-100 border-emerald-200 opacity-60 cursor-default"
                    : selectedLeft === item.type
                    ? selectedRight && selectedRight !== selectedLeft
                      ? "bg-white border-rose-400 scale-105"
                      : "bg-white border-blue-400 scale-105"
                    : "bg-white border-zinc-200 hover:border-zinc-300 dark:bg-zinc-900 dark:border-zinc-800"
                )}
              >
                {item.content}
              </motion.button>
            ))}
          </div>

          <div className="space-y-4">
            {right.map((item) => (
              <motion.button
                key={`right-${item.id}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handlePick("right", item.type)}
                disabled={disabled || matched.includes(item.type)}
                className={cn(
                  "w-full h-24 rounded-3xl flex flex-col items-center justify-center transition-all shadow-sm border-4 relative overflow-hidden",
                  matched.includes(item.type)
                    ? "bg-emerald-100 border-emerald-200 opacity-60 cursor-default"
                    : selectedRight === item.type
                    ? selectedLeft && selectedLeft !== selectedRight
                      ? "bg-white border-rose-400 scale-105"
                      : "bg-white border-blue-400 scale-105"
                    : "bg-white border-zinc-200 hover:border-zinc-300 dark:bg-zinc-900 dark:border-zinc-800"
                )}
              >
                <span className="text-xl sm:text-2xl font-black text-zinc-700 dark:text-zinc-200 uppercase tracking-widest">{item.label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {isWon && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="mt-12 p-8 rounded-[2.5rem] bg-white dark:bg-zinc-900 border-4 border-emerald-400 text-center shadow-2xl relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-emerald-50 dark:bg-emerald-900/20 opacity-50 pointer-events-none" />
              <div className="relative z-10">
                <motion.div 
                  animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="inline-block p-6 rounded-full bg-emerald-100 text-emerald-600 mb-6 shadow-inner"
                >
                  <Trophy size={64} />
                </motion.div>
                <h2 className="text-4xl font-black text-zinc-900 dark:text-zinc-50 mb-4 tracking-tight">Harika İşi Çıkardın!</h2>
                <p className="text-lg text-zinc-600 dark:text-zinc-400 font-bold mb-8">Bütün duyguları başarıyla eşleştirdin.</p>
                <button
                  onClick={resetGame}
                  className="px-10 py-5 rounded-2xl bg-emerald-500 text-white font-black uppercase tracking-widest text-sm hover:bg-emerald-600 transition-all shadow-lg active:scale-95"
                >
                  Tekrar Oyna
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
