import type { Metadata } from "next";
import "./globals.css";
import Providers from "./Providers";

export const metadata: Metadata = {
  title: "Windoge XP (OS)",
  description:
    "A browser-based operating system bringing early internet nostalgia to the Web3 era.",
  icons: {
    icon: "/images/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement {
  return (
    <html lang="en">
      <head>
        <meta
          content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, interactive-widget=resizes-content"
          name="viewport"
        />
        <link rel="preload" href="/images/bootup/logo.png" as="image" />
        <link rel="preload" href="/images/bootup/gradient1.png" as="image" />
        <link rel="preload" href="/images/bootup/gradient2.png" as="image" />
        <link rel="preload" href="/images/bootup/gradient3.png" as="image" />
      </head>
      <body>
        <div
          id="initial-black"
          style={{
            position: "fixed",
            inset: 0,
            background: "#000",
            zIndex: 9999,
            pointerEvents: "none",
          }}
          aria-hidden="false"
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
