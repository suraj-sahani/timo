"use client";

import { useEffect } from "react";

/**
 * Detects the visitor's timezone and stores it in a cookie.
 * This cookie is read by server components to display times correctly.
 *
 * Uses Intl.DateTimeFormat which is supported in all modern browsers.
 * The cookie is set to expire in 1 year and is accessible server-side.
 */
export function TimezoneDetector() {
  useEffect(() => {
    (async () => {
      try {
        const timezone = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/timezone`,
        );

        if (!timezone.ok) {
          throw new Error("Failed to get user's timezone");
        }
      } catch (error) {
        console.error("Failed to get user's timezone:", error);
      }
    })();
  }, []);

  // Renders nothing - just sets the cookie
  return null;
}
