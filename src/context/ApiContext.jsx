"use client";
import React, { useState, useEffect, useRef } from "react";

export const ApiProvider = ({ children }) => {
  const [activeCount, setActiveCount] = useState(0);
  const activeRef = useRef(0);
  const scheduledRef = useRef(false);

  const scheduleStateSync = () => {
    if (scheduledRef.current) return;
    scheduledRef.current = true;
    // schedule async sync to avoid setState during render phases
    setTimeout(() => {
      scheduledRef.current = false;
      setActiveCount(activeRef.current);
    }, 0);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const originalFetch = window.fetch.bind(window);

    const wrappedFetch = async (input, init = {}) => {
      // update ref synchronously, but schedule state update asynchronously
      activeRef.current = activeRef.current + 1;
      scheduleStateSync();
      try {
        // Normalize headers
        let url = input;
        let options = { ...(init || {}) };

        // If input is a Request, extract values
        if (input instanceof Request) {
          url = input.url;
          options = {
            method: input.method,
            headers: Object.fromEntries(input.headers.entries()),
            body: input.body,
            mode: input.mode,
            credentials: input.credentials,
            cache: input.cache,
            redirect: input.redirect,
            referrer: input.referrer,
            referrerPolicy: input.referrerPolicy,
            integrity: input.integrity,
          };
        }

        options.headers = options.headers || {};

        // Attach Authorization header automatically when token present
        try {
          const token = localStorage.getItem("token");
          if (token && !((options.headers || {})["Authorization"])) {
            options.headers = {
              ...options.headers,
              Authorization: `Bearer ${token}`,
            };
          }
        } catch (e) {
          // localStorage may be unavailable in some environments, ignore
        }

        const response = await originalFetch(url, options);
        return response;
      } finally {
        activeRef.current = Math.max(0, activeRef.current - 1);
        scheduleStateSync();
      }
    };

    window.fetch = wrappedFetch;

    return () => {
      window.fetch = originalFetch;
    };
  }, []);

  return (
    <>
      {children}
      {activeCount > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-indigo-500" />
        </div>
      )}
    </>
  );
};

export default ApiProvider;
