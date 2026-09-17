import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Fraunces, Work_Sans } from 'next/font/google';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const workSans = Work_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#FCFCFB',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://rightfieldfinder.com'),
  verification: { google: ''y4lN0VyB157omt4zTMEJ0HhoR6li0sUz07kSpfBOnRY', 
    },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en" className={`scroll-smooth ${fraunces.variable} ${workSans.variable}`}>
      <body className="bg-[#FCFCFB] text-[#1A202C] font-sans antialiased selection:bg-[#E2823C]/20 selection:text-[#24408E] min-h-screen flex flex-col">
        {/* Google Analytics 4 Script (Strategy: afterInteractive) */}
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
        {children}
      </body>
    </html>
  );
}
