"use client";
import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Helper to send a pageview event
function sendPageView(url) {
    if (!GA_MEASUREMENT_ID || typeof window === "undefined" || !window.gtag) return;
    window.gtag("config", GA_MEASUREMENT_ID, { page_path: url });
}

// Helper to send custom GA4 events — import and use this anywhere in the app
export function trackEvent(eventName, params = {}) {
    if (!GA_MEASUREMENT_ID || typeof window === "undefined" || !window.gtag) return;
    window.gtag("event", eventName, params);
}

// Internal component that uses useSearchParams
function RouteTracker() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "");
        sendPageView(url);
    }, [pathname, searchParams]);

    return null;
}

export default function GoogleAnalytics() {
    if (!GA_MEASUREMENT_ID) return null;

    return (
        <>
            <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            />
            <Script
                id="google-analytics"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${GA_MEASUREMENT_ID}', {
                            page_path: window.location.pathname,
                            send_page_view: false
                        });
                    `,
                }}
            />
            {/* RouteTracker must be inside Suspense because it uses useSearchParams */}
            <Suspense fallback={null}>
                <RouteTracker />
            </Suspense>
        </>
    );
}
