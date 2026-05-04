"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Phone, ArrowLeft, User, PhoneCall, Save, Shield, Volume2, Settings2, Users, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const cleanPhone = (phone: string) => {
  return phone.replace(/\D/g, "");
};

const getLocalStorageValue = (key: string, fallback: string) => {
  if (typeof window === "undefined") return fallback;
  try {
    return localStorage.getItem(key) || fallback;
  } catch {
    return fallback;
  }
};

const setLocalStorageValue = (key: string, value: string) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, value);
  } catch {}
};

type Profile = {
  id: string;
  name: string;
  birthDate: string;
  familyNotes: string;
  educationNotes: string;
  legacyAge: string;
  photoDataUrl: string;
};

type SpeechSettings = {
  voiceURI: string | null;
  rate: number;
  pitch: number;
  volume: number;
};

type UiSettings = {
  largeButtons: boolean;
  highContrast: boolean;
  reduceMotion: boolean;
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

const writeJson = (key: string, value: unknown) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
};

const PROFILES_KEY = "profilesV1";
const ACTIVE_PROFILE_KEY = "activeProfileV1";
const UI_SETTINGS_KEY = "uiSettingsV1";
const SPEECH_SETTINGS_KEY = "speechSettingsV1";
const PARENT_LOCK_PIN_KEY = "parentLockPinV1";
const PARENT_LOCKED_KEY = "parentLockEnabledV1";
const PROFILE_SYNC_EVENT = "profile-sync-v1";
const STUDENT_BIRTHDATE_KEY = "studentBirthDate";
const STUDENT_PHOTO_KEY = "studentPhotoV1";

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

const normalizeProfiles = (raw: unknown): Profile[] => {
  if (!Array.isArray(raw)) return [];
  const out: Profile[] = [];
  for (const item of raw) {
    if (!item || typeof item !== "object") continue;
    const o = item as Record<string, unknown>;
    const id = typeof o.id === "string" ? o.id : "";
    if (!id) continue;
    const name = typeof o.name === "string" ? o.name : "";
    const familyNotes = typeof o.familyNotes === "string" ? o.familyNotes : "";
    const educationNotes = typeof o.educationNotes === "string" ? o.educationNotes : "";
    const birthDate = typeof o.birthDate === "string" ? toDateInputValue(o.birthDate) : "";
    const legacyAge = typeof o.legacyAge === "string" ? o.legacyAge : typeof o.age === "string" ? o.age : "";
    const photoDataUrl = typeof o.photoDataUrl === "string" ? o.photoDataUrl.slice(0, 200_000) : "";
    out.push({ id, name, birthDate, familyNotes, educationNotes, legacyAge, photoDataUrl });
  }
  return out;
};

const notifyProfileSync = () => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(PROFILE_SYNC_EVENT));
};

export default function FamilyPage() {
  const [themeMode, setThemeMode] = useState<"light" | "dark" | "system">("system");
  const [tab, setTab] = useState<"bilgiler" | "ayarlar">("bilgiler");
  const syncOnceRef = useRef(false);
  const metaSyncOnceRef = useRef(false);

  const [profiles, setProfiles] = useState<Profile[]>(() => {
    const fromStorageRaw = readJson<unknown>(PROFILES_KEY, []);
    const fromStorage = normalizeProfiles(fromStorageRaw);
    if (fromStorage.length > 0) return fromStorage;
    const name = getLocalStorageValue("studentName", "");
    const birthDate = getLocalStorageValue(STUDENT_BIRTHDATE_KEY, "");
    const legacyAge = getLocalStorageValue("studentAge", "");
    const familyNotes = getLocalStorageValue("familyNotes", "");
    const educationNotes = getLocalStorageValue("educationNotes", "");
    const photoDataUrl = getLocalStorageValue(STUDENT_PHOTO_KEY, "");
    return [{ id: "p1", name, birthDate: toDateInputValue(birthDate), familyNotes, educationNotes, legacyAge, photoDataUrl }];
  });

  const [activeProfileId, setActiveProfileId] = useState(() => getLocalStorageValue(ACTIVE_PROFILE_KEY, "p1"));

  const activeProfile = useMemo(() => {
    return profiles.find((p) => p.id === activeProfileId) ?? profiles[0] ?? null;
  }, [profiles, activeProfileId]);

  const [studentName, setStudentName] = useState(() => activeProfile?.name ?? getLocalStorageValue("studentName", ""));
  const [studentBirthDate, setStudentBirthDate] = useState(() => activeProfile?.birthDate ?? getLocalStorageValue(STUDENT_BIRTHDATE_KEY, ""));
  const [familyNotes, setFamilyNotes] = useState(() => activeProfile?.familyNotes ?? getLocalStorageValue("familyNotes", ""));
  const [educationNotes, setEducationNotes] = useState(() => activeProfile?.educationNotes ?? getLocalStorageValue("educationNotes", ""));
  const [studentPhotoDataUrl, setStudentPhotoDataUrl] = useState(() => activeProfile?.photoDataUrl ?? getLocalStorageValue(STUDENT_PHOTO_KEY, ""));

  const [instructorPhone, setInstructorPhone] = useState(() => getLocalStorageValue("instructorPhone", ""));
  const [doctorPhone, setDoctorPhone] = useState(() => getLocalStorageValue("doctorPhone", ""));
  const [isEditing, setIsEditing] = useState(false);

  const [uiSettings, setUiSettings] = useState<UiSettings>(() =>
    readJson<UiSettings>(UI_SETTINGS_KEY, { largeButtons: false, highContrast: false, reduceMotion: false })
  );
  const [speechSettings, setSpeechSettings] = useState<SpeechSettings>(() =>
    readJson<SpeechSettings>(SPEECH_SETTINGS_KEY, { voiceURI: null, rate: 1, pitch: 1, volume: 1 })
  );
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  const [parentPin, setParentPin] = useState(() => getLocalStorageValue(PARENT_LOCK_PIN_KEY, ""));
  const [parentLockEnabled, setParentLockEnabled] = useState(() => getLocalStorageValue(PARENT_LOCKED_KEY, "0") === "1");
  const [unlockPin, setUnlockPin] = useState("");
  const [unlockError, setUnlockError] = useState<string | null>(null);
  const [privacyBusy, setPrivacyBusy] = useState(false);
  const [privacyError, setPrivacyError] = useState<string | null>(null);
  const [privacyOk, setPrivacyOk] = useState<string | null>(null);
  const [passwordBusy, setPasswordBusy] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordOk, setPasswordOk] = useState<string | null>(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");

  const canEdit = !parentLockEnabled || unlockPin === parentPin || !parentPin;

  const setPhotoFromFile = async (file: File) => {
    if (typeof window === "undefined") return;
    if (!file.type.startsWith("image/")) return;
    const dataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(new Error("Dosya okunamadı."));
      reader.onload = () => resolve(typeof reader.result === "string" ? reader.result : "");
      reader.readAsDataURL(file);
    });
    if (!dataUrl) return;

    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const i = new Image();
      i.onload = () => resolve(i);
      i.onerror = () => reject(new Error("Görsel açılamadı."));
      i.src = dataUrl;
    });

    const max = 512;
    const w = img.naturalWidth || img.width;
    const h = img.naturalHeight || img.height;
    if (!w || !h) return;
    const scale = Math.min(1, max / Math.max(w, h));
    const outW = Math.max(1, Math.round(w * scale));
    const outH = Math.max(1, Math.round(h * scale));
    const canvas = document.createElement("canvas");
    canvas.width = outW;
    canvas.height = outH;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(img, 0, 0, outW, outH);
    const compressed = canvas.toDataURL("image/jpeg", 0.75).slice(0, 200_000);
    setStudentPhotoDataUrl(compressed);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("speechSynthesis" in window)) return;

    const loadVoices = () => {
      const v = window.speechSynthesis.getVoices();
      setVoices(v);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  useEffect(() => {
    if (syncOnceRef.current) return;
    syncOnceRef.current = true;
    let cancelled = false;
    (async () => {
      try {
        const meRes = await fetch("/api/auth/me", { method: "GET", cache: "no-store" });
        const me = (await meRes.json().catch(() => ({}))) as { session?: { email?: string } | null };
        if (!me.session?.email) return;

        const localHasData =
          Boolean(studentName || studentBirthDate || familyNotes || educationNotes) ||
          profiles.some((p) => Boolean(p.name || p.birthDate || p.familyNotes || p.educationNotes));

        const remoteRes = await fetch("/api/profile", { method: "GET", cache: "no-store" });
        const remote = (await remoteRes.json().catch(() => ({}))) as {
          profile?: { profiles?: unknown; activeProfileId?: string } | null;
        };
        const remoteProfiles = normalizeProfiles(remote.profile?.profiles);
        const remoteActiveId = remote.profile?.activeProfileId;

        const applyRemote = (nextProfiles: Profile[], nextActiveId: string) => {
          const active = nextProfiles.find((p) => p.id === nextActiveId) ?? nextProfiles[0] ?? null;
          setProfiles(nextProfiles);
          setActiveProfileId(nextActiveId);
          setStudentName(active?.name ?? "");
          setStudentBirthDate(active?.birthDate ?? "");
          setFamilyNotes(active?.familyNotes ?? "");
          setEducationNotes(active?.educationNotes ?? "");
          setStudentPhotoDataUrl(active?.photoDataUrl ?? "");
          writeJson(PROFILES_KEY, nextProfiles);
          try {
            localStorage.setItem(ACTIVE_PROFILE_KEY, nextActiveId);
            localStorage.setItem("studentName", active?.name ?? "");
            localStorage.setItem(STUDENT_BIRTHDATE_KEY, active?.birthDate ?? "");
            localStorage.setItem(STUDENT_PHOTO_KEY, active?.photoDataUrl ?? "");
            localStorage.setItem("familyNotes", active?.familyNotes ?? "");
            localStorage.setItem("educationNotes", active?.educationNotes ?? "");
            localStorage.removeItem("studentAge");
          } catch {}
          notifyProfileSync();
        };

        if (remoteProfiles.length > 0 && typeof remoteActiveId === "string" && remoteActiveId) {
          if (!localHasData && !cancelled) applyRemote(remoteProfiles, remoteActiveId);
          return;
        }

        if (!localHasData) return;
        await fetch("/api/profile", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ profiles, activeProfileId }),
        }).catch(() => {});
      } catch {}
    })();
    return () => {
      cancelled = true;
    };
  }, [activeProfileId, educationNotes, familyNotes, profiles, studentBirthDate, studentName]);

  useEffect(() => {
    if (metaSyncOnceRef.current) return;
    metaSyncOnceRef.current = true;
    let cancelled = false;
    (async () => {
      try {
        const localInstructor = getLocalStorageValue("instructorPhone", "");
        const localDoctor = getLocalStorageValue("doctorPhone", "");

        const res = await fetch("/api/user-meta", { method: "GET", cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json().catch(() => ({}))) as {
          meta?: { instructorPhone?: string; doctorPhone?: string } | null;
        };
        const meta = data.meta;

        if (!meta) {
          if (!localInstructor && !localDoctor) return;
          await fetch("/api/user-meta", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ instructorPhone: localInstructor, doctorPhone: localDoctor }),
          }).catch(() => {});
          return;
        }

        if (cancelled) return;
        const remoteInstructor = typeof meta.instructorPhone === "string" ? meta.instructorPhone : "";
        const remoteDoctor = typeof meta.doctorPhone === "string" ? meta.doctorPhone : "";

        if (!localInstructor && remoteInstructor) {
          try {
            localStorage.setItem("instructorPhone", remoteInstructor);
          } catch {}
          setInstructorPhone(remoteInstructor);
        }
        if (!localDoctor && remoteDoctor) {
          try {
            localStorage.setItem("doctorPhone", remoteDoctor);
          } catch {}
          setDoctorPhone(remoteDoctor);
        }
      } catch {}
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const selectProfile = (id: string) => {
    const profile = profiles.find((p) => p.id === id);
    if (!profile) return;
    setActiveProfileId(id);
    setStudentName(profile.name);
    setStudentBirthDate(profile.birthDate);
    setFamilyNotes(profile.familyNotes);
    setEducationNotes(profile.educationNotes);
    setStudentPhotoDataUrl(profile.photoDataUrl);
    try {
      localStorage.setItem(ACTIVE_PROFILE_KEY, id);
      localStorage.setItem(STUDENT_PHOTO_KEY, profile.photoDataUrl);
    } catch {}
    notifyProfileSync();
  };

  const saveAll = () => {
    if (!canEdit) return;

    setLocalStorageValue("studentName", studentName);
    setLocalStorageValue(STUDENT_BIRTHDATE_KEY, studentBirthDate);
    setLocalStorageValue(STUDENT_PHOTO_KEY, studentPhotoDataUrl);
    setLocalStorageValue("familyNotes", familyNotes);
    setLocalStorageValue("educationNotes", educationNotes);
    setLocalStorageValue("instructorPhone", instructorPhone);
    setLocalStorageValue("doctorPhone", doctorPhone);
    try {
      localStorage.removeItem("studentAge");
    } catch {}

    const nextProfiles = profiles.map((p) =>
      p.id === activeProfileId
        ? { ...p, name: studentName, birthDate: studentBirthDate, familyNotes, educationNotes, legacyAge: "", photoDataUrl: studentPhotoDataUrl }
        : p
    );
    setProfiles(nextProfiles);
    writeJson(PROFILES_KEY, nextProfiles);
    setLocalStorageValue(ACTIVE_PROFILE_KEY, activeProfileId);
    void fetch("/api/profile", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ profiles: nextProfiles, activeProfileId }),
    }).catch(() => {});
    void fetch("/api/user-meta", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ instructorPhone, doctorPhone }),
    }).catch(() => {});

    writeJson(UI_SETTINGS_KEY, uiSettings);
    writeJson(SPEECH_SETTINGS_KEY, speechSettings);

    localStorage.setItem(PARENT_LOCK_PIN_KEY, parentPin);
    localStorage.setItem(PARENT_LOCKED_KEY, parentLockEnabled ? "1" : "0");

    setIsEditing(false);
    notifyProfileSync();
  };

  const addProfile = () => {
    if (!canEdit) return;
    const id = `p${Math.floor(Date.now() / 1000)}`;
    const next: Profile = { id, name: "", birthDate: "", familyNotes: "", educationNotes: "", legacyAge: "", photoDataUrl: "" };
    const nextProfiles = [next, ...profiles];
    setProfiles(nextProfiles);
    setActiveProfileId(id);
    setStudentName(next.name);
    setStudentBirthDate(next.birthDate);
    setFamilyNotes(next.familyNotes);
    setEducationNotes(next.educationNotes);
    setStudentPhotoDataUrl(next.photoDataUrl);
    writeJson(PROFILES_KEY, nextProfiles);
    setLocalStorageValue(ACTIVE_PROFILE_KEY, id);
    setLocalStorageValue(STUDENT_PHOTO_KEY, "");
    setIsEditing(true);
  };

  const tryUnlock = () => {
    setUnlockError(null);
    if (!parentLockEnabled || !parentPin) return;
    if (unlockPin !== parentPin) {
      setUnlockError("PIN hatalı.");
      return;
    }
    setUnlockError(null);
  };

  useEffect(() => {
    try {
      const raw = localStorage.getItem("themeV1");
      if (raw === "dark") setThemeMode("dark");
      else if (raw === "light") setThemeMode("light");
      else setThemeMode("system");
    } catch {
      setThemeMode("system");
    }
  }, []);

  const applyThemeMode = (next: "light" | "dark") => {
    const root = document.documentElement;
    root.classList.remove("dark", "light");
    if (next === "dark") root.classList.add("dark");
    else root.classList.add("light");
    try {
      localStorage.setItem("themeV1", next);
    } catch {}
    setThemeMode(next);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-6 md:p-12">
      <header className="max-w-3xl mx-auto mb-12 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 shadow-sm hover:bg-zinc-50 transition-all"
          >
            <ArrowLeft size={28} />
          </Link>
          <div>
            <h1 className="text-3xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">Aile Paneli</h1>
            <p className="text-zinc-500 font-medium">Bilgileri Güncelle</p>
          </div>
        </div>
        
        <button
          onClick={() => (isEditing ? saveAll() : canEdit ? setIsEditing(true) : undefined)}
          className={cn(
            "flex items-center gap-2 px-8 py-4 rounded-2xl font-black transition-all shadow-lg active:scale-95",
            isEditing
              ? "bg-emerald-500 text-white hover:bg-emerald-600" 
              : "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:opacity-90"
          )}
          disabled={!canEdit && !isEditing}
          translate="no"
        >
          {isEditing ? (
            <>
              <Save size={24} /> <span translate="no" className="notranslate">Kaydet</span>
            </>
          ) : (
            <span translate="no" className="notranslate">Düzenle</span>
          )}
        </button>
      </header>

      <main className="max-w-3xl mx-auto space-y-8">
        <section className="bg-white dark:bg-zinc-900 p-3 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 shadow-sm flex gap-2">
          <button
            onClick={() => setTab("bilgiler")}
            className={cn(
              "flex-1 py-3 rounded-2xl font-black transition-all flex items-center justify-center text-center whitespace-nowrap",
              tab === "bilgiler" ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900" : "text-zinc-500"
            )}
          >
            Bilgiler
          </button>
          <button
            onClick={() => setTab("ayarlar")}
            className={cn(
              "flex-1 py-3 rounded-2xl font-black transition-all flex items-center justify-center gap-2 text-center whitespace-nowrap",
              tab === "ayarlar" ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900" : "text-zinc-500"
            )}
            translate="no"
          >
            <Settings2 size={18} /> <span translate="no" className="notranslate">Ayarlar</span>
          </button>
        </section>

        {parentLockEnabled && parentPin && !canEdit && (
          <section className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-[2rem] border border-amber-100 dark:border-amber-900/30 shadow-sm">
            <div className="flex items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <Shield className="text-amber-600" />
                <div>
                  <div className="font-black text-amber-900 dark:text-amber-100">Ebeveyn Kilidi Açık</div>
                  <div className="text-amber-700 dark:text-amber-200 font-bold text-sm">Düzenleme için PIN girin.</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <input
                  value={unlockPin}
                  onChange={(e) => setUnlockPin(e.target.value)}
                  className="w-32 p-3 rounded-2xl border border-amber-200 dark:border-amber-900/40 bg-white/70 dark:bg-zinc-950 font-black text-center tracking-widest"
                  inputMode="numeric"
                  placeholder="PIN"
                />
                <button
                  onClick={tryUnlock}
                  className="px-6 py-3 rounded-2xl bg-amber-600 text-white font-black hover:bg-amber-700 transition-all"
                >
                  Aç
                </button>
              </div>
            </div>
            {unlockError && <div className="mt-3 font-bold text-rose-700 dark:text-rose-200">{unlockError}</div>}
          </section>
        )}

        {tab === "bilgiler" && (
          <>
            <section className="bg-white dark:bg-zinc-900 p-8 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 shadow-xl">
          <div className="space-y-8">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Users className="text-zinc-400" />
                <div className="font-black text-zinc-700 dark:text-zinc-200">Çocuk Profili</div>
              </div>
              <button
                onClick={addProfile}
                className={cn(
                  "px-5 py-3 rounded-2xl font-black uppercase tracking-widest text-xs transition-all active:scale-95",
                  canEdit ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900" : "bg-zinc-200 text-zinc-500 cursor-not-allowed"
                )}
                disabled={!canEdit}
              >
                Profil Ekle
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {profiles.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => selectProfile(p.id)}
                  className={cn(
                    "p-4 rounded-2xl border-2 text-left transition-all active:scale-95",
                    p.id === activeProfileId
                      ? "bg-emerald-50 border-emerald-200 dark:bg-emerald-900/10 dark:border-emerald-900/30"
                      : "bg-zinc-50 border-zinc-100 dark:bg-zinc-800/40 dark:border-zinc-700 hover:border-zinc-200"
                  )}
                >
                  <div className="font-black text-zinc-800 dark:text-zinc-100">{p.name || "İsimsiz"}</div>
                  <div className="text-zinc-500 dark:text-zinc-400 font-bold text-sm">
                    {(() => {
                      const age = computeAgeYears(p.birthDate);
                      if (age !== null) return `${age} yaş`;
                      if (p.legacyAge) return `${p.legacyAge} yaş`;
                      return "Yaş yok";
                    })()}
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-xs font-black text-zinc-400 uppercase tracking-widest">Çocuğun Adı</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="w-full p-4 rounded-2xl border-2 border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 font-bold focus:border-zinc-900 transition-all outline-none"
                    />
                  ) : (
                    <p className="text-2xl font-black text-zinc-800 dark:text-zinc-100">{studentName || "..."}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-zinc-400 uppercase tracking-widest">Doğum Tarihi</label>
                  {isEditing ? (
                    <div className="space-y-2">
                      <input
                        type="date"
                        value={toDateInputValue(studentBirthDate)}
                        onChange={(e) => setStudentBirthDate(toDateInputValue(e.target.value))}
                        className="w-full p-4 rounded-2xl border-2 border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 font-bold focus:border-zinc-900 transition-all outline-none"
                      />
                      <div className="text-sm font-bold text-zinc-500 dark:text-zinc-400">
                        {(() => {
                          const age = computeAgeYears(studentBirthDate);
                          return age !== null ? `${age} Yaşında` : "";
                        })()}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <p className="text-2xl font-black text-zinc-800 dark:text-zinc-100">
                        {formatBirthDate(studentBirthDate) || "..."}
                      </p>
                      <div className="text-sm font-bold text-zinc-500 dark:text-zinc-400">
                        {(() => {
                          const age = computeAgeYears(studentBirthDate);
                          if (age !== null) return `${age} Yaşında`;
                          const legacy = activeProfile?.legacyAge ?? "";
                          return legacy ? `${legacy} Yaşında` : "";
                        })()}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-zinc-400 uppercase tracking-widest">Fotoğraf</label>
                <div className="aspect-square w-full rounded-3xl border-2 border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 overflow-hidden flex items-center justify-center">
                  {studentPhotoDataUrl ? (
                    <img src={studentPhotoDataUrl} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-zinc-400 font-black text-sm uppercase tracking-widest">Fotoğraf Yok</div>
                  )}
                </div>
                {isEditing && canEdit && (
                  <>
                    <input
                      id="student-photo-input"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) void setPhotoFromFile(f);
                        e.currentTarget.value = "";
                      }}
                      className="hidden"
                      style={{ display: "none" }}
                    />
                    <label
                      htmlFor="student-photo-input"
                      className="w-full inline-flex items-center justify-center px-6 py-4 rounded-2xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-black uppercase tracking-widest text-xs hover:opacity-90 transition-all cursor-pointer"
                      translate="no"
                    >
                      <span translate="no" className="notranslate">Fotoğraf Yükle</span>
                    </label>
                  </>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-zinc-400 uppercase tracking-widest">Aile Notları</label>
              {isEditing ? (
                <textarea
                  value={familyNotes}
                  onChange={(e) => setFamilyNotes(e.target.value)}
                  className="w-full p-4 rounded-2xl border-2 border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 font-bold focus:border-zinc-900 transition-all outline-none min-h-[120px]"
                />
              ) : (
                <div className="p-6 bg-amber-50 dark:bg-amber-900/10 rounded-2xl border border-amber-100 dark:border-amber-900/20">
                  <p className="text-amber-900 dark:text-amber-100 italic font-medium leading-relaxed">
                    &quot;{familyNotes || "Henüz not eklenmemiş."}&quot;
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-zinc-400 uppercase tracking-widest">Eğitim Notları</label>
              {isEditing ? (
                <textarea
                  value={educationNotes}
                  onChange={(e) => setEducationNotes(e.target.value)}
                  className="w-full p-4 rounded-2xl border-2 border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 font-bold focus:border-zinc-900 transition-all outline-none min-h-[120px]"
                />
              ) : (
                <div className="p-6 bg-sky-50 dark:bg-sky-900/10 rounded-2xl border border-sky-100 dark:border-sky-900/20">
                  <p className="text-sky-900 dark:text-sky-100 italic font-medium leading-relaxed">
                    &quot;{educationNotes || "Henüz eğitim notu eklenmemiş."}&quot;
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Emergency Contacts Section */}
        <section className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <h2 className="text-xl font-bold flex items-center gap-2 text-red-600 mb-6">
            <PhoneCall size={24} />
            Acil Durum Rehberi
          </h2>

          <div className="space-y-4">
            {/* Instructor Call */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase">
                Eğitmen
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  value={instructorPhone}
                  onChange={(e) => setInstructorPhone(e.target.value)}
                  className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950"
                />
              ) : (
                <a
                  href={instructorPhone ? `tel:${cleanPhone(instructorPhone)}` : "#"}
                  className={cn(
                    "w-full p-4 rounded-2xl border flex items-center justify-between font-bold transition-all active:scale-95",
                    instructorPhone
                      ? "bg-rose-50 border-rose-100 text-rose-700"
                      : "bg-zinc-50 border-zinc-100 text-zinc-400"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <User size={20} />
                    <span>{instructorPhone || "Numara Eklenmemiş"}</span>
                  </div>
                  <Phone size={20} />
                </a>
              )}
            </div>

            {/* Doctor Call */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase">
                Doktor
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  value={doctorPhone}
                  onChange={(e) => setDoctorPhone(e.target.value)}
                  className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950"
                />
              ) : (
                <a
                  href={doctorPhone ? `tel:${cleanPhone(doctorPhone)}` : "#"}
                  className={cn(
                    "w-full p-4 rounded-2xl border flex items-center justify-between font-bold transition-all active:scale-95",
                    doctorPhone
                      ? "bg-blue-50 border-blue-100 text-blue-700"
                      : "bg-zinc-50 border-zinc-100 text-zinc-400"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <User size={20} />
                    <span>{doctorPhone || "Numara Eklenmemiş"}</span>
                  </div>
                  <Phone size={20} />
                </a>
              )}
            </div>
          </div>
            </section>
          </>
        )}

        {tab === "ayarlar" && (
          <section className="bg-white dark:bg-zinc-900 p-8 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 shadow-xl space-y-8">
            <div className="flex items-center gap-3">
              <Volume2 className="text-zinc-400" />
              <h2 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">Ses Ayarları</h2>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-zinc-400 uppercase tracking-widest">Ses</label>
                <select
                  value={speechSettings.voiceURI ?? ""}
                  onChange={(e) => setSpeechSettings((prev) => ({ ...prev, voiceURI: e.target.value || null }))}
                  className="w-full p-4 rounded-2xl border-2 border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 font-bold focus:border-zinc-900 transition-all outline-none"
                  disabled={!canEdit}
                >
                  <option value="">Varsayılan</option>
                  {voices.map((v) => (
                    <option key={v.voiceURI} value={v.voiceURI}>
                      {v.name} ({v.lang})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-black text-zinc-400 uppercase tracking-widest">Hız</label>
                  <input
                    type="range"
                    min="0.6"
                    max="1.4"
                    step="0.05"
                    value={speechSettings.rate}
                    onChange={(e) => setSpeechSettings((prev) => ({ ...prev, rate: Number(e.target.value) }))}
                    className="w-full"
                    disabled={!canEdit}
                  />
                  <div className="font-black text-zinc-600 dark:text-zinc-300 text-sm">{speechSettings.rate.toFixed(2)}</div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-zinc-400 uppercase tracking-widest">Perde</label>
                  <input
                    type="range"
                    min="0.6"
                    max="1.4"
                    step="0.05"
                    value={speechSettings.pitch}
                    onChange={(e) => setSpeechSettings((prev) => ({ ...prev, pitch: Number(e.target.value) }))}
                    className="w-full"
                    disabled={!canEdit}
                  />
                  <div className="font-black text-zinc-600 dark:text-zinc-300 text-sm">{speechSettings.pitch.toFixed(2)}</div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-zinc-400 uppercase tracking-widest">Ses</label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={speechSettings.volume}
                    onChange={(e) => setSpeechSettings((prev) => ({ ...prev, volume: Number(e.target.value) }))}
                    className="w-full"
                    disabled={!canEdit}
                  />
                  <div className="font-black text-zinc-600 dark:text-zinc-300 text-sm">{speechSettings.volume.toFixed(2)}</div>
                </div>
              </div>
            </div>

            <div className="h-px bg-zinc-100 dark:bg-zinc-800" />

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Settings2 className="text-zinc-400" />
                <h2 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">Erişilebilirlik</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  type="button"
                  onClick={() => setUiSettings((p) => ({ ...p, largeButtons: !p.largeButtons }))}
                  className={cn(
                    "p-5 rounded-2xl border-2 font-black transition-all active:scale-95",
                    uiSettings.largeButtons
                      ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                      : "bg-zinc-50 border-zinc-100 dark:bg-zinc-800/40 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200",
                    !canEdit && "opacity-60 cursor-not-allowed"
                  )}
                  disabled={!canEdit}
                >
                  Büyük Buton
                </button>
                <button
                  type="button"
                  onClick={() => setUiSettings((p) => ({ ...p, highContrast: !p.highContrast }))}
                  className={cn(
                    "p-5 rounded-2xl border-2 font-black transition-all active:scale-95",
                    uiSettings.highContrast
                      ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                      : "bg-zinc-50 border-zinc-100 dark:bg-zinc-800/40 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200",
                    !canEdit && "opacity-60 cursor-not-allowed"
                  )}
                  disabled={!canEdit}
                >
                  Yüksek Kontrast
                </button>
                <button
                  type="button"
                  onClick={() => setUiSettings((p) => ({ ...p, reduceMotion: !p.reduceMotion }))}
                  className={cn(
                    "p-5 rounded-2xl border-2 font-black transition-all active:scale-95",
                    uiSettings.reduceMotion
                      ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                      : "bg-zinc-50 border-zinc-100 dark:bg-zinc-800/40 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200",
                    !canEdit && "opacity-60 cursor-not-allowed"
                  )}
                  disabled={!canEdit}
                >
                  Animasyon Azalt
                </button>
              </div>
              <div className="text-zinc-500 dark:text-zinc-400 font-bold text-sm">
                Bu ayarlar kaydedildikten sonra diğer sayfalarda da kullanılacaktır.
              </div>
            </div>

            <div className="h-px bg-zinc-100 dark:bg-zinc-800" />

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Shield className="text-zinc-400" />
                <h2 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">Ebeveyn Kilidi</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-black text-zinc-400 uppercase tracking-widest">PIN</label>
                  <input
                    value={parentPin}
                    onChange={(e) => setParentPin(e.target.value)}
                    className="w-full p-4 rounded-2xl border-2 border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 font-bold focus:border-zinc-900 transition-all outline-none"
                    inputMode="numeric"
                    placeholder="örn: 1234"
                    disabled={!canEdit && parentLockEnabled}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setParentLockEnabled((v) => !v)}
                  className={cn(
                    "p-5 rounded-2xl border-2 font-black transition-all active:scale-95",
                    parentLockEnabled
                      ? "bg-rose-50 border-rose-200 text-rose-700"
                      : "bg-emerald-50 border-emerald-200 text-emerald-700",
                    !canEdit && parentLockEnabled && "opacity-60 cursor-not-allowed"
                  )}
                  disabled={!canEdit && parentLockEnabled}
                >
                  {parentLockEnabled ? "Kilidi Kapat" : "Kilidi Aç"}
                </button>
              </div>
            </div>

            <div className="h-px bg-zinc-100 dark:bg-zinc-800" />

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Shield className="text-zinc-400" />
                <h2 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">Şifre</h2>
              </div>

              {(passwordError || passwordOk) && (
                <div
                  className={cn(
                    "p-4 rounded-2xl border font-bold",
                    passwordError
                      ? "bg-rose-50 border-rose-100 text-rose-700"
                      : "bg-emerald-50 border-emerald-100 text-emerald-700"
                  )}
                >
                  {passwordError ?? passwordOk}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-black text-zinc-400 uppercase tracking-widest">Mevcut</label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full p-4 rounded-2xl border-2 border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 font-bold focus:border-zinc-900 transition-all outline-none"
                    autoComplete="current-password"
                    disabled={!canEdit || passwordBusy}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-zinc-400 uppercase tracking-widest">Yeni</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full p-4 rounded-2xl border-2 border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 font-bold focus:border-zinc-900 transition-all outline-none"
                    autoComplete="new-password"
                    disabled={!canEdit || passwordBusy}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-zinc-400 uppercase tracking-widest">Tekrar</label>
                  <input
                    type="password"
                    value={newPassword2}
                    onChange={(e) => setNewPassword2(e.target.value)}
                    className="w-full p-4 rounded-2xl border-2 border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 font-bold focus:border-zinc-900 transition-all outline-none"
                    autoComplete="new-password"
                    disabled={!canEdit || passwordBusy}
                  />
                </div>
              </div>

              <button
                type="button"
                disabled={!canEdit || passwordBusy}
                onClick={async () => {
                  setPasswordError(null);
                  setPasswordOk(null);

                  if (!currentPassword) {
                    setPasswordError("Mevcut şifre gerekli.");
                    return;
                  }
                  if (!newPassword || newPassword.length < 8) {
                    setPasswordError("Yeni şifre en az 8 karakter olmalı.");
                    return;
                  }
                  if (newPassword !== newPassword2) {
                    setPasswordError("Yeni şifreler eşleşmiyor.");
                    return;
                  }

                  setPasswordBusy(true);
                  try {
                    const res = await fetch("/api/auth/change-password", {
                      method: "POST",
                      headers: { "content-type": "application/json" },
                      body: JSON.stringify({ currentPassword, newPassword, newPassword2 }),
                    });
                    const data = (await res.json().catch(() => ({}))) as { error?: string };
                    if (!res.ok) {
                      setPasswordError(typeof data.error === "string" ? data.error : "Şifre değiştirilemedi.");
                      return;
                    }
                    setPasswordOk("Şifre güncellendi.");
                    setCurrentPassword("");
                    setNewPassword("");
                    setNewPassword2("");
                  } catch (e) {
                    setPasswordError(e instanceof Error ? e.message : "Şifre değiştirilemedi.");
                  } finally {
                    setPasswordBusy(false);
                  }
                }}
                className={cn(
                  "p-5 rounded-2xl border-2 font-black transition-all active:scale-95",
                  !canEdit || passwordBusy
                    ? "bg-zinc-100 border-zinc-100 text-zinc-400 cursor-not-allowed"
                    : "bg-emerald-50 border-emerald-200 text-emerald-700"
                )}
              >
                Şifreyi Değiştir
              </button>
            </div>

            <div className="h-px bg-zinc-100 dark:bg-zinc-800" />

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Shield className="text-zinc-400" />
                <h2 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">Gizlilik</h2>
              </div>

              {(privacyError || privacyOk) && (
                <div
                  className={cn(
                    "p-4 rounded-2xl border font-bold",
                    privacyError
                      ? "bg-rose-50 border-rose-100 text-rose-700"
                      : "bg-emerald-50 border-emerald-100 text-emerald-700"
                  )}
                >
                  {privacyError ?? privacyOk}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  type="button"
                  disabled={privacyBusy}
                  onClick={async () => {
                    setPrivacyError(null);
                    setPrivacyOk(null);
                    setPrivacyBusy(true);
                    try {
                      const res = await fetch("/api/privacy/consent", {
                        method: "POST",
                        headers: { "content-type": "application/json" },
                        body: JSON.stringify({ version: 1 }),
                      });
                      const data = (await res.json().catch(() => ({}))) as { error?: string };
                      if (!res.ok) {
                        setPrivacyError(typeof data.error === "string" ? data.error : "KVKK kaydedilemedi.");
                        return;
                      }
                      setPrivacyOk("KVKK onayı kaydedildi.");
                    } catch (e) {
                      setPrivacyError(e instanceof Error ? e.message : "KVKK kaydedilemedi.");
                    } finally {
                      setPrivacyBusy(false);
                    }
                  }}
                  className={cn(
                    "p-5 rounded-2xl border-2 font-black transition-all active:scale-95",
                    privacyBusy
                      ? "bg-zinc-100 border-zinc-100 text-zinc-400 cursor-not-allowed"
                      : "bg-emerald-50 border-emerald-200 text-emerald-700"
                  )}
                >
                  KVKK Kaydet
                </button>

                <button
                  type="button"
                  disabled={privacyBusy}
                  onClick={async () => {
                    setPrivacyError(null);
                    setPrivacyOk(null);
                    const confirm = window.prompt('Hesabı silmek için "SIL" yazın:');
                    if (confirm !== "SIL") return;
                    const password = window.prompt("Şifrenizi girin (hesap silme için):");
                    if (!password) return;

                    setPrivacyBusy(true);
                    try {
                      const res = await fetch("/api/privacy/delete", {
                        method: "POST",
                        headers: { "content-type": "application/json" },
                        body: JSON.stringify({ confirm: "SIL", password }),
                      });
                      const data = (await res.json().catch(() => ({}))) as { error?: string };
                      if (!res.ok) {
                        setPrivacyError(typeof data.error === "string" ? data.error : "Hesap silinemedi.");
                        return;
                      }
                      window.location.href = "/";
                    } catch (e) {
                      setPrivacyError(e instanceof Error ? e.message : "Hesap silinemedi.");
                    } finally {
                      setPrivacyBusy(false);
                    }
                  }}
                  className={cn(
                    "p-5 rounded-2xl border-2 font-black transition-all active:scale-95",
                    privacyBusy
                      ? "bg-zinc-100 border-zinc-100 text-zinc-400 cursor-not-allowed"
                      : "bg-rose-50 border-rose-200 text-rose-700"
                  )}
                >
                  Hesabı Sil
                </button>

                <button
                  type="button"
                  disabled={privacyBusy}
                  onClick={() => applyThemeMode(themeMode === "dark" ? "light" : "dark")}
                  className={cn(
                    "p-5 rounded-2xl border-2 font-black transition-all active:scale-95 flex items-center justify-center gap-2",
                    privacyBusy
                      ? "bg-zinc-100 border-zinc-100 text-zinc-400 cursor-not-allowed"
                      : "bg-zinc-100 border-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100"
                  )}
                >
                  {themeMode === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                  {themeMode === "dark" ? "Beyaz Mod" : "Siyah Mod"}
                </button>
              </div>
            </div>
          </section>
        )}

      </main>
    </div>
  );
}
