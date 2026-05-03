import 'dart:async';
import 'dart:math';
import 'package:flutter/material.dart';

import '../../core/notifications/notification_service.dart';
import '../../core/storage/local_store.dart';

class ModulePage extends StatelessWidget {
  final String moduleKey;
  const ModulePage({super.key, required this.moduleKey});

  String get title {
    switch (moduleKey) {
      case 'info':
        return 'Otizm Bilgilendirme';
      case 'osb':
        return 'OSB (Otizm Spektrum Bozukluğu)';
      case 'education':
        return 'Eğitim';
      case 'emotions':
        return 'Duygularım';
      case 'games':
        return 'Eğitici Oyunlar';
      case 'stories':
        return 'Sosyal Öyküler';
      case 'music':
        return 'Müzik ve Ses';
      case 'acc':
        return 'İletişim Kartları (ACC)';
      case 'calendar':
        return 'Takvim ve Program';
      case 'education_reminder':
        return 'Eğitim Hatırlatıcı';
      default:
        return 'Modül';
    }
  }

  @override
  Widget build(BuildContext context) {
    final Widget body;
    switch (moduleKey) {
      case 'info':
        body = const _InfoModuleBody();
        break;
      case 'osb':
        body = const _OsbModuleBody();
        break;
      case 'education':
        body = const _EducationModuleBody();
        break;
      case 'emotions':
        body = const _EmotionsModuleBody();
        break;
      case 'stories':
        body = const _StoriesModuleBody();
        break;
      case 'music':
        body = const _MusicModuleBody();
        break;
      case 'acc':
        body = const _AccModuleBody();
        break;
      case 'calendar':
        body = const _CalendarModuleBody();
        break;
      case 'education_reminder':
        body = const _EducationReminderModuleBody();
        break;
      case 'games':
        body = const _GamesModuleBody();
        break;
      default:
        body = _ComingSoonBody(title: title);
        break;
    }

    return Scaffold(appBar: AppBar(title: Text(title)), body: body);
  }
}

class _InfoModuleBody extends StatelessWidget {
  const _InfoModuleBody();

  @override
  Widget build(BuildContext context) {
    const featuredTitle = 'Yeni Tanı Alan Aileler İçin İlk Adımlar';
    const featuredContent = 'Tanı sonrası süreç, aileler için hem duygusal hem de bilgilendirici bir yolculuğun başlangıcıdır. İşte ilk adımlar:\n\n'
        '1. Kabullenme ve Duygusal Destek: Kendinize zaman tanıyın. Bu sürecin bir yas süreci gibi hissettirmesi normaldir. Uzman bir psikologdan destek almak, ailenin direncini artırır.\n\n'
        '2. Özel Eğitim Planlaması: Erken müdahale en kritik adımdır. Çocuğunuzun bireysel ihtiyaçlarına uygun bir eğitim programı (BEP) hazırlanması için uzmanlarla iş birliği yapın.\n\n'
        '3. Sağlık ve Raporlama: RAM (Rehberlik Araştırma Merkezi) ve hastane süreçlerini tamamlayarak çocuğunuzun yasal haklarından (destek eğitimi, rehabilitasyon vb.) yararlanmasını sağlayın.\n\n'
        '4. Ev Ortamı Düzenlemesi: Çocuğunuzun duyusal ihtiyaçlarına göre evi sadeleştirin. Görsel çizelgeler kullanarak günlük rutini anlamasına yardımcı olun.\n\n'
        '5. Sosyal Çevre Bilgilendirmesi: Yakın çevrenizi ve akrabalarınızı durum hakkında bilgilendirerek doğru bir destek ağı oluşturun.';

    final categories = <_ModuleSection>[
      const _ModuleSection(
        title: 'Otizm Nedir?',
        description:
            'Otizm Spektrum Bozukluğu’nun ne olduğu, nasıl göründüğü ve neden “spektrum” dendiğine dair anlaşılır bir özet.',
        content:
            'Otizm Spektrum Bozukluğu (OSB), gelişimin erken dönemlerinden itibaren sosyal iletişim, davranış ve öğrenme biçiminde farklılıklarla kendini gösterebilen bir nöro-gelişimsel durumdur.\n\n'
            'Neden “spektrum” denir?\n'
            '- Çünkü belirtiler ve destek ihtiyaçları kişiden kişiye çok değişebilir.\n'
            '- Bazı bireyler günlük yaşamda daha az destekle bağımsız olabilirken, bazıları daha yoğun yapılandırılmış destek gerektirebilir.\n\n'
            'Sık görülen alanlar\n'
            '- Sosyal iletişim: karşılıklı sohbet başlatma/sürdürme, jest-mimikleri anlama, ortak dikkat kurma.\n'
            '- Davranış örüntüleri: rutin ihtiyacı, tekrar eden davranışlar, sınırlı ilgi alanları.\n'
            '- Duyusal farklılıklar: ses, ışık, dokunma, koku gibi uyaranlara aşırı/az duyarlılık.\n\n'
            'Önemli notlar\n'
            '- Otizm tek bir “kalıp” değildir; aynı tanıyı alan iki çocuğun güçlü yönleri ve zorlandığı alanlar farklı olabilir.\n'
            '- Erken ve düzenli destek (özel eğitim, dil-konuşma, ergoterapi/duyu bütünleme gibi) çocuğun gelişimini ve günlük yaşam becerilerini güçlendirebilir.\n'
            '- Amaç “otizmi yok etmek” değil; iletişimi artırmak, bağımsızlığı desteklemek, zorlanmaları azaltmak ve aile yaşamını sürdürülebilir hale getirmektir.',
      ),
      const _ModuleSection(
        title: 'Otizmde Eğitim',
        description: 'Erken müdahale, sınıf içi uyarlamalar ve bireyselleştirilmiş hedeflerle eğitim planlaması.',
        content:
            'Otizmde eğitim; çocuğun iletişim, sosyal etkileşim, oyun/öğrenme ve günlük yaşam becerilerini desteklemek için yapılandırılmış ve bireyselleştirilmiş bir planla yürütülür.\n\n'
            'Temel ilkeler\n'
            '- Bireyselleştirme: Hedefler çocuğun gelişim düzeyi, güçlü yönleri ve ihtiyaçlarına göre belirlenir.\n'
            '- Tutarlılık: Ev-okul-özel eğitim arasında ortak hedef dili ve benzer yöntemler.\n'
            '- Görsel destekler: Günlük rutin çizelgeleri, adım adım yönerge kartları, “önce-sonra” panosu.\n'
            '- Yapılandırılmış öğrenme: Net başlangıç/bitiş, kısa ve anlaşılır yönergeler, tekrar ve genelleme.\n\n'
            'Sık kullanılan eğitim yaklaşımları (genel çerçeve)\n'
            '- Davranışsal yaklaşımlar: İstenilen becerileri öğretme ve problem davranışları azaltma (örn. ABA temelli teknikler).\n'
            '- Gelişimsel yaklaşımlar: Oyun ve etkileşim üzerinden sosyal-iletişim becerilerini güçlendirme.\n'
            '- Sınıf temelli düzenlemeler: Görsel ipuçları, görevleri küçük adımlara bölme, duyusal düzenleme, geçişleri kolaylaştırma.\n\n'
            'Pratik kontrol listesi\n'
            '- Ölçülebilir hedef belirle (örn. “istek bildirme”, “sıra alma”, “tuvalet rutini”).\n'
            '- Hedefleri günlük rutine yerleştir (evde ve okulda kısa tekrarlar).\n'
            '- İlerlemeyi basit kayıtla takip et (hangi ipucu ile başardı?).\n\n'
            'Kaynaklar\n'
            '- CDC: https://www.cdc.gov/autism/treatment/\n'
            '- WHO: https://www.who.int/news-room/fact-sheets/detail/autism-spectrum-disorders',
      ),
      const _ModuleSection(
        title: 'Sosyal İletişim',
        description:
            'Göz teması, ortak dikkat, sırayla oynama ve duygu ifade etme gibi becerileri günlük hayatta desteklemek için pratik öneriler.',
        content:
            'Sosyal iletişim; yalnızca konuşmak değil, karşılıklı etkileşim kurmak, sıra almak, ipuçlarını okumak ve duygu paylaşmak gibi birçok becerinin birleşimidir. Otizmli çocuklarda bu beceriler farklı hızlarda gelişebilir.\n\n'
            'Günlük hayatta işe yarayan yaklaşımlar\n'
            '- Ortak dikkat: Çocuğun ilgisini çeken şeyi birlikte “paylaşma” hedeflenir (ör. oyuncağa bak → sen de bak → kısa bir kelime/işaret). Bu, iletişimin temelidir.\n'
            '- Göz teması: Zorlamadan; oyun, şarkı, baloncuk, sevdiği nesne gibi motivasyon veren anlarda çok kısa ve doğal temaslar hedeflenir.\n'
            '- İstek belirtme: “İstemek” iletişimi artırır. Çocuğun bir şeyi istemesi için küçük fırsatlar oluştur (ör. bisküviyi kutuda tut, yardım istemesi için bekle).\n'
            '- Duygu farkındalığı: Resimler, aynada mimik çalışmaları, kısa videolar ve basit duygu kartları ile “mutlu/üzgün/kızgın/şaşkın” gibi kavramlar pekiştirilebilir.\n'
            '- Sıra alma ve paylaşma: “Sıra bende / sıra sende” oyunları (top atma, blok dizme, kart çekme) sosyal etkileşimi güçlendirir.\n\n'
            'İletişimi kolaylaştıran destekler\n'
            '- Görsel destek: Resimli rutin, adım adım yönerge kartları, “önce-sonra” panosu.\n'
            '- Basit ve tutarlı dil: Kısa cümle, net yönerge, aynı kelimeleri tekrar eden rutin ifadeler.\n'
            '- Sosyal öyküler: Zor sosyal durumları (market, misafir, oyun parkı) kısa ve somut cümlelerle anlatır; beklenen davranışı netleştirir.\n\n'
            'Hedef: Çocuğun kendi ihtiyacını anlatabilmesi, zorlandığında destek isteyebilmesi ve küçük ama sürdürülebilir sosyal etkileşimler kurabilmesidir.',
      ),
      const _ModuleSection(
        title: 'Otizmde Terapi',
        description: 'Dil-konuşma, ergoterapi, davranışsal ve gelişimsel müdahalelerle beceri geliştirme.',
        content:
            'Otizmde terapi; “tek bir yöntem” değil, çocuğun ihtiyaçlarına göre seçilen birden fazla desteğin (iletişim, duyusal düzenleme, davranış, günlük yaşam becerileri) birlikte planlanmasıdır.\n\n'
            'Sık kullanılan terapi alanları\n'
            '- Dil ve konuşma terapisi: Anlama/ifade, karşılıklı iletişim, alternatif iletişim yöntemleri (işaret, resim, cihaz) dahil.\n'
            '- Ergoterapi: Günlük yaşam becerileri (giyinme, yemek, öz bakım) ve duyusal düzenleme ihtiyaçları.\n'
            '- Davranışsal ve gelişimsel müdahaleler: Beceri öğretimi, problem davranışların işlevine göre desteklenmesi, oyun ve sosyal etkileşimin güçlendirilmesi.\n'
            '- Sosyal beceri çalışmaları: Yapılandırılmış grup veya bireysel çalışmalar.\n'
            '- Psikolojik destek: Kaygı, duygu düzenleme gibi eşlik eden alanlarda (özellikle daha büyük çocuk/ergenlerde) uyarlanmış terapi yaklaşımları.\n\n'
            'İyi bir terapi planı nasıl görünür?\n'
            '- Hedefler nettir ve günlük yaşama bağlanır (örn. “istek bildirme”, “geçişlerde zorlanmayı azaltma”).\n'
            '- Aileye ev uygulaması verilir (kısa, sürdürülebilir).\n'
            '- İlerleme veriyle takip edilir ve hedefler güncellenir.\n\n'
            'Kaynaklar\n'
            '- CDC: https://www.cdc.gov/autism/treatment/\n'
            '- WHO: https://www.who.int/news-room/fact-sheets/detail/autism-spectrum-disorders',
      ),
      const _ModuleSection(
        title: 'Duyu Bütünleme',
        description:
            'Ses, ışık, dokunma ve hareket gibi duyularda hassasiyet olduğunda evde ve dışarıda uygulanabilecek basit düzenlemeler.',
        content:
            'Duyu bütünleme, çevreden gelen duyusal bilgilerin (ses, ışık, dokunma, koku, hareket, denge) beyin tarafından organize edilmesidir. Otizmli çocuklarda duyular bazen “fazla” (aşırı hassas) bazen “az” (az duyarlı) çalışabilir.\n\n'
            'Sık görülen örnekler\n'
            '- Ses: Süpürge, kalabalık, zil gibi seslere aşırı tepki veya tam tersi çok yüksek ses arama.\n'
            '- Dokunma: Etiket, dikiş, saç kesimi, tırnak kesimi gibi temaslara hassasiyet.\n'
            '- Görsel: Parlak ışıklar, kalabalık görüntü, ekran hassasiyeti.\n'
            '- Hareket/denge: Sürekli sallanma/zıplama ihtiyacı veya bazı hareketlerden kaçınma.\n\n'
            'Evde uygulanabilecek küçük düzenlemeler\n'
            '- “Sakin köşe”: Gürültüyü azaltan, loş ışıklı, yumuşak minderli bir alan.\n'
            '- Önceden hazırlık: Yeni bir ortama gitmeden önce kısa açıklama + görsel (nereye, ne kadar, ne olacak).\n'
            '- Kademeli alıştırma: Rahatsız eden uyaranla kısa süre + ödül, süreyi yavaş yavaş artırma.\n\n'
            'Dışarıda pratik çözümler\n'
            '- Gürültü engelleyici kulaklık veya kulak tıkacı.\n'
            '- Kalabalık saatlerden kaçınma (market/AVM için sakin saatleri seçme).\n'
            '- Kıyafet seçiminde etiketsiz/rahat kumaş tercih etme.\n\n'
            'Beslenme ve doku seçiciliği\n'
            '- “Tek seferde büyük değişim” yerine çok küçük adımlarla ilerlemek daha sürdürülebilirdir (dokunma-koklama-yalama-tatma gibi basamaklar).\n\n'
            'Duyusal destekler bireyseldir. En iyi yaklaşım; çocuğun hangi uyaranlarda zorlandığını gözlemlemek, tetikleyicileri azaltmak ve düzenli bir rutinle güvenli alanlar oluşturmaktır.',
      ),
      const _ModuleSection(
        title: 'Otizmde Tedavi',
        description: 'Otizmde “tedavi” yaklaşımı: çekirdek özellikler için eğitim/terapi, eşlik eden durumlar için tıbbi destek.',
        content:
            'Otizm yaşam boyu sürebilen bir nörogelişimsel durumdur. Bu nedenle “tek bir tedaviyle tamamen ortadan kaldırma” şeklinde bir yaklaşım bilimsel olarak doğru değildir.\n\n'
            'Güncel, bilimsel yaklaşım\n'
            '- Çekirdek alanlarda destek: İletişim, sosyal etkileşim, uyum becerileri ve günlük yaşam için eğitim ve terapiler (davranışsal, gelişimsel, eğitimsel ve sosyal-ilişkisel yaklaşımlar).\n'
            '- Eşlik eden durumların değerlendirilmesi: Uyku sorunları, anksiyete, DEHB belirtileri, epilepsi, gastrointestinal sorunlar gibi alanlarda hekim değerlendirmesi.\n'
            '- İlaçlar hakkında önemli bilgi: Otizmin çekirdek özelliklerini “tedavi eden” bir ilaç yoktur; ancak bazı ilaçlar eşlik eden belirtileri azaltıp işlevselliği artırmaya yardımcı olabilir. İlaç kararı mutlaka hekim tarafından, yarar-zarar dengesiyle verilir.\n\n'
            'Dikkat edilmesi gerekenler\n'
            '- “Mucize tedavi” iddialarına temkinli yaklaşın.\n'
            '- Kanıtı zayıf veya riskli uygulamalar için (yüksek maliyetli, zarar potansiyeli olan) mutlaka uzman görüşü alın.\n\n'
            'Kaynaklar\n'
            '- CDC: https://www.cdc.gov/autism/treatment/\n'
            '- WHO: https://www.who.int/news-room/fact-sheets/detail/autism-spectrum-disorders',
      ),
      const _ModuleSection(
        title: 'Yasal Haklar',
        description:
            'RAM, ÇÖZGER ve rehabilitasyon süreçlerinde hangi haklara başvurulabileceğini ve hangi adımlarla ilerlenebileceğini anlatan pratik rehber.',
        content:
            'Türkiye’de otizmli çocuklar ve aileleri için eğitim, sağlık ve sosyal destek alanlarında çeşitli haklar bulunur. Başvuru süreçleri şehirden şehire değişebilse de temel yol haritası benzerdir.\n\n'
            'Sık kullanılan rapor ve kurumlar\n'
            '- ÇÖZGER: Çocuklar için özel gereksinim raporu; birçok başvuruda temel belgedir.\n'
            '- RAM (Rehberlik ve Araştırma Merkezi): Eğitim değerlendirmesi ve yönlendirme süreçlerini yürütür.\n\n'
            'Eğitimle ilgili haklar (genel çerçeve)\n'
            '- Kaynaştırma/bütünleştirme uygulamaları ve uygun destekler.\n'
            '- Özel eğitim hizmetlerinden yararlanma ve uygun planlamalar.\n'
            '- Okulda uyarlama: sınıf içi düzenlemeler, görsel destekler, bireyselleştirilmiş hedefler.\n\n'
            'Destek eğitim (rehabilitasyon)\n'
            '- Raporlara bağlı olarak belirli süre/saatlerde destek eğitim hizmeti.\n'
            '- Eğitim programının çocuğun ihtiyacına göre şekillenmesi (iletişim, sosyal beceri, davranış, akademik öncül beceriler).\n\n'
            'Sağlık ve sosyal destekler\n'
            '- Bazı durumlarda hastanelerde öncelik uygulamaları.\n'
            '- Sosyal destekler/yardımlar (gelir kriterlerine göre değişebilir).\n\n'
            'Pratik öneri\n'
            '- Belgeleri tek bir klasörde topla (rapor, sevk, randevu çıktıları, okul yazışmaları).\n'
            '- Süreçte en çok ihtiyaç duyulan şey “takip”tir: randevu, rapor yenileme, okul/merkez görüşmeleri.\n\n'
            'Not: Hakların kapsamı ve koşulları zamanla değişebilir; en güncel bilgi için bulunduğun il/ilçedeki RAM ve ilgili kamu kurumlarından doğrulama yapmak en güvenlisidir.',
      ),
    ];

    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        _SectionCard(
          title: 'Öne Çıkan Rehber',
          subtitle: featuredTitle,
          onTap: () => _openDetail(context, featuredTitle, featuredContent),
        ),
        const SizedBox(height: 16),
        const Text('Kategoriler', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800)),
        const SizedBox(height: 12),
        ...categories.map(
          (c) => Padding(
            padding: const EdgeInsets.only(bottom: 12),
            child: _SectionCard(
              title: c.title,
              subtitle: c.description,
              onTap: () => _openDetail(context, c.title, c.content),
            ),
          ),
        ),
      ],
    );
  }
}

class _OsbModuleBody extends StatelessWidget {
  const _OsbModuleBody();

  @override
  Widget build(BuildContext context) {
    const summary =
        'Bu bölüm; OSB’nin ne olduğunu, nasıl değerlendirildiğini, sık görülen belirtileri ve erken tanı/eğitimin neden önemli olduğunu anlaşılır bir dille özetler. Tanı ve tedavi yerine geçmez; şüphede uzman değerlendirmesi gerekir.';

    final sections = <_ModuleSection>[
      const _ModuleSection(
        title: 'Otizm Spektrum Bozukluğu Nedir?',
        description: 'OSB’nin ne olduğu, neden “spektrum” dendiği ve temel özellikleri.',
        content:
            'Otizm Spektrum Bozukluğu (OSB), beynin gelişimiyle ilişkili nörogelişimsel bir durumdur. OSB’de sosyal iletişim ve sosyal etkileşimde kalıcı güçlükler ile birlikte, sınırlı/tekrarlayıcı davranışlar ve ilgi alanları görülebilir.\n\n'
            'Neden “spektrum” denir?\n'
            '- Belirtilerin şiddeti, görünümü ve kişinin destek ihtiyacı çok değişkendir.\n'
            '- Bazı bireyler günlük yaşamda daha az destekle bağımsız olabilirken, bazıları daha yoğun ve yapılandırılmış desteğe ihtiyaç duyabilir.\n\n'
            'OSB aynı zamanda duyusal farklılıklarla da görülebilir:\n'
            '- Ses, ışık, dokunma, koku gibi uyaranlara aşırı veya az duyarlılık olabilir.\n\n'
            'Not: OSB bir “kişilik” ya da “tercih” değildir; kişinin gelişimsel profiline ilişkin bir durumdur. Amaç; iletişimi, öğrenmeyi, bağımsızlığı ve yaşam kalitesini desteklemektir.',
      ),
      const _ModuleSection(
        title: 'Otizm Spektrum Bozukluğu Nasıl Sınıflandırılır?',
        description: 'Tanı kriterleri ve destek ihtiyacına göre derecelendirme (DSM-5 yaklaşımı).',
        content:
            'Güncel klinik sınıflandırmada OSB, tek bir “spektrum” tanısı altında değerlendirilir. Tanı; çocuğun/bireyin gelişimi, davranışları ve işlevselliği üzerinden uzman gözlemi ve bakım veren bilgisiyle konur.\n\n'
            'DSM-5’e göre OSB tanısında iki ana alan öne çıkar:\n'
            '1) Sosyal iletişim ve etkileşimde kalıcı güçlükler\n'
            '2) Sınırlı, tekrarlayıcı davranışlar/ilgi alanları ve rutinlere aşırı bağlılık gibi örüntüler (duyusal tepkiler dahil)\n\n'
            'Destek ihtiyacına göre “şiddet/düzey” belirtimi yapılabilir:\n'
            '- Düzey 1: Destek gerektirir\n'
            '- Düzey 2: Belirgin (substantial) destek gerektirir\n'
            '- Düzey 3: Çok yoğun (very substantial) destek gerektirir\n\n'
            'Ayrıca şu eşlik eden durumlar ayrıca belirtilir:\n'
            '- Dil gelişimi (eşlik eden dil güçlüğü var/yok)\n'
            '- Zihinsel gelişim (eşlik eden zihinsel yetersizlik var/yok)\n'
            '- Bilinen tıbbi/genetik durumlar ve eş tanılar (örn. DEHB, kaygı, epilepsi gibi)\n\n'
            'Not: Eskiden ayrı isimlerle anılan bazı alt tanılar (örn. Asperger vb.) artık OSB spektrumu içinde ele alınır.',
      ),
      const _ModuleSection(
        title: 'Otizm Spektrum Bozukluğunun Nedenleri Nedir?',
        description: 'Tek bir neden yoktur; genetik ve çevresel etkenler birlikte rol oynar.',
        content:
            'OSB’nin tek bir kanıtlanmış nedeni yoktur. Bilimsel kanıtlar; genetik etkenlerin ve bazı çevresel/biyolojik etkenlerin birlikte, erken beyin gelişimini etkileyerek OSB riskini artırabildiğini gösterir.\n\n'
            'Bilinen genel çerçeve:\n'
            '- Genetik etkenler: Ailede OSB öyküsü ve bazı genetik sendromlar riskle ilişkili olabilir.\n'
            '- Çevresel/biyolojik etkenler: Bazı gebelik ve doğumla ilişkili faktörler (örn. ileri ebeveyn yaşı, prematürite, bazı doğum komplikasyonları gibi) riskle ilişkilendirilmiştir.\n\n'
            'Önemli bilgi:\n'
            '- Aşıların OSB’ye neden olduğuna dair güvenilir bilimsel kanıt yoktur.\n\n'
            'Not: “Risk faktörü” bir şeyin OSB’ye kesin neden olduğu anlamına gelmez; sadece olasılıkla ilişkili bulunmuş olabilir. Her çocuk ve aile için nedenler aynı değildir.',
      ),
      const _ModuleSection(
        title: 'Otizm Spektrum Bozukluğunun Belirtileri Nelerdir?',
        description: 'Sosyal iletişim ve tekrarlayıcı davranış örüntüleri; duyusal farklılıklar.',
        content:
            'Belirtiler kişiden kişiye değişir; ancak OSB’de genellikle iki ana alanda farklılıklar görülür.\n\n'
            '1) Sosyal iletişim ve sosyal etkileşimde zorlanmalar\n'
            '- Karşılıklı iletişimi başlatma ve sürdürmede güçlük\n'
            '- Göz teması, jest/mimik gibi sözel olmayan ipuçlarını kullanmada veya anlamada zorlanma\n'
            '- Akran ilişkileri kurma ve sürdürmede güçlük\n\n'
            '2) Sınırlı ve tekrarlayıcı davranışlar / ilgi alanları\n'
            '- Tekrarlayıcı hareketler veya oyun biçimleri (örn. sallanma, dizme)\n'
            '- Rutinlere aşırı bağlılık, değişikliklerde yoğun zorlanma\n'
            '- Yoğun ve sınırlı ilgi alanları\n'
            '- Duyusal tepkilerde farklılık (ses/ışık/dokunma gibi uyaranlara aşırı veya az tepki)\n\n'
            'Bazı çocuklarda gelişimde duraksama veya gerileme (özellikle iletişim becerilerinde) görülebilir. Bu tür değişimler fark edilirse bir uzmana başvurmak önemlidir.',
      ),
      const _ModuleSection(
        title: 'Erken Tanı ve Erken Eğitimin Önemi',
        description: 'Erken müdahale; iletişim, sosyal beceriler ve günlük yaşamda belirgin fayda sağlayabilir.',
        content:
            'Erken tanı; çocuğun gelişimsel ihtiyaçlarının daha erken anlaşılmasını ve doğru desteklerin daha erken başlamasını sağlar.\n\n'
            'Neden önemlidir?\n'
            '- Erken müdahale hizmetleri (özellikle okul öncesi dönemde) çocuğun iletişim, sosyal etkileşim ve öğrenme becerilerini geliştirmede etkili olabilir.\n'
            '- Aileye rehberlik ve ev içi düzenlemeler (görsel destekler, rutin planlama, iletişim fırsatları oluşturma) günlük yaşamı daha sürdürülebilir hale getirir.\n'
            '- Eşlik eden güçlükler (uyku, beslenme, kaygı, dikkat vb.) daha erken fark edilip uygun yönlendirmeler yapılabilir.\n\n'
            'Pratik adımlar\n'
            '- Gelişimsel dönüm noktalarını takip etme ve şüphede değerlendirme isteme\n'
            '- Çocuk gelişimi / çocuk ve ergen psikiyatrisi / çocuk nörolojisi gibi alanlarda değerlendirme\n'
            '- Özel eğitim ve dil-konuşma desteği gibi hizmetlerde bireyselleştirilmiş hedeflerle düzenli çalışma\n\n'
            'Not: En iyi program; çocuğun güçlü yönlerine ve ihtiyaçlarına göre bireyselleştirilmiş olandır.',
      ),
    ];

    const sources = 'Dünya Sağlık Örgütü (WHO): https://www.who.int/news-room/fact-sheets/detail/autism-spectrum-disorders\n'
        'CDC: https://www.cdc.gov/autism/about/\n'
        'CDC: Clinical Testing and Diagnosis (DSM-5 kriter özeti): https://www.cdc.gov/autism/hcp/diagnosis/index.html\n'
        'NICHD: What are the symptoms of autism?: https://www.nichd.nih.gov/health/topics/autism/conditioninfo/symptoms';

    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        _SectionCard(
          title: 'Kısa Özet',
          subtitle: summary,
          onTap: () => _openDetail(context, 'Kısa Özet', summary),
        ),
        const SizedBox(height: 16),
        const Text('Başlıklar', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800)),
        const SizedBox(height: 12),
        ...sections.map(
          (s) => Padding(
            padding: const EdgeInsets.only(bottom: 12),
            child: _SectionCard(
              title: s.title,
              subtitle: s.description,
              onTap: () => _openDetail(context, s.title, s.content),
            ),
          ),
        ),
        const SizedBox(height: 16),
        _SectionCard(
          title: 'Kaynaklar',
          subtitle: 'Bilgi amaçlı bağlantılar (kopyalayıp tarayıcıda açabilirsiniz).',
          onTap: () => _openDetail(context, 'Kaynaklar', sources),
        ),
      ],
    );
  }
}

class _EducationModuleBody extends StatelessWidget {
  const _EducationModuleBody();

  @override
  Widget build(BuildContext context) {
    const summary =
        'Bu bölüm; OSB başta olmak üzere gelişimsel farklılıklarda sık kullanılan eğitim ve terapi yaklaşımlarını bilimsel çerçevede açıklar. İçerikler bilgi amaçlıdır; çocuğun ihtiyacına göre planlama için uzman değerlendirmesi gerekir.';

    final sections = <_ModuleSection>[
      const _ModuleSection(
        title: 'Hareket Eğitimi',
        description: 'Kaba motor beceriler, denge, koordinasyon ve fiziksel aktivite ile destek.',
        content:
            'Hareket eğitimi; çocuğun denge, koordinasyon, kuvvet, dayanıklılık ve vücut farkındalığı gibi motor alanlarını desteklemeyi hedefleyen planlı fiziksel aktivitelerdir. OSB’de motor planlama, koordinasyon ve postüral kontrol güçlükleri sık görülebildiği için, düzenli hareket çalışmaları günlük yaşama aktarılabilen becerileri güçlendirebilir.\n\n'
            'Bilimsel çerçeve\n'
            '- Düzenli fiziksel aktivite; uyku, duygu düzenleme, dikkat ve genel sağlık üzerinde olumlu etkiler gösterebilir.\n'
            '- Motor beceri çalışmaları; merdiven inip çıkma, top yakalama/atma, bisiklet, oyun parkı aktivitelerine katılım gibi işlevsel hedeflere bağlandığında daha etkilidir.\n\n'
            'Uygulamada amaç\n'
            '- Kısa ve sık tekrarlar (gün içine dağıtılmış 5–15 dk).\n'
            '- Net başlangıç/bitiş, görsel ipuçları ve adım adım yönergeler.\n'
            '- Çocuğun motivasyonuna uygun oyun temelli etkinlikler.\n\n'
            'Not: Ağrı, ortopedik sorun veya belirgin motor gecikme varsa fizyoterapist/uzman değerlendirmesi önerilir.',
      ),
      const _ModuleSection(
        title: 'Ergo Terapi',
        description: 'Günlük yaşam becerileri, duyusal düzenleme ve ince motor alanlarında ergoterapi desteği.',
        content:
            'Ergoterapi (iş ve uğraşı terapisi); çocuğun günlük yaşam aktivitelerine (giyinme, yemek, tuvalet, oyun, okul etkinlikleri) katılımını artırmayı hedefler. OSB’de duyusal işlemleme farklılıkları, ince motor beceriler ve planlama/organizasyon alanları etkilenebileceği için ergoterapi; çevresel uyarlamalar, beceri öğretimi ve rutin planlama ile işlevselliği güçlendirebilir.\n\n'
            'Bilimsel çerçeve\n'
            '- Temel hedef “katılım”dır: Çocuğun günlük yaşama daha rahat ve bağımsız katılması.\n'
            '- Duyusal stratejiler; her çocukta aynı etkiyi göstermez. Bu nedenle bireysel değerlendirme ve ölçülebilir hedeflerle ilerlemek önemlidir.\n\n'
            'Sık hedef alanları\n'
            '- İnce motor: kalem tutma, kesme, düğme/fermuar.\n'
            '- Öz bakım: el yıkama, giyinme, beslenme.\n'
            '- Duyusal düzenleme: ses/ışık/dokunma hassasiyetlerinde uyarlama ve baş etme stratejileri.\n\n'
            'Not: Ev-okul-terapi arasında tutarlılık sağlamak, kazanımların genellenmesini kolaylaştırır.',
      ),
      const _ModuleSection(
        title: 'Özel Eğitim',
        description: 'Bireyselleştirilmiş hedefler, yapılandırılmış öğretim ve günlük yaşama genelleme.',
        content:
            'Özel eğitim; çocuğun gelişim düzeyine göre bireyselleştirilmiş hedeflerle yürütülen yapılandırılmış öğretim sürecidir. OSB’de iletişim, sosyal etkileşim, oyun, akademik öncül beceriler ve günlük yaşam becerileri farklı hızlarda gelişebildiği için, hedeflerin ölçülebilir ve işlevsel olması önemlidir.\n\n'
            'Bilimsel çerçeve\n'
            '- Erken müdahale ve düzenli, yapılandırılmış öğretim birçok çocukta iletişim ve uyum becerilerinde ilerlemeyi destekleyebilir.\n'
            '- Etkili programlar; veriyle izlenen hedefler, sistemli tekrar, ipucu-kademeli azaltma ve genelleme planı içerir.\n\n'
            'Sık kullanılan teknikler (genel yaklaşım)\n'
            '- Görsel destekler: günlük rutin çizelgesi, “önce-sonra”, adım kartları.\n'
            '- Davranışsal öğretim ilkeleri: pekiştirme, görev analizi, küçük adımlarla öğretim.\n'
            '- Doğal ortam öğretimi: günlük yaşam içinde fırsat yakalayıp öğretmek.\n\n'
            'Not: Programın aile tarafından evde kısa uygulamalarla desteklenmesi sürdürülebilirliği artırır.',
      ),
      const _ModuleSection(
        title: 'Dil Terapisi',
        description: 'Anlama/ifade, konuşma, pragmatik dil ve alternatif iletişim (AAC) desteği.',
        content:
            'Dil ve konuşma terapisi; çocuğun alıcı (anlama) ve ifade edici dil becerilerini, konuşma anlaşılırlığını ve sosyal iletişimi (pragmatik dil) geliştirmeyi hedefler. OSB’de iletişim; yalnızca konuşma değil, karşılıklı etkileşim, sıra alma, jest-mimik kullanımı ve bağlama uygun dil kullanımı gibi alanları da kapsar.\n\n'
            'Bilimsel çerçeve\n'
            '- İletişim hedefleri işlevsel olmalıdır: istek bildirme, reddetme, yardım isteme, seçim yapma.\n'
            '- Konuşma gecikmesinde veya sınırlı konuşmada, AAC (resim, işaret, cihaz) iletişimi artırabilir ve konuşmayı “engellemez”; çoğu çocukta iletişim fırsatlarını çoğaltır.\n\n'
            'Sık hedef alanları\n'
            '- İstek bildirme ve ortak dikkat.\n'
            '- Basit cümle kurma, soru-cevap.\n'
            '- Sosyal iletişim: selamlaşma, sıra alma, duygu ifade etme.\n\n'
            'Not: Evde aynı hedef dili ve görsel destekleri kullanmak ilerlemeyi hızlandırır.',
      ),
      const _ModuleSection(
        title: 'Floortime',
        description: 'DIR/Floortime: ilişki temelli, oyun üzerinden sosyal-iletişim becerilerini destekleme.',
        content:
            'DIR/Floortime; çocuğun gelişim basamaklarını (duygu düzenleme, ortak dikkat, karşılıklı etkileşim, problem çözme) ilişki temelli ve oyun odaklı bir yaklaşımla desteklemeyi amaçlar. Ebeveynin/uygulayıcının çocuğun ilgisini takip ederek etkileşimi derinleştirmesi ve “karşılıklı iletişim döngülerini” artırması hedeflenir.\n\n'
            'Bilimsel çerçeve\n'
            '- İlişki temelli yaklaşımlar; sosyal etkileşimi ve duygu düzenlemeyi hedefler.\n'
            '- Etkinlik; çocuğun profiline uygun hedefler, düzenli uygulama ve aile katılımıyla artar.\n\n'
            'Uygulamada temel prensipler\n'
            '- Çocuğun ilgisini takip et ve etkileşimi genişlet.\n'
            '- Kısa, sık ve keyifli oyun seansları planla.\n'
            '- Etkileşimi “soru yağmuru” yerine karşılıklı oyun akışıyla sürdür.\n\n'
            'Not: Floortime, yapılandırılmış öğretim ve dil terapisi gibi yaklaşımlarla birlikte planlanabilir; hedeflerin çakışmaması için ekip koordinasyonu faydalıdır.',
      ),
    ];

    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        _SectionCard(
          title: 'Kısa Özet',
          subtitle: summary,
          onTap: () => _openDetail(context, 'Kısa Özet', summary),
        ),
        const SizedBox(height: 16),
        const Text('Başlıklar', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800)),
        const SizedBox(height: 12),
        ...sections.map(
          (s) => Padding(
            padding: const EdgeInsets.only(bottom: 12),
            child: _SectionCard(
              title: s.title,
              subtitle: s.description,
              onTap: () => _openDetail(context, s.title, s.content),
            ),
          ),
        ),
      ],
    );
  }
}

class _EmotionsModuleBody extends StatefulWidget {
  const _EmotionsModuleBody();

  @override
  State<_EmotionsModuleBody> createState() => _EmotionsModuleBodyState();
}

class _EmotionsModuleBodyState extends State<_EmotionsModuleBody> {
  final _rand = Random();
  String? _selectedEmotion;
  int _intensity = 3;
  final Set<String> _triggers = {};
  final Set<String> _helps = {};
  final _antecedentCtrl = TextEditingController();
  final _behaviorCtrl = TextEditingController();
  final _consequenceCtrl = TextEditingController();
  final _noteCtrl = TextEditingController();

  final List<_EmotionLogEntry> _log = [];
  bool _loaded = false;

  @override
  void initState() {
    super.initState();
    Future.microtask(_load);
  }

  Future<void> _load() async {
    final raw = await LocalStore.instance.readJson('emotions_log_v1.json');
    if (!mounted) return;
    if (raw is List) {
      final next = <_EmotionLogEntry>[];
      for (final item in raw) {
        if (item is Map<String, dynamic>) {
          final parsed = _EmotionLogEntry.fromJson(item);
          if (parsed != null) next.add(parsed);
        } else if (item is Map) {
          final parsed = _EmotionLogEntry.fromJson(item.map((k, v) => MapEntry('$k', v)));
          if (parsed != null) next.add(parsed);
        }
      }
      setState(() {
        _log
          ..clear()
          ..addAll(next);
        _loaded = true;
      });
      return;
    }
    setState(() => _loaded = true);
  }

  Future<void> _persist() async {
    final payload = _log.map((e) => e.toJson()).toList(growable: false);
    await LocalStore.instance.writeJson('emotions_log_v1.json', payload);
  }

  static const _triggerOptions = <String>[
    'Gürültü',
    'Kalabalık',
    'Değişiklik',
    'Beklemek',
    'Yorgunluk',
    'Açlık',
    'Işık',
    'Dokunma',
    'Ekran',
    'Ayrılma',
  ];

  static const _helpOptions = <String>[
    'Derin Nefes',
    'Ara Vermek',
    'Sarılma',
    'Kulaklık',
    'Su İçmek',
    'Sakin Köşe',
    'Müzik',
    'Top Sıkma',
  ];

  static const _emotions = <({String name, String emoji, Color color})>[
    (name: 'Mutlu', emoji: '😊', color: Color(0xFFFDE68A)),
    (name: 'Üzgün', emoji: '😢', color: Color(0xFFBFDBFE)),
    (name: 'Kızgın', emoji: '😠', color: Color(0xFFFECACA)),
    (name: 'Şaşırmış', emoji: '😲', color: Color(0xFFE9D5FF)),
    (name: 'Korkmuş', emoji: '😨', color: Color(0xFFE4E4E7)),
    (name: 'Heyecanlı', emoji: '🤩', color: Color(0xFFFED7AA)),
  ];

  @override
  void dispose() {
    _antecedentCtrl.dispose();
    _behaviorCtrl.dispose();
    _consequenceCtrl.dispose();
    _noteCtrl.dispose();
    super.dispose();
  }

  void _toggle(Set<String> set, String value) {
    setState(() {
      if (set.contains(value)) {
        set.remove(value);
      } else {
        set.add(value);
      }
    });
  }

  void _save() {
    final emotion = _selectedEmotion;
    if (emotion == null) return;
    setState(() {
      _log.insert(
        0,
        _EmotionLogEntry(
          id: 'e-${DateTime.now().millisecondsSinceEpoch}-${_rand.nextInt(1 << 20)}',
          at: DateTime.now(),
          emotion: emotion,
          intensity: _intensity,
          triggers: _triggers.toList(growable: false),
          antecedent: _antecedentCtrl.text.trim(),
          behavior: _behaviorCtrl.text.trim(),
          consequence: _consequenceCtrl.text.trim(),
          note: _noteCtrl.text.trim(),
          helped: _helps.toList(growable: false),
        ),
      );
      _intensity = 3;
      _triggers.clear();
      _helps.clear();
      _antecedentCtrl.clear();
      _behaviorCtrl.clear();
      _consequenceCtrl.clear();
      _noteCtrl.clear();
    });
    Future.microtask(_persist);
  }

  @override
  Widget build(BuildContext context) {
    final disabled = _selectedEmotion == null;
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        if (!_loaded)
          const Padding(
            padding: EdgeInsets.only(bottom: 12),
            child: LinearProgressIndicator(),
          ),
        const Text('Duygunu seç', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w900)),
        const SizedBox(height: 12),
        Wrap(
          spacing: 12,
          runSpacing: 12,
          children: _emotions.map((e) {
            final selected = _selectedEmotion == e.name;
            return SizedBox(
              width: (MediaQuery.of(context).size.width - 16 * 2 - 12) / 2,
              child: InkWell(
                borderRadius: BorderRadius.circular(18),
                onTap: () => setState(() => _selectedEmotion = e.name),
                child: Ink(
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(18),
                    border: Border.all(color: selected ? const Color(0xFF111827) : const Color(0xFFE4E4E7), width: 2),
                  ),
                  child: Padding(
                    padding: const EdgeInsets.all(14),
                    child: Row(
                      children: [
                        Container(
                          width: 44,
                          height: 44,
                          decoration: BoxDecoration(color: e.color, borderRadius: BorderRadius.circular(14)),
                          alignment: Alignment.center,
                          child: Text(e.emoji, style: const TextStyle(fontSize: 22)),
                        ),
                        const SizedBox(width: 12),
                        Expanded(child: Text(e.name, style: const TextStyle(fontWeight: FontWeight.w900))),
                      ],
                    ),
                  ),
                ),
              ),
            );
          }).toList(),
        ),
        const SizedBox(height: 16),
        Card(
          elevation: 0,
          color: Colors.white,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(18),
            side: const BorderSide(color: Color(0xFFE4E4E7)),
          ),
          child: Padding(
            padding: const EdgeInsets.all(14),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    const Expanded(
                      child: Text('Duygu Günlüğü', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w900)),
                    ),
                    OutlinedButton(
                      onPressed: disabled
                          ? null
                          : () {
                              const t = 'Sakinleşmek için: 4’e kadar sayarak nefes al, 4’e kadar tut, 6’ya kadar ver. '
                                  'İstersen kısa ara ver ve su iç.';
                              _openDetail(context, 'Sakinleşme', t);
                            },
                      child: const Text('Sakinleşme'),
                    ),
                  ],
                ),
                const SizedBox(height: 12),
                Text('Seçilen duygu: ${_selectedEmotion ?? '-'}', style: const TextStyle(fontWeight: FontWeight.w800)),
                const SizedBox(height: 10),
                const Text('Şiddet (1-5)', style: TextStyle(fontWeight: FontWeight.w800)),
                Slider(
                  value: _intensity.toDouble(),
                  min: 1,
                  max: 5,
                  divisions: 4,
                  label: '$_intensity',
                  onChanged: disabled ? null : (v) => setState(() => _intensity = v.round()),
                ),
                const SizedBox(height: 10),
                const Text('Tetikleyiciler', style: TextStyle(fontWeight: FontWeight.w800)),
                const SizedBox(height: 8),
                Wrap(
                  spacing: 8,
                  runSpacing: 8,
                  children: _triggerOptions
                      .map(
                        (t) => FilterChip(
                          label: Text(t, style: const TextStyle(fontWeight: FontWeight.w800)),
                          selected: _triggers.contains(t),
                          onSelected: disabled ? null : (_) => _toggle(_triggers, t),
                        ),
                      )
                      .toList(),
                ),
                const SizedBox(height: 12),
                const Text('Ne yardımcı oldu?', style: TextStyle(fontWeight: FontWeight.w800)),
                const SizedBox(height: 8),
                Wrap(
                  spacing: 8,
                  runSpacing: 8,
                  children: _helpOptions
                      .map(
                        (h) => FilterChip(
                          label: Text(h, style: const TextStyle(fontWeight: FontWeight.w800)),
                          selected: _helps.contains(h),
                          onSelected: disabled ? null : (_) => _toggle(_helps, h),
                        ),
                      )
                      .toList(),
                ),
                const SizedBox(height: 12),
                TextField(
                  controller: _antecedentCtrl,
                  enabled: !disabled,
                  decoration: const InputDecoration(labelText: 'Öncesi (ne oldu?)', border: OutlineInputBorder()),
                  maxLines: 2,
                ),
                const SizedBox(height: 10),
                TextField(
                  controller: _behaviorCtrl,
                  enabled: !disabled,
                  decoration: const InputDecoration(labelText: 'Davranış', border: OutlineInputBorder()),
                  maxLines: 2,
                ),
                const SizedBox(height: 10),
                TextField(
                  controller: _consequenceCtrl,
                  enabled: !disabled,
                  decoration: const InputDecoration(labelText: 'Sonuç', border: OutlineInputBorder()),
                  maxLines: 2,
                ),
                const SizedBox(height: 10),
                TextField(
                  controller: _noteCtrl,
                  enabled: !disabled,
                  decoration: const InputDecoration(labelText: 'Not', border: OutlineInputBorder()),
                  maxLines: 2,
                ),
                const SizedBox(height: 12),
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton.icon(
                    onPressed: disabled ? null : _save,
                    icon: const Icon(Icons.save),
                    label: const Text('Kaydet'),
                  ),
                ),
              ],
            ),
          ),
        ),
        const SizedBox(height: 16),
        const Text('Son Kayıtlar', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w900)),
        const SizedBox(height: 12),
        if (_log.isEmpty)
          const Text('Henüz kayıt yok.', style: TextStyle(fontWeight: FontWeight.w700, color: Color(0xFF52525B)))
        else
          ..._log.take(12).map(
                (e) => Padding(
                  padding: const EdgeInsets.only(bottom: 12),
                  child: _SectionCard(
                    title: '${e.emotion} (${e.intensity}/5)',
                    subtitle: '${_formatDateTimeTr(e.at)}${e.note.isNotEmpty ? ' • ${e.note}' : ''}',
                    onTap: () => _openDetail(context, e.emotion, e.toLongText()),
                  ),
                ),
              ),
      ],
    );
  }
}

class _StoriesModuleBody extends StatefulWidget {
  const _StoriesModuleBody();

  @override
  State<_StoriesModuleBody> createState() => _StoriesModuleBodyState();
}

class _StoriesModuleBodyState extends State<_StoriesModuleBody> {
  _Story? _selected;
  int _step = 0;
  String? _quizChoice;

  static const _stories = <_Story>[
    _Story(
      id: 'hand-washing',
      title: 'Ellerimi Yıkıyorum',
      description: 'Temizlik ve sağlık için ellerimizi nasıl yıkarız?',
      steps: [
        (emoji: '🚰', text: 'Musluğu açıyorum ve ellerimi ıslatıyorum.'),
        (emoji: '🧼', text: 'Sabun alıyorum ve ellerimi köpürtüyorum.'),
        (emoji: '🙌', text: 'Ellerimin her yerini iyice ovuyorum.'),
        (emoji: '💦', text: 'Su ile sabunları duruluyorum.'),
        (emoji: '🧣', text: 'Havlumla ellerimi kuruluyorum.'),
      ],
    ),
    _Story(
      id: 'greeting',
      title: 'Merhaba Diyorum',
      description: 'Yeni insanlarla tanışırken ne yaparız?',
      steps: [
        (emoji: '👀', text: 'Karşımdaki kişinin gözlerine bakıyorum.'),
        (emoji: '😊', text: 'Yüzüme küçük bir gülümseme yerleştiriyorum.'),
        (emoji: '👋', text: 'Nazikçe "Merhaba" diyorum.'),
        (emoji: '👂', text: 'Sıramı bekleyip onu dinliyorum.'),
      ],
    ),
    _Story(
      id: 'waiting-turn',
      title: 'Sırada Bekliyorum',
      description: 'Sıra beklemek nasıl olur?',
      steps: [
        (emoji: '📍', text: 'Nerede sıraya girmem gerektiğini buluyorum.'),
        (emoji: '🚶', text: 'Sıranın arkasına geçiyorum.'),
        (emoji: '↔️', text: 'Öndeki kişiye çok yaklaşmadan bekliyorum.'),
        (emoji: '👐', text: 'Beklerken ellerimi sakin tutuyorum.'),
        (emoji: '✅', text: 'Sıram gelince nazikçe öne gidiyorum.'),
      ],
    ),
    _Story(
      id: 'sharing-toys',
      title: 'Oyuncağımı Paylaşıyorum',
      description: 'Arkadaşlarımla paylaşmayı öğreniyorum.',
      steps: [
        (emoji: '👂', text: 'Arkadaşımı dinliyorum ve ne istediğini anlıyorum.'),
        (emoji: '⏳', text: 'İstersem "Birazdan" diyebilirim.'),
        (emoji: '🧸', text: 'Sıra bende bitince oyuncağı uzatıyorum.'),
        (emoji: '🙂', text: 'Arkadaşım oynarken bekliyorum.'),
        (emoji: '🔁', text: 'Sıra bana gelince oyuncağı geri alıyorum.'),
      ],
    ),
    _Story(
      id: 'going-to-school',
      title: 'Okula Hazırlanıyorum',
      description: 'Okula giderken neler yaparım?',
      steps: [
        (emoji: '👕', text: 'Kıyafetlerimi giyiyorum.'),
        (emoji: '🎒', text: 'Çantama gerekli eşyaları koyuyorum.'),
        (emoji: '👟', text: 'Ayakkabılarımı giyiyorum.'),
        (emoji: '🚻', text: 'Kapıdan çıkmadan önce tuvalete gidebilirim.'),
        (emoji: '🚦', text: 'Okula giderken yolda güvenli yürüyorum.'),
      ],
    ),
    _Story(
      id: 'doctor-visit',
      title: 'Doktora Gidiyorum',
      description: 'Doktor kontrolünde neler olur?',
      steps: [
        (emoji: '👋', text: 'Doktoru selamlıyorum.'),
        (emoji: '🩺', text: 'Doktor beni dinler ve sorular sorar.'),
        (emoji: '🌡️', text: 'Gerekirse ölçüm yapılır (ateş, boy, kilo).'),
        (emoji: '💬', text: 'Ben de nasıl hissettiğimi söyleyebilirim.'),
        (emoji: '🙏', text: 'İşimiz bitince teşekkür edip ayrılırım.'),
      ],
    ),
    _Story(
      id: 'market-shopping',
      title: 'Markette Alışveriş',
      description: 'Markette sakin kalmayı öğreniyorum.',
      steps: [
        (emoji: '📝', text: 'Alacağımız şeyleri birlikte seçiyoruz.'),
        (emoji: '🛒', text: 'Raflara bakıp istediğim şeyi gösteriyorum.'),
        (emoji: '🎧', text: 'Çok ses olursa kulaklarımı koruyabilirim.'),
        (emoji: '🏷️', text: 'Kasada sırada bekliyorum.'),
        (emoji: '🏠', text: 'İşimiz bitince eve dönüyoruz.'),
      ],
    ),
    _Story(
      id: 'feelings-words',
      title: 'Duygumu Söylüyorum',
      description: 'Duygularımı kelimelerle ifade ediyorum.',
      steps: [
        (emoji: '🫀', text: 'Vücudumu dinliyorum (kalbim hızlı mı, karnım mı ağrıyor?).'),
        (emoji: '🤔', text: 'Hangi duyguya benzediğini düşünüyorum.'),
        (emoji: '💬', text: 'Kısa bir cümle kuruyorum: "Üzgünüm", "Kızgınım" gibi.'),
        (emoji: '🆘', text: 'Gerekirse yardım istiyorum.'),
        (emoji: '🌿', text: 'Sakinleşince tekrar konuşabilirim.'),
      ],
    ),
  ];

  void _openStory(_Story s) {
    setState(() {
      _selected = s;
      _step = 0;
      _quizChoice = null;
    });
  }

  void _back() {
    setState(() {
      if (_step > 0) {
        _step -= 1;
        _quizChoice = null;
      } else {
        _selected = null;
        _step = 0;
        _quizChoice = null;
      }
    });
  }

  void _next() {
    final s = _selected;
    if (s == null) return;
    setState(() {
      if (_step >= s.steps.length - 1) {
        _selected = null;
        _step = 0;
        _quizChoice = null;
      } else {
        _step += 1;
        _quizChoice = null;
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final s = _selected;
    if (s == null) {
      return ListView(
        padding: const EdgeInsets.all(16),
        children: [
          const Text('Öykü seç', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w900)),
          const SizedBox(height: 12),
          ..._stories.map(
            (st) => Padding(
              padding: const EdgeInsets.only(bottom: 12),
              child: _SectionCard(
                title: st.title,
                subtitle: st.description,
                onTap: () => _openStory(st),
              ),
            ),
          ),
        ],
      );
    }

    final step = s.steps[_step];
    final options = _quizOptionsFor(s);
    final progress = '${_step + 1}/${s.steps.length}';
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        Row(
          children: [
            IconButton(onPressed: _back, icon: const Icon(Icons.arrow_back)),
            Expanded(child: Text(s.title, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w900))),
            Text(progress, style: const TextStyle(fontWeight: FontWeight.w900)),
          ],
        ),
        const SizedBox(height: 12),
        Card(
          elevation: 0,
          color: Colors.white,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(18),
            side: const BorderSide(color: Color(0xFFE4E4E7)),
          ),
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              children: [
                Text(step.emoji, style: const TextStyle(fontSize: 64)),
                const SizedBox(height: 10),
                Text(step.text, textAlign: TextAlign.center, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w800)),
              ],
            ),
          ),
        ),
        const SizedBox(height: 16),
        const Text('Soru', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w900)),
        const SizedBox(height: 8),
        const Text('Bu öykünün adı hangisi?', style: TextStyle(fontWeight: FontWeight.w800)),
        const SizedBox(height: 10),
        ...options.map((opt) {
          final selected = _quizChoice == opt;
          return Padding(
            padding: const EdgeInsets.only(bottom: 10),
            child: OutlinedButton(
              onPressed: () => setState(() => _quizChoice = opt),
              style: OutlinedButton.styleFrom(
                side: BorderSide(color: selected ? const Color(0xFF111827) : const Color(0xFFE4E4E7), width: 2),
                padding: const EdgeInsets.symmetric(vertical: 14, horizontal: 14),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                backgroundColor: selected ? const Color(0xFFF4F4F5) : Colors.white,
              ),
              child: Align(
                alignment: Alignment.centerLeft,
                child: Text(opt, style: const TextStyle(fontWeight: FontWeight.w900)),
              ),
            ),
          );
        }),
        if (_quizChoice != null)
          Padding(
            padding: const EdgeInsets.only(top: 6),
            child: Text(
              _quizChoice == s.title ? 'Doğru!' : 'Tekrar dene.',
              style: TextStyle(fontWeight: FontWeight.w900, color: _quizChoice == s.title ? const Color(0xFF059669) : const Color(0xFFDC2626)),
            ),
          ),
        const SizedBox(height: 16),
        Row(
          children: [
            Expanded(
              child: OutlinedButton(
                onPressed: _back,
                child: const Text('Geri'),
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: ElevatedButton(
                onPressed: _next,
                child: Text(_step >= s.steps.length - 1 ? 'Bitir' : 'İleri'),
              ),
            ),
          ],
        ),
      ],
    );
  }

  List<String> _quizOptionsFor(_Story story) {
    final others = _stories.where((s) => s.id != story.id).toList(growable: false);
    final pool = others.take(2).map((s) => s.title).toList(growable: false);
    return <String>[story.title, ...pool]..shuffle(Random(story.id.hashCode));
  }
}

class _MusicModuleBody extends StatefulWidget {
  const _MusicModuleBody();

  @override
  State<_MusicModuleBody> createState() => _MusicModuleBodyState();
}

class _MusicModuleBodyState extends State<_MusicModuleBody> {
  Timer? _timer;
  _MusicTrack? _now;
  int _remaining = 0;

  static const _tracks = <_MusicTrack>[
    _MusicTrack(title: 'Sakinleştirici Melodi', duration: '3:45', category: 'Müzik', description: 'Sakinleşme ve gevşeme için.'),
    _MusicTrack(title: 'Odak Ritmi', duration: '5:20', category: 'Müzik', description: 'Dikkati toplamak için ritim.'),
    _MusicTrack(title: 'Neşeli Çocuk Melodisi', duration: '2:15', category: 'Müzik', description: 'Hareket ve motivasyon için.'),
    _MusicTrack(title: 'Deniz Sesi', duration: '10:00', category: 'Uyku', description: 'Uyku öncesi rahatlatıcı ortam sesi.'),
    _MusicTrack(title: 'Yağmur Sesi', duration: '10:00', category: 'Sakinleşme', description: 'Sakinleşme için arka plan sesi.'),
    _MusicTrack(title: 'Rüzgar Sesi', duration: '10:00', category: 'Sakinleşme', description: 'Hafif rüzgar ortam sesi.'),
    _MusicTrack(title: 'Beyaz Gürültü', duration: '10:00', category: 'Odak', description: 'Odak için sabit gürültü.'),
    _MusicTrack(title: 'Pembe Gürültü', duration: '10:00', category: 'Odak', description: 'Daha yumuşak gürültü profili.'),
    _MusicTrack(title: 'Kahverengi Gürültü', duration: '10:00', category: 'Uyku', description: 'Derin, düşük frekanslı gürültü.'),
  ];

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }

  int _parseDurationToSeconds(String mmss) {
    final parts = mmss.split(':');
    if (parts.length != 2) return 0;
    final m = int.tryParse(parts[0]) ?? 0;
    final s = int.tryParse(parts[1]) ?? 0;
    return m * 60 + s;
  }

  void _start(_MusicTrack t) {
    _timer?.cancel();
    setState(() {
      _now = t;
      _remaining = _parseDurationToSeconds(t.duration);
    });
    _timer = Timer.periodic(const Duration(seconds: 1), (_) {
      if (!mounted) return;
      setState(() {
        _remaining = max(0, _remaining - 1);
        if (_remaining <= 0) {
          _timer?.cancel();
        }
      });
    });
  }

  void _stop() {
    _timer?.cancel();
    setState(() {
      _now = null;
      _remaining = 0;
    });
  }

  @override
  Widget build(BuildContext context) {
    final now = _now;
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        Card(
          elevation: 0,
          color: Colors.white,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(18),
            side: const BorderSide(color: Color(0xFFE4E4E7)),
          ),
          child: Padding(
            padding: const EdgeInsets.all(14),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text('Şu an', style: TextStyle(fontWeight: FontWeight.w900)),
                const SizedBox(height: 8),
                Text(now?.title ?? 'Seçilmedi', style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w900)),
                const SizedBox(height: 6),
                Text(
                  now == null ? 'Bir parça seçip başlatabilirsin.' : 'Kalan süre: ${_formatMmSs(_remaining)}',
                  style: const TextStyle(fontWeight: FontWeight.w800, color: Color(0xFF52525B)),
                ),
                const SizedBox(height: 12),
                Row(
                  children: [
                    Expanded(
                      child: ElevatedButton.icon(
                        onPressed: now == null ? null : _stop,
                        icon: const Icon(Icons.stop),
                        label: const Text('Durdur'),
                      ),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: OutlinedButton.icon(
                        onPressed: () => _openDetail(
                          context,
                          'Ritim Önerisi',
                          '3 tur nefes egzersizi:\n'
                              '- 4 saniye nefes al\n'
                              '- 4 saniye tut\n'
                              '- 6 saniye ver\n\n'
                              'İstersen sevdiğin bir parçayı açıp tekrar edebilirsin.',
                        ),
                        icon: const Icon(Icons.self_improvement),
                        label: const Text('Nefes'),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
        const SizedBox(height: 16),
        const Text('Parçalar', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w900)),
        const SizedBox(height: 12),
        ..._tracks.map(
          (t) => Padding(
            padding: const EdgeInsets.only(bottom: 12),
            child: _SectionCard(
              title: '${t.title} • ${t.duration}',
              subtitle: '${t.category} • ${t.description}',
              onTap: () {
                _openDetail(context, t.title, '${t.category}\nSüre: ${t.duration}\n\n${t.description}');
                _start(t);
              },
            ),
          ),
        ),
      ],
    );
  }
}

class _AccModuleBody extends StatefulWidget {
  const _AccModuleBody();

  @override
  State<_AccModuleBody> createState() => _AccModuleBodyState();
}

class _AccModuleBodyState extends State<_AccModuleBody> with SingleTickerProviderStateMixin {
  late final TabController _tabs;
  String _message = '';
  final List<String> _sentence = [];
  bool _loaded = false;

  static const _categories = <_AccCategory>[
    _AccCategory(
      title: 'Temel İhtiyaçlar',
      cards: [
        _AccCard(label: 'Su', emoji: '💧'),
        _AccCard(label: 'Acıktım', emoji: '🍽️'),
        _AccCard(label: 'Tuvalet', emoji: '🚻'),
        _AccCard(label: 'Uykum Geldi', emoji: '🌙'),
        _AccCard(label: 'Ara Vermek', emoji: '⏸️'),
        _AccCard(label: 'Yardım', emoji: '🆘'),
        _AccCard(label: 'Sarılmak', emoji: '🫂'),
      ],
    ),
    _AccCategory(
      title: 'Duygular',
      cards: [
        _AccCard(label: 'Mutluyum', emoji: '😊'),
        _AccCard(label: 'Üzgünüm', emoji: '😢'),
        _AccCard(label: 'Korkuyorum', emoji: '😨'),
        _AccCard(label: 'Heyecanlıyım', emoji: '🤩'),
        _AccCard(label: 'Kızgınım', emoji: '😠'),
        _AccCard(label: 'Sakinim', emoji: '🌿'),
        _AccCard(label: 'Yorgunum', emoji: '😴'),
        _AccCard(label: 'Şaşkınım', emoji: '😲'),
      ],
    ),
    _AccCategory(
      title: 'Yer ve Eylem',
      cards: [
        _AccCard(label: 'Eve Gidelim', emoji: '🏠'),
        _AccCard(label: 'Dışarı Çıkalım', emoji: '🚪'),
        _AccCard(label: 'Giyinmek', emoji: '👕'),
        _AccCard(label: 'Parka Gidelim', emoji: '🌳'),
        _AccCard(label: 'Okula Gidelim', emoji: '🏫'),
        _AccCard(label: 'Müzik Aç', emoji: '🎵'),
        _AccCard(label: 'Oyun Oynamak', emoji: '🎮'),
        _AccCard(label: 'Takvime Bakalım', emoji: '📅'),
      ],
    ),
    _AccCategory(
      title: 'İletişim',
      cards: [
        _AccCard(label: 'Ben', emoji: '🧑'),
        _AccCard(label: 'Lütfen', emoji: '🙏'),
        _AccCard(label: 'Teşekkür Ederim', emoji: '💗'),
        _AccCard(label: 'Evet', emoji: '✅'),
        _AccCard(label: 'Hayır', emoji: '❌'),
        _AccCard(label: 'Telefon', emoji: '📞'),
      ],
    ),
  ];

  @override
  void initState() {
    super.initState();
    _tabs = TabController(length: _categories.length, vsync: this);
    _tabs.addListener(() {
      if (_tabs.indexIsChanging) return;
      Future.microtask(_persist);
    });
    Future.microtask(_load);
  }

  @override
  void dispose() {
    _tabs.dispose();
    super.dispose();
  }

  Future<void> _load() async {
    final raw = await LocalStore.instance.readJson('acc_v1.json');
    if (!mounted) return;
    if (raw is Map) {
      final map = raw.map((k, v) => MapEntry('$k', v));
      final msg = map['message'];
      final sentence = map['sentence'];
      final tabIndex = map['tabIndex'];
      setState(() {
        _message = msg is String ? msg : '';
        _sentence
          ..clear()
          ..addAll(sentence is List ? sentence.whereType<String>() : const <String>[]);
        _loaded = true;
      });
      if (tabIndex is int && tabIndex >= 0 && tabIndex < _tabs.length) {
        WidgetsBinding.instance.addPostFrameCallback((_) {
          if (!mounted) return;
          _tabs.index = tabIndex;
        });
      }
      return;
    }
    setState(() => _loaded = true);
  }

  Future<void> _persist() async {
    await LocalStore.instance.writeJson('acc_v1.json', {
      'message': _message,
      'sentence': _sentence,
      'tabIndex': _tabs.index,
    });
  }

  void _tapCard(_AccCard c) {
    setState(() {
      _message = c.label;
      _sentence.add(c.label);
    });
    Future.microtask(_persist);
  }

  void _clear() {
    setState(() {
      _message = '';
      _sentence.clear();
    });
    Future.microtask(_persist);
  }

  @override
  Widget build(BuildContext context) {
    final sentenceText = _sentence.isEmpty ? '…' : '${_sentence.join(' ')}.';
    return Column(
      children: [
        if (!_loaded) const LinearProgressIndicator(),
        Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Container(
                padding: const EdgeInsets.all(14),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(18),
                  border: Border.all(color: const Color(0xFF111827), width: 3),
                ),
                child: Text(
                  _message.isEmpty ? 'Bir karta dokun...' : _message,
                  textAlign: TextAlign.center,
                  style: const TextStyle(fontSize: 22, fontWeight: FontWeight.w900),
                ),
              ),
              const SizedBox(height: 12),
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: const Color(0xFFF4F4F5),
                  borderRadius: BorderRadius.circular(18),
                  border: Border.all(color: const Color(0xFFE4E4E7)),
                ),
                child: Text(sentenceText, style: const TextStyle(fontWeight: FontWeight.w900)),
              ),
              const SizedBox(height: 12),
              Row(
                children: [
                  Expanded(
                    child: OutlinedButton.icon(
                      onPressed: _clear,
                      icon: const Icon(Icons.delete_outline),
                      label: const Text('Temizle'),
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: OutlinedButton.icon(
                      onPressed: _sentence.isEmpty ? null : () => _openDetail(context, 'Cümle', sentenceText),
                      icon: const Icon(Icons.visibility),
                      label: const Text('Göster'),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
        TabBar(
          controller: _tabs,
          isScrollable: true,
          tabs: _categories.map((c) => Tab(text: c.title)).toList(),
        ),
        Expanded(
          child: TabBarView(
            controller: _tabs,
            children: _categories.map((cat) {
              return GridView.count(
                padding: const EdgeInsets.all(16),
                crossAxisCount: MediaQuery.of(context).size.width >= 720 ? 4 : 3,
                mainAxisSpacing: 12,
                crossAxisSpacing: 12,
                childAspectRatio: 1.1,
                children: cat.cards.map((c) {
                  return InkWell(
                    borderRadius: BorderRadius.circular(18),
                    onTap: () => _tapCard(c),
                    child: Ink(
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(18),
                        border: Border.all(color: const Color(0xFFE4E4E7), width: 2),
                      ),
                      child: Padding(
                        padding: const EdgeInsets.all(12),
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Text(c.emoji, style: const TextStyle(fontSize: 34)),
                            const SizedBox(height: 10),
                            Text(
                              c.label,
                              textAlign: TextAlign.center,
                              style: const TextStyle(fontWeight: FontWeight.w900),
                              maxLines: 2,
                              overflow: TextOverflow.ellipsis,
                            ),
                          ],
                        ),
                      ),
                    ),
                  );
                }).toList(),
              );
            }).toList(),
          ),
        ),
      ],
    );
  }
}

class _CalendarModuleBody extends StatefulWidget {
  const _CalendarModuleBody();

  @override
  State<_CalendarModuleBody> createState() => _CalendarModuleBodyState();
}

class _CalendarModuleBodyState extends State<_CalendarModuleBody> {
  final Map<String, Map<String, bool>> _records = {};
  String _selectedDateKey = _toDateKey(DateTime.now());
  int _tokenBalance = 0;
  Timer? _timer;
  int _timerRemaining = 5 * 60;
  bool _timerRunning = false;
  final _customTaskCtrl = TextEditingController();
  final List<_ScheduleItem> _customTasks = [];
  bool _loaded = false;

  @override
  void initState() {
    super.initState();
    Future.microtask(_load);
  }

  static const _template = <_ScheduleItem>[
    _ScheduleItem(id: 'morning-routine', time: '09:00', task: 'Sabah Rutini', category: 'Özbakım'),
    _ScheduleItem(id: 'emotion-work', time: '10:30', task: 'Duygu Çalışması', category: 'Eğitim'),
    _ScheduleItem(id: 'lunch', time: '12:00', task: 'Öğle Yemeği', category: 'Beslenme'),
    _ScheduleItem(id: 'matching-game', time: '14:00', task: 'Eşleştirme Oyunu', category: 'Oyun'),
    _ScheduleItem(id: 'garden-time', time: '16:00', task: 'Bahçe Saati', category: 'Aktivite'),
  ];

  @override
  void dispose() {
    _timer?.cancel();
    _customTaskCtrl.dispose();
    super.dispose();
  }

  Future<void> _load() async {
    final raw = await LocalStore.instance.readJson('calendar_v1.json');
    if (!mounted) return;
    if (raw is Map) {
      final map = raw.map((k, v) => MapEntry('$k', v));
      final r = map['records'];
      final tb = map['tokenBalance'];
      final sd = map['selectedDateKey'];
      final ct = map['customTasks'];
      final nextRecords = <String, Map<String, bool>>{};
      if (r is Map) {
        for (final e in r.entries) {
          final dayKey = '${e.key}';
          final dayRaw = e.value;
          if (dayRaw is Map) {
            final day = <String, bool>{};
            for (final d in dayRaw.entries) {
              final id = '${d.key}';
              final v = d.value;
              if (v is bool) day[id] = v;
            }
            nextRecords[dayKey] = day;
          }
        }
      }

      final nextCustom = <_ScheduleItem>[];
      if (ct is List) {
        for (final item in ct) {
          if (item is Map) {
            final parsed = _ScheduleItem.fromJson(item.map((k, v) => MapEntry('$k', v)));
            if (parsed != null) nextCustom.add(parsed);
          }
        }
      }

      setState(() {
        _records
          ..clear()
          ..addAll(nextRecords);
        _tokenBalance = tb is int ? tb : 0;
        _selectedDateKey = sd is String && sd.isNotEmpty ? sd : _selectedDateKey;
        _customTasks
          ..clear()
          ..addAll(nextCustom);
        _loaded = true;
      });
      return;
    }
    setState(() => _loaded = true);
  }

  Future<void> _persist() async {
    await LocalStore.instance.writeJson('calendar_v1.json', {
      'records': _records,
      'tokenBalance': _tokenBalance,
      'selectedDateKey': _selectedDateKey,
      'customTasks': _customTasks.map((e) => e.toJson()).toList(growable: false),
    });
  }

  void _toggleDone(String id) {
    setState(() {
      final day = _records[_selectedDateKey] ?? <String, bool>{};
      final next = !(day[id] ?? false);
      day[id] = next;
      _records[_selectedDateKey] = day;
      if (next) {
        _tokenBalance += 1;
      } else {
        _tokenBalance = max(0, _tokenBalance - 1);
      }
    });
    Future.microtask(_persist);
  }

  void _prevDay() {
    setState(() => _selectedDateKey = _addDays(_selectedDateKey, -1));
    Future.microtask(_persist);
  }
  void _nextDay() {
    final today = _toDateKey(DateTime.now());
    final next = _addDays(_selectedDateKey, 1);
    setState(() => _selectedDateKey = next.compareTo(today) > 0 ? today : next);
    Future.microtask(_persist);
  }

  void _startTimer() {
    _timer?.cancel();
    setState(() {
      _timerRunning = true;
    });
    _timer = Timer.periodic(const Duration(seconds: 1), (_) {
      if (!mounted) return;
      setState(() {
        _timerRemaining = max(0, _timerRemaining - 1);
        if (_timerRemaining <= 0) {
          _timerRunning = false;
          _timer?.cancel();
        }
      });
    });
  }

  void _pauseTimer() {
    _timer?.cancel();
    setState(() => _timerRunning = false);
  }

  void _resetTimer() {
    _timer?.cancel();
    setState(() {
      _timerRunning = false;
      _timerRemaining = 5 * 60;
    });
  }

  void _addCustomTask() {
    final text = _customTaskCtrl.text.trim();
    if (text.isEmpty) return;
    setState(() {
      _customTasks.add(_ScheduleItem(id: 'c-${DateTime.now().millisecondsSinceEpoch}', time: '—', task: text, category: 'Özel'));
      _customTaskCtrl.clear();
    });
    Future.microtask(_persist);
  }

  @override
  Widget build(BuildContext context) {
    final dayMap = _records[_selectedDateKey] ?? const <String, bool>{};
    final schedule = [..._template, ..._customTasks].map((i) => i.withDone(dayMap[i.id] ?? false)).toList(growable: false);
    final doneCount = schedule.where((s) => s.done).length;
    final total = schedule.length;
    final percent = total == 0 ? 0 : ((doneCount / total) * 100).round();

    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        if (!_loaded)
          const Padding(
            padding: EdgeInsets.only(bottom: 12),
            child: LinearProgressIndicator(),
          ),
        Row(
          children: [
            IconButton(onPressed: _prevDay, icon: const Icon(Icons.chevron_left)),
            Expanded(
              child: Text(
                _selectedDateKey,
                textAlign: TextAlign.center,
                style: const TextStyle(fontWeight: FontWeight.w900),
              ),
            ),
            IconButton(onPressed: _nextDay, icon: const Icon(Icons.chevron_right)),
          ],
        ),
        const SizedBox(height: 8),
        Card(
          elevation: 0,
          color: Colors.white,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(18),
            side: const BorderSide(color: Color(0xFFE4E4E7)),
          ),
          child: Padding(
            padding: const EdgeInsets.all(14),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Expanded(
                      child: Text('İlerleme: $percent%', style: const TextStyle(fontWeight: FontWeight.w900)),
                    ),
                    Text('Jeton: $_tokenBalance', style: const TextStyle(fontWeight: FontWeight.w900)),
                  ],
                ),
                const SizedBox(height: 10),
                LinearProgressIndicator(value: total == 0 ? 0 : doneCount / total),
              ],
            ),
          ),
        ),
        const SizedBox(height: 16),
        Card(
          elevation: 0,
          color: Colors.white,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(18),
            side: const BorderSide(color: Color(0xFFE4E4E7)),
          ),
          child: Padding(
            padding: const EdgeInsets.all(14),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text('Zamanlayıcı', style: TextStyle(fontWeight: FontWeight.w900)),
                const SizedBox(height: 8),
                Text(_formatMmSs(_timerRemaining), style: const TextStyle(fontSize: 24, fontWeight: FontWeight.w900)),
                const SizedBox(height: 10),
                Row(
                  children: [
                    Expanded(
                      child: ElevatedButton.icon(
                        onPressed: _timerRunning ? null : _startTimer,
                        icon: const Icon(Icons.play_arrow),
                        label: const Text('Başlat'),
                      ),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: OutlinedButton.icon(
                        onPressed: _timerRunning ? _pauseTimer : null,
                        icon: const Icon(Icons.pause),
                        label: const Text('Duraklat'),
                      ),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: OutlinedButton.icon(
                        onPressed: _resetTimer,
                        icon: const Icon(Icons.refresh),
                        label: const Text('Sıfırla'),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
        const SizedBox(height: 16),
        const Text('Günlük Program', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w900)),
        const SizedBox(height: 12),
        ...schedule.map(
          (s) => Padding(
            padding: const EdgeInsets.only(bottom: 10),
            child: CheckboxListTile(
              value: s.done,
              onChanged: (_) => _toggleDone(s.id),
              title: Text('${s.time} • ${s.task}', style: const TextStyle(fontWeight: FontWeight.w900)),
              subtitle: Text(s.category, style: const TextStyle(fontWeight: FontWeight.w700)),
              controlAffinity: ListTileControlAffinity.leading,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
            ),
          ),
        ),
        const SizedBox(height: 8),
        Row(
          children: [
            Expanded(
              child: TextField(
                controller: _customTaskCtrl,
                decoration: const InputDecoration(labelText: 'Özel görev ekle', border: OutlineInputBorder()),
              ),
            ),
            const SizedBox(width: 10),
            ElevatedButton(onPressed: _addCustomTask, child: const Text('Ekle')),
          ],
        ),
      ],
    );
  }
}

class _GamesModuleBody extends StatelessWidget {
  const _GamesModuleBody();

  @override
  Widget build(BuildContext context) {
    final games = <_GameItem>[
      _GameItem(
        title: 'Eşleştirme Oyunu',
        description: 'Aynı meyveleri bulup eşleştir',
        icon: Icons.layers,
        open: () => _pushGame(context, const _MatchingGamePage()),
      ),
      _GameItem(
        title: 'Sayı Saymaca',
        description: 'Eğlenceli sayılarla öğren',
        icon: Icons.tag,
        open: () => _pushGame(context, const _CountingGamePage()),
      ),
      _GameItem(
        title: 'Renkleri Bul',
        description: 'Doğru rengi seç',
        icon: Icons.palette,
        open: () => _pushGame(context, const _ColorsGamePage()),
      ),
      _GameItem(
        title: 'Hafıza Kartları',
        description: 'Kartların yerini hatırla',
        icon: Icons.star,
        open: () => _pushGame(context, const _MemoryGamePage()),
      ),
      _GameItem(
        title: 'Şekilleri Tanı',
        description: 'Doğru şekli seç',
        icon: Icons.category,
        open: () => _pushGame(context, const _ShapesGamePage()),
      ),
    ];

    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        const Text('Oyun seç', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w900)),
        const SizedBox(height: 12),
        ...games.map(
          (g) => Padding(
            padding: const EdgeInsets.only(bottom: 12),
            child: _SectionCard(
              title: g.title,
              subtitle: g.description,
              onTap: g.open,
            ),
          ),
        ),
      ],
    );
  }

  static void _pushGame(BuildContext context, Widget child) {
    Navigator.of(context).push(MaterialPageRoute(builder: (_) => child));
  }
}

class _MatchingGamePage extends StatefulWidget {
  const _MatchingGamePage();

  @override
  State<_MatchingGamePage> createState() => _MatchingGamePageState();
}

class _MatchingGamePageState extends State<_MatchingGamePage> {
  final _rand = Random();
  final _items = const <({String id, String emoji})>[
    (id: 'apple', emoji: '🍎'),
    (id: 'banana', emoji: '🍌'),
    (id: 'grape', emoji: '🍇'),
    (id: 'strawberry', emoji: '🍓'),
    (id: 'orange', emoji: '🍊'),
    (id: 'watermelon', emoji: '🍉'),
  ];

  late List<_MatchCard> _left;
  late List<_MatchCard> _right;
  String? _pickedLeft;
  String? _pickedRight;
  final Set<String> _solved = {};
  String _status = 'Eşleştir';

  @override
  void initState() {
    super.initState();
    _reset();
  }

  void _reset() {
    setState(() {
      _left = _items.map((e) => _MatchCard(id: e.id, label: e.emoji)).toList()..shuffle(_rand);
      _right = _items.map((e) => _MatchCard(id: e.id, label: e.emoji)).toList()..shuffle(_rand);
      _pickedLeft = null;
      _pickedRight = null;
      _solved.clear();
      _status = 'Eşleştir';
    });
  }

  void _pickLeft(_MatchCard c) {
    if (_solved.contains(c.id)) return;
    setState(() {
      _pickedLeft = c.id;
      _tryResolve();
    });
  }

  void _pickRight(_MatchCard c) {
    if (_solved.contains(c.id)) return;
    setState(() {
      _pickedRight = c.id;
      _tryResolve();
    });
  }

  void _tryResolve() {
    if (_pickedLeft == null || _pickedRight == null) return;
    if (_pickedLeft == _pickedRight) {
      _solved.add(_pickedLeft!);
      _status = 'Doğru!';
      _pickedLeft = null;
      _pickedRight = null;
      if (_solved.length == _items.length) {
        _status = 'Tebrikler, hepsi eşleşti!';
      }
      return;
    }
    _status = 'Tekrar dene';
    _pickedLeft = null;
    _pickedRight = null;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Eşleştirme Oyunu')),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Text(_status, textAlign: TextAlign.center, style: const TextStyle(fontWeight: FontWeight.w900)),
            const SizedBox(height: 12),
            Expanded(
              child: Row(
                children: [
                  Expanded(child: _MatchColumn(items: _left, solved: _solved, pickedId: _pickedLeft, onPick: _pickLeft)),
                  const SizedBox(width: 12),
                  Expanded(child: _MatchColumn(items: _right, solved: _solved, pickedId: _pickedRight, onPick: _pickRight)),
                ],
              ),
            ),
            const SizedBox(height: 12),
            OutlinedButton.icon(onPressed: _reset, icon: const Icon(Icons.refresh), label: const Text('Yeniden Başlat')),
          ],
        ),
      ),
    );
  }
}

class _MatchColumn extends StatelessWidget {
  final List<_MatchCard> items;
  final Set<String> solved;
  final String? pickedId;
  final void Function(_MatchCard) onPick;
  const _MatchColumn({required this.items, required this.solved, required this.pickedId, required this.onPick});

  @override
  Widget build(BuildContext context) {
    return ListView.separated(
      itemCount: items.length,
      separatorBuilder: (_, __) => const SizedBox(height: 10),
      itemBuilder: (context, idx) {
        final c = items[idx];
        final isSolved = solved.contains(c.id);
        final selected = pickedId == c.id;
        return SizedBox(
          height: 64,
          child: OutlinedButton(
            onPressed: isSolved ? null : () => onPick(c),
            style: OutlinedButton.styleFrom(
              side: BorderSide(color: selected ? const Color(0xFF111827) : const Color(0xFFE4E4E7), width: 2),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
              backgroundColor: isSolved ? const Color(0xFFE5E7EB) : Colors.white,
            ),
            child: Text(c.label, style: const TextStyle(fontSize: 28, fontWeight: FontWeight.w900)),
          ),
        );
      },
    );
  }
}

class _MemoryGamePage extends StatefulWidget {
  const _MemoryGamePage();

  @override
  State<_MemoryGamePage> createState() => _MemoryGamePageState();
}

class _MemoryGamePageState extends State<_MemoryGamePage> {
  final _rand = Random();
  final _pairs = const <({String type, String emoji})>[
    (type: 'apple', emoji: '🍎'),
    (type: 'banana', emoji: '🍌'),
    (type: 'grape', emoji: '🍇'),
    (type: 'strawberry', emoji: '🍓'),
    (type: 'orange', emoji: '🍊'),
    (type: 'watermelon', emoji: '🍉'),
    (type: 'kiwi', emoji: '🥝'),
    (type: 'pineapple', emoji: '🍍'),
    (type: 'peach', emoji: '🍑'),
    (type: 'cherries', emoji: '🍒'),
  ];

  late List<_MemoryCard> _cards;
  final List<int> _flipped = [];
  final Set<int> _solved = {};
  bool _disabled = false;
  int _moves = 0;
  int _level = 1;
  static const int _maxLevel = 5;
  bool _previewing = false;
  Timer? _previewTimer;

  @override
  void initState() {
    super.initState();
    _startLevel(1);
  }

  @override
  void dispose() {
    _previewTimer?.cancel();
    super.dispose();
  }

  int _pairCountForLevel(int level) {
    final clamped = level.clamp(1, _maxLevel);
    return 2 + (clamped - 1) * 2;
  }

  List<_MemoryCard> _buildCardsForLevel(int level) {
    final pairCount = _pairCountForLevel(level);
    final pool = _pairs.take(pairCount).toList();
    final items = <_MemoryCard>[];
    for (final p in pool) {
      items.add(_MemoryCard(id: items.length, type: p.type, emoji: p.emoji));
      items.add(_MemoryCard(id: items.length, type: p.type, emoji: p.emoji));
    }
    items.shuffle(_rand);
    return items;
  }

  void _startLevel(int level) {
    _previewTimer?.cancel();
    final nextLevel = level.clamp(1, _maxLevel);
    final items = _buildCardsForLevel(nextLevel);
    setState(() {
      _level = nextLevel;
      _cards = items;
      _flipped.clear();
      _solved.clear();
      _disabled = true;
      _moves = 0;
      _previewing = true;
    });
    _previewTimer = Timer(const Duration(seconds: 5), () {
      if (!mounted) return;
      setState(() {
        _previewing = false;
        _disabled = false;
      });
    });
  }

  void _tap(int index) {
    if (_previewing) return;
    if (_disabled) return;
    if (_solved.contains(index)) return;
    if (_flipped.contains(index)) return;
    setState(() {
      if (_flipped.length == 1) {
        final first = _flipped[0];
        final second = index;
        _flipped.add(second);
        _disabled = true;
        _moves += 1;

        final firstType = _cards[first].type;
        final secondType = _cards[second].type;
        final isMatch = firstType == secondType;
        if (isMatch) {
          _solved.add(first);
          _solved.add(second);
          _flipped.clear();
          _disabled = false;
          return;
        }
        Future.delayed(const Duration(milliseconds: 700), () {
          if (!mounted) return;
          setState(() {
            _flipped.clear();
            _disabled = false;
          });
        });
        return;
      }
      _flipped.add(index);
    });
  }

  @override
  Widget build(BuildContext context) {
    final solved = _solved.length;
    final total = _cards.length;
    final done = solved == total;
    final hasNext = done && _level < _maxLevel;
    final hasPrev = _level > 1;
    return Scaffold(
      appBar: AppBar(title: const Text('Hafıza Kartları')),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Row(
              children: [
                Expanded(
                  child: Text(
                    done ? 'Tebrikler! • Seviye $_level/$_maxLevel' : 'Seviye $_level/$_maxLevel • Hamle: $_moves',
                    style: const TextStyle(fontWeight: FontWeight.w900),
                  ),
                ),
                if (hasPrev)
                  OutlinedButton(
                    onPressed: () => _startLevel(_level - 1),
                    child: const Text('Önceki'),
                  ),
                const SizedBox(width: 10),
                OutlinedButton.icon(
                  onPressed: () => _startLevel(_level),
                  icon: const Icon(Icons.refresh),
                  label: const Text('Yeniden'),
                ),
              ],
            ),
            const SizedBox(height: 12),
            Expanded(
              child: GridView.count(
                crossAxisCount: MediaQuery.of(context).size.width >= 720 ? 6 : (_cards.length <= 4 ? 2 : 4),
                mainAxisSpacing: 10,
                crossAxisSpacing: 10,
                children: List.generate(_cards.length, (i) {
                  final revealed = _previewing || _solved.contains(i) || _flipped.contains(i);
                  return InkWell(
                    borderRadius: BorderRadius.circular(16),
                    onTap: () => _tap(i),
                    child: Ink(
                      decoration: BoxDecoration(
                        color: revealed ? Colors.white : const Color(0xFF111827),
                        borderRadius: BorderRadius.circular(16),
                        border: Border.all(color: const Color(0xFFE4E4E7), width: 2),
                      ),
                      child: Center(
                        child: Text(
                          revealed ? _cards[i].emoji : '❓',
                          style: const TextStyle(fontSize: 26, fontWeight: FontWeight.w900),
                        ),
                      ),
                    ),
                  );
                }),
              ),
            ),
            if (hasNext) ...[
              const SizedBox(height: 12),
              ElevatedButton(
                onPressed: () => _startLevel(_level + 1),
                child: const Text('Sonraki Seviye'),
              ),
            ],
          ],
        ),
      ),
    );
  }
}

class _CountingGamePage extends StatefulWidget {
  const _CountingGamePage();

  @override
  State<_CountingGamePage> createState() => _CountingGamePageState();
}

class _CountingGamePageState extends State<_CountingGamePage> {
  final _rand = Random();
  int _target = 3;
  List<int> _options = const [];
  String _status = 'Seç';

  @override
  void initState() {
    super.initState();
    _next();
  }

  void _next() {
    final t = 1 + _rand.nextInt(9);
    final set = <int>{t};
    while (set.length < 4) {
      set.add(1 + _rand.nextInt(9));
    }
    final opts = set.toList()..shuffle(_rand);
    setState(() {
      _target = t;
      _options = opts;
      _status = 'Kaç tane var?';
    });
  }

  void _choose(int v) {
    setState(() {
      if (v == _target) {
        _status = 'Doğru!';
        Future.delayed(const Duration(milliseconds: 500), () {
          if (!mounted) return;
          _next();
        });
        return;
      }
      _status = 'Tekrar dene';
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Sayı Saymaca')),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Text(_status, textAlign: TextAlign.center, style: const TextStyle(fontWeight: FontWeight.w900)),
            const SizedBox(height: 12),
            Expanded(
              child: Center(
                child: Wrap(
                  spacing: 10,
                  runSpacing: 10,
                  children: List.generate(_target, (_) => const Text('🍎', style: TextStyle(fontSize: 38))),
                ),
              ),
            ),
            const SizedBox(height: 12),
            Wrap(
              spacing: 12,
              runSpacing: 12,
              children: _options
                  .map(
                    (o) => SizedBox(
                      width: (MediaQuery.of(context).size.width - 16 * 2 - 12) / 2,
                      height: 56,
                      child: ElevatedButton(
                        onPressed: () => _choose(o),
                        child: Text('$o', style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w900)),
                      ),
                    ),
                  )
                  .toList(),
            ),
            const SizedBox(height: 12),
            OutlinedButton.icon(onPressed: _next, icon: const Icon(Icons.skip_next), label: const Text('Yeni Soru')),
          ],
        ),
      ),
    );
  }
}

class _ColorsGamePage extends StatefulWidget {
  const _ColorsGamePage();

  @override
  State<_ColorsGamePage> createState() => _ColorsGamePageState();
}

class _ColorsGamePageState extends State<_ColorsGamePage> {
  final _rand = Random();
  late _ColorQuestion _q;
  String _status = 'Seç';

  static const _pool = <_ColorQuestion>[
    _ColorQuestion(name: 'Kırmızı', color: Colors.red),
    _ColorQuestion(name: 'Mavi', color: Colors.blue),
    _ColorQuestion(name: 'Yeşil', color: Colors.green),
    _ColorQuestion(name: 'Sarı', color: Colors.yellow),
    _ColorQuestion(name: 'Mor', color: Colors.purple),
    _ColorQuestion(name: 'Turuncu', color: Colors.orange),
  ];

  @override
  void initState() {
    super.initState();
    _next();
  }

  void _next() {
    final target = _pool[_rand.nextInt(_pool.length)];
    final set = <_ColorQuestion>{target};
    while (set.length < 4) {
      set.add(_pool[_rand.nextInt(_pool.length)]);
    }
    final options = set.toList()..shuffle(_rand);
    setState(() {
      _q = target.copyWith(options: options);
      _status = 'Doğru rengi seç';
    });
  }

  void _choose(_ColorQuestion c) {
    setState(() {
      if (c.name == _q.name) {
        _status = 'Doğru!';
        Future.delayed(const Duration(milliseconds: 450), () {
          if (!mounted) return;
          _next();
        });
        return;
      }
      _status = 'Tekrar dene';
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Renkleri Bul')),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            Text('Hedef: ${_q.name}', style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w900)),
            const SizedBox(height: 6),
            Text(_status, style: const TextStyle(fontWeight: FontWeight.w900)),
            const SizedBox(height: 16),
            Expanded(
              child: GridView.count(
                crossAxisCount: 2,
                mainAxisSpacing: 12,
                crossAxisSpacing: 12,
                children: _q.options.map((o) {
                  return InkWell(
                    borderRadius: BorderRadius.circular(18),
                    onTap: () => _choose(o),
                    child: Ink(
                      decoration: BoxDecoration(color: o.color, borderRadius: BorderRadius.circular(18)),
                    ),
                  );
                }).toList(),
              ),
            ),
            OutlinedButton.icon(onPressed: _next, icon: const Icon(Icons.skip_next), label: const Text('Yeni Soru')),
          ],
        ),
      ),
    );
  }
}

class _ShapesGamePage extends StatefulWidget {
  const _ShapesGamePage();

  @override
  State<_ShapesGamePage> createState() => _ShapesGamePageState();
}

class _ShapesGamePageState extends State<_ShapesGamePage> {
  final _rand = Random();
  late _ShapeQuestion _q;
  String _status = 'Seç';

  static const _pool = <_ShapeQuestion>[
    _ShapeQuestion(name: 'Daire', icon: Icons.circle),
    _ShapeQuestion(name: 'Kare', icon: Icons.square),
    _ShapeQuestion(name: 'Üçgen', icon: Icons.change_history),
    _ShapeQuestion(name: 'Yıldız', icon: Icons.star),
    _ShapeQuestion(name: 'Kalp', icon: Icons.favorite),
  ];

  @override
  void initState() {
    super.initState();
    _next();
  }

  void _next() {
    final target = _pool[_rand.nextInt(_pool.length)];
    final set = <_ShapeQuestion>{target};
    while (set.length < 4) {
      set.add(_pool[_rand.nextInt(_pool.length)]);
    }
    final options = set.toList()..shuffle(_rand);
    setState(() {
      _q = target.copyWith(options: options);
      _status = 'Doğru şekli seç';
    });
  }

  void _choose(_ShapeQuestion s) {
    setState(() {
      if (s.name == _q.name) {
        _status = 'Doğru!';
        Future.delayed(const Duration(milliseconds: 450), () {
          if (!mounted) return;
          _next();
        });
        return;
      }
      _status = 'Tekrar dene';
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Şekilleri Tanı')),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            Text('Hedef: ${_q.name}', style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w900)),
            const SizedBox(height: 6),
            Text(_status, style: const TextStyle(fontWeight: FontWeight.w900)),
            const SizedBox(height: 16),
            Expanded(
              child: GridView.count(
                crossAxisCount: 2,
                mainAxisSpacing: 12,
                crossAxisSpacing: 12,
                children: _q.options.map((o) {
                  return InkWell(
                    borderRadius: BorderRadius.circular(18),
                    onTap: () => _choose(o),
                    child: Ink(
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(18),
                        border: Border.all(color: const Color(0xFFE4E4E7), width: 2),
                      ),
                      child: Center(
                        child: Icon(o.icon, size: 72, color: const Color(0xFF111827)),
                      ),
                    ),
                  );
                }).toList(),
              ),
            ),
            OutlinedButton.icon(onPressed: _next, icon: const Icon(Icons.skip_next), label: const Text('Yeni Soru')),
          ],
        ),
      ),
    );
  }
}

class _EducationReminderModuleBody extends StatefulWidget {
  const _EducationReminderModuleBody();

  @override
  State<_EducationReminderModuleBody> createState() => _EducationReminderModuleBodyState();
}

class _EducationReminderModuleBodyState extends State<_EducationReminderModuleBody> {
  static const _storageName = 'education_reminders_v1.json';
  static const _baseNotificationId = 9100;

  final _service = NotificationService.instance;

  final _days = <_EducationReminderDay>[
    _EducationReminderDay(weekday: DateTime.monday, label: 'Pazartesi'),
    _EducationReminderDay(weekday: DateTime.tuesday, label: 'Salı'),
    _EducationReminderDay(weekday: DateTime.wednesday, label: 'Çarşamba'),
    _EducationReminderDay(weekday: DateTime.thursday, label: 'Perşembe'),
    _EducationReminderDay(weekday: DateTime.friday, label: 'Cuma'),
    _EducationReminderDay(weekday: DateTime.saturday, label: 'Cumartesi'),
    _EducationReminderDay(weekday: DateTime.sunday, label: 'Pazar'),
  ];

  bool _loading = true;

  @override
  void initState() {
    super.initState();
    Future.microtask(_load);
  }

  int _idForWeekday(int weekday) => _baseNotificationId + weekday;

  String _formatTime(int hour, int minute) {
    final h = hour < 10 ? '0$hour' : '$hour';
    final m = minute < 10 ? '0$minute' : '$minute';
    return '$h:$m';
  }

  Future<void> _load() async {
    final raw = await LocalStore.instance.readJson(_storageName);
    if (raw is Map) {
      final daysRaw = raw['days'];
      if (daysRaw is List) {
        for (final item in daysRaw) {
          if (item is! Map) continue;
          final weekday = item['weekday'];
          if (weekday is! int) continue;
          final idx = _days.indexWhere((d) => d.weekday == weekday);
          if (idx < 0) continue;
          final enabled = item['enabled'] == true;
          final hour = item['hour'];
          final minute = item['minute'];
          _days[idx] = _days[idx].copyWith(
            enabled: enabled,
            hour: hour is int ? hour : _days[idx].hour,
            minute: minute is int ? minute : _days[idx].minute,
          );
        }
      }
    }

    if (!mounted) return;
    setState(() {
      _loading = false;
    });
  }

  Future<void> _persist() async {
    final data = {
      'days': _days.map((d) => d.toJson()).toList(),
    };
    await LocalStore.instance.writeJson(_storageName, data);
  }

  Future<void> _apply(_EducationReminderDay d) async {
    final id = _idForWeekday(d.weekday);
    if (!d.enabled) {
      await _service.cancel(id);
      return;
    }

    await _service.scheduleWeekly(
      id: id,
      weekday: d.weekday,
      hour: d.hour,
      minute: d.minute,
      title: 'Eğitim Hatırlatıcı',
      body: '${d.label} ${_formatTime(d.hour, d.minute)} zamanı.',
    );
  }

  Future<void> _setEnabled(int index, bool enabled) async {
    if (enabled) {
      final ok = await _service.requestPermissionIfNeeded();
      if (!ok) {
        if (!mounted) return;
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Bildirim izni verilmedi.')),
        );
        return;
      }
    }

    setState(() {
      _days[index] = _days[index].copyWith(enabled: enabled);
    });
    await _apply(_days[index]);
    await _persist();
  }

  Future<void> _pickTime(int index) async {
    final current = _days[index];
    final picked = await showTimePicker(
      context: context,
      initialTime: TimeOfDay(hour: current.hour, minute: current.minute),
    );
    if (picked == null) return;

    final ok = await _service.requestPermissionIfNeeded();
    if (!ok) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Bildirim izni verilmedi.')),
      );
      return;
    }

    setState(() {
      _days[index] = _days[index].copyWith(enabled: true, hour: picked.hour, minute: picked.minute);
    });
    await _apply(_days[index]);
    await _persist();
  }

  Future<void> _disableAll() async {
    setState(() {
      for (var i = 0; i < _days.length; i++) {
        _days[i] = _days[i].copyWith(enabled: false);
      }
    });
    for (final d in _days) {
      await _apply(d);
    }
    await _persist();
  }

  @override
  Widget build(BuildContext context) {
    if (_loading) return const Center(child: CircularProgressIndicator());

    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        const Text(
          '7 Günlük Eğitim Hatırlatıcı',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.w900),
        ),
        const SizedBox(height: 8),
        const Text(
          'İstediğin gün ve saati seç. Zaman gelince bildirim gelir.',
          style: TextStyle(fontWeight: FontWeight.w700, color: Color(0xFF6B7280)),
        ),
        const SizedBox(height: 16),
        ..._days.asMap().entries.map((e) {
          final index = e.key;
          final d = e.value;
          return Card(
            elevation: 0,
            margin: const EdgeInsets.only(bottom: 10),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(18),
              side: const BorderSide(color: Color(0xFFE4E4E7)),
            ),
            child: ListTile(
              title: Text(d.label, style: const TextStyle(fontWeight: FontWeight.w900)),
              subtitle: Text(
                d.enabled ? 'Saat: ${_formatTime(d.hour, d.minute)}' : 'Kapalı',
                style: const TextStyle(fontWeight: FontWeight.w700),
              ),
              leading: Switch(
                value: d.enabled,
                onChanged: (v) => _setEnabled(index, v),
              ),
              trailing: TextButton.icon(
                onPressed: d.enabled ? () => _pickTime(index) : null,
                icon: const Icon(Icons.access_time),
                label: const Text('Saat'),
              ),
              onTap: () => _pickTime(index),
            ),
          );
        }),
        const SizedBox(height: 6),
        OutlinedButton.icon(
          onPressed: _disableAll,
          icon: const Icon(Icons.notifications_off),
          label: const Text('Tümünü Kapat'),
        ),
      ],
    );
  }
}

class _EducationReminderDay {
  final int weekday;
  final String label;
  final bool enabled;
  final int hour;
  final int minute;

  const _EducationReminderDay({
    required this.weekday,
    required this.label,
    this.enabled = false,
    this.hour = 9,
    this.minute = 0,
  });

  _EducationReminderDay copyWith({bool? enabled, int? hour, int? minute}) {
    return _EducationReminderDay(
      weekday: weekday,
      label: label,
      enabled: enabled ?? this.enabled,
      hour: hour ?? this.hour,
      minute: minute ?? this.minute,
    );
  }

  Map<String, Object?> toJson() {
    return {
      'weekday': weekday,
      'label': label,
      'enabled': enabled,
      'hour': hour,
      'minute': minute,
    };
  }
}

class _ComingSoonBody extends StatelessWidget {
  final String title;
  const _ComingSoonBody({required this.title});

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Text(
          '"$title" modülü yakında.\n\nBu ekranda sırayla içerikleri Flutter’a taşıyacağız.',
          textAlign: TextAlign.center,
          style: const TextStyle(fontWeight: FontWeight.w700),
        ),
      ),
    );
  }
}

class _ModuleSection {
  final String title;
  final String description;
  final String content;
  const _ModuleSection({required this.title, required this.description, required this.content});
}

class _EmotionLogEntry {
  final String id;
  final DateTime at;
  final String emotion;
  final int intensity;
  final List<String> triggers;
  final String antecedent;
  final String behavior;
  final String consequence;
  final String note;
  final List<String> helped;

  const _EmotionLogEntry({
    required this.id,
    required this.at,
    required this.emotion,
    required this.intensity,
    required this.triggers,
    required this.antecedent,
    required this.behavior,
    required this.consequence,
    required this.note,
    required this.helped,
  });

  Map<String, Object?> toJson() {
    return {
      'id': id,
      'at': at.toIso8601String(),
      'emotion': emotion,
      'intensity': intensity,
      'triggers': triggers,
      'antecedent': antecedent,
      'behavior': behavior,
      'consequence': consequence,
      'note': note,
      'helped': helped,
    };
  }

  static _EmotionLogEntry? fromJson(Map<String, dynamic> json) {
    final atRaw = json['at'];
    final at = atRaw is String ? DateTime.tryParse(atRaw) : null;
    if (at == null) return null;
    final id = json['id'];
    final emotion = json['emotion'];
    final intensity = json['intensity'];
    if (id is! String || emotion is! String || intensity is! int) return null;
    final triggers = (json['triggers'] is List) ? (json['triggers'] as List).whereType<String>().toList() : <String>[];
    final helped = (json['helped'] is List) ? (json['helped'] as List).whereType<String>().toList() : <String>[];
    return _EmotionLogEntry(
      id: id,
      at: at,
      emotion: emotion,
      intensity: intensity,
      triggers: triggers,
      antecedent: (json['antecedent'] is String) ? json['antecedent'] as String : '',
      behavior: (json['behavior'] is String) ? json['behavior'] as String : '',
      consequence: (json['consequence'] is String) ? json['consequence'] as String : '',
      note: (json['note'] is String) ? json['note'] as String : '',
      helped: helped,
    );
  }

  String toLongText() {
    final b = StringBuffer();
    b.writeln('Tarih: ${_formatDateTimeTr(at)}');
    b.writeln('Duygu: $emotion');
    b.writeln('Şiddet: $intensity/5');
    if (triggers.isNotEmpty) b.writeln('Tetikleyiciler: ${triggers.join(', ')}');
    if (helped.isNotEmpty) b.writeln('Yardımcı olanlar: ${helped.join(', ')}');
    if (antecedent.isNotEmpty) b.writeln('\nÖncesi:\n$antecedent');
    if (behavior.isNotEmpty) b.writeln('\nDavranış:\n$behavior');
    if (consequence.isNotEmpty) b.writeln('\nSonuç:\n$consequence');
    if (note.isNotEmpty) b.writeln('\nNot:\n$note');
    return b.toString().trim();
  }
}

class _Story {
  final String id;
  final String title;
  final String description;
  final List<({String emoji, String text})> steps;
  const _Story({required this.id, required this.title, required this.description, required this.steps});
}

class _MusicTrack {
  final String title;
  final String duration;
  final String category;
  final String description;
  const _MusicTrack({required this.title, required this.duration, required this.category, required this.description});
}

class _AccCategory {
  final String title;
  final List<_AccCard> cards;
  const _AccCategory({required this.title, required this.cards});
}

class _AccCard {
  final String label;
  final String emoji;
  const _AccCard({required this.label, required this.emoji});
}

class _ScheduleItem {
  final String id;
  final String time;
  final String task;
  final String category;
  final bool done;
  const _ScheduleItem({
    required this.id,
    required this.time,
    required this.task,
    required this.category,
    this.done = false,
  });

  _ScheduleItem withDone(bool next) => _ScheduleItem(id: id, time: time, task: task, category: category, done: next);

  Map<String, Object?> toJson() => {'id': id, 'time': time, 'task': task, 'category': category};

  static _ScheduleItem? fromJson(Map<String, dynamic> json) {
    final id = json['id'];
    final time = json['time'];
    final task = json['task'];
    final category = json['category'];
    if (id is! String || task is! String) return null;
    return _ScheduleItem(
      id: id,
      time: time is String ? time : '—',
      task: task,
      category: category is String ? category : 'Özel',
    );
  }
}

class _GameItem {
  final String title;
  final String description;
  final IconData icon;
  final VoidCallback open;
  const _GameItem({required this.title, required this.description, required this.icon, required this.open});
}

class _MatchCard {
  final String id;
  final String label;
  const _MatchCard({required this.id, required this.label});
}

class _MemoryCard {
  final int id;
  final String type;
  final String emoji;
  const _MemoryCard({required this.id, required this.type, required this.emoji});
}

class _ColorQuestion {
  final String name;
  final Color color;
  final List<_ColorQuestion> options;
  const _ColorQuestion({required this.name, required this.color, this.options = const []});

  _ColorQuestion copyWith({List<_ColorQuestion>? options}) => _ColorQuestion(name: name, color: color, options: options ?? this.options);

  @override
  bool operator ==(Object other) => other is _ColorQuestion && other.name == name;

  @override
  int get hashCode => name.hashCode;
}

class _ShapeQuestion {
  final String name;
  final IconData icon;
  final List<_ShapeQuestion> options;
  const _ShapeQuestion({required this.name, required this.icon, this.options = const []});

  _ShapeQuestion copyWith({List<_ShapeQuestion>? options}) => _ShapeQuestion(name: name, icon: icon, options: options ?? this.options);

  @override
  bool operator ==(Object other) => other is _ShapeQuestion && other.name == name;

  @override
  int get hashCode => name.hashCode;
}

String _formatMmSs(int seconds) {
  final m = seconds ~/ 60;
  final s = seconds % 60;
  final mm = m < 10 ? '0$m' : '$m';
  final ss = s < 10 ? '0$s' : '$s';
  return '$mm:$ss';
}

String _toDateKey(DateTime date) {
  final y = date.year.toString().padLeft(4, '0');
  final m = date.month.toString().padLeft(2, '0');
  final d = date.day.toString().padLeft(2, '0');
  return '$y-$m-$d';
}

String _addDays(String key, int delta) {
  final parts = key.split('-');
  if (parts.length != 3) return key;
  final y = int.tryParse(parts[0]) ?? 1970;
  final m = int.tryParse(parts[1]) ?? 1;
  final d = int.tryParse(parts[2]) ?? 1;
  final dt = DateTime(y, m, d).add(Duration(days: delta));
  return _toDateKey(dt);
}

String _formatDateTimeTr(DateTime dt) {
  final y = dt.year.toString().padLeft(4, '0');
  final m = dt.month.toString().padLeft(2, '0');
  final d = dt.day.toString().padLeft(2, '0');
  final hh = dt.hour.toString().padLeft(2, '0');
  final mm = dt.minute.toString().padLeft(2, '0');
  return '$d.$m.$y $hh:$mm';
}

class _SectionCard extends StatelessWidget {
  final String title;
  final String subtitle;
  final VoidCallback onTap;
  const _SectionCard({required this.title, required this.subtitle, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 0,
      color: Colors.white,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(18),
        side: const BorderSide(color: Color(0xFFE4E4E7)),
      ),
      child: InkWell(
        borderRadius: BorderRadius.circular(18),
        onTap: onTap,
        child: Padding(
          padding: const EdgeInsets.all(14),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(title, style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w900)),
              const SizedBox(height: 6),
              Text(
                subtitle,
                maxLines: 4,
                overflow: TextOverflow.ellipsis,
                style: const TextStyle(fontWeight: FontWeight.w700, color: Color(0xFF52525B)),
              ),
              const SizedBox(height: 10),
              const Row(
                children: [
                  Text('Devamını oku', style: TextStyle(fontWeight: FontWeight.w900, color: Color(0xFF2563EB))),
                  SizedBox(width: 6),
                  Icon(Icons.chevron_right, color: Color(0xFF2563EB)),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}

void _openDetail(BuildContext context, String title, String content) {
  showModalBottomSheet<void>(
    context: context,
    isScrollControlled: true,
    showDragHandle: true,
    backgroundColor: Colors.white,
    shape: const RoundedRectangleBorder(
      borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
    ),
    builder: (context) {
      return SafeArea(
        child: Padding(
          padding: const EdgeInsets.fromLTRB(16, 8, 16, 16),
          child: SizedBox(
            height: MediaQuery.of(context).size.height * 0.78,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Expanded(
                      child: Text(
                        title,
                        style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w900),
                        maxLines: 2,
                        overflow: TextOverflow.ellipsis,
                      ),
                    ),
                    IconButton(onPressed: () => Navigator.of(context).pop(), icon: const Icon(Icons.close)),
                  ],
                ),
                const Divider(height: 1),
                const SizedBox(height: 12),
                Expanded(
                  child: SingleChildScrollView(
                    child: SelectableText(
                      content,
                      style: const TextStyle(fontSize: 15, height: 1.5, fontWeight: FontWeight.w600),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      );
    },
  );
}
