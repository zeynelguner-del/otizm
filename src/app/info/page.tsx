import { Metadata } from "next";
import Link from "next/link";
import { 
  ArrowLeft, 
  BookOpen, 
  Heart, 
  Shield, 
  HelpCircle, 
  Star, 
  ChevronRight, 
  Sparkles, 
  CheckCircle2, 
  FileText,
  Building,
  GraduationCap
} from "lucide-react";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Otizmde Aile Rehberi, İlk Adımlar ve Yasal Haklar (RAM & ÇÖZGER) | OtiZeka",
  description: "Yeni tanı alan aileler için ilk adımlar, duygusal kabullenme süreci, ÇÖZGER sağlık raporu, RAM değerlendirmesi, ücretsiz destek eğitim hakları ve yasal güvenceler rehberi.",
  keywords: ["otizm yasal haklar", "çözger raporu otizm", "ram raporu nasıl alınır", "otizm destek eğitimi", "yeni tanı alan aileler", "özel eğitim hakları"],
  openGraph: {
    title: "Otizmde Aile Rehberi ve Yasal Haklar | OtiZeka",
    description: "Yeni tanı alan aileler için kapsamlı yol haritası: ÇÖZGER, RAM, ücretsiz destek eğitim hakları ve yasal süreçler.",
    url: "https://www.otizeka.com/info",
    siteName: "OtiZeka",
    locale: "tr_TR",
    type: "article",
  },
};

interface InfoSection {
  id: string;
  title: string;
  badge: string;
  color: string;
  lead: string;
  steps: {
    title: string;
    description: string;
  }[];
  importantNote?: string;
}

const INFO_SECTIONS: InfoSection[] = [
  {
    id: "ilk-adimlar",
    title: "Yeni Otizm Tanısı Alan Aileler İçin İlk Adımlar ve Duygusal Yol Haritası",
    badge: "Tanı Sonrası Süreç",
    color: "bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300",
    lead: "Otizm tanısı almak aileler için derin duygusal dalgalanmaların, kaygıların ve soru işaretlerinin yaşandığı zorlu bir eşiktir. Bu süreçte yalnız değilsiniz; doğru bir yol haritasıyla çocuğunuzun potansiyelini en üst düzeye çıkarabilirsiniz.",
    steps: [
      {
        title: "1. Kabullenme ve Duygusal İyileşme",
        description: "Kendinize ve ailenize zaman tanıyın. İnkar, öfke, pazarlık ve üzüntü evreleri son derece doğaldır. Ancak unutmayın ki tanı, çocuğunuzun kim olduğunu değiştirmez; yalnızca onun ihtiyaç duyduğu özel dili ve eğitim yolunu gösterir. Gerekirse aile danışmanlığı veya psikolojik destek almaktan çekinmeyin."
      },
      {
        title: "2. Zaman Kaybetmeden Erken Özel Eğitime Başlama",
        description: "Otizmde en değerli sermaye zamandır. 'Biraz büyüsün', 'kreşe gitsin açılır' gibi telkinlerle ayları kaybetmeyin. 0-6 yaş arası beynin nöroplastisitesi en yüksek seviyededir. Tanı şüphesi doğduğu andan itibaren haftalık en az 8-12 saatlik nitelikli özel eğitim programına başlanmalıdır."
      },
      {
        title: "3. Ev Ortamını Duyusal ve Görsel Olarak Düzenleme",
        description: "Evinizi çocuğun duyusal ihtiyaçlarına göre sadeleştirin. Karmaşık ve gürültülü uyaranları azaltın. Çocuğun gününü öngörebilmesi için buzdolabı kapağına veya çalışma alanına resimli günlük rutin çizelgesi asın."
      },
      {
        title: "4. Aile İçi ve Sosyal Çevre Bilgilendirmesi",
        description: "Çocuğun durumunu akrabalara ve yakın çevreye açık ve suçluluk duymadan anlatın. Doğru bir sosyal destek ağı kurmak hem anne ve babanın tükenmişliğini önler hem de çocuğun toplumsal hayata katılımını kolaylaştırır."
      }
    ],
    importantNote: "Çocuğunuzun geleceğine dair felaket senaryoları kurmak yerine bugüne ve atılacak küçük adımlara odaklanın. Erken ve düzenli eğitimle gelişim kaydeden yüz binlerce çocuk bulunmaktadır."
  },
  {
    id: "saglik-ve-cozger",
    title: "ÇÖZGER (Çocuklar İçin Özel Gereksinim Raporu) Süreci",
    badge: "Sağlık ve Raporlama",
    color: "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300",
    lead: "Türkiye'de özel eğitim ve sosyal haklardan yararlanabilmenin ilk ve en temel yasal adımı, yetkili tam teşekküllü devlet/üniversite hastanesinden ÇÖZGER raporu almaktır.",
    steps: [
      {
        title: "1. Hastane Randevusu Alma",
        description: "MHRS veya 182 üzerinden ÇÖZGER yetkisi bulunan bir devlet ya da üniversite hastanesinin Çocuk ve Ergen Ruh Sağlığı (Çocuk Psikiyatrisi) polikliniğinden sağlık kurulu randevusu alınır."
      },
      {
        title: "2. Sağlık Kurulu Muayeneleri",
        description: "Çocuk psikiyatrisi uzmanı başta olmak üzere, kurulun belirlediği hekimler (çocuk nörolojisi, göz, kbb vb.) çocuğu gelişimsel testler ve klinik gözlemle değerlendirir."
      },
      {
        title: "3. Kurul Kararı ve Gereksinim Derecesi",
        description: "ÇÖZGER raporunda eski sistemdeki gibi 'yüzde oranı' yazmaz; bunun yerine 'Özel Gereksinimi Vardır (ÖGV)', 'Hafif', 'Orta', 'İleri', 'Çok İleri Düzeyde ÖGV' gibi gereksinim düzeyleri belirtilir."
      },
      {
        title: "4. E-Devlet Üzerinden Rapor Teslimi",
        description: "Rapor onaylandıktan sonra e-Devlet ve e-Nabız sistemlerine işlenir. Bu raporla birlikte doğrudan Rehberlik ve Araştırma Merkezi (RAM) sürecine geçilir."
      }
    ],
    importantNote: "ÇÖZGER raporu çocuğunuzun geleceğini olumsuz etkileyen bir 'sicil' değildir. Yalnızca devletin sağladığı ücretsiz özel eğitim, vergi muafiyetleri ve sosyal desteklerden faydalanmasını sağlayan yasal bir haktır."
  },
  {
    id: "ram-ve-egitim-hakki",
    title: "RAM (Rehberlik ve Araştırma Merkezi) ve Ücretsiz Destek Eğitim",
    badge: "Eğitim Hakları",
    color: "bg-purple-100 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300",
    lead: "Milli Eğitim Bakanlığı'na bağlı RAM, çocuğun eğitsel değerlendirmesini yaparak her ay devlet destekli ücretsiz özel eğitim ve rehabilitasyon hizmeti almasını sağlar.",
    steps: [
      {
        title: "1. RAM Randevusu ve Başvuru",
        description: "İkamet ettiğiniz ilçedeki RAM'dan MEBBİS / e-Devlet veya telefonla randevu alınır. Başvuruda ÇÖZGER raporu, kimlik belgeleri ve varsa okul gözlem formları teslim edilir."
      },
      {
        title: "2. Eğitsel Değerlendirme ve Kurul Kararı",
        description: "RAM'daki özel eğitim uzmanları çocukla bireysel performans değerlendirmesi yapar. Çocuğun dil, motor, sosyal ve bilişsel gelişimine göre 'Özel Eğitim Değerlendirme Kurulu Raporu' düzenlenir."
      },
      {
        title: "3. Aylık Ücretsiz Destek Eğitim Saatleri",
        description: "Bu rapor ile MEB onaylı özel eğitim ve rehabilitasyon merkezlerinde ayda 8 seans bireysel eğitim (ve uygun görülürse 4 seans grup eğitimi) devlet tarafından tamamen ücretsiz olarak karşılanır."
      },
      {
        title: "4. Okul Yerleştirme ve Kaynaştırma (Bütünleştirme) Kararı",
        description: "Okul çağına gelen çocuklar için RAM; Tam Zamanlı Kaynaştırma, Özel Eğitim Sınıfı veya Özel Eğitim Uygulama Okulu yönlendirme kararını resmi olarak verir."
      }
    ],
    importantNote: "RAM raporları genellikle 1 yıllık verilir ve süresi dolmadan önce yenilenmesi gerekir. Yenileme sürecini aksatmamak için randevuyu rapor bitiş tarihinden en az 1-2 ay önce oluşturunuz."
  },
  {
    id: "diger-yasal-haklar",
    title: "Sosyal Güvenceler, Vergi İndirimleri ve Diğer Yasal Kolaylıklar",
    badge: "Sosyal ve Yasal Haklar",
    color: "bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300",
    lead: "Türkiye Cumhuriyeti mevzuatına göre özel gereksinimli bireyler ve aileleri için sağlık, istihdam, ulaşım ve maliye alanlarında geniş kapsamlı pozitif haklar tanınmıştır.",
    steps: [
      {
        title: "Destek Eğitim Odası Hakkı",
        description: "Kaynaştırma öğrencisi olarak genel eğitim sınıflarına devam eden otizmli çocuklar; okullarında açılan 'Destek Eğitim Odası'nda haftalık ders saatinin %40'ına kadar birebir öğretmen desteği alma hakkına sahiptir."
      },
      {
        title: "Engelli Evde Bakım ve Çocuk Aylığı",
        description: "Aile ve Sosyal Hizmetler Bakanlığı tarafından, hane geliri kriterlerine ve ÇÖZGER raporundaki bağımlılık derecesine göre ebeveyne her ay düzenli evde bakım aylığı ödenir."
      },
      {
        title: "ÖTV Muafiyeti ve Vergi İndirimleri",
        description: "ÇÖZGER raporunda 'Özel Koşul Gereksinimi Vardır (ÖKGV)' ibaresi bulunan çocukların ebeveynleri, 5 yılda bir sıfır araç alımında Özel Tüketim Vergisi (ÖTV) muafiyetinden yararlanabilir. Ayrıca çalışan ebeveyn için gelir vergisi indirimi uygulanır."
      },
      {
        title: "Ücretsiz Şehir İçi ve İndirimli Şehirler Arası Ulaşım",
        description: "Engelli kimlik kartı ile tüm şehir içi toplu taşıma araçları (belediye otobüsleri, metro, tramvay, vapur) ücretsiz; TCDD trenleri ücretsiz; THY iç hat uçuşları ise refakatçi dahil indirimli olarak kullanılır."
      }
    ],
    importantNote: "Tüm resmi işlemleriniz için çocuğunuzun ÇÖZGER raporu, RAM kararı ve nüfus cüzdanı fotokopilerini içeren özel bir 'Gelişim ve Hukuk Klasörü' hazırlamanız işlerinizi çok hızlandıracaktır."
  }
];

export default function InfoPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col selection:bg-emerald-500 selection:text-white">
      {/* Top Navbar */}
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition"
              title="Ana Sayfaya Dön"
            >
              <ArrowLeft size={20} />
            </Link>
            <Link href="/" className="flex items-center gap-2 font-black text-lg tracking-tight text-emerald-600 dark:text-emerald-400">
              <Sparkles className="w-5 h-5" />
              <span>OtiZeka</span>
            </Link>
          </div>

          <nav className="flex items-center gap-4 text-sm font-bold">
            <Link href="/rehber" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition">
              Rehber
            </Link>
            <Link href="/osb" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition">
              Otizm Nedir?
            </Link>
            <Link href="/education" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition">
              Özel Eğitim
            </Link>
          </nav>
        </div>
      </header>

      {/* Breadcrumbs */}
      <div className="border-b border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-100/50 dark:bg-zinc-900/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400 overflow-x-auto">
          <Link href="/" className="hover:text-emerald-600 transition">Ana Sayfa</Link>
          <ChevronRight size={14} />
          <span className="text-zinc-800 dark:text-zinc-200">Aile Rehberi ve Yasal Haklar</span>
        </div>
      </div>

      {/* Hero Header */}
      <section className="bg-gradient-to-b from-blue-500/10 via-emerald-500/5 to-transparent py-12 sm:py-16 border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 text-xs font-black tracking-wide uppercase">
            <Shield className="w-4 h-4" />
            <span>Aile Bilgilendirme ve Hukuk Rehberi</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight">
            Otizmde Aile Yol Haritası ve Yasal Haklar
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 font-medium max-w-3xl mx-auto leading-relaxed">
            Tanı sonrası yapılması gereken ilk adımlar, ÇÖZGER sağlık kurulu raporu, RAM eğitsel değerlendirmesi, ücretsiz rehabilitasyon ve devlet destekleri üzerine eksiksiz kılavuz.
          </p>

          {/* Hızlı Atlama Butonları */}
          <div className="pt-4 flex flex-wrap justify-center gap-2">
            {INFO_SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-bold text-zinc-700 dark:text-zinc-300 hover:border-blue-500 hover:text-blue-600 transition shadow-sm"
              >
                {s.badge}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Main Stream */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-16 flex-1 w-full">
        {INFO_SECTIONS.map((section, index) => (
          <article
            key={section.id}
            id={section.id}
            className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 p-8 sm:p-12 shadow-sm hover:shadow-md transition-shadow space-y-8"
          >
            {/* Header */}
            <div className="space-y-4 border-b border-zinc-100 dark:border-zinc-800/80 pb-6">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-black text-xs flex items-center justify-center">
                  0{index + 1}
                </span>
                <span className={cn("px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider", section.color)}>
                  {section.badge}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight leading-snug">
                {section.title}
              </h2>
              <p className="text-base sm:text-lg font-semibold text-blue-800 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/30 p-4 rounded-2xl border border-blue-100 dark:border-blue-900/30">
                {section.lead}
              </p>
            </div>

            {/* Steps List */}
            <div className="space-y-6">
              {section.steps.map((step, sIdx) => (
                <div key={sIdx} className="p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-2">
                  <h3 className="text-lg font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>{step.title}</span>
                  </h3>
                  <p className="text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal pl-7">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Important Note */}
            {section.importantNote && (
              <div className="p-6 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 text-amber-900 dark:text-amber-200 space-y-2">
                <div className="font-black text-xs uppercase tracking-wider flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>Önemli Hukuki ve Pedagojik Hatırlatma</span>
                </div>
                <p className="text-sm sm:text-base font-medium leading-relaxed">
                  {section.importantNote}
                </p>
              </div>
            )}
          </article>
        ))}

        {/* Kurum İletişim Rehberi */}
        <section className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 p-8 sm:p-12 shadow-sm space-y-6">
          <h2 className="text-2xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight flex items-center gap-2">
            <Building className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <span>Başvuru Yapılacak Resmi Kurumlar ve İletişim Hatları</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
            <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-2">
              <span className="px-2.5 py-1 rounded bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-black">ALO 182 / MHRS</span>
              <h4 className="font-black text-base text-zinc-900 dark:text-zinc-100">Hastane ve ÇÖZGER</h4>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">Çocuk Psikiyatrisi ve Sağlık Kurulu randevuları için Sağlık Bakanlığı hattı.</p>
            </div>
            <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-2">
              <span className="px-2.5 py-1 rounded bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 text-xs font-black">MEB RAM</span>
              <h4 className="font-black text-base text-zinc-900 dark:text-zinc-100">Rehberlik Araştırma Merkezi</h4>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">İlçe MEM bünyesindeki eğitsel değerlendirme ve özel eğitim kurul raporu.</p>
            </div>
            <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-2">
              <span className="px-2.5 py-1 rounded bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 text-xs font-black">ALO 183</span>
              <h4 className="font-black text-base text-zinc-900 dark:text-zinc-100">Sosyal Hizmetler Danışma</h4>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">Evde bakım maaşı, engelli kimlik kartı ve sosyal yardım başvuruları.</p>
            </div>
          </div>
        </section>

        {/* Rehber Kütüphanesi Çağrısı */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-[2.5rem] p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">Yeni Tanı Alan Aileler İçin Makaleler</h3>
            <p className="text-blue-100 text-sm sm:text-base max-w-xl font-medium leading-relaxed">
              Duyusal regülasyon, evde beslenme ve uyku düzeni, dil gelişimi ve özel eğitim metotları hakkında derinlemesine makalelerimizi inceleyin.
            </p>
          </div>
          <Link
            href="/rehber"
            className="px-8 py-4 rounded-2xl bg-white text-blue-900 font-black text-sm uppercase tracking-wider hover:bg-blue-50 transition shadow-lg shrink-0"
          >
            Rehber Arşivini İncele
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 py-10 px-4 text-center text-xs text-zinc-500 font-medium">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex flex-wrap justify-center gap-6 font-bold text-zinc-700 dark:text-zinc-300">
            <Link href="/" className="hover:text-emerald-600 transition">Ana Sayfa</Link>
            <Link href="/rehber" className="hover:text-emerald-600 transition">Rehber & Makaleler</Link>
            <Link href="/osb" className="hover:text-emerald-600 transition">Otizm Nedir?</Link>
            <Link href="/education" className="hover:text-emerald-600 transition">Özel Eğitim</Link>
            <Link href="/hakkimizda" className="hover:text-emerald-600 transition">Hakkımızda</Link>
            <Link href="/iletisim" className="hover:text-emerald-600 transition">İletişim</Link>
          </div>
          <p>© 2026 OtiZeka Platformu. Tüm hakları saklıdır. Bu bilgiler genel bilgilendirme amaçlıdır; hukuki ve tıbbi danışmanlık yerine geçmez.</p>
        </div>
      </footer>
    </div>
  );
}
