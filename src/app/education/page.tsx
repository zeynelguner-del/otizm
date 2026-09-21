import { Metadata } from "next";
import Link from "next/link";
import { 
  ArrowLeft, 
  BookOpen, 
  Heart, 
  Shield, 
  Star, 
  ChevronRight, 
  Sparkles, 
  CheckCircle2, 
  ExternalLink,
  GraduationCap,
  Waves,
  MessageSquare,
  Activity
} from "lucide-react";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Otizmde Özel Eğitim ve Terapi Yöntemleri: ABA, TEACCH, PECS, Ergoterapi | OtiZeka",
  description: "Otizm spektrumundaki çocuklar için kanıta dayalı özel eğitim ve terapi yaklaşımları: Uygulamalı Davranış Analizi (ABA), TEACCH, PECS, Ergoterapi, Dil Terapisi ve Floortime rehberi.",
  keywords: ["otizm özel eğitim", "aba terapisi", "teacch yöntemi", "pecs iletişimi", "ergoterapi otizm", "dil ve konuşma terapisi", "floortime otizm"],
  openGraph: {
    title: "Otizmde Özel Eğitim ve Terapi Yöntemleri | OtiZeka",
    description: "Otizmde kanıta dayalı eğitim ve terapi modelleri hakkında kapsamlı pedagojik ve bilimsel kılavuz.",
    url: "https://www.otizeka.com/education",
    siteName: "OtiZeka",
    locale: "tr_TR",
    type: "article",
  },
};

interface MethodItem {
  id: string;
  title: string;
  badge: string;
  color: string;
  summary: string;
  paragraphs: string[];
  keyOutcomesTitle: string;
  keyOutcomes: string[];
  homeTips: string;
}

const EDUCATION_METHODS: MethodItem[] = [
  {
    id: "ozel-egitim",
    title: "Bireyselleştirilmiş Özel Eğitim ve Yapılandırılmış Öğretim",
    badge: "Temel Eğitim Modeli",
    color: "bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300",
    summary: "Çocuğun gelişimsel düzeyine, güçlü yönlerine ve özel ihtiyaçlarına göre hazırlanan Bireyselleştirilmiş Eğitim Programı (BEP) çerçevesinde yürütülen sistemli öğretim sürecidir.",
    paragraphs: [
      "Özel eğitim; otizmli çocuğun sosyal iletişim, bilişsel, oyun, öz bakım ve akademik öncül becerilerini geliştirmeyi hedefleyen kanıta dayalı pedagojik bir süreçtir. Tipik bir sınıf ortamındaki karmaşık ve hızlı uyaranlar otizmli çocuk için öğrenmeyi zorlaştırabileceğinden, özel eğitimde ortam ve yönergeler çocuğun algı dünyasına uygun şekilde sadeleştirilir ve 'yapılandırılır'.",
      "Eğitim programının omurgasını Bireyselleştirilmiş Eğitim Programı (BEP) oluşturur. BEP hazırlanırken çocuğun halihazırda bağımsız yapabildiği beceriler (mevcut performans düzeyi) belirlenir ve ardından küçük, ölçülebilir basamaklar halinde yeni hedefler saptanır. Süreç boyunca her kazanım somut verilerle kayıt altına alınır."
    ],
    keyOutcomesTitle: "Özel Eğitimin Temel Prensipleri",
    keyOutcomes: [
      "Küçük Adımlarla Öğretim: Karmaşık beceriler yönetilebilir mikro görev analizlerine bölünür.",
      "Görsel Destekler: Sözel yönergeler resimler, semboller ve 'önce-sonra' panoları ile somutlaştırılır.",
      "Sistemli İpucu ve Pekiştirme: Hedef davranış için doğru ipucu (fiziksel, model olma, sözel) verilir ve çocuk başardıkça ipuçları kademeli olarak geri çekilir.",
      "Genelleme: Merkezde öğrenilen becerinin evde, parkta ve markette de uygulanabilmesi hedeflenir."
    ],
    homeTips: "Özel eğitim merkezindeki özel eğitim öğretmeniyle haftalık iletişim defteri tutun. Merkezde çalışılan haftalık kelimeleri veya becerileri ev ortamındaki günlük rutinlere entegre edin."
  },
  {
    id: "aba-terapisi",
    title: "Uygulamalı Davranış Analizi (ABA - Applied Behavior Analysis)",
    badge: "Davranışsal Yaklaşım",
    color: "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300",
    summary: "Dünya genelinde bilimsel etkinliği en yüksek düzeyde kanıtlanmış, davranışın öncülleri ve sonuçlarını inceleyerek yeni beceriler kazandıran yoğun öğretim yöntemidir.",
    paragraphs: [
      "Uygulamalı Davranış Analizi (ABA); öğrenme ve davranış ilkelerini temel alarak, otizmli bireylerde istenen sosyal ve iletişimsel becerileri artırmayı; çocuğun gelişimine veya çevreye zarar veren problem davranışları ise azaltmayı hedefleyen bilimsel bir disiplindir.",
      "Modern çağdaş ABA yaklaşımı (Ayrık Denemelerle Öğretim - DTT ve Doğal Ortam Öğretimi - NET); çocuğun motivasyonunu merkezine alan, oyun temelli ve pozitif pekiştirme odaklı bir süreçtir. Davranışlar 'A-B-C' modeli (Öncül - Davranış - Sonuç) ile analiz edilerek çocuğun neden zorlandığı bilimsel olarak çözülür."
    ],
    keyOutcomesTitle: "ABA Terapi Modelinin Sağladığı Avantajlar",
    keyOutcomes: [
      "Ölçülebilir İlerleme: Her seans ve her deneme veriyle takip edilir; gelişmeyen hedefler anında revize edilir.",
      "İletişim Talebi (Mand): Çocuğun isteklerini ağlamak yerine kelime, işaret veya görsel kartla talep etmesi sağlanır.",
      "Taklit ve Yönerge Takibi: Basit ve karmaşık motor taklit becerileri geliştirilerek konuşma ve öğrenme altyapısı kurulur.",
      "Problem Davranışların İşlevsel Çözümü: Öfke nöbetlerinin altındaki kök neden (kaçış, ilgi, nesne elde etme veya duyusal) bulunarak yerine uygun alternatif davranış öğretilir."
    ],
    homeTips: "İstenen bir davranışı gördükten hemen sonra (ilk 2-3 saniye içinde) çocuğu tebrik edin veya sevdiği bir aktiviteyle ödüllendirin. Pozitif pekiştirme öğrenmeyi kalıcı kılar."
  },
  {
    id: "teacch-modeli",
    title: "TEACCH Yöntemi: Yapılandırılmış Çevre ve Görsel Rutinler",
    badge: "Çevresel Yapılandırma",
    color: "bg-purple-100 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300",
    summary: "Kuzey Carolina Üniversitesi'nde geliştirilen; otizmli bireylerin güçlü görsel öğrenme yeteneklerinden yararlanarak fiziksel çevreyi ve zamanı öngörülebilir kılan eğitim modelidir.",
    paragraphs: [
      "TEACCH modeli, otizmli bireylerin dünyayı anlama biçimlerine saygı duyan ve öğrenme ortamını onların zihinsel ihtiyaçlarına göre uyarlayan 'Yapılandırılmış Öğretim' yaklaşımıdır. Otizmli çocuklar belirsizlikten, plansız geçişlerden ve soyut zaman kavramından yoğun kaygı duyarlar. TEACCH, 'Ne yapacağım?', 'Ne kadar yapacağım?', 'Bittiğinde ne olacak?' sorularını görsel olarak yanıtlar.",
      "Model dört temel yapılandırma katmanına dayanır: Fiziksel çevrenin düzenlenmesi (çalışma, dinlenme ve yemek alanlarının sınırlarının net olması), bireysel görsel çalışma çizelgeleri, soldan sağa iş istasyonları ve görsel görev materyalleri."
    ],
    keyOutcomesTitle: "TEACCH Sisteminin 4 Temel Ayağı",
    keyOutcomes: [
      "Fiziksel Çevre: Odanın ve masanın net sınırlarla bölünmesi, dikkat dağıtıcı uyaranların elenmesi.",
      "Görsel Günlük Program: Çocuğun gün boyunca hangi sırayla neler yaşayacağını gösteren resimli akış panoları.",
      "İş İstasyonları (Work Systems): Bağımsız çalışma becerisi kazandıran kutulu/sepetli görev tamamlama sistemi.",
      "Görselleştirilmiş Görevler: Malzemelerin kendisinin ne yapılacağını açıkça gösterdiği (ör. eşleme kutuları, montaj setleri) aktiviteler."
    ],
    homeTips: "Evde çocuğunuz için bir 'Görsel Günlük Rutin Panosu' oluşturun. Uyanma, kahvaltı, oyun, özel eğitim ve uyku adımlarını fotoğraflarla sıralayın. Tamamlanan adımı birlikte 'Bitti' kutusuna atın."
  },
  {
    id: "pecs-aac",
    title: "PECS ve Alternatif Destekleyici İletişim (AAC)",
    badge: "İletişim & Konuşma",
    color: "bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300",
    summary: "Resim Değiş Tokuşuna Dayalı İletişim Sistemi (PECS) ve tablet destekli AAC yazılımları, konuşma gecikmesi yaşayan çocuklara bağımsız iletişim gücü kazandırır.",
    paragraphs: [
      "PECS (Picture Exchange Communication System), konuşma dili henüz gelişmemiş veya çok sınırlı olan otizmli çocuklara iletişimi kendiliğinden başlatma becerisi kazandıran kanıta dayalı bir yöntemdir. Çocuk, istediği nesnenin resmini iletişim partnerine vererek takas eder. Bu süreç, iletişimin iki taraflı bir sosyal eylem olduğunu somutlaştırır.",
      "Yaygın ve hatalı bir inanışın aksine, PECS veya dijital AAC sistemleri (konuşma cihazları ve tablet yazılımları) konuşmayı geciktirmez veya engellemez. Tam aksine, yapılan klinik araştırmalar alternatif iletişim araçlarını kullanan çocukların dil alanındaki beyin merkezlerinin uyarıldığını ve sözel kelime çıkarma oranlarının belirgin biçimde arttığını kanıtlamaktadır."
    ],
    keyOutcomesTitle: "PECS Protokolünün 6 Aşaması",
    keyOutcomes: [
      "Aşama 1: Fiziksel Değiş Tokuş (İstediği nesnenin resmini uzatıp takas etme).",
      "Aşama 2: Mesafe ve Israr (Kitaba gidip resmi alma ve iletişim kuracağı kişiye yürüme).",
      "Aşama 3: Resim Ayırt Etme (İki veya daha fazla resim arasından doğru hedefi seçme).",
      "Aşama 4: Cümle Yapısı ('İstiyorum ...' cümle şeridi kurarak talep etme).",
      "Aşama 5: 'Ne İstiyorsun?' Sorusuna Yanıt Verme.",
      "Aşama 6: Yorum Yapma ve Spontane İletişim ('Görüyorum', 'Duyuyorum' ifadeleri)."
    ],
    homeTips: "Çocuğunuzun en sevdiği oyuncağı şeffaf kilitli bir kutuya koyun. Kutuyu açabilmesi için sizinle göz teması kurmasını veya nesnenin resmini size vermesini bekleyin; böylece doğal iletişim fırsatı yaratın."
  },
  {
    id: "ergoterapi-duyu",
    title: "Ergoterapi ve Duyu Bütünleme Terapisi",
    badge: "Duyu & Motor",
    color: "bg-rose-100 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300",
    summary: "Duyusal uyaranları organize etme güçlüğü (aşırı duyarlılık veya duyusal arayış) yaşayan çocukların çevresel uyumunu ve ince motor bağımsızlığını destekler.",
    paragraphs: [
      "Duyu bütünleme; çevreden ve vücudumuzdan gelen duyusal bilgilerin (görme, işitme, dokunma, tat, koku, vestibüler/denge ve propriyosepsiyon/derin duyu) beyin tarafından filtrelenip organize edilmesi sürecidir. Otizmli bireylerin yaklaşık %80'inde duyusal işlemleme farklılıkları mevcuttur.",
      "Ergoterapistler; çocuğun duyusal profilini değerlendirerek ona özel bir 'duyusal diyet' hazırlar. Salıncaklar, tırmanma duvarları, ağırlıklı battaniyeler, derin basınç masajları ve dokunsal materyallerle çalışan ergoterapi, çocuğun sinir sistemini regüle ederek öğrenmeye ve sosyal yaşama hazır hale gelmesini sağlar."
    ],
    keyOutcomesTitle: "Ergoterapinin Odaklandığı Alanlar",
    keyOutcomes: [
      "Duyusal Regülasyon: Aşırı ses, ışık veya dokunma hassasiyetinde sakinleşme stratejileri.",
      "İnce Motor Gelişim: Kalem tutma, makas kullanma, fermuar çekme ve düğme ilikleme becerileri.",
      "Öz Bakım Becerileri: Bağımsız yemek yeme, el yıkama ve tuvalet alışkanlığının kazanılması.",
      "Bilateral Koordinasyon: İki elin ve vücudun iki tarafının uyum içinde çalıştırılması."
    ],
    homeTips: "Çocuğunuz gün içinde aşırı hareketli veya huzursuz olduğunda 'ağır iş' (heavy work) aktiviteleri yaptırın: Minder taşıma, oyuncak sepetini itme, duvara itme egzersizleri derin basınç sağlayarak sinir sistemini sakinleştirir."
  },
  {
    id: "floortime-dir",
    title: "DIR / Floortime: Oyun ve İlişki Temelli Gelişim Modeli",
    badge: "İlişki & Etkileşim",
    color: "bg-teal-100 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300",
    summary: "Dr. Stanley Greenspan tarafından geliştirilen, çocuğun liderliğini takip ederek yere oturup oyun üzerinden sosyal-duygusal kapasiteyi inşa eden yaklaşımdır.",
    paragraphs: [
      "Floortime (yerde oyun) modeli; masabaşı yapılandırılmış öğretimden farklı olarak, çocuğun doğal ilgisini takip eder. Yetişkin, çocuğun neyle ilgilendiğini gözlemler ve onun oyununa saygıyla dahil olur. Amaç çocuğa talimat vermek değil; çocukla karşılıklı etkileşim döngüleri (circles of communication) kurmaktır.",
      "Modelin adı olan DIR; Gelişimsel (Developmental), Bireysel Farklılıklar (Individual differences) ve İlişki Temelli (Relationship-based) prensiplerini temsil eder. Çocukla paylaşılan neşe ve samimi ilişki, beynin en yüksek duygusal ve bilişsel işlevlerinin tetikleyicisidir."
    ],
    keyOutcomesTitle: "Floortime'ın 6 Temel Gelişim Basamağı",
    keyOutcomes: [
      "1. Sakinleşme ve Dünyayla İlgilenme (Ortak dikkat ve regülasyon).",
      "2. Yakınlık ve Bağ Kurma (Sosyal gülümseme ve neşeyi paylaşma).",
      "3. İki Yönlü İletişim Döngüleri (Ses ve jestlerle karşılıklı iletişim).",
      "4. Karmaşık İletişim ve Problem Çözme (İstek için ebeveyni yönlendirme).",
      "5. Duygusal Fikirler Yaratma (Sembolik oyun, bebek uyutma, araba sürme).",
      "6. Duygusal ve Mantıksal Düşünme ('Neden-Sonuç' bağlantıları kurma)."
    ],
    homeTips: "Günde en az 20-30 dakika boyunca telefonları kapatın, halının üzerine oturun. Çocuğunuz arabayı ters çevirip tekerleğini döndürüyorsa siz de bir araba alıp aynısını yapın. Onun dünyasına girin, ardından küçük bir tebessümle yeni bir oyun adımı teklif edin."
  }
];

export default function EducationPage() {
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
          <span className="text-zinc-800 dark:text-zinc-200">Özel Eğitim ve Terapi Yöntemleri</span>
        </div>
      </div>

      {/* Hero Header */}
      <section className="bg-gradient-to-b from-emerald-500/10 via-teal-500/5 to-transparent py-12 sm:py-16 border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-black tracking-wide uppercase">
            <GraduationCap className="w-4 h-4" />
            <span>Kanıta Dayalı Özel Eğitim Kılavuzu</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight">
            Otizmde Özel Eğitim ve Terapi Metotları
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 font-medium max-w-3xl mx-auto leading-relaxed">
            ABA, TEACCH, PECS, Ergoterapi, Dil Terapisi ve Floortime: Otizm spektrumundaki çocukların bağımsızlaşmasını ve iletişim kurmasını sağlayan dünyaca kabul görmüş bilimsel yöntemler.
          </p>

          {/* Hızlı Gezinme Butonları */}
          <div className="pt-4 flex flex-wrap justify-center gap-2">
            {EDUCATION_METHODS.map((m) => (
              <a
                key={m.id}
                href={`#${m.id}`}
                className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-bold text-zinc-700 dark:text-zinc-300 hover:border-emerald-500 hover:text-emerald-600 transition shadow-sm"
              >
                {m.badge}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Main Articles Stream */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-16 flex-1 w-full">
        {EDUCATION_METHODS.map((item, index) => (
          <article
            key={item.id}
            id={item.id}
            className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 p-8 sm:p-12 shadow-sm hover:shadow-md transition-shadow space-y-8"
          >
            {/* Header */}
            <div className="space-y-4 border-b border-zinc-100 dark:border-zinc-800/80 pb-6">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-black text-xs flex items-center justify-center">
                  0{index + 1}
                </span>
                <span className={cn("px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider", item.color)}>
                  {item.badge}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight leading-snug">
                {item.title}
              </h2>
              <p className="text-base sm:text-lg font-semibold text-teal-800 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/30 p-4 rounded-2xl border border-teal-100 dark:border-teal-900/30">
                {item.summary}
              </p>
            </div>

            {/* Content Paragraphs */}
            <div className="space-y-5 text-base sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
              {item.paragraphs.map((p, pIdx) => (
                <p key={pIdx}>{p}</p>
              ))}
            </div>

            {/* Key Outcomes */}
            <div className="p-6 sm:p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-4">
              <h3 className="text-lg font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span>{item.keyOutcomesTitle}</span>
              </h3>
              <ul className="space-y-3 pl-1 sm:pl-2">
                {item.keyOutcomes.map((point, kIdx) => (
                  <li key={kIdx} className="flex items-start gap-3 text-sm sm:text-base text-zinc-700 dark:text-zinc-300">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 mt-2 shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Home Tips Box */}
            <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 text-emerald-950 dark:text-emerald-200 space-y-2">
              <div className="font-black text-xs uppercase tracking-wider flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
                <Heart className="w-4 h-4" />
                <span>Aileler İçin Evde Pratik Uygulama Önerisi</span>
              </div>
              <p className="text-sm sm:text-base font-medium leading-relaxed">
                {item.homeTips}
              </p>
            </div>
          </article>
        ))}

        {/* Çok Yönlü Terapi Planı Rehberi */}
        <section className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 p-8 sm:p-12 shadow-sm space-y-6">
          <h2 className="text-2xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight flex items-center gap-2">
            <Activity className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            <span>Başarılı Bir Eğitim Planı Nasıl Oluşturulur?</span>
          </h2>
          <p className="text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
            Tek bir yöntem tüm otizmli çocuklar için mucizevi bir çözüm değildir. En yüksek gelişimsel verim; çocuğun bireysel ihtiyaçlarına göre özel eğitim, ergoterapi ve dil-konuşma terapisinin bir arada, okul ve aile koordinasyonuyla yürütüldüğü bütüncül (multidisipliner) modellerde elde edilir.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
            <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-2">
              <h4 className="font-black text-base text-zinc-900 dark:text-zinc-100">1. Erken ve Yoğun Başlangıç</h4>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">Haftalık yeterli ders saati ve erken yaşta başlanan yapılandırılmış müdahale.</p>
            </div>
            <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-2">
              <h4 className="font-black text-base text-zinc-900 dark:text-zinc-100">2. Aile Katılımı ve Genelleme</h4>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">Merkezde öğrenilen her becerinin evde rutinlere ve oyuna taşınması.</p>
            </div>
            <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-2">
              <h4 className="font-black text-base text-zinc-900 dark:text-zinc-100">3. Veri Temelli Takip</h4>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">Hedeflerin somut grafiklerle izlenmesi ve çocuğun hızına göre hedeflerin güncellenmesi.</p>
            </div>
          </div>
        </section>

        {/* Rehbere Dönüş Banner */}
        <section className="bg-gradient-to-r from-teal-600 to-emerald-700 text-white rounded-[2.5rem] p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">Detaylı Makalelerimizi Okudunuz mu?</h3>
            <p className="text-teal-100 text-sm sm:text-base max-w-xl font-medium leading-relaxed">
              Özel eğitim teknikleri, ABA uygulamaları ve duyu bütünleme hakkında hazırladığımız derinlemesine rehber yazılarımızı keşfedin.
            </p>
          </div>
          <Link
            href="/rehber"
            className="px-8 py-4 rounded-2xl bg-white text-teal-900 font-black text-sm uppercase tracking-wider hover:bg-teal-50 transition shadow-lg shrink-0"
          >
            Rehber Kütüphanesine Git
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
            <Link href="/hakkimizda" className="hover:text-emerald-600 transition">Hakkımızda</Link>
            <Link href="/iletisim" className="hover:text-emerald-600 transition">İletişim</Link>
            <Link href="/gizlilik" className="hover:text-emerald-600 transition">Gizlilik Politikası</Link>
          </div>
          <p>© 2026 OtiZeka Platformu. Tüm hakları saklıdır. Bu içerikler yalnızca bilgilendirme ve eğitim amaçlıdır.</p>
        </div>
      </footer>
    </div>
  );
}
