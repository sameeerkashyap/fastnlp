import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

// GitHub Pages deploys under a sub-path (e.g. /fastnlp).
// Next.js metadata.icons does NOT auto-prepend basePath, so we do it manually.
const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  title: {
    default: "FastNLP — NeetCode for NLP",
    template: "%s | FastNLP",
  },
  description:
    "Go from zero to shipping an NLP system in 4 weeks. Learn n-grams to transformers to fine-tuning encoder models — project-driven, not tutorial-driven.",
  keywords: ["NLP", "natural language processing", "transformers", "BERT", "machine learning", "learn NLP", "NeetCode NLP"],
  icons: {
    icon: [
      { url: `${base}/icon.png`, type: "image/png" },
      { url: `${base}/favicon/favicon.ico`, sizes: "48x48" },
      { url: `${base}/favicon/favicon-96x96.png`, type: "image/png", sizes: "96x96" },
    ],
    apple: { url: `${base}/favicon/apple-touch-icon.png`, sizes: "180x180" },
    other: [
      { rel: "manifest", url: `${base}/favicon/site.webmanifest` },
    ],
  },
  openGraph: {
    title: "FastNLP — NeetCode for NLP",
    description: "Go from zero to shipping an NLP system in 4 weeks.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
