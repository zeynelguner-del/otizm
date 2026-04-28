"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Users, ShieldCheck, FileText, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

type AdminStats = {
  now: string;
  usersTotal: number;
  usersLastCreatedAt: string | null;
  usersLast7Days: number;
  sessionsActive: number;
  kvkkAccepted: number;
  profilesSaved: number;
};

export default function AdminPage() {
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<AdminStats | null>(null);

  const load = async () => {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/stats", { method: "GET", cache: "no-store" });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setError(typeof data.error === "string" ? data.error : "Veri alınamadı.");
        setStats(null);
        return;
      }
      setStats(data as AdminStats);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Veri alınamadı.");
      setStats(null);
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-6 md:p-12">
      <header className="max-w-3xl mx-auto mb-10 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 shadow-sm hover:bg-zinc-50 transition-all"
          >
            <ArrowLeft size={28} />
          </Link>
          <div>
            <h1 className="text-3xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">Yönetim Paneli</h1>
            <p className="text-zinc-500 font-medium">Uygulama istatistikleri</p>
          </div>
        </div>
        <button
          type="button"
          onClick={load}
          className={cn(
            "px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all active:scale-95",
            busy ? "bg-zinc-200 text-zinc-500 cursor-not-allowed" : "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:opacity-90"
          )}
          disabled={busy}
        >
          Yenile
        </button>
      </header>

      <main className="max-w-3xl mx-auto space-y-6">
        {error && (
          <section className="bg-rose-50 dark:bg-rose-900/20 p-6 rounded-[2rem] border border-rose-100 dark:border-rose-900/30 text-rose-700 dark:text-rose-200 font-bold">
            {error}
          </section>
        )}

        {!error && busy && (
          <section className="bg-white dark:bg-zinc-900 p-6 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 shadow-sm text-zinc-500 dark:text-zinc-400 font-bold">
            Yükleniyor…
          </section>
        )}

        {!error && !busy && stats && (
          <section className="bg-white dark:bg-zinc-900 p-8 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-6 rounded-[1.5rem] border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950">
                <div className="flex items-center gap-3 text-zinc-500 dark:text-zinc-400 font-black text-sm">
                  <Users size={18} /> Toplam Kullanıcı
                </div>
                <div className="mt-2 text-4xl font-black text-zinc-900 dark:text-zinc-50">{stats.usersTotal}</div>
                <div className="mt-2 text-sm font-bold text-zinc-500 dark:text-zinc-400">Son 7 gün: {stats.usersLast7Days}</div>
              </div>

              <div className="p-6 rounded-[1.5rem] border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950">
                <div className="flex items-center gap-3 text-zinc-500 dark:text-zinc-400 font-black text-sm">
                  <Clock size={18} /> Aktif Oturum
                </div>
                <div className="mt-2 text-4xl font-black text-zinc-900 dark:text-zinc-50">{stats.sessionsActive}</div>
                <div className="mt-2 text-sm font-bold text-zinc-500 dark:text-zinc-400">
                  Son kayıt: {stats.usersLastCreatedAt ? new Date(stats.usersLastCreatedAt).toLocaleString("tr-TR") : "—"}
                </div>
              </div>

              <div className="p-6 rounded-[1.5rem] border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950">
                <div className="flex items-center gap-3 text-zinc-500 dark:text-zinc-400 font-black text-sm">
                  <ShieldCheck size={18} /> KVKK Onayı
                </div>
                <div className="mt-2 text-4xl font-black text-zinc-900 dark:text-zinc-50">{stats.kvkkAccepted}</div>
              </div>

              <div className="p-6 rounded-[1.5rem] border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950">
                <div className="flex items-center gap-3 text-zinc-500 dark:text-zinc-400 font-black text-sm">
                  <FileText size={18} /> Kayıtlı Profil
                </div>
                <div className="mt-2 text-4xl font-black text-zinc-900 dark:text-zinc-50">{stats.profilesSaved}</div>
              </div>
            </div>

            <div className="mt-6 text-xs font-bold text-zinc-400 uppercase tracking-widest">
              Güncelleme: {new Date(stats.now).toLocaleString("tr-TR")}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

