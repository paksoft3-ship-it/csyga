import { Public_Sans } from "next/font/google";
import TopNavBar from "@/components/layout/TopNavBar";
import Footer from "@/components/layout/Footer";
import NewsletterSection from "@/components/ui/NewsletterSection";
import "./globals.css";

const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-public-sans",
});

export const metadata = {
  title: "CSYGA | Youth Diplomatic Engagement",
  description: "Cultivating Strategic Youth for Global Action",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${publicSans.variable} light`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body className="font-sans bg-background-light text-[#0e141b] overflow-x-hidden antialiased selection:bg-primary selection:text-white">
        <TopNavBar />
        <main>{children}</main>
        <NewsletterSection />
        <Footer />
      </body>
    </html>
  );
}
