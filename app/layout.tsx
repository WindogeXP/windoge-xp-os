import type { Metadata } from "next";
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
        <link
          rel="preload"
          href="/fonts/os-ui.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/os-icons.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link rel="preload" href="/images/boot-bg.webp" as="image" />
        <link rel="preload" href="/images/desktop-wallpaper.webp" as="image" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
