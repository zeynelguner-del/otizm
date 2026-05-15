"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  Volume2, 
  Trash2, 
  MessageSquare, 
  Heart, 
  Utensils, 
  Play, 
  User,
  Settings2,
  X
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// --- Types ---
type Card = {
  id: string;
  label: string;
  emoji: string;
  color: string;
  category: string;
};

// --- Constants ---
const CATEGORIES = [
  { id: "basic", label: "Temel", icon: MessageSquare, color: "bg-blue-100 text-blue-600" },
  { id: "feelings", label: "Duygular", icon: Heart, color: "bg-rose-100 text-rose-600" },
  { id: "food", label: "Yemek", icon: Utensils, color: "bg-amber-100 text-amber-600" },
  { id: "actions", label: "Eylemler", icon: Play, color: "bg-emerald-100 text-emerald-600" },
];

const CARDS: Card[] = [
  // Temel
  { id: "yes", label: "Evet", emoji: "✅", color: "bg-emerald-50", category: "basic" },
  { id: "no", label: "Hayır", emoji: "❌", color: "bg-rose-50", category: "basic" },
  { id: "help", label: "Yardım Et", emoji: "🆘", color: "bg-amber-50", category: "basic" },
  { id: "stop", label: "Dur", emoji: "🛑", color: "bg-red-50", category: "basic" },
  { id: "please", label: "Lütfen", emoji: "🙏", color: "bg-purple-50", category: "basic" },
  { id: "thanks", label: "Teşekkürler", emoji: "💖", color: "bg-pink-50", category: "basic" },
  
  // Duygular
  { id: "happy", label: "Mutluyum", emoji: "😊", color: "bg-yellow-50", category: "feelings" },
  { id: "sad", label: "Üzgünüm", emoji: "😢", color: "bg-blue-50", category: "feelings" },
  { id: "angry", label: "Kızgınım", emoji: "😠", color: "bg-red-50", category: "feelings" },
  { id: "scared", label: "Korkuyorum", emoji: "😨", color: "bg-zinc-50", category: "feelings" },
  { id: "tired", label: "Yorgunum", emoji: "😴", category: "feelings", color: "bg-indigo-50" },
  
  // Yemek
  { id: "water", label: "Su İstiyorum", emoji: "💧", color: "bg-sky-50", category: "food" },
  { id: "food", label: "Acıktım", emoji: "🍕", color: "bg-orange-50", category: "food" },
  { id: "apple", label: "Elma", emoji: "🍎", color: "bg-red-50", category: "food" },
  { id: "milk", label: "Süt", emoji: "🥛", color: "bg-zinc-50", category: "food" },
  
  // Eylemler
  { id: "toilet", label: "Tuvalet", emoji: "🚽", color: "bg-zinc-100", category: "actions" },
  { id: "sleep", label: "Uyumak", emoji: "🛌", color: "bg-indigo-50", category: "actions" },
  { id: "play", label: "Oyun", emoji: "🎮", color: "bg-purple-50", category: "actions" },
  { id: "outside", label: "Dışarı Çıkmak", emoji: "🌳", color: "bg-green-50", category: "actions" },
  { id: "book", label: "Kitap Okumak", emoji: "📚", color: "bg-amber-50", category: "actions" },
];

export default function AACPage() {
  const [selectedCategory, setSelectedCategory] = useState("basic");
  const [sentence, setSentence] = useState<Card[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speak = (text: string) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    
    // Stop any current speaking
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "tr-TR";
    utterance.rate = 0.9;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    
    window.speechSynthesis.speak(utterance);
  };

  const handleCardClick = (card: Card) => {
    setSentence((prev) => [...prev, card]);
    speak(card.label);
  };

  const playSentence = () => {
    if (sentence.length === 0) return;
    const fullText = sentence.map(c => c.label).join(" ");
    speak(fullText);
  };

  const clearSentence = () => {
    setSentence([]);
  };

  const removeLast = () => {
    setSentence(prev => prev.slice(0, -1));
  };

  const filteredCards = CARDS.filter(c => c.category === selectedCategory);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col">
      {/* Sentence Builder Bar */}
      <div className="sticky top-0 z-20 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 shadow-sm p-4 h-32 flex items-center gap-4 overflow-x-auto scrollbar-hide">
        <Link 
          href="/"
          className="p-3 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:bg-zinc-200 transition-all shrink-0"
        >
          <ArrowLeft size={24} />
        </Link>
        
        <div className="flex-1 flex items-center gap-2 min-w-[200px] h-full bg-zinc-50 dark:bg-zinc-950 rounded-2xl p-2 border-2 border-dashed border-zinc-200 dark:border-zinc-800">
          <AnimatePresence>
            {sentence.length === 0 && (
              <p className="text-zinc-400 font-bold ml-4 animate-pulse">Konuşmak için kartlara tıkla...</p>
            )}
            {sentence.map((card, idx) => (
              <motion.div
                key={`${card.id}-${idx}`}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                className={cn(
                  "h-full aspect-square rounded-xl flex flex-col items-center justify-center border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm p-1",
                  idx === sentence.length - 1 && "ring-2 ring-blue-500"
                )}
              >
                <span className="text-2xl">{card.emoji}</span>
                <span className="text-[10px] font-black uppercase tracking-tighter truncate w-full text-center">{card.label}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={removeLast}
            disabled={sentence.length === 0}
            className="p-4 rounded-2xl bg-amber-50 text-amber-600 border border-amber-100 hover:bg-amber-100 disabled:opacity-30 disabled:grayscale transition-all"
          >
            <X size={24} />
          </button>
          <button
            onClick={clearSentence}
            disabled={sentence.length === 0}
            className="p-4 rounded-2xl bg-rose-50 text-rose-600 border border-rose-100 hover:bg-rose-100 disabled:opacity-30 disabled:grayscale transition-all"
          >
            <Trash2 size={24} />
          </button>
          <button
            onClick={playSentence}
            disabled={sentence.length === 0 || isSpeaking}
            className={cn(
              "p-4 px-8 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center gap-3 transition-all shadow-lg active:scale-95",
              sentence.length === 0 || isSpeaking
                ? "bg-zinc-200 text-zinc-400 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            )}
          >
            <Volume2 className={cn(isSpeaking && "animate-bounce")} />
            <span>Söyle</span>
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Category Sidebar */}
        <aside className="w-full md:w-24 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 p-2 md:p-4 flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={cn(
                "flex-1 md:flex-none aspect-square rounded-2xl flex flex-col items-center justify-center gap-1 transition-all border-2",
                selectedCategory === cat.id 
                  ? cn(cat.color, "border-current shadow-inner") 
                  : "bg-transparent border-transparent text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"
              )}
            >
              <cat.icon size={24} />
              <span className="text-[10px] font-black uppercase tracking-tighter">{cat.label}</span>
            </button>
          ))}
        </aside>

        {/* Card Grid */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            <AnimatePresence mode="popLayout">
              {filteredCards.map((card) => (
                <motion.button
                  layout
                  key={card.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleCardClick(card)}
                  className={cn(
                    "aspect-square rounded-[2rem] border-2 border-zinc-100 dark:border-zinc-800 flex flex-col items-center justify-center gap-3 transition-all hover:shadow-xl shadow-sm group",
                    card.color
                  )}
                >
                  <div className="text-5xl group-hover:scale-110 transition-transform group-active:rotate-12">{card.emoji}</div>
                  <span className="text-sm font-black text-zinc-900 dark:text-zinc-50 uppercase tracking-widest">{card.label}</span>
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}
