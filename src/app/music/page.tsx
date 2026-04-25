"use client";
import { ArrowLeft, Music, Play, Pause, Volume2, SkipForward } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

export default function MusicPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [volume, setVolume] = useState(0.35);

  const tracks = useMemo(
    () => [
      { title: "Sakinleştirici Doğa", duration: "3:45", category: "Ritim", mode: "beep" as const },
      { title: "Odaklanma Müziği", duration: "5:20", category: "Terapi", mode: "beep" as const },
      { title: "Neşeli Çocuk Şarkısı", duration: "2:15", category: "Eğlence", mode: "beep" as const },
      { title: "Deniz Sesi", duration: "10:00", category: "Uyku", mode: "noise" as const },
    ],
    []
  );

  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const noiseSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const lfoRef = useRef<OscillatorNode | null>(null);
  const lfoGainRef = useRef<GainNode | null>(null);
  const tickTimerRef = useRef<number | null>(null);
  const stepRef = useRef(0);

  const nowPlaying = useMemo(() => tracks[selectedIndex] ?? tracks[0], [selectedIndex, tracks]);

  const ensureAudio = () => {
    if (typeof window === "undefined") return null;
    if (!audioCtxRef.current) {
      const ctx = new AudioContext();
      const gain = ctx.createGain();
      gain.gain.value = volume;
      gain.connect(ctx.destination);
      audioCtxRef.current = ctx;
      masterGainRef.current = gain;
    }
    return audioCtxRef.current;
  };

  const stopPlayback = () => {
    if (tickTimerRef.current) {
      window.clearInterval(tickTimerRef.current);
      tickTimerRef.current = null;
    }

    if (noiseSourceRef.current) {
      try {
        noiseSourceRef.current.stop();
      } catch {}
      try {
        noiseSourceRef.current.disconnect();
      } catch {}
      noiseSourceRef.current = null;
    }

    if (lfoRef.current) {
      try {
        lfoRef.current.stop();
      } catch {}
      try {
        lfoRef.current.disconnect();
      } catch {}
      lfoRef.current = null;
    }

    if (lfoGainRef.current) {
      try {
        lfoGainRef.current.disconnect();
      } catch {}
      lfoGainRef.current = null;
    }
  };

  const startNoise = async () => {
    const ctx = ensureAudio();
    const masterGain = masterGainRef.current;
    if (!ctx || !masterGain) return;
    await ctx.resume();
    stopPlayback();

    const bufferSeconds = 2;
    const buffer = ctx.createBuffer(1, ctx.sampleRate * bufferSeconds, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i += 1) data[i] = (Math.random() * 2 - 1) * 0.7;

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 900;
    filter.Q.value = 0.6;

    const lfo = ctx.createOscillator();
    lfo.type = "sine";
    lfo.frequency.value = 0.12;

    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 550;

    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    source.connect(filter);
    filter.connect(masterGain);

    noiseSourceRef.current = source;
    lfoRef.current = lfo;
    lfoGainRef.current = lfoGain;

    lfo.start();
    source.start();
  };

  const startBeeps = async (idx: number) => {
    const ctx = ensureAudio();
    const masterGain = masterGainRef.current;
    if (!ctx || !masterGain) return;
    await ctx.resume();
    stopPlayback();
    stepRef.current = 0;

    const patterns: Record<number, number[]> = {
      0: [261.63, 293.66, 329.63, 293.66, 261.63, 220.0, 246.94, 261.63],
      1: [220.0, 220.0, 246.94, 220.0, 196.0, 220.0, 246.94, 261.63],
      2: [329.63, 392.0, 440.0, 392.0, 349.23, 392.0, 440.0, 523.25],
    };

    const waveform: Record<number, OscillatorType> = {
      0: "sine",
      1: "triangle",
      2: "square",
    };

    const sequence = patterns[idx] ?? patterns[0];
    const oscType = waveform[idx] ?? "sine";

    const tick = () => {
      const i = stepRef.current % sequence.length;
      stepRef.current += 1;
      const freq = sequence[i];

      const osc = ctx.createOscillator();
      osc.type = oscType;
      osc.frequency.value = freq;

      const env = ctx.createGain();
      env.gain.value = 0;

      osc.connect(env);
      env.connect(masterGain);

      const t0 = ctx.currentTime;
      env.gain.setValueAtTime(0, t0);
      env.gain.linearRampToValueAtTime(0.8, t0 + 0.02);
      env.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.18);

      osc.start(t0);
      osc.stop(t0 + 0.2);
    };

    tick();
    tickTimerRef.current = window.setInterval(tick, 430);
  };

  const startPlayback = async (idx: number) => {
    setSelectedIndex(idx);
    setIsPlaying(true);
    const track = tracks[idx] ?? tracks[0];
    if (track.mode === "noise") {
      await startNoise();
    } else {
      await startBeeps(idx);
    }
  };

  const togglePlay = async () => {
    if (isPlaying) {
      stopPlayback();
      setIsPlaying(false);
      return;
    }
    await startPlayback(selectedIndex);
  };

  useEffect(() => {
    const gain = masterGainRef.current;
    if (gain) gain.gain.value = volume;
  }, [volume]);

  useEffect(() => {
    return () => {
      stopPlayback();
      if (audioCtxRef.current) {
        try {
          audioCtxRef.current.close();
        } catch {}
        audioCtxRef.current = null;
        masterGainRef.current = null;
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-6 md:p-12">
      <header className="max-w-3xl mx-auto mb-12 flex items-center gap-6">
        <Link
          href="/"
          className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 shadow-sm hover:bg-zinc-50 transition-all"
        >
          <ArrowLeft size={28} />
        </Link>
        <div>
          <h1 className="text-3xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">Müzik ve Ses</h1>
          <p className="text-zinc-500 font-medium">Ritim ve Ses Çalışmaları</p>
        </div>
      </header>

      <main className="max-w-3xl mx-auto space-y-8">
        {/* Now Playing Card */}
        <section className="bg-indigo-600 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 opacity-10">
            <Music size={240} />
          </div>
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-48 h-48 bg-white/20 rounded-[2rem] flex items-center justify-center mb-8 backdrop-blur-md border border-white/30 shadow-inner group cursor-pointer">
              <Music size={80} className="group-hover:scale-110 transition-transform" />
            </div>
            
            <h2 className="text-2xl font-black mb-2 tracking-tight">{nowPlaying.title}</h2>
            <p className="text-indigo-100 font-bold mb-8">{nowPlaying.category} Çalışması</p>
            
            <div className="w-full bg-white/20 h-2 rounded-full mb-8 overflow-hidden">
              <div className="bg-white h-full w-1/3 rounded-full" />
            </div>
            
            <div className="flex items-center gap-8">
              <button
                onClick={() => startPlayback((selectedIndex - 1 + tracks.length) % tracks.length)}
                className="p-3 hover:bg-white/10 rounded-full transition-colors"
              >
                <SkipForward size={32} className="rotate-180" />
              </button>
              <button 
                onClick={togglePlay}
                className="w-20 h-20 bg-white text-indigo-600 rounded-full flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all"
              >
                {isPlaying ? <Pause size={36} fill="currentColor" /> : <Play size={36} fill="currentColor" className="ml-1" />}
              </button>
              <button
                onClick={() => startPlayback((selectedIndex + 1) % tracks.length)}
                className="p-3 hover:bg-white/10 rounded-full transition-colors"
              >
                <SkipForward size={32} />
              </button>
            </div>
          </div>
        </section>

        {/* Track List */}
        <section className="bg-white dark:bg-zinc-900 p-8 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 shadow-xl">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black flex items-center gap-3">
              <Volume2 className="text-indigo-500" /> Parçalar
            </h3>
          </div>
          
          <div className="space-y-4">
            {tracks.map((track, i) => (
              <button 
                key={i}
                onClick={() => startPlayback(i)}
                className="w-full flex items-center justify-between p-5 rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all group border border-transparent hover:border-zinc-100 dark:hover:border-zinc-700"
              >
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 rounded-xl flex items-center justify-center font-black group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    {i + 1}
                  </div>
                  <div className="text-left">
                    <p className="font-black text-zinc-800 dark:text-zinc-100">{track.title}</p>
                    <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{track.category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-zinc-400 font-bold tabular-nums">{track.duration}</span>
                  {isPlaying && i === selectedIndex ? (
                    <Pause size={20} className="text-indigo-500 transition-colors" />
                  ) : (
                    <Play size={20} className="text-zinc-300 group-hover:text-indigo-500 transition-colors" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="bg-white dark:bg-zinc-900 p-8 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 shadow-xl">
          <div className="flex items-center justify-between gap-6">
            <h3 className="text-xl font-black flex items-center gap-3">
              <Volume2 className="text-indigo-500" /> Ses
            </h3>
            <div className="flex items-center gap-4 w-full max-w-sm">
              <span className="text-xs font-black text-zinc-400 uppercase tracking-widest w-16 text-right">
                {Math.round(volume * 100)}
              </span>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
