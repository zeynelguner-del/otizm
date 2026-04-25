"use client";

import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="tr">
      <body className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-6 md:p-12">
        <div className="max-w-xl mx-auto bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-xl">
          <h1 className="text-2xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">Bir hata oluştu</h1>
          <p className="mt-3 text-zinc-600 dark:text-zinc-300 font-bold leading-relaxed">
            Uygulama beklenmeyen bir hatayla karşılaştı. Yeniden denemeyi deneyin.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <button
              type="button"
              onClick={() => reset()}
              className="px-6 py-3 rounded-2xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-black uppercase tracking-widest text-xs"
            >
              Yeniden Dene
            </button>
            <Link
              href="/"
              className="px-6 py-3 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-100 font-black uppercase tracking-widest text-xs"
            >
              Ana Sayfa
            </Link>
          </div>
          <div className="mt-6 text-xs font-bold text-zinc-400 break-all">{error.digest ?? error.message}</div>
        </div>
      </body>
    </html>
  );
}

