import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kurumsal İş Birliği, Sponsorluk ve Hibe Ortaklığı | OtiZeka",
  description:
    "Belediyeler, özel eğitim ve rehabilitasyon merkezleri, otizm dernekleri ve kurumsal sosyal sorumluluk (KSS) projeleri için OtiZeka dijital özel eğitim ortaklığı.",
  keywords: [
    "otizm sosyal sorumluluk projesi",
    "belediye engelli projeleri",
    "özel eğitim yazılımı",
    "otizeka kurumsal iş birliği",
    "otizm derneği hibe projesi",
    "kurumsal sponsorluk eğitim",
  ],
  openGraph: {
    title: "OtiZeka Kurumsal İş Birliği ve Sosyal Sorumluluk Platformu",
    description:
      "Otizmli çocukların eğitim yolculuğuna kurumunuzla güç katın. Belediyeler, özel eğitim kurumları, dernekler ve KSS markaları için iş birliği modelleri.",
    url: "https://www.otizeka.com/is-birligi",
    siteName: "OtiZeka",
    locale: "tr_TR",
    type: "website",
  },
};

export default function PartnershipLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
