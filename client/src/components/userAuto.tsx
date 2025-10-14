"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const useAutoLogoutOnLeave = () => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (!url.startsWith("/admin")) {
        localStorage.removeItem("user");
      }
    };

    const observer = new MutationObserver(() => {
      const currentPath = window.location.pathname;
      if (!currentPath.startsWith("/admin")) {
        localStorage.removeItem("user");
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);
};

export default useAutoLogoutOnLeave;
