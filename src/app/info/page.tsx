"use client";
import { ArrowLeft, BookOpen, Heart, Shield, HelpCircle, Star, X, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

type InfoContent = { title: string; content: string; icon: LucideIcon; color: string };

export default function InfoPage() {
  const [selectedContent, setSelectedContent] = useState<InfoContent | null>(null);

  const featuredGuide = {
    title: "Yeni Tanı Alan Aileler İçin İlk Adımlar",
    icon: BookOpen,
    color: "bg-blue-600 text-white",
    content: `Tanı sonrası süreç, aileler için hem duygusal hem de bilgilendirici bir yolculuğun başlangıcıdır. İşte ilk adımlar:

1. Kabullenme ve Duygusal Destek: Kendinize zaman tanıyın. Bu sürecin bir yas süreci gibi hissettirmesi normaldir. Uzman bir psikologdan destek almak, ailenin direncini artırır.

2. Özel Eğitim Planlaması: Erken müdahale en kritik adımdır. Çocuğunuzun bireysel ihtiyaçlarına uygun bir eğitim programı (BEP) hazırlanması için uzmanlarla iş birliği yapın.

3. Sağlık ve Raporlama: RAM (Rehberlik Araştırma Merkezi) ve hastane süreçlerini tamamlayarak çocuğunuzun yasal haklarından (destek eğitimi, rehabilitasyon vb.) yararlanmasını sağlayın.

4. Ev Ortamı Düzenlemesi: Çocuğunuzun duyusal ihtiyaçlarına göre evi sadeleştirin. Görsel çizelgeler kullanarak günlük rutini anlamasına yardımcı olun.

5. Sosyal Çevre Bilgilendirmesi: Yakın çevrenizi ve akrabalarınızı durum hakkında bilgilendirerek doğru bir destek ağı oluşturun.`
  };

  const categories = [
    { 
      title: "Otizm Nedir?", 
      icon: HelpCircle, 
      color: "bg-blue-100 text-blue-600",
      description: "Otizm spektrum bozukluğu (OSB) hakkında temel bilgiler.",
      content: "Otizm Spektrum Bozukluğu (OSB), doğuştan gelen ya da yaşamın ilk yıllarında ortaya çıkan karmaşık bir nöro-gelişimsel farklılıktır. Beynin yapısını veya işleyişini etkileyen sinir sistemi sorunlarından kaynaklandığı düşünülmektedir. \n\nTemel özellikleri arasında sosyal etkileşimde zorluklar, sınırlı ve tekrarlayıcı ilgi alanları ile iletişim sorunları yer alır. Her çocukta farklı belirtiler ve şiddet düzeylerinde görüldüğü için 'spektrum' (yelpaze) olarak adlandırılır. Otizm bir hastalık değil, bir gelişimsel farklılıktır ve doğru eğitimle bireyler toplumda aktif roller üstlenebilirler."
    },
    { 
      title: "Sosyal İletişim", 
      icon: Heart, 
      color: "bg-rose-100 text-rose-600",
      description: "Göz teması ve sosyal etkileşim destekleri.",
      content: "Otizmli bireyler için sosyal iletişim, en çok desteklenmesi gereken alanlardan biridir. \n\n- Göz Teması: Zorlamadan, ilgisini çeken nesneler üzerinden doğal yollarla teşvik edilmelidir.\n- Duygu Paylaşımı: Kartlar veya oyunlar aracılığıyla temel duyguların (mutlu, üzgün, kızgın) tanınması çalışılmalıdır.\n- Sıra Bekleme: Oyunlar sırasında 'sıra bende, sıra sende' çalışmaları sosyal etkileşimin temelini atar.\n- Sosyal Öyküler: Karmaşık sosyal durumları basitleştirerek anlatan öyküler, çocuğun ne yapması gerektiğini anlamasına yardımcı olur."
    },
    { 
      title: "Duyu Bütünleme", 
      icon: Star, 
      color: "bg-amber-100 text-amber-600",
      description: "Duyusal hassasiyetler için öneriler.",
      content: "Duyu bütünleme, çevremizden gelen duyusal bilgileri (ses, ışık, dokunma) beynimizde organize etme sürecidir. Otizmli çocuklarda bu süreç bazen aşırı hassasiyet veya düşük tepki şeklinde görülebilir.\n\n- Ses Hassasiyeti: Kalabalık veya gürültülü ortamlarda gürültü engelleyici kulaklıklar kullanılabilir.\n- Dokunma: Bazı dokular (kum, çamur, kıyafet etiketleri) rahatsız edici olabilir. Çocuğun toleransına göre kademeli alışma çalışmaları yapılabilir.\n- Hareket: Sallanma, zıplama gibi aktiviteler çocuğun kendini sakinleştirmesine yardımcı olabilir.\n- Beslenme: Tat ve doku hassasiyeti nedeniyle yaşanan seçiciliklerde uzman eşliğinde tadım çalışmaları yapılmalıdır."
    },
    { 
      title: "Yasal Haklar", 
      icon: Shield, 
      color: "bg-emerald-100 text-emerald-600",
      description: "Eğitim ve sağlık hakları hakkında rehber.",
      content: "Türkiye'de otizmli bireyler ve aileleri için tanımlanmış çeşitli yasal haklar bulunmaktadır:\n\n1. Eğitim Hakları: RAM raporu ile devlet okullarında kaynaştırma eğitimi veya özel eğitim alt sınıflarında eğitim alma hakkı.\n2. Destek Eğitimi: Rehabilitasyon merkezlerinden ücretsiz seans desteği (belirli saatlerde).\n3. Vergi Muafiyetleri: ÖTV indirimi, Emlak vergisi muafiyeti gibi ekonomik destekler.\n4. Sağlık Hizmetleri: Hastanelerde öncelik hakkı ve ücretsiz ilaç/tedavi imkanları.\n5. Bakım Aylığı: Belirli gelir kriterlerini karşılayan aileler için evde bakım desteği ödemeleri.\n\nBu haklardan yararlanmak için 'ÇÖZGER' (Çocuklar İçin Özel Gereksinim Raporu) alınması şarttır."
    }
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
          <h1 className="text-3xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">Otizm Bilgilendirme</h1>
          <p className="text-zinc-500 font-medium">Faydalı Bilgiler ve Rehberler</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto space-y-8">
        {/* Featured Guide */}
        <section className="bg-white dark:bg-zinc-900 p-10 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
            <BookOpen size={160} />
          </div>
          
          <div className="relative z-10 max-w-2xl">
            <span className="px-4 py-1.5 bg-blue-600 text-white rounded-full text-xs font-black uppercase tracking-widest mb-6 inline-block">
              Öne Çıkan Rehber
            </span>
            <h2 className="text-4xl font-black text-zinc-900 dark:text-zinc-50 mb-6 tracking-tight">{featuredGuide.title}</h2>
            <p className="text-xl text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed mb-8">
              Tanı sonrası süreçte yapılması gerekenler, eğitim planlaması ve aile desteği hakkında kapsamlı başlangıç kılavuzu.
            </p>
            <button 
              onClick={() => setSelectedContent({ ...featuredGuide, color: "bg-blue-100 text-blue-600" })}
              className="px-10 py-5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-[1.5rem] font-black text-lg shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              Rehberi Oku
            </button>
          </div>
        </section>

        {/* Grid Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((cat, i) => (
            <section key={i} className="bg-white dark:bg-zinc-900 p-8 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 shadow-lg hover:shadow-xl transition-all group">
              <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform", cat.color)}>
                <cat.icon size={32} />
              </div>
              <h3 className="text-2xl font-black text-zinc-800 dark:text-zinc-100 mb-4 tracking-tight">{cat.title}</h3>
              <p className="text-zinc-500 dark:text-zinc-400 font-bold leading-relaxed">
                {cat.description}
              </p>
              <button 
                onClick={() => setSelectedContent(cat)}
                className="mt-6 text-blue-600 font-black flex items-center gap-2 group-hover:gap-4 transition-all uppercase tracking-widest text-sm"
              >
                Devamını Oku <ArrowLeft className="rotate-180" size={18} />
              </button>
            </section>
          ))}
        </div>

        {/* Support Card */}
        <section className="bg-zinc-900 dark:bg-zinc-800 p-10 rounded-[2.5rem] text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="text-center md:text-left">
            <h4 className="text-2xl font-black mb-2 tracking-tight">Bir Sorunuz mu Var?</h4>
            <p className="text-zinc-400 font-bold">Uzmanlarımıza danışmak ve destek almak için bize ulaşın.</p>
          </div>
          <button className="px-10 py-5 bg-white text-zinc-900 rounded-[1.5rem] font-black text-lg shadow-xl hover:bg-zinc-100 transition-all whitespace-nowrap">
            İletişime Geç
          </button>
        </section>
      </main>

      {/* Content Modal Overlay */}
      {selectedContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-zinc-950/80 backdrop-blur-md">
          <div className="bg-white dark:bg-zinc-900 w-full max-w-2xl max-h-[80vh] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col border border-zinc-200 dark:border-zinc-800">
            <div className="p-8 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", selectedContent.color)}>
                  <selectedContent.icon size={24} />
                </div>
                <h2 className="text-2xl font-black tracking-tight">{selectedContent.title}</h2>
              </div>
              <button 
                onClick={() => setSelectedContent(null)}
                className="p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 transition-all"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-8 overflow-y-auto flex-1 min-h-0">
              <div className="text-zinc-600 dark:text-zinc-300 font-medium leading-loose whitespace-pre-wrap text-lg">
                {selectedContent.content}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
