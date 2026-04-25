"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { Heart, BookOpen, Gamepad2, Users, Settings, Music, Calendar, Info, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

type Session = {
  email: string;
};

let isHydrated = false;
let cachedSession: Session | null = null;
const sessionListeners = new Set<() => void>();
let refreshPromise: Promise<void> | null = null;

const getLocalStorageValue = (key: string, fallback: string) => {
  if (typeof window === "undefined") return fallback;
  try {
    return localStorage.getItem(key) || fallback;
  } catch {
    return fallback;
  }
};

const notifySession = () => {
  for (const cb of sessionListeners) cb();
};

const subscribeToSession = (callback: () => void) => {
  if (typeof window === "undefined") return () => {};
  sessionListeners.add(callback);
  return () => {
    sessionListeners.delete(callback);
  };
};

const getSessionSnapshot = (): Session | null => {
  if (typeof window === "undefined") return null;
  if (!isHydrated) return null;
  return cachedSession;
};

const setCachedSession = (next: Session | null) => {
  cachedSession = next;
  notifySession();
};

const refreshSession = async () => {
  if (typeof window === "undefined") return;
  if (refreshPromise) return refreshPromise;
  refreshPromise = (async () => {
    try {
      const res = await fetch("/api/auth/me", { method: "GET", cache: "no-store" });
      const data = (await res.json()) as { session?: { email?: string } | null };
      const email = data?.session?.email;
      setCachedSession(email ? { email } : null);
    } catch {
      setCachedSession(null);
    }
  })().finally(() => {
    refreshPromise = null;
  });
  return refreshPromise;
};

const normalizeEmail = (email: string) => email.trim().toLowerCase();

export default function Home() {
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authPassword2, setAuthPassword2] = useState("");
  const [authBusy, setAuthBusy] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [kvkkAccepted, setKvkkAccepted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const session = useSyncExternalStore(subscribeToSession, getSessionSnapshot, () => null);
  const kvkkSyncedForEmailRef = useRef<string | null>(null);

  useEffect(() => {
    isHydrated = true;
    setHydrated(true);
    setKvkkAccepted(getLocalStorageValue("kvkkAcceptedV1", "0") === "1");
    refreshSession();
    (async () => {
      try {
        const res = await fetch("/api/auth/me", { method: "GET", cache: "no-store" });
        if (res.ok) {
          setServerError(null);
          return;
        }
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setServerError(typeof data.error === "string" ? data.error : "Sunucu hatası.");
      } catch (e) {
        setServerError(e instanceof Error ? e.message : "Sunucu hatası.");
      }
    })();
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (!kvkkAccepted) return;
    if (!session?.email) return;
    if (kvkkSyncedForEmailRef.current === session.email) return;

    kvkkSyncedForEmailRef.current = session.email;
    fetch("/api/privacy/consent", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ version: 1 }),
    }).catch(() => {});
  }, [hydrated, kvkkAccepted, session?.email]);

  const [studentName, setStudentName] = useState("Zeynel");
  const [studentAge, setStudentAge] = useState("6");

  useEffect(() => {
    if (!hydrated) return;
    setStudentName(getLocalStorageValue("studentName", "Zeynel"));
    setStudentAge(getLocalStorageValue("studentAge", "6"));
  }, [hydrated]);

  const modules = [
    {
      title: "Otizm Bilgilendirme",
      description: "Faydalı bilgiler",
      icon: Info,
      href: "/info",
      color: "bg-blue-100 text-blue-600 border-blue-200 hover:bg-blue-200",
    },
    {
      title: "Duygularım",
      description: "Nasıl hissettiğini keşfet",
      icon: Heart,
      href: "/emotions",
      color: "bg-rose-100 text-rose-600 border-rose-200 hover:bg-rose-200",
    },
    {
      title: "Eğitici Oyunlar",
      description: "Eğlenerek öğren",
      icon: Gamepad2,
      href: "/games",
      color: "bg-sky-100 text-sky-600 border-sky-200 hover:bg-sky-200",
    },
    {
      title: "Sosyal Öyküler",
      description: "Yeni hikayeler öğren",
      icon: BookOpen,
      href: "/stories",
      color: "bg-emerald-100 text-emerald-600 border-emerald-200 hover:bg-emerald-200",
    },
    {
      title: "Müzik ve Ses",
      description: "Ritim ve ses çalışmaları",
      icon: Music,
      href: "/music",
      color: "bg-indigo-100 text-indigo-600 border-indigo-200 hover:bg-indigo-200",
    },
    {
      title: "İletişim Kartları",
      description: "ACC Kartları",
      icon: MessageSquare,
      href: "/acc",
      color: "bg-amber-100 text-amber-600 border-amber-200 hover:bg-amber-200",
    },
    {
      title: "Takvim ve Program",
      description: "Günlük aktiviteler",
      icon: Calendar,
      href: "/calendar",
      color: "bg-amber-100 text-amber-600 border-amber-200 hover:bg-amber-200",
    },
    {
      title: "Aile Paneli",
      description: "İletişim ve Ayarlar",
      icon: Users,
      href: "/family",
      color: "bg-zinc-100 text-zinc-600 border-zinc-200 hover:bg-zinc-200",
    },
  ];

  const handleLogout = async () => {
    setAuthError(null);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {}
    setCachedSession(null);
  };

  const handleRegister = async () => {
    setAuthError(null);
    const email = normalizeEmail(authEmail);
    const password = authPassword;
    const password2 = authPassword2;

    if (!email || !email.includes("@") || !email.includes(".")) {
      setAuthError("Geçerli bir e-posta girin.");
      return;
    }
    if (password.length < 8) {
      setAuthError("Şifre en az 8 karakter olmalı.");
      return;
    }
    if (password !== password2) {
      setAuthError("Şifreler eşleşmiyor.");
      return;
    }

    setAuthBusy(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setAuthError(typeof data.error === "string" ? data.error : "Kayıt sırasında hata oluştu.");
        return;
      }

      await refreshSession();
      setAuthEmail("");
      setAuthPassword("");
      setAuthPassword2("");
    } catch (e) {
      setAuthError(e instanceof Error ? e.message : "Kayıt sırasında hata oluştu.");
    } finally {
      setAuthBusy(false);
    }
  };

  const handleLogin = async () => {
    setAuthError(null);
    const email = normalizeEmail(authEmail);
    const password = authPassword;

    if (!email || !email.includes("@") || !email.includes(".")) {
      setAuthError("Geçerli bir e-posta girin.");
      return;
    }
    if (!password) {
      setAuthError("Şifre girin.");
      return;
    }

    setAuthBusy(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setAuthError(typeof data.error === "string" ? data.error : "Giriş sırasında hata oluştu.");
        return;
      }

      await refreshSession();
      setAuthEmail("");
      setAuthPassword("");
      setAuthPassword2("");
    } catch (e) {
      setAuthError(e instanceof Error ? e.message : "Giriş sırasında hata oluştu.");
    } finally {
      setAuthBusy(false);
    }
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-6 md:p-12" suppressHydrationWarning>
        {hydrated && !kvkkAccepted && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-zinc-950/80 backdrop-blur-md">
            <div className="bg-white dark:bg-zinc-900 w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800">
              <div className="p-8 border-b border-zinc-100 dark:border-zinc-800">
                <h2 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">KVKK Açık Rıza</h2>
                <p className="text-zinc-600 dark:text-zinc-300 font-bold mt-3 leading-relaxed">
                  Uygulama; rutin, duygu günlüğü ve profil gibi bilgileri kaydedebilmek için veri işlemesi yapar. Devam ederek bu
                  işlemleri kabul etmiş olursunuz.
                </p>
              </div>
              <div className="p-8 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    try {
                      localStorage.setItem("kvkkAcceptedV1", "1");
                    } catch {}
                    setKvkkAccepted(true);
                  }}
                  className="px-8 py-4 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-2xl font-black uppercase tracking-widest text-sm hover:opacity-90 transition-all"
                >
                  Kabul Ediyorum
                </button>
              </div>
            </div>
          </div>
        )}
        <header className="max-w-xl mx-auto mb-10">
          <h1 className="text-3xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">Otizm Destek Uygulaması</h1>
          <p className="text-zinc-500 font-medium mt-2">E-posta ile giriş yapın veya kayıt olun.</p>
        </header>

        <main className="max-w-xl mx-auto">
          <section className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-xl">
            <div className="grid grid-cols-2 gap-2 bg-zinc-100 dark:bg-zinc-800 p-2 rounded-2xl mb-8">
              <button
                onClick={() => {
                  setAuthMode("login");
                  setAuthError(null);
                }}
                className={cn(
                  "py-3 rounded-xl font-black transition-all",
                  authMode === "login" ? "bg-white dark:bg-zinc-900 shadow text-zinc-900 dark:text-zinc-50" : "text-zinc-500"
                )}
              >
                Giriş
              </button>
              <button
                onClick={() => {
                  setAuthMode("register");
                  setAuthError(null);
                }}
                className={cn(
                  "py-3 rounded-xl font-black transition-all",
                  authMode === "register"
                    ? "bg-white dark:bg-zinc-900 shadow text-zinc-900 dark:text-zinc-50"
                    : "text-zinc-500"
                )}
              >
                Kayıt Ol
              </button>
            </div>

            <div className="space-y-5">
              {serverError && (
                <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/30 text-amber-800 dark:text-amber-100 font-bold">
                  {serverError}
                </div>
              )}
              <div className="space-y-2">
                <label className="text-xs font-black text-zinc-400 uppercase tracking-widest">E-posta</label>
                <input
                  type="email"
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key !== "Enter") return;
                    (authMode === "login" ? handleLogin : handleRegister)();
                  }}
                  className="w-full p-4 rounded-2xl border-2 border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 font-bold focus:border-zinc-900 transition-all outline-none"
                  placeholder="ornek@mail.com"
                  autoComplete="email"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-zinc-400 uppercase tracking-widest">Şifre</label>
                <input
                  type="password"
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key !== "Enter") return;
                    (authMode === "login" ? handleLogin : handleRegister)();
                  }}
                  className="w-full p-4 rounded-2xl border-2 border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 font-bold focus:border-zinc-900 transition-all outline-none"
                  placeholder="••••••"
                  autoComplete={authMode === "login" ? "current-password" : "new-password"}
                />
              </div>

              {authMode === "register" && (
                <div className="space-y-2">
                  <label className="text-xs font-black text-zinc-400 uppercase tracking-widest">Şifre (Tekrar)</label>
                  <input
                    type="password"
                    value={authPassword2}
                    onChange={(e) => setAuthPassword2(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key !== "Enter") return;
                      handleRegister();
                    }}
                    className="w-full p-4 rounded-2xl border-2 border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 font-bold focus:border-zinc-900 transition-all outline-none"
                    placeholder="••••••"
                    autoComplete="new-password"
                  />
                </div>
              )}

              {authError && (
                <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-900/30 text-rose-700 dark:text-rose-200 font-bold">
                  {authError}
                </div>
              )}

              <button
                disabled={authBusy || !kvkkAccepted}
                onClick={authMode === "login" ? handleLogin : handleRegister}
                className={cn(
                  "w-full px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all shadow-lg active:scale-95",
                  authBusy || !kvkkAccepted
                    ? "bg-zinc-200 text-zinc-500 cursor-not-allowed"
                    : "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:opacity-90"
                )}
              >
                {authMode === "login" ? "Giriş Yap" : "Kayıt Ol"}
              </button>
            </div>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-6 md:p-12" suppressHydrationWarning>
      <header className="max-w-5xl mx-auto mb-12">
        <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden relative">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Users size={120} />
          </div>
          
          <div className="flex justify-between items-start mb-8 relative z-10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <h2 className="text-xs font-bold text-zinc-400 uppercase tracking-[0.2em]">Sistem Aktif</h2>
              </div>
              <h1 className="text-4xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">Zeynel Güner</h1>
              <p className="text-zinc-500 font-medium mt-1 text-lg">Aile Yönetim Paneli</p>
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mt-3">
                Giriş: <span className="lowercase">{session.email}</span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/family"
                className="p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all text-zinc-600 dark:text-zinc-400 shadow-sm"
              >
                <Settings size={28} />
              </Link>
              <button
                onClick={handleLogout}
                className="px-5 py-4 rounded-2xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-black uppercase tracking-widest text-xs hover:opacity-90 transition-all shadow-sm"
              >
                Çıkış
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-8 relative z-10">
            <div className="space-y-6">
              <div className="flex gap-10">
                <div>
                  <p className="text-xs font-bold text-zinc-400 uppercase mb-2">Çocuğun Adı</p>
                  <p className="text-2xl font-black text-zinc-800 dark:text-zinc-100">{studentName || "Zeynel"}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-zinc-400 uppercase mb-2">Yaşı</p>
                  <p className="text-2xl font-black text-zinc-800 dark:text-zinc-100">{studentAge ? `${studentAge} Yaşında` : "6 Yaşında"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => (
          <Link
            key={module.href}
            href={module.href}
            className={cn(
              "group p-8 rounded-[2rem] border-2 transition-all active:scale-[0.98] flex flex-col items-start gap-6 shadow-sm hover:shadow-xl",
              module.color
            )}
          >
            <div className="p-5 rounded-2xl bg-white/90 dark:bg-black/20 shadow-md group-hover:scale-110 transition-transform group-hover:rotate-3">
              <module.icon size={36} />
            </div>
            <div>
              <h2 className="text-2xl font-black mb-2 tracking-tight">{module.title}</h2>
              <p className="opacity-90 font-bold text-sm leading-snug">{module.description}</p>
            </div>
          </Link>
        ))}
      </main>

      <footer className="max-w-5xl mx-auto mt-20 text-center text-zinc-400 text-sm font-bold uppercase tracking-widest">
        <p>© 2026 Otizm Destek Uygulaması - Tüm Hakları Saklıdır</p>
      </footer>
    </div>
  );
}
