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
  const [playbackSourceLabel, setPlaybackSourceLabel] = useState<string | null>(null);
  const [playbackError, setPlaybackError] = useState<string | null>(null);

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

  const remoteAmbientUrls: Partial<Record<AmbientKind, string>> = {
    ocean: "https://upload.wikimedia.org/wikipedia/commons/transcoded/8/8a/Water_on_Rocks.ogg/Water_on_Rocks.ogg.mp3",
    rain: "https://upload.wikimedia.org/wikipedia/commons/transcoded/c/cb/Heavy_rain_in_Glenshaw%2C_PA.ogg/Heavy_rain_in_Glenshaw%2C_PA.ogg.mp3",
    wind: "https://upload.wikimedia.org/wikipedia/commons/transcoded/6/6c/Gentle_wind_after_shower_accompanied_by_thunders.ogg/Gentle_wind_after_shower_accompanied_by_thunders.ogg.mp3",
    white: "https://upload.wikimedia.org/wikipedia/commons/transcoded/a/aa/White_noise.ogg/White_noise.ogg.mp3",
    pink: "https://upload.wikimedia.org/wikipedia/commons/transcoded/6/6c/Pink_noise.ogg/Pink_noise.ogg.mp3",
    brown: "https://upload.wikimedia.org/wikipedia/commons/transcoded/4/48/Brown_noise.ogg/Brown_noise.ogg.mp3",
  };

  const remoteMelodyUrls: Partial<Record<MelodyKind, string>> = {
    calm: "https://upload.wikimedia.org/wikipedia/commons/transcoded/d/d7/02_-_Breezy_May_Acoustic.ogg/02_-_Breezy_May_Acoustic.ogg.mp3",
    focus:
      "https://upload.wikimedia.org/wikipedia/commons/transcoded/8/89/Axle_-_01_-_A_Mist_On_Hinksey_Stream.ogg/Axle_-_01_-_A_Mist_On_Hinksey_Stream.ogg.mp3",
    happy: "https://upload.wikimedia.org/wikipedia/commons/transcoded/e/e8/Axle_-_02_-_The_Curious_Roe.ogg/Axle_-_02_-_The_Curious_Roe.ogg.mp3",
  };

  const cleanupRef = useRef<(() => void)[]>([]);
  const countdownEndAtMsRef = useRef<number | null>(null);
  const countdownTotalSecondsRef = useRef<number>(0);
  const countdownIndexRef = useRef<number>(0);
  const audioElRef = useRef<HTMLAudioElement | null>(null);

  const nowPlaying = useMemo(() => tracks[selectedIndex] ?? tracks[0], [selectedIndex, tracks]);

  const stopPlayback = () => {
    const fns = cleanupRef.current.splice(0, cleanupRef.current.length);
    for (const fn of fns.reverse()) {
      try {
        fn();
      } catch {}
    }
    setPlaybackSourceLabel(null);
    setPlaybackError(null);
  };

  const startRemoteAudio = async (url: string, opts?: { loop?: boolean }) => {
    if (typeof window === "undefined") return false;
    stopPlayback();
    setPlaybackError(null);

    const audio = new Audio(url);
    audio.preload = "auto";
    audio.loop = opts?.loop ?? true;
    audio.volume = Math.min(1, Math.max(0, volume));
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
      setPlaybackSourceLabel("Kayıt");
      return true;
    } catch {
      setPlaybackError("Kayıt ses açılamadı.");
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

  const startAmbient = async (kind: AmbientKind): Promise<boolean> => {
    const url = remoteAmbientUrls[kind];
    if (!url) {
      setPlaybackError("Bu parça için kayıt ses bulunamadı.");
      return false;
    }
    return await startRemoteAudio(url, { loop: true });
  };

  const startMelody = async (kind: MelodyKind): Promise<boolean> => {
    const url = remoteMelodyUrls[kind];
    if (!url) {
      setPlaybackError("Bu parça için kayıt ses bulunamadı.");
      return false;
    }
    return await startRemoteAudio(url, { loop: true });
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

    const ok = track.mode === "ambient" ? await startAmbient(track.kind) : await startMelody(track.kind);
    if (!ok) {
      setIsPlaying(false);
      return;
    }

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
    const el = audioElRef.current;
    if (el) el.volume = Math.min(1, Math.max(0, volume));
  }, [volume]);

  useEffect(() => {
    return () => {
      stopPlayback();
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
            {playbackSourceLabel && <p className="text-indigo-100 font-black mb-4">Kaynak: {playbackSourceLabel}</p>}
            {playbackError && <p className="text-indigo-100 font-black mb-4">{playbackError}</p>}
            
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
