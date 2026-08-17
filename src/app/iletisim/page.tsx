"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles, Mail, MessageSquare, MapPin, Clock, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      setError("Lütfen tüm alanları eksiksiz doldurunuz.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Mesaj gönderilirken bir sorun oluştu.");
        return;
      }

      setSuccess("Mesajınız başarıyla iletildi! Ekibimiz en kısa sürede sizinle iletişime geçecektir.");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (err) {
      setError("Sunucuya bağlanılamadı. Lütfen internet bağlantınızı kontrol edin veya doğrudan otizeka@gmail.com adresine yazın.");
    } finally {
      setLoading(false);
    }
  };

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
            <Link href="/iletisim" className="text-emerald-600 dark:text-emerald-400">
              İletişim
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 flex-1 w-full space-y-12">
        {/* Header */}
        <section className="space-y-4 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 text-xs font-black tracking-wide uppercase">
            <MessageSquare className="w-4 h-4" />
            <span>Bizimle İletişime Geçin</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">
            Sorularınız, Önerileriniz ve Destek İçin Buradayız
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed max-w-2xl">
            Uygulamamız, eğitim içeriklerimiz veya kurumsal iş birliklerinizle ilgili her türlü geri bildirimi memnuniyetle karşılıyoruz.
          </p>
        </section>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <h2 className="font-black text-lg text-zinc-900 dark:text-zinc-100">E-Posta</h2>
            <p className="text-xs text-zinc-500 font-medium">Doğrudan destek ve resmi yazışmalar için:</p>
            <a
              href="mailto:otizeka@gmail.com"
              className="text-sm font-black text-emerald-600 dark:text-emerald-400 hover:underline block break-all"
            >
              otizeka@gmail.com
            </a>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <h2 className="font-black text-lg text-zinc-900 dark:text-zinc-100">Yanıt Süresi</h2>
            <p className="text-xs text-zinc-500 font-medium">Çalışma ve destek saatlerimiz:</p>
            <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
              Hafta içi 09:00 - 18:00 (En geç 24 saat içinde yanıt)
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <h2 className="font-black text-lg text-zinc-900 dark:text-zinc-100">Konum & Dijital Ağ</h2>
            <p className="text-xs text-zinc-500 font-medium">Merkez:</p>
            <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
              İstanbul / Türkiye
            </p>
          </div>
        </div>

        {/* Dynamic Contact Form */}
        <section className="bg-white dark:bg-zinc-900 p-8 sm:p-10 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-lg space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
              Bize Mesaj Gönderin
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">
              Aşağıdaki formu doldurarak bize doğrudan mesaj iletebilirsiniz. Harici bir e-posta programı açılması gerekmez.
            </p>
          </div>

          {/* Alert notifications */}
          {success && (
            <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 flex items-start gap-3 text-sm font-bold">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <span>{success}</span>
            </div>
          )}

          {error && (
            <div className="p-5 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 flex items-start gap-3 text-sm font-bold">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
                  Adınız Soyadınız
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={loading}
                  required
                  placeholder="Örn: Ahmet Yılmaz"
                  className="w-full px-4 py-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium disabled:opacity-60 transition"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
                  E-Posta Adresiniz
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  required
                  placeholder="Örn: ahmet@example.com"
                  className="w-full px-4 py-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium disabled:opacity-60 transition"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
                Konu
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                disabled={loading}
                required
                placeholder="Örn: Uygulama hakkında öneri / Destek talebi"
                className="w-full px-4 py-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium disabled:opacity-60 transition"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
                Mesajınız
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={loading}
                rows={5}
                required
                placeholder="Mesajınızı buraya yazabilirsiniz..."
                className="w-full px-4 py-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium resize-none disabled:opacity-60 transition"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-95 transition cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Gönderiliyor...</span>
                </>
              ) : (
                <>
                  <Send size={18} />
                  <span>Mesajı Gönder</span>
                </>
              )}
            </button>
          </form>
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
