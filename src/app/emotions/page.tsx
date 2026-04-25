"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";

type SpeechSettings = {
  voiceURI: string | null;
  rate: number;
  pitch: number;
  volume: number;
};

type EmotionLogEntry = {
  id: string;
  at: string;
  emotion: string;
  intensity: number;
  triggers: string[];
  antecedent: string;
  behavior: string;
  consequence: string;
  note: string;
  whatHelped: string[];
};

const SPEECH_SETTINGS_KEY = "speechSettingsV1";
const EMOTION_LOG_KEY = "emotionLogV1";

const readJson = <T,>(key: string, fallback: T): T => {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
};

const writeJson = (key: string, value: unknown) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
};

export default function EmotionsPage() {
  const emotions = [
    { name: "Mutlu", emoji: "😊", color: "bg-yellow-100 text-yellow-700 border-yellow-200 hover:bg-yellow-200" },
    { name: "Üzgün", emoji: "😢", color: "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200" },
    { name: "Kızgın", emoji: "😠", color: "bg-red-100 text-red-700 border-red-200 hover:bg-red-200" },
    { name: "Şaşırmış", emoji: "😲", color: "bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200" },
    { name: "Korkmuş", emoji: "😨", color: "bg-zinc-100 text-zinc-700 border-zinc-200 hover:bg-zinc-200" },
    { name: "Heyecanlı", emoji: "🤩", color: "bg-orange-100 text-orange-700 border-orange-200 hover:bg-orange-200" },
  ];

  const [selectedEmotionName, setSelectedEmotionName] = useState<string | null>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [speechSettings] = useState<SpeechSettings>(() =>
    readJson<SpeechSettings>(SPEECH_SETTINGS_KEY, { voiceURI: null, rate: 1, pitch: 1, volume: 1 })
  );

  const [log, setLog] = useState<EmotionLogEntry[]>(() => readJson<EmotionLogEntry[]>(EMOTION_LOG_KEY, []));
  const [intensity, setIntensity] = useState(3);
  const [selectedTriggers, setSelectedTriggers] = useState<string[]>([]);
  const [antecedent, setAntecedent] = useState("");
  const [behavior, setBehavior] = useState("");
  const [consequence, setConsequence] = useState("");
  const [note, setNote] = useState("");
  const [selectedHelps, setSelectedHelps] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("speechSynthesis" in window)) return;
    const loadVoices = () => setVoices(window.speechSynthesis.getVoices());
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const speak = (text: string) => {
    if (!("speechSynthesis" in window)) return;
    try {
      window.speechSynthesis.cancel();
    } catch {}
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "tr-TR";
    utterance.rate = speechSettings.rate;
    utterance.pitch = speechSettings.pitch;
    utterance.volume = speechSettings.volume;
    if (speechSettings.voiceURI) {
      const voice = voices.find((v) => v.voiceURI === speechSettings.voiceURI);
      if (voice) utterance.voice = voice;
    }
    window.speechSynthesis.speak(utterance);
  };

  const triggerOptions = [
    "Gürültü",
    "Kalabalık",
    "Değişiklik",
    "Beklemek",
    "Yorgunluk",
    "Açlık",
    "Işık",
    "Dokunma",
    "Ekran",
    "Ayrılma",
  ];

  const helpOptions = ["Derin Nefes", "Ara Vermek", "Sarılma", "Kulaklık", "Su İçmek", "Sakin Köşe", "Müzik", "Top Sıkma"];

  const toggleChip = (value: string, list: string[], setList: (v: string[]) => void) => {
    setList(list.includes(value) ? list.filter((x) => x !== value) : [value, ...list]);
  };

  const saveEntry = () => {
    if (!selectedEmotionName) return;
    const entry: EmotionLogEntry = {
      id: `e-${Math.floor(Date.now() / 1000)}-${Math.random().toString(16).slice(2)}`,
      at: new Date().toISOString(),
      emotion: selectedEmotionName,
      intensity,
      triggers: selectedTriggers,
      antecedent,
      behavior,
      consequence,
      note,
      whatHelped: selectedHelps,
    };
    setLog((prev) => {
      const next = [entry, ...prev].slice(0, 200);
      writeJson(EMOTION_LOG_KEY, next);
      return next;
    });
    setSelectedTriggers([]);
    setSelectedHelps([]);
    setAntecedent("");
    setBehavior("");
    setConsequence("");
    setNote("");
    setIntensity(3);
  };

  const weeklySummary = useMemo(() => {
    const ref = log[0] ? Date.parse(log[0].at) : null;
    if (!ref || Number.isNaN(ref)) return [];
    const weekAgo = ref - 7 * 24 * 60 * 60 * 1000;
    const counts = new Map<string, number>();
    for (const e of log) {
      const t = Date.parse(e.at);
      if (Number.isNaN(t) || t < weekAgo || t > ref) continue;
      counts.set(e.emotion, (counts.get(e.emotion) ?? 0) + 1);
    }
    const rows = Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
    return rows;
  }, [log]);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-6 md:p-12">
      <header className="max-w-4xl mx-auto mb-12 flex items-center gap-6">
        <Link
          href="/"
          className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 shadow-sm hover:bg-zinc-50 transition-all"
        >
          <ArrowLeft size={28} />
        </Link>
        <div>
          <h1 className="text-3xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">Duygularım</h1>
          <p className="text-zinc-500 font-medium">Nasıl Hissettiğini Keşfet</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {emotions.map((emotion) => (
            <button
              key={emotion.name}
              onClick={() => {
                setSelectedEmotionName(emotion.name);
                speak(emotion.name);
              }}
              className={cn(
                "group p-10 rounded-[2.5rem] border-2 transition-all active:scale-95 flex flex-col items-center gap-6 shadow-sm hover:shadow-xl",
                emotion.color,
                selectedEmotionName === emotion.name && "ring-4 ring-zinc-900/10 dark:ring-zinc-50/10"
              )}
            >
              <span className="text-7xl group-hover:scale-125 transition-transform duration-300 group-hover:rotate-6">
                {emotion.emoji}
              </span>
              <span className="text-2xl font-black tracking-tight">{emotion.name}</span>
            </button>
          ))}
        </div>

        <section className="mt-10 bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-xl space-y-6">
          <div className="flex items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">Duygu Günlüğü</h2>
              <p className="text-zinc-500 font-bold text-sm">Duygu seç ve kısa kayıt ekle.</p>
            </div>
            <button
              type="button"
              onClick={() => speak("Sakinleşmek için önce derin nefes al. Dörde kadar say. Sonra yavaşça ver. İstersen ara verebilirsin.")}
              className="px-6 py-4 rounded-2xl bg-emerald-500 text-white font-black uppercase tracking-widest text-xs transition-all active:scale-95"
            >
              Sakinleşme
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="text-xs font-black text-zinc-400 uppercase tracking-widest">Seçilen Duygu</div>
              <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border-2 border-zinc-100 dark:border-zinc-800 font-black text-xl text-zinc-900 dark:text-zinc-50">
                {selectedEmotionName ?? "Henüz seçilmedi"}
              </div>
            </div>
            <div className="space-y-3">
              <div className="text-xs font-black text-zinc-400 uppercase tracking-widest">Şiddet</div>
              <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={intensity}
                onChange={(e) => setIntensity(Number(e.target.value))}
                className="w-full"
                disabled={!selectedEmotionName}
              />
              <div className="font-black text-zinc-700 dark:text-zinc-200">Seviye: {intensity}/5</div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-xs font-black text-zinc-400 uppercase tracking-widest">Tetikleyiciler</div>
            <div className="flex flex-wrap gap-2">
              {triggerOptions.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => toggleChip(t, selectedTriggers, setSelectedTriggers)}
                  disabled={!selectedEmotionName}
                  className={cn(
                    "px-5 py-3 rounded-2xl border-2 font-black transition-all active:scale-95",
                    selectedTriggers.includes(t)
                      ? "bg-amber-50 border-amber-200 text-amber-700"
                      : "bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 text-zinc-700 dark:text-zinc-200",
                    !selectedEmotionName && "opacity-60 cursor-not-allowed"
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-xs font-black text-zinc-400 uppercase tracking-widest">Ne iyi geldi?</div>
            <div className="flex flex-wrap gap-2">
              {helpOptions.map((h) => (
                <button
                  key={h}
                  type="button"
                  onClick={() => toggleChip(h, selectedHelps, setSelectedHelps)}
                  disabled={!selectedEmotionName}
                  className={cn(
                    "px-5 py-3 rounded-2xl border-2 font-black transition-all active:scale-95",
                    selectedHelps.includes(h)
                      ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                      : "bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 text-zinc-700 dark:text-zinc-200",
                    !selectedEmotionName && "opacity-60 cursor-not-allowed"
                  )}
                >
                  {h}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-xs font-black text-zinc-400 uppercase tracking-widest">Not</div>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full min-h-[110px] p-4 rounded-2xl border-2 border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 font-bold focus:border-zinc-900 transition-all outline-none"
              placeholder="Kısa not..."
              disabled={!selectedEmotionName}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-3">
              <div className="text-xs font-black text-zinc-400 uppercase tracking-widest">A - Öncesi</div>
              <textarea
                value={antecedent}
                onChange={(e) => setAntecedent(e.target.value)}
                className="w-full min-h-[96px] p-4 rounded-2xl border-2 border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 font-bold focus:border-zinc-900 transition-all outline-none"
                placeholder="Öncesinde ne oldu?"
                disabled={!selectedEmotionName}
              />
            </div>
            <div className="space-y-3">
              <div className="text-xs font-black text-zinc-400 uppercase tracking-widest">B - Davranış</div>
              <textarea
                value={behavior}
                onChange={(e) => setBehavior(e.target.value)}
                className="w-full min-h-[96px] p-4 rounded-2xl border-2 border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 font-bold focus:border-zinc-900 transition-all outline-none"
                placeholder="Ne yaptı?"
                disabled={!selectedEmotionName}
              />
            </div>
            <div className="space-y-3">
              <div className="text-xs font-black text-zinc-400 uppercase tracking-widest">C - Sonuç</div>
              <textarea
                value={consequence}
                onChange={(e) => setConsequence(e.target.value)}
                className="w-full min-h-[96px] p-4 rounded-2xl border-2 border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 font-bold focus:border-zinc-900 transition-all outline-none"
                placeholder="Sonrasında ne oldu?"
                disabled={!selectedEmotionName}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={saveEntry}
              disabled={!selectedEmotionName}
              className={cn(
                "px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all active:scale-95",
                selectedEmotionName ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900" : "bg-zinc-200 text-zinc-500 cursor-not-allowed"
              )}
            >
              Kaydet
            </button>
            <button
              type="button"
              onClick={() => selectedEmotionName && speak(`${selectedEmotionName}. Seviye ${intensity}.`)}
              disabled={!selectedEmotionName}
              className={cn(
                "px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all active:scale-95",
                selectedEmotionName ? "bg-amber-100 text-amber-800 border-2 border-amber-200" : "bg-zinc-200 text-zinc-500 cursor-not-allowed"
              )}
            >
              Tekrar Söyle
            </button>
          </div>
        </section>

        <section className="mt-10 bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-xl space-y-6">
          <h2 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">Son 7 Gün Özeti</h2>
          {weeklySummary.length === 0 ? (
            <div className="text-zinc-500 font-bold">Henüz kayıt yok.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {weeklySummary.map(([emotion, count]) => (
                <div key={emotion} className="p-5 rounded-2xl border-2 border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950">
                  <div className="font-black text-zinc-900 dark:text-zinc-50">{emotion}</div>
                  <div className="font-bold text-zinc-500">{count} kez</div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="mt-10 bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-xl space-y-6">
          <h2 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">Son Kayıtlar</h2>
          {log.length === 0 ? (
            <div className="text-zinc-500 font-bold">Henüz kayıt yok.</div>
          ) : (
            <div className="space-y-3">
              {log.slice(0, 8).map((e) => (
                <div key={e.id} className="p-5 rounded-2xl border-2 border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950">
                  <div className="flex items-center justify-between gap-4">
                    <div className="font-black text-zinc-900 dark:text-zinc-50">
                      {e.emotion} ({e.intensity}/5)
                    </div>
                    <div className="text-zinc-400 font-bold text-xs uppercase tracking-widest">
                      {new Intl.DateTimeFormat("tr-TR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" }).format(new Date(e.at))}
                    </div>
                  </div>
                  {e.triggers.length > 0 && <div className="mt-2 text-zinc-600 dark:text-zinc-300 font-bold text-sm">Tetikleyici: {e.triggers.join(", ")}</div>}
                  {e.whatHelped.length > 0 && <div className="mt-1 text-zinc-600 dark:text-zinc-300 font-bold text-sm">İyi gelen: {e.whatHelped.join(", ")}</div>}
                  {(e.antecedent || e.behavior || e.consequence) && (
                    <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-2">
                      <div className="p-3 rounded-2xl bg-white/70 dark:bg-zinc-900/60 border border-zinc-100 dark:border-zinc-800">
                        <div className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">A</div>
                        <div className="font-bold text-zinc-700 dark:text-zinc-200 text-sm">{e.antecedent || "-"}</div>
                      </div>
                      <div className="p-3 rounded-2xl bg-white/70 dark:bg-zinc-900/60 border border-zinc-100 dark:border-zinc-800">
                        <div className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">B</div>
                        <div className="font-bold text-zinc-700 dark:text-zinc-200 text-sm">{e.behavior || "-"}</div>
                      </div>
                      <div className="p-3 rounded-2xl bg-white/70 dark:bg-zinc-900/60 border border-zinc-100 dark:border-zinc-800">
                        <div className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">C</div>
                        <div className="font-bold text-zinc-700 dark:text-zinc-200 text-sm">{e.consequence || "-"}</div>
                      </div>
                    </div>
                  )}
                  {e.note && <div className="mt-2 text-zinc-700 dark:text-zinc-200 font-medium">{e.note}</div>}
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
