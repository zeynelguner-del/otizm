import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AAC İletişim Paneli - Görsel Kartlar",
  description: "Özel gereksinimli çocukların konuşma ve iletişim becerilerini destekleyici alternatif ve destekleyici iletişim paneli.",
  alternates: {
    canonical: "https://www.otizeka.com/aac",
  },
  openGraph: {
    type: "article",
    url: "https://www.otizeka.com/aac",
    title: "AAC İletişim Paneli - Görsel Kartlar | OtiZeka",
    description: "Özel gereksinimli çocukların konuşma ve iletişim becerilerini destekleyici alternatif ve destekleyici iletişim paneli.",
  },
};

export default function AacLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
