import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Otizmli Çocuklar İçin Sosyal Öyküler ve Örnekler",
  description: "Sosyal durumları, günlük kuralları ve sosyal ipuçlarını çocuklara eğlenceli ve somut yollarla öğreten sosyal öyküler.",
  alternates: {
    canonical: "https://www.otizeka.com/stories",
  },
  openGraph: {
    type: "article",
    url: "https://www.otizeka.com/stories",
    title: "Otizmli Çocuklar İçin Sosyal Öyküler ve Örnekler | OtiZeka",
    description: "Sosyal durumları, günlük kuralları ve sosyal ipuçlarını çocuklara eğlenceli ve somut yollarla öğreten sosyal öyküler.",
  },
};

export default function StoriesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
