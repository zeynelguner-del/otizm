"use client";
import { ArrowLeft, Clock, CheckCircle2, ChevronRight, ChevronLeft, Play, Pause, RotateCcw, AlarmClock } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "dailyScheduleRecordsV1";
const EMPTY_RECORDS: Record<string, Record<string, boolean>> = {};
const FIRST_THEN_KEY = "firstThenV1";
const TOKENS_KEY = "tokenBalanceV1";
const SPEECH_SETTINGS_KEY = "speechSettingsV1";
const TOKENS_EVENT = "token-storage";
const HISTORY_DAYS = 7;

let cachedRecordsRaw: string | null | undefined = undefined;
let cachedRecordsParsed: Record<string, Record<string, boolean>> = EMPTY_RECORDS;

const getRecordsSnapshot = () => {
  if (typeof window === "undefined") return EMPTY_RECORDS;
  let raw: string | null;
  try {
    raw = localStorage.getItem(STORAGE_KEY);
  } catch {
    return EMPTY_RECORDS;
  }

  if (raw === cachedRecordsRaw) return cachedRecordsParsed;
  cachedRecordsRaw = raw;

  if (!raw) {
    cachedRecordsParsed = EMPTY_RECORDS;
    return cachedRecordsParsed;
  }

  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") {
      cachedRecordsParsed = EMPTY_RECORDS;
      return cachedRecordsParsed;
    }
    cachedRecordsParsed = parsed as Record<string, Record<string, boolean>>;
    return cachedRecordsParsed;
  } catch {
    cachedRecordsParsed = EMPTY_RECORDS;
    return cachedRecordsParsed;
  }
};

type ScheduleTemplateItem = {
  id: string;
  time: string;
  task: string;
  category: string;
};

const SCHEDULE_TEMPLATE: ScheduleTemplateItem[] = [
  { id: "morning-routine", time: "09:00", task: "Sabah Rutini", category: "Özbakım" },
  { id: "emotion-work", time: "10:30", task: "Duygu Çalışması", category: "Eğitim" },
  { id: "lunch", time: "12:00", task: "Öğle Yemeği", category: "Beslenme" },
  { id: "matching-game", time: "14:00", task: "Eşleştirme Oyunu", category: "Oyun" },
  { id: "garden-time", time: "16:00", task: "Bahçe Saati", category: "Aktivite" },
];

const pad2 = (n: number) => (n < 10 ? `0${n}` : `${n}`);

const toDateKey = (date: Date) => {
  const y = date.getFullYear();
  const m = pad2(date.getMonth() + 1);
  const d = pad2(date.getDate());
  return `${y}-${m}-${d}`;
};

const fromDateKey = (key: string) => {
  const [y, m, d] = key.split("-").map((v) => Number(v));
  return new Date(y, m - 1, d);
};

const addDays = (key: string, delta: number) => {
  const date = fromDateKey(key);
  date.setDate(date.getDate() + delta);
  return toDateKey(date);
};

const STORAGE_EVENT = "daily-schedule-storage";

const notifyStorageUpdate = () => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(STORAGE_EVENT));
};

const subscribeToStorage = (callback: () => void) => {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  window.addEventListener(STORAGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(STORAGE_EVENT, callback);
  };
};

type SpeechSettings = {
  voiceURI: string | null;
  rate: number;
  pitch: number;
  volume: number;
};

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

const getNumber = (key: string, fallback: number) => {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const n = Number(raw);
    return Number.isFinite(n) ? n : fallback;
  } catch {
    return fallback;
  }
};

const setNumber = (key: string, value: number) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, String(value));
    if (key === TOKENS_KEY) window.dispatchEvent(new Event(TOKENS_EVENT));
  } catch {}
};

const writeJsonSafe = (key: string, value: unknown) => {
  try {
    if (typeof window === "undefined") return;
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
};

export default function CalendarPage() {
  const todayKey = useMemo(() => toDateKey(new Date()), []);
  const yesterdayKey = useMemo(() => addDays(todayKey, -1), [todayKey]);
  const historyKeys = useMemo(() => {
    return Array.from({ length: HISTORY_DAYS }, (_, i) => addDays(todayKey, -(i + 1)));
  }, [todayKey]);
  const earliestHistoryKey = useMemo(() => historyKeys[historyKeys.length - 1] ?? addDays(todayKey, -HISTORY_DAYS), [historyKeys, todayKey]);

  const [selectedDateKey, setSelectedDateKey] = useState(todayKey);
  const [firstThen, setFirstThen] = useState<{ first: string; then: string }>(() =>
    readJson<{ first: string; then: string }>(FIRST_THEN_KEY, { first: "Sabah Rutini", then: "Oyun" })
  );

  const [tokenBalance, setTokenBalance] = useState(() => getNumber(TOKENS_KEY, 0));
  const [rewardToast, setRewardToast] = useState<string | null>(null);

  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [speechSettings] = useState<SpeechSettings>(() =>
    readJson<SpeechSettings>(SPEECH_SETTINGS_KEY, { voiceURI: null, rate: 1, pitch: 1, volume: 1 })
  );

  const [timerMinutes, setTimerMinutes] = useState(5);
  const [timerRemaining, setTimerRemaining] = useState(5 * 60);
  const [timerRunning, setTimerRunning] = useState(false);

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

  const records = useSyncExternalStore(
    subscribeToStorage,
    getRecordsSnapshot,
    () => EMPTY_RECORDS
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const next = { ...records };
    let changed = false;
    const ensure = (key: string) => {
      if (Object.prototype.hasOwnProperty.call(next, key)) return;
      next[key] = {};
      changed = true;
    };
    ensure(todayKey);
    for (const k of historyKeys) ensure(k);
    if (!changed) return;
    writeJsonSafe(STORAGE_KEY, next);
    notifyStorageUpdate();
  }, [records, todayKey, historyKeys]);

  const schedule = useMemo(() => {
    const selectedDoneMap = records[selectedDateKey] ?? {};
    return SCHEDULE_TEMPLATE.map((item) => ({ ...item, done: Boolean(selectedDoneMap[item.id]) }));
  }, [records, selectedDateKey]);

  const selectedTab = selectedDateKey === todayKey ? "Bugün" : selectedDateKey === yesterdayKey ? "Dün" : "Geçmiş";

  const formattedSelectedDate = useMemo(() => {
    return new Intl.DateTimeFormat("tr-TR", { day: "2-digit", month: "long", year: "numeric" }).format(
      fromDateKey(selectedDateKey)
    );
  }, [selectedDateKey]);

  const completedCount = schedule.filter((s) => s.done).length;
  const totalCount = schedule.length;
  const completionPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const canGoBack = selectedDateKey > earliestHistoryKey;
  const canGoForward = selectedDateKey < todayKey;

  const goBackOneDay = () => {
    if (!canGoBack) return;
    setSelectedDateKey((prev) => {
      const next = addDays(prev, -1);
      return next < earliestHistoryKey ? earliestHistoryKey : next;
    });
  };

  const goForwardOneDay = () => {
    if (!canGoForward) return;
    setSelectedDateKey((prev) => {
      const next = addDays(prev, 1);
      return next > todayKey ? todayKey : next;
    });
  };

  const openHistory = () => {
    setSelectedDateKey(addDays(todayKey, -2));
  };

  const formatHistoryLabel = (key: string) => {
    try {
      return new Intl.DateTimeFormat("tr-TR", { weekday: "short", day: "2-digit", month: "2-digit" }).format(fromDateKey(key));
    } catch {
      return key;
    }
  };

  const completionForDate = (key: string) => {
    const doneMap = records[key] ?? {};
    const doneCount = SCHEDULE_TEMPLATE.reduce((acc, item) => acc + (doneMap[item.id] ? 1 : 0), 0);
    const total = SCHEDULE_TEMPLATE.length;
    return total > 0 ? Math.round((doneCount / total) * 100) : 0;
  };

  const toggleTaskDone = (taskId: string) => {
    const prevDay = records[selectedDateKey] ?? {};
    const nextDone = !prevDay[taskId];
    const nextDay = { ...prevDay, [taskId]: nextDone };
    const nextRecords = { ...records, [selectedDateKey]: nextDay };
    writeJsonSafe(STORAGE_KEY, nextRecords);

    const beforeDone = Boolean(prevDay[taskId]);
    if (beforeDone !== nextDone) {
      const delta = nextDone ? 1 : -1;
      const nextTokens = Math.max(0, tokenBalance + delta);
      setTokenBalance(nextTokens);
      setNumber(TOKENS_KEY, nextTokens);
      setRewardToast(delta > 0 ? "+1 yıldız" : "-1 yıldız");
      window.setTimeout(() => setRewardToast(null), 1200);
    }

    notifyStorageUpdate();
  };

  useEffect(() => {
    if (!timerRunning) return;
    const id = window.setInterval(() => {
      setTimerRemaining((prev) => {
        const next = prev - 1;
        if (next <= 0) {
          window.clearInterval(id);
          setTimerRunning(false);
          speak("Süre bitti.");
          return 0;
        }
        return next;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [timerRunning]);

  const startTimer = () => {
    setTimerRemaining(timerMinutes * 60);
    setTimerRunning(true);
    speak(`${timerMinutes} dakika başladı.`);
  };

  const toggleTimer = () => {
    setTimerRunning((v) => {
      const next = !v;
      if (next) speak("Devam.");
      else speak("Duraklat.");
      return next;
    });
  };

  const resetTimer = () => {
    setTimerRunning(false);
    setTimerRemaining(timerMinutes * 60);
  };

  const fmtTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? `0${s}` : s}`;
  };

  const setFirstThenValue = (key: "first" | "then", value: string) => {
    setFirstThen((prev) => {
      const next = { ...prev, [key]: value };
      writeJsonSafe(FIRST_THEN_KEY, next);
      return next;
    });
  };

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
          <h1 className="text-3xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">Takvim ve Program</h1>
          <p className="text-zinc-500 font-medium">Günlük Aktivite Takibi</p>
        </div>
      </header>

      <main className="max-w-3xl mx-auto space-y-8">
        {rewardToast && (
          <div className="bg-white dark:bg-zinc-900 p-5 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 shadow-xl">
            <div className="font-black text-emerald-600 dark:text-emerald-300">{rewardToast}</div>
          </div>
        )}

        <section className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-xl space-y-6">
          <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
            <AlarmClock className="text-amber-500" /> Önce - Sonra
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl border-2 border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 space-y-3">
              <div className="text-xs font-black text-zinc-400 uppercase tracking-widest">Önce</div>
              <select
                value={firstThen.first}
                onChange={(e) => setFirstThenValue("first", e.target.value)}
                className="w-full p-4 rounded-2xl border-2 border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 font-black"
              >
                {SCHEDULE_TEMPLATE.map((s) => (
                  <option key={s.id} value={s.task}>
                    {s.task}
                  </option>
                ))}
                <option value="Ara">Ara</option>
                <option value="Tuvalet">Tuvalet</option>
              </select>
              <div className="text-2xl font-black text-zinc-900 dark:text-zinc-50">{firstThen.first}</div>
            </div>

            <div className="p-6 rounded-3xl border-2 border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 space-y-3">
              <div className="text-xs font-black text-zinc-400 uppercase tracking-widest">Sonra</div>
              <select
                value={firstThen.then}
                onChange={(e) => setFirstThenValue("then", e.target.value)}
                className="w-full p-4 rounded-2xl border-2 border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 font-black"
              >
                {SCHEDULE_TEMPLATE.map((s) => (
                  <option key={s.id} value={s.task}>
                    {s.task}
                  </option>
                ))}
                <option value="Ödül">Ödül</option>
                <option value="Oyun">Oyun</option>
              </select>
              <div className="text-2xl font-black text-zinc-900 dark:text-zinc-50">{firstThen.then}</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => speak(`Önce ${firstThen.first}. Sonra ${firstThen.then}.`)}
              className="px-8 py-4 rounded-2xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-black uppercase tracking-widest text-xs transition-all active:scale-95"
            >
              Söyle
            </button>
            <button
              type="button"
              onClick={() => setFirstThenValue("first", "Ara")}
              className="px-8 py-4 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-100 font-black uppercase tracking-widest text-xs transition-all active:scale-95"
            >
              Ara
            </button>
          </div>
        </section>

        <section className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-xl space-y-6">
          <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
            <Clock className="text-amber-500" /> Görsel Zamanlayıcı
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div className="p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-950 border-2 border-zinc-100 dark:border-zinc-800 text-center">
              <div className="text-5xl font-black text-zinc-900 dark:text-zinc-50">{fmtTime(timerRemaining)}</div>
              <div className="text-xs font-black text-zinc-400 uppercase tracking-widest mt-2">Kalan Süre</div>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-black text-zinc-400 uppercase tracking-widest">Süre (dk)</div>
              <input
                type="range"
                min="1"
                max="30"
                step="1"
                value={timerMinutes}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  setTimerMinutes(v);
                  if (!timerRunning) setTimerRemaining(v * 60);
                }}
                className="w-full"
              />
              <div className="font-black text-zinc-700 dark:text-zinc-200">{timerMinutes} dakika</div>
            </div>

            <div className="flex flex-wrap gap-3 justify-center md:justify-end">
              <button
                type="button"
                onClick={startTimer}
                className="px-6 py-4 rounded-2xl bg-emerald-500 text-white font-black uppercase tracking-widest text-xs flex items-center gap-2 transition-all active:scale-95"
              >
                <Play size={18} /> Başlat
              </button>
              <button
                type="button"
                onClick={toggleTimer}
                className={cn(
                  "px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-2 transition-all active:scale-95",
                  timerRunning ? "bg-amber-100 text-amber-800 border-2 border-amber-200" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-100"
                )}
              >
                <Pause size={18} /> Duraklat
              </button>
              <button
                type="button"
                onClick={resetTimer}
                className="px-6 py-4 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-100 font-black uppercase tracking-widest text-xs flex items-center gap-2 transition-all active:scale-95"
              >
                <RotateCcw size={18} /> Sıfırla
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => speak("Beş dakika kaldı.")}
              className="px-6 py-3 rounded-2xl bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-200 font-black uppercase tracking-widest text-xs border-2 border-amber-100 dark:border-amber-900/30"
            >
              5 dk kaldı
            </button>
            <button
              type="button"
              onClick={() => speak("Bir dakika kaldı.")}
              className="px-6 py-3 rounded-2xl bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-200 font-black uppercase tracking-widest text-xs border-2 border-amber-100 dark:border-amber-900/30"
            >
              1 dk kaldı
            </button>
            <button
              type="button"
              onClick={() => speak("Şimdi geçiş zamanı.")}
              className="px-6 py-3 rounded-2xl bg-emerald-50 dark:bg-emerald-900/10 text-emerald-700 dark:text-emerald-200 font-black uppercase tracking-widest text-xs border-2 border-emerald-100 dark:border-emerald-900/30"
            >
              Geçiş
            </button>
          </div>
        </section>

        {/* Day Selector */}
        <section className="bg-white dark:bg-zinc-900 p-4 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 shadow-xl flex gap-2">
          <button
            onClick={() => setSelectedDateKey(yesterdayKey)}
            className={cn(
              "flex-1 py-4 rounded-2xl font-black transition-all",
              selectedTab === "Dün"
                ? "bg-amber-500 text-white shadow-lg scale-[1.02]"
                : "text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"
            )}
          >
            Dün
          </button>
          <button
            onClick={() => setSelectedDateKey(todayKey)}
            className={cn(
              "flex-1 py-4 rounded-2xl font-black transition-all",
              selectedTab === "Bugün"
                ? "bg-amber-500 text-white shadow-lg scale-[1.02]"
                : "text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"
            )}
          >
            Bugün
          </button>
          <button
            onClick={openHistory}
            className={cn(
              "flex-1 py-4 rounded-2xl font-black transition-all",
              selectedTab === "Geçmiş"
                ? "bg-amber-500 text-white shadow-lg scale-[1.02]"
                : "text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800",
            )}
          >
            Geçmiş
          </button>
        </section>

        {selectedTab === "Geçmiş" ? (
          <section className="bg-white dark:bg-zinc-900 p-6 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-xl">
            <div className="flex items-center justify-between gap-4 mb-4">
              <h2 className="text-xl font-black tracking-tight">Son 7 Gün</h2>
              <div className="text-xs font-black text-zinc-400 uppercase tracking-widest">Kayıt olmasa da görünür</div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {historyKeys.slice(0, HISTORY_DAYS).map((k) => {
                const pct = completionForDate(k);
                const active = selectedDateKey === k;
                return (
                  <button
                    key={k}
                    type="button"
                    onClick={() => setSelectedDateKey(k)}
                    className={cn(
                      "p-4 rounded-2xl border text-left transition-all",
                      active
                        ? "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-900/30"
                        : "bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 hover:border-amber-200"
                    )}
                  >
                    <div className="font-black text-zinc-900 dark:text-zinc-50">{formatHistoryLabel(k)}</div>
                    <div className="text-xs font-black text-zinc-500 mt-1">%{pct} tamam</div>
                  </button>
                );
              })}
            </div>
          </section>
        ) : null}

        {/* Schedule Card */}
        <section className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-xl">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
              <Clock className="text-amber-500" /> Günlük Akış
            </h2>
            <div className="flex items-center gap-3">
              <button
                onClick={goBackOneDay}
                disabled={!canGoBack}
                className={cn(
                  "p-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-400 transition-all",
                  canGoBack ? "hover:bg-zinc-50 dark:hover:bg-zinc-800" : "opacity-40 cursor-not-allowed"
                )}
              >
                <ChevronLeft size={20} />
              </button>
              <div className="px-4 py-2 bg-amber-50 dark:bg-amber-900/20 text-amber-600 rounded-xl font-black text-sm uppercase tracking-widest">
                {formattedSelectedDate}
              </div>
              <button
                onClick={goForwardOneDay}
                disabled={!canGoForward}
                className={cn(
                  "p-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-400 transition-all",
                  canGoForward ? "hover:bg-zinc-50 dark:hover:bg-zinc-800" : "opacity-40 cursor-not-allowed"
                )}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div className="space-y-6 relative">
            <div className="absolute left-[2.25rem] top-2 bottom-2 w-0.5 bg-zinc-100 dark:bg-zinc-800" />
            
            {schedule.map((item, i) => (
              <div key={i} className="flex gap-6 relative z-10">
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center shadow-md shrink-0 transition-all",
                  item.done 
                    ? "bg-emerald-500 text-white" 
                    : "bg-white dark:bg-zinc-800 border-2 border-zinc-100 dark:border-zinc-700 text-zinc-300"
                )}>
                  {item.done ? <CheckCircle2 size={24} /> : <div className="w-3 h-3 rounded-full bg-zinc-200 dark:bg-zinc-600" />}
                </div>
                
                <button
                  type="button"
                  onClick={() => toggleTaskDone(item.id)}
                  className={cn(
                    "flex-1 p-6 rounded-3xl border-2 transition-all group text-left",
                    item.done
                      ? "bg-emerald-50/50 border-emerald-100 dark:bg-emerald-900/10 dark:border-emerald-900/20 opacity-70 hover:opacity-100"
                      : "bg-zinc-50 border-zinc-100 dark:bg-zinc-800/50 dark:border-zinc-700 hover:border-amber-200"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-1">{item.time} - {item.category}</p>
                      <h3 className="text-xl font-black text-zinc-800 dark:text-zinc-100">{item.task}</h3>
                    </div>
                    {!item.done ? (
                      <ChevronRight className="text-zinc-300 group-hover:text-amber-500 transition-all" />
                    ) : (
                      <span className="text-emerald-600 dark:text-emerald-300 font-black text-xs uppercase tracking-widest">
                        Tamamlandı
                      </span>
                    )}
                  </div>
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Motivation Card */}
        <section className="bg-amber-100 dark:bg-amber-900/30 p-8 rounded-[2rem] border-2 border-amber-200 dark:border-amber-900/20 flex items-center gap-6">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm">
            🌟
          </div>
          <div>
            <h4 className="text-amber-900 dark:text-amber-100 font-black text-lg">Harika Gidiyorsun!</h4>
            <p className="text-amber-700 dark:text-amber-300 font-bold">
              {formattedSelectedDate} hedeflerinin %{completionPercent}&apos;ini tamamladın.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
