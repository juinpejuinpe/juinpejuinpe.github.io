import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "@fontsource/noto-serif-tc/400.css";
import "@fontsource/noto-serif-tc/700.css";
import "@fontsource/noto-serif-tc/900.css";
import "@fontsource/noto-sans-tc/400.css";
import "@fontsource/noto-sans-tc/500.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "@fontsource/fraunces/400.css";
import "@fontsource/fraunces/600.css";
import "@fontsource/fraunces/400-italic.css";
import "./globals.css";
import "./moonmap.css";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_NAME_EN,
  SITE_TAGLINE,
  SITE_URL,
} from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} Scentmoon｜${SITE_TAGLINE}`,
    template: `%s｜${SITE_NAME} Scentmoon`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: `${SITE_NAME} Scentmoon｜${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: `${SITE_NAME} ${SITE_NAME_EN}`,
    locale: "zh_Hant_HK",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#060816",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="zh-Hant" className="antialiased">
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        <a
          href="#main"
          className="skip-link"
        >
          跳到主要內容
        </a>
        {children}
      </body>
    </html>
  );
}
