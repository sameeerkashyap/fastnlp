import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "FastNLP — NeetCode for NLP",
    template: "%s | FastNLP",
  },
  description:
    "Go from zero to shipping an NLP system in 4 weeks. Learn n-grams to transformers to fine-tuning encoder models — project-driven, not tutorial-driven.",
  keywords: ["NLP", "natural language processing", "transformers", "BERT", "machine learning", "learn NLP", "NeetCode NLP"],
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
