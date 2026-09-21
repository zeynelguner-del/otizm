export interface GuideArticle {
  slug: string;
  title: string;
  summary: string;
  category: "Temel Bilgiler" | "Özel Eğitim" | "Duyu & Terapi" | "İletişim & Sosyal" | "Aile & Yaşam";
  author: string;
  readTime: string;
  publishedDate: string;
  keywords: string[];
  heroImage?: string;
  content: {
    intro: string;
    sections: {
      heading: string;
      subheading?: string;
      paragraphs: string[];
      listItems?: string[];
      tipBox?: {
        title: string;
        text: string;
      };
    }[];
    conclusion: string;
    faqs?: {
      question: string;
      answer: string;
    }[];
  };
}

export const GUIDE_ARTICLES: GuideArticle[] = [
  {
    slug: "otizm-spektrum-bozuklugu-nedir-belirtileri-ve-ozellikleri",
    title: "Otizm Spektrum Bozukluğu (OSB) Nedir? Belirtileri, Türleri ve Özellikleri",
    summary: "Otizm spektrum bozukluğunun ne olduğu, spektrum kavramının anlamı, erken dönem gelişimsel farklılıklar ve temel özellikler hakkında kapsamlı rehber.",
    category: "Temel Bilgiler",
    author: "OtiZeka Bilim ve Eğitim Kurulu",
    readTime: "8 dk",
    publishedDate: "2026-08-17",
    keywords: ["otizm nedir", "otizm spektrum bozukluğu", "otizm belirtileri", "osb özellikleri", "spektrum kavramı", "çocuklarda otizm"],
    content: {
      intro: "Otizm Spektrum Bozukluğu (OSB), erken çocukluk döneminde başlayan ve bireyin dünyayı algılama, iletişim kurma ve sosyal etkileşimde bulunma biçimini etkileyen nöro-gelişimsel bir durumdur. 'Spektrum' kelimesi, otizmin tek tip bir tablo olmadığını; her bireyde çok farklı biçimlerde, farklı güçlü yönlerle ve destek ihtiyaçlarıyla ortaya çıktığını ifade eder.",
      sections: [
        {
          heading: "Otizm Neden Bir 'Spektrum' Olarak Tanımlanır?",
          paragraphs: [
            "Geçmişte otizm, Asperger Sendromu, Atipik Otizm ve Rett Sendromu gibi farklı alt başlıklarda sınıflandırılırken, günümüz tanı sistemlerinde (DSM-5 ve ICD-11) tüm bu durumlar tek bir çatı altında 'Otizm Spektrum Bozukluğu' olarak değerlendirilmektedir.",
            "Spektrumun genişliği, iki otizmli çocuğun birbirinden tamamen farklı özellikler gösterebileceği anlamına gelir. Bir çocuk zengin bir kelime dağarcığına ve üstün görsel hafızaya sahipken sosyal etkileşimde zorlanabilir; başka bir çocuk ise konuşma dili yerine görsel kartlarla (AAC) iletişim kurarak bağımsızlaşabilir."
          ],
          tipBox: {
            title: "Önemli Hatırlatma",
            text: "Otizm bir hastalık değil, nörolojik bir farklılıktır. Tıbbi müdahalelerin amacı otizmi 'yok etmek' değil; bireyin iletişim becerilerini güçlendirmek, potansiyelini açığa çıkarmak ve yaşam kalitesini en üst seviyeye taşımaktır."
          }
        },
        {
          heading: "Otizmin Temel Belirti ve Göstergeleri",
          paragraphs: [
            "Otizm belirtileri genellikle yaşamın ilk 2-3 yılında fark edilir hale gelir. Bu belirtiler temel olarak iki ana alanda toplanır: Sosyal İletişim Farklılıkları ve Tekrarlayıcı Davranışlar / İlgi Alanları."
          ],
          listItems: [
            "Sosyal İletişim: İsmiyle çağrıldığında tepki vermeme, göz temasından kaçınma veya kısa süreli tutma, ortak dikkat (parmakla gösterme, ilgi paylaşımlı bakış) eksikliği.",
            "Karşılıklı Etkileşim: Yaşıtlarıyla oyun kurmakta zorlanma, kendi dünyasında oynama tercihi, yüz ifadelerini ve beden dilini okumakta güçlük.",
            "Dil ve Konuşma: Konuşmada gecikme, duyduğu kelimeleri aynen tekrarlama (ekolali), zamirleri karıştırma (ben yerine sen deme).",
            "Döngüsel / Tekrarlayıcı Hareketler: El çırpma (flapping), kendi etrafında dönme, parmak ucunda yürüme, nesneleri sıraya dizme.",
            "Rutinlere Bağlılık: Günlük alışkanlıkların veya rotaların değişmesine karşı aşırı tepki ve kaygı duyma.",
            "Duyusal Hassasiyetler: Yüksek seslerden, parlak ışıklardan, belirli kumaş dokularından rahatsız olma veya tam tersi duyusal uyaran arayışında olma."
          ]
        },
        {
          heading: "Otizm Teşhisi Nasıl Konulur?",
          paragraphs: [
            "Otizm için kan tahlili, MR veya genetik bir biyolojik test henüz tek başına tanı koydurucu değildir. Teşhis; Çocuk ve Ergen Ruh Sağlığı ve Hastalıkları (Çocuk Psikiyatrisi) veya Çocuk Nörolojisi uzmanları tarafından yapılan kapsamlı gelişimsel gözlem, aile öyküsü ve klinik değerlendirme ölçekleri (ADOS, CARS vb.) ile konulur.",
            "Eğer ebeveyn olarak çocuğunuzun gelişiminde bir farklılık hissediyorsanız, 'büyüyünce geçer' diyerek beklemek yerine bir çocuk psikiyatristine başvurmak en doğru ve güvenli adımdır."
          ]
        }
      ],
      conclusion: "Otizm tanısı almak bir yolun sonu değil; çocuğunuzu daha iyi anlayacağınız ve onun dünyasına uygun köprüler kuracağınız özel bir yolculuğun başlangıcıdır. Erken ve yapılandırılmış özel eğitim desteği ile otizmli bireyler hayatta büyük başarılar elde edebilir, bağımsız ve üretken bireyler olarak topluma katılabilirler.",
      faqs: [
        {
          question: "Otizm sonradan geçer veya tamamen iyileşir mi?",
          answer: "Otizm ömür boyu süren nöro-gelişimsel bir yapıdır. Ancak erken ve yoğun özel eğitim, duyu bütünleme ve konuşma terapisi alan çocukların önemli bir kısmı günlük yaşamlarında bağımsız hale gelebilir, okuma-yazma öğrenebilir ve sosyal yaşama tam uyum sağlayabilir."
        },
        {
          question: "Aşılar veya anne-baba tutumu otizme yol açar mı?",
          answer: "Hayır. Bilimsel ve tıbbi araştırmalar aşıların veya ebeveyn tutumlarının otizme neden olmadığını kesin olarak kanıtlamıştır. Otizmin temelinde genetik ve çevresel biyolojik faktörlerin etkileşimi yatmaktadır."
        }
      ]
    }
  },
  {
    slug: "otizmde-erken-tani-ve-erken-mudahalenin-onemi",
    title: "Otizmde Erken Tanı ve Erken Müdahalenin Gücü: Kritik Gelişim Evreleri",
    summary: "0-3 yaş arası beyin plastisitesi, erken tanı ipuçları ve erken özel eğitimin çocuğun bilişsel ve sosyal gelişimine olan kanıtlanmış etkileri.",
    category: "Temel Bilgiler",
    author: "OtiZeka Bilim ve Eğitim Kurulu",
    readTime: "7 dk",
    publishedDate: "2026-08-17",
    keywords: ["otizm erken tanı", "erken müdahale", "beyin plastisitesi", "bebeklerde otizm belirtileri", "otizm ilk işaretler"],
    content: {
      intro: "Beyin gelişiminin en hızlı ve öğrenmeye en açık olduğu dönem ilk 36 aydır. Nöroplastisite (beynin deneyimlerle kendini yeniden şekillendirebilme yeteneği) bu yaşlarda zirvededir. Otizm Spektrum Bozukluğu'nda erken tanı ve derhal başlatılan erken müdahale programları, çocuğun ilerleyen yaşlardaki bağımsızlık seviyesini doğrudan belirleyen en kritik faktördür.",
      sections: [
        {
          heading: "Bebeklik ve Erken Çocukluk Döneminde İlk Kırmızı Bayraklar (0-18 Ay)",
          paragraphs: [
            "Otizm belirtileri 6. aydan itibaren çok ince sinyallerle başlayabilir ve 12-18. aylar arasında belirginleşir. Ebeveynlerin ve pediatristlerin dikkat etmesi gereken kritik göstergeler şunlardır:"
          ],
          listItems: [
            "6. Ay: Anne-babaya veya bakım verene sıcak, neşeli gülümsemelerle karşılık vermeme.",
            "9. Ay: Karşılıklı ses çıkarma, gülümseme veya mimik taklitlerinin (ce-ee oyunu gibi) olmaması.",
            "12. Ay: İsmi söylendiğinde dönüp bakmama (işitme sorunu olmadığı halde), el sallama veya işaret etme gibi jestlerin kullanılmaması.",
            "14-16. Ay: Anlamlı tek kelimelerin henüz çıkmaması veya ilgi duyduğu bir nesneyi parmağıyla göstererek ebeveynin dikkatini çekmemesi.",
            "18. Ay: Hayali / mış gibi oyunlar (bebeğe yemek yedirme, arabayı ses çıkararak sürme) oynamama."
          ]
        },
        {
          heading: "Nöroplastisite ve Erken Müdahalenin Bilimsel Temeli",
          paragraphs: [
            "Beyindeki nöronlar arasındaki sinaptik bağlantılar erken çocuklukta olağanüstü bir hızla inşa edilir. Erken dönemde sağlanan yapılandırılmış özel eğitim uyarıcıları, nörolojik yolları olumlu yönde güçlendirir.",
            "Yapılan boylamsal çalışmalar; 2-3 yaşlarında yoğun eğitim alan çocukların dil gelişiminde, sosyal iletişim becerilerinde ve IQ skorlarında, geç tanı alan akranlarına kıyasla çok daha yüksek sıçramalar gerçekleştirdiğini ortaya koymaktadır."
          ],
          tipBox: {
            title: "Bekle ve Gör Tuzağına Düşmeyin",
            text: "'Babası da geç konuşmuştu', 'Erkek çocukları geç açılır' gibi yanlış toplumsal inançlarla zaman kaybetmek, erken müdahale için en değerli altın ayların kaçırılmasına neden olabilir. Şüphe duyduğunuz an uzman değerlendirmesi almak her zaman en güvenli yoldur."
          }
        },
        {
          heading: "Erken Müdahale Neleri Kapsar?",
          paragraphs: [
            "Erken müdahale sadece haftada birkaç saatlik masa başı eğitiminden ibaret değildir. Kapsamlı bir erken müdahale modeli şunları içerir:",
            "1. Bireyselleştirilmiş Özel Eğitim: Çocuğun dikkat, taklit ve eşleme becerilerini adım adım inşa eder.",
            "2. Doğal Öğretim ve Oyun Temelli Terapiler (ESDM, Floortime): Çocuğun liderliğini takip ederek oyun içinde iletişimi hedefler.",
            "3. Aile Eğitimi ve Ev Uyarlamaları: Ailenin günün 24 saatini bir gelişim fırsatına dönüştürmesini sağlar."
          ]
        }
      ],
      conclusion: "Erken tanı bir teşhis etiketi değil; çocuğunuzun potansiyelini en üst düzeye ulaştırmak için zamanında atılmış en değerli sevgi ve sorumluluk adımıdır.",
      faqs: [
        {
          question: "Bebeğim ismine bazen bakıyor bazen bakmıyor, bu normal mi?",
          answer: "12 aydan büyük bir bebeğin seslendiğinizde tutarlı olarak (10 seferin en az 7-8'inde) dönüp göz teması kurması beklenir. Tutarsız tepkiler veya yalnızca televizyon reklamlarına dönüp bakma gibi durumlar gelişimsel değerlendirme gerektirebilir."
        }
      ]
    }
  },
  {
    slug: "otizmde-ozel-egitim-yontemleri-aba-teacch-pecs",
    title: "Otizmde Kanıta Dayalı Özel Eğitim Yöntemleri: ABA, TEACCH, PECS ve ESDM",
    summary: "Özel eğitimde dünyaca kabul görmüş bilimsel yaklaşımlar, uygulama ilkeleri ve her yöntemin çocuğa kazandırdığı temel beceriler.",
    category: "Özel Eğitim",
    author: "OtiZeka Özel Eğitim Uzman Ekibi",
    readTime: "9 dk",
    publishedDate: "2026-08-17",
    keywords: ["aba terapisi", "teacch yöntemi", "pecs iletişim sistemi", "esdm modeli", "özel eğitim metotları", "otizm eğitim teknikleri"],
    content: {
      intro: "Otizm Spektrum Bozukluğu olan çocukların eğitiminde 'herkese uyan tek bir yöntem' yoktur; ancak etkinliği bilimsel araştırmalarla kanıtlanmış (kanıta dayalı) yöntemlerin doğru kombinasyonu ile olağanüstü ilerlemeler kaydedilir. Bu rehberde dünyada en yaygın kullanılan 4 ana özel eğitim ekolünü inceliyoruz.",
      sections: [
        {
          heading: "1. Uygulamalı Davranış Analizi (ABA - Applied Behavior Analysis)",
          paragraphs: [
            "ABA, davranışın öncüllerini ve sonuçlarını analiz ederek olumlu davranışları pekiştirmeyi, karmaşık becerileri küçük basamaklara bölerek öğretmeyi ve problem davranışları azaltmayı hedefleyen en köklü bilimsel yöntemdir.",
            "Ayrık Denemelerle Öğretim (DTT) gibi tekniklerle çocuk; eşleme, nesne tanıma, yönerge takip etme, taklit ve öz bakım becerilerini adım adım, bol pekiştireç kullanarak kazanır."
          ],
          tipBox: {
            title: "Modern ABA Anlayışı",
            text: "Çağdaş ABA uygulamaları katı masa başı tekrarlarından uzaklaşmış; çocuğun doğal ilgilerini merkeze alan, oyunlaştırılmış ve şefkat temelli doğal öğretim yaklaşımlarını benimsemiştir."
          }
        },
        {
          heading: "2. TEACCH Modeli (Yapılandırılmış Öğretim)",
          paragraphs: [
            "Kuzey Carolina Üniversitesi'nde geliştirilen TEACCH modeli, otizmli bireylerin güçlü görsel öğrenme yeteneklerine dayanır. Çevreyi ve zamanı öngörülebilir hale getirerek kaygıyı minimuma indirir."
          ],
          listItems: [
            "Fiziksel Yapılandırma: Odanın ve sınıfın net alanlara (çalışma alanı, oyun alanı, dinlenme alanı) bölünmesi.",
            "Görsel Çizelgeler: Gün içinde 'Önce ne yapacağım?', 'Sonra ne olacak?' sorularını yanıtlayan resimli günlük rutinler.",
            "Görev Organizasyonu: Kutudan kutuya çalışma sistemleri ile görevin ne zaman bittiğinin görsel olarak somutlaştırılması."
          ]
        },
        {
          heading: "3. PECS (Resim Değiş-Tokuşuna Dayalı İletişim Sistemi)",
          paragraphs: [
            "PECS, konuşma dili henüz gelişmemiş veya sınırlı olan çocuklara resimli kartları kullanarak iletişim başlatmayı öğreten alternatif ve destekleyici bir sistemdir.",
            "Sistem 6 aşamadan oluşur: İlk aşamada çocuk istediği nesnenin resmini yetişkine vererek nesneyi almayı öğrenir; ilerleyen aşamalarda 'Ben ... istiyorum' gibi cümle şeritleri oluşturarak karmaşık istek ve fikirlerini ifade eder.",
            "Yapılan araştırmalar, PECS kullanımının konuşmayı engellemediğini, tam tersine iletişimin işlevselliğini kavrayan çocuklarda sözel üretimi tetiklediğini göstermektedir."
          ]
        },
        {
          heading: "4. Erken Başlangıç Denver Modeli (ESDM)",
          paragraphs: [
            "12-48 aylık bebek ve küçük çocuklar için geliştirilmiş gelişimsel ve davranışçı bir erken müdahale modelidir. Terapist veya ebeveyn, çocuğun oyununa ortak olarak sosyal etkileşimi, taklidi ve karşılıklı iletişimi doğal ortamda geliştirir."
          ]
        }
      ],
      conclusion: "En etkili özel eğitim planı; ABA'nın sistematik öğretim gücünü, TEACCH'in görsel düzenini ve PECS'in iletişim araçlarını çocuğun bireysel ihtiyaçlarına göre harmanlayan Bireyselleştirilmiş Eğitim Planı'dır (BEP).",
      faqs: [
        {
          question: "Hangi yöntemin çocuğuma uygun olduğunu nasıl anlarım?",
          answer: "Çocuğunuzun mevcut iletişim düzeyi, duyusal profili ve dikkat süresi özel eğitim uzmanları tarafından değerlendirilir. Genellikle konuşma öncesi iletişim için PECS, günlük rutinler ve bağımsızlık için TEACCH, temel kavram ve akademik beceriler için ABA birlikte uygulanır."
        }
      ]
    }
  },
  {
    slug: "otizmde-duyu-butunleme-terapisi-ve-ev-etkinlikleri",
    title: "Otizmde Duyu Bütünleme Terapisi: Duyusal Hassasiyetler ve Ev Etkinlikleri",
    summary: "Duyusal arayış, aşırı duyarlılık, vestibüler ve proprioseptif sistemlerin anlaşılması ve evde uygulanabilecek pratik duyusal oyunlar.",
    category: "Duyu & Terapi",
    author: "OtiZeka Terapi ve Gelişim Kurulu",
    readTime: "8 dk",
    publishedDate: "2026-08-17",
    keywords: ["duyu bütünleme", "duyusal hassasiyet", "vestibüler duyu", "propriosepsiyon", "otizm duyusal oyunlar", "ergoterapi"],
    content: {
      intro: "Beynimiz çevremizden ve bedenimizden gelen duyusal bilgileri (görme, işitme, tat, koku, dokunma, denge ve kas hissi) alır, filtreler ve anlamlandırır. Otizmli çocukların %90'ından fazlasında duyusal bilginin işlenmesinde farklılıklar görülür. Duyu Bütünleme Terapisi, bu duyusal girdilerin beyin tarafından regüle edilmesine yardımcı olarak çocuğun sakinleşmesini ve odaklanmasını sağlar.",
      sections: [
        {
          heading: "Duyusal İşleme Farklılıklarının İki Yüzü: Aşırı Duyarlılık ve Duyu Arayışı",
          paragraphs: [
            "Otizmli bireyler bazı duyusal uyaranlara karşı aşırı duyarlı (hipersensitif) olabilirken, bazı duyulara karşı ise az duyarlı olup sürekli o duyuyu arayabilirler (hiposensitif):"
          ],
          listItems: [
            "Taktil (Dokunma) Hassasiyeti: Etiketlerden, çorap dikişlerinden, ıslak veya yapışkan maddelerden kaçınma ya da sürekli yüzeylere sürtünme.",
            "İşitsel Hassasiyet: Elektrik süpürgesi, blender, el kurutma makinesi gibi ani seslerde kulaklarını kapatma.",
            "Vestibüler (Denge ve Hareket): Sürekli sallanma, dönme, zıplama arayışı ya da ayakların yerden kesilmesinden aşırı korkma.",
            "Proprioseptif (Kas ve Eklem Hissi): Kendi beden sınırlarını hissetmek için sertçe sarılma, kendini yere atma, nesneleri sıkma veya ısırma."
          ]
        },
        {
          heading: "Evde Uygulanabilecek Pratik Duyu Bütünleme Etkinlikleri",
          paragraphs: [
            "Ergoterapistinizin önerdiği 'Duyusal Diyet' programına paralel olarak evde yapabileceğiniz eğlenceli ve sakinleştirici aktiviteler:"
          ],
          listItems: [
            "Ağır İş Aktiviteleri: Yastık savaşı, ağır minderleri taşıma, hayvan yürüyüşleri (ayı yürüyüşü, yengeç yürüyüşü) kas-eklem duyusunu uyararak sakinleşme sağlar.",
            "Duyusal Havuzlar: Büyük bir kaba pirinç, kuru fasulye veya nohut doldurup içine küçük oyuncaklar saklayarak dokunma duyusunu çalıştırma.",
            "Tost/Dürüm Oyunu: Çocuğu yumuşak bir battaniyenin içine sararak hafif ve kontrollü derin baskı uygulama.",
            "Denge Parkurları: Yastıklardan ve koltuk minderlerinden engel parkurları kurarak denge ve koordinasyonu destekleme."
          ],
          tipBox: {
            title: "Duyusal Kriz (Meltdown) ile Şımarıklık Arasındaki Fark",
            text: "Duyusal kriz, çocuğun beyninin aşırı duyusal yüklenme karşısında 'savaş ya da kaç' tepkisi vermesidir. Ceza veya kızgınlıkla çözülmez; ortamdaki ışık/sesi azaltmak, sakin ve güvenli bir alana geçmek ve derin baskı/sakinleşme teknikleri uygulamak gerekir."
          }
        }
      ],
      conclusion: "Duyusal regülasyonu sağlanan bir çocuk kendini güvende hisseder, kaygısı azalır ve öğrenmeye, oyun oynamaya ve iletişim kurmaya çok daha açık hale gelir.",
      faqs: [
        {
          question: "Duyu bütünleme terapisini kimler uygular?",
          answer: "Duyu bütünleme değerlendirmesi ve terapisi, bu alanda uzmanlaşmış sertifikalı Ergoterapistler (İş ve Uğraşı Terapistleri) veya özel eğitim almış fizyoterapistler tarafından yürütülür."
        }
      ]
    }
  },
  {
    slug: "otizmli-cocuklarda-iletisim-ve-dil-gelisimi-stratejileri",
    title: "Otizmli Çocuklarda İletişim ve Dil Gelişimi: Pratik Stratejiler ve AAC",
    summary: "Konuşma öncesi iletişim becerileri, alternatif ve destekleyici iletişim (AAC) teknolojileri ve evde dili teşvik etme taktikleri.",
    category: "İletişim & Sosyal",
    author: "OtiZeka Dil ve Konuşma Komisyonu",
    readTime: "8 dk",
    publishedDate: "2026-08-17",
    keywords: ["otizm dil gelişimi", "aac iletişim", "otizmde konuşma terapisi", "alternatif iletişim", "istek bildirme", "ekolali"],
    content: {
      intro: "İletişim, yalnızca ses telleriyle kelime üretmekten çok daha geniştir. Jestler, mimikler, bakışlar, resimler ve dijital araçlar da iletişimin güçlü parçalarıdır. Otizmli çocuklarda dili desteklemenin ilk kuralı, çocuğun çevresiyle etkileşim kurma isteğini ve motivasyonunu uyandırmaktır.",
      sections: [
        {
          heading: "Konuşma Öncesi Temel İletişim Becerileri",
          paragraphs: [
            "Bir çocuğun anlamlı kelimeler üretebilmesi için öncelikle belirli altyapı becerilerinin gelişmiş olması gerekir:"
          ],
          listItems: [
            "Ortak Dikkat: Çocuğun baktığı nesneye sizin de bakmanız ve aynı anda o nesne hakkında heyecan paylaşmanız.",
            "Sıra Alma: Basit oyunlarda (topu birbirine atma, sırayla kuleye blok koyma) sırasını bekleme ve devretme.",
            "Motor ve Ses Taklidi: El çırpma, 'hoop', 'bip bip' gibi eğlenceli sesleri ve hareketleri taklit etme.",
            "Neden-Sonuç İlişkisi: 'Düğmeye basınca müzik çalar', 'Ses çıkarınca annem bana bakar' mantığının kavranması."
          ]
        },
        {
          heading: "Alternatif ve Destekleyici İletişim (AAC - Augmentative and Alternative Communication)",
          paragraphs: [
            "Konuşma üretmekte zorlanan çocuklarda öfke nöbetlerinin en büyük nedeni, ihtiyaçlarını ifade edememenin getirdiği çaresizliktir. AAC araçları (görsel sembol kartları, OtiZeka gibi tablet destekli sesli iletişim panoları) çocuğa kendi sesini verir.",
            "Yanlış Bilinen Efsane: 'Tabletten veya karttan iletişim kurarsa konuşmayı tembelleşir.' Tam aksine, yapılan yüzlerce bilimsel çalışma AAC kullanan çocukların sözel dil gelişiminin belirgin şekilde hızlandığını kanıtlamıştır."
          ],
          tipBox: {
            title: "Evde İletişimi Teşvik Etmenin Altın Kuralı: İletişimsel Cazibe",
            text: "Çocuğun her istediğini ağzını açmadan önüne koymayın. Sevdiği meyveyi veya oyuncağı görebileceği ama uzanamayacağı şeffaf bir kutuya koyun; size bakmasını, işaret etmesini veya ses çıkarmasını bekleyerek iletişim kurması için doğal fırsatlar yaratın."
          }
        },
        {
          heading: "Ekolali (Kelimeleri Aynen Tekrarlama) ile Başa Çıkma",
          paragraphs: [
            "Ekolali çoğu zaman bir amaç taşır; çocuk duyduğu cümleyi sakinleşmek, zaman kazanmak veya bir iletişime cevap vermek için kullanıyor olabilir. Çocuğu susturmak yerine, söylemek istediği mesajı doğru model olarak ona sunun ('Su istiyor musun?' demek yerine 'Su istiyorum' diyerek modeli verin)."
          ]
        }
      ],
      conclusion: "Her çocuk iletişim kurmak ister. Önemli olan onun iletişim kapısını bulmak ve sabırla, bol oyunla o kapıyı aralamaktır.",
      faqs: [
        {
          question: "Çocuğum 4 yaşında ve hiç konuşmuyor, konuşabilir mi?",
          answer: "Evet, otizmde 4-5 yaşından sonra ve hatta ergenlikte bile konuşmaya başlayan pek çok birey vardır. Erken ve yoğun dil-konuşma terapisi ile AAC destekleri bu süreci hızlandırır."
        }
      ]
    }
  },
  {
    slug: "otizmde-sosyal-oykuler-nasil-yazilir-ve-kullanilir",
    title: "Otizmde Sosyal Öyküler: Davranış ve Rutin Kazandırmada Nasıl Kullanılır?",
    summary: "Carol Gray tarafından geliştirilen sosyal öykü tekniği, yazım kuralları ve günlük yaşamda krizleri önleyen örnek senaryolar.",
    category: "İletişim & Sosyal",
    author: "OtiZeka Özel Eğitim Uzman Ekibi",
    readTime: "7 dk",
    publishedDate: "2026-08-17",
    keywords: ["sosyal öyküler", "carol gray", "otizm davranış yönetimi", "otizm rutinler", "özel eğitim sosyal hikayeler"],
    content: {
      intro: "Sosyal kurallar ve örtük toplumsal beklentiler, otizmli çocuklar için çoğu zaman belirsiz ve kafa karıştırıcıdır. Carol Gray tarafından geliştirilen 'Sosyal Öyküler' tekniği; zorlayıcı durumları, sosyal ipuçlarını ve beklenen davranışları çocuğun anlayacağı somut, görsel ve şefkatli bir dille anlatan kısa hikayelerdir.",
      sections: [
        {
          heading: "Sosyal Öykülerin Temel Amacı Nedir?",
          paragraphs: [
            "Sosyal öyküler bir 'emir listesi' veya 'davranış cezalandırma aracı' değildir. Temel amacı çocuğu eleştirmek değil, sosyal duruma dair doğru bilgi vermek, belirsizliği ortadan kaldırmak ve çocuğun o an ne hissedeceğini ve ne yapabileceğini öngörmesini sağlamaktır."
          ]
        },
        {
          heading: "Sosyal Öykü Yazmanın Altın Kuralları",
          paragraphs: [
            "Etkili bir sosyal öykü yazarken Carol Gray'in belirlediği cümle oranlarına ve anlatım diline dikkat edilmelidir:"
          ],
          listItems: [
            "Betimleyici Cümleler: Durumu tarafsızca anlatır. (Örn: 'Bazen berbere gideriz. Berberde büyük aynalar ve makaslar vardır.')",
            "Perspektif / Bakış Açısı Cümleleri: Başkalarının his ve düşüncelerini açıklar. (Örn: 'Kuaför saçımı keserken canımın acımamasına dikkat eder.')",
            "Yönlendirici Cümleler: Çocuğa önerilen davranışı nazikçe sunar. 'Yapmalısın' yerine 'Deneyebilirim' dili kullanılır. (Örn: 'Saçım kesilirken koltukta sakin oturmayı deneyebilirim.')",
            "Olumlu Cümleler: 'Koşma' veya 'Bağırma' yerine 'Yavaş yürürüm', 'Kısık sesle konuşurum' gibi olumlu alternatifler yazılır."
          ],
          tipBox: {
            title: "Uygulama İpucu",
            text: "Sosyal öyküyü kriz anında değil; çocuk tamamen sakin ve keyifliyken, hedeflenen olaydan (örneğin doktora gitmeden veya saç kestirmeden) birkaç gün önce düzenli olarak okuyun."
          }
        }
      ],
      conclusion: "Görsel ve net sosyal öyküler, çocuğunuzun dünyadaki belirsizlik korkusunu güven ve öngörülebilirlikle değiştirir.",
      faqs: [
        {
          question: "Sosyal öykülere resim eklemek zorunlu mu?",
          answer: "Görsel hafızaları çok güçlü olan otizmli çocuklar için çocuğun kendi fotoğrafı veya net çizimlerle desteklenen öyküler çok daha hızlı ve kalıcı etki gösterir."
        }
      ]
    }
  },
  {
    slug: "yeni-tani-alan-aileler-icin-yol-haritasi",
    title: "Yeni Otizm Tanısı Alan Aileler İçin Adım Adım Yol Haritası",
    summary: "Tanı sonrası duygusal süreçler, yasal haklar, RAM ve ÇÖZGER raporları, rehabilitasyon seçimi ve aile dayanışması.",
    category: "Aile & Yaşam",
    author: "OtiZeka Aile Rehberliği Masası",
    readTime: "9 dk",
    publishedDate: "2026-08-17",
    keywords: ["yeni tanı otizm", "çözger raporu", "ram raporu", "otizm aile rehberi", "özel eğitim hakları", "otizm destek süreci"],
    content: {
      intro: "Çocuğunuza otizm tanısı konduğu gün, hayatınızın en karmaşık ve duygu dolu anlarından biri olabilir. İnkâr, üzüntü, öfke ve çaresizlik hissetmeniz son derece doğaldır. Ancak unutmayın: Çocuğunuz dün kimse bugün de aynı çocuktur; değişen tek şey artık ona nasıl yardım edeceğinizi gösteren bir haritaya sahip olmanızdır.",
      sections: [
        {
          heading: "1. Adım: Kendinize Zaman Tanıyın ve Duygularınızı Kabul Edin",
          paragraphs: [
            "Bu süreç bir yas ve kabullenme döngüsüdür. Ebeveynler olarak birbirinizi suçlamadan, duygularınızı konuşarak ve gerekirse bir aile danışmanından psikolojik destek alarak yola başlamak ailenin direncini artırır."
          ]
        },
        {
          heading: "2. Adım: Resmi Süreçler ve Raporlama (ÇÖZGER ve RAM)",
          paragraphs: [
            "Çocuğunuzun devlet destekli özel eğitim ve sosyal haklardan yararlanabilmesi için yasal adımları tamamlamanız gerekir:"
          ],
          listItems: [
            "ÇÖZGER (Çocuklar İçin Özel Gereksinim Raporu): Yetkili tam teşekküllü devlet/üniversite hastanesindeki sağlık kurulundan alınır.",
            "RAM (Rehberlik ve Araştırma Merkezi) Başvurusu: Sağlık kurulu raporu ile ilçenizdeki RAM'a başvurarak çocuğunuz için 'Özel Eğitim Değerlendirme Kurulu Raporu' çıkartılır. Bu rapor ile MEB destekli ücretsiz rehabilitasyon seansları tanımlanır."
          ]
        },
        {
          heading: "3. Adım: Doğru Rehabilitasyon Merkezi ve Eğitmen Seçimi",
          paragraphs: [
            "Merkez seçerken kurumun fiziki şartlarından çok, eğitmenlerin otizm alanındaki lisans ve deneyimine, şeffaf iletişimine ve aileyle haftalık geri bildirim paylaşıp paylaşmadığına dikkat edin."
          ],
          tipBox: {
            title: "Eğitim Evde Devam Eder",
            text: "Haftada 2-3 saatlik rehabilitasyon seansları tek başına yeterli olamaz. En büyük gelişim, merkezde öğrenilen becerilerin evde aile tarafından günlük rutine entegre edilmesiyle elde edilir."
          }
        }
      ],
      conclusion: "Yalnız değilsiniz. Bugün dünyada ve Türkiye'de yüz binlerce aile bu yoldan geçiyor ve birbirine destek oluyor. Çocuğunuza inanın, küçük adımları kutlayın ve sevgiyle yolunuza devam edin.",
      faqs: [
        {
          question: "Rapor almak çocuğumun gelecekteki okul veya memuriyet hayatını olumsuz etkiler mi?",
          answer: "ÇÖZGER raporları çocuğun eğitim desteği alabilmesi için düzenlenir ve gelişim gösterdikçe süresi bitiminde yenilenmeyebilir veya derecesi güncellenebilir. Çocuğun en kritik yaşlarında eğitim almasını engellemek çok daha büyük bir kayıptır."
        }
      ]
    }
  },
  {
    slug: "otizmde-beslenme-uyku-ve-gunluk-yasam-rutinleri",
    title: "Otizmde Beslenme, Uyku ve Günlük Yaşam Rutinleri: Pratik Tavsiyeler",
    summary: "Seçici yeme alışkanlıkları, uykuya dalma güçlükleri, görsel rutin tabloları ve günlük hayatı kolaylaştıran ev düzenlemeleri.",
    category: "Aile & Yaşam",
    author: "OtiZeka Sağlık ve Yaşam Kurulu",
    readTime: "8 dk",
    publishedDate: "2026-08-17",
    keywords: ["otizm beslenme", "otizm uyku sorunları", "seçici yeme", "görsel rutinler", "otizm ev düzeni", "günlük yaşam"],
    content: {
      intro: "Otizmli çocuklarda sindirim sistemi hassasiyetleri, seçici yeme davranışları ve melatonin salınımındaki farklılıklar nedeniyle uyku problemleri oldukça sık görülür. Bu durum tüm ailenin yaşam kalitesini etkileyebilir. Doğru stratejiler ve yapılandırılmış rutinlerle bu zorlukların üstesinden gelmek mümkündür.",
      sections: [
        {
          heading: "Seçici Yeme (Selektif Beslenme) ile Başa Çıkma",
          paragraphs: [
            "Otizmli çocuklar yemekleri sadece tadına göre değil; kokusuna, rengine, ısısına ve en önemlisi ağızdaki dokusuna (çıtır, püre, pütürlü) göre değerlendirirler."
          ],
          listItems: [
            "Besin Zinciri Tekniği: Çocuğun sevdiği bir yiyeceğe çok benzeyen yeni bir besini minik adımlarla tanıtın (Örn: Patates kızartması seven çocuğa fırında fırınlanmış havuç çubukları sunmak).",
            "Baskı Yapmama: Çocuğu yemeye zorlamak kaygıyı artırır. Yeni yiyeceği sadece tabağın kenarına koyun; önce bakmasına, sonra koklamasına, sonra dokunmasına izin verin.",
            "Görsel Menü: Çocuğa ne yiyeceğini önceden görsel kartlarla göstererek belirsizlik hissini azaltın."
          ]
        },
        {
          heading: "Sağlıklı Uyku Düzeni Oluşturma",
          paragraphs: [
            "Uykuya dalmakta zorlanan ve gece sık uyanan çocuklar için kanıtlanmış uyku hijyeni adımları:"
          ],
          listItems: [
            "Ekran Detoksu: Uykudan en az 1.5 saat önce mavi ışık yayan telefon, tablet ve televizyonu kapatın.",
            "Sabit Uyku Rutini: Her akşam aynı sırayla: Ilık banyo ➔ Pijama giyme ➔ Masaj/Sakinleştirici müzik ➔ Yatak.",
            "Duyusal Oda Düzenlemesi: Odanın tamamen karanlık, serin ve gereksiz görsel uyaranlardan arındırılmış olması önemlidir."
          ],
          tipBox: {
            title: "Görsel Rutin Çizelgelerinin Gücü",
            text: "Sabah uyanınca, okuldan dönünce veya akşam yatarken yapılacak adımları (el yıkama, diş fırçalama, pijama giyme) resimli kartlarla panoya asmak, çocuğun bağımsızlığını ve güvenlik hissini hızla artırır."
          }
        }
      ],
      conclusion: "Düzenli bir uyku ve dengeli bir duyusal rutin, çocuğun gün içerisindeki dikkatini, öğrenme kapasitesini ve neşesini doğrudan yükseltir.",
      faqs: [
        {
          question: "Özel diyetler (Glutensiz-Kazeinsiz vb.) otizmi iyileştirir mi?",
          answer: "Bazı otizmli çocuklarda gıda intoleransı veya alerjiler bulunabilir. Ancak doktor ve uzman diyetisyen kontrolü olmadan katı eleme diyetleri uygulamak gelişim çağındaki çocukta besin eksikliğine yol açabilir. Mutlaka doktorunuza danışınız."
        }
      ]
    }
  },
  {
    slug: "otizmde-ofke-nobetleri-tantrum-ve-meltdown-yonetimi",
    title: "Otizmde Öfke Nöbetleri: Tantrum ile Meltdown Arasındaki Farklar ve Kriz Yönetimi",
    summary: "Otizmli çocuklarda öfke patlamalarının nörolojik kökenleri, tipik öfke nöbeti (tantrum) ile duyusal taşma (meltdown) arasındaki farklar ve kriz anında sakinleştirme teknikleri.",
    category: "Aile & Yaşam",
    author: "OtiZeka Pedagoji ve Davranış Kurulu",
    readTime: "9 dk",
    publishedDate: "2026-09-18",
    keywords: ["otizm meltdown","otizm tantrum","otizm öfke nöbeti","duyusal kriz","otizm sakinleşme yöntemleri","davranış problemleri"],
    content: {
          "intro": "Otizm spektrumundaki çocukların ebeveynleri ve öğretmenleri için en zorlayıcı deneyimlerden biri, aniden ortaya çıkan şiddetli ağlama, bağırma, yere yatma veya kendine/çevreye zarar verme ataklarıdır. Bu davranışlar sıklıkla toplum tarafından 'şımarıklık' veya 'terbiye eksikliği' olarak yanlış etiketlenir. Ancak nörolojik açıdan bir otizm krizi, beynin çevresel uyaranları ve duyguları yönetemeyerek alarm durumuna (savaş ya da kaç tepkisine) geçmesidir.",
          "sections": [
                {
                      "heading": "Tantrum (Öfke Nöbeti) ile Meltdown (Duyusal Çöküş) Arasındaki Kritik Fark",
                      "paragraphs": [
                            "Bir krizle başa çıkabilmenin ilk adımı, çocuğun yaşadığı durumun bir Tantrum mu yoksa bir Meltdown mu olduğunu doğru teşhis etmektir. Bu iki tablonun nörolojik mekanizmaları ve müdahale yöntemleri taban tabana zıttır.",
                            "Tantrum; amaca yöneliktir. Çocuk istediği bir nesneyi elde etmek veya istemediği bir görevden (ödev, yemek vb.) kaçmak için öfke gösterir. Çocuğun göz teması kurup çevredeki yetişkinin tepkilerini kolladığı gözlemlenir ve isteği yerine geldiğinde kriz anında bıçak gibi kesilir.",
                            "Meltdown ise tamamen istemsiz nörolojik bir taşmadır. Beyin aşırı ses, ışık, kalabalık, yorgunluk veya belirsizlik gibi yoğun uyaranlar altında 'aşırı yükleme' (overload) yaşar. Meltdown yaşayan çocuğun bir 'amacı' yoktur; hedef bir şey elde etmek değildir. İstediği verilse dahi kriz durmaz; sinir sistemi yatışana ve hormon dengesi normale dönene kadar devam eder."
                      ],
                      "tipBox": {
                            "title": "Altın Kural: Meltdown Anında Mantık ve Ceza İşlemez",
                            "text": "Meltdown esnasında çocuğun beyninin mantıklı düşünme merkezi (prefrontal korteks) devreden çıkmış, ilkel savunma merkezi (amigdala) devralmıştır. Bu anda çocuğa nasihat vermek, bağırmak veya ceza uygulamak yangına körükle gitmektir."
                      }
                },
                {
                      "heading": "Kriz Öncesi 'Sarı Işık' Sinyallerini Yakalama",
                      "paragraphs": [
                            "Hiçbir Meltdown aniden patlamaz; daima öncesinde bir 'kaynama noktası' (rumbling stage) evresi vardır. Ebeveynlerin bu mikro sinyalleri fark etmesi krizi başlamadan durdurabilir.",
                            "Çocuğun parmak ucunda daha hızlı yürümeye başlaması, kulaklarını elleriyle kapatması, gözlerini kısması, kendi etrafında dönme hızını artırması veya nefes alışverişinin sıklaşması duyusal bir aşırı yüklenmenin yaklaştığını gösterir."
                      ],
                      "listItems": [
                            "Ortamı Değiştirin: Çocuğu gürültülü marketten, AVM'den veya kalabalık odadan derhal sakin ve loş bir alana çıkarın.",
                            "Duyusal Bariyerler: Gürültü önleyici kulaklık veya güneş gözlüğü takarak uyaran bombardımanını kesin.",
                            "Derin Basınç Sağlayın: Çocuğun onaylaması halinde sıkı bir sarılma, ağırlıklı battaniye veya omuz masajı sinir sistemini yatıştırır."
                      ]
                },
                {
                      "heading": "Kriz Esnasında ve Sonrasında Güvenli Müdahale",
                      "paragraphs": [
                            "Kriz patlak verdiğinde birincil öncelik fiziksel güvenliktir. Çocuğun çevresindeki sert, kesici veya kırılabilir eşyaları hızla uzaklaştırın. Çocuğa fiziksel müdahalede bulunmadan, güvenli bir mesafeden varlığınızı hissettirin.",
                            "Kriz sona erdikten sonra çocuk derin bir fiziksel bitkinlik ve suçluluk hissedebilir. Sakinleştikten hemen sonra 'Neden böyle yaptın?' diyerek hesap sormayın; ona ılık bir bardak su verin, dinlenmesine fırsat tanıyın ve sevgiyle güvende olduğunu hissettirin."
                      ]
                }
          ],
          "conclusion": "Kriz yönetimi sabır ve gözlem gerektiren bir süreçtir. Tetikleyicileri günlük duygu çizelgelerine kaydederek zaman içinde krizlerin sıklığını ve şiddetini %80'e varan oranlarda azaltmak mümkündür.",
          "faqs": [
                {
                      "question": "Çocuk kriz anında başını yere veya duvara vuruyorsa ne yapılmalı?",
                      "answer": "Fiziksel yaralanmayı önlemek için başının altına yumuşak bir yastık veya katlanmış mont yerleştirin. Çocuğu zapt etmek yerine darbenin şiddetini yumuşatacak güvenli bir zemin oluşturun."
                },
                {
                      "question": "Tantrum anında sınır koymak krizin şiddetini artırır mı?",
                      "answer": "Tantrumda tutarlı olmak esastır. Ağladığı veya bağırdığı için taviz vermek bu davranışın pekişmesine yol açar. Sakin ve nötr bir ses tonuyla 'Ağlaman bittiğinde konuşabiliriz' mesajı verilmeli ve alternatif iletişim öğretilmelidir."
                }
          ]
    }
  },
  {
    slug: "otizmli-cocuklarda-tuvalet-egitimi-adim-adim-rehber",
    title: "Otizmli Çocuklarda Adım Adım Tuvalet Eğitimi: Görsel Çizelgeler ve Duyusal İpuçları",
    summary: "Otizmli çocuklarda tuvalet alışkanlığı kazandırma süreci, duyusal korkuları yenme, klozet adaptasyonu, görsel zaman çizelgeleri ve pozitif pekiştirme rehberi.",
    category: "Özel Eğitim",
    author: "OtiZeka Özel Eğitim ve Rehabilitasyon Kurulu",
    readTime: "10 dk",
    publishedDate: "2026-09-18",
    keywords: ["otizm tuvalet eğitimi","otizm bez bırakma","çocuklarda tuvalet alışkanlığı","özel eğitim tuvalet","görsel tuvalet çizelgesi","duyusal hassasiyet tuvalet"],
    content: {
          "intro": "Tuvalet eğitimi, tipik gelişim gösteren çocuklar için bile önemli bir gelişimsel kilometre taşı iken, otizm spektrumundaki çocuklar ve aileleri için sürecin duyusal ve bilişsel dinamikleri nedeniyle daha fazla yapılandırma gerektirir. Beden farkındalığının (iç algı / interosepsiyon) farklı çalışması, sifon sesinden korkma veya soğuk klozete oturma kaygısı süreci zorlaştırabilir. Ancak doğru bir hazırlık ve adım adım görsel yöntemlerle her çocuk kendi hızında bu beceriyi kazanabilir.",
          "sections": [
                {
                      "heading": "Hazır Bulunuşluk: Çocuğunuz Tuvalet Eğitimine Hazır mı?",
                      "paragraphs": [
                            "Tuvalet eğitimine başlarken çocuğun kronolojik yaşından ziyade gelişimsel hazır bulunuşluk işaretlerine bakılmalıdır. Genellikle 3-4 yaş civarında bu belirtiler gözlemlenmeye başlar.",
                            "Çocuğun bezinin gün içinde en az 1.5 - 2 saat boyunca kuru kalması, kirli bezden rahatsız olup çekiştirmesi, oturarak 3-5 dakika bir aktiviteye odaklanabilmesi ve basit tek adımlı yönergeleri anlayabilmesi hazır bulunuşluğun en güçlü göstergeleridir."
                      ],
                      "listItems": [
                            "Mesane Kapasitesi: Bez 2 saat boyunca kuru kalabiliyor mu?",
                            "Beden Farkındalığı: Tuvalet ihtiyacı geldiğinde bir köşeye saklanma veya çömelme gibi işaretler veriyor mu?",
                            "Motor Beceriler: Pantolonunu yardımla ya da bağımsız indirip kaldırabiliyor mu?",
                            "İletişim: İhtiyacını ses, kelime veya görsel kartla belirtebiliyor mu?"
                      ]
                },
                {
                      "heading": "Duyusal Faktörleri ve Tuvalet Korkularını Çözümleme",
                      "paragraphs": [
                            "Otizmli çocukların tuvalete girmeyi reddetmesinin en yaygın sebebi inatçılık değil, banyonun yoğun duyusal atmosferidir. Banyo genellikle yankılı seslerin olduğu, fayansların soğuk olduğu ve sifon sesinin tahammül edilemez derecede yüksek geldiği bir mekandır.",
                            "Klozete oturulduğunda ayakların boşlukta kalması çocuğun vestibüler sisteminde 'düşme ve kaybolma' dehşeti uyandırır. Bu sebeple klozetin altına mutlaka çocuğun ayaklarının tam basacağı sağlam bir basamak (ayak taburesi) konulmalı ve gerekirse yumuşak çocuk klozet adaptörü kullanılmalıdır."
                      ],
                      "tipBox": {
                            "title": "Sifon Sesi Hassasiyeti İçin Çözüm",
                            "text": "Çocuk klozetin üzerindeyken ASLA sifon çekmeyin. Çocuğu önce banyodan çıkarın veya kulaklık taktırın, ardından sifonu birlikte veya uzaktan çekerek sese kademeli olarak alıştırın."
                      }
                },
                {
                      "heading": "Adım Adım Uygulama Protokolü",
                      "paragraphs": [
                            "Eğitime başladığınız gün bezi tamamen çıkarın ve gündüz saatlerinde bir daha asla geri bağlamayın. Bez ile külot arasında gidip gelmek çocuğun zihninde büyük bir kafa karışıklığı yaratır.",
                            "Çocuğun banyoda görebileceği bir yere 'Pantolonu indir ➔ Klozete otur ➔ Tuvaletini yap ➔ Tuvalet kağıdı kullan ➔ Pantolonu çek ➔ Sifonu çek ➔ Elleri yıka' adımlarını içeren renkli bir görsel çizelge asın."
                      ],
                      "listItems": [
                            "Sabit Zaman Aralığı: Başlangıçta çocuğu her 30-45 dakikada bir tuvalete götürün ve 3-5 dakika oturmasını sağlayın.",
                            "Anında Yüksek Pekiştirme: Tuvalete her başarılı çiş/kaka yapışında çocuğun en çok sevdiği ödülü (örneğin sadece tuvalet için saklanan özel bir oyuncak veya çıkartma) ilk 3 saniyede verin.",
                            "Kazalarda Nötr Tepki: Kazalar kaçınılmazdır. Altına kaçırdığında kızmayın, ayıplamayın veya ceza vermeyin. Sakin bir sesle 'Çiş tuvalete yapılır, haydi banyoya gidelim' diyerek temizleyin."
                      ]
                }
          ],
          "conclusion": "Tuvalet eğitimi bir yarış değil, bir süreçtir. Kimi çocuk 2 haftada öğrenirken kimi çocukta 6 ay sürebilir. Ailenin sabırlı ve tutarlı tutumu başarının anahtarıdır.",
          "faqs": [
                {
                      "question": "Kaka yapmaktan korkup günlerce tutan çocuk için ne yapılmalı?",
                      "answer": "Bu durum çocuklarda çok sık rastlanan bir duyusal ve duygusal korkudur. Bezi klozete oturtup üzerine bağlayarak başlayabilir, ardından bezin ortasını küçük bir delikle açarak kakayı klozete düşürme aşamasına kademeli geçiş yapabilirsiniz. Lifli beslenme ve bol su tüketimi de kabızlığı önlemek için şarttır."
                },
                {
                      "question": "Gece tuvalet eğitimine gündüzle aynı anda mı başlanmalı?",
                      "answer": "Öncelikle gündüz kuruluğunun tam olarak kazanılması beklenmelidir. Gündüz kontrolü sağlandıktan sonra gece yatmadan 2 saat önce sıvı alımı sınırlandırılmalı ve gece tuvalet takvimine geçilmelidir."
                }
          ]
    }
  },
  {
    slug: "otizmde-ekolali-nedir-neden-olur-nasil-yonetilir",
    title: "Otizmde Ekolali (Yankı Konuşma): Neden Olur, İşlevsel İletişime Nasıl Dönüştürülür?",
    summary: "Duyulan kelimelerin ve cümlelerin aynen tekrarlanması olan ekolalinin iletişimsel işlevleri, anında ve gecikmiş ekolali farkı ve konuşma terapisi stratejileri.",
    category: "İletişim & Sosyal",
    author: "OtiZeka Dil ve Konuşma Terapisi Kurulu",
    readTime: "8 dk",
    publishedDate: "2026-09-18",
    keywords: ["ekolali nedir","otizm ekolali","yankı konuşma","gecikmiş ekolali","dil ve konuşma terapisi","otizm konuşma geliştirme"],
    content: {
          "intro": "Ekolali; bir bireyin duyduğu kelimeleri, cümleleri, televizyon reklamlarını veya çizgi film repliklerini anlamını tam kavramadan ya da bağlamından bağımsız olarak aynen tekrarlamasıdır. Otizm spektrumundaki çocukların dil gelişim yolculuğunda ekolali son derece yaygın bir basamaktır. Birçok ebeveyn ekolaliyi 'anlamsız bir takıntı' olarak görse de, modern dil ve konuşma terapisi ekolaliyi çocuğun iletişim kurma çabasının ve sözel dile açılan kapısının çok değerli bir işareti olarak kabul eder.",
          "sections": [
                {
                      "heading": "Ekolali Türleri: Anında Ekolali ve Gecikmiş Ekolali",
                      "paragraphs": [
                            "Ekolali temel olarak ikiye ayrılır. 'Anında Ekolali'de çocuk kendisine söylenen soruyu veya kelimeyi hemen ardından yineler. Örneğin anne 'Su ister misin?' diye sorduğunda, çocuk hemen 'Su ister misin?' yanıtını verir.",
                            "'Gecikmiş Ekolali'de ise çocuk saatler, günler veya aylar önce duyduğu bir ses bandını tekrar eder. Örneğin bir çizgi filmdeki repliği, bir asansör anonsunu veya ebeveynin daha önce kızdığı bir cümleyi oyun oynarken ya da stresli anlarda kendi kendine tekrarlar."
                      ],
                      "tipBox": {
                            "title": "Ekolali Dil Gelişiminin Olumlu Bir Göstergesidir",
                            "text": "Hiç ses çıkarmayan sözel olmayan bir çocukla kıyaslandığında ekolali yapan çocuk; sesleri duyuyor, heceleri ayrıştırabiliyor, motor konuşma organlarını kontrol edebiliyor ve ses üretebiliyordur. Bu, konuşmanın altyapısının kurulduğunun kanıtıdır."
                      }
                },
                {
                      "heading": "Otizmli Çocuklar Neden Ekolali Yapar?",
                      "paragraphs": [
                            "Ekolali amaçsız bir davranış değildir; çocuk bu davranışı belirli işlevler için bir araç olarak kullanır:",
                            "İşlemleme Zamanı Kazanma: Kendisine yöneltilen soruyu tam anlayamayan çocuk, soruyu tekrarlayarak beynine bilgiyi işlemek için birkaç saniye zaman tanır.",
                            "İstek Bildirme: Çocuk daha önce çizgi filmde susayan kahramanın söylediği 'Bana bir bardak meyve suyu ver!' repliğini, kendisi susadığında anneye iletmek için kullanabilir.",
                            "Duygusal Regülasyon (Sakinleşme): Kaygılı veya yorgun anlarda tanıdık kelimeleri ritmik olarak tekrarlamak sinir sistemini yatıştırır."
                      ]
                },
                {
                      "heading": "Ekolaliyi Doğal İletişime Dönüştürme Stratejileri",
                      "paragraphs": [
                            "Ekolaliyi 'Sus, tekrar etme' diyerek bastırmaya çalışmak çocuğun konuşma arzusunu tamamen köreltebilir. Bunun yerine ekolaliyi işlevsel bir köprüye dönüştürmeliyiz.",
                            "Çocuğa soru sorarken onun vermesini istediğiniz cevabı modelleyin. 'Su ister misin?' yerine bardağı göstererek doğrudan 'Su ver' deyin. Çocuk 'Su ver' dediğinde suyu hemen vererek kelimenin işlevini pekiştirin."
                      ],
                      "listItems": [
                            "Seçenek Sunarken Görsel Kullanın: 'Elma mı muz mu?' diye sorduğunuzda çocuk son kelime olan 'muz'u ekolali yapabilir. İki meyveyi elinizde tutup 'Elma... Muz...' diyerek işaret etmesini isteyin.",
                            "Birinci Tekil Şahıs Cümleleri Kurun: Çocuk ebeveynin söylediği cümleyi aynen alacağı için 'Sen acıktın mı?' demek yerine 'Acıktım' kalıbını modelleyin.",
                            "Repliklerin Arkasındaki Anlamı Çözün: Çocuğun belirli bir çizgi film repliğini hangi anlarda söylediğini not edin; o repliğin yerine gerçek duygusunu ('Korktum', 'Yoruldum') koymasına yardımcı olun."
                      ]
                }
          ],
          "conclusion": "Ekolali, dil gelişiminin bir çıkmaz sokağı değil; köprü basamağıdır. Nitelikli özel eğitim ve dil terapisi ile ekolali yapan çocukların büyük bölümü zamanla spontane ve yaratıcı konuşma becerisine ulaşır.",
          "faqs": [
                {
                      "question": "Ekolali tamamen kaybolur mu?",
                      "answer": "Çocuğun alıcı dil (anlama) ve ifade edici dil becerileri geliştikçe ve kelime dağarcığı zenginleştikçe ekolali kademeli olarak azalır ve yerini amaca uygun özgün cümlelere bırakır."
                },
                {
                      "question": "Çocuk sürekli kendi kendine video replikleri söylüyorsa nasıl müdahale edilmeli?",
                      "answer": "Bu durum çoğunlukla duyusal veya duygusal bir sakinleşme (stimming) aracıdır. Ortamdaki stresi azaltın, çocuğun ilgisini çekebilecek ortak bir oyuna davet ederek onu dış dünyaya nazikçe geri çağırın."
                }
          ]
    }
  },
  {
    slug: "otizmli-cocuklarda-oyun-becerileri-ve-oyuncak-secimi",
    title: "Otizmli Çocuklarda Oyun Gelişimi: Duyusal Oyuncak Seçimi ve Akran Oyununa Geçiş",
    summary: "Otizmde oyun evreleri, nesneleri amacına uygun kullanma, sembolik (mış gibi) oyun öğretimi, duyusal sakinleştirici oyuncaklar ve paralel oyundan akran paylaşımına geçiş yolları.",
    category: "Özel Eğitim",
    author: "OtiZeka Çocuk Gelişimi ve Pedagoji Kurulu",
    readTime: "8 dk",
    publishedDate: "2026-09-18",
    keywords: ["otizm oyun becerileri","otizm oyuncak seçimi","sembolik oyun otizm","duyusal oyuncaklar","akran oyunu","paralel oyun"],
    content: {
          "intro": "Oyun, bir çocuğun dünyayı keşfettiği, sosyal kuralları deneyimlediği ve problem çözme becerilerini inşa ettiği en temel gelişim alanıdır. Ancak otizmli çocuklarda oyun gelişimi tipik akranlarından farklı bir yol izler. Çocuklar oyuncakların işlevsel amacından ziyade parçalarına (arabanın tekerleğini dakikalarca döndürmek, blokları renklerine göre düz bir çizgi halinde dizmek) odaklanabilirler. Çocuğa oyun oynamayı öğretmek, aslında sosyal iletişimin ve soyut düşünmenin temellerini atmaktır.",
          "sections": [
                {
                      "heading": "Otizmde Oyun Evreleri Nasıl İlerler?",
                      "paragraphs": [
                            "Tipik gelişimde oyun basamakları duyusal-motor keşiften sembolik oyuna ve kurallı akran oyununa doğru doğal bir akışla geçerken, otizmde bu basamakların yapılandırılmış destekle öğretilmesi gerekir.",
                            "1. Duyusal/Manipülatif Oyun: Nesneleri vurma, sallama, ağza alma, ışığını izleme veya tekerleğini döndürme aşamasıdır.",
                            "2. İşlevsel Oyun: Nesneyi gerçek amacına uygun kullanma (arabayı halıda sürme, bardağı ağza götürüp içiyormuş gibi yapma, tarağı saça sürme).",
                            "3. Sembolik (Mış Gibi) Oyun: Hayal gücünün devreye girdiği aşamadır (bir tahta bloğu telefon yapıp konuşma, bebeğe mama yedirme).",
                            "4. Sosyal / Akran Oyunu: Paralel oyundan (yan yana ama ayrı oynama) başlayıp sıra alma ve iş birliğine dayalı ortak oyuna geçiş."
                      ],
                      "tipBox": {
                            "title": "Oyunu Bozmayın, Oyuna Katılın",
                            "text": "Çocuğunuz arabaları sıraya diziyorsa onun dizdiği arabaları bozup sürmeye zorlamayın. Yanına oturun, siz de bir araba alın ve onun sırasına bir araba ekleyerek 'Kırmızı araba da geldi!' deyin. Onun oyununa katılmak iletişimin ilk şartıdır."
                      }
                },
                {
                      "heading": "Gelişimi Destekleyen Oyuncak Seçimi Kriterleri",
                      "paragraphs": [
                            "Otizmli çocuklar için oyuncak seçerken pilli, aşırı sesli ve tek bir tuşla ışık saçan elektronik oyuncaklar yerine; çocuğun aktif katılımını gerektiren açık uçlu materyaller tercih edilmelidir.",
                            "Duyusal Arayışı Doyuran Materyaller: Kinetik kum, oyun hamurları, su oyunları setleri, kabarcık tüpleri, stres topları ve parmak boyaları.",
                            "Neden-Sonuç Oyuncakları: Bilye kaydırakları, tokmaklı çekiç kutuları, şekil yerleştirme kovaları ve bas-bırak mekanizmalı araçlar.",
                            "Görsel-Mekansal Yapılandırma: Ahşap bloklar, manyetik legolar ve basitten karmaşığa puzzle setleri."
                      ]
                },
                {
                      "heading": "Akran Oyununa Adım Adım Geçiş",
                      "paragraphs": [
                            "Otizmli bir çocuğu doğrudan kalabalık bir çocuk grubunun içine atmak kaygısını artırabilir. Akran etkileşimi basamaklar halinde inşa edilmelidir.",
                            "Öncelikle 'Paralel Oyun' hedeflenir: Çocuğun sevdiği bir akranıyla (kuzen, komşu çocuğu) aynı odada, aynı oyuncaklarla yan yana ama kendi başına oynaması sağlanır. Zamanla 'Sıra Alma' oyunlarına (sırayla top atma, sırayla kuleye blok koyma) geçilir."
                      ]
                }
          ],
          "conclusion": "Oyun, otizmli çocuğun kabuğunu kırmasını sağlayan en güçlü pedagojik anahtardır. Günde 20 dakikalık yapılandırılmış kaliteli oyun seansları çocuğun sosyal algısını belirgin biçimde genişletir.",
          "faqs": [
                {
                      "question": "Çocuğum sadece tek bir nesneyle (örneğin bir iple) oynuyor, ne yapmalıyım?",
                      "answer": "Tek bir nesneye takılı kalmak duyusal regülasyon ihtiyacından kaynaklanır. İpi elinden zorla almayın; ipi oyunun bir parçası yapın (örneğin ipi bir arabaya bağlayıp çekme oyunu oynayın) ve ipin yanına benzer dokuda yeni nesneler ekleyin."
                },
                {
                      "question": "Kolektif oyunlara katılmak istemeyen çocuk zorlanmalı mı?",
                      "answer": "Kesinlikle hayır. Zorlamak akran fobisine yol açabilir. Çocuğun oyunu uzaktan izlemesine fırsat tanınmalı, oyunun en keyifli ve basit bir rolü (örneğin ebe yerine sadece bayrak tutan kişi olma) teklif edilerek sürece ısındırılmalıdır."
                }
          ]
    }
  },
  {
    slug: "otizmde-gorsel-cizelgeler-ve-rutin-panolari-kullanimi",
    title: "Otizmde Görsel Çizelgeler ve Rutin Panoları: Belirsizliği ve Geçiş Kaygısını Önleme",
    summary: "Otizmli çocukların dünyayı öngörülebilir kılması için görsel çizelgelerin, önce-sonra panolarının ve günlük akış kartlarının hazırlanması ve uygulanması.",
    category: "Özel Eğitim",
    author: "OtiZeka Özel Eğitim Kurulu",
    readTime: "7 dk",
    publishedDate: "2026-09-18",
    keywords: ["görsel çizelge otizm","rutin panosu","önce sonra panosu","geçiş kaygısı otizm","özel eğitim görsel destek","otizm ev düzeni"],
    content: {
          "intro": "İnsan beyni belirsizlik karşısında kaygı üretir; ancak otizm spektrumundaki bireyler için belirsizlik sadece hafif bir endişe değil, derin bir panik ve varoluşsal bir tehdit hissiyatı yaratabilir. Zamanın soyut bir kavram olması, bir aktivitenin ne zaman biteceğinin ve sırada ne olduğunun bilinememesi gün içerisindeki öfke nöbetlerinin en büyük sebebidir. Görsel çizelgeler, zamanı ve beklentileri somutlaştırarak çocuğa güven ve bağımsızlık kazandıran en etkili özel eğitim araçlarındandır.",
          "sections": [
                {
                      "heading": "Görsel Çizelge Türleri ve Kullanım Amaçları",
                      "paragraphs": [
                            "Çocuğun bilişsel ve algısal düzeyine göre farklı görsel çizelge modelleri tasarlanır:",
                            "1. 'Önce - Sonra' (First - Then) Panosu: En basit ve en etkili başlangıç aracıdır. Sevimsiz veya yapılması zorunlu bir görevden sonra sevilen bir ödülün geleceğini gösterir (Örn: 'Önce El Yıkama' ➔ 'Sonra Park').",
                            "2. Günlük Akış Çizelgesi: Sabahtan akşama kadar günün ana hatlarını (Uyanma, Kahvaltı, Servis, Okul, Oyun, Uyku) sırayla gösteren dikey veya yatay pano.",
                            "3. Görev Analizi Çizelgesi: Tek bir aktivitenin adımlarını gösteren mikro çizelgedir (Örn: Diş fırçalamanın 6 adımı).",
                            "4. Taşınabilir Mini Çizelgeler: Dışarı çıkarken, doktora giderken veya misafirliğe giderken cepte veya tablette taşınan mini kartlar."
                      ],
                      "tipBox": {
                            "title": "Söz Uçar, Görsel Kalır",
                            "text": "Sözel olarak söylediğiniz 'Birazdan montunu giyip arabaya bineceğiz ve anneanneye gideceğiz' cümlesi otizmli çocuğun zihninde birkaç saniye içinde buharlaşabilir. Ancak mont, araba ve anneanne resimlerinin yan yana durduğu bir pano tüm gün boyunca çocuğun güven çıpası olur."
                      }
                },
                {
                      "heading": "Görsel Çizelge Nasıl Hazırlanır ve Uygulanır?",
                      "paragraphs": [
                            "Görsel seviyeyi belirleyin: Çocuğun seviyesine göre gerçek nesneler (örneğin ayakkabı teki), gerçek fotoğraflar, renkli semboller (PECS/PCS sembolleri) veya okuma yazma biliyorsa yazılı kelimeler kullanılabilir.",
                            "Tamamlanma mekanizması kurun: Çocuk bir adımı tamamladığında kartı alıp 'Bitti Kutusu'na atmalı veya cırt cırtlı panoda arkasını çevirmelidir. Görevin bittiğini somut olarak görmek beyinde rahatlama hormonu (dopamin) salgılatır."
                      ],
                      "listItems": [
                            "Göz Hizasına Asın: Panoyu yetişkinin değil, çocuğun rahatça görebileceği ve kartları sökebileceği boy hizasına yerleştirin.",
                            "Tutarlı Olun: Panoyu sadece kriz çıktığında değil, her gün düzenli olarak kullanın.",
                            "Değişiklikleri Önceden İşaretleyin: Beklenmedik bir plan değişikliği olacaksa (ör. yağmur nedeniyle parka gidilemiyorsa), park kartının üzerine 'Sürpriz / Değişiklik' sembolü koyup yeni hedefi önceden gösterin."
                      ]
                },
                {
                      "heading": "Geçiş Kaygılarını (Transitions) Yönetme",
                      "paragraphs": [
                            "Otizmli çocuklar bir aktiviteden diğerine geçerken (örneğin tablet oynamaktan akşam yemeğine geçmek) yoğun direnç gösterirler. Bu direnci kırmak için görsel zamanlayıcılar (Time Timer / kum saati) kullanılmalıdır.",
                            "Görsel saatin kırmızı alanının yavaş yavaş küçüldüğünü gören çocuk, aktivitenin sonuna yaklaştığını zihinsel olarak kabullenir ve geçiş çok daha pürüzsüz gerçekleşir."
                      ]
                }
          ],
          "conclusion": "Görsel çizelgeler bağımlılık yaratmaz; tam tersine çocuğun bir yetişkinin sürekli sözel uyarılarına ('Hadi kalk', 'Hadi giyin') muhtaç kalmadan kendi gününü bağımsız yönetmesini sağlar.",
          "faqs": [
                {
                      "question": "Çocuk çizelgedeki görevi yapmayı reddederse ne yapılmalı?",
                      "answer": "Sözel tartışmaya girmeyin. Sakince panoya gidin, parmağınızla ilgili kartı gösterin ve nötr bir ses tonuyla 'Şimdi görev zamanı, sonra serbest oyun' diyerek fiziksel rehberlikle göreve eşlik edin."
                },
                {
                      "question": "Görsel çizelge ne zamana kadar kullanılmalıdır?",
                      "answer": "Görsel destekler yetişkinlikte dahi kullanılabilen normalleştirici araçlardır; nitekim tipik yetişkinler de ajanda, yapılacaklar listesi ve takvim kullanır. Çocuğun bağımsızlığı arttıkça kartlar yerini yazılı ajandalara veya akıllı telefon takvimlerine bırakabilir."
                }
          ]
    }
  },
  {
    slug: "otizmli-bireylerde-ozbakim-ve-bagimsiz-yasam-becerileri",
    title: "Otizmli Bireylerde Öz Bakım Becerileri: Görev Analiziyle Adım Adım Bağımsızlaşma",
    summary: "El yıkama, diş fırçalama, giyinme ve yemek yeme gibi öz bakım becerilerinin otizmli bireylere görev analizi ve basamaklandırma yöntemiyle öğretilmesi rehberi.",
    category: "Özel Eğitim",
    author: "OtiZeka Özel Eğitim ve Ergoterapi Kurulu",
    readTime: "9 dk",
    publishedDate: "2026-09-19",
    keywords: ["otizm öz bakım","görev analizi özel eğitim","otizm giyinme becerisi","diş fırçalama otizm","bağımsız yaşam becerileri","özel eğitim günlük yaşam"],
    content: {
          "intro": "Özel eğitimin nihai ve en yüce hedefi, bireyin bir başkasına bağımlı olmadan kendi yaşamını sürdürebilmesini sağlamaktır. Akademik beceriler (sayılar, harfler) elbette önemlidir; ancak bir çocuğun kendi başına ellerini yıkayabilmesi, ayakkabısını giyebilmesi, yemeğini yiyebilmesi ve kişisel hijyenini sağlayabilmesi onun yaşam kalitesini ve özgüvenini doğrudan belirler. Otizmli bireylerde motor planlama ve sıra takip güçlükleri nedeniyle öz bakım becerileri 'Görev Analizi' tekniğiyle öğretilmelidir.",
          "sections": [
                {
                      "heading": "Görev Analizi (Task Analysis) Nedir ve Nasıl Yapılır?",
                      "paragraphs": [
                            "Tipik bir yetişkin için 'ellerini yıka' yönergesi tek bir eylem gibi görünür. Oysa bu eylem en az 8 ayrı motor ve bilişsel basamaktan oluşur: Banyoya yürü ➔ Musluğu aç ➔ Elleri ıslat ➔ Sabun al ➔ Elleri ovuştur ➔ Suyla durula ➔ Musluğu kapat ➔ Havluyla kurula.",
                            "Otizmli çocuk tek bir genel komut verildiğinde nerede başlayıp nerede bitireceğini bilemeyerek donup kalabilir. Görev analizi; bir beceriyi en küçük uygulanabilir atomik parçalarına bölerek her basamağı sırayla öğretme yöntemidir."
                      ],
                      "tipBox": {
                            "title": "İleriye Doğru ve Geriye Doğru Zincirleme",
                            "text": "Öz bakımda sıklıkla 'Geriye Doğru Zincirleme' tekniği kullanılır. Tüm basamakları yetişkin yapar, sadece en son basamağı (örneğin elleri havluyla kurulamayı) çocuğa yaptırıp büyük ödülü verir. Çocuk başarı hazzını en sonda hemen tadar; ardından sondan bir önceki basamağa geçilir."
                      }
                },
                {
                      "heading": "Temel Öz Bakım Alanlarında Pratik Öğretim Taktikleri",
                      "paragraphs": [
                            "Giyinme ve Soyunma: Soyunmak giyinmekten her zaman daha kolaydır; bu nedenle eğitime çorap ve pantolon çıkarma ile başlanır. Etiketsiz, dikişsiz ve beli lastikli kıyafetler tercih edilmelidir.",
                            "Diş Fırçalama: Ağız içi duyusal hassasiyeti olan çocuklar için nanesiz, tatlı meyveli veya köpürmeyen çocuk macunları ve ekstra yumuşak kıllı ya da silikon fırçalar kullanılmalıdır.",
                            "Yemek Yeme: Çatal ve kaşık tutuşunu desteklemek için kalınlaştırılmış ergonomik kulplu kaşıklar ve tabağın kaymasını önleyen silikon vantuzlu tabaklar kullanılmalıdır."
                      ],
                      "listItems": [
                            "Fiziksel İpucunu Kademeli Azaltın: El üstünden tutarak yaptırmaktan (tam fiziksel yardım), bilekten tutmaya, dirsekten hafifçe yönlendirmeye ve en sonunda sadece işaret etmeye doğru ipucunu silikleştirin.",
                            "Aynadan Faydalanın: Saç tarama ve yüz yıkama gibi eylemlerde ayna karşısında çalışmak çocuğun beden şemasını görselleştirmesine yardım eder.",
                            "Sabırlı Olun ve Acele Etmeyin: Çocuğun kendi başına giyinmesi sabahları 15 dakika sürebilir. Bu süreyi sabah rutinine dahil edin; acele edip onun yerine giydirmek bağımsızlaşmayı geciktirir."
                      ]
                },
                {
                      "heading": "Ergenlik ve Bireysel Hijyen Süreci",
                      "paragraphs": [
                            "Otizmli çocuklar ergenlik dönemine girdiklerinde vücut kokusu, terleme, tüy temizliği ve kız çocuklarında menstrüasyon (regl) gibi yeni öz bakım alanları ortaya çıkar.",
                            "Bu süreçler mutlaka önceden, somut anatomik çizimler, sosyal öyküler ve adım adım hijyen rutinleriyle hazırlanmalıdır. Deodorant kullanımı ve genital hijyen birer günlük kural olarak yapılandırılmalıdır."
                      ]
                }
          ],
          "conclusion": "Kendi öz bakımını yapabilen birey, toplum içinde çok daha saygın ve özgür bir yer edinir. Çocuğunuza yapabileceğiniz en büyük iyilik, onun yerine yapmak değil; ona nasıl yapacağını sabırla öğretmektir.",
          "faqs": [
                {
                      "question": "Çocuk banyo yapmaktan ve saçının yıkanmasından nefret ediyorsa ne yapılmalı?",
                      "answer": "Suyun başından aşağı dökülmesi çoğu otizmli çocukta nefes alamama ve boğulma paniği yaratır. Yüzünü koruyan banyo şapkaları (siperlikler) kullanın, suyu duş başlığı yerine süngerle veya kapla yavaşça dökün ve banyoda sevdiği su oyuncaklarına yer verin."
                },
                {
                      "question": "Düğme ilikleme ve fermuar çekme becerisi nasıl geliştirilir?",
                      "answer": "Bu beceriler ince motor parmak kaslarının gücüne dayanır. Öncesinde cırt cırtlı kıyafetlerle bağımsızlık kazandırılmalı, evde düğme geçirme tahtaları, mandal takma ve oyun hamuru sıkma aktiviteleriyle parmak kasları güçlendirilmelidir."
                }
          ]
    }
  },
  {
    slug: "otizm-ve-teknoloji-egitici-mobil-uygulamalar-ve-ekran-dengesi",
    title: "Otizm ve Teknoloji: Eğitici Mobil Uygulamalar, AAC Tabletleri ve Sağlıklı Ekran Dengesi",
    summary: "Otizmli çocuklarda tablet ve telefon kullanımı, eğitici dijital uygulamaların avantajları, bağımlılık riskleri ve ekran süresi yönetimi rehberi.",
    category: "Temel Bilgiler",
    author: "OtiZeka Teknoloji ve Eğitim Kurulu",
    readTime: "8 dk",
    publishedDate: "2026-09-19",
    keywords: ["otizm ve tablet","otizm ekran süresi","eğitici otizm uygulamaları","otizm teknoloji kullanımı","aac tablet","ekran bağımlılığı otizm"],
    content: {
          "intro": "Teknoloji ve otizm konusu, ebeveynler ve uzmanlar arasında en çok tartışılan başlıklardan biridir. Bir yanda pasif video izlemenin konuşmayı geciktirdiği ve çocuğu sosyal dünyadan kopardığı yönündeki haklı uyarılar; diğer yanda ise tabletlerin konuşamayan çocuklara ses veren birer alternatif iletişim (AAC) aracına veya bilişsel eğitim laboratuvarına dönüşmesi gerçeği bulunmaktadır. Teknoloji bir düşman değil, doğru yapılandırıldığında mucizevi bir pedagojik kaldıraçtır.",
          "sections": [
                {
                      "heading": "Zararlı Ekran ile Eğitici Ekran Arasındaki Keskin Çizgi",
                      "paragraphs": [
                            "Tüm ekran kullanımları aynı biyolojik etkiyi yaratmaz. Çocuğun YouTube veya TikTok gibi platformlarda saatlerce hızlı değişen, parlak ve anlamsız kısa videoları (shorts/reels) hipnotize olmuş şekilde kaydırması 'Pasif Ekran'dır. Bu durum dopamin sistemini aşırı uyararak dikkat süresini kısaltır, öfke nöbetlerini tetikler ve konuşma ihtiyacını sıfırlar.",
                            "'Aktif / Eğitici Ekran' ise çocuğun doğrudan karar verici olduğu, problem çözdüğü, eşleme yaptığı, harfleri/renkleri öğrendiği veya isteklerini ifade etmek için iletişim kartlarına dokunduğu interaktif süreçtir. OtiZeka gibi özel eğitim temelli uygulamalar beyni pasifleştirmez; bilişsel ve iletişimsel sinir ağlarını aktive eder."
                      ],
                      "tipBox": {
                            "title": "2 Yaş Altı ve Otizmde Ekran Kuralı",
                            "text": "Amerikan Pediatri Akademisi (AAP) ve DSÖ, 0-2 yaş arası çocukların görüntülü aile sohbetleri hariç hiçbir ekrana maruz bırakılmamasını şiddetle tavsiye eder. 2 yaşından sonra ise yalnızca ebeveyn eşliğinde ve nitelikli eğitici içeriklerle sınırlandırılmalıdır."
                      }
                },
                {
                      "heading": "Otizmli Çocuklar Teknolojiyi Neden Çok Sever ve İyi Öğrenir?",
                      "paragraphs": [
                            "Otizmli bireylerin beyni insan yüzlerindeki karmaşık, hızlı ve tahmin edilemez mimikleri okumakta zorlanır. İnsan ses tonu değişkendir, insanlar sabırsızlanabilir veya yargılayıcı olabilir.",
                            "Oysa bir tablet uygulaması %100 öngörülebilirdir. Butona bastığında hep aynı ses çıkar, renkler nettir ve ekran asla çocuğa kızmaz ya da sabırsızlık göstermez. Bu duygusal güvenlik alanı, otizmli çocukların teknoloji aracılığıyla çok daha odaklanmış öğrenmesini sağlar."
                      ]
                },
                {
                      "heading": "Evde Sağlıklı Ekran Protokolü: 5 Altın Kural",
                      "paragraphs": [
                            "Tableti çocuğun eline sınırsız ve kontrolsüz bir 'emzik' gibi vermek felaketle sonuçlanır. Teknolojiden maksimum verim almak için şu kurallar tavizsiz uygulanmalıdır:"
                      ],
                      "listItems": [
                            "Ekran Süresini Sınırlandırın: Günde en fazla 45-60 dakika ve mutlaka 20'şer dakikalık bloklar halinde kullanın.",
                            "Birlikte Oynayın (Ortak İzleme): Çocuğu tabletle yalnız bırakmayın; yanına oturun, oyundaki hayvan seslerini taklit edin, onunla konuşun.",
                            "Yatak Odasına Ekran Sokmayın: Uykudan en az 1.5 saat önce tüm ekranları kapatın; mavi ışık melatonin hormonunu baskılayarak uyku krizine yol açar.",
                            "Kriz Anında Tableti Ödül Olarak Vermeyin: Çocuk öfke nöbeti geçirirken sussun diye tablet vermek, öfke davranışını en üst düzeyde pekiştirir.",
                            "İletişim Cihazı ile Oyun Cihazını Ayırın: Eğer tablet bir AAC (konuşma/iletişim) cihazı olarak kullanılıyorsa, o tablete asla YouTube veya oyun yüklenmemelidir."
                      ]
                }
          ],
          "conclusion": "Teknoloji doğru pedagojik içeriklerle ve sınırlarla kullanıldığında, otizmli bir çocuğun dünyayla köprü kurmasını sağlayan en güçlü dostu haline gelebilir.",
          "faqs": [
                {
                      "question": "Tableti elinden alınca büyük kriz çıkaran çocuk için ne yapılmalı?",
                      "answer": "Tableti aniden elinden çekip almak krizi garantiler. Süre bitimine 5 dakika ve 2 dakika kala sözel ve görsel zamanlayıcı ile haber verin. 'Süre bitti' uyarısı çaldığında tableti çocuğun kendisinin kapatıp şarj kutusuna koymasını sağlayın ve hemen ardından sevdiği alternatif bir fiziksel aktivite (salıncak, güreş oyunu vb.) sunun."
                },
                {
                      "question": "Otizmde telefon mu tablet mi daha uygundur?",
                      "answer": "Tablet her zaman telefondan çok daha üstündür. Küçük telefon ekranları aşırı göz yorgunluğu ve dar odaklanma yaratır. Geniş ekranlı bir tablet ise el-göz koordinasyonu ve motor kontrol için ideal bir çalışma yüzeyi sunar."
                }
          ]
    }
  },
  {
    slug: "otizmde-kardes-iliskileri-ve-aile-ici-denge",
    title: "Otizmli Çocukların Kardeşleri: Duygusal İhtiyaçlar, Kaygılar ve Aile İçi Denge Rehberi",
    summary: "Özel gereksinimli bir kardeşe sahip olmanın getirdiği psikolojik dinamikler, kardeşlerin hissettiği suçluluk ve ihmal duygusuyla başa çıkma yolları.",
    category: "Aile & Yaşam",
    author: "OtiZeka Aile Psikolojisi Kurulu",
    readTime: "8 dk",
    publishedDate: "2026-09-19",
    keywords: ["otizm kardeş ilişkileri","özel gereksinimli kardeş","otizm aile içi denge","kardeş psikolojisi otizm","cam çocuk sendromu"],
    content: {
          "intro": "Bir aileye otizm tanısı girdiğinde, tüm ilgi, maddi kaynaklar, zaman ve duygusal enerji kaçınılmaz olarak özel gereksinimli çocuğa yönelir. Bu süreçte tipik gelişim gösteren diğer kardeşler, istemeden de olsa geri planda kalabilirler. Psikolojide 'Gölgede Kalan Çocuklar' veya 'Cam Çocuklar' olarak adlandırılan bu kardeşler; erken olgunlaşmak, sorun çıkarmamak, anne-babayı üzmemek için kendi duygularını bastırmak zorunda hissederler. Sağlıklı bir aile dengesi kurmak tüm bireylerin refahı için zorunludur.",
          "sections": [
                {
                      "heading": "Kardeşlerin Yaşadığı Karmaşık Duygular",
                      "paragraphs": [
                            "Otizmli bir kardeşe sahip olan çocuklar yaşlarına göre çok derin ve çelişkili duygusal süreçlerden geçerler:",
                            "İhmal Edilmişlik Hissi: Anne babanın sürekli kardeşle hastaneye, terapiye gitmesi ve kardeşin en ufak bir başarısının büyük kutlamalara dönüşmesi, diğer çocukta 'Ben görünmezim' hissi yaratabilir.",
                            "Utanç ve Sosyal Çekingenlik: Kardeşin sokakta veya arkadaşlarının yanında sergilediği öfke nöbetleri veya ses çıkarma davranışları ergenlik çağındaki kardeşte sosyal utanç ve akranlarından kaçınma yaratabilir.",
                            "Görünmez Suçluluk: 'Ben sağlıklıyım ama kardeşim değil' düşüncesi veya kardeşe duyulan anlık öfke sonrasında yaşanan yoğun suçluluk duygusu.",
                            "Gelecek Kaygısı: 'Annem babam yaşlandığında ya da öldüğünde kardeşime ben mi bakacağım?' korkusu kardeşlerin omuzlarına erken yaşta binen ağır bir yüktür."
                      ],
                      "tipBox": {
                            "title": "Kardeşe 'Küçük Anne/Baba' Rolü Yüklemeyin",
                            "text": "Tipik gelişim gösteren çocuğunuza kardeşinin bakım sorumluluğunu (altını değiştirme, sürekli gözetleme) bir ebeveyn gibi yüklemeyin. O bir çocuktur ve kendi çocukluğunu doyasıya yaşama hakkına sahiptir."
                      }
                },
                {
                      "heading": "Aile İçi Dengeyi Korumak İçin 4 Pratik Adım",
                      "paragraphs": [
                            "1. Birebir Özel Zaman Yaratın: Her ebeveyn, haftada en az bir kez 1-2 saatini otizmli kardeşi evde bırakarak diğer çocukla baş başa geçirmelidir. Bu zaman diliminde otizmden hiç bahsedilmemeli, sadece o çocuğun ilgi alanlarına odaklanılmalıdır.",
                            "2. Otizmi Yaşına Uygun Dürüstlükle Anlatın: Kardeşin durumunu bir sır gibi saklamayın. Yaşına uygun kitaplar ve pedagojik açıklamalarla kardeşinin beyninin farklı çalıştığını, bazı seslerin onu korkuttuğunu somutlaştırarak anlatın."
                      ],
                      "listItems": [
                            "Öfkesine İzin Verin: Çocuğun kardeşi tarafından oyuncağı kırıldığında öfkelenmesi doğaldır. 'O hasta, sen idare et' diyerek duygusunu bastırmayın; 'Çok emek verdiğin kule yıkıldığı için kızmakta çok haklısın' diyerek duygusunu onaylayın.",
                            "Kendi Alanını Koruyun: Tipik çocuğun kendi odasında kardeşinin girmesine izin verilmeyen kilitli/güvenli bir özel alanının olması, özel eşyalarının korunmasını sağlar.",
                            "Gelecek Planlarını Açıkça Konuşun: Anne baba olarak kardeşin gelecekteki bakımı için kurumsal ve yasal planlamaları yaptığınızı ve bu yükün onun omuzlarına yıkılmayacağını netleştirin."
                      ]
                }
          ],
          "conclusion": "Otizmli bir kardeşle büyümek, doğru rehberlikle yönetildiğinde çocuğu olağanüstü empatik, hoşgörülü, mücadeleci ve duyarlı bir bireye dönüştüren eşsiz bir hayat okuludur.",
          "faqs": [
                {
                      "question": "Kardeş diğer çocuk gibi davranmaya (gerileme göstermeye) başlarsa ne yapılmalıdır?",
                      "answer": "Bazen kardeş ilgi çekebilmek için bebeksi konuşma veya altına kaçırma gibi regresif davranışlar sergileyebilir. Bu davranışları cezalandırmak yerine, ona duyulan sevgi ve ilginin koşulsuz olduğu hissettirilmeli ve olgun davranışları özel olarak takdir edilmelidir."
                },
                {
                      "question": "Kardeşler için destek grupları var mıdır?",
                      "answer": "Evet, dünyada 'Sibs' (Siblings) olarak bilinen kardeş destek atölyeleri bulunmaktadır. Çocuğun kendisiyle aynı duyguları paylaşan diğer akranlarıyla buluşması yalnızlık hissini tamamen ortadan kaldırır."
                }
          ]
    }
  },
  {
    slug: "otizmde-ram-cozger-ve-meb-okul-kayit-surecleri",
    title: "Otizmde RAM, ÇÖZGER ve MEB Okul Süreçleri: Ailelerin Bilmesi Gereken Tüm Yasal Aşamalar",
    summary: "Rehberlik Araştırma Merkezi (RAM) raporlama adımları, ÇÖZGER sağlık kurulu süreci, kaynaştırma eğitimi, özel eğitim sınıfları ve veli yasal hakları kılavuzu.",
    category: "Aile & Yaşam",
    author: "OtiZeka Hukuk ve Mevzuat Kurulu",
    readTime: "11 dk",
    publishedDate: "2026-09-19",
    keywords: ["çözger raporu","ram raporu otizm","meb özel eğitim kayıt","kaynaştırma kararı","özel eğitim hakları","destek eğitim odası"],
    content: {
          "intro": "Özel gereksinimli bir çocuğa sahip ailelerin eğitim ve sağlık yolculuğunda karşılaştığı en karmaşık bürokratik aşamalar ÇÖZGER ve RAM süreçleridir. Mevzuata hakim olmamak, ailelerin hak kaybına uğramasına, zaman kaybetmesine veya çocuklarının alabileceği devlet desteklerinden mahrum kalmasına yol açabilir. Bu rehber, Türkiye Cumhuriyeti Sağlık ve Milli Eğitim Bakanlığı mevzuatına göre hazırlanmış adım adım resmi yol haritanızdır.",
          "sections": [
                {
                      "heading": "1. Aşama: ÇÖZGER (Çocuklar İçin Özel Gereksinim Raporu) Alma",
                      "paragraphs": [
                            "2019 yılından itibaren 18 yaş altı çocuklar için eski 'engelli sağlık kurulu raporu' kaldırılmış, yerine ÇÖZGER getirilmiştir. ÇÖZGER, çocuğun engel yüzdesini değil, hangi alanlarda ne düzeyde desteğe ihtiyacı olduğunu belirler.",
                            "Başvuru: Sağlık Bakanlığı'na bağlı yetkili devlet veya üniversite hastanelerinden MHRS üzerinden Çocuk Psikiyatrisi Sağlık Kurulu randevusu alınır.",
                            "Değerlendirme: Çocuk ve Ergen Ruh Sağlığı hekimi başkanlığında Çocuk Nörolojisi, Kulak Burun Boğaz, Göz ve Ortopedi gibi ilgili branş hekimleri çocuğu muayene eder.",
                            "Rapor Çıkışı: Rapor heyet tarafından onaylandıktan sonra e-Devlet ve e-Nabız sistemine yüklenir. Rapor süresi çocuğun durumuna göre genellikle 1, 2 veya 3 yıl süreli verilir."
                      ],
                      "tipBox": {
                            "title": "ÇÖZGER Derecelerinin Anlamı",
                            "text": "Raporda 'Özel Gereksinimi Vardır (ÖGV)', 'Hafif Düzeyde ÖGV', 'Orta Düzeyde ÖGV', 'İleri Düzeyde ÖGV', 'Çok İleri Düzeyde ÖGV', 'Belirgin Düzeyde ÖGV' ve 'Özel Koşul Gereksinimi Vardır (ÖKGV)' kategorileri yer alır. ÖKGV kategorisi ÖTV muafiyeti ve evde bakım aylığı gibi haklarda belirleyicidir."
                      }
                },
                {
                      "heading": "2. Aşama: RAM (Rehberlik ve Araştırma Merkezi) Süreci",
                      "paragraphs": [
                            "Hastaneden alınan ÇÖZGER raporu tek başına özel eğitime başlamak için yeterli değildir. Bu raporla birlikte Milli Eğitim Bakanlığı'na bağlı ilçe RAM merkezine başvurulmalıdır.",
                            "RAM Başvurusu: MEBBİS RAM Randevu sistemi üzerinden ikametgahın bağlı olduğu ilçe RAM'dan randevu alınır. ÇÖZGER raporu, kimlik belgeleri ve varsa okul gözlem formu ile gidilir.",
                            "Eğitsel Değerlendirme: Özel eğitim öğretmenleri çocukla birebir performans değerlendirmesi yaparak eğitsel hedefleri belirler."
                      ],
                      "listItems": [
                            "Destek Eğitim Raporu: Çocuğun MEB onaylı bir özel eğitim ve rehabilitasyon merkezinde ayda 8 seans bireysel (ve 4 seans grup) ücretsiz eğitim almasını sağlar. Ücret doğrudan devlet tarafından karşılanır.",
                            "Eğitsel Değerlendirme ve Yerleştirme Kararı: Okul çağına gelen çocuklar için hangi eğitim ortamına gideceklerini belirleyen resmi karardır."
                      ]
                },
                {
                      "heading": "3. Aşama: MEB Okul Yerleştirme Türleri",
                      "paragraphs": [
                            "RAM Özel Eğitim Hizmetleri Kurulu çocuğun performansına göre 3 farklı okul modelinden birine yönlendirme yapar:",
                            "Tam Zamanlı Kaynaştırma / Bütünleştirme: Çocuğun akranlarıyla birlikte genel eğitim okulundaki normal bir sınıfta eğitim almasıdır. En çok tercih edilen ve gelişimsel faydası en yüksek modeldir.",
                            "Özel Eğitim Sınıfı: Genel eğitim okulu bünyesinde, mevcudu 4-6 öğrenciyi geçmeyen ve özel eğitim öğretmenlerinin ders verdiği ayrı sınıflardır.",
                            "Özel Eğitim Uygulama Okulu: Daha yoğun desteğe ihtiyaç duyan (Düzey 3) otizmli çocukların bağımsız yaşam becerilerini geliştirmeye odaklanan özel müstakil okullardır."
                      ]
                }
          ],
          "conclusion": "Devletin sunduğu haklar bir lütuf değil, anayasal bir güvencedir. Okullarda veya merkezlerde hak kaybına uğradığınızı hissettiğinizde İlçe Milli Eğitim Müdürlüğü Özel Eğitim Şubesi'ne resmi dilekçe ile başvurma hakkınız mevcuttur.",
          "faqs": [
                {
                      "question": "Devlet okulunda müdür kaynaştırma öğrencisini kaydetmeyi reddedebilir mi?",
                      "answer": "Kesinlikle HAYIR. 573 sayılı Özel Eğitim Hakkında KHK ve MEB Özel Eğitim Hizmetleri Yönetmeliği uyarınca, RAM tarafından tam zamanlı kaynaştırma kararı verilen bir öğrenciyi hiçbir okul idaresi reddedemez. Bu durum yasal suç teşkil eder."
                },
                {
                      "question": "Kaynaştırma öğrencisine sınavlar nasıl uygulanır?",
                      "answer": "Kaynaştırma öğrencileri için hazırlanan BEP (Bireyselleştirilmiş Eğitim Programı) doğrultusunda sınav soruları çocuğun seviyesine göre uyarlanır. Ek süre verilir, gerekirse okuyucu/kodlayıcı öğretmen atanır ve çocuk genel sınıf sınavından muaf tutulup BEP hedeflerinden notlandırılır."
                }
          ]
    }
  },
  {
    slug: "otizmde-ince-ve-kaba-motor-beceri-gelistirme-etkinlikleri",
    title: "Otizmde İnce ve Kaba Motor Becerileri Geliştirme: Evde Yapılabilecek Pratik Etkinlikler",
    summary: "Denge, koordinasyon, el-göz koordinasyonu, kalem tutma ve makas kullanma gibi motor beceri güçlükleri için ergoterapi ve hareket eğitimi egzersizleri.",
    category: "Duyu & Terapi",
    author: "OtiZeka Hareket ve Ergoterapi Kurulu",
    readTime: "9 dk",
    publishedDate: "2026-09-20",
    keywords: ["otizm motor beceriler","kaba motor otizm","ince motor etkinlikleri","el göz koordinasyonu","denge oyunları","özel eğitim hareket"],
    content: {
          "intro": "Otizm Spektrum Bozukluğu sıklıkla sosyal iletişim ve tekrarlayıcı davranışlarla tanımlansa da, yapılan nörolojik araştırmalar otizmli çocukların %80'den fazlasında belirgin motor planlama (dispraksi), denge, postüral kontrol ve ince motor koordinasyon güçlükleri olduğunu göstermektedir. Beyincik (serebellum) ve bazal gangliyonlardaki nöronal iletim farklılıkları, çocuğun sakar görünmesine, sık düşmesine, kalem tutmakta veya merdiven inip çıkmakta zorlanmasına yol açabilir. Motor gelişim, öz güven ve sosyal oyunların temel zeminidir.",
          "sections": [
                {
                      "heading": "Kaba Motor Beceriler: Denge, Kuvvet ve Beden Farkındalığı",
                      "paragraphs": [
                            "Kaba motor beceriler vücudun büyük kas gruplarını (bacaklar, kollar, gövde) kullanarak yürümeyi, koşmayı, zıplamayı ve dengede durmayı kapsar. Otizmli çocuklarda propriyoseptif (derin duyu) girdi eksikliği nedeniyle vücut sınırlarını algılamakta zorluk sık görülür.",
                            "Evde ve Parkta Kaba Motor Egzersizleri:"
                      ],
                      "listItems": [
                            "Engel Parkurları: Salonda minderlerin üzerinden atlama, masanın altından sürünerek geçme, bantla çizilmiş düz çizgide yürüme parkurları kurun.",
                            "Trambolin ve Zıplama: Güvenlik fileli küçük bir trambolinde ritmik zıplama vestibüler ve propriyoseptif sistemi uyararak denge merkezini güçlendirir.",
                            "Hayvan Yürüyüşleri: Ayı yürüyüşü (eller ve ayaklar yerde), yengeç yürüyüşü ve kurbağa zıplaması omuz kuşağı ve gövde kaslarını muazzam şekilde güçlendirir.",
                            "Top Atma ve Yakalama: Büyük yumuşak plates topuyla karşılıklı yuvarlama, hafif bir topla iki elle yakalama çalışmaları el-göz koordinasyonunu inşa eder."
                      ],
                      "tipBox": {
                            "title": "Parmak Ucunda Yürüme Neden Olur?",
                            "text": "Parmak ucunda yürüme aşil tendonunun kısalığından kaynaklanabileceği gibi çoğunlukla duyusal arayış (topuk tabanındaki dokunma hassasiyetinden kaçınma veya ayak bileğindeki basıncı artırma isteği) nedeniyledir. Çıplak ayakla çimende, kumda ve masaj matlarında yürütmek topuk temasını artırır."
                      }
                },
                {
                      "heading": "İnce Motor Beceriler: El Becerileri, Kalem ve Makas Kullanımı",
                      "paragraphs": [
                            "İnce motor beceriler; ellerin, parmakların ve bileklerin küçük kaslarını koordine ederek nesneleri kavramayı, yazı yazmayı, düğme iliklemeyi ve makas kullanmayı içerir.",
                            "Kalem tutma zorluğu yaşayan bir çocuğa doğrudan yazı yazdırmaya çalışmak çocuğu dersten soğutur. Öncelikle parmak kaslarının gücünü (pincer grasp / cımbız kavrama) artırıcı oyunlar oynanmalıdır."
                      ],
                      "listItems": [
                            "Oyun Hamuru ve Kinetik Kum: Hamuru sıkma, yuvarlama, içine gizlenmiş boncukları parmaklarla bulup çıkarma.",
                            "Mandal Oyunları: Karton kutunun kenarlarına mandalları baş ve işaret parmağıyla takıp çıkarma.",
                            "Makarna ve Boncuk Dizme: Kalın ipten başlayarak makarnaları ipe dizme çalışmaları iki elin koordinasyonunu sağlar.",
                            "Sprey Şişesi ve Su Sıkacağı: Bitki sulama spreyini sıkarak hedefleri vurma oyunu el ayası kaslarını olağanüstü kuvvetlendirir."
                      ]
                }
          ],
          "conclusion": "Hareket eğitimi sadece fiziksel gelişimi değil; çocuğun uyku düzenini, duygu kontrolünü ve öğrenme dikkatini de doğrudan yükseltir. Günde en az 30-45 dakikalık hareketli oyunlar her otizmli çocuğun temel ihtiyacıdır.",
          "faqs": [
                {
                      "question": "Kalemi yumruk gibi tutan çocuk için ne yapılmalı?",
                      "answer": "Küçük üçgen ergonomik boya kalemleri tercih edilmelidir. Normal uzun kalemler yerine kırılmış kısa mum boyalarla boyama yaptırmak, çocuğun anatomik olarak yumruk tutuşu yapmasını engeller ve otomatik olarak üç parmakla tutmaya zorlar."
                },
                {
                      "question": "Bisiklet sürmeyi öğrenemeyen otizmli çocuk nasıl desteklenir?",
                      "answer": "Pedallı bisikletten önce iki tekerlekli pedalsız denge bisikletleri (balance bike) kullanılmalıdır. Çocuk önce ayaklarıyla yeri iterek denge hissini kavrar, ardından pedal çevirme aşamasına çok daha kolay geçer."
                }
          ]
    }
  },
  {
    slug: "otizmde-selektif-beslenme-ve-yiyecek-reddiyle-basa-cikma",
    title: "Otizmde Aşırı Seçici Yeme ve Yiyecek Reddi: Doku Hassasiyeti ve Besin Zincirleme Yöntemi",
    summary: "Otizmli çocuklarda gıda seçiciliği, sadece 2-3 çeşit yiyecekle beslenme, çiğneme zorlukları, doku/koku hassasiyetleri ve beslenme terapisi yaklaşımları.",
    category: "Duyu & Terapi",
    author: "OtiZeka Beslenme ve Terapi Kurulu",
    readTime: "9 dk",
    publishedDate: "2026-09-20",
    keywords: ["otizm beslenme","seçici yeme otizm","besin zincirleme","otizm yemek reddi","doku hassasiyeti yemek","beslenme terapisi"],
    content: {
          "intro": "Sofrada yaşanan savaşlar, tabak fırlatmalar ve çocuğun sadece patates kızartması veya belirli bir marka krakerle beslenmesi... Otizm spektrumundaki ailelerin en büyük tükenmişlik kaynaklarından biri aşırı seçici yeme (selektif beslenme) tablosudur. Yapılan çalışmalar, otizmli çocukların %70 ila %90'ında beslenme güçlükleri olduğunu göstermektedir. Bu tablo bir inatlaşma değil; ağız içi aşırı duyusal hassasiyetin, kaygının ve motor çiğneme zorluklarının bir sonucudur.",
          "sections": [
                {
                      "heading": "Seçici Yeme Davranışının Nörobiyolojik Sebepleri",
                      "paragraphs": [
                            "Otizmli bir çocuk yemek yerken yalnızca lezzeti tatmaz; yemeğin tüm duyusal bileşenleriyle başa çıkmak zorundadır:",
                            "Ağız İçi Dokunma Hassasiyeti (Oral Defensiveness): Pütürlü, lifli veya yapışkan yiyecekler çocuğun ağzında adeta bir kum tanesi veya iğne batması hissi uyandırabilir.",
                            "Koku ve Görsel Seçicilik: Yiyeceğin rengindeki ufak bir ton farkı veya kokusu çocukta zehirlenme korkusuna benzer yoğun bir kaygı (neofobi - yeni gıda korkusu) yaratır.",
                            "Rutin İhtiyacı: Yiyeceğin her zaman aynı marka, aynı pakette ve aynı şekilde sunulması çocuğa kontrol hissi verir.",
                            "Zayıf Oral Motor Beceriler: Dil ve çene kaslarının yeterince gelişmemiş olması, eti veya sebzeleri çiğneyip yutma sürecinde boğulma korkusu yaratabilir."
                      ],
                      "tipBox": {
                            "title": "Yiyeceği Zorla Ağza Sokmayın",
                            "text": "Çocuğu zorla beslemek, ağzını açmaya zorlamak veya ceza vermek durumu daha da kötüleştirir ve kronik gıda travmasına yol açar. Güven hissi inşa edilmeden hiçbir yeni besin kabul görmez."
                      }
                },
                {
                      "heading": "Besin Zincirleme (Food Chaining) Tekniği",
                      "paragraphs": [
                            "Beslenme terapisinde dünyaca kabul görmüş en etkili yöntem 'Besin Zincirleme'dir. Bu teknikte, çocuğun halihazırda severek tükettiği bir yiyeceğin duyusal özellikleri (tat, doku, sıcaklık) temel alınarak çok yakın benzerlikteki yeni bir yiyeceğe küçük köprüler kurulur.",
                            "Örnek Zincir: Çocuk sadece 'çıtır patates cipsi' yiyorsa ➔ Fırınlanmış çıtır patates dilimleri ➔ Çıtır fırınlanmış havuç cipsi ➔ Fırınlanmış tatlı patates ➔ Haşlanmış patates püresi."
                      ],
                      "listItems": [
                            "7 Adımda Besine Yaklaşma Protokolü: 1. Bakma ➔ 2. Masada Durmasına İzin Verme ➔ 3. Koklama ➔ 4. Parmağıyla Dokunma ➔ 5. Dudağına Değdirme ➔ 6. Diliyle Yalayıp Tükürme ➔ 7. Isırıp Yutma.",
                            "Ayrı Tabak Kullanımı: Yeni yiyeceği çocuğun tabağına koyup diğer yemekleri kirletmeyin; masada 'Öğrenme Tabağı' adında küçük ayrı bir tabak bulundurun.",
                            "Yemek Saati Rutinleri: Yemekleri her gün aynı saatte, televizyon/tablet kapalıyken ve tüm ailenin bir arada oturduğu sakin bir masada yiyin."
                      ]
                }
          ],
          "conclusion": "Beslenme terapisi sabırla inşa edilen milimetrik bir yolculuktur. Bir çocuğun yeni bir besini kabul etmesi 20 ila 30 kez o besinle temas etmesini gerektirebilir.",
          "faqs": [
                {
                      "question": "Çocuğun beslenmesi çok kısıtlıysa vitamin eksikliği nasıl önlenir?",
                      "answer": "Mutlaka çocuk doktoru kontrolünde kan tahlilleri (Demir, B12, D vitamini, Çinko) yapılmalı ve gerekirse hekim önerisiyle sıvı/damla formunda gıda takviyeleri verilmelidir."
                },
                {
                      "question": "Yemekleri blenderdan geçirip sıvılaştırmak doğru mudur?",
                      "answer": "3-4 yaşından sonra sürekli püre ile beslemek çiğneme kaslarının tembelleşmesine yol açar. Pürenin kıvamı her hafta çok az miktarda pütürlendirilerek katı gıdaya kademeli geçiş sağlanmalıdır."
                }
          ]
    }
  },
  {
    slug: "otizmli-cocuklarda-uyku-problemleri-ve-uyku-hijyeni",
    title: "Otizmli Çocuklarda Uyku Problemleri, Gece Uyanmaları ve Kanıtlanmış Uyku Rutinleri",
    summary: "Otizmde melatonin dengesizliği, uykuya dalma güçlüğü, gece uyanıp saatlerce oturmaları önleyecek duyusal ve çevresel uyku protokolleri.",
    category: "Aile & Yaşam",
    author: "OtiZeka Nöroloji ve Çocuk Sağlığı Kurulu",
    readTime: "8 dk",
    publishedDate: "2026-09-20",
    keywords: ["otizm uyku problemleri","otizm melatonin","gece uyanma otizm","uyku hijyeni çocuk","ağırlıklı battaniye uyku","otizm uykuya dalma"],
    content: {
          "intro": "Gece saat 03:00, evde herkes uykudayken çocuğunuzun evin içinde enerjik şekilde koştuğunu, ışıkları açıp kapattığını veya anlamsızca ağladığını hayal edin. Bu durum otizmli çocuk sahibi ailelerin %50 ila %80'inin her gece yaşadığı acı bir gerçektir. Uyku bozuklukları yalnızca çocuğun ertesi günkü öğrenme kapasitesini ve dikkatini yok etmekle kalmaz; ebeveynleri de kronik tükenmişlik ve depresyona sürükler. Uyku sorunlarının biyolojik kökenlerini anlamak ve bilimsel uyku hijyenini kurmak bu düğümü çözer.",
          "sections": [
                {
                      "heading": "Otizmde Uyku Sorunlarının Biyolojik Nedenleri",
                      "paragraphs": [
                            "Otizmli çocukların uykuya dalamamasının arkasında biyolojik ve nörolojik faktörler yatar:",
                            "Melatonin Hormonu Salınım Bozukluğu: Beyindeki epifiz bezi tarafından salgılanan ve uyku-uyanıklık döngüsünü (sirkadiyen ritim) düzenleyen melatonin hormonu, otizmli bireylerde tipik bireylere göre çok daha düzensiz ve yetersiz salgılanır.",
                            "Duyusal Aşırı Uyarılma: Çarşafın kumaşı, uzaktan gelen buzdolabı motorunun sesi veya sokak lambasının cılız ışığı bile duyusal filtresi zayıf olan çocuğu uyanık tutmaya yeter.",
                            "Kaygı ve Ayrılma Korkusu: Karanlık ve uyku hali çocuk için kontrolün tamamen kaybedildiği korkutucu bir deneyim olabilir."
                      ],
                      "tipBox": {
                            "title": "Ağırlıklı Battaniyenin (Weighted Blanket) Sakinleştirici Gücü",
                            "text": "Vücut ağırlığının yaklaşık %10'u kadar olan ağırlıklı battaniyeler, sinir sistemine derin dokunma basıncı (DTP) uygulayarak serotonin ve melatonin salgısını uyarır, gece dönmelerini azaltır ve uykuya geçişi hızlandırır."
                      }
                },
                {
                      "heading": "Adım Adım Sağlıklı Uyku Hijyeni Protokolü",
                      "paragraphs": [
                            "Uyku bir düğmeye basılarak başlatılamaz; uykuya geçiş en az 60 dakikalık bir sakinleşme köprüsüyle inşa edilmelidir:",
                            "1. Ekran Yasağı: Uykudan 90 dakika önce televizyon, tablet ve akıllı telefonlar tamamen kapatılmalıdır. Ekranlardan yayılan mavi dalga boylu ışık beyne 'gündüz vakti' sinyali vererek melatonin üretimini durdurur.",
                            "2. Sabit Uyku Ritüeli: Her gece tavizsiz aynı sıra: Ilık duş ➔ Rahat pamuklu pijama ➔ Loş ışıkta masaj veya sakinleştirici müzik (beyaz gürültü) ➔ Yatakta resimli kitap inceleme ➔ Işıkların kapanması.",
                            "3. Yatak Odası Ortamı: Oda ısısı 19-21°C arasında serin tutulmalı, kalın ışık geçirmez (blackout) perdelerle oda zifiri karanlık yapılmalıdır."
                      ]
                }
          ],
          "conclusion": "Düzenli bir uyku rutini kurulduğunda çocuğun gündüz sergilediği öfke nöbetlerinin ve hiperaktivite belirtilerinin kendiliğinden azaldığı görülecektir.",
          "faqs": [
                {
                      "question": "Otizmde melatonin takviyesi kullanılmalı mıdır?",
                      "answer": "Melatonin desteği birçok otizmli çocukta uykuya dalma süresini belirgin şekilde kısaltır. Ancak mutlaka bir Çocuk Nörolojisi veya Çocuk Psikiyatrisi hekimi kontrolünde, doğru dozajla ve doğru saatte kullanılmalıdır."
                },
                {
                      "question": "Gece uyanan çocukla ebeveyn yatağında yatmak doğru mudur?",
                      "answer": "Gece uyanmalarında çocuğu kendi yatağınıza almak alışkanlık yaratır ve kendi başına uyuma becerisini geciktirir. Çocuğun odasına gidin, ışıkları açmadan fısıltıyla 'Şimdi gece, herkes uyuyor' deyin, sırtını sıvazlayıp kendi yatağında uyumasına eşlik edin."
                }
          ]
    }
  },
  {
    slug: "otizmde-tekrarlayici-davranislar-ve-stimming-anlami",
    title: "Otizmde Tekrarlayıcı Davranışlar ve Stimming: Sakinleşme Mekanizması mı, Problem mi?",
    summary: "El çırpma, sallanma, parmak döndürme gibi öz-uyarıcı stimming davranışlarının duyusal işlevleri, ne zaman müdahale edilmesi gerektiği ve güvenli yönlendirme yolları.",
    category: "Temel Bilgiler",
    author: "OtiZeka Nörogelişim ve Davranış Kurulu",
    readTime: "9 dk",
    publishedDate: "2026-09-20",
    keywords: ["stimming nedir","otizm el çırpma","sallanma davranışı","öz uyarıcı davranışlar","otizm tekrarlayıcı hareketler","stimming durdurulmalı mı"],
    content: {
          "intro": "Kendi etrafında dönme, el ve parmaklarını kanat çırpar gibi sallama, ileri geri sallanma, nesneleri sıraya dizme veya aynı sesleri ritmik olarak çıkarma... Otizm denildiğinde akla ilk gelen görsel imgelerden biri olan bu davranışlar literatürde 'Öz Uyarıcı Davranışlar' ya da yaygın adıyla 'Stimming' olarak adlandırılır. Uzun yıllar boyunca bu davranışlar 'tedavi edilip yok edilmesi gereken bir patoloji' olarak görülmüştür. Oysa modern nörogelişimsel bilim, stimming'in beynin hayatta kalma ve kendini regüle etme mekanizması olduğunu kanıtlamıştır.",
          "sections": [
                {
                      "heading": "Otizmli Bireyler Neden Stimming Yapar?",
                      "paragraphs": [
                            "Stimming davranışı anlamsız ya da amaçsız bir tik değildir. Beyin bu hareketleri çok temel işlevleri yerine getirmek için kullanır:",
                            "Duyusal Aşırı Yüklenmede Sakinleşme: Çevrede çok fazla ses, ışık ve karmaşa olduğunda çocuk kendi ürettiği ritmik ve öngörülebilir bir uyarana (el çırpma, sallanma) odaklanarak dış dünyanın stresinden beynini korur.",
                            "Düşük Uyarılmada Uyanıklığı Artırma: Ortam çok sıkıcı ve uyaran yoksunu olduğunda vestibüler ve propriyoseptif sistemini harekete geçirerek uyanık kalmaya çalışır.",
                            "Duygu İfadesi: Yoğun bir neşe, heyecan veya derin bir hayal kırıklığı anında içsel enerjiyi boşaltma aracıdır."
                      ],
                      "tipBox": {
                            "title": "Stimming Kendi Başına Bir Düşman Değildir",
                            "text": "Zararsız bir stimming davranışını (örneğin heyecanlandığında el çırpmayı) zorla engellemek, çocuğun emniyet sübabını kapatmaya benzer. Bu durum çocuğu çok daha tehlikeli öfke krizlerine veya kendine zarar verme davranışlarına iter."
                      }
                },
                {
                      "heading": "Stimming Ne Zaman ve Nasıl Yönlendirilmelidir?",
                      "paragraphs": [
                            "Bir stimming davranışına yalnızca iki durumda müdahale edilir:",
                            "1. Davranış çocuğa veya çevresine fiziksel zarar veriyorsa (kafayı vurma, el ısırma, tırnakla deriyi yolma).",
                            "2. Davranış çocuğun öğrenmesini, iletişim kurmasını veya sosyal ortamlara katılımını tamamen engelliyorsa.",
                            "Yönlendirme Teknikleri: Davranışı yasaklamak yerine aynı duyusal ihtiyacı karşılayan güvenli bir alternatif sunulmalıdır (Örn: Elini ısıran çocuğa medikal çiğneme kolyesi vermek; sürekli sallanan çocuğa pilates topu veya salıncak sağlamak)."
                      ]
                }
          ],
          "conclusion": "Stimming'i anlamak, otizmli çocuğun ruhsal dilini anlamaktır. Çocuğun neden o hareketi yaptığını çözdüğünüzde, ortamı regüle edebilir ve onu sevgiyle kabul edebilirsiniz.",
          "faqs": [
                {
                      "question": "Tipik gelişim gösteren insanlar da stimming yapar mı?",
                      "answer": "Evet! Bacağını sallamak, parmakla masaya ritim tutmak, saçını kıvırmak veya stres anında tırnak yemek tipik yetişkinlerin yaptığı doğal stimming örnekleridir. Otizmdeki fark sadece hareketlerin daha belirgin ve sık olmasıdır."
                },
                {
                      "question": "Toplum içinde çocuğum el çırptığında insanların bakışlarından nasıl korunabiliriz?",
                      "answer": "Çocuğunuza utanılacak bir şey yapıyormuş gibi hissettirmeyin. Meraklı bakışlara sakin bir tebessümle karşılık verin veya gerekirse 'Heyecanlandığında bu şekilde mutlu oluyor' diyerek doğal bir farkındalık yaratın."
                }
          ]
    }
  },
  {
    slug: "okul-oncesi-ve-ilkokulda-kaynastirma-egitimi-rehberi",
    title: "Okul Öncesi ve İlkokulda Kaynaştırma Eğitimi: BEP Hazırlığı, Öğretmen ve Aile İş Birliği",
    summary: "Kaynaştırma/bütünleştirme sınıflarında otizmli öğrencilerin desteklenmesi, akran zorbalığını önleme, kolaylaştırıcı kişi (gölge öğretmen) ve BEP uyarlamaları.",
    category: "Özel Eğitim",
    author: "OtiZeka Kaynaştırma ve Okul Öncesi Kurulu",
    readTime: "10 dk",
    publishedDate: "2026-09-20",
    keywords: ["kaynaştırma eğitimi otizm","bütünleştirme meb","bep nasıl hazırlanır","gölge öğretmen otizm","akran zorbalığı otizm","okulda otizm"],
    content: {
          "intro": "Kaynaştırma/bütünleştirme eğitimi; özel gereksinimli çocukların akranlarından ayrıştırılmadan, genel eğitim okullarında ve aynı sınıfta bir arada eğitim görmesini sağlayan en çağdaş pedagojik yaklaşımdır. Ancak başarılı bir kaynaştırma, çocuğu sadece bir sıraya oturtmakla gerçekleşmez. Sınıf öğretmeninin pedagojik donanımı, Bireyselleştirilmiş Eğitim Programı'nın (BEP) niteliği, akran farkındalığı ve okul-aile iş birliği bu sürecin sacayaklarıdır.",
          "sections": [
                {
                      "heading": "Başarılı Bir Kaynaştırma Sınıfının 3 Temel Koşulu",
                      "paragraphs": [
                            "1. Uyarlanmış Fiziksel ve Sosyal Çevre: Otizmli öğrenci sınıfta en ön sırada, dikkat dağıtıcı pencere ve kapı kenarlarından uzakta oturtulmalıdır. Sınıf kuralları görsel panolarla asılmalıdır.",
                            "2. Bireyselleştirilmiş Eğitim Programı (BEP): Çocuktan genel müfredatın tümünü başarması beklenemez. BEP Kurulu (okul müdürü, sınıf öğretmeni, rehber öğretmen ve veli) toplanarak çocuğun düzeyine uygun hedefler belirler.",
                            "3. Destek Eğitim Odası: Öğrenci haftalık ders saatlerinin bir kısmında (örneğin haftada 4-8 saat) Destek Eğitim Odası'nda branş öğretmeniyle birebir eksik kazanımlarını çalışır."
                      ],
                      "tipBox": {
                            "title": "Gölge Öğretmen (Kolaylaştırıcı Kişi) Rolü",
                            "text": "Gölge öğretmen çocuğun ödevlerini yapan bir bakıcı değildir. Çocuğun sınıf kurallarına uymasını, akranlarıyla iletişim kurmasını sağlayan ve çocuk bağımsızlaştıkça desteğini kademeli olarak geri çeken profesyonel bir köprüdür."
                      }
                },
                {
                      "heading": "Akran Farkındalığı ve Zorbalığı Önleme",
                      "paragraphs": [
                            "Otizmli çocukların en büyük riski akran zorbalığına ve sosyal dışlanmaya maruz kalmalarıdır. Sınıftaki diğer öğrencilere çocuğun durumu veli onayıyla, doğru ve empatik bir dille anlatılmalıdır.",
                            "'Kardeş Sınıf / Akran Eşleşmesi' modeliyle sınıftaki sorumlu ve duyarlı öğrenciler otizmli çocuğa teneffüslerde ve oyunlarda eşlik edecek gönüllü liderler olarak görevlendirilebilir."
                      ]
                }
          ],
          "conclusion": "Kaynaştırma eğitimi sadece otizmli çocuğa değil; sınıftaki tüm tipik çocuklara empatiyi, farklılıklara saygıyı ve gerçek hayatı öğreten benzersiz bir insani kazanımdır.",
          "faqs": [
                {
                      "question": "Sınıf öğretmeni kaynaştırma öğrencisini istemezse ne yapılabilir?",
                      "answer": "Öncelikle önyargının bilgi eksikliğinden kaynaklandığı unutulmamalıdır. RAM uzmanları ve okul rehberliği ile iş birliği yapılarak öğretmene pedagojik rehberlik sağlanmalı, çözümsüzlük durumunda İlçe Milli Eğitim Müdürlüğü'ne başvurulmalıdır."
                },
                {
                      "question": "Kaynaştırma öğrencisi sınıfta dersi bölerse nasıl yaklaşılmalıdır?",
                      "answer": "Öğrencinin dersi bölmesi genellikle duyusal aşırı yüklenme veya görevi anlayamama kaynaklıdır. Çocuğa 5 dakikalık mola hakkı tanınmalı veya Destek Eğitim Odası'na geçiş sağlanarak sakinleşmesine fırsat verilmelidir."
                }
          ]
    }
  }
];
