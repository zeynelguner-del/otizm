"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";

const ALLOWED_EDITORIAL_PATHS = [
  "/rehber",
  "/osb",
  "/education",
  "/info",
  "/stories",
  "/osb-research",
  "/hakkimizda",
  "/iletisim",
];

const BLOCKED_APP_PREFIXES = [
  "/games",
  "/admin",
  "/api",
  "/calendar",
  "/music",
  "/duyusal-oda",
  "/imitation",
  "/sentence-sounds",
  "/education-reminder",
  "/family",
  "/emotions",
  "/aac",
  "/acc",
  "/gizlilik",
  "/kullanim-kosullari",
];

export default function AdSenseScript() {
  const pathname = usePathname();

  if (!pathname) return null;

  // Block any interactive utility, game, auth or legal page
  const isBlocked = BLOCKED_APP_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(prefix + "/")
  );

  if (isBlocked) {
    return null;
  }

  // Allow root homepage and editorial guides
  const isAllowed =
    pathname === "/" ||
    ALLOWED_EDITORIAL_PATHS.some(
      (path) => pathname === path || pathname.startsWith(path + "/")
    );

  if (!isAllowed) {
    return null;
  }

  return (
    <Script
      id="google-adsense-script"
      async
      strategy="afterInteractive"
      crossOrigin="anonymous"
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6555296619233151"
    />
  );
}
