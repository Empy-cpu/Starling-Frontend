'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { pageview } from '@/lib/gtag';

// This component doesn't render anything on the server
function Analytics() {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Only run on client side after component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  // Track page views
  useEffect(() => {
    if (!mounted) return;
    
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
    pageview(url);
  }, [mounted, pathname, searchParams]);

  // Don't render anything on the server or in non-production
  if (!mounted || process.env.NODE_ENV !== 'production') {
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=G-ZQLY8HT2ZN`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ZQLY8HT2ZN', {
              page_path: window.location.pathname,
              send_page_view: false
            });
          `,
        }}
      />
    </>
  );
}

// No need for Suspense here as it's already handled in the layout
export default function GoogleAnalytics() {
  // Only render on client-side
  if (typeof window === 'undefined') {
    return null;
  }
  
  return (
    <>
      <Script
        id="gtag-base"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
          `,
        }}
      />
      <Script
        id="gtag-script"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=G-ZQLY8HT2ZN`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            gtag('js', new Date());
            gtag('config', 'G-ZQLY8HT2ZN', {
              page_path: window.location.pathname,
              send_page_view: false
            });
          `,
        }}
      />
      <Analytics />
    </>
  );
}
