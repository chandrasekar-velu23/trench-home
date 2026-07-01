"use client";

import React, { createContext, useContext, useState, useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Loading from "@/app/loading";

const NavigationLoadingContext = createContext<{
  setIsLoading: (loading: boolean) => void;
}>({
  setIsLoading: () => {},
});

export const useNavigationLoading = () => useContext(NavigationLoadingContext);

function LoaderTrigger() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { setIsLoading } = useNavigationLoading();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600); // 600ms of premium animation transition window

    return () => clearTimeout(timer);
  }, [pathname, searchParams, setIsLoading]);

  return null;
}

export default function NavigationLoaderProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(false);

  // Intercept standard link clicks to trigger loader instantly on click
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      
      if (
        anchor && 
        anchor.href && 
        anchor.host === window.location.host && 
        !anchor.getAttribute("download") &&
        anchor.target !== "_blank" &&
        !e.ctrlKey &&
        !e.metaKey &&
        !e.shiftKey &&
        !e.altKey
      ) {
        const currentHref = window.location.href;
        const targetHref = anchor.href;
        
        // Show loader instantly on click for internal non-anchor pages
        if (currentHref !== targetHref && !targetHref.includes("#")) {
          setIsLoading(true);
        }
      }
    };

    document.addEventListener("click", handleLinkClick);
    return () => document.removeEventListener("click", handleLinkClick);
  }, []);

  return (
    <NavigationLoadingContext.Provider value={{ setIsLoading }}>
      {isLoading && <Loading />}
      <Suspense fallback={null}>
        <LoaderTrigger />
      </Suspense>
      {children}
    </NavigationLoadingContext.Provider>
  );
}
