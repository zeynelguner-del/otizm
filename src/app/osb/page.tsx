"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, Heart, HelpCircle, Shield, Star, X, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Section = {
  title: string;
  description: string;
  content: string;
  icon: LucideIcon;
  color: string;
};

export default function OsbPage() {
  const [selected, setSelected] = useState<Section | null>(null);

  const sections: Section[] = [
    {
      title: "Otizm Spektrum Bozukluğu Nedir?",
      description: "OSB’nin ne olduğu, neden “spektrum” dendiği ve temel özellikleri.",
      icon: HelpCircle,
      color: "bg-cyan-100 text-cyan-700",
      content:
        "Otizm Spektrum Bozukluğu (OSB), beynin gelişimiyle ilişkili nörogelişimsel bir durumdur. OSB’de sosyal iletişim ve sosyal etkileşimde kalıcı güçlükler ile birlikte, sınırlı/tekrarlayıcı davranışlar ve ilgi alanları görülebilir.\n\nNeden “spektrum” denir?\n- Belirtilerin şiddeti, görünümü ve kişinin destek ihtiyacı çok değişkendir.\n- Bazı bireyler günlük yaşamda daha az destekle bağımsız olabilirken, bazıları daha yoğun ve yapılandırılmış desteğe ihtiyaç duyabilir.\n\nOSB aynı zamanda duyusal farklılıklarla da görülebilir:\n- Ses, ışık, dokunma, koku gibi uyaranlara aşırı veya az duyarlılık olabilir.\n\nNot: OSB bir “kişilik” ya da “tercih” değildir; kişinin gelişimsel profiline ilişkin bir durumdur. Amaç; iletişimi, öğrenmeyi, bağımsızlığı ve yaşam kalitesini desteklemektir.",
    },
    {
      title: "Otizm Spektrum Bozukluğu Nasıl Sınıflandırılır?",
      description: "Tanı kriterleri ve destek ihtiyacına göre derecelendirme (DSM-5 yaklaşımı).",
      icon: BookOpen,
      color: "bg-blue-100 text-blue-600",
      content:
        "Güncel klinik sınıflandırmada OSB, tek bir “spektrum” tanısı altında değerlendirilir. Tanı; çocuğun/bireyin gelişimi, davranışları ve işlevselliği üzerinden uzman gözlemi ve bakım veren bilgisiyle konur.\n\nDSM-5’e göre OSB tanısında iki ana alan öne çıkar:\n1) Sosyal iletişim ve etkileşimde kalıcı güçlükler\n2) Sınırlı, tekrarlayıcı davranışlar/ilgi alanları ve rutinlere aşırı bağlılık gibi örüntüler (duyusal tepkiler dahil)\n\nDestek ihtiyacına göre “şiddet/düzey” belirtimi yapılabilir:\n- Düzey 1: Destek gerektirir\n- Düzey 2: Belirgin (substantial) destek gerektirir\n- Düzey 3: Çok yoğun (very substantial) destek gerektirir\n\nAyrıca şu eşlik eden durumlar ayrıca belirtilir:\n- Dil gelişimi (eşlik eden dil güçlüğü var/yok)\n- Zihinsel gelişim (eşlik eden zihinsel yetersizlik var/yok)\n- Bilinen tıbbi/genetik durumlar ve eş tanılar (örn. DEHB, kaygı, epilepsi gibi)\n\nNot: Eskiden ayrı isimlerle anılan bazı alt tanılar (örn. Asperger vb.) artık OSB spektrumu içinde ele alınır.",
    },
    {
      title: "Otizm Spektrum Bozukluğunun Nedenleri Nedir?",
      description: "Tek bir neden yoktur; genetik ve çevresel etkenler birlikte rol oynar.",
      icon: Shield,
      color: "bg-emerald-100 text-emerald-600",
      content:
        "OSB’nin tek bir kanıtlanmış nedeni yoktur. Bilimsel kanıtlar; genetik etkenlerin ve bazı çevresel/biyolojik etkenlerin birlikte, erken beyin gelişimini etkileyerek OSB riskini artırabildiğini gösterir.\n\nBilinen genel çerçeve:\n- Genetik etkenler: Ailede OSB öyküsü ve bazı genetik sendromlar riskle ilişkili olabilir.\n- Çevresel/biyolojik etkenler: Bazı gebelik ve doğumla ilişkili faktörler (örn. ileri ebeveyn yaşı, prematürite, bazı doğum komplikasyonları gibi) riskle ilişkilendirilmiştir.\n\nÖnemli bilgi:\n- Aşıların OSB’ye neden olduğuna dair güvenilir bilimsel kanıt yoktur.\n\nNot: “Risk faktörü” bir şeyin OSB’ye kesin neden olduğu anlamına gelmez; sadece olasılıkla ilişkili bulunmuş olabilir. Her çocuk ve aile için nedenler aynı değildir.",
    },
    {
      title: "Otizm Spektrum Bozukluğunun Belirtileri Nelerdir?",
      description: "Sosyal iletişim ve tekrarlayıcı davranış örüntüleri; duyusal farklılıklar.",
      icon: Heart,
      color: "bg-rose-100 text-rose-600",
      content:
        "Belirtiler kişiden kişiye değişir; ancak OSB’de genellikle iki ana alanda farklılıklar görülür.\n\n1) Sosyal iletişim ve sosyal etkileşimde zorlanmalar\n- Karşılıklı iletişimi başlatma ve sürdürmede güçlük\n- Göz teması, jest/mimik gibi sözel olmayan ipuçlarını kullanmada veya anlamada zorlanma\n- Akran ilişkileri kurma ve sürdürmede güçlük\n\n2) Sınırlı ve tekrarlayıcı davranışlar / ilgi alanları\n- Tekrarlayıcı hareketler veya oyun biçimleri (örn. sallanma, dizme)\n- Rutinlere aşırı bağlılık, değişikliklerde yoğun zorlanma\n- Yoğun ve sınırlı ilgi alanları\n- Duyusal tepkilerde farklılık (ses/ışık/dokunma gibi uyaranlara aşırı veya az tepki)\n\nBazı çocuklarda gelişimde duraksama veya gerileme (özellikle iletişim becerilerinde) görülebilir. Bu tür değişimler fark edilirse bir uzmana başvurmak önemlidir.",
    },
    {
      title: "Erken Tanı ve Erken Eğitimin Önemi",
      description: "Erken müdahale; iletişim, sosyal beceriler ve günlük yaşamda belirgin fayda sağlayabilir.",
      icon: Star,
      color: "bg-amber-100 text-amber-600",
      content:
        "Erken tanı; çocuğun gelişimsel ihtiyaçlarının daha erken anlaşılmasını ve doğru desteklerin daha erken başlamasını sağlar.\n\nNeden önemlidir?\n- Erken müdahale hizmetleri (özellikle okul öncesi dönemde) çocuğun iletişim, sosyal etkileşim ve öğrenme becerilerini geliştirmede etkili olabilir.\n- Aileye rehberlik ve ev içi düzenlemeler (görsel destekler, rutin planlama, iletişim fırsatları oluşturma) günlük yaşamı daha sürdürülebilir hale getirir.\n- Eşlik eden güçlükler (uyku, beslenme, kaygı, dikkat vb.) daha erken fark edilip uygun yönlendirmeler yapılabilir.\n\nPratik adımlar\n- Gelişimsel dönüm noktalarını takip etme ve şüphede değerlendirme isteme\n- Çocuk gelişimi / çocuk ve ergen psikiyatrisi / çocuk nörolojisi gibi alanlarda değerlendirme\n- Özel eğitim ve dil-konuşma desteği gibi hizmetlerde bireyselleştirilmiş hedeflerle düzenli çalışma\n\nNot: En iyi program; çocuğun güçlü yönlerine ve ihtiyaçlarına göre bireyselleştirilmiş olandır.",
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
          <h1 className="text-3xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">Otizm Spektrum Bozukluğu</h1>
          <p className="text-zinc-500 font-medium">Temel bilgiler, sınıflandırma, belirtiler ve erken müdahale</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto space-y-8">
        <section className="bg-white dark:bg-zinc-900 p-10 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-xl">
          <h2 className="text-3xl font-black text-zinc-900 dark:text-zinc-50 mb-4 tracking-tight">Kısa Özet</h2>
          <p className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed text-lg">
            Bu bölüm; OSB’nin ne olduğunu, nasıl değerlendirildiğini, sık görülen belirtileri ve erken tanı/eğitimin neden önemli
            olduğunu anlaşılır bir dille özetler. Tanı ve tedavi yerine geçmez; şüphede uzman değerlendirmesi gerekir.
          </p>
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

        <section className="bg-white dark:bg-zinc-900 p-10 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-xl">
          <h2 className="text-2xl font-black text-zinc-900 dark:text-zinc-50 mb-4 tracking-tight">Kaynaklar</h2>
          <div className="text-zinc-600 dark:text-zinc-300 font-medium leading-relaxed">
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <a
                  className="text-blue-600 dark:text-blue-400 font-bold underline underline-offset-4"
                  href="https://www.who.int/news-room/fact-sheets/detail/autism-spectrum-disorders"
                  target="_blank"
                  rel="noreferrer"
                >
                  Dünya Sağlık Örgütü (WHO): Autism spectrum disorders
                </a>
              </li>
              <li>
                <a
                  className="text-blue-600 dark:text-blue-400 font-bold underline underline-offset-4"
                  href="https://www.cdc.gov/autism/about/"
                  target="_blank"
                  rel="noreferrer"
                >
                  CDC: About Autism Spectrum Disorder (ASD)
                </a>
              </li>
              <li>
                <a
                  className="text-blue-600 dark:text-blue-400 font-bold underline underline-offset-4"
                  href="https://www.cdc.gov/autism/hcp/diagnosis/index.html"
                  target="_blank"
                  rel="noreferrer"
                >
                  CDC: Clinical Testing and Diagnosis (DSM-5 kriter özeti)
                </a>
              </li>
              <li>
                <a
                  className="text-blue-600 dark:text-blue-400 font-bold underline underline-offset-4"
                  href="https://www.nichd.nih.gov/health/topics/autism/conditioninfo/symptoms"
                  target="_blank"
                  rel="noreferrer"
                >
                  NICHD: What are the symptoms of autism?
                </a>
              </li>
            </ul>
          </div>
        </section>
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
              <div className="text-zinc-600 dark:text-zinc-300 font-medium leading-loose whitespace-pre-wrap text-lg">
                {selected.content}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
