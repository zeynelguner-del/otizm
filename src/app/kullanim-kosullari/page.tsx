import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Sparkles, FileCheck, Scale, AlertCircle, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Kullanım Koşulları | OtiZeka",
  description: "OtiZeka platformu ve mobil uygulamalarının kullanım şartları, fikri mülkiyet ve yasal sorumluluk reddi beyanı.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col">
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
            <Link href="/hakkimizda" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition">
              Hakkımızda
            </Link>
            <Link href="/iletisim" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition">
              İletişim
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 flex-1 w-full space-y-10">
        <header className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 text-xs font-black tracking-wide uppercase">
            <Scale className="w-4 h-4" />
            <span>Yasal Bilgilendirme</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">
            Kullanım Koşulları ve Şartları
          </h1>
          <p className="text-sm font-semibold text-zinc-500">
            Son Güncelleme: 17 Ağustos 2026
          </p>
        </header>

        {/* Tıbbi Sorumluluk Reddi (Önemli) */}
        <section className="p-6 sm:p-8 rounded-3xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 text-amber-900 dark:text-amber-200 space-y-3">
          <div className="flex items-center gap-2.5 font-black text-base uppercase tracking-wider">
            <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            <span>Tıbbi Tavsiye Niteliği Taşımama Beyanı</span>
          </div>
          <p className="text-sm sm:text-base leading-relaxed font-medium">
            OtiZeka web sitesinde ve mobil uygulamasında yer alan tüm içerikler, oyunlar, rehber makaleleri ve dijital araçlar yalnızca eğitsel ve bilgilendirme amaçlıdır. Hiçbir içerik; profesyonel tıbbi tanı, klinik teşhis, tedavi veya doktor tavsiyesi yerine geçmez. Çocuğunuzun sağlık ve gelişim durumuna ilişkin kararlarınızda mutlaka Çocuk Psikiyatristi, Nörolog ve yetkili hekimlere danışınız.
          </p>
        </section>

        {/* Sections */}
        <div className="space-y-8 text-zinc-800 dark:text-zinc-200">
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-100">
              1. Hizmetlerin Kapsamı ve Kabulü
            </h2>
            <p className="text-sm sm:text-base leading-relaxed font-medium text-zinc-600 dark:text-zinc-400">
              OtiZeka platformuna erişerek veya mobil uygulamamızı kullanarak bu Kullanım Koşullarını ve Gizlilik Politikamızı peşinen kabul etmiş sayılırsınız. Şartları kabul etmiyorsanız lütfen platformu kullanmayınız.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-100">
              2. Fikri Mülkiyet Hakları
            </h2>
            <p className="text-sm sm:text-base leading-relaxed font-medium text-zinc-600 dark:text-zinc-400">
              OtiZeka logosu, tasarım öğeleri, yazılım kodları, görsel rutin kartları, hikayeler ve rehber makaleleri dahil olmak üzere tüm materyaller Fikir ve Sanat Eserleri Kanunu kapsamında OtiZeka mülkiyetindedir. İzinsiz kopyalanamaz, çoğaltılamaz ve ticari amaçla kullanılamaz.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-100">
              3. Kullanıcı Hesap Güvenliği
            </h2>
            <p className="text-sm sm:text-base leading-relaxed font-medium text-zinc-600 dark:text-zinc-400">
              Kullanıcılar, oluşturdukları hesap şifrelerinin gizliliğini korumaktan sorumludur. Ebeveynler, çocuklarının uygulamayı güvenli ve kontrollü bir ortamda kullanmasını sağlamakla yükümlüdür.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-100">
              4. İletişim
            </h2>
            <p className="text-sm sm:text-base leading-relaxed font-medium text-zinc-600 dark:text-zinc-400">
              Koşullarla ilgili her türlü soru ve talepleriniz için <strong className="text-emerald-600">otizeka@gmail.com</strong> adresinden bize ulaşabilirsiniz.
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 py-10 px-4 text-center text-xs text-zinc-500 font-medium">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex flex-wrap justify-center gap-6 font-bold text-zinc-700 dark:text-zinc-300">
            <Link href="/rehber" className="hover:text-emerald-600 transition">Rehber</Link>
            <Link href="/hakkimizda" className="hover:text-emerald-600 transition">Hakkımızda</Link>
            <Link href="/iletisim" className="hover:text-emerald-600 transition">İletişim</Link>
            <Link href="/gizlilik" className="hover:text-emerald-600 transition">Gizlilik Politikası</Link>
            <Link href="/kullanim-kosullari" className="hover:text-emerald-600 transition">Kullanım Koşulları</Link>
          </div>
          <p>© 2026 OtiZeka Platformu. Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </div>
  );
}
