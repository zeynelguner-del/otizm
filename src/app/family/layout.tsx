import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aile Paneli",
  robots: {
    index: false,
    follow: false,
  },
};

export default function FamilyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
