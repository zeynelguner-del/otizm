import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Otizm Araştırmaları ve Bilimsel Bulgular (2025/2026)",
  description: "Otizm spektrum bozukluğu üzerine küresel ve ulusal düzeyde yapılan en güncel nörolojik, genetik ve hücresel araştırmalar.",
  alternates: {
    canonical: "https://www.otizeka.com/osb-research",
  },
  openGraph: {
    type: "article",
    url: "https://www.otizeka.com/osb-research",
    title: "Otizm Araştırmaları ve Bilimsel Bulgular (2025/2026) | OtiZeka",
    description: "Otizm spektrum bozukluğu üzerine küresel ve ulusal düzeyde yapılan en güncel nörolojik, genetik ve hücresel araştırmalar.",
  },
};

export default function OsbResearchLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
