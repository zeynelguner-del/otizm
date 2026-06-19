import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Etkinlik Takvimi",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CalendarLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
