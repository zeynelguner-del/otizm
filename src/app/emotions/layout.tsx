import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Duygularım",
  robots: {
    index: false,
    follow: false,
  },
};

export default function EmotionsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
