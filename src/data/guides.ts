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
  }
];
