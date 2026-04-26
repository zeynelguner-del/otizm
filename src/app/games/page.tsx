"use client";

import { ArrowLeft, Layers, Palette, Hash, Star } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useEffect, useSyncExternalStore } from "react";

const TOKENS_KEY = "tokenBalanceV1";
const TOKENS_EVENT = "token-storage";

let cachedTokenRaw: string | null | undefined = undefined;
let cachedTokenParsed = 0;

const subscribeToTokens = (callback: () => void) => {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  window.addEventListener(TOKENS_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(TOKENS_EVENT, callback);
  };
};

const getTokensSnapshot = () => {
  if (typeof window === "undefined") return 0;
  let raw: string | null;
  try {
    raw = localStorage.getItem(TOKENS_KEY);
  } catch {
    return 0;
  }
  if (raw === cachedTokenRaw) return cachedTokenParsed;
  cachedTokenRaw = raw;
  const n = raw ? Number(raw) : 0;
  cachedTokenParsed = Number.isFinite(n) ? n : 0;
  return cachedTokenParsed;
};

export default function GamesPage() {
  const tokens = useSyncExternalStore(subscribeToTokens, getTokensSnapshot, () => 0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.dispatchEvent(new Event(TOKENS_EVENT));
  }, []);

  const games = [
    {
      title: "Eşleştirme Oyunu",
      description: "Aynı meyveleri bulup eşleştir",
      icon: Layers,
      href: "/games/matching",
      color: "bg-sky-100 text-sky-600 border-sky-200 hover:bg-sky-200",
    },
    {
      title: "Sayı Saymaca",
      description: "Eğlenceli sayılarla öğren",
      icon: Hash,
      href: "/games/counting",
      color: "bg-emerald-100 text-emerald-600 border-emerald-200 hover:bg-emerald-200",
    },
    {
      title: "Renkleri Boya",
      description: "Dünyayı renklendir",
      icon: Palette,
      href: "/games/coloring",
      color: "bg-rose-100 text-rose-600 border-rose-200 hover:bg-rose-200",
    },
    {
      title: "Hafıza Kartları",
      description: "Kartların yerini hatırla",
      icon: Star,
      href: "/games/memory",
      color: "bg-purple-100 text-purple-600 border-purple-200 hover:bg-purple-200",
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-6 md:p-12">
      <header className="max-w-4xl mx-auto mb-12 flex items-center gap-6">
        <Link
          href="/"
          className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 shadow-sm hover:bg-zinc-50 transition-all"
        >
          <ArrowLeft size={28} />
        </Link>
        <div>
          <h1 className="text-3xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">Eğitici Oyunlar</h1>
          <p className="text-zinc-500 font-medium">Eğlenerek Öğrenelim</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {games.map((game) => (
          <Link
            key={game.title}
            href={game.href}
            className={cn(
              "group flex flex-col items-start gap-6 p-8 rounded-[2rem] border-2 transition-all active:scale-[0.98] shadow-sm hover:shadow-xl relative overflow-hidden",
              game.color
            )}
          >
            <div className="p-5 rounded-2xl bg-white/90 dark:bg-black/20 shadow-md group-hover:scale-110 transition-transform group-hover:rotate-3">
              <game.icon size={36} />
            </div>
            
            <div>
              <h2 className="text-2xl font-black mb-2 tracking-tight">{game.title}</h2>
              <p className="opacity-90 font-bold text-sm leading-snug">{game.description}</p>
            </div>
          </Link>
        ))}
      </main>

      {/* Reward Section */}
      <section className="max-w-4xl mx-auto mt-12 bg-zinc-900 dark:bg-zinc-800 p-8 rounded-[2.5rem] text-white flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-6">
          <div className="text-4xl">🏆</div>
          <div>
            <h3 className="text-xl font-black tracking-tight">Günün Başarısı</h3>
            <p className="text-zinc-400 font-bold">Toplam yıldız: {tokens}</p>
          </div>
        </div>
        <Link
          href="/calendar#rewards"
          className="px-6 py-3 bg-white text-zinc-900 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-zinc-100 transition-all"
        >
          Ödülleri Gör
        </Link>
      </section>
    </div>
  );
}
