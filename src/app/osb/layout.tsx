import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Otizm Spektrum Bozukluğu (OSB) Nedir?",
  description: "Otizm Spektrum Bozukluğu belirtileri, gelişimsel farklılıklar ve otizmli çocukların eğitimi hakkında kapsamlı bilgilendirme.",
  alternates: {
    canonical: "https://www.otizeka.com/osb",
  },
  openGraph: {
    type: "article",
    url: "https://www.otizeka.com/osb",
    title: "Otizm Spektrum Bozukluğu (OSB) Nedir? | OtiZeka",
    description: "Otizm Spektrum Bozukluğu belirtileri, gelişimsel farklılıklar ve otizmli çocukların eğitimi hakkında kapsamlı bilgilendirme.",
  },
};

export default function OsbLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
