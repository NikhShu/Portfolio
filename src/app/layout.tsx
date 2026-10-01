import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Analytics from "@/components/Analytics";
import { getPersonalInfo } from "@/lib/content";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const personalInfo = await getPersonalInfo();

  return {
    title: personalInfo.metaTitle,
    description: personalInfo.metaDescription,
    keywords: [
      personalInfo.name,
      "AI/ML Engineer",
      "Software Developer",
      "Portfolio",
      "Machine Learning",
      "Deep Learning",
      "Sharda University",
    ],
    openGraph: {
      title: personalInfo.metaTitle,
      description: personalInfo.metaDescription,
      type: "website",
      locale: "en_US",
    },
  };
}

const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"}document.documentElement.dataset.theme=t}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-text">
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <Analytics />
        {children}
      </body>
    </html>
  );
}
