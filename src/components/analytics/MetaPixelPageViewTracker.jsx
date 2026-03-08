"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function MetaPixelPageViewTracker() {
  const pathname = usePathname();
  const hasMounted = useRef(false);

  useEffect(() => {
    // Initial page view is already tracked in the base Meta Pixel snippet.
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    if (typeof window !== "undefined" && typeof window.fbq === "function") {
      window.fbq("track", "PageView");
    }
  }, [pathname]);

  return null;
}
