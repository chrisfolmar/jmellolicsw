import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "wouter";

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

function GAPageTracker() {
  const [location] = useLocation();

  useEffect(() => {
    if (!GA_ID || typeof window.gtag !== "function") return;
    window.gtag("event", "page_view", {
      page_path: location,
    });
  }, [location]);

  return null;
}

export function Analytics() {
  if (!GA_ID) return null;

  return (
    <>
      <Helmet>
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        />
        <script>{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { send_page_view: false });
        `}</script>
      </Helmet>
      <GAPageTracker />
    </>
  );
}
