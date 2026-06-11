"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Volume2,
  Trash2,
  Smile,
  Users,
  Utensils,
  MapPin,
  Clock,
  Sparkles,
  HelpCircle,
  X,
  VolumeX,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// --- Types ---
type TabType = "sentence" | "sounds" | "game";

type LetterGameObject = {
  letter: string;
  emoji: string;
  word: string;
};

// --- Constants ---
const TURKISH_ALPHABET = [
  "A", "B", "C", "Ç", "D", "E", "F", "G", "Ğ", "H",
  "I", "İ", "J", "K", "L", "M", "N", "O", "Ö", "P",
  "R", "S", "Ş", "T", "U", "Ü", "V", "Y", "Z"
];

const LETTER_COLORS = [
  "bg-red-100/90 text-red-700 border-red-200 hover:bg-red-200/95 hover:shadow-red-100",
  "bg-amber-100/90 text-amber-700 border-amber-200 hover:bg-amber-200/95 hover:shadow-amber-100",
  "bg-emerald-100/90 text-emerald-700 border-emerald-200 hover:bg-emerald-200/95 hover:shadow-emerald-100",
  "bg-blue-100/90 text-blue-700 border-blue-200 hover:bg-blue-200/95 hover:shadow-blue-100",
  "bg-indigo-100/90 text-indigo-700 border-indigo-200 hover:bg-indigo-200/95 hover:shadow-indigo-100",
  "bg-purple-100/90 text-purple-700 border-purple-200 hover:bg-purple-200/95 hover:shadow-purple-100",
  "bg-pink-100/90 text-pink-700 border-pink-200 hover:bg-pink-200/95 hover:shadow-pink-100",
  "bg-sky-100/90 text-sky-700 border-sky-200 hover:bg-sky-200/95 hover:shadow-sky-100",
  "bg-orange-100/90 text-orange-700 border-orange-200 hover:bg-orange-200/95 hover:shadow-orange-100",
  "bg-teal-100/90 text-teal-700 border-teal-200 hover:bg-teal-200/95 hover:shadow-teal-100",
];

const GAME_OBJECTS: Record<string, LetterGameObject> = {
  "A": { letter: "A", emoji: "🍎", word: "Elma" },
  "B": { letter: "B", emoji: "🎈", word: "Balon" },
  "C": { letter: "C", emoji: "☕", word: "Fincan" },
  "Ç": { letter: "Ç", emoji: "🍓", word: "Çilek" },
  "D": { letter: "D", emoji: "🐶", word: "Köpek" },
  "E": { letter: "E", emoji: "🐘", word: "Fil" },
  "F": { letter: "F", emoji: "🐟", word: "Balık" },
  "G": { letter: "G", emoji: "🕶️", word: "Gözlük" },
  "Ğ": { letter: "Ğ", emoji: "🌳", word: "Ağaç" },
  "H": { letter: "H", emoji: "🥕", word: "Havuç" },
  "I": { letter: "I", emoji: "🪵", word: "Odun" },
  "İ": { letter: "İ", emoji: "🥛", word: "Süt" },
  "J": { letter: "J", emoji: "🐆", word: "Jaguar" },
  "K": { letter: "K", emoji: "🐱", word: "Kedi" },
  "L": { letter: "L", emoji: "🍋", word: "Limon" },
  "M": { letter: "M", emoji: "🍌", word: "Muz" },
  "N": { letter: "N", emoji: "🍍", word: "Ananas" },
  "O": { letter: "O", emoji: "🚌", word: "Otobüs" },
  "Ö": { letter: "Ö", emoji: "🦆", word: "Ördek" },
  "P": { letter: "P", emoji: "🥔", word: "Patates" },
  "R": { letter: "R", emoji: "🚗", word: "Araba" },
  "S": { letter: "S", emoji: "⌚", word: "Saat" },
  "Ş": { letter: "Ş", emoji: "👗", word: "Elbise" },
  "T": { letter: "T", emoji: "🍅", word: "Domates" },
  "U": { letter: "U", emoji: "🪁", word: "Uçurtma" },
  "Ü": { letter: "Ü", emoji: "🍇", word: "Üzüm" },
  "V": { letter: "V", emoji: "🏠", word: "Ev" },
  "Y": { letter: "Y", emoji: "🍳", word: "Yumurta" },
  "Z": { letter: "Z", emoji: "🦓", word: "Zebra" },
};

export default function SentenceSoundsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("sentence");
  const [pressedLetter, setPressedLetter] = useState<string | null>(null);
  const [shuffledLetters, setShuffledLetters] = useState<string[]>([]);
  const [gameObjectModal, setGameObjectModal] = useState<LetterGameObject | null>(null);

  // Sentence state
  const [sentenceWho, setSentenceWho] = useState<string | null>("Ben");
  const [sentenceWhat, setSentenceWhat] = useState<string | null>(null);
  const [sentenceWhere, setSentenceWhere] = useState<string | null>(null);
  const [sentenceWhen, setSentenceWhen] = useState<string | null>(null);
  const [sentenceVerb, setSentenceVerb] = useState<string | null>("istiyorum");

  useEffect(() => {
    // Shuffled alphabet for game
    const shuffled = [...TURKISH_ALPHABET].sort(() => Math.random() - 0.5);
    setShuffledLetters(shuffled);
  }, []);

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

  const onLetterClick = (letter: string) => {
    setPressedLetter(letter);
    speak(letter);
    setTimeout(() => {
      setPressedLetter(null);
    }, 250);
  };

  const onGameLetterClick = (letter: string) => {
    const gameObj = GAME_OBJECTS[letter];
    if (!gameObj) return;
    setGameObjectModal(gameObj);
    speak(`Evet bu ${letter}! ${letter} harfi ${gameObj.word} kelimesinde geçer. ${gameObj.word}.`);
  };

  const sentenceText = [
    sentenceWho,
    sentenceWhat,
    sentenceWhere,
    sentenceWhen,
    sentenceVerb,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col font-sans relative overflow-hidden" suppressHydrationWarning>
      {/* Decorative background glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-500 rounded-full blur-[140px] opacity-15 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-500 rounded-full blur-[140px] opacity-15 pointer-events-none" />

      {/* Header Panel */}
      <header className="max-w-6xl mx-auto w-full px-6 pt-10 pb-6 flex flex-col gap-6 relative z-10">
        <div className="flex items-center gap-5">
          <Link
            href="/"
            className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 shadow-md hover:bg-zinc-100 hover:scale-105 active:scale-95 transition-all"
          >
            <ArrowLeft size={24} />
          </Link>
          <div>
            <h1 className="text-3xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight leading-none flex items-center gap-2">
              Cümle Kur & Sesler <Sparkles className="text-purple-500" size={24} />
            </h1>
            <p className="text-zinc-500 font-bold mt-1.5 text-sm uppercase tracking-wide">
              Dil ve Konuşma Gelişim Destek Paneli
            </p>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="grid grid-cols-3 gap-2 bg-white dark:bg-zinc-900 p-2 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-lg">
          <button
            onClick={() => setActiveTab("sentence")}
            className={cn(
              "py-4 rounded-2xl font-black uppercase tracking-wider text-xs sm:text-sm flex flex-col sm:flex-row items-center justify-center gap-2 transition-all duration-300",
              activeTab === "sentence"
                ? "bg-purple-600 shadow-md text-white scale-[1.02]"
                : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300"
            )}
          >
            <Smile size={18} /> Cümle Kur
          </button>
          <button
            onClick={() => setActiveTab("sounds")}
            className={cn(
              "py-4 rounded-2xl font-black uppercase tracking-wider text-xs sm:text-sm flex flex-col sm:flex-row items-center justify-center gap-2 transition-all duration-300",
              activeTab === "sounds"
                ? "bg-purple-600 shadow-md text-white scale-[1.02]"
                : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300"
            )}
          >
            <Volume2 size={18} /> Sesleri Tanıyalım
          </button>
          <button
            onClick={() => setActiveTab("game")}
            className={cn(
              "py-4 rounded-2xl font-black uppercase tracking-wider text-xs sm:text-sm flex flex-col sm:flex-row items-center justify-center gap-2 transition-all duration-300",
              activeTab === "game"
                ? "bg-purple-600 shadow-md text-white scale-[1.02]"
                : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300"
            )}
          >
            <HelpCircle size={18} /> Harf Oyunu
          </button>
        </div>
      </header>

      {/* Main Panel Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-6 pb-12 relative z-10">
        <AnimatePresence mode="wait">
          {/* Tab 1: Cümle Kur */}
          {activeTab === "sentence" && (
            <motion.div
              key="sentence"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Display Screen */}
              <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border-4 border-zinc-900 dark:border-zinc-100 shadow-xl flex items-center justify-center min-h-[140px] relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <p className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight text-center leading-relaxed">
                  {sentenceText ? `${sentenceText}.` : "Bir kelime seçerek cümle kur..."}
                </p>
              </div>

              {/* Selection Sections */}
              <div className="bg-white dark:bg-zinc-900 p-8 sm:p-10 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-lg space-y-8">
                {/* 1. Kim? */}
                <div className="space-y-3">
                  <h3 className="text-xs font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                    <Users size={14} /> KİM?
                  </h3>
                  <div className="flex flex-wrap gap-2.5">
                    {["Ben", "Sen", "O"].map((v) => (
                      <button
                        key={v}
                        onClick={() => setSentenceWho(sentenceWho === v ? null : v)}
                        className={cn(
                          "px-6 py-3.5 rounded-2xl border-2 font-black text-sm transition-all hover:scale-105 active:scale-95 shadow-sm hover:shadow-md",
                          sentenceWho === v
                            ? "bg-emerald-50 border-emerald-500 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400"
                            : "bg-white dark:bg-zinc-950 border-zinc-100 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300"
                        )}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Ne? */}
                <div className="space-y-3">
                  <h3 className="text-xs font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                    <Utensils size={14} /> NE?
                  </h3>
                  <div className="flex flex-wrap gap-2.5">
                    {["Su", "Yemek", "Tuvalet", "Sarılmak", "Müzik", "Oyun"].map((v) => (
                      <button
                        key={v}
                        onClick={() => setSentenceWhat(sentenceWhat === v ? null : v)}
                        className={cn(
                          "px-6 py-3.5 rounded-2xl border-2 font-black text-sm transition-all hover:scale-105 active:scale-95 shadow-sm hover:shadow-md",
                          sentenceWhat === v
                            ? "bg-amber-50 border-amber-500 text-amber-700 dark:bg-amber-950/20 dark:text-amber-400"
                            : "bg-white dark:bg-zinc-950 border-zinc-100 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300"
                        )}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Nerede / Ne zaman? */}
                <div className="space-y-3">
                  <h3 className="text-xs font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                    <MapPin size={14} /> NEREDE / NE ZAMAN?
                  </h3>
                  <div className="flex flex-wrap gap-2.5">
                    {["Evde", "Okulda", "Parkta", "Şimdi", "Birazdan"].map((v) => {
                      const isSelected = sentenceWhere === v || sentenceWhen === v;
                      return (
                        <button
                          key={v}
                          onClick={() => {
                            if (["Evde", "Okulda", "Parkta"].includes(v)) {
                              setSentenceWhere(sentenceWhere === v ? null : v);
                              setSentenceWhen(null);
                            } else {
                              setSentenceWhen(sentenceWhen === v ? null : v);
                              setSentenceWhere(null);
                            }
                          }}
                          className={cn(
                            "px-6 py-3.5 rounded-2xl border-2 font-black text-sm transition-all hover:scale-105 active:scale-95 shadow-sm hover:shadow-md",
                            isSelected
                              ? "bg-indigo-50 border-indigo-500 text-indigo-700 dark:bg-indigo-950/20 dark:text-indigo-400"
                              : "bg-white dark:bg-zinc-950 border-zinc-100 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300"
                          )}
                        >
                          {v}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 4. Ne Yapıyorum? */}
                <div className="space-y-3">
                  <h3 className="text-xs font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                    <Clock size={14} /> NE YAPIYORUM?
                  </h3>
                  <div className="flex flex-wrap gap-2.5">
                    {["istiyorum", "istemiyorum", "istiyor", "istemiyor", "ara vermek istiyorum"].map((v) => (
                      <button
                        key={v}
                        onClick={() => setSentenceVerb(sentenceVerb === v ? null : v)}
                        className={cn(
                          "px-6 py-3.5 rounded-2xl border-2 font-black text-sm transition-all hover:scale-105 active:scale-95 shadow-sm hover:shadow-md",
                          sentenceVerb === v
                            ? "bg-emerald-50 border-emerald-500 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400"
                            : "bg-white dark:bg-zinc-950 border-zinc-100 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300"
                        )}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 5. Hızlı Kelime */}
                <div className="space-y-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                  <h3 className="text-xs font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                    <Sparkles size={14} className="text-rose-500" /> HIZLI KELİME
                  </h3>
                  <div className="flex flex-wrap gap-2.5">
                    <button
                      onClick={() => {
                        setSentenceWho("Ben");
                        setSentenceWhat(null);
                        setSentenceWhere(null);
                        setSentenceWhen(null);
                        setSentenceVerb("yardım istiyorum");
                      }}
                      className={cn(
                        "px-6 py-3.5 rounded-2xl border-2 border-rose-200 bg-rose-50/50 hover:bg-rose-100 text-rose-700 dark:bg-rose-950/20 dark:border-rose-900/30 dark:text-rose-400 font-black text-sm transition-all hover:scale-105 active:scale-95 shadow-sm"
                      )}
                    >
                      yardım istiyorum 🆘
                    </button>
                  </div>
                </div>

                {/* Main Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button
                    disabled={!sentenceText}
                    onClick={() => speak(sentenceText)}
                    className={cn(
                      "flex-1 py-4 sm:py-5 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 transition-all shadow-lg active:scale-98",
                      sentenceText
                        ? "bg-purple-600 text-white hover:bg-purple-700 shadow-purple-500/10"
                        : "bg-zinc-200 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed"
                    )}
                  >
                    <Volume2 size={20} />
                    <span>KONUŞ</span>
                  </button>

                  <button
                    onClick={() => {
                      setSentenceWho(null);
                      setSentenceWhat(null);
                      setSentenceWhere(null);
                      setSentenceWhen(null);
                      setSentenceVerb(null);
                    }}
                    className="sm:w-48 py-4 sm:py-5 rounded-2xl border-2 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 transition-all hover:bg-zinc-50 active:scale-98"
                  >
                    <Trash2 size={18} />
                    <span>TEMİZLE</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Tab 2: Sesleri Tanıyalım */}
          {activeTab === "sounds" && (
            <motion.div
              key="sounds"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-zinc-900 p-6 sm:p-10 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-lg space-y-6"
            >
              <div className="border-b border-zinc-100 dark:border-zinc-800 pb-4">
                <h2 className="text-xl font-black text-zinc-800 dark:text-zinc-200">Harf Tablosu</h2>
                <p className="text-zinc-400 font-bold text-xs mt-1">Harfe basarak sesini dinle, harfler parlayacak!</p>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                {TURKISH_ALPHABET.map((letter, idx) => {
                  const colorClass = LETTER_COLORS[idx % LETTER_COLORS.length];
                  const isPressed = pressedLetter === letter;

                  return (
                    <motion.button
                      key={letter}
                      onClick={() => onLetterClick(letter)}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.92 }}
                      className={cn(
                        "aspect-square rounded-3xl border-2 flex flex-col items-center justify-center font-black transition-all duration-150 relative shadow-sm",
                        colorClass,
                        isPressed && "ring-4 ring-purple-600/40 border-purple-500 bg-purple-100/40 shadow-lg scale-110 z-10"
                      )}
                    >
                      <span className="text-4xl sm:text-5xl leading-none tracking-tight">{letter}</span>
                      
                      {/* Interactive glow layer */}
                      {isPressed && (
                        <span className="absolute inset-0 rounded-3xl bg-purple-500/10 animate-ping pointer-events-none" />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Tab 3: Harf Oyunu */}
          {activeTab === "game" && (
            <motion.div
              key="game"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-zinc-900 p-6 sm:p-10 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-lg space-y-6"
            >
              <div className="border-b border-zinc-100 dark:border-zinc-800 pb-4">
                <h2 className="text-xl font-black text-zinc-800 dark:text-zinc-200 font-sans">Harf Bulma Oyunu</h2>
                <p className="text-zinc-400 font-bold text-xs mt-1">Kutulardaki harflere tıkla ve o harfle başlayan kelimeyi keşfet!</p>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                {shuffledLetters.map((letter, idx) => {
                  const colorClass = LETTER_COLORS[(idx + 4) % LETTER_COLORS.length];

                  return (
                    <motion.button
                      key={letter}
                      onClick={() => onGameLetterClick(letter)}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.92 }}
                      className={cn(
                        "aspect-square rounded-3xl border-2 flex flex-col items-center justify-center font-black transition-all shadow-sm",
                        colorClass
                      )}
                    >
                      <span className="text-4xl sm:text-5xl leading-none tracking-tight">{letter}</span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Game Modal / Letter Popup Dialog */}
      <AnimatePresence>
        {gameObjectModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-zinc-950/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="bg-white dark:bg-zinc-900 w-full max-w-md rounded-[3rem] shadow-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 p-8 sm:p-10 text-center relative"
            >
              <button
                type="button"
                onClick={() => setGameObjectModal(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-500 dark:text-zinc-400 hover:scale-115 active:scale-90 transition-all"
              >
                <X size={20} />
              </button>

              <h2 className="text-3xl sm:text-4xl font-black text-purple-600 dark:text-purple-400">
                Evet, bu {gameObjectModal.letter}!
              </h2>
              <p className="text-zinc-400 font-bold text-sm uppercase tracking-widest mt-2">
                Harika Keşif!
              </p>

              {/* Large Emoji Box */}
              <div className="my-8 w-48 h-48 mx-auto flex items-center justify-center bg-purple-50 dark:bg-purple-950/20 rounded-[2.5rem] border border-purple-100 dark:border-purple-900/40 shadow-inner">
                <span className="text-8xl select-none leading-none animate-bounce">
                  {gameObjectModal.emoji}
                </span>
              </div>

              {/* Target Word */}
              <h3 className="text-3xl font-black text-zinc-800 dark:text-zinc-200 tracking-tight">
                {gameObjectModal.word}
              </h3>
              <p className="text-zinc-500 font-medium text-sm mt-1">
                "{gameObjectModal.letter}" harfi ile başlıyor.
              </p>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setGameObjectModal(null)}
                className="w-full py-4 mt-8 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl font-black uppercase tracking-wider text-sm shadow-lg shadow-purple-500/10 hover:scale-102 active:scale-98 transition-all"
              >
                Kapat
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer Info banner */}
      <footer className="w-full border-t border-zinc-200/50 dark:border-zinc-800/50 bg-white/30 dark:bg-zinc-950/30 py-6 mt-auto">
        <div className="max-w-6xl mx-auto px-6 text-center text-zinc-400 text-xs font-bold uppercase tracking-widest flex flex-col sm:flex-row items-center justify-center gap-3">
          <span>🔊 Kartlara basıldığında sesli seslendirme tetiklenir.</span>
        </div>
      </footer>
    </div>
  );
}
