"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, Heart, Shield, Star, X, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Section = {
  title: string;
  description: string;
  content: string;
  icon: LucideIcon;
  color: string;
};

export default function EducationPage() {
  const [selected, setSelected] = useState<Section | null>(null);

  const summary =
    "Bu bölüm; OSB başta olmak üzere gelişimsel farklılıklarda sık kullanılan eğitim ve terapi yaklaşımlarını bilimsel çerçevede açıklar. İçerikler bilgi amaçlıdır; çocuğun ihtiyacına göre planlama için uzman değerlendirmesi gerekir.";

  const sections: Section[] = [
    {
      title: "Hareket Eğitimi",
      description: "Kaba motor beceriler, denge, koordinasyon ve fiziksel aktivite ile destek.",
      icon: Heart,
      color: "bg-rose-100 text-rose-600",
      content:
        "Hareket eğitimi; çocuğun denge, koordinasyon, kuvvet, dayanıklılık ve vücut farkındalığı gibi motor alanlarını desteklemeyi hedefleyen planlı fiziksel aktivitelerdir. OSB’de motor planlama, koordinasyon ve postüral kontrol güçlükleri görülebildiği için, düzenli hareket çalışmaları günlük yaşama aktarılabilen becerileri güçlendirebilir.\n\nBilimsel çerçeve\n- Düzenli fiziksel aktivite; uyku, duygu düzenleme, dikkat ve genel sağlık üzerinde olumlu etkiler gösterebilir.\n- Motor beceri çalışmaları; merdiven inip çıkma, top yakalama/atma, bisiklet, oyun parkı aktivitelerine katılım gibi işlevsel hedeflere bağlandığında daha etkili olur.\n\nUygulamada amaç\n- Kısa ve sık tekrarlar (gün içine dağıtılmış 5–15 dk).\n- Net başlangıç/bitiş, görsel ipuçları ve adım adım yönergeler.\n- Çocuğun motivasyonuna uygun oyun temelli etkinlikler.\n\nNot: Ağrı, ortopedik sorun veya belirgin motor gecikme varsa fizyoterapist/uzman değerlendirmesi önerilir.",
    },
    {
      title: "Ergo Terapi",
      description: "Günlük yaşam becerileri, duyusal düzenleme ve ince motor alanlarında ergoterapi desteği.",
      icon: Shield,
      color: "bg-emerald-100 text-emerald-600",
      content:
        "Ergoterapi (iş ve uğraşı terapisi); çocuğun günlük yaşam aktivitelerine (giyinme, yemek, tuvalet, oyun, okul etkinlikleri) katılımını artırmayı hedefler. OSB’de duyusal işlemleme farklılıkları, ince motor beceriler ve planlama/organizasyon alanları etkilenebildiği için ergoterapi; çevresel uyarlamalar, beceri öğretimi ve rutin planlama ile işlevselliği güçlendirebilir.\n\nBilimsel çerçeve\n- Temel hedef “katılım”dır: Çocuğun günlük yaşama daha rahat ve bağımsız katılması.\n- Duyusal stratejiler her çocukta aynı etkiyi göstermeyebilir; bireysel değerlendirme ve ölçülebilir hedeflerle ilerlemek önemlidir.\n\nSık hedef alanları\n- İnce motor: kalem tutma, kesme, düğme/fermuar.\n- Öz bakım: el yıkama, giyinme, beslenme.\n- Duyusal düzenleme: ses/ışık/dokunma hassasiyetlerinde uyarlama ve baş etme stratejileri.\n\nNot: Ev-okul-terapi arasında tutarlılık, kazanımların genellenmesini kolaylaştırır.",
    },
    {
      title: "Özel Eğitim",
      description: "Bireyselleştirilmiş hedefler, yapılandırılmış öğretim ve günlük yaşama genelleme.",
      icon: BookOpen,
      color: "bg-blue-100 text-blue-600",
      content:
        "Özel eğitim; çocuğun gelişim düzeyine göre bireyselleştirilmiş hedeflerle yürütülen yapılandırılmış öğretim sürecidir. OSB’de iletişim, sosyal etkileşim, oyun, akademik öncül beceriler ve günlük yaşam becerileri farklı hızlarda gelişebildiği için, hedeflerin ölçülebilir ve işlevsel olması önemlidir.\n\nBilimsel çerçeve\n- Erken müdahale ve düzenli, yapılandırılmış öğretim; birçok çocukta iletişim ve uyum becerilerinde ilerlemeyi destekleyebilir.\n- Etkili programlar; veriyle izlenen hedefler, sistemli tekrar, ipucu-kademeli azaltma ve genelleme planı içerir.\n\nSık kullanılan teknikler (genel yaklaşım)\n- Görsel destekler: günlük rutin çizelgesi, “önce-sonra”, adım kartları.\n- Davranışsal öğretim ilkeleri: pekiştirme, görev analizi, küçük adımlarla öğretim.\n- Doğal ortam öğretimi: günlük yaşam içinde fırsat yakalayıp öğretmek.\n\nNot: Programın evde kısa uygulamalarla desteklenmesi sürdürülebilirliği artırır.",
    },
    {
      title: "Dil Terapisi",
      description: "Anlama/ifade, pragmatik dil ve alternatif iletişim (AAC) desteği.",
      icon: Star,
      color: "bg-amber-100 text-amber-600",
      content:
        "Dil ve konuşma terapisi; çocuğun alıcı (anlama) ve ifade edici dil becerilerini, konuşma anlaşılırlığını ve sosyal iletişimi (pragmatik dil) geliştirmeyi hedefler. OSB’de iletişim; yalnızca konuşma değil, karşılıklı etkileşim, sıra alma, jest-mimik kullanımı ve bağlama uygun dil kullanımı gibi alanları da kapsar.\n\nBilimsel çerçeve\n- İletişim hedefleri işlevsel olmalıdır: istek bildirme, reddetme, yardım isteme, seçim yapma.\n- Konuşma gecikmesinde veya sınırlı konuşmada, AAC (resim, işaret, cihaz) iletişimi artırabilir ve konuşmayı “engellemez”; çoğu çocukta iletişim fırsatlarını çoğaltır.\n\nSık hedef alanları\n- İstek bildirme ve ortak dikkat.\n- Basit cümle kurma, soru-cevap.\n- Sosyal iletişim: selamlaşma, sıra alma, duygu ifade etme.\n\nNot: Evde aynı hedef dili ve görsel destekleri kullanmak ilerlemeyi hızlandırır.",
    },
    {
      title: "Floortime",
      description: "DIR/Floortime: ilişki temelli, oyun üzerinden sosyal-iletişim becerilerini destekleme.",
      icon: Heart,
      color: "bg-purple-100 text-purple-600",
      content:
        "DIR/Floortime; çocuğun gelişim basamaklarını (duygu düzenleme, ortak dikkat, karşılıklı etkileşim, problem çözme) ilişki temelli ve oyun odaklı bir yaklaşımla desteklemeyi amaçlar. Ebeveynin/uygulayıcının çocuğun ilgisini takip ederek etkileşimi derinleştirmesi ve “karşılıklı iletişim döngülerini” artırması hedeflenir.\n\nBilimsel çerçeve\n- İlişki temelli yaklaşımlar; sosyal etkileşimi ve duygu düzenlemeyi hedefler.\n- Etkinlik; çocuğun profiline uygun hedefler, düzenli uygulama ve aile katılımıyla artar.\n\nUygulamada temel prensipler\n- Çocuğun ilgisini takip et ve etkileşimi genişlet.\n- Kısa, sık ve keyifli oyun seansları planla.\n- Etkileşimi “soru yağmuru” yerine karşılıklı oyun akışıyla sürdür.\n\nNot: Floortime, yapılandırılmış öğretim ve dil terapisi gibi yaklaşımlarla birlikte planlanabilir; hedeflerin çakışmaması için ekip koordinasyonu faydalıdır.",
    },
  ];

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
          <h1 className="text-3xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">Eğitim</h1>
          <p className="text-zinc-500 font-medium">Terapi ve eğitim yaklaşımları</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto space-y-8">
        <section className="bg-white dark:bg-zinc-900 p-10 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-xl">
          <h2 className="text-3xl font-black text-zinc-900 dark:text-zinc-50 mb-4 tracking-tight">Kısa Özet</h2>
          <p className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed text-lg">{summary}</p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((s) => (
            <section
              key={s.title}
              className="bg-white dark:bg-zinc-900 p-8 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 shadow-lg hover:shadow-xl transition-all group"
            >
              <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform", s.color)}>
                <img src="/loogo.png" alt="" className="w-9 h-9 object-contain opacity-90" />
              </div>
              <h3 className="text-2xl font-black text-zinc-800 dark:text-zinc-100 mb-4 tracking-tight">{s.title}</h3>
              <p className="text-zinc-500 dark:text-zinc-400 font-bold leading-relaxed">{s.description}</p>
              <button
                onClick={() => setSelected(s)}
                className="mt-6 text-blue-600 font-black flex items-center gap-2 group-hover:gap-4 transition-all uppercase tracking-widest text-sm"
              >
                Devamını Oku <ArrowLeft className="rotate-180" size={18} />
              </button>
            </section>
          ))}
        </div>
      </main>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-zinc-950/80 backdrop-blur-md">
          <div className="bg-white dark:bg-zinc-900 w-full max-w-2xl max-h-[80vh] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col border border-zinc-200 dark:border-zinc-800">
            <div className="p-8 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", selected.color)}>
                  <img src="/loogo.png" alt="" className="w-7 h-7 object-contain opacity-90" />
                </div>
                <h2 className="text-2xl font-black tracking-tight">{selected.title}</h2>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 transition-all"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-8 overflow-y-auto flex-1 min-h-0">
              <div className="text-zinc-600 dark:text-zinc-300 font-medium leading-loose whitespace-pre-wrap text-lg">{selected.content}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

