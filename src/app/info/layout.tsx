import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Otizm Bilgilendirme ve Aile Rehberi",
  description: "Otizm nedir, erken tanı belirtileri, eğitim yöntemleri ve yasal haklar hakkında uzman onaylı pratik rehber.",
  alternates: {
    canonical: "https://www.otizeka.com/info",
  },
  openGraph: {
    type: "article",
    url: "https://www.otizeka.com/info",
    title: "Otizm Bilgilendirme ve Aile Rehberi | OtiZeka",
    description: "Otizm nedir, erken tanı belirtileri, eğitim yöntemleri ve yasal haklar hakkında uzman onaylı pratik rehber.",
  },
};

export default function InfoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
