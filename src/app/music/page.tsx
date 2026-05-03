"use client";
import { ArrowLeft, Music, Play, Pause, Volume2, SkipForward } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

type AmbientKind = "ocean" | "rain" | "wind" | "white" | "pink" | "brown";

type MelodyKind = "calm" | "focus" | "happy";

type AmbientTrack = { title: string; duration: string; category: string; mode: "ambient"; kind: AmbientKind };

type MelodyTrack = { title: string; duration: string; category: string; mode: "melody"; kind: MelodyKind };

type Track = AmbientTrack | MelodyTrack;

const parseDurationSeconds = (value: string) => {
  const [mRaw, sRaw] = value.trim().split(":");
  const minutes = Number(mRaw);
  const seconds = Number(sRaw);
  if (!Number.isFinite(minutes) || !Number.isFinite(seconds)) return 0;
  return Math.max(0, Math.round(minutes * 60 + seconds));
};

const formatSeconds = (totalSeconds: number) => {
  const s = Math.max(0, Math.floor(totalSeconds));
  const mm = Math.floor(s / 60);
  const ss = s % 60;
  return `${mm}:${String(ss).padStart(2, "0")}`;
};

export default function MusicPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [volume, setVolume] = useState(0.35);
  const [playbackTotalSeconds, setPlaybackTotalSeconds] = useState<number | null>(null);
  const [playbackRemainingSeconds, setPlaybackRemainingSeconds] = useState<number | null>(null);
  const [playbackIndex, setPlaybackIndex] = useState<number | null>(null);

  const tracks = useMemo(
    (): Track[] => [
      { title: "Sakinleştirici Melodi", duration: "3:45", category: "Müzik", mode: "melody", kind: "calm" },
      { title: "Odak Ritmi", duration: "5:20", category: "Müzik", mode: "melody", kind: "focus" },
      { title: "Neşeli Çocuk Melodisi", duration: "2:15", category: "Müzik", mode: "melody", kind: "happy" },
      { title: "Deniz Sesi", duration: "10:00", category: "Uyku", mode: "ambient", kind: "ocean" },
      { title: "Yağmur Sesi", duration: "10:00", category: "Sakinleşme", mode: "ambient", kind: "rain" },
      { title: "Rüzgar Sesi", duration: "10:00", category: "Sakinleşme", mode: "ambient", kind: "wind" },
      { title: "Beyaz Gürültü", duration: "10:00", category: "Odak", mode: "ambient", kind: "white" },
      { title: "Pembe Gürültü", duration: "10:00", category: "Odak", mode: "ambient", kind: "pink" },
      { title: "Kahverengi Gürültü", duration: "10:00", category: "Uyku", mode: "ambient", kind: "brown" },
    ],
    []
  );

  const commonsFileUrl = (fileName: string) => `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(fileName)}`;

  const remoteAmbientFiles: Partial<Record<AmbientKind, string>> = {
    ocean: "Water on Rocks.ogg",
    rain: "Heavy rain in Glenshaw, PA.ogg",
    wind: "Gentle wind after shower accompanied by thunders.ogg",
  };

  const remoteMelodyFiles: Partial<Record<MelodyKind, string>> = {
    calm: "02 - Breezy May Acoustic.ogg",
    focus: "Axle - 01 - A Mist On Hinksey Stream.ogg",
    happy: "Axle - 02 - The Curious Roe.ogg",
  };

  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const cleanupRef = useRef<(() => void)[]>([]);
  const countdownEndAtMsRef = useRef<number | null>(null);
  const countdownTotalSecondsRef = useRef<number>(0);
  const countdownIndexRef = useRef<number>(0);
  const audioElRef = useRef<HTMLAudioElement | null>(null);

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
    const fns = cleanupRef.current.splice(0, cleanupRef.current.length);
    for (const fn of fns.reverse()) {
      try {
        fn();
      } catch {}
    }
  };

  const startRemoteAudio = async (fileName: string, opts?: { loop?: boolean }) => {
    if (typeof window === "undefined") return false;
    stopPlayback();

    const url = commonsFileUrl(fileName);
    const audio = new Audio(url);
    audio.preload = "auto";
    audio.loop = opts?.loop ?? true;
    audio.volume = Math.min(1, Math.max(0, volume));
    audio.crossOrigin = "anonymous";
    audioElRef.current = audio;

    cleanupRef.current.push(() => {
      try {
        audio.pause();
      } catch {}
      try {
        audio.src = "";
        audio.load();
      } catch {}
      if (audioElRef.current === audio) audioElRef.current = null;
    });

    try {
      await audio.play();
      return true;
    } catch {
      return false;
    }
  };

  const startCountdown = (idx: number, totalSeconds: number, remainingSeconds: number) => {
    countdownIndexRef.current = idx;
    countdownTotalSecondsRef.current = totalSeconds;
    countdownEndAtMsRef.current = Date.now() + remainingSeconds * 1000;
    setPlaybackTotalSeconds(totalSeconds);
    setPlaybackRemainingSeconds(remainingSeconds);
    setPlaybackIndex(idx);

    const timer = window.setInterval(() => {
      const endAt = countdownEndAtMsRef.current;
      const total = countdownTotalSecondsRef.current;
      if (!endAt || total <= 0) return;

      const remaining = Math.max(0, Math.ceil((endAt - Date.now()) / 1000));
      setPlaybackRemainingSeconds(remaining);

      if (remaining <= 0) {
        stopPlayback();
        setIsPlaying(false);
        setPlaybackRemainingSeconds(total);
        setPlaybackIndex(idx);
        countdownEndAtMsRef.current = null;
      }
    }, 250);

    cleanupRef.current.push(() => window.clearInterval(timer));
  };

  const createNoiseBuffer = (ctx: AudioContext, seconds: number, kind: AmbientKind) => {
    const buffer = ctx.createBuffer(1, ctx.sampleRate * seconds, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    if (kind === "brown") {
      let last = 0;
      for (let i = 0; i < data.length; i += 1) {
        const white = Math.random() * 2 - 1;
        last = (last + 0.02 * white) / 1.02;
        data[i] = last * 3.2;
      }
      return buffer;
    }

    if (kind === "pink") {
      let b0 = 0;
      let b1 = 0;
      let b2 = 0;
      let b3 = 0;
      let b4 = 0;
      let b5 = 0;
      let b6 = 0;
      for (let i = 0; i < data.length; i += 1) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.969 * b2 + white * 0.153852;
        b3 = 0.8665 * b3 + white * 0.3104856;
        b4 = 0.55 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.016898;
        const pink = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
        b6 = white * 0.115926;
        data[i] = pink * 0.15;
      }
      return buffer;
    }

    for (let i = 0; i < data.length; i += 1) data[i] = (Math.random() * 2 - 1) * 0.7;
    return buffer;
  };

  const startAmbient = async (kind: AmbientKind) => {
    const fileName = remoteAmbientFiles[kind];
    if (fileName) {
      const ok = await startRemoteAudio(fileName, { loop: true });
      if (ok) return;
    }

    const ctx = ensureAudio();
    const masterGain = masterGainRef.current;
    if (!ctx || !masterGain) return;
    await ctx.resume();
    stopPlayback();

    const bufferSeconds = 2;
    const buffer = createNoiseBuffer(ctx, bufferSeconds, kind);
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const preGain = ctx.createGain();
    preGain.gain.value = 0.9;

    const filter = ctx.createBiquadFilter();
    filter.Q.value = 0.6;

    const shapeGain = ctx.createGain();
    shapeGain.gain.value = 0.9;

    const lfo = ctx.createOscillator();
    lfo.type = "sine";

    const lfoGain = ctx.createGain();

    if (kind === "ocean") {
      filter.type = "lowpass";
      filter.frequency.value = 900;
      lfo.frequency.value = 0.11;
      lfoGain.gain.value = 520;
      shapeGain.gain.value = 0.9;
    } else if (kind === "rain") {
      filter.type = "highpass";
      filter.frequency.value = 1400;
      lfo.frequency.value = 0.18;
      lfoGain.gain.value = 900;
      shapeGain.gain.value = 0.75;
    } else if (kind === "wind") {
      filter.type = "lowpass";
      filter.frequency.value = 650;
      lfo.frequency.value = 0.06;
      lfoGain.gain.value = 380;
      shapeGain.gain.value = 0.8;
    } else if (kind === "white") {
      filter.type = "lowpass";
      filter.frequency.value = 14000;
      lfo.frequency.value = 0.0;
      lfoGain.gain.value = 0;
      shapeGain.gain.value = 0.55;
    } else if (kind === "pink") {
      filter.type = "lowpass";
      filter.frequency.value = 11000;
      lfo.frequency.value = 0.0;
      lfoGain.gain.value = 0;
      shapeGain.gain.value = 0.7;
    } else {
      filter.type = "lowpass";
      filter.frequency.value = 3000;
      lfo.frequency.value = 0.0;
      lfoGain.gain.value = 0;
      shapeGain.gain.value = 0.75;
    }

    source.connect(preGain);
    preGain.connect(filter);
    filter.connect(shapeGain);
    shapeGain.connect(masterGain);

    lfo.connect(lfoGain);
    if (lfoGain.gain.value > 0) lfoGain.connect(filter.frequency);

    cleanupRef.current.push(() => {
      try {
        source.stop();
      } catch {}
      try {
        source.disconnect();
      } catch {}
    });
    cleanupRef.current.push(() => {
      try {
        lfo.stop();
      } catch {}
      try {
        lfo.disconnect();
      } catch {}
    });
    cleanupRef.current.push(() => {
      try {
        lfoGain.disconnect();
      } catch {}
    });
    cleanupRef.current.push(() => {
      try {
        shapeGain.disconnect();
      } catch {}
    });
    cleanupRef.current.push(() => {
      try {
        filter.disconnect();
      } catch {}
    });
    cleanupRef.current.push(() => {
      try {
        preGain.disconnect();
      } catch {}
    });

    if (lfoGain.gain.value > 0) lfo.start();
    source.start();
  };

  const midiToHz = (midi: number) => 440 * Math.pow(2, (midi - 69) / 12);

  const startMelody = async (kind: MelodyKind) => {
    const fileName = remoteMelodyFiles[kind];
    if (fileName) {
      const ok = await startRemoteAudio(fileName, { loop: true });
      if (ok) return;
    }

    const ctx = ensureAudio();
    const masterGain = masterGainRef.current;
    if (!ctx || !masterGain) return;
    await ctx.resume();
    stopPlayback();

    const cfg: Record<
      MelodyKind,
      {
        bpm: number;
        osc: OscillatorType;
        filterHz: number;
        gain: number;
        steps: Array<number | null>;
      }
    > = {
      calm: {
        bpm: 76,
        osc: "sine",
        filterHz: 2200,
        gain: 0.5,
        steps: [
          60,
          null,
          64,
          null,
          67,
          null,
          64,
          null,
          62,
          null,
          65,
          null,
          69,
          null,
          65,
          null,
        ],
      },
      focus: {
        bpm: 92,
        osc: "triangle",
        filterHz: 1800,
        gain: 0.45,
        steps: [
          57,
          null,
          60,
          null,
          64,
          null,
          60,
          null,
          57,
          null,
          60,
          null,
          65,
          null,
          60,
          null,
        ],
      },
      happy: {
        bpm: 108,
        osc: "triangle",
        filterHz: 2600,
        gain: 0.5,
        steps: [
          60,
          64,
          67,
          null,
          67,
          69,
          71,
          null,
          72,
          71,
          69,
          null,
          67,
          64,
          62,
          null,
        ],
      },
    };

    const { bpm, osc, filterHz, gain, steps } = cfg[kind];
    const stepSeconds = (60 / bpm) / 2;
    let step = 0;

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = filterHz;
    filter.Q.value = 0.7;

    const musicGain = ctx.createGain();
    musicGain.gain.value = gain;

    musicGain.connect(filter);
    filter.connect(masterGain);

    const tick = () => {
      const note = steps[step % steps.length];
      step += 1;
      if (!note) return;

      const t0 = ctx.currentTime + 0.02;
      const dur = stepSeconds * 0.85;

      const oscNode = ctx.createOscillator();
      oscNode.type = osc;
      oscNode.frequency.value = midiToHz(note);

      const env = ctx.createGain();
      env.gain.value = 0;

      oscNode.connect(env);
      env.connect(musicGain);

      env.gain.setValueAtTime(0.0001, t0);
      env.gain.exponentialRampToValueAtTime(0.7, t0 + 0.02);
      env.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);

      oscNode.start(t0);
      oscNode.stop(t0 + dur + 0.02);

      cleanupRef.current.push(() => {
        try {
          oscNode.disconnect();
        } catch {}
        try {
          env.disconnect();
        } catch {}
      });
    };

    tick();
    const timer = window.setInterval(tick, stepSeconds * 1000);

    cleanupRef.current.push(() => window.clearInterval(timer));
    cleanupRef.current.push(() => {
      try {
        filter.disconnect();
      } catch {}
    });
    cleanupRef.current.push(() => {
      try {
        musicGain.disconnect();
      } catch {}
    });
  };

  const startPlayback = async (idx: number, opts?: { resume?: boolean }) => {
    const track = tracks[idx] ?? tracks[0];
    const totalSeconds = parseDurationSeconds(track.duration);
    const remainingSeconds = opts?.resume
      ? Math.min(playbackRemainingSeconds ?? totalSeconds, totalSeconds)
      : totalSeconds;

    setSelectedIndex(idx);
    setIsPlaying(true);
    stopPlayback();

    if (track.mode === "ambient") await startAmbient(track.kind);
    else await startMelody(track.kind);

    if (totalSeconds > 0) startCountdown(idx, totalSeconds, remainingSeconds);
  };

  const togglePlay = async () => {
    if (isPlaying) {
      stopPlayback();
      setIsPlaying(false);
      return;
    }
    await startPlayback(selectedIndex, { resume: true });
  };

  useEffect(() => {
    const gain = masterGainRef.current;
    if (gain) gain.gain.value = volume;
    const el = audioElRef.current;
    if (el) el.volume = Math.min(1, Math.max(0, volume));
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

  const totalSecondsForSelected = useMemo(() => {
    const t = tracks[selectedIndex] ?? tracks[0];
    return parseDurationSeconds(t.duration);
  }, [selectedIndex, tracks]);

  const effectiveRemainingSeconds =
    playbackRemainingSeconds !== null && playbackIndex === selectedIndex
      ? playbackRemainingSeconds
      : totalSecondsForSelected;

  const effectiveTotalSeconds =
    playbackTotalSeconds !== null && playbackIndex === selectedIndex
      ? playbackTotalSeconds
      : totalSecondsForSelected;

  const progressPercent =
    effectiveTotalSeconds > 0 ? Math.min(100, Math.max(0, ((effectiveTotalSeconds - effectiveRemainingSeconds) / effectiveTotalSeconds) * 100)) : 0;

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
              <div className="bg-white h-full rounded-full transition-all" style={{ width: `${progressPercent}%` }} />
            </div>

            <div className="mb-6 text-indigo-100 font-black tabular-nums tracking-widest">
              {formatSeconds(effectiveRemainingSeconds)} / {formatSeconds(effectiveTotalSeconds)}
            </div>
            
            <div className="flex items-center gap-8">
              <button
                onClick={() => startPlayback((selectedIndex - 1 + tracks.length) % tracks.length)}
                className="p-3 hover:bg-white/10 rounded-full transition-colors"
              >
                <span className="flex items-center gap-3 font-black">
                  <SkipForward size={28} className="rotate-180" />
                  <span>Geri</span>
                </span>
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
                <span className="flex items-center gap-3 font-black">
                  <span>İleri</span>
                  <SkipForward size={28} />
                </span>
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
                onClick={() => {
                  if (i === selectedIndex) {
                    if (isPlaying) {
                      stopPlayback();
                      setIsPlaying(false);
                      return;
                    }
                    void startPlayback(i, { resume: true });
                    return;
                  }
                  void startPlayback(i);
                }}
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
                  <span className="text-zinc-400 font-bold tabular-nums">
                    {i === selectedIndex && playbackRemainingSeconds !== null && playbackIndex === i
                      ? formatSeconds(playbackRemainingSeconds)
                      : track.duration}
                  </span>
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
