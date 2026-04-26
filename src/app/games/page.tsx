"use client";

import { ArrowLeft, Layers, Palette, Hash, Star, Shapes } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function GamesPage() {
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
    {
      title: "Şekilleri Tanı",
      description: "Doğru şekli seç",
      icon: Shapes,
      href: "/games/shapes",
      color: "bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-200",
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
    </div>
  );
}
