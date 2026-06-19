import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Otizmde Özel Eğitim ve Gelişim Yöntemleri",
  description: "Otizmli çocuklar için erken eğitim yaklaşımları, davranışsal terapiler, duyu bütünleme ve evde eğitim pratikleri.",
  alternates: {
    canonical: "https://www.otizeka.com/education",
  },
  openGraph: {
    type: "article",
    url: "https://www.otizeka.com/education",
    title: "Otizmde Özel Eğitim ve Gelişim Yöntemleri | OtiZeka",
    description: "Otizmli çocuklar için erken eğitim yaklaşımları, davranışsal terapiler, duyu bütünleme ve evde eğitim pratikleri.",
  },
};

export default function EducationLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
