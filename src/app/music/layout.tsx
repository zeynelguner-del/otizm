import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Otizm Rahatlatıcı Sesler ve Odak Müzikleri",
  description: "Duyusal sakinleşme, odaklanma ve uyku rutinini destekleyici beyaz gürültü, doğa sesleri ve rahatlatıcı müzikler.",
  alternates: {
    canonical: "https://www.otizeka.com/music",
  },
  openGraph: {
    type: "article",
    url: "https://www.otizeka.com/music",
    title: "Otizm Rahatlatıcı Sesler ve Odak Müzikleri | OtiZeka",
    description: "Duyusal sakinleşme, odaklanma ve uyku rutinini destekleyici beyaz gürültü, doğa sesleri ve rahatlatıcı müzikler.",
  },
};

export default function MusicLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
