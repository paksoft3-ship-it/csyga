import { Public_Sans } from "next/font/google";
import Script from "next/script";
import TopNavBar from "@/components/layout/TopNavBar";
import Footer from "@/components/layout/Footer";
import NewsletterSection from "@/components/ui/NewsletterSection";
import MetaPixelPageViewTracker from "@/components/analytics/MetaPixelPageViewTracker";
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
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1456772689414129');
            fbq('track', 'PageView');
          `}
        </Script>
      </head>
      <body className="font-sans bg-background-light text-[#0e141b] overflow-x-hidden antialiased selection:bg-primary selection:text-white">
        <MetaPixelPageViewTracker />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1456772689414129&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        <TopNavBar />
        <main>{children}</main>
        <NewsletterSection />
        <Footer />
      </body>
    </html>
  );
}
