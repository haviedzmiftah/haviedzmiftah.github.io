import { Plus_Jakarta_Sans } from "next/font/google";
import { ThemeProvider } from "next-themes";

import FramerMotionProvider from "@/components/FramerMotionProvider";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";

import "./globals.css";

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta-sans",
});

export const metadata = {
  metadataBase: new URL("https://hafidmiftah.my.id"),
  title: {
    default: "Haviedz Miftah",
    template: "%s | Haviedz Miftah",
  },
  description: "Website portfolio dan blog pribadi Haviedz Miftah",
  openGraph: {
    title: "Haviedz Miftah",
    description: "Portfolio, project, dan blog pribadi",
    url: "https://hafidmiftah.my.id",
    siteName: "Haviedz Miftah",
    type: "website",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${jakartaSans.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-white text-slate-900 antialiased dark:bg-slate-900 dark:text-slate-100">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="min-h-screen bg-grid text-slate-900 dark:text-slate-100">
            <Navigation />
            <FramerMotionProvider>{children}</FramerMotionProvider>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
