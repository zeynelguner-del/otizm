"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles, Volume2, VolumeX, Moon, Sun, Timer, Waves, CloudRain, Wind, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type SoundKind = "rain" | "waves" | "wind" | "calm-piano";

type ColorTheme = {
  id: string;
  name: string;
  gradient: string;
  textColor: string;
  accentColor: string;
};

export default function SensoryRoomPage() {
  const [activeSound, setActiveSound] = useState<SoundKind | null>(null);
  const [volume, setVolume] = useState(0.4);
  const [selectedTheme, setSelectedTheme] = useState<string>("indigo-night");
  const [timerMinutes, setTimerMinutes] = useState<number | null>(null);
  const [remainingSeconds, setRemainingSeconds] = useState<number | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [showTimerModal, setShowTimerModal] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const soundUrls: Record<SoundKind, { title: string; url: string; icon: any }> = {
    "calm-piano": {
      title: "Sakin Melodi",
      url: "https://upload.wikimedia.org/wikipedia/commons/9/95/Scott_Buckley_%E2%80%93_The_Long_Dark_%28Ambient_Neoclassical_Piano%29.ogg",
      icon: Sparkles,
    },
    waves: {
      title: "Deniz & Dalga",
      url: "https://upload.wikimedia.org/wikipedia/commons/1/1f/Waves.ogg",
      icon: Waves,
    },
    rain: {
      title: "Hafif Yağmur",
      url: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Rain.ogg",
      icon: CloudRain,
    },
    wind: {
      title: "Rüzgar Esintisi",
      url: "https://upload.wikimedia.org/wikipedia/commons/f/f3/Wind_in_Swedish_pine_forest_at_25_mps.ogg",
      icon: Wind,
    },
  };

  const themes: ColorTheme[] = [
    {
      id: "indigo-night",
      name: "Sakin Gece",
      gradient: "from-zinc-950 via-slate-900 to-indigo-950",
      textColor: "text-indigo-200",
      accentColor: "bg-indigo-500 hover:bg-indigo-600 text-white shadow-indigo-500/20",
    },
    {
      id: "emerald-forest",
      name: "Huzurlu Orman",
      gradient: "from-zinc-950 via-emerald-950 to-teal-950",
      textColor: "text-emerald-200",
      accentColor: "bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/20",
    },
    {
      id: "sunset-glow",
      name: "Sıcak Günbatımı",
      gradient: "from-zinc-950 via-rose-950 to-amber-950",
      textColor: "text-rose-200",
      accentColor: "bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/20",
    },
    {
      id: "ocean-breeze",
      name: "Deniz Esintisi",
      gradient: "from-zinc-950 via-cyan-950 to-sky-950",
      textColor: "text-cyan-200",
      accentColor: "bg-cyan-500 hover:bg-cyan-600 text-white shadow-cyan-500/20",
    },
    {
      id: "soft-pink",
      name: "Yumuşak Pembe",
      gradient: "from-zinc-950 via-fuchsia-950 to-rose-950",
      textColor: "text-pink-200",
      accentColor: "bg-pink-500 hover:bg-pink-600 text-white shadow-pink-500/20",
    },
  ];

  const currentTheme = themes.find((t) => t.id === selectedTheme) || themes[0];

  // Play audio when activeSound changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
      audioRef.current = null;
    }

    if (activeSound) {
      const audio = new Audio(soundUrls[activeSound].url);
      audio.loop = true;
      audio.preload = "auto";
      audio.volume = isMuted ? 0 : volume;
      audioRef.current = audio;

      audio.play().catch(() => {
        setActiveSound(null);
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [activeSound]);

  // Adjust volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Countdown timer logic
  useEffect(() => {
    if (remainingSeconds === null) return;
    if (remainingSeconds <= 0) {
      setActiveSound(null);
      setTimerMinutes(null);
      setRemainingSeconds(null);
      return;
    }

    const timer = setInterval(() => {
      setRemainingSeconds((prev) => (prev !== null ? prev - 1 : null));
    }, 1000);

    return () => clearInterval(timer);
  }, [remainingSeconds]);

  const handleStartTimer = (mins: number) => {
    setTimerMinutes(mins);
    setRemainingSeconds(mins * 60);
    setShowTimerModal(false);
  };

  const handleStopTimer = () => {
    setTimerMinutes(null);
    setRemainingSeconds(null);
  };

  const formatTime = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins}:${String(secs).padStart(2, "0")}`;
  };

  // Generate floating bubbles for visual stimulation
  const [bubbles, setBubbles] = useState<Array<{ id: number; size: number; left: number; delay: number; duration: number }>>([]);
  useEffect(() => {
    const newBubbles = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      size: Math.random() * 60 + 20,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 10,
    }));
    setBubbles(newBubbles);
  }, [selectedTheme]);

  return (
    <div className={`min-h-screen bg-gradient-to-b ${currentTheme.gradient} text-white p-6 md:p-12 relative overflow-hidden transition-all duration-1000 select-none`}>
      {/* Floating Bubbles Visual Stimulation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {bubbles.map((b) => (
          <motion.div
            key={b.id}
            initial={{ y: "110vh", opacity: 0 }}
            animate={{
              y: "-20vh",
              opacity: [0, 0.4, 0.4, 0],
            }}
            transition={{
              duration: b.duration,
              repeat: Infinity,
              delay: b.delay,
              ease: "linear",
            }}
            style={{
              position: "absolute",
              left: `${b.left}%`,
              width: `${b.size}px`,
              height: `${b.size}px`,
            }}
            className="rounded-full bg-white/5 border border-white/10 backdrop-blur-[2px]"
          />
        ))}
      </div>

      <header className="max-w-4xl mx-auto mb-10 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            onClick={() => {
              if (audioRef.current) audioRef.current.pause();
            }}
            className="p-4 rounded-2xl bg-white/5 border border-white/10 text-zinc-300 shadow-lg hover:bg-white/10 transition-all backdrop-blur-md"
          >
            <ArrowLeft size={24} />
          </Link>
          <div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight flex items-center gap-2.5">
              <Sparkles className="text-pink-400" /> Duyusal Oda
            </h1>
            <p className="text-zinc-400 text-sm font-medium mt-0.5">Sakinleştirici Ses ve Renk Terapisi Alanı</p>
          </div>
        </div>

        {/* Timer Control */}
        <div className="flex items-center gap-3">
          {remainingSeconds !== null ? (
            <button
              onClick={handleStopTimer}
              className="px-4 py-2.5 rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-300 font-bold text-xs flex items-center gap-2 hover:bg-rose-500/30 transition-all backdrop-blur-md"
            >
              <Timer size={14} className="animate-spin-slow" /> {formatTime(remainingSeconds)} (Kapat)
            </button>
          ) : (
            <button
              onClick={() => setShowTimerModal(true)}
              className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-zinc-300 font-bold text-xs flex items-center gap-2 hover:bg-white/10 transition-all backdrop-blur-md"
            >
              <Timer size={14} /> Süre Ayarla
            </button>
          )}
        </div>
      </header>

      <main className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
        {/* Left: Color Therapy Themes */}
        <section className="lg:col-span-1 bg-white/5 border border-white/10 rounded-[2rem] p-6 backdrop-blur-md flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-black tracking-tight mb-4 flex items-center gap-2">
              <Sun size={18} className="text-amber-400" /> Renk Terapisi
            </h3>
            <p className="text-zinc-400 text-xs font-medium leading-relaxed mb-6">
              Arka plan rengini çocuğunuzun o anki ruh haline en uygun ve onu en çok dinlendiren tonla değiştirebilirsiniz.
            </p>
            <div className="space-y-3">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTheme(t.id)}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all text-left ${
                    selectedTheme === t.id
                      ? "bg-white/15 border-white text-white font-black scale-[1.02]"
                      : "bg-white/5 border-transparent hover:bg-white/10 text-zinc-400"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-4 h-4 rounded-full bg-gradient-to-r ${t.gradient} border border-white/20`} />
                    <span className="text-sm font-bold">{t.name}</span>
                  </div>
                  {selectedTheme === t.id && <Sparkles size={14} className="text-pink-400" />}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Center/Right: Calming Sound Generator */}
        <section className="lg:col-span-2 space-y-8">
          <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 backdrop-blur-md">
            <h3 className="text-lg font-black tracking-tight mb-4 flex items-center gap-2">
              <Moon size={18} className="text-sky-300" /> Dinlendirici Sesler
            </h3>
            <p className="text-zinc-400 text-xs font-medium leading-relaxed mb-8">
              Arka planda döngüsel olarak çalacak doğal sesleri seçin. Beyaz, pembe veya sakinleştirici piyano sesleri odaklanmayı ve gevşemeyi destekler.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {(Object.keys(soundUrls) as SoundKind[]).map((kind) => {
                const s = soundUrls[kind];
                const Icon = s.icon;
                const isActive = activeSound === kind;

                return (
                  <button
                    key={kind}
                    onClick={() => setActiveSound(isActive ? null : kind)}
                    className={`p-6 rounded-[2rem] border transition-all flex flex-col items-center justify-center text-center gap-3 active:scale-95 ${
                      isActive
                        ? `${currentTheme.textColor} bg-white/15 border-white scale-[1.03] shadow-lg`
                        : "bg-white/5 border-transparent hover:bg-white/10 text-zinc-400"
                    }`}
                  >
                    <div className={`p-4 rounded-2xl ${isActive ? "bg-white/20 text-white" : "bg-white/5 text-zinc-400"} transition-all`}>
                      <Icon size={32} className={isActive ? "animate-pulse" : ""} />
                    </div>
                    <span className="text-sm font-black">{s.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Volume Control Card */}
          <div className="bg-white/5 border border-white/10 rounded-[2rem] p-6 backdrop-blur-md flex items-center justify-between gap-6">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 text-zinc-300 transition-all border border-white/10"
            >
              {isMuted ? <VolumeX size={20} className="text-rose-400" /> : <Volume2 size={20} />}
            </button>
            <div className="flex-1 flex items-center gap-4">
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                disabled={isMuted}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white disabled:opacity-40"
              />
              <span className="text-xs font-black text-zinc-400 w-8 text-right">
                {isMuted ? 0 : Math.round(volume * 100)}
              </span>
            </div>
          </div>
        </section>
      </main>

      {/* Timer Modal */}
      <AnimatePresence>
        {showTimerModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-zinc-950/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-zinc-900 border border-white/10 w-full max-w-sm rounded-[2.5rem] p-8 shadow-2xl relative"
            >
              <h3 className="text-xl font-black mb-2 tracking-tight text-white flex items-center gap-2">
                <Timer className="text-pink-400" /> Süre Ayarla
              </h3>
              <p className="text-zinc-400 text-xs font-medium leading-relaxed mb-6">
                Belirtilen süre bittiğinde çalan tüm sesler otomatik olarak duracaktır.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {[5, 10, 15, 20, 30, 45].map((m) => (
                  <button
                    key={m}
                    onClick={() => handleStartTimer(m)}
                    className="py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-bold border border-white/5 hover:border-white/10 transition-all text-sm"
                  >
                    {m} Dakika
                  </button>
                ))}
              </div>

              <button
                onClick={() => setShowTimerModal(false)}
                className="w-full py-4 bg-zinc-800 text-zinc-300 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-zinc-700 transition-all border border-white/5"
              >
                İptal Et
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
