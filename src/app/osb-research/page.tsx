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

          <div className="space-y-4">
            <h2 className="text-2xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
              UC Davis MIND Institute, Princeton Üniversitesi ve Üsküdar Üniversitesi’nin en son gerçekleştirdiği araştırmaların teknik detayları, moleküler
              mekanizmaları ve klinik sonuçları
            </h2>

            <div className="space-y-8 text-zinc-700 dark:text-zinc-300 font-medium leading-relaxed">
              <div className="space-y-3">
                <h3 className="text-xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">1. Princeton Üniversitesi ve Simons Foundation: 4 Biyolojik Alt Tipin Klinik Özellikleri</h3>
                <p>
                  Princeton Üniversitesi, 5.000&apos;den fazla otizmli bireyin beyin görüntüleme (fMRG), gen dizileme ve klinik davranış verilerini yapay zeka tabanlı
                  kümeleme (clustering) algoritmalarıyla analiz ederek otizmi 4 ana biyolojik alt tipe ayırmıştır.
                </p>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="font-black text-zinc-900 dark:text-zinc-50">Tip 1: Sosyal ve İletişimsel Odaklı Küme</div>
                    <div>
                      <span className="font-black text-zinc-900 dark:text-zinc-50">Moleküler Altyapı:</span> Dil gelişimi ve sosyal bağlanma ile ilişkili gen
                      varyasyonları (örn. FOXP2 ve OXT oksitosin reseptör yolları) baskındır.
                    </div>
                    <div>
                      <span className="font-black text-zinc-900 dark:text-zinc-50">Klinik Görünüm:</span> Motor becerileri ve genel zeka düzeyi tipik sınırlardadır.
                      Ancak göz teması kurma, sosyal ipuçlarını okuma, empati ve karşılıklı konuşmayı sürdürme alanlarında derin nöral senkronizasyon eksikliği
                      yaşarlar.
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="font-black text-zinc-900 dark:text-zinc-50">Tip 2: Duyusal-Motor ve Stereotipik Küme</div>
                    <div>
                      <span className="font-black text-zinc-900 dark:text-zinc-50">Moleküler Altyapı:</span> Beynin motor planlama ve duyusal entegrasyon merkezlerini
                      (bazal ganglionlar ve talamus) yöneten genlerde mutasyonlar izlenir.
                    </div>
                    <div>
                      <span className="font-black text-zinc-900 dark:text-zinc-50">Klinik Görünüm:</span> Yoğun tekrarlayıcı hareketler (el çırpma, sallanma) ve aşırı
                      duyusal hassasiyetler (ses, ışık, dokunma reaksiyonları) ön plandadır. Sosyal beceriler bu hassasiyetlerin yönetilmesiyle kısmen stabil
                      kalabilir.
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="font-black text-zinc-900 dark:text-zinc-50">Tip 3: Gelişimsel Gecikme ve Bilişsel Etkilenme Kümesi</div>
                    <div>
                      <span className="font-black text-zinc-900 dark:text-zinc-50">Moleküler Altyapı:</span> Erken embriyonik dönemde beyin kabuğunun (korteks)
                      tabakalaşmasını yöneten büyük ölçekli kromozomal kopya sayısı varyasyonları (CNV) ile ilişkilidir.
                    </div>
                    <div>
                      <span className="font-black text-zinc-900 dark:text-zinc-50">Klinik Görünüm:</span> Konuşmanın hiç gelişmemesi veya ciddi şekilde gecikmesi, motor
                      becerilerde yavaşlık ve zihinsel gelişim süreçlerinde ek destek ihtiyacı ile karakterizedir.
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="font-black text-zinc-900 dark:text-zinc-50">Tip 4: Geniş Kapsamlı ve Medikal Komorbidite Kümesi</div>
                    <div>
                      <span className="font-black text-zinc-900 dark:text-zinc-50">Moleküler Altyapı:</span> Sadece sinir sistemini değil; bağışıklık ve sindirim
                      sistemini de düzenleyen multi-sistemik genetik yolaklar (örn. PTEN ve TSC gen mutasyonları) aktiftir.
                    </div>
                    <div>
                      <span className="font-black text-zinc-900 dark:text-zinc-50">Klinik Görünüm:</span> Spektrum semptomlarına eş zamanlı olarak dirençli epilepsi,
                      uyku bozuklukları, ağır gastrointestinal (mide-bağırsak) sorunlar ve kronik nöro-enflamasyon eşlik eder.
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">2. Üsküdar Üniversitesi: GRID2 Geni ve Glutamat Mekanizması</h3>
                <p>
                  Üsküdar Üniversitesi bünyesinde yürütülen moleküler nörobilim çalışmaları, otizmin arkasındaki hücresel mekanizmalardan birini
                  &quot;Eksitasyon/İnhibisyon (Uyarılma/Baskılanma) Dengesizliği&quot; üzerinden açıklamış ve uluslararası literatüre sunmuştur.
                </p>
                <p>
                  [Sistemik Enflamasyon (TNFα Artışı)] ──&gt; [GRID2 Geninin Baskılanması] ──&gt; [Glutamat Reseptör Kusuru] ──&gt; [Beyinde Aşırı Elektriksel
                  Uyarılma (Duyusal Aşırı Yüklenme)]
                </p>
                <p>
                  <span className="font-black text-zinc-900 dark:text-zinc-50">GRID2 Geninin Rolü:</span> Bu gen, beyincikte (serebellum) bulunan ve hareket kontrolü
                  ile duyusal bilgilerin işlenmesinden sorumlu olan Purkinje hücrelerindeki İyonotropik Glutamat Reseptörü Delta-2 proteinini kodlar.
                </p>
                <p>
                  <span className="font-black text-zinc-900 dark:text-zinc-50">Sitokin (TNFα) Tetiklemesi:</span> Araştırma, vücuttaki veya beyindeki kronik
                  enflamasyonun (bağışıklık sistemi aktivasyonu) bir göstergesi olan TNFα adlı molekülün yükseldiğinde, GRID2 geninin ifadesini (ekspresyonunu)
                  baskıladığını kanıtlamıştır.
                </p>
                <p>
                  <span className="font-black text-zinc-900 dark:text-zinc-50">Nöral Sonuç:</span> GRID2 geninin işlevini tam yapamaması, sinapslarda ana uyarıcı
                  kimyasal olan glutamatın geri emilimini ve dengelenmesini bozar. Beyin hücreleri aşırı uyarılır. Bu durum otizmli bireylerde duyusal bilgilerin
                  filtrelenememesine (duyusal aşırı yüklenme), motor koordinasyon sorunlarına ve öğrenme süreçlerindeki farklılıklara yol açar.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
                  3. UC Davis MIND Institute: Yaşlanma ve Yetişkinlik Dönemi Otizm Araştırmaları
                </h3>
                <p>
                  UC Davis MIND Institute, otizmin sadece bir çocukluk dönemi durumu olmadığını, yaşam boyu süren nörobiyolojik bir süreç olduğunu boylamsal
                  (longitudinal) çalışmalarla ortaya koymaktadır.
                </p>
                <p>
                  <span className="font-black text-zinc-900 dark:text-zinc-50">Nörolojik Yaşlanma Hızı:</span> Enstitünün beyin görüntüleme arşivleri üzerinde yaptığı
                  incelemeler, otizmli bireylerin beyinlerindeki bazı bölgelerin (özellikle prefrontal korteks) yaşlanma ile birlikte tipik gelişim gösteren
                  bireylere göre daha hızlı hacim kaybına uğrayabildiğini göstermiştir.
                </p>
                <p>
                  <span className="font-black text-zinc-900 dark:text-zinc-50">Bağışıklık Sistemi ve Hücresel Yaşlanma:</span> Yetişkin otizmli bireylerde, hücresel
                  yaşlanmayı gösteren telomer kısalmasının ve hücresel stres düzeylerinin daha yüksek olduğu saptanmıştır. Bu durum, yaşlandıkça kardiyovasküler
                  sistem ve metabolik rahatsızlıkların spektrumdaki bireylerde daha erken yaşlarda görülme riskini artırmaktadır.
                </p>
                <p>
                  <span className="font-black text-zinc-900 dark:text-zinc-50">Klinik &quot;Maskeleme&quot; ve Ruh Sağlığı:</span> Yetişkinlik dönemine ulaşmış, tanı
                  almamış veya geç tanı almış yüksek işlevli otizmli bireylerin (özellikle kadınların), sosyal hayata uyum sağlamak için geliştirdikleri
                  &quot;kamuflaj/maskeleme&quot; stratejilerinin, orta ve ileri yaşlarda ağır tükenmişlik (autistic burnout), klinik depresyon ve anksiyete
                  bozukluklarını tetiklediği enstitünün klinik raporlarında doğrulanmıştır.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
              Otizmin tanı anından yetişkinlikteki moleküler tedavisine kadar olan süreci tamamen kişiselleştirilmiş tıp ve eğitim modeline dönüştürmesi
            </h2>

            <div className="space-y-8 text-zinc-700 dark:text-zinc-300 font-medium leading-relaxed">
              <div className="space-y-3">
                <h3 className="text-xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">I. Princeton 4 Alt Tipi İçin Kişiye Özel Eğitim ve Terapi Modelleri</h3>
                <p>
                  Princeton Üniversitesi’nin yapay zeka ile ayrıştırdığı 4 biyolojik alt tip, &quot;tek tip eğitim&quot; dönemini kapatarak doğrudan hedefe yönelik
                  terapi modellerini zorunlu kılmaktadır.
                </p>

                <div className="space-y-5">
                  <div className="space-y-2">
                    <div className="font-black text-zinc-900 dark:text-zinc-50">1. Tip 1 (Sosyal ve İletişimsel Odaklı Küme) Terapi Modeli</div>
                    <div>
                      <span className="font-black text-zinc-900 dark:text-zinc-50">Odak Noktası:</span> Doğrudan akran etkileşimi, sosyal semantika ve jest-mimik okuma.
                    </div>
                    <div>
                      <span className="font-black text-zinc-900 dark:text-zinc-50">Uygulanan Model:</span> DIR/Floortime ve Sosyal Öyküler (Social Stories).
                    </div>
                    <div>
                      <span className="font-black text-zinc-900 dark:text-zinc-50">Metot:</span> Çocuğun liderliği takip edilerek nöral bağlanma mekanizmaları
                      (oksitosin yolakları) sosyal oyunlarla uyarılır. Akademik veya motor becerilere zaman harcamak yerine, karşılıklı iletişim döngüleri (circle of
                      communication) genişletilir.
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="font-black text-zinc-900 dark:text-zinc-50">2. Tip 2 (Duyusal-Motor ve Stereotipik Küme) Terapi Modeli</div>
                    <div>
                      <span className="font-black text-zinc-900 dark:text-zinc-50">Odak Noktası:</span> Duyusal bütünleme, talamik filtreleme ve motor planlama.
                    </div>
                    <div>
                      <span className="font-black text-zinc-900 dark:text-zinc-50">Uygulanan Model:</span> Ayres Duyusal Bütünleme (ASI) ve Yoğun Davranışsal Analiz
                      (ABA) modifikasyonu.
                    </div>
                    <div>
                      <span className="font-black text-zinc-900 dark:text-zinc-50">Metot:</span> Bu grupta stereotipik (tekrarlayıcı) hareketler doğrudan engellenmez.
                      Hareketlerin altında yatan duyusal arayış (örneğin propriyoseptif veya vestibüler ihtiyaç) tespit edilir. Salıncaklar, ağırlıklı yelekler ve
                      derin basınç terapileriyle sinir sistemi yatıştırıldıktan sonra fonksiyonel beceri eğitimine geçilir.
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="font-black text-zinc-900 dark:text-zinc-50">3. Tip 3 (Gelişimsel Gecikme ve Bilişsel Etkilenme) Terapi Modeli</div>
                    <div>
                      <span className="font-black text-zinc-900 dark:text-zinc-50">Odak Noktası:</span> Alternatif iletişim kanalları kurma ve fonksiyonel yaşam becerileri.
                    </div>
                    <div>
                      <span className="font-black text-zinc-900 dark:text-zinc-50">Uygulanan Model:</span> PECS (Resim Değiş Tokuşuna Dayalı İletişim Sistemi) ve EDM
                      (Erken Başlangıç Denver Modeli).
                    </div>
                    <div>
                      <span className="font-black text-zinc-900 dark:text-zinc-50">Metot:</span> Alıcı ve ifade edici dil gecikmesini kompanse etmek için görsel destek
                      sistemleri (AAC) en erken evrede devreye sokulur. Nöroplastisiteden maksimum faydalanmak adına haftalık 20-40 saat arası çok yoğun,
                      yapılandırılmış davranışsal eğitim uygulanır.
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="font-black text-zinc-900 dark:text-zinc-50">4. Tip 4 (Geniş Kapsamlı ve Medikal Komorbidite) Terapi Modeli</div>
                    <div>
                      <span className="font-black text-zinc-900 dark:text-zinc-50">Odak Noktası:</span> Önce tıbbi stabilizasyon, ardından multidisipliner destek.
                    </div>
                    <div>
                      <span className="font-black text-zinc-900 dark:text-zinc-50">Uygulanan Model:</span> Medikal-Biyolojik Destekli Özel Eğitim.
                    </div>
                    <div>
                      <span className="font-black text-zinc-900 dark:text-zinc-50">Metot:</span> Epilepsi, uyku ve ağır gastrointestinal sorunlar çözülmeden eğitim
                      modelleri yanıt vermez. Çocuk hekimi, çocuk psikiyatristi, diyetisyen ve özel eğitimci ortak bir protokol yürütür. İnflamasyonu azaltıcı
                      diyetler ve nöro-enflamasyon terapileri eşliğinde esnek eğitim saatleri uygulanır.
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">II. Üsküdar Üniversitesi Glutamat Keşfinin İlaç Araştırmalarına Etkisi</h3>
                <p>
                  Üsküdar Üniversitesi&apos;nin GRID2 geni ve TNFα sitokin artışı arasındaki bağı çözmesi, otizmde semptom bastırmak yerine hücresel köke inen
                  farmakolojik stratejilerin önünü açmıştır:
                </p>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="font-black text-zinc-900 dark:text-zinc-50">1. Hedefli Glutamat Regülatörleri (Eksitotoksisiteyi Önleme)</div>
                    <p>
                      Beyinde glutamatın aşırı birikmesi (nöral uyarılma patlaması), duyusal filtrenin çökmesine ve anksiyeteye yol açar. Geliştirilecek yeni nesil
                      moleküller, GRID2 reseptörlerinin duyarlılığını yapay olarak artırarak veya glutamatın sinaptik aralıktan geri emilimini hızlandırarak beyni bu
                      &quot;aşırı yüklenmeden&quot; korumayı hedeflemektedir.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="font-black text-zinc-900 dark:text-zinc-50">2. Antienflamatuar ve Sitokin Engelleyici Terapiler</div>
                    <p>
                      Araştırma, sistemik enflamasyonun (TNFα biyobelirtecinin) GRID2 genini doğrudan baskıladığını ortaya koyduğu için, nöro-enflamasyonu hedef alan
                      monoklonal antikorlar veya biyolojik ajanlar yeni tedavi protokollerine adaydır. Vücuttaki enflamasyon baskılandığında, GRID2 geni üzerindeki
                      epigenetik blokaj kalkacak ve beyin kendi glutamat dengesini doğal yolla kurabilecektir.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="font-black text-zinc-900 dark:text-zinc-50">3. Gen Tedavileri ve mRNA Teknolojisi</div>
                    <p>
                      GRID2 geni mutasyonu veya fonksiyon kaybı yaşayan bireylerde, CRISPR veya koruyucu viral vektörler aracılığıyla doğrudan Purkinje hücrelerine
                      sağlıklı GRID2 gen talimatlarının iletilmesi, uzun vadeli ve kalıcı tedavi araştırmalarının odak noktası haline gelmiştir.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
                  III. Erken Çocukluk Döneminde Bu Mekanizmaların İlk Klinik Sinyalleri
                </h3>
                <p>
                  Yukarıda bahsedilen moleküler ve yapısal sapmalar, bebek daha 6-18 aylıkken dış dünyaya belirli klinik sinyaller (kırmızı bayraklar) olarak yansır:
                </p>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="font-black text-zinc-900 dark:text-zinc-50">1. Hücresel İletişim (Kablolama) Farklılığının Sinyalleri (0-9 Ay)</div>
                    <div>
                      <span className="font-black text-zinc-900 dark:text-zinc-50">İsme Tepkisizlik:</span> Beyin bölgeleri arası senkronizasyon eksikliği nedeniyle,
                      bebek arkasından seslenildiğinde sesi işitir ancak bu sesi &quot;sosyal bir uyaran&quot; olarak önceliklendirip başını çevirmez.
                    </div>
                    <div>
                      <span className="font-black text-zinc-900 dark:text-zinc-50">Sosyal Gülümseme Eksikliği:</span> 2-3. aylarda gelişmesi gereken, annenin yüzüne
                      bakarak gülümseme reaksiyonunda gecikme veya donuk yüz ifadesi.
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="font-black text-zinc-900 dark:text-zinc-50">2. GRID2 ve Glutamat Dengesi Bozukluğunun Sinyalleri (9-12 Ay)</div>
                    <div>
                      <span className="font-black text-zinc-900 dark:text-zinc-50">Duyusal Aşırı Reaksiyon veya Tepkisizlik:</span> Serebellumsal ve talamik filtreleme
                      çalışmadığı için, normal bir ev sesinden (blender, elektrik süpürgesi) acı çekiyormuşçasına ağlama ya da tam tersi yaralanmalara/acılara karşı
                      aşırı tepkisizlik.
                    </div>
                    <div>
                      <span className="font-black text-zinc-900 dark:text-zinc-50">Göz Takibinde Sapma:</span> Ortak dikkat mekanizmasının kurulamaması. Yetişkinin
                      parmağı ile işaret ettiği nesneye bakmak yerine, sadece işaret eden parmağa odaklanıp kalma.
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="font-black text-zinc-900 dark:text-zinc-50">3. Erken Motor ve Davranışsal Sinyaller (12-18 Ay)</div>
                    <div>
                      <span className="font-black text-zinc-900 dark:text-zinc-50">Taklit Becerilerinin Yokluğu:</span> &quot;Baybay&quot; yapma, &quot;ceee&quot;
                      oyunu oynama veya alkışlama gibi aynalama mekanizmasına dayalı motor hareketlerin taklit edilememesi.
                    </div>
                    <div>
                      <span className="font-black text-zinc-900 dark:text-zinc-50">Görsel ve Nesnesel Fiksasyonlar:</span> Oyuncak arabayı sürmek yerine ters çevirip
                      tekerleğini dakikalarca döndürmek, dönen nesnelere (vantilatör, çamaşır makinesi) kilitlenmek.
                    </div>
                    <div>
                      <span className="font-black text-zinc-900 dark:text-zinc-50">Babıldama Gerilemesi:</span> 12. aya kadar anlamlı ses birleştirmelerinin (ba-ba,
                      ma-ma) hiç olmaması veya var olan seslerin/kelimelerin 15-18. aylar arasında aniden bıçak gibi kesilerek kaybolması (regresyon).
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">Mekanizmaların pratik takibini yapmak</h2>

            <div className="space-y-8 text-zinc-700 dark:text-zinc-300 font-medium leading-relaxed">
              <div className="space-y-3">
                <h3 className="text-xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">I. Evde M-CHAT-R/F Tarama Ölçeği ve Puanlama Sistemi</h3>
                <p>
                  M-CHAT-R (Değiştirilmiş Erken Çocukluk Dönemi Otizm Tarama Ölçeği), 16-30 ay arası çocuklarda riski belirleyen 20 soruluk bir tarama aracıdır. Tanı
                  koymaz, risk seviyesini ölçer.
                </p>

                <div className="space-y-3">
                  <div className="font-black text-zinc-900 dark:text-zinc-50">Kritik 20 Madde ve Cevap Anahtarı</div>
                  <p>Aşağıdaki sorulara çocuğun genel ve sürekli davranışlarını düşünerek &quot;Evet&quot; veya &quot;Hayır&quot; cevabı verin.</p>

                  <ol className="list-decimal pl-6 space-y-2">
                    <li>Çocuğunuzu havaya kaldırdığınızda veya dizinizde salladığınızda eğlenir mi? (Normal: Evet)</li>
                    <li>Çocuğunuz diğer çocuklarla ilgilenir mi? (Normal: Evet)</li>
                    <li>Çocuğunuz eşyaların üzerine tırmanmaktan hoşlanır mı? (Normal: Evet)</li>
                    <li>Çocuğunuz ce-e veya saklambaç oynamaktan hoşlanır mı? (Normal: Evet)</li>
                    <li>Çocuğunuz hiç işaret parmağını kullanarak bir şeyi rica etti mi? (Normal: Evet)</li>
                    <li>Çocuğunuz hiç işaret parmağını kullanarak ilginç bir şeyi size gösterdi mi? (Normal: Evet)</li>
                    <li>Çocuğunuz oyuncak arabalar veya küplerle (amaca uygun) oynar mı? (Normal: Evet)</li>
                    <li>Çocuğunuz size bir nesne getirip gösterir mi? (Normal: Evet)</li>
                    <li>Çocuğunuz gözünüzün içine 1-2 saniyeden uzun bakar mı? (Normal: Evet)</li>
                    <li>Çocuğunuz aşırı hassas (sese/dokunmaya reaksiyon) görünür mü? (Normal: Hayır)</li>
                    <li>Çocuğunuz size gülümsediğinizde gülümsemeyle karşılık verir mi? (Normal: Evet)</li>
                    <li>Çocuğunuz ismine hemen tepki verir mi? (Normal: Evet)</li>
                    <li>Odanın diğer ucundaki bir oyuncağa işaret ettiğinizde çocuk oyuncağa bakar mı? (Normal: Evet)</li>
                    <li>Çocuğunuz yürüyebiliyor mu? (Normal: Evet)</li>
                    <li>Çocuğunuz sizin baktığınız şeye bakar mı? (Normal: Evet)</li>
                    <li>Çocuğunuz yüzünün yakınında garip parmak hareketleri yapar mı? (Normal: Hayır)</li>
                    <li>Çocuğunuz etrafındaki insanların yaptıklarını taklit etmeye çalışır mı? (Normal: Evet)</li>
                    <li>Çocuğunuza seslendiğinizde kulakları duymuyormuş gibi hissettiğiniz olur mu? (Normal: Hayır)</li>
                    <li>Çocuğunuz etrafındaki insanların ne söylediğini anlar mı? (Normal: Evet)</li>
                    <li>Çocuğunuz bazen boşluğa bakar mı veya amaçsızca dolanır mı? (Normal: Hayır)</li>
                  </ol>
                </div>

                <div className="space-y-3">
                  <div className="font-black text-zinc-900 dark:text-zinc-50">Puanlama ve Risk Skalası</div>
                  <p>
                    &quot;Normal&quot; dışındaki her cevap 1 puan olarak kaydedilir. (Örn: 2. soruya &quot;Hayır&quot; demek 1 puan, 10. soruya &quot;Evet&quot; demek
                    1 puan).
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <span className="font-black text-zinc-900 dark:text-zinc-50">0 - 2 Puan (Düşük Risk):</span> Genel gelişim takibine devam edilir. Çocuk 24 aydan
                      küçükse, 24 ayından sonra test tekrarlanmalıdır.
                    </li>
                    <li>
                      <span className="font-black text-zinc-900 dark:text-zinc-50">3 - 7 Puan (Orta Risk):</span> M-CHAT-R/F takip görüşmesi yapılmalıdır. Risk devam
                      ediyorsa çocuk psikiyatristine başvurulmalıdır.
                    </li>
                    <li>
                      <span className="font-black text-zinc-900 dark:text-zinc-50">8 - 20 Puan (Yüksek Risk):</span> Vakit kaybetmeden doğrudan bir Çocuk ve Ergen Ruh
                      Sağlığı uzmanına (Psikiyatrist) ve Erken Müdahale/Özel Eğitim merkezine başvurulması zorunludur.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">II. Ev Ortamında Duyusal Diyet (Sensory Diet) Planlama Detayları</h3>
                <p>
                  Duyusal diyet; Princeton Tip 2 (Duyusal-Motor) ve Üsküdar Üniversitesi&apos;nin açıkladığı glutamat aşırı uyarımını evde dengelemek için tasarlanan
                  sinir sistemi sakinleştirme programıdır. Gün içine yayılmış kontrollü aktiviteler içerir.
                </p>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="font-black text-zinc-900 dark:text-zinc-50">1. Propriyoseptif (Derin Basınç/Kas-Eklem) Aktiviteleri (Sakinleştirici Efekt)</div>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Sandviç Oyunu: Çocuk yere uzanır, üzerine büyük bir minder/yastık konularak hafif ve ritmik baskılar uygulanır. Sinir sistemini hızla yatıştırır.</li>
                      <li>Ağır İşler (Heavy Work): Evde içi kitap dolu bir sepeti halı üzerinde itme, damacana taşıma taklidi yapma veya ağır bir sırt çantasıyla koridorda yürüme.</li>
                      <li>Sakız Çiğneme veya Sert Gıdalar: Havuç, elma gibi sert gıdaları ısırma veya çene kaslarını çalıştıracak aktiviteler beyni regüle eder.</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <div className="font-black text-zinc-900 dark:text-zinc-50">2. Vestibüler (Denge ve Hareket) Regülasyonu</div>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Ritmik Sallanma: Sağa sola hızlı ve ani sallanmalar beyni uyarır; öne arkaya yavaş ve ritmik sallanmalar (hamak veya pilates topu üzerinde) beyni sakinleştirir.</li>
                      <li>Ters Çevirme (Yerçekimi Değişimi): Çocuğun başını yataktan aşağı hafifçe sarkıtması veya takla atması, beyindeki vestibular sıvı akışını düzenleyerek filtresiz duyusal girdiyi azaltır.</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <div className="font-black text-zinc-900 dark:text-zinc-50">3. Çevresel Modifikasyon (Ev Düzenlemesi)</div>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Sakinleşme Köşesi (Chill-out Zone): Evin bir köşesine üzeri örtülü küçük bir oyun çadırı kurun. İçine loş ışık, yumuşak kırlentler ve gürültü önleyici kulaklık koyun. Çocuk duyusal yüklenme yaşadığında kendi rızasıyla buraya sığınmalıdır.</li>
                      <li>Görsel ve İşitsel Sadeleşme: Floresan ışıklar (mikro düzeyde kırpıştığı için glutamat uyarımını artırır) yerine sarı tonlu led veya abajur kullanın. Gün içinde arka planda sürekli açık kalan televizyon sesini tamamen kesin.</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">III. Özel Eğitim Seanslarında Aile Katılımının Yapılandırılması</h3>
                <p>
                  Erken çocuklukta haftalık 2 saatlik özel eğitim seansı nöroplastisiteyi tetiklemek için yetersizdir. Bilimsel başarı, seans odağının evde Ebeveyn
                  Aracılı Müdahale ile 7/24 sürdürülmesine bağlıdır.
                </p>
                <p>[Seansı İzleme / Not Alma] ──&gt; [Uzman Eşliğinde Canlı Deneme] ──&gt; [Ev Rutinine Entegrasyon] ──&gt; [Video ile Geri Bildirim]</p>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="font-black text-zinc-900 dark:text-zinc-50">1. Seans İçi Yapılandırma ve Eş-Regülasyon</div>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Cam Arkası İzleme veya Aktif Katılım: Aile, seansı sadece bir seyirci gibi izlememeli; terapistin çocuk ağladığında veya yönergeyi reddettiğinde hangi &quot;davranışsal körleme&quot; veya &quot;pekiştirme&quot; tekniğini kullandığını not etmelidir.</li>
                      <li>Uygulamalı Koçluk (Coaching Model): Seansın son 15 dakikasında terapist masadan kalkmalı, anne veya baba çocukla masaya oturmalıdır. Terapist, ebeveynin çocukla olan etkileşimini canlı olarak izleyip anlık yönlendirmeler yapmalıdır.</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <div className="font-black text-zinc-900 dark:text-zinc-50">2. Ev Rutinlerine Doğal Öğretim (NET) Entegrasyonu</div>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Banyo Zamanı: Renkler, &quot;aç-kapa&quot; kavramları ve suyun sıcaklık duyusu yapılandırılmış bir ders yerine banyoda öğretilmelidir.</li>
                      <li>Yemek Zamanı (Talep Etme): Çocuğun ulaşmak istediği su veya yiyecek doğrudan önüne konmamalıdır. Nesne çocuğun görebileceği ama uzanamayacağı bir yere konarak işaret parmağını kullanması, göz teması kurması veya ses çıkartarak &quot;talep etmesi&quot; (Mand eğitimi) için doğal fırsat pencereleri yaratılmalıdır.</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <div className="font-black text-zinc-900 dark:text-zinc-50">3. Evden Seansa Geri Bildirim Döngüsü</div>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Video Analizi: Ebeveyn, evde çocuğun yaşadığı kriz (meltdown) anlarını veya öfke nöbetlerini 1 dakikalık kısa videolar halinde kaydetmelidir. Terapist ile bu videolar analiz edilerek tetikleyici çevresel faktör (duyusal mı, davranışsal mı) belirlenmeli ve ortak bir davranış protokolü uygulanmalıdır.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
