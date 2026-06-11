"use client";

import { ArrowLeft, Shield, Eye, Lock, FileText, Mail, Info } from "lucide-react";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-6 md:p-12">
      <header className="max-w-4xl mx-auto mb-12 flex items-center gap-6">
        <Link
          href="/"
          className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 shadow-sm hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-all"
        >
          <ArrowLeft size={28} />
        </Link>
        <div>
          <h1 className="text-3xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">Gizlilik ve KVKK Politikası</h1>
          <p className="text-zinc-500 font-medium">Veri Güvenliği, Çerezler ve Kullanıcı Hakları Bilgilendirmesi</p>
        </div>
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
              <h2 className="text-2xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">Kişisel Verileriniz Bizimle Güvende</h2>
              <p className="text-zinc-600 dark:text-zinc-400 font-bold text-sm sm:text-base leading-relaxed">
                OtiZeka Ekibi olarak, otizmli çocuklara sahip aileler ve bakım verenler için tasarladığımız bu platformda gizliliğinize en üst düzeyde önem veriyoruz. Kişisel verilerinizin 6698 sayılı Kişisel Verilerin Korunması Kanunu'na (KVKK) uygun olarak işlenmesini, saklanmasını ve güvenliğini sağlıyoruz.
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
            <h3 className="text-xl font-black text-zinc-800 dark:text-zinc-100 mb-3 tracking-tight">İşlenen Kişisel Veriler</h3>
            <ul className="text-zinc-600 dark:text-zinc-400 font-bold text-xs sm:text-sm space-y-2.5 leading-relaxed list-disc list-inside">
              <li>E-posta adresi (hesap açma ve doğrulama için)</li>
              <li>Velinin adı, soyadı ve telefon numarası (profil ayarları için)</li>
              <li>Öğrencinin (çocuğunuzun) adı, doğum tarihi ve yaşı</li>
              <li>Öğrenciye ait profil fotoğrafı (isteğe bağlı, yerel olarak saklanabilir)</li>
              <li>Günlük gelişim notları, aktivite kayıtları, takvim planları ve duygu durum günlüğü verileri</li>
            </ul>
          </section>

          {/* Veri İşleme Amaçları */}
          <section className="bg-white dark:bg-zinc-900 p-8 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 shadow-lg">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-blue-100 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400">
              <Info className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-zinc-800 dark:text-zinc-100 mb-3 tracking-tight">Veri İşleme Amaçları</h3>
            <ul className="text-zinc-600 dark:text-zinc-400 font-bold text-xs sm:text-sm space-y-2.5 leading-relaxed list-disc list-inside">
              <li>Kullanıcı hesabı oluşturulması ve güvenli girişin sağlanması</li>
              <li>Çocuğunuzun günlük rutinlerinin, aktivitelerinin ve gelişim süreçlerinin takip edilmesi</li>
              <li>Hatırlatıcı bildirimlerin ayarlanması ve çalıştırılması</li>
              <li>Uygulama içi iletişim kartları (AAC) ve eğitici oyunların kişiselleştirilmesi</li>
              <li>Platformun güvenliğinin sağlanması ve yasal yükümlülüklerin yerine getirilmesi</li>
            </ul>
          </section>

          {/* Çerez Politikası ve Reklamlar */}
          <section className="bg-white dark:bg-zinc-900 p-8 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 shadow-lg">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-amber-100 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-zinc-800 dark:text-zinc-100 mb-3 tracking-tight">Çerezler ve Üçüncü Taraf Reklamlar</h3>
            <p className="text-zinc-600 dark:text-zinc-400 font-bold text-xs sm:text-sm leading-relaxed mb-3">
              Web sitemizde oturum yönetimi ve kullanıcı deneyimini iyileştirmek için zorunlu birinci taraf çerezler kullanılmaktadır.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 font-bold text-xs sm:text-sm leading-relaxed">
              Google AdSense reklam ağı sitemizde reklam yayınlamak için çerezleri kullanabilir. Google, ilgi alanlarınıza göre reklam sunmak amacıyla DoubleClick DART çerezini kullanır. Kullanıcılar, Google Reklam ve İçerik Ağı gizlilik politikasını ziyaret ederek DART çerezinin kullanımını engelleyebilirler.
            </p>
          </section>

          {/* Veri Saklama ve Güvenlik */}
          <section className="bg-white dark:bg-zinc-900 p-8 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 shadow-lg">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-purple-100 dark:bg-purple-950/20 text-purple-600 dark:text-purple-400">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-zinc-800 dark:text-zinc-100 mb-3 tracking-tight">Güvenlik ve Saklama Süresi</h3>
            <p className="text-zinc-600 dark:text-zinc-400 font-bold text-xs sm:text-sm leading-relaxed mb-3">
              Şifreleriniz sunucularımızda tek yönlü kriptografik algoritmalar ile özetlenerek (hash) saklanır ve kimseyle paylaşılmaz. Veri tabanımızla olan tüm iletişim SSL/TLS şifreli bağlantı kanalları üzerinden gerçekleştirilir.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 font-bold text-xs sm:text-sm leading-relaxed">
              Hesabınızı dilediğiniz an "Hesabı Sil" seçeneği ile kapatabilirsiniz. Bu işlem gerçekleştirildiğinde, çocuğunuza ait profiller, fotoğraflar, günlük kayıtlar ve kişisel bilgileriniz veritabanımızdan kalıcı olarak silinir.
            </p>
          </section>
        </div>

        {/* İletişim Kartı */}
        <section className="bg-zinc-900 dark:bg-zinc-800 p-8 sm:p-10 rounded-[2.5rem] text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="text-center md:text-left space-y-2">
            <h4 className="text-2xl font-black tracking-tight">Sorularınız mı var?</h4>
            <p className="text-zinc-400 font-bold text-sm sm:text-base flex items-center justify-center md:justify-start gap-2">
              <Mail className="w-5 h-5 text-emerald-400" /> otizeka@gmail.com
            </p>
            <p className="text-zinc-500 text-xs font-bold leading-normal">
              Gizlilik veya kişisel verilerin korunması ile ilgili her türlü talebiniz için bize e-posta yoluyla ulaşabilirsiniz.
            </p>
          </div>
          <a
            href="mailto:otizeka@gmail.com"
            className="px-8 py-4 bg-white text-zinc-900 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl hover:bg-zinc-100 active:scale-95 transition-all whitespace-nowrap"
          >
            Bize Ulaşın
          </a>
        </section>
      </main>
    </div>
  );
}
