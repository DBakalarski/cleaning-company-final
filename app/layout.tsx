import type { Metadata } from "next";
import { Poppins, Lato } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-lato",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cleaning Service Konin — profesjonalne usługi sprzątające",
  description:
    "Profesjonalne usługi sprzątające dla klientów prywatnych i firmowych. Konin i okolice — do 100 km. Sprawnie, dokładnie, dyskretnie, przystępnie.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl" suppressHydrationWarning>
      <body className={`${poppins.variable} ${lato.variable} font-body`}>
        <script
          // Runs before paint: hide animated content only when motion is allowed.
          // No JS / reduced-motion => class absent => everything stays visible.
          dangerouslySetInnerHTML={{
            __html:
              "try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('anim-ready')}}catch(e){}",
          }}
        />
        {children}
      </body>
    </html>
  );
}
