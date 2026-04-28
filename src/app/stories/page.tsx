"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ChevronRight, CheckCircle2, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

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

const SPEECH_SETTINGS_KEY = "speechSettingsV1";
const UI_SETTINGS_KEY = "uiSettingsV1";

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

const STORIES = [
  {
    id: "hand-washing",
    title: "Ellerimi Yıkıyorum",
    description: "Temizlik ve sağlık için ellerimizi nasıl yıkarız?",
    steps: [
      { text: "Musluğu açıyorum ve ellerimi ıslatıyorum.", emoji: "🚰" },
      { text: "Sabun alıyorum ve ellerimi köpürtüyorum.", emoji: "🧼" },
      { text: "Ellerimin her yerini iyice ovuyorum.", emoji: "🙌" },
      { text: "Su ile sabunları duruluyorum.", emoji: "💦" },
      { text: "Havlumla ellerimi kuruluyorum.", emoji: "🧣" },
    ],
    color: "bg-sky-50 text-sky-700 border-sky-100",
  },
  {
    id: "greeting",
    title: "Merhaba Diyorum",
    description: "Yeni insanlarla tanışırken ne yaparız?",
    steps: [
      { text: "Karşımdaki kişinin gözlerine bakıyorum.", emoji: "👀" },
      { text: "Yüzüme küçük bir gülümseme yerleştiriyorum.", emoji: "😊" },
      { text: "Nazikçe 'Merhaba' diyorum.", emoji: "👋" },
      { text: "Sıramı bekleyip onu dinliyorum.", emoji: "👂" },
    ],
    color: "bg-amber-50 text-amber-700 border-amber-100",
  },
  {
    id: "waiting-turn",
    title: "Sırada Bekliyorum",
    description: "Sıra beklemek nasıl olur?",
    steps: [
      { text: "Nerede sıraya girmem gerektiğini buluyorum.", emoji: "📍" },
      { text: "Sıranın arkasına geçiyorum.", emoji: "🚶" },
      { text: "Öndeki kişiye çok yaklaşmadan bekliyorum.", emoji: "↔️" },
      { text: "Beklerken ellerimi sakin tutuyorum.", emoji: "👐" },
      { text: "Sıram gelince nazikçe öne gidiyorum.", emoji: "✅" },
    ],
    color: "bg-emerald-50 text-emerald-700 border-emerald-100",
  },
  {
    id: "sharing-toys",
    title: "Oyuncağımı Paylaşıyorum",
    description: "Arkadaşlarımla paylaşmayı öğreniyorum.",
    steps: [
      { text: "Arkadaşımı dinliyorum ve ne istediğini anlıyorum.", emoji: "👂" },
      { text: "İstersem 'Birazdan' diyebilirim.", emoji: "⏳" },
      { text: "Sıra bende bitince oyuncağı uzatıyorum.", emoji: "🧸" },
      { text: "Arkadaşım oynarken bekliyorum.", emoji: "🙂" },
      { text: "Sıra bana gelince oyuncağı geri alıyorum.", emoji: "🔁" },
    ],
    color: "bg-rose-50 text-rose-700 border-rose-100",
  },
  {
    id: "going-to-school",
    title: "Okula Hazırlanıyorum",
    description: "Okula giderken neler yaparım?",
    steps: [
      { text: "Kıyafetlerimi giyiyorum.", emoji: "👕" },
      { text: "Çantama gerekli eşyaları koyuyorum.", emoji: "🎒" },
      { text: "Ayakkabılarımı giyiyorum.", emoji: "👟" },
      { text: "Kapıdan çıkmadan önce tuvalete gidebilirim.", emoji: "🚻" },
      { text: "Okula giderken yolda güvenli yürüyorum.", emoji: "🚦" },
    ],
    color: "bg-indigo-50 text-indigo-700 border-indigo-100",
  },
  {
    id: "doctor-visit",
    title: "Doktora Gidiyorum",
    description: "Doktor kontrolünde neler olur?",
    steps: [
      { text: "Doktoru selamlıyorum.", emoji: "👋" },
      { text: "Doktor beni dinler ve sorular sorar.", emoji: "🩺" },
      { text: "Gerekirse ölçüm yapılır (ateş, boy, kilo).", emoji: "🌡️" },
      { text: "Ben de nasıl hissettiğimi söyleyebilirim.", emoji: "💬" },
      { text: "İşimiz bitince teşekkür edip ayrılırım.", emoji: "🙏" },
    ],
    color: "bg-zinc-50 text-zinc-700 border-zinc-100",
  },
  {
    id: "market-shopping",
    title: "Markette Alışveriş",
    description: "Markette sakin kalmayı öğreniyorum.",
    steps: [
      { text: "Alacağımız şeyleri birlikte seçiyoruz.", emoji: "📝" },
      { text: "Raflara bakıp istediğim şeyi gösteriyorum.", emoji: "🛒" },
      { text: "Çok ses olursa kulaklarımı koruyabilirim.", emoji: "🎧" },
      { text: "Kasada sırada bekliyorum.", emoji: "🏷️" },
      { text: "İşimiz bitince eve dönüyoruz.", emoji: "🏠" },
    ],
    color: "bg-yellow-50 text-yellow-700 border-yellow-100",
  },
  {
    id: "feelings-words",
    title: "Duygumu Söylüyorum",
    description: "Duygularımı kelimelerle ifade ediyorum.",
    steps: [
      { text: "Vücudumu dinliyorum (kalbim hızlı mı, karnım mı ağrıyor?).", emoji: "🫀" },
      { text: "Hangi duyguya benzediğini düşünüyorum.", emoji: "🤔" },
      { text: "Kısa bir cümle kuruyorum: 'Üzgünüm', 'Kızgınım' gibi.", emoji: "💬" },
      { text: "Gerekirse yardım istiyorum.", emoji: "🆘" },
      { text: "Sakinleşince tekrar konuşabilirim.", emoji: "🌿" },
    ],
    color: "bg-teal-50 text-teal-700 border-teal-100",
  },
];

export default function StoriesPage() {
  const [selectedStory, setSelectedStory] = useState<typeof STORIES[0] | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [speechSettings] = useState<SpeechSettings>(() =>
    readJson<SpeechSettings>(SPEECH_SETTINGS_KEY, { voiceURI: null, rate: 1, pitch: 1, volume: 1 })
  );
  const [isReading, setIsReading] = useState(false);
  const [uiSettings] = useState<UiSettings>(() =>
    readJson<UiSettings>(UI_SETTINGS_KEY, { largeButtons: false, highContrast: false, reduceMotion: false })
  );
  const [quizChoice, setQuizChoice] = useState<string | null>(null);

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
    utterance.onend = () => setIsReading(false);
    setIsReading(true);
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if (!("speechSynthesis" in window)) return;
    try {
      window.speechSynthesis.cancel();
    } catch {}
    setIsReading(false);
  };

  const finishStory = () => {
    stopSpeaking();
    setSelectedStory(null);
    setCurrentStep(0);
    setQuizChoice(null);
  };

  const handleNext = () => {
    if (!selectedStory) return;
    if (currentStep >= selectedStory.steps.length - 1) {
      finishStory();
      return;
    }
    setCurrentStep((prev) => prev + 1);
    setQuizChoice(null);
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      setQuizChoice(null);
    } else {
      finishStory();
    }
  };

  const quizOptions = useMemo(() => {
    if (!selectedStory) return [];
    const answer = selectedStory.title;
    const distractors = STORIES.filter((s) => s.id !== selectedStory.id).slice(0, 2).map((s) => s.title);
    const options = [answer, ...distractors];
    return options;
  }, [selectedStory]);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-6">
      <header className="max-w-2xl mx-auto mb-8 flex items-center gap-4">
        {selectedStory ? (
          <button
            onClick={handleBack}
            className="p-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400"
          >
            <ArrowLeft size={24} />
          </button>
        ) : (
          <Link
            href="/"
            className="p-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400"
          >
            <ArrowLeft size={24} />
          </Link>
        )}
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          {selectedStory ? selectedStory.title : "Sosyal Öyküler"}
        </h1>
      </header>

      <main className="max-w-2xl mx-auto">
        {!selectedStory ? (
          <div className="space-y-4">
            {STORIES.map((story) => (
              <button
                key={story.id}
                onClick={() => {
                  setSelectedStory(story);
                  setCurrentStep(0);
                  setQuizChoice(null);
                  stopSpeaking();
                }}
                className={cn(
                  "w-full text-left p-6 rounded-3xl border-2 transition-all active:scale-98 flex items-center justify-between group",
                  story.color
                )}
              >
                <div>
                  <h2 className="text-xl font-bold mb-1">{story.title}</h2>
                  <p className="opacity-80 text-sm">{story.description}</p>
                </div>
                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => speak(selectedStory.steps[currentStep].text)}
                className={cn(
                  "px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-2 transition-all active:scale-95",
                  isReading ? "bg-emerald-100 text-emerald-700 border-2 border-emerald-200" : "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                )}
              >
                <Volume2 size={18} /> Oku
              </button>
              <button
                type="button"
                onClick={stopSpeaking}
                className="px-6 py-4 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-100 font-black uppercase tracking-widest text-xs flex items-center gap-2 transition-all active:scale-95"
              >
                <VolumeX size={18} /> Dur
              </button>
            </div>

            <div className="relative h-64 bg-white dark:bg-zinc-900 rounded-3xl border-2 border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-8xl shadow-sm">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentStep}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: uiSettings.reduceMotion ? 0 : 0.3 }}
                >
                  {selectedStory.steps[currentStep].emoji}
                </motion.span>
              </AnimatePresence>
            </div>

            <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border-2 border-zinc-200 dark:border-zinc-800 shadow-sm text-center">
              <p className="text-xl font-medium text-zinc-800 dark:text-zinc-200 leading-relaxed">
                {selectedStory.steps[currentStep].text}
              </p>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="flex gap-2">
                {selectedStory.steps.map((_, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "h-2 rounded-full transition-all",
                      idx === currentStep ? "w-8 bg-zinc-800 dark:bg-zinc-200" : "w-2 bg-zinc-200 dark:bg-zinc-800"
                    )}
                  />
                ))}
              </div>
              <button
                onClick={handleNext}
                className={cn(
                  "px-8 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all active:scale-95",
                  currentStep === selectedStory.steps.length - 1
                    ? "bg-emerald-100 text-emerald-600 border-2 border-emerald-200"
                    : "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900"
                )}
              >
                {currentStep === selectedStory.steps.length - 1 ? (
                  <>
                    <CheckCircle2 size={20} /> Tamamlandı
                  </>
                ) : (
                  <>
                    Sonraki <ChevronRight size={20} />
                  </>
                )}
              </button>
            </div>

            {currentStep === selectedStory.steps.length - 1 && (
              <section className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border-2 border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
                <h3 className="text-xl font-black text-zinc-900 dark:text-zinc-50">Kontrol Sorusu</h3>
                <p className="text-zinc-600 dark:text-zinc-300 font-bold">Bu öykü ne hakkındaydı?</p>
                <div className="grid grid-cols-1 gap-3">
                  {quizOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        setQuizChoice(opt);
                        const ok = opt === selectedStory.title;
                        speak(ok ? "Evet, doğru." : "Tekrar deneyelim.");
                      }}
                      className={cn(
                        "p-5 rounded-2xl border-2 font-black transition-all active:scale-95 text-left",
                        quizChoice === opt
                          ? opt === selectedStory.title
                            ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                            : "bg-rose-50 border-rose-200 text-rose-700"
                          : "bg-zinc-50 dark:bg-zinc-800/50 border-zinc-100 dark:border-zinc-700 text-zinc-800 dark:text-zinc-100 hover:border-zinc-200"
                      )}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
