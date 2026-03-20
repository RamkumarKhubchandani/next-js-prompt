'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function ActivityTracker() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { data: session } = useSession();
    const previousPath = useRef(null);

    useEffect(() => {
        if (!session?.user) return;

        const currentPath = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');

        // Don't log if it's the exact same path (prevents double logging on initial load or search param changes if undesired, 
        // but here we want to log search param changes too)
        if (previousPath.current === currentPath) return;

        const trackActivity = async () => {
            try {
                await fetch('/api/user/track', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        action: 'page_view',
                        path: currentPath,
                        fromPath: previousPath.current || document.referrer || 'direct',
                        metadata: {
                            title: document.title
                        }
                    })
                });
            } catch (error) {
                // Silently fail to not disturb user
                console.error('Failed to log activity:', error);
            }
        };

        trackActivity();
        previousPath.current = currentPath;

    }, [pathname, searchParams, session]);

    return null; // This component doesn't render anything
}
