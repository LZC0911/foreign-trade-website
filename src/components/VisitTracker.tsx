"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function VisitTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Track page visit
    const trackVisit = async () => {
      try {
        await fetch('/api/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            page: pathname,
            referer: document.referrer,
          }),
          keepalive: true,
        });
      } catch (e) {
        // Silently fail - tracking shouldn't affect UX
      }
    };

    // Delay slightly to not block initial render
    const timer = setTimeout(trackVisit, 1000);
    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
