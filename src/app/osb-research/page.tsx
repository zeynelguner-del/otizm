import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function OsbResearchPage() {
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
          <h1 className="text-3xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
            Otizm Spektrum Bozukluğu (OSB) üzerine yürütülen küresel ve ulusal araştırmalar
          </h1>
          <p className="text-zinc-500 font-medium">Araştırma başlıkları ve öne çıkan bulgular</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto space-y-8">
        <section className="bg-white dark:bg-zinc-900 p-10 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-xl space-y-8">
          <div className="space-y-3">
            <h2 className="text-2xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">1. Beyin İçi İletişim ve Hücresel Yapı Farklılıkları</h2>
            <div className="space-y-4 text-zinc-700 dark:text-zinc-300 font-medium leading-relaxed">
              <p>
                University of Aberdeen (İskoçya - 2025): Nature Communications dergisinde yayımlanan çığır açıcı çalışmada, beyindeki hücreler
                arası destek ve sinyal ağı olan Ekstrasellüler Matriks (ECM) ilk kez haritalandırılmıştır. Araştırma, otizmle ilişkili genlerin bu
                hücresel iskele (matrizom) sistemindeki “kablolama” talimatlarını nasıl değiştirdiğini kanıtlamıştır. Bu durum, beynin erken gelişim
                aşamalarında sinirsel bölgeler arası veri iletiminde yapısal hız ve bant genişliği farklılıklarına yol açmaktadır.
              </p>
              <p>
                Harvard University (Tan Yang Autism Center - 2025): Nörotransmitter mekanizmaları üzerine yoğunlaşan merkez, sinapslar arası kimyasal
                iletimde (özellikle serotonin ve glutamat dengesinde) yaşanan düzensizliklerin spektrumdaki duyusal hassasiyetleri ve tekrarlayıcı
                davranış biçimlerini doğrudan tetiklediğini hücresel düzeyde doğrulamıştır.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">2. Genetik Mekanizmalar, Yapay Zeka ve Cinsiyet Faktörü</h2>
            <div className="space-y-4 text-zinc-700 dark:text-zinc-300 font-medium leading-relaxed">
              <p>
                Princeton University &amp; Simons Foundation (ABD - 2025): Geliştirilen ileri düzey makine öğrenmesi ve yapay zeka algoritmaları sayesinde,
                daha önce otizm riskiyle ilişkisi bilinen 65 genin ötesine geçilerek 2.500 yeni risk geni tanımlanmıştır.
              </p>
              <p>
                Baylor College of Medicine (ABD - 2025/2026): Autism Research Institute (ARI) tarafından ödüllendirilen çalışmalarda, kız çocuklarının beyin
                yapısındaki biyolojik direnç (dişi koruyucu etkisi) moleküler düzeyde incelenmiştir. Araştırmalar, kız çocuklarında benzer semptomların ortaya
                çıkması için erkek çocuklara kıyasla çok daha yoğun ve birikimli bir genetik mutasyon yükü gerektiğini doğrulamıştır.
              </p>
              <p>
                Üsküdar Üniversitesi (Türkiye): Nöroteknoloji ve nörobilim odaklı yürütülen moleküler çalışmalarda, vücutta enflamasyona yol açan TNFα sitokin
                düzeyinin artışının, beyindeki GRID2 genini baskıladığı keşfedilmiştir. Bu çalışma, glutamat reseptör mekanizmasındaki bu baskılanmanın otizm
                patogenezinde doğrudan rol oynadığını gösteren uluslararası literatürdeki ilk araştırma (Neuroscience Letters) olmuştur.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">3. Çevresel Tetikleyiciler, Epigenetik ve Yanılgılar</h2>
            <div className="space-y-4 text-zinc-700 dark:text-zinc-300 font-medium leading-relaxed">
              <p>
                UC Davis MIND Institute (California, ABD - 2025/2026): Çevresel toksikoloji ve epidemiyoloji alanında dünyanın en prestijli otizm kongresi olan
                INSAR 2026&apos;ya da yön veren enstitü, genetik yatkınlığı olan fetüslerin/bebeklerin tarım ilaçlarına (pestisitler), plastik türevlerine (PCB)
                ve ağır metallere maruz kalmasının epigenetik mekanizmaları tetiklediğini raporlamıştır.
              </p>
              <p>
                Ege Üniversitesi (Türkiye - 2026): Engelsiz Ege Koordinatörlüğü ve Özel Eğitim Uygulama ve Araştırma Merkezi tarafından yapılan klinik açıklamalarda,
                toplumdaki “ekran maruziyeti veya ilgisizlik otizme yol açar” algısının tamamen yanlış olduğu; tablonun tamamen genetik temelli nörogelişimsel bir
                süreç olduğu ve bakım verme hatalarından kaynaklanamayacağı vurgulanmıştır.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">4. Biyolojik Alt Tiplerin Keşfi (Kişiselleştirilmiş Tıp)</h2>
            <div className="space-y-4 text-zinc-700 dark:text-zinc-300 font-medium leading-relaxed">
              <p>
                Princeton University &amp; Simons Foundation Ortaklığı (2025): 5.000&apos;den fazla otizmli çocuğun derin klinik ve biyolojik verileri bilgisayar
                modellemeleriyle taranmıştır. Bu büyük veri analizi sonucunda, otizmin tek bir homojen durum olmadığı, 4 farklı biyolojik alt tipe ayrıldığı
                kesinleşmiştir. Her alt tipin kendine has hücresel mekanizmaları, gelişimsel gidişatları ve tedavi yanıtları bulunmaktadır. Bu keşif, gelecekte tek
                tip tedavi yerine “kişiye özel nöro-terapi” çağını başlatmıştır.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">5. Erken Tanı ve Bilimsel Eğitim Modelleri</h2>
            <div className="space-y-4 text-zinc-700 dark:text-zinc-300 font-medium leading-relaxed">
              <p>
                University of Toronto (Kanada - 2025): Bilgisayarlı görme (computer vision) ve ses analitiği yapay zekası kullanılarak, bebeklerin erken dönemdeki
                motor hareketleri, ağlama frekansları ve sosyal yönelimleri takip edilmektedir. Amaç, klinik tanı kriterleri henüz tam karşılanmadan (konuşma
                geriliği ve stereotipik hareketler oturmadan) önce risk skorlaması yapmaktır.
              </p>
              <p>
                İstinye Üniversitesi &amp; Hacettepe Üniversitesi (Türkiye): Akademik klinik raporlarda, otizmin çekirdek semptomlarını tamamen ortadan kaldıracak
                küresel bir ilaç formülünün henüz bulunmadığı teyit edilmiştir. Bilimsel olarak etkinliği, kalıcılığı ve beynin plastik yapısını (nöroplastisiteyi)
                yeniden yapılandırdığı kanıtlanmış tek yöntemin erken yaşta başlayan, yoğun ve bireyselleştirilmiş Özel Eğitim olduğu üniversitelerin ortak konsensüsü
                olarak deklare edilmiştir.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
