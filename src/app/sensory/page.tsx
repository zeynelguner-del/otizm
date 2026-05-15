"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronLeft, 
  Wind, 
  CloudRain, 
  Waves, 
  Music, 
  Settings2, 
  Maximize2, 
  Minimize2, 
  Volume2, 
  VolumeX, 
  Moon, 
  Sun,
  Sparkles,
  Circle
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// --- Types ---
type Theme = {
  id: string;
  name: string;
  colors: string[];
  icon: any;
  ambientId: string;
};

type Bubble = {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
};

// --- Constants ---
const THEMES: Theme[] = [
  { id: "deep-sea", name: "Derin Deniz", colors: ["#0c4a6e", "#075985", "#0369a1"], icon: Waves, ambientId: "ocean" },
  { id: "starlit-night", name: "Yıldızlı Gece", colors: ["#1e1b4b", "#312e81", "#3730a3"], icon: Sparkles, ambientId: "space" },
  { id: "forest-rain", name: "Yağmurlu Orman", colors: ["#064e3b", "#065f46", "#047857"], icon: CloudRain, ambientId: "rain" },
  { id: "warm-sunset", name: "Sıcak Gün Batımı", colors: ["#7c2d12", "#9a3412", "#c2410c"], icon: Sun, ambientId: "warmth" },
];

const SOUNDS: Record<string, string> = {
  ocean: "https://www.soundjay.com/nature/ocean-waves-1.mp3",
  space: "https://www.soundjay.com/communication/control-room-chatter-01.mp3", // Temporary placeholder
  rain: "https://www.soundjay.com/nature/rain-07.mp3",
  warmth: "https://www.soundjay.com/nature/campfire-1.mp3",
};

export default function SensoryRoom() {
  const [activeTheme, setActiveTheme] = useState<Theme>(THEMES[0]);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(0.5);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showBreathing, setShowBreathing] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize bubbles
  useEffect(() => {
    const interval = setInterval(() => {
      if (bubbles.length < 20) {
        addRandomBubble();
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [bubbles]);

  const addRandomBubble = () => {
    const newBubble: Bubble = {
      id: Date.now() + Math.random(),
      x: Math.random() * 100,
      y: 110, // Start below screen
      size: Math.random() * 60 + 20,
      color: activeTheme.colors[Math.floor(Math.random() * activeTheme.colors.length)],
    };
    setBubbles((prev) => [...prev, newBubble]);
  };

  const handleCanvasClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    const newBubble: Bubble = {
      id: Date.now(),
      x,
      y,
      size: Math.random() * 80 + 40,
      color: "#ffffff80", // Click-created bubbles are white-ish
    };
    setBubbles((prev) => [...prev, newBubble]);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white selection:bg-white/20">
      {/* Background Audio */}
      <audio 
        ref={audioRef}
        src={SOUNDS[activeTheme.ambientId]} 
        loop 
        muted={isMuted}
      />
      
      {/* Dynamic Background */}
      <motion.div 
        className="absolute inset-0 z-0 opacity-50"
        animate={{
          background: `radial-gradient(circle at 50% 50%, ${activeTheme.colors[0]} 0%, #000 100%)`
        }}
        transition={{ duration: 2 }}
      />

      {/* Floating Bubbles Layer */}
      <div 
        className="absolute inset-0 z-10 cursor-pointer overflow-hidden"
        onClick={handleCanvasClick}
      >
        <AnimatePresence>
          {bubbles.map((bubble) => (
            <motion.div
              key={bubble.id}
              initial={{ y: "110%", opacity: 0, scale: 0.5 }}
              animate={{ 
                y: "-10%", 
                opacity: [0, 0.4, 0.4, 0],
                x: `${bubble.x + Math.sin(Date.now() / 1000) * 5}%`, // Swaying effect
                scale: 1 
              }}
              exit={{ opacity: 0, scale: 1.5 }}
              transition={{ duration: 15, ease: "linear" }}
              onAnimationComplete={() => {
                setBubbles((prev) => prev.filter((b) => b.id !== bubble.id));
              }}
              className="absolute rounded-full blur-xl pointer-events-none"
              style={{
                left: `${bubble.x}%`,
                width: bubble.size,
                height: bubble.size,
                backgroundColor: bubble.color,
                boxShadow: `0 0 40px ${bubble.color}`,
              }}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Breathing Exercise Overlay */}
      <AnimatePresence>
        {showBreathing && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-sm pointer-events-none"
          >
            <div className="text-center">
              <motion.div
                animate={{
                  scale: [1, 1.8, 1],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 8, // 4s inhale, 4s exhale
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-48 h-48 rounded-full border-4 border-white/30 flex items-center justify-center mb-8"
              >
                <div className="w-4 h-4 bg-white rounded-full shadow-[0_0_20px_white]" />
              </motion.div>
              <motion.p 
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 8, repeat: Infinity, times: [0, 0.5, 1] }}
                className="text-2xl font-light tracking-[0.5em] uppercase"
              >
                Nefes Al ... Nefes Ver
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interface Elements */}
      <header className="relative z-30 p-6 flex items-center justify-between pointer-events-none">
        <Link 
          href="/"
          className="pointer-events-auto p-3 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-xl transition-all border border-white/10 group"
        >
          <ChevronLeft className="group-hover:-translate-x-1 transition-transform" />
        </Link>
        
        <div className="flex items-center gap-3 pointer-events-auto">
          <button
            onClick={() => setShowBreathing(!showBreathing)}
            className={cn(
              "p-3 rounded-2xl backdrop-blur-xl transition-all border border-white/10 flex items-center gap-2",
              showBreathing ? "bg-white text-black" : "bg-white/10 hover:bg-white/20"
            )}
          >
            <Wind size={20} />
            <span className="text-xs font-black uppercase tracking-widest hidden sm:inline">Nefes Rehberi</span>
          </button>
          
          <button
            onClick={toggleFullscreen}
            className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-xl transition-all border border-white/10"
          >
            {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
          </button>
        </div>
      </header>

      {/* Sidebar Settings Drawer */}
      <aside className="absolute right-6 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-4">
        {THEMES.map((theme) => {
          const Icon = theme.icon;
          return (
            <button
              key={theme.id}
              onClick={() => setActiveTheme(theme)}
              className={cn(
                "p-4 rounded-3xl backdrop-blur-xl transition-all border flex items-center justify-center group relative",
                activeTheme.id === theme.id 
                  ? "bg-white border-white text-black scale-110 shadow-[0_0_30px_rgba(255,255,255,0.3)]" 
                  : "bg-white/5 border-white/10 hover:bg-white/10 text-white"
              )}
            >
              <Icon size={24} />
              <span className="absolute right-full mr-4 px-3 py-1 rounded-lg bg-black/80 text-white text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {theme.name}
              </span>
            </button>
          );
        })}
      </aside>

      {/* Footer Controls */}
      <footer className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 w-full max-w-md px-6">
        <div className="bg-black/40 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-4 flex items-center gap-6">
          <button
            onClick={() => {
              setIsMuted(!isMuted);
              if (audioRef.current) {
                if (isMuted) audioRef.current.play().catch(() => {});
                else audioRef.current.pause();
              }
            }}
            className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 transition-all"
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
          
          <div className="flex-1 flex flex-col gap-2">
            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white/40">
              <span>Ses Seviyesi</span>
              <span>{Math.round(volume * 100)}%</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.01"
              value={volume}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                setVolume(val);
                if (audioRef.current) audioRef.current.volume = val;
              }}
              className="w-full h-1 bg-white/20 rounded-full appearance-none cursor-pointer accent-white"
            />
          </div>
          
          <div className="p-3">
             <motion.div
               animate={{ rotate: 360 }}
               transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
               className="text-white/20"
             >
               <Sparkles size={20} />
             </motion.div>
          </div>
        </div>
      </footer>

      {/* Overlay for first-time interaction (Browsers block auto-audio) */}
      {isMuted && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        >
          <button
            onClick={() => {
              setIsMuted(false);
              if (audioRef.current) audioRef.current.play().catch(() => {});
            }}
            className="group flex flex-col items-center gap-6"
          >
            <div className="w-24 h-24 rounded-full bg-white text-black flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.4)] group-hover:scale-110 transition-transform">
              <Music size={40} />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-black uppercase tracking-[0.3em] mb-2">Duyusal Oda'ya Giriş</h3>
              <p className="text-white/60 font-bold">Sesli deneyim için tıklayın</p>
            </div>
          </button>
        </motion.div>
      )}
    </div>
  );
}
