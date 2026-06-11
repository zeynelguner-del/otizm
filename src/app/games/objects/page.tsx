"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Volume2,
  Check,
  X,
  Sparkles,
  ChevronRight,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// --- Types ---
type ObjectItem = {
  name: string;
  emoji: string;
};

type ObjectCategory = {
  title: string;
  emoji: string;
  color: string;
  items: ObjectItem[];
};

// --- Constants ---
const CATEGORIES: ObjectCategory[] = [
  {
    title: "Meyveler",
    emoji: "🍎",
    color: "bg-red-50 dark:bg-red-950/20 border-red-100 hover:bg-red-100/50 hover:shadow-red-100/10",
    items: [
      { name: "Elma", emoji: "🍎" },
      { name: "Armut", emoji: "🍐" },
      { name: "Muz", emoji: "🍌" },
      { name: "Çilek", emoji: "🍓" },
      { name: "Portakal", emoji: "🍊" },
      { name: "Karpuz", emoji: "🍉" },
      { name: "Üzüm", emoji: "🍇" },
      { name: "Kiraz", emoji: "🍒" },
      { name: "Ananas", emoji: "🍍" },
      { name: "Limon", emoji: "🍋" },
    ],
  },
  {
    title: "Sebzeler",
    emoji: "🥕",
    color: "bg-amber-50 dark:bg-amber-950/20 border-amber-100 hover:bg-amber-100/50 hover:shadow-amber-100/10",
    items: [
      { name: "Havuç", emoji: "🥕" },
      { name: "Domates", emoji: "🍅" },
      { name: "Patates", emoji: "🥔" },
      { name: "Mısır", emoji: "🌽" },
      { name: "Biber", emoji: "🌶️" },
      { name: "Patlıcan", emoji: "🍆" },
      { name: "Brokoli", emoji: "🥦" },
      { name: "Salatalık", emoji: "🥒" },
      { name: "Soğan", emoji: "🧅" },
      { name: "Sarımsak", emoji: "🧄" },
    ],
  },
  {
    title: "İçecekler",
    emoji: "🥛",
    color: "bg-sky-50 dark:bg-sky-950/20 border-sky-100 hover:bg-sky-100/50 hover:shadow-sky-100/10",
    items: [
      { name: "Süt", emoji: "🥛" },
      { name: "Su", emoji: "💧" },
      { name: "Meyve Suyu", emoji: "🍹" },
      { name: "Çay", emoji: "🍵" },
      { name: "Kahve", emoji: "☕" },
      { name: "Limonata", emoji: "🍋" },
    ],
  },
  {
    title: "Ev Eşyaları",
    emoji: "🛋️",
    color: "bg-purple-50 dark:bg-purple-950/20 border-purple-100 hover:bg-purple-100/50 hover:shadow-purple-100/10",
    items: [
      { name: "Koltuk", emoji: "🛋️" },
      { name: "Yatak", emoji: "🛏️" },
      { name: "Lamba", emoji: "💡" },
      { name: "Televizyon", emoji: "📺" },
      { name: "Kapı", emoji: "🚪" },
      { name: "Saat", emoji: "⏰" },
      { name: "Ayna", emoji: "🪞" },
      { name: "Sandalye", emoji: "🪑" },
    ],
  },
  {
    title: "Oyuncaklar",
    emoji: "🧸",
    color: "bg-pink-50 dark:bg-pink-950/20 border-pink-100 hover:bg-pink-100/50 hover:shadow-pink-100/10",
    items: [
      { name: "Oyuncak Ayı", emoji: "🧸" },
      { name: "Balon", emoji: "🎈" },
      { name: "Uçurtma", emoji: "🪁" },
      { name: "Oyuncak Araba", emoji: "🚗" },
      { name: "Yapboz", emoji: "🧩" },
      { name: "Top", emoji: "⚽" },
      { name: "Oyun Konsolu", emoji: "🎮" },
    ],
  },
  {
    title: "Giysiler",
    emoji: "👕",
    color: "bg-blue-50 dark:bg-blue-950/20 border-blue-100 hover:bg-blue-100/50 hover:shadow-blue-100/10",
    items: [
      { name: "Tişört", emoji: "👕" },
      { name: "Pantolon", emoji: "👖" },
      { name: "Mont", emoji: "🧥" },
      { name: "Çorap", emoji: "🧦" },
      { name: "Elbise", emoji: "👗" },
      { name: "Şapka", emoji: "🧢" },
      { name: "Ayakkabı", emoji: "👟" },
    ],
  },
  {
    title: "Aksesuarlar",
    emoji: "🧣",
    color: "bg-stone-50 dark:bg-stone-950/20 border-stone-100 hover:bg-stone-100/50 hover:shadow-stone-100/10",
    items: [
      { name: "Gözlük", emoji: "🕶️" },
      { name: "Çanta", emoji: "🎒" },
      { name: "Şemsiye", emoji: "☂️" },
      { name: "Kol Saati", emoji: "⌚" },
      { name: "Yüzük", emoji: "💍" },
      { name: "Atkı", emoji: "🧣" },
    ],
  },
  {
    title: "Taşıtlar",
    emoji: "🚗",
    color: "bg-orange-50 dark:bg-orange-950/20 border-orange-100 hover:bg-orange-100/50 hover:shadow-orange-100/10",
    items: [
      { name: "Araba", emoji: "🚗" },
      { name: "Bisiklet", emoji: "🚲" },
      { name: "Otobüs", emoji: "🚌" },
      { name: "Tren", emoji: "🚂" },
      { name: "Uçak", emoji: "✈️" },
      { name: "Gemi", emoji: "🚢" },
      { name: "İtfaiye", emoji: "🚒" },
      { name: "Ambulans", emoji: "🚑" },
      { name: "Helikopter", emoji: "🚁" },
    ],
  },
  {
    title: "Hayvanlar",
    emoji: "🐱",
    color: "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-100 hover:bg-emerald-100/50 hover:shadow-emerald-100/10",
    items: [
      { name: "Kedi", emoji: "🐱" },
      { name: "Köpek", emoji: "🐶" },
      { name: "Aslan", emoji: "🦁" },
      { name: "Kuş", emoji: "🐦" },
      { name: "Balık", emoji: "🐟" },
      { name: "Tavşan", emoji: "🐰" },
      { name: "Fil", emoji: "🐘" },
      { name: "Maymun", emoji: "🐵" },
      { name: "Ayı", emoji: "🐻" },
      { name: "Kurbağa", emoji: "🐸" },
    ],
  },
  {
    title: "Aile Üyeleri",
    emoji: "👨‍👩-bıyıklı",
    color: "bg-violet-50 dark:bg-violet-950/20 border-violet-100 hover:bg-violet-100/50 hover:shadow-violet-100/10",
    items: [
      { name: "Anne", emoji: "👩" },
      { name: "Baba", emoji: "🧔" }, // Bıyıklı figür (baba)
      { name: "Bebek", emoji: "👶" },
      { name: "Dede", emoji: "👴" },
      { name: "Anneanne", emoji: "👵" },
      { name: "Kız Kardeş", emoji: "👧" },
      { name: "Erkek Kardeş", emoji: "👦" }, // Erkek kardeş
    ],
  },
];

export default function ObjectsGamePage() {
  const [selectedCategory, setSelectedCategory] = useState<ObjectCategory | null>(null);
  const [options, setOptions] = useState<ObjectItem[]>([]);
  const [targetItem, setTargetItem] = useState<ObjectItem | null>(null);
  const [selectedOption, setSelectedOption] = useState<ObjectItem | null>(null);
  const [isAnsweredCorrectly, setIsAnsweredCorrectly] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState<ObjectItem[]>([]);

  const speak = (text: string) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    try {
      window.speechSynthesis.cancel();
    } catch {}
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "tr-TR";
    utterance.rate = 0.8;
    utterance.pitch = 1.05;
    window.speechSynthesis.speak(utterance);
  };

  const setupQuestion = (category: ObjectCategory) => {
    const allItems = [...category.items];
    if (allItems.length < 4) return;

    // Pick 4 random options
    const chosen: ObjectItem[] = [];
    while (chosen.length < 4) {
      const item = allItems[Math.floor(Math.random() * allItems.length)];
      if (!chosen.find((c) => c.name === item.name)) {
        chosen.push(item);
      }
    }

    const target = chosen[Math.floor(Math.random() * chosen.length)];

    setOptions(chosen);
    setTargetItem(target);
    setSelectedOption(null);
    setIsAnsweredCorrectly(false);
    setWrongAnswers([]);

    // Speak question immediately after a short break
    setTimeout(() => {
      speak(`${target.name} hangisi?`);
    }, 150);
  };

  const handleCategorySelect = (category: ObjectCategory) => {
    setSelectedCategory(category);
    setupQuestion(category);
  };

  const handleOptionClick = (item: ObjectItem) => {
    if (isAnsweredCorrectly || !targetItem) return;
    setSelectedOption(item);

    if (item.name === targetItem.name) {
      setIsAnsweredCorrectly(true);
      speak(`Evet, bu ${targetItem.name}!`);
    } else {
      if (!wrongAnswers.find((w) => w.name === item.name)) {
        setWrongAnswers((prev) => [...prev, item]);
      }
      speak(`Hayır, bu ${targetItem.name} değil.`);
    }
  };

  const handleNextQuestion = () => {
    if (selectedCategory) {
      setupQuestion(selectedCategory);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col font-sans relative overflow-hidden" suppressHydrationWarning>
      {/* Decorative background glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-rose-500 rounded-full blur-[140px] opacity-10 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500 rounded-full blur-[140px] opacity-10 pointer-events-none" />

      {/* Header */}
      <header className="max-w-6xl mx-auto w-full px-6 pt-10 pb-6 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-5">
          <button
            onClick={() => {
              if (selectedCategory) setSelectedCategory(null);
            }}
            className={cn(
              "p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 shadow-md transition-all hover:scale-105 active:scale-95",
              !selectedCategory && "pointer-events-none opacity-0"
            )}
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-3xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight leading-none flex items-center gap-2">
              {selectedCategory ? selectedCategory.title : "Nesneleri Tanıyalım"} <Sparkles className="text-pink-500" size={24} />
            </h1>
            <p className="text-zinc-500 font-bold mt-1.5 text-sm uppercase tracking-wide">
              {selectedCategory ? "Doğru Seçeneğe Tıkla" : "Geliştirici Nesne Eşleştirme Oyunu"}
            </p>
          </div>
        </div>

        {selectedCategory && targetItem && (
          <button
            onClick={() => speak(`${targetItem.name} hangisi?`)}
            className="p-4 rounded-2xl bg-pink-100 hover:bg-pink-200 text-pink-600 dark:bg-pink-950/20 dark:text-pink-400 hover:scale-105 transition-all shadow-md"
            title="Soruyu Seslendir"
          >
            <Volume2 size={24} />
          </button>
        )}
      </header>

      {/* Main Body */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-6 pb-12 flex flex-col justify-center relative z-10">
        <AnimatePresence mode="wait">
          {!selectedCategory ? (
            /* Category Selection Board */
            <motion.div
              key="categories"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
                <h2 className="text-xl font-black text-zinc-800 dark:text-zinc-200">Kategori Seçin</h2>
                <p className="text-zinc-400 font-bold text-xs mt-1">Eşleştirmek istediğiniz nesne grubuna tıklayın.</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {CATEGORIES.map((cat) => (
                  <motion.button
                    key={cat.title}
                    onClick={() => handleCategorySelect(cat)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={cn(
                      "flex flex-col items-center gap-4 p-8 rounded-[2.5rem] border-2 shadow-sm hover:shadow-xl transition-all relative overflow-hidden group",
                      cat.color
                    )}
                  >
                    <div className="text-6xl group-hover:scale-110 transition-transform group-active:rotate-6">
                      {cat.title === "Aile Üyeleri" ? "👨‍👩‍👦" : cat.emoji}
                    </div>
                    <span className="font-black text-zinc-800 dark:text-zinc-200 text-sm tracking-tight text-center leading-tight">
                      {cat.title}
                    </span>
                    <ChevronRight size={18} className="text-zinc-400 mt-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            /* Gameplay Board */
            <motion.div
              key="gameplay"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="space-y-8 flex flex-col items-center"
            >
              {/* Question Screen */}
              {targetItem && (
                <div className="w-full bg-white dark:bg-zinc-900 p-8 sm:p-10 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-lg text-center flex flex-col items-center justify-center gap-1.5">
                  <span className="text-xs font-black text-pink-500 uppercase tracking-widest">Soru</span>
                  <h2 className="text-3xl sm:text-4xl font-black text-zinc-800 dark:text-zinc-100 tracking-tight leading-snug">
                    {targetItem.name} hangisi?
                  </h2>
                </div>
              )}

              {/* 4-Option Emojis Grid */}
              <div className="grid grid-cols-2 gap-6 w-full max-w-2xl">
                {options.map((item) => {
                  const isCorrect = isAnsweredCorrectly && targetItem && item.name === targetItem.name;
                  const isWrong = wrongAnswers.find((w) => w.name === item.name);

                  return (
                    <motion.button
                      key={item.name}
                      onClick={() => handleOptionClick(item)}
                      whileHover={!isAnsweredCorrectly ? { scale: 1.04 } : {}}
                      whileTap={!isAnsweredCorrectly ? { scale: 0.96 } : {}}
                      className={cn(
                        "aspect-square rounded-[3rem] border-2 bg-white dark:bg-zinc-900 flex flex-col items-center justify-center gap-3 relative shadow-md transition-all",
                        isCorrect && "bg-emerald-50 border-emerald-500 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400 shadow-emerald-500/10 ring-4 ring-emerald-500/10 scale-102",
                        isWrong && "bg-rose-50 border-rose-500 text-rose-500 dark:bg-rose-950/20 dark:text-rose-400 opacity-60 scale-95"
                      )}
                    >
                      <span className="text-7xl sm:text-8xl select-none leading-none">
                        {item.emoji}
                      </span>

                      {isCorrect && (
                        <>
                          <span className="text-sm sm:text-base font-black tracking-tight mt-2 uppercase">{item.name}</span>
                          <div className="absolute top-6 right-6 p-1.5 rounded-full bg-emerald-500 text-white shadow-md">
                            <Check size={16} strokeWidth={3} />
                          </div>
                        </>
                      )}

                      {isWrong && (
                        <div className="absolute top-6 right-6 p-1.5 rounded-full bg-rose-500 text-white shadow-md">
                          <X size={16} strokeWidth={3} />
                        </div>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Celebration Block & Next Question Button */}
              <div className="w-full max-w-md h-20 flex items-center justify-center">
                <AnimatePresence>
                  {isAnsweredCorrectly && (
                    <motion.button
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      onClick={handleNextQuestion}
                      className="w-full py-4.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-emerald-500/10 flex items-center justify-center gap-2 active:scale-98 transition-all hover:-translate-y-0.5"
                    >
                      <ChevronRight size={20} strokeWidth={3} />
                      <span>Sonraki Soru</span>
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-zinc-200/50 dark:border-zinc-800/50 bg-white/30 dark:bg-zinc-950/30 py-6 mt-auto">
        <div className="max-w-6xl mx-auto px-6 text-center text-zinc-400 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2">
          <span>🔊 Yanıt verildiğinde doğru/yanlış sesli Türkçe geri bildirim çalışır.</span>
        </div>
      </footer>
    </div>
  );
}
