"use client";

import Link from "next/link";
import { ArrowLeft, Bell, Clock, Play } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type DayReminder = {
  enabled: boolean;
  time: string;
};

type EducationReminderState = {
  days: DayReminder[];
};

const STORAGE_KEY = "educationReminderV1";

const DAY_LABELS = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"];

const readState = (): EducationReminderState => {
  if (typeof window === "undefined") return { days: DAY_LABELS.map(() => ({ enabled: false, time: "09:00" })) };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { days: DAY_LABELS.map(() => ({ enabled: false, time: "09:00" })) };
    const parsed = JSON.parse(raw) as unknown;
    const obj = parsed as EducationReminderState;
    if (!obj || !Array.isArray(obj.days) || obj.days.length !== 7) return { days: DAY_LABELS.map(() => ({ enabled: false, time: "09:00" })) };
    return {
      days: obj.days.map((d) => ({
        enabled: Boolean(d?.enabled),
        time: typeof d?.time === "string" && /^\d{2}:\d{2}$/.test(d.time) ? d.time : "09:00",
      })),
    };
  } catch {
    return { days: DAY_LABELS.map(() => ({ enabled: false, time: "09:00" })) };
  }
};

const writeState = (value: EducationReminderState) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {}
};

const parseTime = (time: string) => {
  const m = time.match(/^(\d{2}):(\d{2})$/);
  if (!m) return { hour: 9, minute: 0 };
  return { hour: Number(m[1]), minute: Number(m[2]) };
};

const nextOccurrence = (dayIndexMonday0: number, time: string) => {
  const now = new Date();
  const { hour, minute } = parseTime(time);
  const targetDay = (dayIndexMonday0 + 1) % 7;
  const nowDay = now.getDay();
  let delta = (targetDay - nowDay + 7) % 7;
  const candidate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + delta, hour, minute, 0, 0);
  if (delta === 0 && candidate.getTime() <= now.getTime()) {
    delta = 7;
  }
  return new Date(now.getFullYear(), now.getMonth(), now.getDate() + delta, hour, minute, 0, 0);
};

const playBeep = async () => {
  if (typeof window === "undefined") return;
  try {
    const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof window.AudioContext }).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    try {
      await ctx.resume();
    } catch {}
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = 880;
    gain.gain.value = 0.15;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    setTimeout(() => {
      try {
        osc.stop();
        ctx.close();
      } catch {}
    }, 1200);
  } catch {}
};

const formatDateTime = (d: Date) => {
  try {
    return new Intl.DateTimeFormat("tr-TR", {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(d);
  } catch {
    return d.toLocaleString();
  }
};

export default function EducationReminderPage() {
  const [state, setState] = useState<EducationReminderState>(() => readState());
  const [permission, setPermission] = useState<NotificationPermission>(() => {
    if (typeof window === "undefined") return "default";
    if (!("Notification" in window)) return "denied";
    return Notification.permission;
  });
  const timersRef = useRef<number[]>([]);
  const [lastFired, setLastFired] = useState<string | null>(null);

  const canNotify = useMemo(() => {
    if (typeof window === "undefined") return false;
    return "Notification" in window;
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("Notification" in window)) {
      setPermission("denied");
      return;
    }
    const refresh = () => setPermission(Notification.permission);
    refresh();
    window.addEventListener("focus", refresh);
    document.addEventListener("visibilitychange", refresh);
    return () => {
      window.removeEventListener("focus", refresh);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, []);

  useEffect(() => {
    writeState(state);
    if (typeof window === "undefined") return;

    for (const id of timersRef.current) window.clearTimeout(id);
    timersRef.current = [];

    for (let i = 0; i < 7; i += 1) {
      const d = state.days[i]!;
      if (!d.enabled) continue;
      const when = nextOccurrence(i, d.time);
      const ms = Math.max(0, when.getTime() - Date.now());
      const id = window.setTimeout(() => {
        const title = "Eğitim Hatırlatıcı";
        const body = `${DAY_LABELS[i]} ${d.time} zamanı.`;
        if (canNotify && Notification.permission === "granted") {
          try {
            new Notification(title, { body });
          } catch {}
        }
        setLastFired(`${title} • ${body}`);
        playBeep();
        setState(readState());
      }, ms);
      timersRef.current.push(id);
    }

    return () => {
      for (const id of timersRef.current) window.clearTimeout(id);
      timersRef.current = [];
    };
  }, [state, canNotify]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY) return;
      setState(readState());
    };
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const requestPermission = async () => {
    if (!canNotify) return;
    try {
      const p = await Notification.requestPermission();
      setPermission(p);
    } catch {
      setPermission(typeof window === "undefined" ? "default" : Notification.permission);
    }
  };

  const testNow = async () => {
    const title = "Eğitim Hatırlatıcı";
    const body = "Test bildirimi.";
    if (canNotify && Notification.permission === "granted") {
      try {
        new Notification(title, { body });
      } catch {}
    }
    setLastFired(`${title} • ${body}`);
    await playBeep();
  };

  const updateDay = (index: number, patch: Partial<DayReminder>) => {
    setState((prev) => {
      const nextDays = prev.days.slice();
      const existing = nextDays[index]!;
      nextDays[index] = { ...existing, ...patch };
      return { days: nextDays };
    });
  };

  const onToggleEnabled = async (index: number, enabled: boolean) => {
    if (enabled && canNotify && Notification.permission !== "granted") {
      await requestPermission();
    }
    updateDay(index, { enabled });
    if (enabled) {
      await playBeep();
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-6 md:p-12">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 font-black"
          >
            <ArrowLeft className="w-4 h-4" />
            Ana Sayfa
          </Link>
          <div className="flex-1" />
          <button
            type="button"
            onClick={testNow}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 font-black"
          >
            <Play className="w-4 h-4" />
            Test Et
          </button>
          <button
            type="button"
            onClick={requestPermission}
            className={cn(
              "inline-flex items-center gap-2 px-4 py-2 rounded-2xl font-black border transition-all",
              permission === "granted"
                ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
            )}
          >
            <Bell className="w-4 h-4" />
            Bildirim İzni
          </button>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] p-8 shadow-xl">
          <h1 className="text-3xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">Eğitim Hatırlatıcı</h1>
          <p className="text-zinc-500 font-medium mt-2">
            Haftanın her günü için istediğin saati seç. Web’de hatırlatıcılar sadece tarayıcı açıkken çalışır.
          </p>

          {lastFired ? (
            <div className="mt-5 p-4 rounded-2xl border border-emerald-200 bg-emerald-50 text-emerald-900 font-bold">
              Son tetiklenen: {lastFired}
            </div>
          ) : null}

          <div className="mt-8 grid gap-3">
            {DAY_LABELS.map((label, i) => {
              const d = state.days[i]!;
              const next = d.enabled ? nextOccurrence(i, d.time) : null;
              return (
                <div
                  key={label}
                  className="flex items-center gap-3 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950"
                >
                  <input
                    type="checkbox"
                    className="w-5 h-5 accent-emerald-600"
                    checked={d.enabled}
                    onChange={(e) => onToggleEnabled(i, e.target.checked)}
                  />
                  <div className="flex-1">
                    <div className="font-black text-zinc-900 dark:text-zinc-50">{label}</div>
                    <div className="text-sm font-bold text-zinc-500">
                      {d.enabled ? `Saat: ${d.time}` : "Kapalı"}
                      {next ? ` • Sonraki: ${formatDateTime(next)}` : ""}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-zinc-400" />
                    <input
                      type="time"
                      value={d.time}
                      disabled={!d.enabled}
                      onChange={(e) => updateDay(i, { time: e.target.value })}
                      className={cn(
                        "px-3 py-2 rounded-xl border font-black",
                        d.enabled
                          ? "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
                          : "bg-zinc-100 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 text-zinc-400"
                      )}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 text-xs font-bold text-zinc-500">
            Not: Web’de tarayıcı sekmesi kapanırsa/uykuya geçerse hatırlatıcı kaçabilir. Kesin bildirim için mobil uygulamayı kullan.
          </div>
        </div>
      </div>
    </div>
  );
}
