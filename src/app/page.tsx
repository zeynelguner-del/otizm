"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { 
  Heart, 
  BookOpen, 
  Gamepad2, 
  Users, 
  Settings, 
  Music, 
  Calendar, 
  Info, 
  MessageSquare, 
  HelpCircle, 
  User, 
  Phone, 
  Mail, 
  AlarmClock, 
  Globe, 
  Waves, 
  LogOut, 
  LayoutDashboard, 
  Sparkles,
  Eye,
  Tv,
  Brain,
  Award,
  TrendingUp
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";


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

  const intelligenceModules = [
    {
      title: "Nesneleri Tanıyalım",
      description: "Meyveler, hayvanlar ve taşıtları eşleştir",
      icon: Eye,
      href: "/games/objects",
      color: "bg-red-50 text-red-700 border-red-100 dark:bg-red-950/20 dark:text-red-400 dark:border-red-900/30 hover:bg-red-100/50",
    },
    {
      title: "Taklit Oyunu",
      description: "Beden hareketlerini görsel olarak taklit et",
      icon: Tv,
      href: "/imitation",
      color: "bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/30 hover:bg-emerald-100/50",
    },
    {
      title: "Cümle Kur & Sesler",
      description: "Cümle kurmayı ve alfabe seslerini öğren",
      icon: Brain,
      href: "/sentence-sounds",
      color: "bg-purple-50 text-purple-700 border-purple-100 dark:bg-purple-950/20 dark:text-purple-400 dark:border-purple-900/30 hover:bg-purple-100/50",
    },
    {
      title: "Eğitim Hatırlatıcı",
      description: "7 günlük hatırlatıcı kurun ve takip edin",
      icon: AlarmClock,
      href: "/education-reminder",
      color: "bg-sky-50 text-sky-700 border-sky-100 dark:bg-sky-950/20 dark:text-sky-400 dark:border-sky-900/30 hover:bg-sky-100/50",
    },
  ];

  const therapyModules = [
    {
      title: "Eğitici Oyunlar",
      description: "Eğlenirken öğrenmeyi destekleyen aktiviteler",
      icon: Gamepad2,
      href: "/games",
      color: "bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-900/30 hover:bg-blue-100/50",
    },
    {
      title: "Duyusal Oda",
      description: "Rahatlatıcı ses, renk ve ritim odası",
      icon: Sparkles,
      href: "/duyusal-oda",
      color: "bg-pink-50 text-pink-700 border-pink-100 dark:bg-pink-950/20 dark:text-pink-400 dark:border-pink-900/30 hover:bg-pink-100/50",
    },
    {
      title: "Müzik ve Ses",
      description: "Ses taklitleri ve ritim çalışmaları",
      icon: Music,
      href: "/music",
      color: "bg-indigo-50 text-indigo-700 border-indigo-100 dark:bg-indigo-950/20 dark:text-indigo-400 dark:border-indigo-900/30 hover:bg-indigo-100/50",
    },
    {
      title: "Sosyal Öyküler",
      description: "Davranışsal ve sosyal gelişim hikayeleri",
      icon: BookOpen,
      href: "/stories",
      color: "bg-teal-50 text-teal-700 border-teal-100 dark:bg-teal-950/20 dark:text-teal-400 dark:border-teal-900/30 hover:bg-teal-100/50",
    },
    {
      title: "Duygularım",
      description: "Duygu durumlarını görselleştir ve takip et",
      icon: Heart,
      href: "/emotions",
      color: "bg-rose-50 text-rose-700 border-rose-100 dark:bg-rose-950/20 dark:text-rose-400 dark:border-rose-900/30 hover:bg-rose-100/50",
    },
  ];

  const guidanceModules = [
    {
      title: "İletişim Kartları",
      description: "Görsel ve sesli iletişim kartları (ACC)",
      icon: MessageSquare,
      href: "/acc",
      color: "bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/30 hover:bg-amber-100/50",
    },
    {
      title: "Takvim ve Program",
      description: "Günlük aktiviteler ve rutin yönetimi",
      icon: Calendar,
      href: "/calendar",
      color: "bg-orange-50 text-orange-700 border-orange-100 dark:bg-orange-950/20 dark:text-orange-400 dark:border-orange-900/30 hover:bg-orange-100/50",
    },
    {
      title: "Otizm Bilgilendirme",
      description: "Faydalı makaleler ve ebeveyn önerileri",
      icon: Info,
      href: "/info",
      color: "bg-cyan-50 text-cyan-700 border-cyan-100 dark:bg-cyan-950/20 dark:text-cyan-400 dark:border-cyan-900/30 hover:bg-cyan-100/50",
    },
    {
      title: "OSB Tanısı Nedir?",
      description: "OSB spektrumu hakkında tıbbi kılavuz",
      icon: HelpCircle,
      href: "/osb",
      color: "bg-zinc-50 text-zinc-700 border-zinc-100 dark:bg-zinc-950/20 dark:text-zinc-400 dark:border-zinc-800 hover:bg-zinc-100/50",
    },
    {
      title: "Eğitim Rehberi",
      description: "Spektruma uygun terapi yaklaşımları",
      icon: BookOpen,
      href: "/education",
      color: "bg-purple-50 text-purple-700 border-purple-100 dark:bg-purple-950/20 dark:text-purple-400 dark:border-purple-900/30 hover:bg-purple-100/50",
    },
    {
      title: "OSB Araştırmaları",
      description: "Spektrum üzerine küresel ve ulusal makaleler",
      icon: Globe,
      href: "/osb-research",
      color: "bg-lime-50 text-lime-700 border-lime-100 dark:bg-lime-950/20 dark:text-lime-400 dark:border-lime-900/30 hover:bg-lime-100/50",
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
      <div className="min-h-screen lg:h-screen lg:overflow-hidden bg-zinc-50 dark:bg-zinc-950 flex flex-col lg:flex-row relative" suppressHydrationWarning>
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

        {/* Sol Kolon - Tanıtım & Markalama */}
        <div className="hidden lg:flex lg:w-[45%] xl:w-[40%] bg-gradient-to-br from-zinc-900 via-slate-900 to-indigo-950 text-white p-8 xl:p-10 flex-col justify-between relative overflow-hidden">
          {/* Arka Plan Desenleri */}
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-500 rounded-full blur-[120px] opacity-20 pointer-events-none" />
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-500 rounded-full blur-[120px] opacity-20 pointer-events-none" />

          {/* Tanıtım Videosu */}
          <div className="relative z-10 flex flex-col items-center justify-center w-full mt-2 mb-6">
            <div className="overflow-hidden rounded-[1.8rem] border border-white/15 shadow-2xl w-full max-w-[320px] bg-indigo-950/40 backdrop-blur-sm relative">
              <video
                src="/otizeka_promo.mp4"
                poster="/otizeka-banner.jpg?v=3"
                controls
                playsInline
                className="w-full h-auto block"
              />
            </div>
            <span className="text-[10px] font-black text-white/50 uppercase tracking-widest mt-2">
              Uygulama Tanıtım Videosu
            </span>
          </div>

          {/* Vizyon Metinleri & Tanıtım */}
          <div className="relative z-10 my-auto space-y-5 lg:space-y-6">
            <div className="space-y-2">
              <span className="px-4 py-1 rounded-full bg-white/10 text-emerald-400 text-xs font-black uppercase tracking-widest inline-block">
                Otizm Destek Portalı
              </span>
              <h2 className="text-3xl xl:text-4xl font-black tracking-tight leading-tight">
                Çocuklarımızın <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Gelişim Yolculuğu</span> <br />
                Burada Başlıyor.
              </h2>
              <p className="text-zinc-400 font-medium text-sm xl:text-base leading-relaxed max-w-md">
                OtiZeka; otizm spektrumundaki çocuklarımızın eğitim, sosyal beceri, duygu takibi ve iletişim gelişimlerini modern yöntemlerle destekleyen kapsamlı bir dijital yardımcıdır.
              </p>
            </div>

            {/* Özellikler */}
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                  <Gamepad2 size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-xs xl:text-sm">Eğitici & Geliştirici Oyunlar</h4>
                  <p className="text-zinc-400 text-[11px] xl:text-xs mt-0.5">Eğlenirken öğrenmeyi destekleyen interaktif aktiviteler.</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400">
                  <Heart size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-xs xl:text-sm">Duygu & Rutin Takibi</h4>
                  <p className="text-zinc-400 text-[11px] xl:text-xs mt-0.5">Çocuğunuzun günlük duygu durumunu ve eğitim rutinlerini izleyin.</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-xs xl:text-sm">İletişim Kartları (AAC)</h4>
                  <p className="text-zinc-400 text-[11px] xl:text-xs mt-0.5">Dil ve konuşma becerilerini destekleyen görsel iletişim sistemi.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Alt Bilgi */}
          <div className="relative z-10 text-xs font-bold text-zinc-500 uppercase tracking-widest flex flex-wrap items-center gap-3">
            <span>© 2026 OtiZeka - Tüm Hakları Saklıdır</span>
            <span className="hidden sm:inline text-zinc-700">|</span>
            <Link href="/gizlilik" className="text-zinc-400 hover:text-emerald-400 underline transition-colors normal-case">
              Gizlilik Politikası
            </Link>
          </div>
        </div>

        {/* Sağ Kolon - Giriş / Kayıt Formu */}
        <div className="flex-1 flex flex-col justify-center items-center p-6 lg:p-12 bg-zinc-50 dark:bg-zinc-950 relative overflow-hidden">
          <div className="w-full max-w-md bg-white dark:bg-zinc-900 p-6 md:p-8 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden relative">


            <div className="relative z-10">
              {/* Card Header Branding */}
              <div className="flex flex-col items-center justify-center mb-5 text-center select-none">
                <div className="bg-zinc-50 dark:bg-zinc-950 p-2.5 rounded-[1.5rem] shadow-inner border border-zinc-100 dark:border-zinc-800 inline-block mb-2 hover:scale-105 transition-transform duration-300">
                  <img src="/otizeka-logo.png" alt="OtiZeka" className="h-9 w-auto object-contain" />
                </div>
                <h2 className="text-xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">
                  OtiZeka
                </h2>
                <p className="text-zinc-400 dark:text-zinc-500 text-xs font-bold uppercase tracking-widest mt-1">
                  Otizm Destek Uygulaması
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2 bg-zinc-100 dark:bg-zinc-800 p-1.5 rounded-2xl mb-5">
                <button
                  onClick={() => {
                    setAuthMode("login");
                    setAuthError(null);
                  }}
                  className={cn(
                    "py-3 rounded-xl font-black transition-all text-sm uppercase tracking-wider",
                    authMode === "login" ? "bg-white dark:bg-zinc-900 shadow text-zinc-900 dark:text-zinc-50" : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
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
                    "py-3 rounded-xl font-black transition-all text-sm uppercase tracking-wider",
                    authMode === "register"
                      ? "bg-white dark:bg-zinc-900 shadow text-zinc-900 dark:text-zinc-50"
                      : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                  )}
                >
                  Kayıt Ol
                </button>
              </div>

              <div className="space-y-4">
                {serverError && (
                  <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/30 text-amber-800 dark:text-amber-100 font-bold text-sm">
                    {serverError}
                  </div>
                )}
                
                <div className="space-y-1">
                  <label className="text-xs font-black text-zinc-400 uppercase tracking-widest">E-posta</label>
                  <input
                    type="email"
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key !== "Enter") return;
                      (authMode === "login" ? handleLogin : handleRegister)();
                    }}
                    className="w-full p-3 rounded-2xl border-2 border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 font-bold focus:border-emerald-500 dark:focus:border-emerald-500 transition-all outline-none text-zinc-800 dark:text-zinc-100"
                    placeholder="ornek@mail.com"
                    autoComplete="email"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-black text-zinc-400 uppercase tracking-widest">Şifre</label>
                  <input
                    type="password"
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key !== "Enter") return;
                      (authMode === "login" ? handleLogin : handleRegister)();
                    }}
                    className="w-full p-3 rounded-2xl border-2 border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 font-bold focus:border-emerald-500 dark:focus:border-emerald-500 transition-all outline-none text-zinc-800 dark:text-zinc-100"
                    placeholder="••••••"
                    autoComplete={authMode === "login" ? "current-password" : "new-password"}
                  />
                </div>

                {authMode === "register" && (
                  <div className="space-y-1">
                    <label className="text-xs font-black text-zinc-400 uppercase tracking-widest">Şifre (Tekrar)</label>
                    <input
                      type="password"
                      value={authPassword2}
                      onChange={(e) => setAuthPassword2(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key !== "Enter") return;
                        handleRegister();
                      }}
                      className="w-full p-3 rounded-2xl border-2 border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 font-bold focus:border-emerald-500 dark:focus:border-emerald-500 transition-all outline-none text-zinc-800 dark:text-zinc-100"
                      placeholder="••••••"
                      autoComplete="new-password"
                    />
                  </div>
                )}

                {authError && (
                  <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-900/30 text-rose-700 dark:text-rose-200 font-bold text-sm">
                    {authError}
                  </div>
                )}

                <button
                  disabled={authBusy || !kvkkAccepted}
                  onClick={authMode === "login" ? handleLogin : handleRegister}
                  className={cn(
                    "w-full px-6 py-3.5 rounded-2xl font-black uppercase tracking-widest text-sm transition-all shadow-md active:scale-95",
                    authBusy || !kvkkAccepted
                      ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-500 cursor-not-allowed"
                      : "bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/15"
                  )}
                >
                  {!kvkkAccepted ? "KVKK Onayı Gerekli" : authMode === "login" ? "Giriş Yap" : "Kayıt Ol"}
                </button>
                <h3 className="text-sm font-bold text-center mt-3">Uygulamamızı İndirin</h3>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-2">
                  <a href="https://apps.apple.com/tr/app/otizeka" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                    <img src="/badges/app-store-badge.svg" alt="App Store'dan İndir" className="h-10 w-auto" />
                  </a>
                  <a href="https://play.google.com/store/apps/details?id=com.otizeka" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                    <img src="/badges/google-play-badge.svg" alt="Google Play'den İndir" className="h-10 w-auto animate-pulse-subtle" />
                  </a>
                </div>
                {!kvkkAccepted && (
                  <div className="text-xs font-bold text-zinc-500 leading-normal">
                    Devam etmek için KVKK Açık Rıza ekranında “Kabul Ediyorum” butonuna basın.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col" suppressHydrationWarning>
      {/* Global Navbar */}
      <nav className="sticky top-0 z-40 w-full border-b border-zinc-200/80 dark:border-zinc-800/80 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md transition-colors">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Sol Kısım - OtiZeka Logo & Başlık */}
          <Link href="/" className="flex items-center gap-3.5 group select-none">
            <div className="bg-white p-2.5 rounded-2xl shadow-md border border-zinc-100 dark:border-zinc-800 transition-all duration-300 group-hover:scale-105">
              <img src="/otizeka-logo.png" alt="OtiZeka Logo" className="h-8 sm:h-9 w-auto object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 transition-colors group-hover:text-emerald-500">
                OtiZeka
              </span>
              <span className="text-[9px] font-black text-emerald-500 uppercase tracking-[0.2em] leading-none mt-0.5">
                PORTAL
              </span>
            </div>
          </Link>

          {/* Sağ Kısım - Menü & Profil */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col text-right mr-2">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Hoş Geldiniz</span>
              <span className="text-sm font-black text-zinc-800 dark:text-zinc-200">{userFullName || session.email}</span>
            </div>
            
            <button
              type="button"
              onClick={() => setUserProfileOpen(true)}
              className="px-5 py-3 rounded-2xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 text-xs font-black uppercase tracking-widest transition-all"
            >
              Profilim
            </button>
            
            <Link
              href="/family"
              className="px-5 py-3 rounded-2xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 text-xs font-black uppercase tracking-widest transition-all flex items-center gap-1.5"
            >
              <Settings size={14} /> Ayarlar
            </Link>



            <button
              type="button"
              onClick={handleLogout}
              className="p-3 rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 transition-all"
              title="Çıkış Yap"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </nav>

      {/* Profil Modalı */}
      {userProfileOpen && (
        <AnimatePresence>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-zinc-950/80 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white dark:bg-zinc-900 w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800"
            >
              <div className="p-8 border-b border-zinc-100 dark:border-zinc-800 flex items-start justify-between gap-6 relative overflow-hidden">

                <div className="relative z-10">
                  <h2 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">Profil</h2>
                  <p className="text-zinc-500 font-bold text-sm mt-2">Kullanıcı bilgileri</p>
                </div>
                <button
                  type="button"
                  onClick={() => setUserProfileOpen(false)}
                  className="relative z-10 px-5 py-3 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 font-black uppercase tracking-widest text-xs hover:opacity-90 transition-all"
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
                    className="w-full p-4 rounded-2xl border-2 border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 font-bold focus:border-emerald-500 transition-all outline-none"
                    placeholder="Ad Soyad"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                    <Phone size={16} /> Telefon
                  </label>
                  <input
                    type="text"
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    className="w-full p-4 rounded-2xl border-2 border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 font-bold focus:border-emerald-500 transition-all outline-none"
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
                    className="px-8 py-4 bg-emerald-500 text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-emerald-600 transition-all"
                  >
                    Kaydet
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}

      {/* Ana İçerik */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-6 py-10 space-y-12">
        
        {/* Aile Paneli Kahraman Bölümü (Premium Night-Blue Gradient) */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-indigo-950 via-slate-900 to-blue-950 p-8 sm:p-10 rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden relative text-white"
        >
          {/* Subtle decorative overlays */}
          <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent" />
          <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row gap-8 items-stretch justify-between">
            {/* Sol Bölüm - Aile ve Çocuk Bilgileri */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="w-2.5 h-2.5 bg-cyan-400 rounded-full animate-pulse" />
                  <h2 className="text-xs font-black text-cyan-400 uppercase tracking-[0.25em]">OtiZeka Premium Portal Aktif</h2>
                </div>
                <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-100 to-zinc-300">
                  Aile Yönetim Paneli
                </h1>
                <p className="text-zinc-400 font-bold mt-2 text-sm">
                  Çocuğunuzun pedagojik gelişim süreçlerini ve günlük aktivitelerini buradan takip edin.
                </p>
              </div>

              {/* Çocuğun Detayları Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 pt-6 border-t border-white/10">
                <div>
                  <span className="text-xs font-black text-zinc-500 uppercase tracking-widest block mb-1">Öğrenci Adı</span>
                  <p className="text-2xl font-black text-white">{studentName || "Belirtilmedi"}</p>
                </div>
                <div>
                  <span className="text-xs font-black text-zinc-500 uppercase tracking-widest block mb-1">Doğum Tarihi / Yaş</span>
                  <div className="flex items-baseline gap-2">
                    <p className="text-2xl font-black text-white">
                      {formatBirthDate(studentBirthDate) || "Belirtilmedi"}
                    </p>
                    <span className="text-xs font-black text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full uppercase tracking-wider">
                      {(() => {
                        const age = computeAgeYears(studentBirthDate);
                        if (age !== null) return `${age} Yaş`;
                        return legacyAge ? `${legacyAge} Yaş` : "Belirtilmedi";
                      })()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Günlük Gelişim Hedefi (Daily Progress Tracker) */}
              <div className="mt-8 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Award size={14} /> GÜNLÜK GELİŞİM HEDEFİ
                  </span>
                  <span className="text-xs font-black text-cyan-300 bg-cyan-400/10 px-2 py-0.5 rounded-md">
                    %80 Tamamlandı
                  </span>
                </div>
                
                {/* Custom Neon Progress Bar */}
                <div className="w-full h-3 bg-zinc-800/80 rounded-full overflow-hidden border border-white/5 shadow-inner">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "80%" }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.5)]" 
                  />
                </div>
                
                <p className="text-[11px] text-zinc-400 font-bold uppercase tracking-wide flex items-center gap-1.5">
                  <TrendingUp size={12} className="text-emerald-400" /> Bugün 4/5 eğitim modülü başarıyla tamamlandı. Harika!
                </p>
              </div>
            </div>

            {/* Sağ Bölüm - Çocuk Fotoğrafı */}
            <div className="w-full lg:w-72 flex justify-center lg:justify-end">
              <div className="w-full max-w-sm rounded-[2rem] overflow-hidden border border-white/10 bg-zinc-950/40 shadow-inner relative flex items-center justify-center p-2">
                {studentPhotoDataUrl ? (
                  <img
                    src={studentPhotoDataUrl}
                    alt={studentName}
                    className="block w-full h-64 object-cover rounded-2xl shadow-md border border-white/5"
                  />
                ) : (
                  <div className="w-full h-64 flex flex-col items-center justify-center text-zinc-500 font-bold p-6 text-center">
                    <div className="p-4 rounded-full bg-white/5 border border-white/10 text-zinc-500 mb-3 shadow-inner">
                      <User size={36} />
                    </div>
                    <span className="text-xs uppercase tracking-widest font-black">Profil Fotoğrafı Eklenmedi</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tanıtım Videosu Bölümü */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-[2.5rem] border border-zinc-200/80 dark:border-zinc-800/80 shadow-md flex flex-col md:flex-row items-center gap-6 sm:gap-8"
        >
          <div className="w-full md:w-80 shrink-0 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-950 relative shadow-inner">
            <video
              src="/otizeka_promo.mp4"
              poster="/otizeka-banner.jpg?v=3"
              controls
              playsInline
              className="w-full h-auto block"
            />
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.15em] bg-emerald-500/10 px-3 py-1 rounded-full">
                Rehber & Tanıtım
              </span>
            </div>
            <h2 className="text-xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
              OtiZeka Nedir ve Nasıl Çalışır?
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 font-bold text-xs sm:text-sm leading-relaxed">
              Çocuğunuzun gelişimini desteklemek, iletişim kartlarını etkin kullanmak ve günlük rutinleri düzenlemek için hazırladığımız bu kısa rehber videoyu izleyerek OtiZeka uygulamasının tüm özelliklerini kolayca keşfedebilirsiniz.
            </p>
          </div>
        </motion.div>

        {/* Kategorilere Ayrılmış Modüller */}
        <main className="space-y-16">
          
          {/* KATEGORİ 1: Zeka ve Gelişim */}
          <section className="space-y-6">
            <div className="border-b border-zinc-200 dark:border-zinc-800 pb-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <div>
                <span className="text-[10px] font-black text-rose-500 uppercase tracking-[0.25em] bg-rose-500/10 px-3 py-1 rounded-full">
                  Zeka Oyunları & Egzersizler
                </span>
                <h2 className="text-2xl font-black text-zinc-800 dark:text-zinc-100 tracking-tight mt-2.5">
                  Zeka ve Gelişim
                </h2>
              </div>
              <p className="text-zinc-400 font-bold text-xs sm:text-sm">Eğitici oyunlar, taklit becerileri ve kelime haznesi</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {intelligenceModules.map((m, idx) => (
                <motion.div
                  key={m.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.04 }}
                  className="h-full"
                >
                  <Link
                    href={m.href}
                    className={cn(
                      "group flex flex-col items-start justify-between p-6 sm:p-7 rounded-[2rem] border-2 transition-all active:scale-[0.98] shadow-sm hover:shadow-xl hover:-translate-y-1 relative overflow-hidden h-full min-h-[220px]",
                      m.color
                    )}
                  >
                    {/* İkon */}
                    <div className="p-4 rounded-2xl bg-white/95 dark:bg-black/25 shadow-sm group-hover:scale-110 transition-transform group-hover:rotate-3 relative z-10 mb-4">
                      <m.icon size={26} />
                    </div>
                    
                    {/* Metinler */}
                    <div className="relative z-10 w-full mt-auto">
                      <h3 className="text-lg font-black mb-1.5 tracking-tight group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2">
                        {m.title}
                      </h3>
                      <p className="opacity-75 font-bold text-xs leading-normal line-clamp-2">
                        {m.description}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>

          {/* KATEGORİ 2: Terapi ve Oyun */}
          <section className="space-y-6">
            <div className="border-b border-zinc-200 dark:border-zinc-800 pb-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <div>
                <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.25em] bg-blue-500/10 px-3 py-1 rounded-full">
                  Terapi & Dinlenme & Eğlence
                </span>
                <h2 className="text-2xl font-black text-zinc-800 dark:text-zinc-100 tracking-tight mt-2.5">
                  Terapi ve Oyun
                </h2>
              </div>
              <p className="text-zinc-400 font-bold text-xs sm:text-sm">Müzik terapisi, duyusal odalar ve sosyal hikayeler</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {therapyModules.map((m, idx) => (
                <motion.div
                  key={m.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.04 }}
                  className="h-full"
                >
                  <Link
                    href={m.href}
                    className={cn(
                      "group flex flex-col items-start justify-between p-6 sm:p-7 rounded-[2rem] border-2 transition-all active:scale-[0.98] shadow-sm hover:shadow-xl hover:-translate-y-1 relative overflow-hidden h-full min-h-[220px]",
                      m.color
                    )}
                  >
                    {/* İkon */}
                    <div className="p-4 rounded-2xl bg-white/95 dark:bg-black/25 shadow-sm group-hover:scale-110 transition-transform group-hover:rotate-3 relative z-10 mb-4">
                      <m.icon size={26} />
                    </div>
                    
                    {/* Metinler */}
                    <div className="relative z-10 w-full mt-auto">
                      <h3 className="text-lg font-black mb-1.5 tracking-tight group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2">
                        {m.title}
                      </h3>
                      <p className="opacity-75 font-bold text-xs leading-normal line-clamp-2">
                        {m.description}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>

          {/* KATEGORİ 3: Rehberlik ve Takip */}
          <section className="space-y-6">
            <div className="border-b border-zinc-200 dark:border-zinc-800 pb-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <div>
                <span className="text-[10px] font-black text-amber-500 uppercase tracking-[0.25em] bg-amber-500/10 px-3 py-1 rounded-full">
                  Veli Destek, Takvim & Kılavuzlar
                </span>
                <h2 className="text-2xl font-black text-zinc-800 dark:text-zinc-100 tracking-tight mt-2.5">
                  Rehberlik ve Takip
                </h2>
              </div>
              <p className="text-zinc-400 font-bold text-xs sm:text-sm">Otizm spektrum bilgilendirmeleri, takvim ve tıp makaleleri</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {guidanceModules.map((m, idx) => (
                <motion.div
                  key={m.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.04 }}
                  className="h-full"
                >
                  <Link
                    href={m.href}
                    className={cn(
                      "group flex flex-col items-start justify-between p-6 sm:p-7 rounded-[2rem] border-2 transition-all active:scale-[0.98] shadow-sm hover:shadow-xl hover:-translate-y-1 relative overflow-hidden h-full min-h-[220px]",
                      m.color
                    )}
                  >
                    {/* İkon */}
                    <div className="p-4 rounded-2xl bg-white/95 dark:bg-black/25 shadow-sm group-hover:scale-110 transition-transform group-hover:rotate-3 relative z-10 mb-4">
                      <m.icon size={26} />
                    </div>
                    
                    {/* Metinler */}
                    <div className="relative z-10 w-full mt-auto">
                      <h3 className="text-lg font-black mb-1.5 tracking-tight group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2">
                        {m.title}
                      </h3>
                      <p className="opacity-75 font-bold text-xs leading-normal line-clamp-2">
                        {m.description}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        </main>
      </div>

      {/* Footer */}
      <footer className="w-full border-t border-zinc-200/50 dark:border-zinc-800/50 bg-white/30 dark:bg-zinc-950/30 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-400 text-xs font-bold uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <img src="/otizeka-logo.png" alt="OtiZeka" className="h-4 w-auto grayscale opacity-50" />
            <span>© 2026 OtiZeka</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/gizlilik" className="hover:text-emerald-500 underline transition-colors normal-case">
              Gizlilik Politikası
            </Link>
            <span className="hidden sm:inline text-zinc-700">|</span>
            <p>Tüm Hakları Saklıdır</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
