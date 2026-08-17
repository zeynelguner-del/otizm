import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen, Clock, Tag, Calendar, User, ChevronRight, CheckCircle2, HelpCircle, Share2, Sparkles } from "lucide-react";
import { GUIDE_ARTICLES, GuideArticle } from "@/data/guides";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return GUIDE_ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = GUIDE_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    return {
      title: "Yazı Bulunamadı",
    };
  }

  return {
    title: `${article.title} | OtiZeka Rehber`,
    description: article.summary,
    keywords: article.keywords,
    authors: [{ name: article.author }],
    openGraph: {
      title: article.title,
      description: article.summary,
      url: `https://www.otizeka.com/rehber/${article.slug}`,
      siteName: "OtiZeka",
      locale: "tr_TR",
      type: "article",
      publishedTime: article.publishedDate,
      authors: [article.author],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.summary,
    },
  };
}

export default async function GuideDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = GUIDE_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const otherArticles = GUIDE_ARTICLES.filter((a) => a.slug !== slug).slice(0, 3);

  // Structured Data (Schema.org Article)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.summary,
    author: {
      "@type": "Organization",
      name: article.author,
      url: "https://www.otizeka.com",
    },
    publisher: {
      "@type": "Organization",
      name: "OtiZeka",
      logo: {
        "@type": "ImageObject",
        url: "https://www.otizeka.com/assets/otizeka-logo.png",
      },
    },
    datePublished: article.publishedDate,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.otizeka.com/rehber/${article.slug}`,
    },
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col">
      {/* JSON-LD Script for Google Schema SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Top Navbar */}
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/rehber"
              className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition"
              title="Rehbere Dön"
            >
              <ArrowLeft size={20} />
            </Link>
            <Link href="/" className="flex items-center gap-2 font-black text-lg tracking-tight text-emerald-600 dark:text-emerald-400">
              <Sparkles className="w-5 h-5" />
              <span>OtiZeka</span>
            </Link>
          </div>

          <nav className="flex items-center gap-4 text-sm font-bold">
            <Link href="/rehber" className="text-emerald-600 dark:text-emerald-400">
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

      {/* Breadcrumbs */}
      <div className="border-b border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-100/50 dark:bg-zinc-900/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400 overflow-x-auto">
          <Link href="/" className="hover:text-emerald-600 transition">Ana Sayfa</Link>
          <ChevronRight size={14} />
          <Link href="/rehber" className="hover:text-emerald-600 transition">Rehber</Link>
          <ChevronRight size={14} />
          <span className="text-zinc-800 dark:text-zinc-200 truncate">{article.category}</span>
        </div>
      </div>

      {/* Main Article Container */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14 flex-1 w-full space-y-10">
        {/* Header Block */}
        <header className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 text-xs font-black tracking-wide uppercase">
              {article.category}
            </span>
            <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-emerald-500" />
              {article.readTime} okuma süresi
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-zinc-200 dark:border-zinc-800 text-xs font-medium text-zinc-500 dark:text-zinc-400">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 font-bold text-zinc-700 dark:text-zinc-300">
                <User className="w-4 h-4 text-emerald-500" />
                {article.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-zinc-400" />
                {article.publishedDate}
              </span>
            </div>
          </div>
        </header>

        {/* Lead / Intro Paragraph */}
        <div className="p-6 sm:p-8 rounded-3xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200/70 dark:border-emerald-800/30 text-base sm:text-lg leading-relaxed text-zinc-800 dark:text-zinc-200 font-medium">
          {article.content.intro}
        </div>

        {/* Content Sections */}
        <div className="space-y-12 text-zinc-800 dark:text-zinc-200">
          {article.content.sections.map((section, idx) => (
            <section key={idx} className="space-y-6">
              <h2 className="text-xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight border-l-4 border-emerald-500 pl-4 py-1">
                {section.heading}
              </h2>

              {section.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="text-base sm:text-lg leading-relaxed font-normal text-zinc-700 dark:text-zinc-300">
                  {p}
                </p>
              ))}

              {section.listItems && section.listItems.length > 0 && (
                <ul className="space-y-3.5 pl-2 sm:pl-4">
                  {section.listItems.map((item, lIdx) => (
                    <li key={lIdx} className="flex items-start gap-3 text-base sm:text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              {section.tipBox && (
                <div className="my-6 p-6 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 text-amber-900 dark:text-amber-200 space-y-2">
                  <div className="font-black text-sm uppercase tracking-wider flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <span>{section.tipBox.title}</span>
                  </div>
                  <p className="text-sm sm:text-base leading-relaxed font-medium">
                    {section.tipBox.text}
                  </p>
                </div>
              )}
            </section>
          ))}

          {/* Conclusion */}
          <section className="p-6 sm:p-8 rounded-3xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3">
            <h3 className="text-lg sm:text-xl font-black text-zinc-900 dark:text-zinc-100">
              Sonuç ve Değerlendirme
            </h3>
            <p className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300 font-medium">
              {article.content.conclusion}
            </p>
          </section>

          {/* FAQ Section if present */}
          {article.content.faqs && article.content.faqs.length > 0 && (
            <section className="space-y-6 pt-6 border-t border-zinc-200 dark:border-zinc-800">
              <h3 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                <HelpCircle className="w-6 h-6 text-emerald-500" />
                <span>Sıkça Sorulan Sorular</span>
              </h3>

              <div className="space-y-4">
                {article.content.faqs.map((faq, fIdx) => (
                  <div key={fIdx} className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
                    <h4 className="font-black text-base text-zinc-900 dark:text-zinc-100">
                      {faq.question}
                    </h4>
                    <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Related Articles Section */}
        <section className="pt-12 border-t border-zinc-200 dark:border-zinc-800 space-y-6">
          <h3 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-50">
            İlgili Diğer Rehber Yazıları
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {otherArticles.map((rel) => (
              <Link
                key={rel.slug}
                href={`/rehber/${rel.slug}`}
                className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500/50 transition group flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                    {rel.category}
                  </span>
                  <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition line-clamp-2">
                    {rel.title}
                  </h4>
                </div>
                <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800 text-[11px] font-semibold text-zinc-400 flex items-center gap-1">
                  <span>Yazıyı Gör</span>
                  <ChevronRight size={12} />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </article>

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
          <p>© 2026 OtiZeka Platformu. Tüm hakları saklıdır. Bu makale yalnızca bilgilendirme amaçlıdır.</p>
        </div>
      </footer>
    </div>
  );
}
