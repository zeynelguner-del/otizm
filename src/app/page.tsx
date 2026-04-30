"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { Heart, BookOpen, Gamepad2, Users, Settings, Music, Calendar, Info, MessageSquare, HelpCircle, User, Phone, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

type Session = {
  email: string;
};

let isHydrated = false;
let cachedSession: Session | null = null;
const sessionListeners = new Set<() => void>();
let refreshPromise: Promise<void> | null = null;

if (typeof window !== "undefined") isHydrated = true;

const getLocalStorageValue = (key: string, fallback: string) => {
  if (typeof window === "undefined") return fallback;
  try {
    return localStorage.getItem(key) || fallback;
  } catch {
    return fallback;
  }
};

const PROFILE_SYNC_EVENT = "profile-sync-v1";
const STUDENT_BIRTHDATE_KEY = "studentBirthDate";
const STUDENT_PHOTO_KEY = "studentPhotoV1";
const USER_FULL_NAME_KEY = "userFullNameV1";
const USER_PHONE_KEY = "userPhoneV1";

const toDateInputValue = (isoOrEmpty: string) => {
  if (!isoOrEmpty) return "";
  const m = isoOrEmpty.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return "";
  return `${m[1]}-${m[2]}-${m[3]}`;
};

const computeAgeYears = (birthDate: string) => {
  const m = birthDate.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return null;
  const y = Number(m[1]);
  const mo = Number(m[2]);
  const d = Number(m[3]);
  if (!Number.isFinite(y) || !Number.isFinite(mo) || !Number.isFinite(d)) return null;
  if (mo < 1 || mo > 12) return null;
  if (d < 1 || d > 31) return null;
  const today = new Date();
  const birth = new Date(y, mo - 1, d);
  if (Number.isNaN(birth.getTime())) return null;
  if (birth > today) return null;
  let age = today.getFullYear() - birth.getFullYear();
  const mDiff = today.getMonth() - birth.getMonth();
  if (mDiff < 0 || (mDiff === 0 && today.getDate() < birth.getDate())) age -= 1;
  return age >= 0 ? age : null;
};

const formatBirthDate = (birthDate: string) => {
  const m = birthDate.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return null;
  const y = Number(m[1]);
  const mo = Number(m[2]);
  const d = Number(m[3]);
  const date = new Date(y, mo - 1, d);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat("tr-TR", { day: "2-digit", month: "long", year: "numeric" }).format(date);
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
  const [kvkkAccepted, setKvkkAccepted] = useState(() => getLocalStorageValue("kvkkAcceptedV1", "0") === "1");
  const [serverError, setServerError] = useState<string | null>(null);

  const session = useSyncExternalStore(subscribeToSession, getSessionSnapshot, () => null);
  const kvkkSyncedForEmailRef = useRef<string | null>(null);

  useEffect(() => {
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
    if (typeof window === "undefined") return;
    if (!kvkkAccepted) return;
    if (!session?.email) return;
    if (kvkkSyncedForEmailRef.current === session.email) return;

    kvkkSyncedForEmailRef.current = session.email;
    fetch("/api/privacy/consent", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ version: 1 }),
    }).catch(() => {});
  }, [kvkkAccepted, session?.email]);

  const [studentName, setStudentName] = useState(() => getLocalStorageValue("studentName", ""));
  const [studentBirthDate, setStudentBirthDate] = useState(() => getLocalStorageValue(STUDENT_BIRTHDATE_KEY, ""));
  const [legacyAge, setLegacyAge] = useState(() => getLocalStorageValue("studentAge", ""));
  const [studentPhotoDataUrl, setStudentPhotoDataUrl] = useState(() => getLocalStorageValue(STUDENT_PHOTO_KEY, ""));
  const [userProfileOpen, setUserProfileOpen] = useState(false);
  const [userFullName, setUserFullName] = useState(() => getLocalStorageValue(USER_FULL_NAME_KEY, ""));
  const [userPhone, setUserPhone] = useState(() => getLocalStorageValue(USER_PHONE_KEY, ""));
  const [userProfileOk, setUserProfileOk] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const read = () => {
      setStudentName(getLocalStorageValue("studentName", ""));
      setStudentBirthDate(getLocalStorageValue(STUDENT_BIRTHDATE_KEY, ""));
      setLegacyAge(getLocalStorageValue("studentAge", ""));
      setStudentPhotoDataUrl(getLocalStorageValue(STUDENT_PHOTO_KEY, ""));
    };
    read();
    window.addEventListener("storage", read);
    window.addEventListener(PROFILE_SYNC_EVENT, read);
    return () => {
      window.removeEventListener("storage", read);
      window.removeEventListener(PROFILE_SYNC_EVENT, read);
    };
  }, []);

  useEffect(() => {
    if (!session?.email) return;
    (async () => {
      try {
        const localName = getLocalStorageValue("studentName", "");
        const localBirthDate = getLocalStorageValue(STUDENT_BIRTHDATE_KEY, "");
        const localPhoto = getLocalStorageValue(STUDENT_PHOTO_KEY, "");
        const localHasData = Boolean(localName || localBirthDate || localPhoto);

        const remoteRes = await fetch("/api/profile", { method: "GET", cache: "no-store" });
        if (!remoteRes.ok) return;
        const remote = (await remoteRes.json().catch(() => ({}))) as {
          profile?: {
            profiles?: Array<{ id?: string; name?: string; birthDate?: string; age?: string; legacyAge?: string; photoDataUrl?: string }>;
            activeProfileId?: string;
          } | null;
        };
        const remoteProfiles = remote.profile?.profiles;
        const remoteActiveId = remote.profile?.activeProfileId;
        if (!Array.isArray(remoteProfiles) || remoteProfiles.length === 0 || typeof remoteActiveId !== "string" || !remoteActiveId) return;
        if (localHasData) {
          if (!localPhoto) {
            const active = remoteProfiles.find((p) => p?.id === remoteActiveId) ?? remoteProfiles[0] ?? null;
            const nextPhoto = typeof active?.photoDataUrl === "string" ? active.photoDataUrl : "";
            if (nextPhoto) {
              try {
                localStorage.setItem(STUDENT_PHOTO_KEY, nextPhoto);
              } catch {}
              setStudentPhotoDataUrl(nextPhoto);
              if (typeof window !== "undefined") window.dispatchEvent(new Event(PROFILE_SYNC_EVENT));
            }
          }
          return;
        }

        const active = remoteProfiles.find((p) => p?.id === remoteActiveId) ?? remoteProfiles[0] ?? null;
        const nextName = typeof active?.name === "string" ? active.name : "";
        const nextBirthDate =
          typeof active?.birthDate === "string"
            ? toDateInputValue(active.birthDate)
            : typeof active?.age === "string"
              ? ""
              : "";
        const nextLegacyAge = typeof active?.legacyAge === "string" ? active.legacyAge : typeof active?.age === "string" ? active.age : "";
        const nextPhoto = typeof active?.photoDataUrl === "string" ? active.photoDataUrl : "";
        try {
          localStorage.setItem("studentName", nextName);
          localStorage.setItem(STUDENT_BIRTHDATE_KEY, nextBirthDate);
          localStorage.setItem(STUDENT_PHOTO_KEY, nextPhoto);
          localStorage.setItem("profilesV1", JSON.stringify(remoteProfiles));
          localStorage.setItem("activeProfileV1", remoteActiveId);
          if (nextLegacyAge) localStorage.setItem("studentAge", nextLegacyAge);
          else localStorage.removeItem("studentAge");
        } catch {}
        setStudentName(nextName);
        setStudentBirthDate(nextBirthDate);
        setLegacyAge(nextLegacyAge);
        setStudentPhotoDataUrl(nextPhoto);
        if (typeof window !== "undefined") window.dispatchEvent(new Event(PROFILE_SYNC_EVENT));
      } catch {}
    })();
  }, [session?.email]);

  useEffect(() => {
    if (!session?.email) return;
    let cancelled = false;
    (async () => {
      try {
        const localFullName = getLocalStorageValue(USER_FULL_NAME_KEY, "");
        const localPhone = getLocalStorageValue(USER_PHONE_KEY, "");

        const res = await fetch("/api/user-meta", { method: "GET", cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json().catch(() => ({}))) as {
          meta?: { userFullName?: string; userPhone?: string } | null;
        };
        const meta = data.meta;

        if (!meta) {
          if (!localFullName && !localPhone) return;
          await fetch("/api/user-meta", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ userFullName: localFullName, userPhone: localPhone }),
          }).catch(() => {});
          return;
        }

        if (cancelled) return;
        const remoteFullName = typeof meta.userFullName === "string" ? meta.userFullName : "";
        const remotePhone = typeof meta.userPhone === "string" ? meta.userPhone : "";

        if (!localFullName && remoteFullName) {
          try {
            localStorage.setItem(USER_FULL_NAME_KEY, remoteFullName);
          } catch {}
          setUserFullName(remoteFullName);
        }
        if (!localPhone && remotePhone) {
          try {
            localStorage.setItem(USER_PHONE_KEY, remotePhone);
          } catch {}
          setUserPhone(remotePhone);
        }
      } catch {}
    })();
    return () => {
      cancelled = true;
    };
  }, [session?.email]);

  const modules = [
    {
      title: "Otizm Bilgilendirme",
      description: "Faydalı bilgiler",
      icon: Info,
      href: "/info",
      color: "bg-blue-100 text-blue-600 border-blue-200 hover:bg-blue-200",
    },
    {
      title: "Otizm Spektrum Bozukluğu",
      description: "OSB hakkında temel bilgiler",
      icon: HelpCircle,
      href: "/osb",
      color: "bg-cyan-100 text-cyan-700 border-cyan-200 hover:bg-cyan-200",
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
    setAuthBusy(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {}
    setCachedSession(null);
    kvkkSyncedForEmailRef.current = null;
    setAuthEmail("");
    setAuthPassword("");
    setAuthPassword2("");
    setAuthBusy(false);
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
    const showKvkkOverlay = typeof window !== "undefined" && !kvkkAccepted;
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-6 md:p-12" suppressHydrationWarning>
        {showKvkkOverlay && (
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
          <section className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden relative">
            <div className="absolute inset-0 z-0 pointer-events-none">
              <img src="/loogo.png" alt="" className="w-full h-full object-cover opacity-[0.08] dark:opacity-[0.06]" />
            </div>
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
                {!kvkkAccepted ? "KVKK Onayı Gerekli" : authMode === "login" ? "Giriş Yap" : "Kayıt Ol"}
              </button>
              {!kvkkAccepted && (
                <div className="text-xs font-bold text-zinc-500">
                  Devam etmek için KVKK Açık Rıza ekranında “Kabul Ediyorum” butonuna basın.
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-6 md:p-12" suppressHydrationWarning>
      {userProfileOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-zinc-950/80 backdrop-blur-md">
          <div className="bg-white dark:bg-zinc-900 w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800">
            <div className="p-8 border-b border-zinc-100 dark:border-zinc-800 flex items-start justify-between gap-6">
              <div>
                <h2 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">Profil</h2>
                <p className="text-zinc-500 font-bold text-sm mt-2">Kullanıcı bilgileri</p>
              </div>
              <button
                type="button"
                onClick={() => setUserProfileOpen(false)}
                className="px-5 py-3 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 font-black uppercase tracking-widest text-xs hover:opacity-90 transition-all"
              >
                Kapat
              </button>
            </div>

            <div className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                  <User size={16} /> Ad Soyad
                </label>
                <input
                  type="text"
                  value={userFullName}
                  onChange={(e) => setUserFullName(e.target.value)}
                  className="w-full p-4 rounded-2xl border-2 border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 font-bold focus:border-zinc-900 transition-all outline-none"
                  placeholder="Ad Soyad"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                  <Phone size={16} /> Telefon
                </label>
                <input
                  type="tel"
                  inputMode="tel"
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                  className="w-full p-4 rounded-2xl border-2 border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 font-bold focus:border-zinc-900 transition-all outline-none"
                  placeholder="05xx xxx xx xx"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                  <Mail size={16} /> E-Posta
                </label>
                <input
                  type="email"
                  value={session.email}
                  readOnly
                  className="w-full p-4 rounded-2xl border-2 border-zinc-100 dark:border-zinc-800 bg-zinc-100/70 dark:bg-zinc-950 font-bold text-zinc-700 dark:text-zinc-200"
                />
              </div>

              {userProfileOk && (
                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-900/30 text-emerald-700 dark:text-emerald-200 font-bold">
                  {userProfileOk}
                </div>
              )}

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    try {
                      localStorage.setItem(USER_FULL_NAME_KEY, userFullName.trim());
                      localStorage.setItem(USER_PHONE_KEY, userPhone.trim());
                    } catch {}
                    fetch("/api/user-meta", {
                      method: "POST",
                      headers: { "content-type": "application/json" },
                      body: JSON.stringify({ userFullName: userFullName.trim(), userPhone: userPhone.trim() }),
                    }).catch(() => {});
                    setUserProfileOk("Kaydedildi.");
                    window.setTimeout(() => setUserProfileOk(null), 1500);
                  }}
                  className="px-8 py-4 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-2xl font-black uppercase tracking-widest text-sm hover:opacity-90 transition-all"
                >
                  Kaydet
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <header className="max-w-5xl mx-auto mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden relative lg:col-span-2">
            <div className="absolute inset-0 z-0 pointer-events-none">
              <img src="/loogo.png" alt="" className="w-full h-full object-cover opacity-[0.12] dark:opacity-[0.08]" />
            </div>
            <div className="absolute top-0 right-0 p-8 opacity-5 z-0 pointer-events-none">
              <Users size={120} />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <h2 className="text-xs font-bold text-zinc-400 uppercase tracking-[0.2em]">Sistem Aktif</h2>
              </div>
              <h1 className="text-4xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">Aile Paneli</h1>
              <p className="text-zinc-500 font-medium mt-1 text-lg">Aile Yönetim Paneli</p>
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mt-3">
                Kullanıcı: <span className="lowercase">{userFullName || session.email}</span>
              </p>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs font-bold text-zinc-400 uppercase mb-2">Çocuğun Adı</p>
                    <p className="text-2xl font-black text-zinc-800 dark:text-zinc-100">{studentName || "Belirtilmedi"}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-zinc-400 uppercase mb-2">Doğum Tarihi</p>
                    <div className="space-y-1">
                      <p className="text-2xl font-black text-zinc-800 dark:text-zinc-100">
                        {formatBirthDate(studentBirthDate) || "Belirtilmedi"}
                      </p>
                      <div className="text-sm font-bold text-zinc-500 dark:text-zinc-400">
                        {(() => {
                          const age = computeAgeYears(studentBirthDate);
                          if (age !== null) return `${age} Yaşında`;
                          return legacyAge ? `${legacyAge} Yaşında` : "";
                        })()}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950">
                  {studentPhotoDataUrl ? (
                    <img src={studentPhotoDataUrl} alt="" className="w-full h-40 md:h-full object-cover" />
                  ) : (
                    <div className="w-full h-40 md:h-full flex items-center justify-center text-zinc-400 font-black text-xs uppercase tracking-widest">
                      Fotoğraf Yok
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {modules.map((module) => (
                  <Link
                    key={module.href}
                    href={module.href}
                    className={cn(
                      "group p-8 rounded-[2rem] border-2 transition-all active:scale-[0.98] flex flex-col items-start gap-6 shadow-sm hover:shadow-xl overflow-hidden relative",
                      module.color
                    )}
                  >
                    <div className="absolute inset-0 z-0 pointer-events-none">
                      <img src="/loogo.png" alt="" className="w-full h-full object-cover opacity-[0.12] dark:opacity-[0.08]" />
                    </div>
                    <div className="p-5 rounded-2xl bg-white/90 dark:bg-black/20 shadow-md group-hover:scale-110 transition-transform group-hover:rotate-3 relative z-10">
                      <module.icon size={36} />
                    </div>
                    <div className="relative z-10">
                      <h2 className="text-2xl font-black mb-2 tracking-tight">{module.title}</h2>
                      <p className="opacity-90 font-bold text-sm leading-snug">{module.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-900 p-6 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden relative h-full">
            <div className="absolute inset-0 z-0 pointer-events-none">
              <img src="/loogo.png" alt="" className="w-full h-full object-cover opacity-[0.10] dark:opacity-[0.06]" />
            </div>
            <div className="relative z-10 space-y-3 h-full flex flex-col">
              <Link
                href="/family"
                className="w-full px-5 py-4 rounded-2xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all text-zinc-700 dark:text-zinc-200 shadow-sm font-black uppercase tracking-widest text-[11px] sm:text-xs text-center flex items-center justify-center gap-2"
              >
                <Settings size={18} /> Ayarlar
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="w-full px-5 py-4 rounded-2xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-black uppercase tracking-widest text-[11px] sm:text-xs hover:opacity-90 transition-all shadow-sm whitespace-nowrap"
              >
                Çıkış
              </button>
              <button
                type="button"
                onClick={() => setUserProfileOpen(true)}
                className="w-full px-5 py-4 rounded-2xl bg-emerald-500 text-white font-black uppercase tracking-widest text-[11px] sm:text-xs hover:bg-emerald-600 transition-all shadow-sm whitespace-nowrap"
              >
                Profil
              </button>
              {session.email.trim().toLowerCase() === "zeynelguner@gmail.com" && (
                <Link
                  href="/admin"
                  className="w-full px-5 py-4 rounded-2xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all text-zinc-700 dark:text-zinc-200 shadow-sm font-black uppercase tracking-widest text-[11px] sm:text-xs text-center"
                >
                  Yönetim
                </Link>
              )}
              <div className="flex-1" />
            </div>
          </div>
        </div>
      </header>

      <footer className="max-w-5xl mx-auto mt-20 text-center text-zinc-400 text-sm font-bold uppercase tracking-widest">
        <p>© 2026 Otizm Destek Uygulaması - Tüm Hakları Saklıdır</p>
      </footer>
    </div>
  );
}
