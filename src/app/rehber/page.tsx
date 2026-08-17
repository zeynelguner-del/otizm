import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BookOpen, Clock, Tag, Search, Sparkles, ChevronRight, GraduationCap } from "lucide-react";
import { GUIDE_ARTICLES } from "@/data/guides";

export const metadata: Metadata = {
  title: "Otizm Rehberi ve Özel Eğitim Makaleleri",
  description: "Otizm spektrum bozukluğu, erken tanı, özel eğitim teknikleri, duyu bütünleme ve aile rehberliği üzerine kapsamlı ve bilimsel makaleler.",
  keywords: ["otizm rehberi", "özel eğitim makaleleri", "otizmde erken tanı", "duyu bütünleme rehberi", "aba terapisi", "pecs", "otizm aile desteği"],
  openGraph: {
    title: "OtiZeka Otizm ve Özel Eğitim Rehberi",
    description: "Otizm spektrum bozukluğu, erken tanı, özel eğitim yöntemleri ve aile rehberliği üzerine kapsamlı makaleler.",
    url: "https://www.otizeka.com/rehber",
    siteName: "OtiZeka",
    locale: "tr_TR",
    type: "website",
  },
};

export default function GuideIndexPage() {
  const categories = [
    "Tümü",
    "Temel Bilgiler",
    "Özel Eğitim",
    "Duyu & Terapi",
    "İletişim & Sosyal",
    "Aile & Yaşam"
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col">
      {/* Top Navbar */}
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition"
              title="Ana Sayfaya Dön"
            >
              <ArrowLeft size={20} />
            </Link>
            <Link href="/" className="flex items-center gap-2 font-black text-xl tracking-tight text-emerald-600 dark:text-emerald-400">
              <Sparkles className="w-6 h-6" />
              <span>OtiZeka</span>
            </Link>
          </div>

          <nav className="flex items-center gap-4 text-sm font-bold">
            <Link href="/rehber" className="text-emerald-600 dark:text-emerald-400 border-b-2 border-emerald-500 pb-0.5">
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

      {/* Hero Banner */}
      <section className="bg-gradient-to-b from-emerald-500/10 via-emerald-500/5 to-transparent py-14 px-4 border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 text-xs font-black tracking-wide uppercase">
            <GraduationCap className="w-4 h-4" />
            <span>Bilimsel ve Pedagojik Bilgi Merkezi</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">
            Otizm ve Özel Eğitim Rehberi
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-medium max-w-2xl mx-auto leading-relaxed">
            Aileler, eğitimciler ve bakım verenler için hazırlanan kanıta dayalı yöntemler, erken müdahale stratejileri ve günlük yaşam ipuçları.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12 flex-1 w-full space-y-10">
        {/* Article Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {GUIDE_ARTICLES.map((article) => (
            <article
              key={article.slug}
              className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition-all duration-300 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5" />
                    {article.category}
                  </span>
                  <span className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {article.readTime} okuma
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition tracking-tight line-clamp-2">
                  <Link href={`/rehber/${article.slug}`}>
                    {article.title}
                  </Link>
                </h2>

                <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-3 font-medium">
                  {article.summary}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between">
                <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  <span className="font-bold text-zinc-700 dark:text-zinc-300">{article.author}</span>
                </div>
                <Link
                  href={`/rehber/${article.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-black text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition"
                >
                  <span>Yazıyı Oku</span>
                  <ChevronRight size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Informative Callout Banner */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
              OtiZeka Mobil Uygulamasını İndirin
            </h3>
            <p className="text-emerald-100 font-medium max-w-xl text-sm sm:text-base leading-relaxed">
              Çocuğunuzun iletişimini, duygu takibini ve günlük rutinlerini destekleyen interaktif eğitim araçları cebinizde.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/"
              className="px-6 py-3.5 bg-white text-emerald-900 rounded-2xl font-black text-sm shadow-md hover:bg-emerald-50 transition"
            >
              Uygulamayı Keşfet
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 py-10 px-4 text-center text-xs text-zinc-500 font-medium">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="flex flex-wrap justify-center gap-6 font-bold text-zinc-700 dark:text-zinc-300">
            <Link href="/rehber" className="hover:text-emerald-600 transition">Rehber</Link>
            <Link href="/hakkimizda" className="hover:text-emerald-600 transition">Hakkımızda</Link>
            <Link href="/iletisim" className="hover:text-emerald-600 transition">İletişim</Link>
            <Link href="/gizlilik" className="hover:text-emerald-600 transition">Gizlilik Politikası</Link>
            <Link href="/kullanim-kosullari" className="hover:text-emerald-600 transition">Kullanım Koşulları</Link>
          </div>
          <p>© 2026 OtiZeka Platformu. Tüm hakları saklıdır. Sağlanan bilgiler eğitsel niteliktedir; tıbbi tanı veya tedavi yerine geçmez.</p>
        </div>
      </footer>
    </div>
  );
}
