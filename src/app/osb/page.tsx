import { Metadata } from "next";
import Link from "next/link";
import { 
  ArrowLeft, 
  BookOpen, 
  Heart, 
  HelpCircle, 
  Shield, 
  Star, 
  ChevronRight, 
  Sparkles, 
  CheckCircle2, 
  ExternalLink,
  GraduationCap
} from "lucide-react";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Otizm Spektrum Bozukluğu (OSB) Nedir? Belirtileri ve Tanı Kriterleri | OtiZeka",
  description: "Otizm Spektrum Bozukluğu (OSB) nedir? DSM-5 tanı kriterleri, erken belirtiler, spektrum kavramının anlamı, nedenleri ve erken müdahale yöntemleri üzerine kapsamlı rehber.",
  keywords: ["otizm nedir", "otizm spektrum bozukluğu", "dsm-5 otizm kriterleri", "otizm belirtileri", "otizm nedenleri", "erken tanı otizm", "özel eğitim"],
  openGraph: {
    title: "Otizm Spektrum Bozukluğu (OSB) Nedir? | OtiZeka",
    description: "Otizm Spektrum Bozukluğu belirtileri, gelişimsel farklılıklar, tanı ve erken müdahale hakkında kapsamlı bilimsel rehber.",
    url: "https://www.otizeka.com/osb",
    siteName: "OtiZeka",
    locale: "tr_TR",
    type: "article",
  },
};

interface OsbTopic {
  id: string;
  title: string;
  badge: string;
  summary: string;
  paragraphs: string[];
  keyPointsTitle: string;
  keyPoints: string[];
  clinicalNote?: string;
  color: string;
}

const OSB_TOPICS: OsbTopic[] = [
  {
    id: "osb-nedir",
    title: "Otizm Spektrum Bozukluğu Nedir ve Neden Bir 'Spektrum'dur?",
    badge: "Temel Tanım & Kavram",
    color: "bg-cyan-100 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300",
    summary: "Otizm Spektrum Bozukluğu (OSB), erken çocukluk döneminde başlayan ve bireyin dünyayı algılama, sosyal etkileşimde bulunma ve iletişim kurma biçimini etkileyen nöro-gelişimsel bir farklılıktır.",
    paragraphs: [
      "Otizm Spektrum Bozukluğu (OSB), beynin gelişimi ve nörolojik işleyişiyle ilişkili ömür boyu süren bir durumdur. 'Spektrum' (yelpaze) kavramı, bu durumun her bireyde son derece farklı yoğunlukta ve profilde ortaya çıktığını vurgular. Spektrum içinde yer alan kimi bireyler yüksek zihinsel becerilere sahip olup bağımsız bir yaşam sürdürebilirken; kimi bireyler konuşma dili, öz bakım ve günlük yaşam aktivitelerinde yoğun ve sürekli özel eğitim desteğine ihtiyaç duyabilir.",
      "OSB'li bireylerin algı dünyası tipik gelişim gösterenlerden farklı çalışır. Beyin, çevreden gelen duyusal bilgileri (sesler, ışıklar, dokunma duyusu, kokular) filtrelemekte zorlanabilir veya bu uyaranları çok daha yoğun biçimde deneyimleyebilir. Bu nedenle otizm, bir 'eksiklik' veya 'hastalık' değil; bilgiyi işleme ve dünyayı anlamlandırma biçimindeki nörobiyolojik bir çeşitliliktir."
    ],
    keyPointsTitle: "Spektrum Kavramının 4 Temel Özelliği",
    keyPoints: [
      "Bireysellik: 'Bir otizmli birey tanıdıysanız, yalnızca bir otizmli birey tanımışsınızdır.' Her çocuğun profili kendine özgüdür.",
      "Destek İhtiyacının Değişkenliği: İhtiyaç duyulan destek düzeyi zamana, çevreye ve alınan eğitimin niteliğine göre evrilebilir.",
      "Güçlü Yönler: Birçok OSB'li çocuk üstün görsel hafıza, detaylara odaklanma, matematik veya müzik gibi alanlarda güçlü kabiliyetlere sahiptir.",
      "Duyusal Zenginlik: Çevresel uyaranların farklı algılanması, sakin ve yapılandırılmış ortam ihtiyacını doğurur."
    ],
    clinicalNote: "Otizm tıbbi bir hastalık değildir; dolayısıyla 'iyileştirilmesi' gereken bir kusur olarak ele alınamaz. Çağdaş pedagojik yaklaşımın temel gayesi; çocuğun iletişim kanallarını açmak, duyusal stresini hafifletmek ve potansiyelini bağımsız bir hayata dönüştürmektir."
  },
  {
    id: "dsm5-siniflandirma",
    title: "Otizm Nasıl Sınıflandırılır? DSM-5 Tanı Kriterleri ve Destek Düzeyleri",
    badge: "Klinik Tanı & Düzeyler",
    color: "bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300",
    summary: "Amerikan Psikiyatri Birliği'nin güncel DSM-5 tanı sistemine göre otizm tek bir spektrum çatısında toplanmış olup, bireyin ihtiyaç duyduğu destek düzeyine göre derecelendirilir.",
    paragraphs: [
      "Eski sınıflandırma sistemlerinde (DSM-IV) Asperger Sendromu, Atipik Otizm, Yaygın Gelişimsel Bozukluk (PDD-NOS) gibi ayrı alt kategoriler bulunmaktaydı. Ancak 2013 yılında yayınlanan DSM-5 ve Dünya Sağlık Örgütü'nün ICD-11 kılavuzları ile bu ayrımlar kaldırılarak tüm alt kategoriler 'Otizm Spektrum Bozukluğu' adı altında birleştirilmiştir.",
      "DSM-5'e göre resmi bir tanı konulabilmesi için iki temel çekirdek alanda kalıcı güçlüklerin varlığı aranır: Birincisi 'Sosyal İletişim ve Sosyal Etkileşimde Kalıcı Güçlükler', ikincisi ise 'Sınırlı, Tekrarlayıcı Davranış Örüntüleri, İlgiler veya Etkinlikler'dir. Ayrıca bu belirtilerin erken gelişim evrelerinde başlamış olması ve günlük işlevselliği belirgin biçimde kısıtlaması şartı aranır."
    ],
    keyPointsTitle: "DSM-5 Destek Düzeyleri",
    keyPoints: [
      "Düzey 1 (Destek Gerektirir): Sosyal iletişim başlatmakta zorlanır, rutin değişikliklerinde kaygı yaşar ancak destekle bağımsız işlevsellik gösterebilir.",
      "Düzey 2 (Belirgin Destek Gerektirir): Sözel ve sözel olmayan iletişimde belirgin yetersizlikler vardır, rutin değişikliklerine yoğun tepki verir, günlük yaşamda sürekli rehberlik gerekir.",
      "Düzey 3 (Çok Yoğun Destek Gerektirir): Çok sınırlı sözel iletişim veya tamamen sözel olmayan profil, aşırı tekrarlayıcı davranışlar ve tüm günlük öz bakım süreçlerinde doğrudan desteğe muhtaçlık."
    ],
    clinicalNote: "Tanı sırasında eşlik eden zihinsel yetersizlik, dil gelişim bozukluğu, DEHB, anksiyete veya epilepsi gibi ek durumların mevcudiyeti de hekimler tarafından kapsamlı şekilde raporlanır."
  },
  {
    id: "osb-nedenleri",
    title: "Otizm Spektrum Bozukluğunun Nedenleri: Genetik ve Çevresel Faktörler",
    badge: "Etiyoloji ve Bilimsel Bulgular",
    color: "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300",
    summary: "Otizmin ortaya çıkışında tek bir neden bulunmamaktadır; çoklu genetik yatkınlıklar ile çevresel faktörlerin erken beyin gelişimindeki karmaşık etkileşimi rol oynamaktadır.",
    paragraphs: [
      "Bilimsel araştırmalar, otizmin çok faktörlü (multifaktöriyel) bir etiyolojiye sahip olduğunu ortaya koymaktadır. İkiz ve aile çalışmaları, otizmde genetik faktörlerin rolünün yaklaşık %60 ila %80 oranında belirleyici olduğunu göstermektedir. Sinir hücreleri arasındaki bağlantıları (sinapsları) ve nöral iletimi düzenleyen yüzlerce farklı genin varyasyonları otizm riskiyle ilişkili bulunmuştur.",
      "Genetik faktörlerin yanı sıra doğum öncesi ve doğum sırasındaki bazı biyolojik etkenler de risk profilini etkileyebilir. İleri anne ve baba yaşı, gebelikte geçirilen bazı viral enfeksiyonlar, aşırı erken doğum (prematürite), düşük doğum ağırlığı ve doğum anında yaşanan oksijensiz kalma durumları risk faktörleri arasında incelenmektedir."
    ],
    keyPointsTitle: "Bilimsel Olarak Kesinleşmiş Gerçekler",
    keyPoints: [
      "Aşılar Otizme Neden Olmaz: Dünya Sağlık Örgütü (WHO), CDC ve sayısız bağımsız araştırma aşıların (özellikle KKK aşısının) otizme yol açmadığını kesin kanıtlarla ortaya koymuştur.",
      "Ebeveyn Tutumları Otizm Yapmaz: Geçmişte öne sürülen 'buzdolabı anne' teorisi tamamen çürütülmüştür; otizm sevgi eksikliğinden veya hatalı anne-baba tutumlarından kaynaklanmaz.",
      "Biyolojik Bir Tablodur: Otizm, döllenme anından doğum sonrası ilk kritik aylara kadar süren beyin gelişim mimarisindeki nörobiyolojik farklılıkların sonucudur."
    ]
  },
  {
    id: "osb-belirtileri",
    title: "Otizmin Temel Belirtileri: Erken Dönem İpuçları ve Davranış Kalıpları",
    badge: "Gelişimsel Sinyaller",
    color: "bg-rose-100 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300",
    summary: "Sosyal gülümsemenin olmaması, isme tepki vermeme, göz temasından kaçınma ve tekrarlayıcı hareketler otizmin en sık rastlanan erken belirtileridir.",
    paragraphs: [
      "Otizm belirtileri çoğu çocukta 12 ila 24 ay arasında belirginleşmeye başlar; ancak bazı vakalarda 6-9 aylıkken dahi ilk ipuçları gözlemlenebilir. Belirtiler genel olarak sosyal iletişim alanı ve motor/davranışsal alan olmak üzere ikiye ayrılır.",
      "Sosyal alanda en sık karşılaşılan gösterge 'ortak dikkat' (joint attention) eksikliğidir. Tipik bir bebek ilgisini çeken bir nesneyi parmağıyla göstererek ebeveyninin de ona bakmasını isterken, otizmli çocuk genellikle nesneye işaret etmez veya ebeveyninin işaret ettiği yere dönüp bakmaz. İsmi söylendiğinde sanki işitmiyormuş gibi davranması (ancak sevdiği bir çizgi film müziğine anında tepki vermesi) da çok tipik bir göstergedir."
    ],
    keyPointsTitle: "Yaş Gruplarına Göre Kritik Kırmızı Bayraklar",
    keyPoints: [
      "6-9 Ay: Karşılıklı sosyal gülümsemenin olmaması, ebeveynle ses alışverişi (babıldama) yapmama, göz temasının zayıf olması.",
      "12 Ay: İsmiyle çağrıldığında dönüp bakmama, bay-bay yapmama, parmakla işaret etmeme ve nesneleri ebeveyne uzatarak paylaşmama.",
      "18-24 Ay: Tek bir anlamlı kelimenin dahi çıkmaması, oyuncakları amacına uygun oynamak yerine tekerleklerini döndürme veya sıraya dizme.",
      "Davranışsal Sinyaller: Kendi etrafında dönme, parmak ucunda yürüme, el çırpma (kanat çırpma), sallanma ve rutin bozulduğunda aşırı öfke krizleri."
    ]
  },
  {
    id: "erken-tani-onemi",
    title: "Erken Tanı ve Erken Müdahalenin Hayati Önemi: Beyin Plastisitesi",
    badge: "Eğitim ve Gelişim",
    color: "bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300",
    summary: "0-3 yaş dönemi insan beyninin en yüksek nöroplastisiteye sahip olduğu kritik evredir; bu evrede başlayan yoğun özel eğitim çocuğun gelişim seyrini kökten değiştirebilir.",
    paragraphs: [
      "Erken tanı, çocuğun 'otizmli' olarak etiketlenmesi için değil; kaybedilmemesi gereken en değerli gelişim penceresinde doğru özel eğitim ve terapilere acilen başlanabilmesi için hayati önem taşır. İnsan beyni yaşamın ilk yıllarında sinirsel bağlantıları olağanüstü bir hızla yapılandırır (nöroplastisite). Erken dönemde sağlanan yapılandırılmış uyarılar, beynin alternatif iletişim ve sosyal öğrenme yollarını inşa etmesine olanak tanır.",
      "Bilimsel araştırmalar, 2-3 yaş civarında yoğun ve nitelikli erken çocukluk özel eğitimine başlayan çocukların büyük bir kısmının okul çağına geldiklerinde akranlarıyla birlikte genel eğitim sınıflarına (kaynaştırma/bütünleştirme) devam edebildiğini ve bağımsızlık oranlarının katlanarak arttığını kanıtlamaktadır."
    ],
    keyPointsTitle: "Erken Müdahalenin Sağladığı Somut Kazanımlar",
    keyPoints: [
      "İletişim Becerilerinin Açılması: Sözel dil öncesi jestler, işaretler ve alternatif iletişim sistemleri (PECS/AAC) erken başlatıldığında konuşma gelişimi tetiklenir.",
      "Davranış Problemlerinin Önlenmesi: İsteklerini ifade edemediği için öfke krizi geçiren çocuk, alternatif iletişim öğrendiğinde krizler kendiliğinden azalır.",
      "Duyusal Regülasyon: Duyu bütünleme terapisi ile duyusal hassasiyetler erkenden kontrol altına alınır ve çocuğun çevreye uyumu kolaylaşır.",
      "Aile Güçlenmesi: Aile, çocuğuyla nasıl iletişim kuracağını ve ev ortamını nasıl yapılandıracağını öğrenerek tükenmişlikten kurtulur."
    ],
    clinicalNote: "Şüphe duyduğunuz anda 'büyüyünce konuşur' veya 'babası da geç konuşmuştu' şeklindeki çevresel söylemleri bir kenara bırakarak derhal bir Çocuk ve Ergen Ruh Sağlığı ve Hastalıkları (Çocuk Psikiyatrisi) uzmanına başvurunuz."
  }
];

export default function OsbPage() {
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
            <Link href="/education" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition">
              Özel Eğitim
            </Link>
            <Link href="/info" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition">
              Aile Portalı
            </Link>
          </nav>
        </div>
      </header>

      {/* Breadcrumbs */}
      <div className="border-b border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-100/50 dark:bg-zinc-900/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400 overflow-x-auto">
          <Link href="/" className="hover:text-emerald-600 transition">Ana Sayfa</Link>
          <ChevronRight size={14} />
          <span className="text-zinc-800 dark:text-zinc-200">Otizm Spektrum Bozukluğu (OSB)</span>
        </div>
      </div>

      {/* Hero Header */}
      <section className="bg-gradient-to-b from-cyan-500/10 via-blue-500/5 to-transparent py-12 sm:py-16 border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-100 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-300 text-xs font-black tracking-wide uppercase">
            <GraduationCap className="w-4 h-4" />
            <span>Kapsamlı Bilimsel Bilgi Merkezi</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight">
            Otizm Spektrum Bozukluğu (OSB) Nedir?
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 font-medium max-w-3xl mx-auto leading-relaxed">
            DSM-5 tanı ölçütleri, spektrum kavramının nörobiyolojik temelleri, erken çocukluk belirtileri ve kanıta dayalı erken müdahalenin gücüne dair eksiksiz başvuru kılavuzu.
          </p>

          {/* Hızlı Atlama Linkleri */}
          <div className="pt-4 flex flex-wrap justify-center gap-2">
            {OSB_TOPICS.map((topic) => (
              <a
                key={topic.id}
                href={`#${topic.id}`}
                className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-bold text-zinc-700 dark:text-zinc-300 hover:border-cyan-500 hover:text-cyan-600 transition shadow-sm"
              >
                {topic.badge}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Articles Stream */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-16 flex-1 w-full">
        {OSB_TOPICS.map((topic, index) => (
          <article
            key={topic.id}
            id={topic.id}
            className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 p-8 sm:p-12 shadow-sm hover:shadow-md transition-shadow space-y-8"
          >
            {/* Topic Header */}
            <div className="space-y-4 border-b border-zinc-100 dark:border-zinc-800/80 pb-6">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-black text-xs flex items-center justify-center">
                  0{index + 1}
                </span>
                <span className={cn("px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider", topic.color)}>
                  {topic.badge}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight leading-snug">
                {topic.title}
              </h2>
              <p className="text-base sm:text-lg font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 p-4 rounded-2xl border border-emerald-100 dark:border-emerald-900/30">
                {topic.summary}
              </p>
            </div>

            {/* Paragraphs */}
            <div className="space-y-5 text-base sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
              {topic.paragraphs.map((p, pIdx) => (
                <p key={pIdx}>{p}</p>
              ))}
            </div>

            {/* Key Points Box */}
            <div className="p-6 sm:p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-4">
              <h3 className="text-lg font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span>{topic.keyPointsTitle}</span>
              </h3>
              <ul className="space-y-3 pl-1 sm:pl-2">
                {topic.keyPoints.map((point, kIdx) => (
                  <li key={kIdx} className="flex items-start gap-3 text-sm sm:text-base text-zinc-700 dark:text-zinc-300">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 mt-2 shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Clinical Note if exists */}
            {topic.clinicalNote && (
              <div className="p-6 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 text-amber-900 dark:text-amber-200 space-y-2">
                <div className="font-black text-xs uppercase tracking-wider flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>Uzman Klinik Notu</span>
                </div>
                <p className="text-sm sm:text-base font-medium leading-relaxed">
                  {topic.clinicalNote}
                </p>
              </div>
            )}
          </article>
        ))}

        {/* Bilimsel Kaynaklar Bölümü */}
        <section className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 p-8 sm:p-12 shadow-sm space-y-6">
          <h2 className="text-2xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
            <span>Uluslararası Tıbbi ve Bilimsel Kaynaklar</span>
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 font-medium">
            Bu rehberde yer alan tüm bilgiler, dünyaca kabul görmüş sağlık otoritelerinin güncel klinik protokollerine ve kanıta dayalı bilimsel literatüre dayanmaktadır:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href="https://www.who.int/news-room/fact-sheets/detail/autism-spectrum-disorders"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 hover:border-cyan-500 transition flex items-center justify-between group"
            >
              <div>
                <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 group-hover:text-cyan-600 transition">Dünya Sağlık Örgütü (WHO)</h4>
                <p className="text-xs text-zinc-500">Autism Spectrum Disorders Fact Sheet</p>
              </div>
              <ExternalLink size={16} className="text-zinc-400 group-hover:text-cyan-500 transition shrink-0" />
            </a>
            <a
              href="https://www.cdc.gov/autism/about/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 hover:border-cyan-500 transition flex items-center justify-between group"
            >
              <div>
                <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 group-hover:text-cyan-600 transition">CDC (Hastalık Kontrol Merkezi)</h4>
                <p className="text-xs text-zinc-500">About Autism Spectrum Disorder (ASD)</p>
              </div>
              <ExternalLink size={16} className="text-zinc-400 group-hover:text-cyan-500 transition shrink-0" />
            </a>
            <a
              href="https://www.cdc.gov/autism/hcp/diagnosis/index.html"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 hover:border-cyan-500 transition flex items-center justify-between group"
            >
              <div>
                <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 group-hover:text-cyan-600 transition">CDC Clinical Guidelines</h4>
                <p className="text-xs text-zinc-500">DSM-5 Diagnostic Criteria for Autism</p>
              </div>
              <ExternalLink size={16} className="text-zinc-400 group-hover:text-cyan-500 transition shrink-0" />
            </a>
            <a
              href="https://www.nichd.nih.gov/health/topics/autism/conditioninfo/symptoms"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 hover:border-cyan-500 transition flex items-center justify-between group"
            >
              <div>
                <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 group-hover:text-cyan-600 transition">NICHD (Ulusal Çocuk Sağlığı Enstitüsü)</h4>
                <p className="text-xs text-zinc-500">What Are the Symptoms of Autism?</p>
              </div>
              <ExternalLink size={16} className="text-zinc-400 group-hover:text-cyan-500 transition shrink-0" />
            </a>
          </div>
        </section>

        {/* İlgili Rehber Makaleleri Çağrısı */}
        <section className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-[2.5rem] p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">Daha Fazla Pedagojik Rehber Keşfedin</h3>
            <p className="text-emerald-100 text-sm sm:text-base max-w-xl font-medium leading-relaxed">
              Özel eğitim teknikleri, ABA, TEACCH, duyu bütünleme, sosyal öyküler ve aile kılavuzlarıyla ilgili zengin makale arşivimizi inceleyin.
            </p>
          </div>
          <Link
            href="/rehber"
            className="px-8 py-4 rounded-2xl bg-white text-emerald-900 font-black text-sm uppercase tracking-wider hover:bg-emerald-50 transition shadow-lg shrink-0"
          >
            Tüm Rehberleri Oku
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 py-10 px-4 text-center text-xs text-zinc-500 font-medium">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex flex-wrap justify-center gap-6 font-bold text-zinc-700 dark:text-zinc-300">
            <Link href="/" className="hover:text-emerald-600 transition">Ana Sayfa</Link>
            <Link href="/rehber" className="hover:text-emerald-600 transition">Rehber & Makaleler</Link>
            <Link href="/education" className="hover:text-emerald-600 transition">Özel Eğitim Metotları</Link>
            <Link href="/hakkimizda" className="hover:text-emerald-600 transition">Hakkımızda</Link>
            <Link href="/iletisim" className="hover:text-emerald-600 transition">İletişim</Link>
            <Link href="/gizlilik" className="hover:text-emerald-600 transition">Gizlilik Politikası</Link>
          </div>
          <p>© 2026 OtiZeka Platformu. Tüm hakları saklıdır. Bu içerikler yalnızca bilgilendirme amaçlıdır; tıbbi tanı ve tedavi yerine geçmez.</p>
        </div>
      </footer>
    </div>
  );
}
