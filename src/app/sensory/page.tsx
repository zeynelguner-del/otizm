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

// --- Procedural Sound Engine ---
function useSoundEngine(themeId: string, isMuted: boolean, volume: number, hasEntered: boolean) {
  const ctxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const noiseSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    if (!hasEntered) return;
    
    window.alert("SES MOTORU TETİKLENDİ - Tema: " + themeId);
    console.log("SoundEngine: Activating...", { themeId, isMuted, volume });

    if (!ctxRef.current) {
      try {
        const AudioContextClass = (window as any).AudioContext || (window as any).webkitAudioContext;
        if (!AudioContextClass) {
          console.error("SoundEngine: AudioContext not supported");
          return;
        }
        ctxRef.current = new AudioContextClass();
        gainNodeRef.current = ctxRef.current.createGain();
        gainNodeRef.current.connect(ctxRef.current.destination);
        console.log("SoundEngine: Context created");
      } catch (err) {
        console.error("SoundEngine: Error creating context", err);
        return;
      }
    }
    
    const ctx = ctxRef.current!;
    const masterGain = gainNodeRef.current!;
    
    // Force full volume for testing
    masterGain.gain.value = 1.0;
    
    if (isMuted) {
      console.log("SoundEngine: Muted but forcing audio for test");
    }

    const cleanup = () => {
      console.log("SoundEngine: Cleaning up previous nodes");
      oscillatorsRef.current.forEach(o => { try { o.stop(); o.disconnect(); } catch {} });
      oscillatorsRef.current = [];
      if (noiseSourceRef.current) { try { noiseSourceRef.current.stop(); noiseSourceRef.current.disconnect(); } catch {} noiseSourceRef.current = null; }
      cancelAnimationFrame(animationRef.current);
    };
    cleanup();
    
    if (ctx.state === 'suspended') {
      ctx.resume().then(() => console.log("SoundEngine: Context resumed")).catch(err => console.error("SoundEngine: Resume failed", err));
    }

    const createNoiseBuffer = (type: 'pink' | 'brown') => {
      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = buffer.getChannelData(0);
      let b0=0, b1=0, b2=0, b3=0, b4=0, b5=0, b6=0;
      for (let i = 0; i < bufferSize; i++) {
        let white = Math.random() * 2 - 1;
        if (type === 'brown') {
          b0 = (b0 + (0.02 * white)) / 1.02;
          output[i] = b0 * 3.5;
        } else {
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.0168980;
          output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
          b6 = white * 0.115926;
        }
      }
      return buffer;
    };

    console.log(`SoundEngine: Starting theme ${themeId}`);

    if (themeId === 'deep-sea') {
      const noise = ctx.createBufferSource();
      noise.buffer = createNoiseBuffer('pink');
      noise.loop = true;
      noiseSourceRef.current = noise;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 200;

      const lfo = ctx.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.value = 0.1;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 150;
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);
      
      const waveVol = ctx.createGain();
      waveVol.gain.value = 0.5;
      const volLfo = ctx.createOscillator();
      volLfo.type = 'sine';
      volLfo.frequency.value = 0.1;
      const volLfoGain = ctx.createGain();
      volLfoGain.gain.value = 0.4;
      volLfo.connect(volLfoGain);
      volLfoGain.connect(waveVol.gain);

      noise.connect(filter);
      filter.connect(waveVol);
      waveVol.connect(masterGain);

      noise.start(); lfo.start(); volLfo.start();
      oscillatorsRef.current.push(lfo, volLfo);
    } else if (themeId === 'forest-rain') {
      const noise = ctx.createBufferSource();
      noise.buffer = createNoiseBuffer('pink');
      noise.loop = true;
      noiseSourceRef.current = noise;

      const filter = ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.value = 400;

      const flutterGain = ctx.createGain();
      flutterGain.gain.value = 0.5;
      const updateFlutter = () => {
        flutterGain.gain.setTargetAtTime(0.4 + Math.random() * 0.2, ctx.currentTime, 0.1);
        animationRef.current = requestAnimationFrame(updateFlutter);
      };
      updateFlutter();

      noise.connect(filter);
      filter.connect(flutterGain);
      flutterGain.connect(masterGain);
      noise.start();
    } else if (themeId === 'warm-sunset') {
      const noise = ctx.createBufferSource();
      noise.buffer = createNoiseBuffer('brown');
      noise.loop = true;
      noiseSourceRef.current = noise;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 400;

      const crackleGain = ctx.createGain();
      crackleGain.gain.value = 0.8;
      const updateCrackle = () => {
        if (Math.random() > 0.92) {
          crackleGain.gain.setTargetAtTime(1.2 + Math.random() * 0.5, ctx.currentTime, 0.01);
          crackleGain.gain.setTargetAtTime(0.8, ctx.currentTime + 0.05, 0.1);
        }
        animationRef.current = requestAnimationFrame(updateCrackle);
      };
      updateCrackle();

      noise.connect(filter);
      filter.connect(crackleGain);
      crackleGain.connect(masterGain);
      noise.start();
    } else if (themeId === 'starlit-night') {
      const freqs = [110, 165, 220, 275];
      freqs.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        osc.type = i % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.value = freq;
        
        const oscGain = ctx.createGain();
        oscGain.gain.value = 0.1;
        
        const lfo = ctx.createOscillator();
        lfo.type = 'sine';
        lfo.frequency.value = 0.05 + (Math.random() * 0.05);
        const lfoGain = ctx.createGain();
        lfoGain.gain.value = 0.08;
        
        lfo.connect(lfoGain);
        lfoGain.connect(oscGain.gain);
        osc.connect(oscGain);
        oscGain.connect(masterGain);
        
        osc.start(); lfo.start();
        oscillatorsRef.current.push(osc, lfo);
      });
    }

    return cleanup;
  }, [themeId, isMuted, volume, hasEntered]);
}

export default function SensoryRoom() {
  const [activeTheme, setActiveTheme] = useState<Theme>(THEMES[0]);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(0.5);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showBreathing, setShowBreathing] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  useSoundEngine(activeTheme.id, isMuted, volume, hasEntered);

  if (!mounted) return <div className="min-h-screen bg-black" />;

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
            onClick={() => setIsMuted(!isMuted)}
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
              onChange={(e) => setVolume(parseFloat(e.target.value))}
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
      {!hasEntered && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        >
          <button
            onClick={() => {
              console.log("SensoryRoom: Entry button clicked");
              // Wake up AudioContext on user gesture
              const AudioContextClass = (window as any).AudioContext || (window as any).webkitAudioContext;
              if (AudioContextClass) {
                const tempCtx = new AudioContextClass();
                tempCtx.resume().then(() => {
                  console.log("SensoryRoom: Initial context check OK");
                  tempCtx.close();
                });
              }
              setHasEntered(true);
              setIsMuted(false);
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
