"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, RefreshCw, Palette } from "lucide-react";
import { cn } from "@/lib/utils";

type Shape = {
  id: string;
  label: string;
  color: string;
};

const COLORS = [
  { name: "Kırmızı", value: "#ef4444" },
  { name: "Sarı", value: "#eab308" },
  { name: "Mavi", value: "#3b82f6" },
  { name: "Yeşil", value: "#22c55e" },
  { name: "Mor", value: "#a855f7" },
  { name: "Pembe", value: "#ec4899" },
];

export default function ColoringGamePage() {
  const initialShapes = useMemo<Shape[]>(
    () => [
      { id: "circle", label: "Daire", color: "#ffffff" },
      { id: "square", label: "Kare", color: "#ffffff" },
      { id: "triangle", label: "Üçgen", color: "#ffffff" },
    ],
    []
  );

  const [selectedColor, setSelectedColor] = useState(COLORS[0].value);
  const [shapes, setShapes] = useState<Shape[]>(() => initialShapes);

  const reset = () => {
    setShapes(initialShapes);
  };

  const paint = (id: string) => {
    setShapes((prev) => prev.map((s) => (s.id === id ? { ...s, color: selectedColor } : s)));
  };

  return (
    <div className="min-h-screen bg-rose-50 dark:bg-zinc-950 p-6">
      <header className="max-w-2xl mx-auto mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/games"
            className="p-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400"
          >
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Renkleri Boya</h1>
        </div>
        <button
          onClick={reset}
          className="p-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-rose-600 hover:bg-rose-50 transition-colors"
        >
          <RefreshCw size={24} />
        </button>
      </header>

      <main className="max-w-2xl mx-auto space-y-6">
        <section className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border-2 border-zinc-200 dark:border-zinc-800 shadow-sm">
          <h2 className="text-lg font-black text-zinc-800 dark:text-zinc-100 mb-4 flex items-center gap-3">
            <Palette className="text-rose-500" /> Renk Seç
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {COLORS.map((c) => (
              <button
                key={c.value}
                onClick={() => setSelectedColor(c.value)}
                className={cn(
                  "p-4 rounded-2xl border-2 font-black text-sm transition-all active:scale-95 flex items-center justify-between gap-3",
                  selectedColor === c.value
                    ? "bg-zinc-50 dark:bg-zinc-800/50 border-zinc-900 dark:border-zinc-100"
                    : "bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 hover:border-rose-200"
                )}
              >
                <span className="truncate">{c.name}</span>
                <span className="w-6 h-6 rounded-lg border border-zinc-200" style={{ backgroundColor: c.value }} />
              </button>
            ))}
          </div>
        </section>

        <section className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border-2 border-zinc-200 dark:border-zinc-800 shadow-sm">
          <h2 className="text-lg font-black text-zinc-800 dark:text-zinc-100 mb-4">Şekle dokun ve boya</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button
              onClick={() => paint("circle")}
              className="p-6 rounded-3xl border-2 border-zinc-100 dark:border-zinc-800 hover:border-rose-200 transition-all active:scale-95"
            >
              <div className="w-full aspect-square flex items-center justify-center">
                <div className="w-32 h-32 rounded-full border-4 border-zinc-200" style={{ backgroundColor: shapes.find((s) => s.id === "circle")?.color }} />
              </div>
              <div className="mt-4 font-black text-zinc-700 dark:text-zinc-200">Daire</div>
            </button>

            <button
              onClick={() => paint("square")}
              className="p-6 rounded-3xl border-2 border-zinc-100 dark:border-zinc-800 hover:border-rose-200 transition-all active:scale-95"
            >
              <div className="w-full aspect-square flex items-center justify-center">
                <div className="w-32 h-32 rounded-2xl border-4 border-zinc-200" style={{ backgroundColor: shapes.find((s) => s.id === "square")?.color }} />
              </div>
              <div className="mt-4 font-black text-zinc-700 dark:text-zinc-200">Kare</div>
            </button>

            <button
              onClick={() => paint("triangle")}
              className="p-6 rounded-3xl border-2 border-zinc-100 dark:border-zinc-800 hover:border-rose-200 transition-all active:scale-95"
            >
              <div className="w-full aspect-square flex items-center justify-center">
                <svg width="180" height="160" viewBox="0 0 180 160" className="block">
                  <polygon
                    points="90,20 160,140 20,140"
                    stroke="#e5e7eb"
                    strokeWidth="6"
                    fill={shapes.find((s) => s.id === "triangle")?.color ?? "#ffffff"}
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="mt-4 font-black text-zinc-700 dark:text-zinc-200">Üçgen</div>
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
