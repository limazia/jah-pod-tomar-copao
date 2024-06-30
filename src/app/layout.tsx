import "./globals.css";

import { Poppins } from "next/font/google";
import { Metadata } from "next";

import { ClientOnly } from "@/components/client-only";

const poppins = Poppins({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Jah pode tomar copão?",
  description: "Será que já chegou a hora de abrir uma latinha? Descubra",
  keywords:
    "horário de beber, copão, cerveja, vodka, whisky, gin, drink, bar, boteco, balada, festa, happy hour, beber, beba com moderação, beba responsavelmente, beba com responsa, beba com responsabilidade",
  openGraph: {
    title: "Jah pode tomar copão?",
    description: "Será que já chegou a hora de abrir uma latinha? Descubra",
    type: "website",
    images: [{ url: "drink.png", width: 512, height: 512, alt: "drink img" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={poppins.variable} suppressHydrationWarning>
      <body className="antialiased">
        <ClientOnly>{children}</ClientOnly>
      </body>
    </html>
  );
}
