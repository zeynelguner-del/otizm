"use client";

import { useState } from "react";
import { ArrowLeft, Shield, Eye, Lock, FileText, Mail, Info, Globe } from "lucide-react";
import Link from "next/link";

export default function PrivacyPage() {
  const [lang, setLang] = useState<"tr" | "en">("tr");

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-6 md:p-12">
      <header className="max-w-4xl mx-auto mb-12 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 shadow-sm hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-all"
          >
            <ArrowLeft size={28} />
          </Link>
          <div>
            <h1 className="text-3xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
              {lang === "tr" ? "Gizlilik ve KVKK Politikası" : "Privacy Policy"}
            </h1>
            <p className="text-zinc-500 font-medium">
              {lang === "tr" 
                ? "Veri Güvenliği, Çerezler ve Kullanıcı Hakları Bilgilendirmesi" 
                : "Data Security, Cookies and User Rights Information"}
            </p>
          </div>
        </div>

        {/* Language Selector */}
        <button
          onClick={() => setLang(lang === "tr" ? "en" : "tr")}
          className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm font-black text-zinc-700 dark:text-zinc-300 shadow-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all self-start sm:self-auto"
        >
          <Globe size={18} className="text-emerald-500" />
          <span>{lang === "tr" ? "English" : "Türkçe"}</span>
        </button>
      </header>

      <main className="max-w-4xl mx-auto space-y-8">
        {/* Giriş Özeti */}
        <section className="bg-white dark:bg-zinc-900 p-8 sm:p-10 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/5 via-transparent to-transparent" />
          
          <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start">
            <div className="p-4 bg-emerald-100 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 rounded-2xl shrink-0">
              <Shield className="w-8 h-8" />
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
                {lang === "tr" ? "Kişisel Verileriniz Güvende" : "Your Personal Data is Secure"}
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 font-bold text-sm sm:text-base leading-relaxed">
                {lang === "tr" ? (
                  "OtiZeka Ekibi olarak, otizmli çocuklara sahip aileler ve bakım verenler için tasarladığımız bu platformda gizliliğinize en üst düzeyde önem veriyoruz. Kişisel verilerinizin 6698 sayılı Kişisel Verilerin Korunması Kanunu'na (KVKK) ve uluslararası veri koruma standartlarına uygun olarak işlenmesini, saklanmasını ve güvenliğini sağlıyoruz."
                ) : (
                  "As the OtiZeka Team, we attach the utmost importance to your privacy on this platform designed for families and caregivers of children with autism. We ensure the processing, storage, and security of your personal data in accordance with the Law on the Protection of Personal Data (KVKK) and international data protection standards."
                )}
              </p>
            </div>
          </div>
        </section>

        {/* Politikalar Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Hangi Verileri İşliyoruz? */}
          <section className="bg-white dark:bg-zinc-900 p-8 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 shadow-lg">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-rose-100 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-zinc-800 dark:text-zinc-100 mb-3 tracking-tight">
              {lang === "tr" ? "İşlenen Kişisel Veriler" : "Personal Data Collected"}
            </h3>
            <ul className="text-zinc-600 dark:text-zinc-400 font-bold text-xs sm:text-sm space-y-2.5 leading-relaxed list-disc list-inside">
              {lang === "tr" ? (
                <>
                  <li>E-posta adresi (hesap açma, doğrulama ve iletişim için)</li>
                  <li>Velinin adı, soyadı ve telefon numarası (profil ayarları için)</li>
                  <li>Öğrencinin (çocuğunuzun) adı, doğum tarihi ve yaşı</li>
                  <li>Öğrenciye ait profil fotoğrafı (isteğe bağlı, yerel olarak saklanabilir)</li>
                  <li>Günlük gelişim notları, aktivite kayıtları, takvim planları ve duygu durum günlüğü verileri</li>
                </>
              ) : (
                <>
                  <li>Email address (for account creation, verification, and communication)</li>
                  <li>Parent's name, surname, and phone number (for profile settings)</li>
                  <li>Student's (child's) name, date of birth, and age</li>
                  <li>Student profile photo (optional, can be stored locally)</li>
                  <li>Daily progress notes, activity logs, calendar schedules, and emotional state journal data</li>
                </>
              )}
            </ul>
          </section>

          {/* Veri İşleme Amaçları */}
          <section className="bg-white dark:bg-zinc-900 p-8 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 shadow-lg">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-blue-100 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400">
              <Info className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-zinc-800 dark:text-zinc-100 mb-3 tracking-tight">
              {lang === "tr" ? "Veri İşleme Amaçları" : "Purposes of Data Processing"}
            </h3>
            <ul className="text-zinc-600 dark:text-zinc-400 font-bold text-xs sm:text-sm space-y-2.5 leading-relaxed list-disc list-inside">
              {lang === "tr" ? (
                <>
                  <li>Kullanıcı hesabı oluşturulması ve güvenli girişin sağlanması</li>
                  <li>Çocuğunuzun günlük rutinlerinin, aktivitelerinin ve gelişim süreçlerinin takip edilmesi</li>
                  <li>Hatırlatıcı bildirimlerin ayarlanması ve çalıştırılması</li>
                  <li>Uygulama içi iletişim kartları (AAC) ve eğitici oyunların kişiselleştirilmesi</li>
                  <li>Platformun güvenliğinin sağlanması ve yasal yükümlülüklerin yerine getirilmesi</li>
                </>
              ) : (
                <>
                  <li>Creating user accounts and securing access</li>
                  <li>Tracking your child's daily routines, activities, and developmental progress</li>
                  <li>Setting up and triggering reminder notifications</li>
                  <li>Personalizing in-app communication cards (AAC) and educational games</li>
                  <li>Ensuring platform security and fulfilling legal obligations</li>
                </>
              )}
            </ul>
          </section>

          {/* Üçüncü Taraf SDK'lar ve Reklamlar */}
          <section className="bg-white dark:bg-zinc-900 p-8 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 shadow-lg md:col-span-2">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-amber-100 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-zinc-800 dark:text-zinc-100 mb-3 tracking-tight">
              {lang === "tr" ? "Üçüncü Taraf Hizmetler ve Gizlilik Politikaları" : "Third-Party Services and Privacy Policies"}
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 font-bold text-xs sm:text-sm leading-relaxed mb-4">
              {lang === "tr" ? (
                "OtiZeka mobil uygulaması ve web sitesi, uygulama içi reklamlar ve sistem hizmetleri sağlamak amacıyla güvenilir üçüncü taraf hizmet sağlayıcılarının SDK'larını (yazılım geliştirme kitleri) kullanmaktadır. Bu hizmetler kendi gizlilik politikalarına tabi olarak veri toplayabilir:"
              ) : (
                "The OtiZeka mobile app and website utilize SDKs (software development kits) from trusted third-party service providers to deliver in-app advertisements and system services. These services may collect data subject to their own privacy policies:"
              )}
            </p>
            <ul className="text-zinc-600 dark:text-zinc-400 font-bold text-xs sm:text-sm space-y-3.5 leading-relaxed list-disc list-inside mb-4">
              <li>
                <span className="font-extrabold text-zinc-800 dark:text-zinc-200">Google Play Services (Google Play Hizmetleri):</span>{" "}
                {lang === "tr" ? "Uygulamanın temel Android entegrasyonu ve kararlılık takibi için kullanılır." : "Used for core Android integration and stability tracking."}{" "}
                <a 
                  href="https://policies.google.com/privacy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline inline-flex items-center gap-1 ml-1"
                >
                  Gizlilik Politikası / Privacy Policy
                </a>
              </li>
              <li>
                <span className="font-extrabold text-zinc-800 dark:text-zinc-200">Google AdMob:</span>{" "}
                {lang === "tr" ? "Uygulama içinde reklam sunmak ve reklam kimliği doğrulamak için kullanılır." : "Used for presenting in-app advertisements and validating advertising ID."}{" "}
                <a 
                  href="https://policies.google.com/privacy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline inline-flex items-center gap-1 ml-1"
                >
                  Gizlilik Politikası / Privacy Policy
                </a>
              </li>
            </ul>
            <p className="text-zinc-600 dark:text-zinc-400 font-bold text-xs sm:text-sm leading-relaxed">
              {lang === "tr" ? (
                "Google AdSense reklam ağı web sitemizde reklam yayınlamak için çerezleri ve ilgi alanına dayalı DoubleClick DART çerezlerini kullanabilir. Kullanıcılar Google Reklam ayarlarını ziyaret ederek bu izinleri diledikleri zaman yönetebilirler."
              ) : (
                "Google AdSense may use cookies and interest-based DoubleClick DART cookies to serve ads on our website. Users can manage these permissions at any time by visiting Google Ad settings."
              )}
            </p>
          </section>

          {/* Veri Saklama ve Güvenlik */}
          <section className="bg-white dark:bg-zinc-900 p-8 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 shadow-lg">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-purple-100 dark:bg-purple-950/20 text-purple-600 dark:text-purple-400">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-zinc-800 dark:text-zinc-100 mb-3 tracking-tight">
              {lang === "tr" ? "Güvenlik ve Saklama Süresi" : "Security and Retention"}
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 font-bold text-xs sm:text-sm leading-relaxed mb-3">
              {lang === "tr" ? (
                "Şifreleriniz sunucularımızda tek yönlü kriptografik algoritmalar ile özetlenerek (hash) saklanır ve kimseyle paylaşılmaz. Veri tabanımızla olan tüm iletişim SSL/TLS şifreli bağlantı kanalları üzerinden gerçekleştirilir."
              ) : (
                "Your passwords are stored on our servers hashed with one-way cryptographic algorithms and are never shared. All communications with our database are transmitted over secure SSL/TLS encrypted channels."
              )}
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 font-bold text-xs sm:text-sm leading-relaxed">
              {lang === "tr" ? (
                "Hesabınızı dilediğiniz an 'Hesabı Sil' seçeneği ile kapatabilirsiniz. Bu işlem gerçekleştirildiğinde, çocuğunuza ait profiller, fotoğraflar, günlük kayıtlar ve kişisel bilgileriniz veritabanımızdan kalıcı olarak silinir."
              ) : (
                "You can close your account at any time via the 'Delete Account' option. Once this action is performed, your child's profiles, photos, logs, and all personal data are permanently deleted from our database."
              )}
            </p>
          </section>

          {/* İletişim Kartı */}
          <section className="bg-white dark:bg-zinc-900 p-8 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 shadow-lg">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-emerald-100 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-zinc-800 dark:text-zinc-100 mb-3 tracking-tight">
              {lang === "tr" ? "İletişim ve Destek" : "Contact & Support"}
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 font-bold text-xs sm:text-sm leading-relaxed mb-3">
              {lang === "tr" ? (
                "Gizlilik politikamız veya kişisel verilerinizin korunması ile ilgili her türlü sorunuz, görüşünüz veya verilerin silinmesi talepleriniz için bizimle e-posta yoluyla iletişime geçebilirsiniz:"
              ) : (
                "For any questions, opinions, or requests regarding the deletion of your personal data or our privacy policy, you can contact us via email at:"
              )}
            </p>
            <p className="font-extrabold text-sm text-emerald-600 dark:text-emerald-400">
              otizeka@gmail.com
            </p>
          </section>
        </div>

        {/* Alt Bilgi */}
        <footer className="bg-zinc-900 dark:bg-zinc-800 p-8 sm:p-10 rounded-[2.5rem] text-white text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-2">
            <h4 className="text-2xl font-black tracking-tight">
              {lang === "tr" ? "Sorularınız mı var?" : "Have Questions?"}
            </h4>
            <p className="text-zinc-400 font-bold text-sm sm:text-base flex items-center justify-center md:justify-start gap-2">
              <Mail className="w-5 h-5 text-emerald-400" /> otizeka@gmail.com
            </p>
          </div>
          <a
            href="mailto:otizeka@gmail.com"
            className="px-8 py-4 bg-white text-zinc-900 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl hover:bg-zinc-100 active:scale-95 transition-all whitespace-nowrap"
          >
            {lang === "tr" ? "Bize Ulaşın" : "Contact Us"}
          </a>
        </footer>
      </main>
    </div>
  );
}
