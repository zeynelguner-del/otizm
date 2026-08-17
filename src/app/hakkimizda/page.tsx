import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Sparkles, Heart, Target, Users, Award, BookOpen, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Hakkımızda | OtiZeka Otizm ve Özel Eğitim Platformu",
  description: "OtiZeka'nın kuruluş hikayesi, misyonu, vizyonu, özel eğitim ve otizm alanındaki bilimsel yaklaşımı.",
};

export default function AboutPage() {
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
            <Link href="/hakkimizda" className="text-emerald-600 dark:text-emerald-400">
              Hakkımızda
            </Link>
            <Link href="/iletisim" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition">
              İletişim
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 flex-1 w-full space-y-12">
        {/* Header Title */}
        <section className="space-y-4 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 text-xs font-black tracking-wide uppercase">
            <Award className="w-4 h-4" />
            <span>Biz Kimiz?</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">
            Otizmli Çocuklar ve Aileler İçin Dijital Köprü
          </h1>
          <p className="text-base sm:text-xl text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
            OtiZeka; otizm spektrum bozukluğu olan çocukların iletişim, sosyal etkileşim ve bilişsel becerilerini bilimsel temelli interaktif araçlarla destekleyen, ailelerin ve eğitimcilerin yanında yer alan bağımsız bir özel eğitim teknolojisi platformudur.
          </p>
        </section>

        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-black text-zinc-900 dark:text-zinc-100">
              Misyonumuz
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium text-sm sm:text-base">
              Her çocuğun kendi hızında öğrenebileceği gerçeğinden yola çıkarak; özel eğitime erişimi kolaylaştırmak, görsel iletişim araçları (AAC), duygu takip modülleri ve yapılandırılmış rutinlerle çocukların bağımsız yaşam becerilerini en üst seviyeye taşımaktır.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Heart className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-black text-zinc-900 dark:text-zinc-100">
              Vizyonumuz
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium text-sm sm:text-base">
              Otizm farkındalığını yalnızca bir günle sınırlı tutmayıp; teknolojinin şefkat ve bilimle harmanlandığı, ailelerin kendilerini asla yalnız hissetmediği, Türkiye ve dünyada öncü bir özel eğitim ekosistemi inşa etmektir.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
            Temel Değerlerimiz ve Yaklaşımımız
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
              <BookOpen className="w-6 h-6 text-emerald-500" />
              <h3 className="font-black text-lg text-zinc-900 dark:text-zinc-100">Kanıta Dayalı Yöntemler</h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                Uygulamalarımız ABA, TEACCH, PECS ve Duyu Bütünleme gibi bilimsel geçerliliği kanıtlanmış pedagojik ilkeler üzerine kuruludur.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
              <Users className="w-6 h-6 text-emerald-500" />
              <h3 className="font-black text-lg text-zinc-900 dark:text-zinc-100">Aile Odaklılık</h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                Eğitimin en güçlü ayağının aile olduğuna inanıyor, ebeveynlerin günlük yaşamdaki yükünü hafifletecek pratik araçlar sunuyoruz.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
              <ShieldCheck className="w-6 h-6 text-emerald-500" />
              <h3 className="font-black text-lg text-zinc-900 dark:text-zinc-100">Etik ve Çocuk Güvenliği</h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                COPPA, KVKK ve Google Play Aile Politikası standartlarına tam uyumlu, çocukların mahremiyetini en üst düzeyde koruyan güvenli bir ortam.
              </p>
            </div>
          </div>
        </section>
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
