import type { Metadata } from "next";
import { Great_Vibes as GreatVibes, Playfair_Display as PlayfairDisplay, Raleway as Raleway } from "next/font/google";
import "./globals.css";

const greatVibes = GreatVibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: "400",
});

const playfairDisplay = PlayfairDisplay({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});


export const metadata: Metadata = {
  title: "Revery",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        className={`${greatVibes.variable} ${playfairDisplay.variable} ${raleway.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
