import type { Metadata } from "next";
import { Wix_Madefor_Display, Wix_Madefor_Text } from "next/font/google";
import "../styles/globals.css";

const wixMadeforDisplay = Wix_Madefor_Display({
  variable: "--font-wix-madefor-display",
  subsets: ["latin"],
});

const wixMadeforText = Wix_Madefor_Text({
  variable: "--font-wix-madefor-text",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Strativa",
  description: "Connect with investment opportunities and grow your portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${wixMadeforDisplay.variable} ${wixMadeforText.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
