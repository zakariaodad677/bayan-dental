import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Tajawal, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  variable: "--font-english",
});

const tajawal = Tajawal({ 
  weight: ["300", "400", "500", "700"],
  subsets: ["arabic"],
  variable: "--font-arabic",
});

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-serif-luxury",
});

export const metadata: Metadata = {
  title: "Bayan Dental | Premium Dental Care in Kuwait",
  description: "A unified team of internationally certified specialists and consultants.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${plusJakarta.variable} ${tajawal.variable} ${cormorant.variable} antialiased selection:bg-[var(--bayan-accent)] selection:text-white`}>
        {children}
      </body>
    </html>
  );
}