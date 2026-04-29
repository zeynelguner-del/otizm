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
      description:
        "Otizm Spektrum Bozukluğu’nun ne olduğu, nasıl göründüğü ve neden “spektrum” dendiğine dair anlaşılır bir özet.",
      content:
        "Otizm Spektrum Bozukluğu (OSB), gelişimin erken dönemlerinden itibaren sosyal iletişim, davranış ve öğrenme biçiminde farklılıklarla kendini gösterebilen bir nöro-gelişimsel durumdur.\n\nNeden “spektrum” denir?\n- Çünkü belirtiler ve destek ihtiyaçları kişiden kişiye çok değişebilir.\n- Bazı bireyler günlük yaşamda daha az destekle bağımsız olabilirken, bazıları daha yoğun yapılandırılmış destek gerektirebilir.\n\nSık görülen alanlar\n- Sosyal iletişim: karşılıklı sohbet başlatma/sürdürme, jest-mimikleri anlama, ortak dikkat kurma.\n- Davranış örüntüleri: rutin ihtiyacı, tekrar eden davranışlar, sınırlı ilgi alanları.\n- Duyusal farklılıklar: ses, ışık, dokunma, koku gibi uyaranlara aşırı/az duyarlılık.\n\nÖnemli notlar\n- Otizm tek bir “kalıp” değildir; aynı tanıyı alan iki çocuğun güçlü yönleri ve zorlandığı alanlar farklı olabilir.\n- Erken ve düzenli destek (özel eğitim, dil-konuşma, ergoterapi/duyu bütünleme gibi) çocuğun gelişimini ve günlük yaşam becerilerini güçlendirebilir.\n- Amaç “otizmi yok etmek” değil; iletişimi artırmak, bağımsızlığı desteklemek, zorlanmaları azaltmak ve aile yaşamını sürdürülebilir hale getirmektir."
    },
    { 
      title: "Otizmde Eğitim", 
      icon: BookOpen, 
      color: "bg-indigo-100 text-indigo-600",
      description:
        "Erken müdahale, sınıf içi uyarlamalar ve bireyselleştirilmiş hedeflerle eğitim planlaması.",
      content:
        "Otizmde eğitim; çocuğun iletişim, sosyal etkileşim, oyun/öğrenme ve günlük yaşam becerilerini desteklemek için yapılandırılmış ve bireyselleştirilmiş bir planla yürütülür.\n\nTemel ilkeler\n- Bireyselleştirme: Hedefler çocuğun gelişim düzeyi, güçlü yönleri ve ihtiyaçlarına göre belirlenir.\n- Tutarlılık: Ev-okul-özel eğitim arasında ortak hedef dili ve benzer yöntemler.\n- Görsel destekler: Günlük rutin çizelgeleri, adım adım yönerge kartları, “önce-sonra” panosu.\n- Yapılandırılmış öğrenme: Net başlangıç/bitiş, kısa ve anlaşılır yönergeler, tekrar ve genelleme.\n\nSık kullanılan eğitim yaklaşımları (genel çerçeve)\n- Davranışsal yaklaşımlar: İstenilen becerileri öğretme ve problem davranışları azaltma (örn. ABA temelli teknikler).\n- Gelişimsel yaklaşımlar: Oyun ve etkileşim üzerinden sosyal-iletişim becerilerini güçlendirme.\n- Sınıf temelli düzenlemeler: Görsel ipuçları, görevleri küçük adımlara bölme, duyusal düzenleme, geçişleri kolaylaştırma.\n\nPratik kontrol listesi\n- Ölçülebilir hedef belirle (örn. “istek bildirme”, “sıra alma”, “tuvalet rutini”).\n- Hedefleri günlük rutine yerleştir (evde ve okulda kısa tekrarlar).\n- İlerlemeyi basit kayıtla takip et (hangi ipucu ile başardı?).\n\nKaynaklar\n- CDC: https://www.cdc.gov/autism/treatment/\n- WHO: https://www.who.int/news-room/fact-sheets/detail/autism-spectrum-disorders"
    },
    { 
      title: "Sosyal İletişim", 
      icon: Heart, 
      color: "bg-rose-100 text-rose-600",
      description:
        "Göz teması, ortak dikkat, sırayla oynama ve duygu ifade etme gibi becerileri günlük hayatta desteklemek için pratik öneriler.",
      content:
        "Sosyal iletişim; yalnızca konuşmak değil, karşılıklı etkileşim kurmak, sıra almak, ipuçlarını okumak ve duygu paylaşmak gibi birçok becerinin birleşimidir. Otizmli çocuklarda bu beceriler farklı hızlarda gelişebilir.\n\nGünlük hayatta işe yarayan yaklaşımlar\n- Ortak dikkat: Çocuğun ilgisini çeken şeyi birlikte “paylaşma” hedeflenir (ör. oyuncağa bak → sen de bak → kısa bir kelime/işaret). Bu, iletişimin temelidir.\n- Göz teması: Zorlamadan; oyun, şarkı, baloncuk, sevdiği nesne gibi motivasyon veren anlarda çok kısa ve doğal temaslar hedeflenir.\n- İstek belirtme: “İstemek” iletişimi artırır. Çocuğun bir şeyi istemesi için küçük fırsatlar oluştur (ör. bisküviyi kutuda tut, yardım istemesi için bekle).\n- Duygu farkındalığı: Resimler, aynada mimik çalışmaları, kısa videolar ve basit duygu kartları ile “mutlu/üzgün/kızgın/şaşkın” gibi kavramlar pekiştirilebilir.\n- Sıra alma ve paylaşma: “Sıra bende / sıra sende” oyunları (top atma, blok dizme, kart çekme) sosyal etkileşimi güçlendirir.\n\nİletişimi kolaylaştıran destekler\n- Görsel destek: Resimli rutin, adım adım yönerge kartları, “önce-sonra” panosu.\n- Basit ve tutarlı dil: Kısa cümle, net yönerge, aynı kelimeleri tekrar eden rutin ifadeler.\n- Sosyal öyküler: Zor sosyal durumları (market, misafir, oyun parkı) kısa ve somut cümlelerle anlatır; beklenen davranışı netleştirir.\n\nHedef: Çocuğun kendi ihtiyacını anlatabilmesi, zorlandığında destek isteyebilmesi ve küçük ama sürdürülebilir sosyal etkileşimler kurabilmesidir."
    },
    { 
      title: "Otizmde Terapi", 
      icon: Star, 
      color: "bg-fuchsia-100 text-fuchsia-700",
      description:
        "Dil-konuşma, ergoterapi, davranışsal ve gelişimsel müdahalelerle beceri geliştirme.",
      content:
        "Otizmde terapi; “tek bir yöntem” değil, çocuğun ihtiyaçlarına göre seçilen birden fazla desteğin (iletişim, duyusal düzenleme, davranış, günlük yaşam becerileri) birlikte planlanmasıdır.\n\nSık kullanılan terapi alanları\n- Dil ve konuşma terapisi: Anlama/ifade, karşılıklı iletişim, alternatif iletişim yöntemleri (işaret, resim, cihaz) dahil.\n- Ergoterapi: Günlük yaşam becerileri (giyinme, yemek, öz bakım) ve duyusal düzenleme ihtiyaçları.\n- Davranışsal ve gelişimsel müdahaleler: Beceri öğretimi, problem davranışların işlevine göre desteklenmesi, oyun ve sosyal etkileşimin güçlendirilmesi.\n- Sosyal beceri çalışmaları: Yapılandırılmış grup veya bireysel çalışmalar.\n- Psikolojik destek: Kaygı, duygu düzenleme gibi eşlik eden alanlarda (özellikle daha büyük çocuk/ergenlerde) uyarlanmış terapi yaklaşımları.\n\nİyi bir terapi planı nasıl görünür?\n- Hedefler nettir ve günlük yaşama bağlanır (örn. “istek bildirme”, “geçişlerde zorlanmayı azaltma”).\n- Aileye ev uygulaması verilir (kısa, sürdürülebilir).\n- İlerleme veriyle takip edilir ve hedefler güncellenir.\n\nKaynaklar\n- CDC: https://www.cdc.gov/autism/treatment/\n- WHO: https://www.who.int/news-room/fact-sheets/detail/autism-spectrum-disorders"
    },
    { 
      title: "Duyu Bütünleme", 
      icon: Star, 
      color: "bg-amber-100 text-amber-600",
      description:
        "Ses, ışık, dokunma ve hareket gibi duyularda hassasiyet olduğunda evde ve dışarıda uygulanabilecek basit düzenlemeler.",
      content:
        "Duyu bütünleme, çevreden gelen duyusal bilgilerin (ses, ışık, dokunma, koku, hareket, denge) beyin tarafından organize edilmesidir. Otizmli çocuklarda duyular bazen “fazla” (aşırı hassas) bazen “az” (az duyarlı) çalışabilir.\n\nSık görülen örnekler\n- Ses: Süpürge, kalabalık, zil gibi seslere aşırı tepki veya tam tersi çok yüksek ses arama.\n- Dokunma: Etiket, dikiş, saç kesimi, tırnak kesimi gibi temaslara hassasiyet.\n- Görsel: Parlak ışıklar, kalabalık görüntü, ekran hassasiyeti.\n- Hareket/denge: Sürekli sallanma/zıplama ihtiyacı veya bazı hareketlerden kaçınma.\n\nEvde uygulanabilecek küçük düzenlemeler\n- “Sakin köşe”: Gürültüyü azaltan, loş ışıklı, yumuşak minderli bir alan.\n- Önceden hazırlık: Yeni bir ortama gitmeden önce kısa açıklama + görsel (nereye, ne kadar, ne olacak).\n- Kademeli alıştırma: Rahatsız eden uyaranla kısa süre + ödül, süreyi yavaş yavaş artırma.\n\nDışarıda pratik çözümler\n- Gürültü engelleyici kulaklık veya kulak tıkacı.\n- Kalabalık saatlerden kaçınma (market/AVM için sakin saatleri seçme).\n- Kıyafet seçiminde etiketsiz/rahat kumaş tercih etme.\n\nBeslenme ve doku seçiciliği\n- “Tek seferde büyük değişim” yerine çok küçük adımlarla ilerlemek daha sürdürülebilirdir (dokunma-koklama-yalama-tatma gibi basamaklar).\n\nDuyusal destekler bireyseldir. En iyi yaklaşım; çocuğun hangi uyaranlarda zorlandığını gözlemlemek, tetikleyicileri azaltmak ve düzenli bir rutinle güvenli alanlar oluşturmaktır."
    },
    { 
      title: "Otizmde Tedavi", 
      icon: Shield, 
      color: "bg-emerald-100 text-emerald-600",
      description:
        "Otizmde “tedavi” yaklaşımı: çekirdek özellikler için eğitim/terapi, eşlik eden durumlar için tıbbi destek.",
      content:
        "Otizm yaşam boyu sürebilen bir nörogelişimsel durumdur. Bu nedenle “tek bir tedaviyle tamamen ortadan kaldırma” şeklinde bir yaklaşım bilimsel olarak doğru değildir.\n\nGüncel, bilimsel yaklaşım\n- Çekirdek alanlarda destek: İletişim, sosyal etkileşim, uyum becerileri ve günlük yaşam için eğitim ve terapiler (davranışsal, gelişimsel, eğitimsel ve sosyal-ilişkisel yaklaşımlar).\n- Eşlik eden durumların değerlendirilmesi: Uyku sorunları, anksiyete, DEHB belirtileri, epilepsi, gastrointestinal sorunlar gibi alanlarda hekim değerlendirmesi.\n- İlaçlar hakkında önemli bilgi: Otizmin çekirdek özelliklerini “tedavi eden” bir ilaç yoktur; ancak bazı ilaçlar eşlik eden belirtileri azaltıp işlevselliği artırmaya yardımcı olabilir. İlaç kararı mutlaka hekim tarafından, yarar-zarar dengesiyle verilir.\n\nDikkat edilmesi gerekenler\n- “Mucize tedavi” iddialarına temkinli yaklaşın.\n- Kanıtı zayıf veya riskli uygulamalar için (yüksek maliyetli, zarar potansiyeli olan) mutlaka uzman görüşü alın.\n\nKaynaklar\n- CDC: https://www.cdc.gov/autism/treatment/\n- WHO: https://www.who.int/news-room/fact-sheets/detail/autism-spectrum-disorders"
    },
    { 
      title: "Yasal Haklar", 
      icon: Shield, 
      color: "bg-emerald-100 text-emerald-600",
      description:
        "RAM, ÇÖZGER ve rehabilitasyon süreçlerinde hangi haklara başvurulabileceğini ve hangi adımlarla ilerlenebileceğini anlatan pratik rehber.",
      content:
        "Türkiye’de otizmli çocuklar ve aileleri için eğitim, sağlık ve sosyal destek alanlarında çeşitli haklar bulunur. Başvuru süreçleri şehirden şehire değişebilse de temel yol haritası benzerdir.\n\nSık kullanılan rapor ve kurumlar\n- ÇÖZGER: Çocuklar için özel gereksinim raporu; birçok başvuruda temel belgedir.\n- RAM (Rehberlik ve Araştırma Merkezi): Eğitim değerlendirmesi ve yönlendirme süreçlerini yürütür.\n\nEğitimle ilgili haklar (genel çerçeve)\n- Kaynaştırma/bütünleştirme uygulamaları ve uygun destekler.\n- Özel eğitim hizmetlerinden yararlanma ve uygun planlamalar.\n- Okulda uyarlama: sınıf içi düzenlemeler, görsel destekler, bireyselleştirilmiş hedefler.\n\nDestek eğitim (rehabilitasyon)\n- Raporlara bağlı olarak belirli süre/saatlerde destek eğitim hizmeti.\n- Eğitim programının çocuğun ihtiyacına göre şekillenmesi (iletişim, sosyal beceri, davranış, akademik öncül beceriler).\n\nSağlık ve sosyal destekler\n- Bazı durumlarda hastanelerde öncelik uygulamaları.\n- Sosyal destekler/yardımlar (gelir kriterlerine göre değişebilir).\n\nPratik öneri\n- Belgeleri tek bir klasörde topla (rapor, sevk, randevu çıktıları, okul yazışmaları).\n- Süreçte en çok ihtiyaç duyulan şey “takip”tir: randevu, rapor yenileme, okul/merkez görüşmeleri.\n\nNot: Hakların kapsamı ve koşulları zamanla değişebilir; en güncel bilgi için bulunduğun il/ilçedeki RAM ve ilgili kamu kurumlarından doğrulama yapmak en güvenlisidir."
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
          <div className="absolute top-0 right-0 p-10 opacity-10 pointer-events-none">
            <img src="/loogo.png" alt="" className="w-40 h-40 object-contain opacity-20" />
          </div>
          
          <div className="relative z-10 max-w-2xl">
            <span className="px-4 py-1.5 bg-blue-600 text-white rounded-full text-xs font-black uppercase tracking-widest mb-6 inline-block">
              Öne Çıkan Rehber
            </span>
            <h2 className="text-4xl font-black text-zinc-900 dark:text-zinc-50 mb-6 tracking-tight">{featuredGuide.title}</h2>
            <p className="text-xl text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed mb-8">
              Tanı sonrası süreçte “nereden başlamalıyım?” sorusuna adım adım yanıt verir: duygusal destek, özel eğitim planlaması,
              rapor ve başvuru süreçleri, ev rutini ve yakın çevreyle iletişim gibi konularda anlaşılır bir başlangıç kılavuzu.
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
                <img src="/loogo.png" alt="" className="w-9 h-9 object-contain opacity-90" />
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
                  <img src="/loogo.png" alt="" className="w-7 h-7 object-contain opacity-90" />
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
