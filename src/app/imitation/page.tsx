"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Sparkles,
  Volume2,
  Tv,
  Play,
  HelpCircle,
  SkipForward,
  RotateCcw,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// --- Types ---
type ImitationStep = {
  title: string;
  voice: string;
  action: string;
  imageAsset: string;
};

// --- Constants ---
const IMITATION_STEPS: ImitationStep[] = [
  {
    title: "Kolları Kaldır",
    voice: "Kolları kaldır!",
    action: "raiseArms",
    imageAsset: "/assets/imitation_raise_arms.png",
  },
  {
    title: "Kolları Bağla",
    voice: "Kolları bağla!",
    action: "crossArms",
    imageAsset: "/assets/imitation_cross_arms.png",
  },
  {
    title: "Elleri Kaldır",
    voice: "Elleri kaldır!",
    action: "raiseHands",
    imageAsset: "/assets/imitation_raise_hands.png",
  },
  {
    title: "Kulağını Göster",
    voice: "Sağ elinle sağ kulağını göster!",
    action: "showEar",
    imageAsset: "/assets/imitation_show_ear.png",
  },
  {
    title: "Gözlerini Kapat",
    voice: "Gözlerini kapat!",
    action: "closeEyes",
    imageAsset: "/assets/imitation_close_eyes.png",
  },
  {
    title: "Burnunu Göster",
    voice: "Sol elinle burnunu göster!",
    action: "showNose",
    imageAsset: "/assets/imitation_show_nose.png",
  },
  {
    title: "El Çırp",
    voice: "Ellerini hızlıca çırp!",
    action: "clap",
    imageAsset: "/assets/imitation_clap.png",
  },
  {
    title: "Zıpla",
    voice: "Yukarı doğru zıpla!",
    action: "jump",
    imageAsset: "/assets/imitation_jump.png",
  },
];

const IDLE_IMAGE = "/assets/imitation_idle.png";

export default function ImitationPage() {
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(-1);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speak = (text: string) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    try {
      setIsSpeaking(true);
      window.speechSynthesis.cancel();
    } catch {}
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "tr-TR";
    utterance.rate = 0.8;
    utterance.pitch = 1.05;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const nextStep = () => {
    const nextIdx = (currentStepIdx + 1) % IMITATION_STEPS.length;
    setCurrentStepIdx(nextIdx);
    speak(IMITATION_STEPS[nextIdx].voice);
  };

  const prevStep = () => {
    if (currentStepIdx <= 0) {
      setCurrentStepIdx(-1);
      speak("Tekrar hazır mısın? Ekranın herhangi bir yerine dokunarak başla!");
    } else {
      const prevIdx = currentStepIdx - 1;
      setCurrentStepIdx(prevIdx);
      speak(IMITATION_STEPS[prevIdx].voice);
    }
  };

  const resetGame = () => {
    setCurrentStepIdx(-1);
    speak("Hazır mısın? Başlamak için ekrana dokun!");
  };

  const currentStep = currentStepIdx === -1 ? null : IMITATION_STEPS[currentStepIdx];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col font-sans relative overflow-hidden" suppressHydrationWarning>
      {/* Dynamic ambient color glow behind video player */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500 rounded-full blur-[160px] opacity-10 pointer-events-none transition-all duration-700" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500 rounded-full blur-[140px] opacity-10 pointer-events-none" />

      {/* Header */}
      <header className="max-w-6xl mx-auto w-full px-6 pt-10 pb-6 flex items-center gap-5 relative z-10">
        <Link
          href="/"
          className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 shadow-md hover:bg-zinc-100 hover:scale-105 active:scale-95 transition-all"
        >
          <ArrowLeft size={24} />
        </Link>
        <div>
          <h1 className="text-3xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight leading-none flex items-center gap-2">
            Taklit Oyunu <Sparkles className="text-emerald-500 animate-pulse" size={24} />
          </h1>
          <p className="text-zinc-500 font-bold mt-1.5 text-sm uppercase tracking-wide">
            Motor Taklit Becerileri Eğitim Modülü
          </p>
        </div>
      </header>

      {/* Main Area */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-6 pb-12 flex flex-col gap-8 items-center justify-center relative z-10">
        
        {/* Info Banner */}
        <div className="w-full p-5 rounded-[2rem] bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 text-emerald-800 dark:text-emerald-400 font-black text-sm flex items-center gap-4 shadow-sm">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Tv size={24} />
          </div>
          <p className="leading-relaxed">
            Ekrana veya altındaki dev yeşil butona basarak sıradaki taklit hareketine geçebilirsin! Çocuğunun görseldeki hareketi taklit etmesini teşvik et.
          </p>
        </div>

        {/* Command Card */}
        <div className="w-full bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-lg text-center flex flex-col items-center justify-center gap-2 min-h-[120px] transition-all">
          <span className={cn(
            "text-xs font-black uppercase tracking-[0.2em] transition-colors",
            currentStep ? "text-emerald-500" : "text-zinc-400"
          )}>
            {currentStep ? currentStep.title : "OYUNU BAŞLAT"}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-zinc-800 dark:text-zinc-100 tracking-tight leading-snug">
            {currentStep ? currentStep.voice : "Ekrana veya aşağıdaki butona dokunarak başla!"}
          </h2>
        </div>

        {/* Video / Live Action Panel Box */}
        <div 
          onClick={nextStep}
          className="w-full max-w-[340px] aspect-[3/4] bg-black rounded-[2.5rem] border-8 border-zinc-900 dark:border-zinc-800 shadow-2xl relative overflow-hidden group cursor-pointer active:scale-98 transition-transform"
        >
          {/* Main Visual Display */}
          <div className="absolute inset-0 z-0">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentStep ? currentStep.action : "idle"}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                src={currentStep ? currentStep.imageAsset : IDLE_IMAGE}
                alt={currentStep ? currentStep.title : "Idle Child"}
                className="w-full h-full object-cover select-none"
              />
            </AnimatePresence>
          </div>

          {/* Vignette Shadow Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.6)_100%)] pointer-events-none z-10" />

          {/* LIVE Red Badge Overlay */}
          <div className="absolute top-5 left-5 z-20 flex items-center gap-2 bg-red-600 text-white font-black text-[10px] px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-lg shadow-red-500/25 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-white" />
            <span>CANLI PANEL</span>
          </div>

          {/* HD Badge Overlay */}
          <div className="absolute top-5 right-5 z-20 bg-black/60 border border-white/20 text-white font-black text-[9px] px-2.5 py-1.5 rounded-lg uppercase tracking-wide">
            1080p HD
          </div>

          {/* Play/Step Label Banner */}
          <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black via-black/40 to-transparent z-20 flex items-center justify-between text-white select-none">
            <div>
              <span className="text-white/60 font-black text-[10px] tracking-widest uppercase">
                {currentStep ? "Aktif Hareket" : "Durum"}
              </span>
              <p className="font-black text-base mt-0.5">
                {currentStep ? `Taklit: ${currentStep.title}` : "Hazır mısın?"}
              </p>
            </div>
            <div className="p-3 bg-emerald-500 rounded-full text-white shadow-lg flex items-center justify-center group-hover:scale-110 active:scale-90 transition-transform shrink-0">
              <Play size={16} fill="white" />
            </div>
          </div>
        </div>

        {/* Big Action Next Button & Controls */}
        <div className="w-full flex flex-col gap-4">
          <button
            onClick={nextStep}
            className="w-full py-4.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black uppercase tracking-widest text-sm shadow-xl shadow-emerald-500/10 flex items-center justify-center gap-2 active:scale-98 transition-all hover:-translate-y-0.5"
          >
            <SkipForward size={18} />
            <span>SONRAKİ HAREKET</span>
          </button>

          {/* Additional Action Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={prevStep}
              className="py-3.5 rounded-2xl border-2 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 font-black uppercase tracking-wider text-xs flex items-center justify-center gap-2 active:scale-98 transition-all"
            >
              <RotateCcw size={16} className="rotate-180" />
              <span>Geri Gel</span>
            </button>
            <button
              onClick={resetGame}
              className="py-3.5 rounded-2xl border-2 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 font-black uppercase tracking-wider text-xs flex items-center justify-center gap-2 active:scale-98 transition-all"
            >
              <RotateCcw size={16} />
              <span>Sıfırla</span>
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-zinc-200/50 dark:border-zinc-800/50 bg-white/30 dark:bg-zinc-950/30 py-6">
        <div className="max-w-6xl mx-auto px-6 text-center text-zinc-400 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2">
          <span>🔊 Harekete geçildiğinde sesli Türkçe yönlendirme otomatik olarak çalışır.</span>
        </div>
      </footer>
    </div>
  );
}
