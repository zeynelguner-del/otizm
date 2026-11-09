"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Sparkles,
  Building2,
  Landmark,
  HeartHandshake,
  GraduationCap,
  CheckCircle2,
  Send,
  Loader2,
  AlertCircle,
  ShieldCheck,
  Smartphone,
  Globe,
  Award,
  FileText,
  Mail,
  Users,
} from "lucide-react";

export default function CorporatePartnershipPage() {
  const [orgName, setOrgName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [partnershipType, setPartnershipType] = useState("Belediye ve Kamu İş Birliği");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!orgName.trim() || !contactPerson.trim() || !email.trim() || !message.trim()) {
      setError("Lütfen kurum adı, yetkili adı, e-posta ve mesaj alanlarını doldurunuz.");
      return;
    }

    setLoading(true);
    try {
      const fullSubject = `[Kurumsal İş Birliği - ${partnershipType}] ${orgName.trim()}`;
      const fullMessage = `Kurum / Kuruluş: ${orgName.trim()}\nYetkili Kişi: ${contactPerson.trim()}\nTelefon: ${phone.trim() || "Belirtilmedi"}\nİş Birliği Modeli: ${partnershipType}\n\nMesaj / Teklif Detayı:\n${message.trim()}`;

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${contactPerson.trim()} (${orgName.trim()})`,
          email: email.trim(),
          subject: fullSubject,
          message: fullMessage,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Başvuru gönderilirken bir sorun oluştu.");
        return;
      }

      setSuccess(
        "Kurumsal iş birliği ve sponsorluk talebiniz başarıyla kaydedildi! Proje koordinatörümüz en kısa sürede kurumunuzla iletişime geçecektir."
      );
      setOrgName("");
      setContactPerson("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch {
      setError(
        "Sunucuya bağlanılamadı. Lütfen internet bağlantınızı kontrol edin veya doğrudan otizeka@gmail.com adresine yazın."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col">
      {/* Top Navbar */}
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition"
              title="Ana Sayfaya Dön"
            >
              <ArrowLeft size={20} />
            </Link>
            <Link
              href="/"
              className="flex items-center gap-2 font-black text-lg tracking-tight text-emerald-600 dark:text-emerald-400"
            >
              <Sparkles className="w-5 h-5" />
              <span>OtiZeka</span>
            </Link>
          </div>

          <nav className="flex items-center gap-4 text-sm font-bold">
            <Link
              href="/rehber"
              className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition"
            >
              Rehber
            </Link>
            <Link
              href="/is-birligi"
              className="text-emerald-600 dark:text-emerald-400 border-b-2 border-emerald-500 pb-0.5"
            >
              Kurumsal İş Birliği
            </Link>
            <Link
              href="/hakkimizda"
              className="hidden sm:inline text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition"
            >
              Hakkımızda
            </Link>
            <Link
              href="/iletisim"
              className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition"
            >
              İletişim
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-emerald-500/10 via-teal-500/5 to-transparent py-14 sm:py-20 px-4 border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-black tracking-wide uppercase">
            <HeartHandshake className="w-4 h-4" />
            <span>Kurumsal İş Birliği, Hibe & Sosyal Sorumluluk</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 leading-[1.15]">
            Otizmli Çocukların Eğitim Yolculuğuna{" "}
            <span className="text-emerald-600 dark:text-emerald-400">Kurumunuzla Güç Katın</span>
          </h1>

          <p className="text-base sm:text-xl text-zinc-600 dark:text-zinc-400 font-medium max-w-3xl mx-auto leading-relaxed">
            OtiZeka; Web, iOS (App Store) ve Android (Google Play) platformlarında aktif olarak hizmet veren, kanıta dayalı yerli özel eğitim ve çocuk gelişim ekosistemidir. Belediyeler, özel eğitim kurumları, sivil toplum kuruluşları ve sosyal sorumluluk vizyonuna sahip markalarla sürdürülebilir ortaklıklar kuruyoruz.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href="#basvuru-formu"
              className="px-7 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-emerald-600/20 transition-all"
            >
              Kurumsal Başvuru & Teklif Alın
            </a>
            <Link
              href="/hakkimizda"
              className="px-7 py-4 rounded-2xl bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800 font-black text-sm uppercase tracking-wider transition-all"
            >
              Platformu Tanıyın
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 flex-1 w-full space-y-16">
        {/* Why OtiZeka Metrics / Trust Strip */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-2">
            <div className="w-11 h-11 rounded-2xl bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Smartphone className="w-5 h-5" />
            </div>
            <h3 className="font-black text-lg text-zinc-900 dark:text-zinc-100">3 Platformda Canlı</h3>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
              Fikir aşamasında değil; Apple App Store, Google Play Store ve Web üzerinde çalışan hazır dijital altyapı.
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-2">
            <div className="w-11 h-11 rounded-2xl bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-black text-lg text-zinc-900 dark:text-zinc-100">Kanıta Dayalı Modüller</h3>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
              ABA, PECS, TEACCH ve Duyu Bütünleme prensiplerine uygun AAC iletişim kartları, görsel takvim ve eğitici oyunlar.
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-2">
            <div className="w-11 h-11 rounded-2xl bg-purple-100 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="font-black text-lg text-zinc-900 dark:text-zinc-100">22 Kapsamlı Rehber</h3>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
              Erken tanıdan ÇÖZGER/RAM süreçlerine, tuvalet eğitiminden kriz yönetimine kadar zengin aile kütüphanesi.
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-2">
            <div className="w-11 h-11 rounded-2xl bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-black text-lg text-zinc-900 dark:text-zinc-100">Çocuk Güvenliği & KVKK</h3>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
              KVKK, COPPA ve uluslararası çocuk veri güvenliği standartlarına tam uyumlu, reklamsız ve güvenli çocuk modu.
            </p>
          </div>
        </section>

        {/* 4 Partnership Models */}
        <section className="space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">
              Kurumsal İş Birliği ve Destek Modellerimiz
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 font-medium">
              Kurumunuzun vizyonuna ve hedef kitlesine özel olarak yapılandırılmış 4 farklı ortaklık modeli sunuyoruz:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Model 1: Municipalities */}
            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <Landmark className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                      Kamu & Yerel Yönetimler
                    </span>
                    <h3 className="text-xl font-black text-zinc-900 dark:text-zinc-100">
                      1. Belediyeler İçin &ldquo;Engelsiz Eğitim&rdquo; Modeli
                    </h3>
                  </div>
                </div>

                <p className="text-sm text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                  Büyükşehir ve ilçe belediyelerinin Sosyal Destek / Engelli Hizmetleri Müdürlükleri ile yapılan iş birliği kapsamında, ilçedeki tüm özel gereksinimli çocuk ailelerine dijital eğitim desteği sunulur.
                </p>

                <ul className="space-y-2.5 text-xs sm:text-sm font-bold text-zinc-700 dark:text-zinc-300">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Uygulama ve web portalında &ldquo;Belediyeniz Katkılarıyla&rdquo; kurumsal marka görünürlüğü</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Belediye Engelsiz Yaşam Merkezleri için hazır dijital eğitim materyali</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Sıfırdan yazılım maliyetine girmeden anında binlerce aileye ulaşan sosyal belediyecilik hizmeti</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Model 2: Rehabilitation Centers */}
            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">
                      Eğitim Kurumları
                    </span>
                    <h3 className="text-xl font-black text-zinc-900 dark:text-zinc-100">
                      2. Özel Eğitim ve Rehabilitasyon Merkezleri
                    </h3>
                  </div>
                </div>

                <p className="text-sm text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                  Haftalık yüz yüze seansların evde aile tarafından desteklenmesini sağlayan kurumsal dijital asistan modeli. Kurumunuzun veli memnuniyetini ve teknolojik prestijini artırır.
                </p>

                <ul className="space-y-2.5 text-xs sm:text-sm font-bold text-zinc-700 dark:text-zinc-300">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                    <span>Ev içi eğitim tekrarları için görsel rutin, sesli kartlar ve bilişsel oyun desteği</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                    <span>Duygu durum ve günlük gelişim takibi ile eğitmen-veli senkronizasyonu</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                    <span>Kuruma özel tanımlanan veli erişim paketleri ve ortak tanıtım desteği</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Model 3: Corporate CSR / Sponsorship */}
            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-black uppercase tracking-widest text-purple-600 dark:text-purple-400">
                      Şirketler & Markalar
                    </span>
                    <h3 className="text-xl font-black text-zinc-900 dark:text-zinc-100">
                      3. Kurumsal Sosyal Sorumluluk (KSS) & Ana Sponsorluk
                    </h3>
                  </div>
                </div>

                <p className="text-sm text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                  Eğitimde fırsat eşitliği ve engelsiz teknoloji vizyonuna sahip şirketler için yüksek itibarlı, ölçülebilir sosyal sorumluluk sponsorluğu.
                </p>

                <ul className="space-y-2.5 text-xs sm:text-sm font-bold text-zinc-700 dark:text-zinc-300">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                    <span>Platformun &ldquo;Ana Eğitim / Teknoloji Sponsoru&rdquo; olarak tüm mecralarda konumlanma</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                    <span>Yeni eğitim modüllerinin (ör. yeni oyun veya iletişim seti) marka adıyla yayınlanması</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                    <span>Yıllık sürdürülebilirlik ve KSS raporlarınız için doğrulanabilir sosyal etki verileri</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Model 4: NGOs, Associations & Grants */}
            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-black uppercase tracking-widest text-amber-600 dark:text-amber-400">
                      STK, Vakıf & Dernekler
                    </span>
                    <h3 className="text-xl font-black text-zinc-900 dark:text-zinc-100">
                      4. Dernekler ve Ulusal/AB Hibe Projeleri Ortaklığı
                    </h3>
                  </div>
                </div>

                <p className="text-sm text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                  Otizm dernekleri, federasyonlar ve vakıfların yürüttüğü AB, Kalkınma Ajansı, TÜBİTAK ve Bakanlık hibe projelerinde resmi dijital teknoloji partnerliği.
                </p>

                <ul className="space-y-2.5 text-xs sm:text-sm font-bold text-zinc-700 dark:text-zinc-300">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span>Hibe projelerinin &ldquo;Dijital Dönüşüm ve Yazılım Altyapısı&rdquo; ayağının anahtar teslim üstlenilmesi</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span>Dernek üyesi ailelere özel içerik, seminer duyurusu ve rehber entegrasyonu</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span>Akademik araştırmalar ve saha çalışmaları için veri ve uygulama desteği</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Application Form Section */}
        <section id="basvuru-formu" className="scroll-mt-24">
          <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 p-6 sm:p-10 lg:p-12 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Left Info Column */}
              <div className="lg:col-span-5 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 text-xs font-black uppercase tracking-wider">
                  <Globe className="w-3.5 h-3.5" />
                  <span>Resmi İletişim Kanalı</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
                  Kurumsal İş Birliği ve Sponsorluk Başvurusu
                </h2>

                <p className="text-sm text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                  Kurumunuz, belediyeniz, rehabilitasyon merkeziniz veya derneğiniz adına iş birliği modellerimizi görüşmek, detaylı sunum dosyamızı talep etmek veya ortak proje geliştirmek için formu doldurabilirsiniz.
                </p>

                <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-emerald-600 shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-zinc-400 uppercase">Doğrudan Kurumsal E-Posta</div>
                      <a
                        href="mailto:otizeka@gmail.com"
                        className="text-sm font-black text-zinc-900 dark:text-zinc-100 hover:text-emerald-600"
                      >
                        otizeka@gmail.com
                      </a>
                    </div>
                  </div>
                  <p className="text-xs text-zinc-500 font-medium leading-relaxed">
                    Resmi yazı, şartname veya proje dosyalarınızı doğrudan e-posta adresimize de iletebilirsiniz. Tüm kurumsal başvurulara 24 saat içinde dönüş sağlanmaktadır.
                  </p>
                </div>
              </div>

              {/* Right Form Column */}
              <div className="lg:col-span-7">
                <form onSubmit={handleSubmit} className="space-y-5">
                  {error && (
                    <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 text-rose-700 dark:text-rose-300 text-sm font-bold flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  {success && (
                    <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-200 text-sm font-bold flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-emerald-600" />
                      <span>{success}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                        Kurum / Belediye / Dernek / Şirket Adı *
                      </label>
                      <input
                        type="text"
                        required
                        value={orgName}
                        onChange={(e) => setOrgName(e.target.value)}
                        placeholder="Örn: X Belediyesi / Y Özel Eğitim"
                        className="w-full p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 font-semibold text-sm focus:border-emerald-500 outline-none transition"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                        İlgili Yetkili Adı Soyadı & Ünvanı *
                      </label>
                      <input
                        type="text"
                        required
                        value={contactPerson}
                        onChange={(e) => setContactPerson(e.target.value)}
                        placeholder="Adınız Soyadınız / Göreviniz"
                        className="w-full p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 font-semibold text-sm focus:border-emerald-500 outline-none transition"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                        Kurumsal E-Posta Adresi *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="ornek@kurum.gov.tr / .com"
                        className="w-full p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 font-semibold text-sm focus:border-emerald-500 outline-none transition"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                        İletişim Telefonu
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="05xx / 02xx xxx xx xx"
                        className="w-full p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 font-semibold text-sm focus:border-emerald-500 outline-none transition"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                      İlgilendiğiniz İş Birliği Modeli *
                    </label>
                    <select
                      value={partnershipType}
                      onChange={(e) => setPartnershipType(e.target.value)}
                      className="w-full p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 font-bold text-sm focus:border-emerald-500 outline-none transition"
                    >
                      <option value="Belediye ve Kamu İş Birliği">
                        1. Belediye & Kamu Kurumu İş Birliği (Sosyal Belediyecilik)
                      </option>
                      <option value="Özel Eğitim ve Rehabilitasyon Merkezi">
                        2. Özel Eğitim ve Rehabilitasyon Merkezi Çözüm Ortaklığı
                      </option>
                      <option value="Kurumsal Sponsorluk ve KSS">
                        3. Kurumsal Sosyal Sorumluluk (KSS) & Ana Sponsorluk
                      </option>
                      <option value="Dernek, Vakıf ve Hibe Projesi">
                        4. Otizm Derneği / Vakıf / Ortak Hibe Projesi (AB, Kalkınma Ajansı vb.)
                      </option>
                      <option value="Diğer Kurumsal Talep">
                        Diğer Kurumsal İş Birliği Talebi
                      </option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                      İş Birliği veya Proje Detayınız *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Kurumunuzun hedeflediği çalışma, ulaşmak istediğiniz aile/öğrenci sayısı veya talep ettiğiniz sunum/teklif detaylarını kısaca belirtiniz..."
                      className="w-full p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 font-semibold text-sm focus:border-emerald-500 outline-none transition resize-y"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 px-6 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white rounded-xl font-black text-sm uppercase tracking-wider shadow-lg shadow-emerald-600/20 transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Gönderiliyor...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Kurumsal İş Birliği Talebini Gönder</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 py-10 px-4 text-center text-xs text-zinc-500 font-medium">
        <div className="max-w-5xl mx-auto space-y-4">
          <div className="flex flex-wrap justify-center gap-6 font-bold text-zinc-700 dark:text-zinc-300">
            <Link href="/" className="hover:text-emerald-600 transition">
              Ana Sayfa
            </Link>
            <Link href="/rehber" className="hover:text-emerald-600 transition">
              Rehber
            </Link>
            <Link href="/is-birligi" className="text-emerald-600 dark:text-emerald-400">
              Kurumsal İş Birliği
            </Link>
            <Link href="/hakkimizda" className="hover:text-emerald-600 transition">
              Hakkımızda
            </Link>
            <Link href="/iletisim" className="hover:text-emerald-600 transition">
              İletişim
            </Link>
            <Link href="/gizlilik" className="hover:text-emerald-600 transition">
              Gizlilik Politikası
            </Link>
          </div>
          <p>© 2026 OtiZeka Destek Platformu. Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </div>
  );
}
