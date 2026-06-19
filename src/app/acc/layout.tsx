import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AAC İletişim Kartları - Alternatif İletişim",
  description: "Konuşma güçlüğü çeken çocukların kendilerini kolayca ifade etmelerini sağlayan görsel iletişim kartları sistemi.",
  alternates: {
    canonical: "https://www.otizeka.com/acc",
  },
  openGraph: {
    type: "article",
    url: "https://www.otizeka.com/acc",
    title: "AAC İletişim Kartları - Alternatif İletişim | OtiZeka",
    description: "Konuşma güçlüğü çeken çocukların kendilerini kolayca ifade etmelerini sağlayan görsel iletişim kartları sistemi.",
  },
};

export default function AccLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
