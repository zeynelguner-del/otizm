"use client";
import {
  ArrowLeft,
  MessageSquare,
  Utensils,
  Droplets,
  Home,
  Bath,
  Shirt,
  Smile,
  Frown,
  LogOut,
  Moon,
  Sun,
  HelpCircle,
  Phone,
  User,
  CheckCircle2,
  X,
  RefreshCw,
  Heart,
  BookOpen,
  Music,
  Gamepad2,
  Calendar,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

type SpeechSettings = {
  voiceURI: string | null;
  rate: number;
  pitch: number;
  volume: number;
};

type Card = {
  id: string;
  label: string;
  icon?: typeof MessageSquare;
  emoji?: string;
  imageDataUrl?: string;
  color: string;
};

type Category = {
  title: string;
  cards: Card[];
};

const SPEECH_SETTINGS_KEY = "speechSettingsV1";
const CUSTOM_CARDS_KEY = "accCustomCardsV1";
const FAVORITES_KEY = "accFavoritesV1";

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

const BASE_CATEGORIES: Category[] = [
  {
    title: "Temel İhtiyaçlar",
    cards: [
      { id: "need-water", label: "Su", icon: Droplets, color: "bg-blue-100 text-blue-600 border-blue-200" },
      { id: "need-hungry", label: "Acıktım", icon: Utensils, color: "bg-orange-100 text-orange-600 border-orange-200" },
      { id: "need-toilet", label: "Tuvalet", icon: Bath, color: "bg-zinc-100 text-zinc-600 border-zinc-200" },
      { id: "need-sleepy", label: "Uykum Geldi", icon: Moon, color: "bg-indigo-100 text-indigo-600 border-indigo-200" },
      { id: "need-thirsty", label: "Susadım", icon: Droplets, color: "bg-cyan-100 text-cyan-700 border-cyan-200" },
      { id: "need-break", label: "Ara Vermek", icon: RefreshCw, color: "bg-emerald-100 text-emerald-600 border-emerald-200" },
      { id: "need-help", label: "Yardım", icon: HelpCircle, color: "bg-amber-100 text-amber-700 border-amber-200" },
      { id: "need-hug", label: "Sarılmak", icon: Heart, color: "bg-rose-100 text-rose-600 border-rose-200" },
    ],
  },
  {
    title: "Duygular",
    cards: [
      { id: "emo-happy", label: "Mutluyum", icon: Smile, color: "bg-yellow-100 text-yellow-600 border-yellow-200" },
      { id: "emo-sad", label: "Üzgünüm", icon: Frown, color: "bg-blue-100 text-blue-600 border-blue-200" },
      { id: "emo-afraid", label: "Korkuyorum", icon: Moon, color: "bg-purple-100 text-purple-600 border-purple-200" },
      { id: "emo-excited", label: "Heyecanlıyım", icon: Sun, color: "bg-orange-100 text-orange-600 border-orange-200" },
      { id: "emo-angry", label: "Kızgınım", icon: X, color: "bg-rose-100 text-rose-600 border-rose-200" },
      { id: "emo-calm", label: "Sakinim", icon: CheckCircle2, color: "bg-emerald-100 text-emerald-600 border-emerald-200" },
      { id: "emo-tired", label: "Yorgunum", icon: Moon, color: "bg-zinc-100 text-zinc-700 border-zinc-200" },
      { id: "emo-surprised", label: "Şaşkınım", icon: Sparkles, color: "bg-violet-100 text-violet-700 border-violet-200" },
    ],
  },
  {
    title: "Yer ve Eylem",
    cards: [
      { id: "act-home", label: "Eve Gidelim", icon: Home, color: "bg-emerald-100 text-emerald-600 border-emerald-200" },
      { id: "act-outside", label: "Dışarı Çıkalım", icon: LogOut, color: "bg-rose-100 text-rose-600 border-rose-200" },
      { id: "act-dress", label: "Giyinmek", icon: Shirt, color: "bg-sky-100 text-sky-600 border-sky-200" },
      { id: "act-park", label: "Parka Gidelim", icon: Sun, color: "bg-amber-100 text-amber-600 border-amber-200" },
      { id: "act-school", label: "Okula Gidelim", icon: BookOpen, color: "bg-indigo-100 text-indigo-600 border-indigo-200" },
      { id: "act-music", label: "Müzik Aç", icon: Music, color: "bg-purple-100 text-purple-600 border-purple-200" },
      { id: "act-play", label: "Oyun Oynamak", icon: Gamepad2, color: "bg-sky-100 text-sky-600 border-sky-200" },
      { id: "act-calendar", label: "Takvime Bakalım", icon: Calendar, color: "bg-amber-100 text-amber-700 border-amber-200" },
    ],
  },
  {
    title: "İletişim",
    cards: [
      { id: "com-me", label: "Ben", icon: User, color: "bg-zinc-100 text-zinc-700 border-zinc-200" },
      { id: "com-call", label: "Telefon Et", icon: Phone, color: "bg-emerald-100 text-emerald-700 border-emerald-200" },
      { id: "com-please", label: "Lütfen", icon: HelpCircle, color: "bg-amber-100 text-amber-700 border-amber-200" },
      { id: "com-thanks", label: "Teşekkür Ederim", icon: Heart, color: "bg-rose-100 text-rose-600 border-rose-200" },
      { id: "com-yes", label: "Evet", icon: CheckCircle2, color: "bg-emerald-100 text-emerald-600 border-emerald-200" },
      { id: "com-no", label: "Hayır", icon: X, color: "bg-rose-100 text-rose-600 border-rose-200" },
    ],
  },
];

export default function ACCPage() {
  const [lastMessage, setLastMessage] = useState("");
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [speechSettings] = useState<SpeechSettings>(() =>
    readJson<SpeechSettings>(SPEECH_SETTINGS_KEY, { voiceURI: null, rate: 1, pitch: 1, volume: 1 })
  );

  const [favorites, setFavorites] = useState<string[]>(() => readJson<string[]>(FAVORITES_KEY, []));
  const [customCards, setCustomCards] = useState<Card[]>(() => readJson<Card[]>(CUSTOM_CARDS_KEY, []));

  const customCardIdSet = useMemo(() => new Set(customCards.map((c) => c.id)), [customCards]);

  const [customLabel, setCustomLabel] = useState("");
  const [customEmoji, setCustomEmoji] = useState("");
  const [customColor, setCustomColor] = useState("bg-zinc-100 text-zinc-700 border-zinc-200");
  const [customImageDataUrl, setCustomImageDataUrl] = useState<string | null>(null);

  const [sentenceWho, setSentenceWho] = useState<string | null>("Ben");
  const [sentenceWhat, setSentenceWhat] = useState<string | null>(null);
  const [sentenceWhere, setSentenceWhere] = useState<string | null>(null);
  const [sentenceWhen, setSentenceWhen] = useState<string | null>(null);
  const [sentenceVerb, setSentenceVerb] = useState<string | null>("istiyorum");

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

  const toggleFavorite = (cardId: string) => {
    setFavorites((prev) => {
      const next = prev.includes(cardId) ? prev.filter((x) => x !== cardId) : [cardId, ...prev];
      writeJson(FAVORITES_KEY, next);
      return next;
    });
  };

  const speak = (text: string) => {
    setLastMessage(text);
    if ("speechSynthesis" in window) {
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
    }
  };

  const favoritesCategory: Category | null = useMemo(() => {
    if (favorites.length === 0) return null;
    const all = BASE_CATEGORIES.flatMap((c) => c.cards);
    const byId = new Map(all.map((c) => [c.id, c]));
    const favoriteCards = favorites
      .map((id) => byId.get(id))
      .filter(Boolean)
      .map((c) => c as Card);
    if (favoriteCards.length === 0) return null;
    return { title: "Favoriler", cards: favoriteCards };
  }, [favorites]);

  const customCategory: Category | null = useMemo(() => {
    if (customCards.length === 0) return null;
    return { title: "Özel Kartlar", cards: customCards };
  }, [customCards]);

  const categories = useMemo(() => {
    const next: Category[] = [];
    if (favoritesCategory) next.push(favoritesCategory);
    if (customCategory) next.push(customCategory);
    next.push(...BASE_CATEGORIES);
    return next;
  }, [favoritesCategory, customCategory]);

  const sentenceText = useMemo(() => {
    const parts: string[] = [];
    if (sentenceWho) parts.push(sentenceWho);
    if (sentenceWhat) parts.push(sentenceWhat);
    if (sentenceWhere) parts.push(sentenceWhere);
    if (sentenceWhen) parts.push(sentenceWhen);
    if (sentenceVerb) parts.push(sentenceVerb);
    if (parts.length === 0) return "";
    return `${parts.join(" ")}.`;
  }, [sentenceWho, sentenceWhat, sentenceWhere, sentenceWhen, sentenceVerb]);

  const saveCustomCard = () => {
    const label = customLabel.trim();
    if (!label) return;
    const id = `custom-${Math.floor(Date.now() / 1000)}-${Math.random().toString(16).slice(2)}`;
    const emoji = customEmoji.trim() || undefined;
    const card: Card = { id, label, emoji, imageDataUrl: customImageDataUrl ?? undefined, color: customColor };
    setCustomCards((prev) => {
      const next = [card, ...prev];
      writeJson(CUSTOM_CARDS_KEY, next);
      return next;
    });
    setCustomLabel("");
    setCustomEmoji("");
    setCustomImageDataUrl(null);
  };

  const deleteCustomCard = (cardId: string) => {
    setCustomCards((prev) => {
      const next = prev.filter((c) => c.id !== cardId);
      writeJson(CUSTOM_CARDS_KEY, next);
      return next;
    });
    setFavorites((prev) => {
      if (!prev.includes(cardId)) return prev;
      const next = prev.filter((x) => x !== cardId);
      writeJson(FAVORITES_KEY, next);
      return next;
    });
  };

  const onPickCustomImage = (file: File | null) => {
    if (!file) {
      setCustomImageDataUrl(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : null;
      setCustomImageDataUrl(result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-6 md:p-12">
      <header className="max-w-5xl mx-auto mb-12 flex flex-col gap-8">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 shadow-sm hover:bg-zinc-50 transition-all"
          >
            <ArrowLeft size={28} />
          </Link>
          <div>
            <h1 className="text-3xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">ACC İletişim Kartları</h1>
            <p className="text-zinc-500 font-medium">Kendini ifade etmene yardımcı olur</p>
          </div>
        </div>

        {/* Selected Message Display */}
        <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border-4 border-zinc-900 dark:border-zinc-100 shadow-2xl flex items-center justify-center min-h-[120px]">
          <p className="text-4xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight text-center">
            {lastMessage || "Bir karta dokun..."}
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto space-y-12">
        <section className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-xl space-y-6">
          <h2 className="text-xl font-black text-zinc-400 uppercase tracking-widest px-2">Cümle Kur</h2>

          <div className="p-6 rounded-3xl border-2 border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 font-black text-2xl text-zinc-900 dark:text-zinc-50">
            {sentenceText || "…"}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="text-xs font-black text-zinc-400 uppercase tracking-widest">Kim?</div>
              <div className="flex flex-wrap gap-2">
                {["Ben", "Sen", "O"].map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setSentenceWho((prev) => (prev === v ? null : v))}
                    className={cn(
                      "px-5 py-3 rounded-2xl border-2 font-black transition-all active:scale-95",
                      sentenceWho === v
                        ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                        : "bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 text-zinc-700 dark:text-zinc-200"
                    )}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-xs font-black text-zinc-400 uppercase tracking-widest">Ne yapıyorum?</div>
              <div className="flex flex-wrap gap-2">
                {["istiyorum", "istemiyorum", "istiyor", "istemiyor", "ara vermek istiyorum"].map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setSentenceVerb((prev) => (prev === v ? null : v))}
                    className={cn(
                      "px-5 py-3 rounded-2xl border-2 font-black transition-all active:scale-95",
                      sentenceVerb === v
                        ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                        : "bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 text-zinc-700 dark:text-zinc-200"
                    )}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-xs font-black text-zinc-400 uppercase tracking-widest">Ne?</div>
              <div className="flex flex-wrap gap-2">
                {["Su", "Yemek", "Tuvalet", "Sarılmak", "Müzik", "Oyun"].map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setSentenceWhat((prev) => (prev === v ? null : v))}
                    className={cn(
                      "px-5 py-3 rounded-2xl border-2 font-black transition-all active:scale-95",
                      sentenceWhat === v
                        ? "bg-amber-50 border-amber-200 text-amber-700"
                        : "bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 text-zinc-700 dark:text-zinc-200"
                    )}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-xs font-black text-zinc-400 uppercase tracking-widest">Nerede / Ne zaman?</div>
              <div className="flex flex-wrap gap-2">
                {["Evde", "Okulda", "Parkta", "Şimdi", "Birazdan"].map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => {
                      if (v === "Evde" || v === "Okulda" || v === "Parkta") setSentenceWhere((prev) => (prev === v ? null : v));
                      else setSentenceWhen((prev) => (prev === v ? null : v));
                    }}
                    className={cn(
                      "px-5 py-3 rounded-2xl border-2 font-black transition-all active:scale-95",
                      sentenceWhere === v || sentenceWhen === v
                        ? "bg-indigo-50 border-indigo-200 text-indigo-700"
                        : "bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 text-zinc-700 dark:text-zinc-200"
                    )}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-xs font-black text-zinc-400 uppercase tracking-widest">Hızlı</div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setSentenceVerb((prev) => (prev === "yardım istiyorum" ? null : "yardım istiyorum"))}
                className={cn(
                  "px-5 py-3 rounded-2xl border-2 font-black transition-all active:scale-95",
                  sentenceVerb === "yardım istiyorum"
                    ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                    : "bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 text-zinc-700 dark:text-zinc-200"
                )}
              >
                yardım istiyorum
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => {
                const text = sentenceText.trim();
                if (!text) return;
                speak(text);
              }}
              className="px-8 py-4 rounded-2xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-black uppercase tracking-widest text-xs transition-all active:scale-95"
            >
              Konuş
            </button>
            <button
              type="button"
              onClick={() => {
                setSentenceWhat(null);
                setSentenceWhere(null);
                setSentenceWhen(null);
                setSentenceVerb(null);
                setSentenceWho(null);
              }}
              className="px-8 py-4 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-100 font-black uppercase tracking-widest text-xs transition-all active:scale-95"
            >
              Temizle
            </button>
          </div>
        </section>

        <section className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-xl space-y-6">
          <h2 className="text-xl font-black text-zinc-400 uppercase tracking-widest px-2">Özel Kart Ekle</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-zinc-400 uppercase tracking-widest">Yazı</label>
              <input
                value={customLabel}
                onChange={(e) => setCustomLabel(e.target.value)}
                className="w-full p-4 rounded-2xl border-2 border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 font-bold focus:border-zinc-900 transition-all outline-none"
                placeholder="örn: Su istiyorum"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-zinc-400 uppercase tracking-widest">Emoji (opsiyonel)</label>
              <input
                value={customEmoji}
                onChange={(e) => setCustomEmoji(e.target.value)}
                className="w-full p-4 rounded-2xl border-2 border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 font-bold focus:border-zinc-900 transition-all outline-none"
                placeholder="örn: 💧"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-zinc-400 uppercase tracking-widest">Resim (opsiyonel)</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => onPickCustomImage(e.target.files?.[0] ?? null)}
                className="w-full p-4 rounded-2xl border-2 border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 font-bold"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-zinc-400 uppercase tracking-widest">Renk</label>
              <select
                value={customColor}
                onChange={(e) => setCustomColor(e.target.value)}
                className="w-full p-4 rounded-2xl border-2 border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 font-bold focus:border-zinc-900 transition-all outline-none"
              >
                <option value="bg-zinc-100 text-zinc-700 border-zinc-200">Gri</option>
                <option value="bg-blue-100 text-blue-600 border-blue-200">Mavi</option>
                <option value="bg-emerald-100 text-emerald-600 border-emerald-200">Yeşil</option>
                <option value="bg-amber-100 text-amber-700 border-amber-200">Sarı</option>
                <option value="bg-rose-100 text-rose-600 border-rose-200">Pembe</option>
                <option value="bg-purple-100 text-purple-600 border-purple-200">Mor</option>
              </select>
            </div>
          </div>
          {customImageDataUrl && (
            <div className="p-4 rounded-3xl border-2 border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950">
              <img src={customImageDataUrl} alt="Önizleme" className="max-h-48 rounded-2xl mx-auto object-contain" />
            </div>
          )}
          <button
            type="button"
            onClick={saveCustomCard}
            className="px-8 py-4 rounded-2xl bg-emerald-500 text-white font-black uppercase tracking-widest text-xs hover:bg-emerald-600 transition-all active:scale-95"
          >
            Kaydet
          </button>
        </section>

        {categories.map((category, idx) => (
          <section key={idx}>
            <h2 className="text-xl font-black text-zinc-400 uppercase tracking-widest mb-6 px-2">
              {category.title}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {category.cards.map((card, i) => (
                <button
                  key={card.id ?? i}
                  onClick={() => speak(card.label)}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    toggleFavorite(card.id);
                  }}
                  className={cn(
                    "group flex flex-col items-center gap-6 p-8 rounded-[2.5rem] border-2 transition-all active:scale-90 shadow-sm hover:shadow-xl relative",
                    card.color,
                    favorites.includes(card.id) && "ring-4 ring-amber-400/30"
                  )}
                >
                  {customCardIdSet.has(card.id) && (
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!window.confirm("Bu kartı silmek istiyor musun?")) return;
                        deleteCustomCard(card.id);
                      }}
                      onKeyDown={(e) => {
                        if (e.key !== "Enter" && e.key !== " ") return;
                        e.preventDefault();
                        e.stopPropagation();
                        if (!window.confirm("Bu kartı silmek istiyor musun?")) return;
                        deleteCustomCard(card.id);
                      }}
                      className="absolute top-5 left-5 text-xs font-black tracking-widest opacity-70 bg-white/70 dark:bg-black/20 px-3 py-1.5 rounded-full border border-white/50 dark:border-zinc-700/60 hover:opacity-100"
                    >
                      Sil
                    </div>
                  )}
                  <div className="absolute top-5 right-5 text-xs font-black tracking-widest opacity-60">
                    {favorites.includes(card.id) ? "★" : "☆"}
                  </div>
                  <div className="p-6 rounded-3xl bg-white/90 dark:bg-black/20 shadow-md group-hover:scale-110 transition-transform">
                    {card.imageDataUrl ? (
                      <img src={card.imageDataUrl} alt={card.label} className="w-12 h-12 object-cover rounded-xl" />
                    ) : card.emoji ? (
                      <span className="text-5xl leading-none">{card.emoji}</span>
                    ) : card.icon ? (
                      <card.icon size={48} />
                    ) : (
                      <MessageSquare size={48} />
                    )}
                  </div>
                  <span className="text-xl font-black tracking-tight text-center leading-tight">
                    {card.label}
                  </span>
                </button>
              ))}
            </div>
          </section>
        ))}
      </main>

      <footer className="max-w-5xl mx-auto mt-20 p-8 bg-zinc-100 dark:bg-zinc-900 rounded-[2rem] text-center">
        <p className="text-zinc-500 font-bold flex items-center justify-center gap-2">
          <MessageSquare size={20} className="text-zinc-400" />
          Kartlara dokunarak sesli iletişim kurabilirsiniz.
        </p>
      </footer>
    </div>
  );
}
