"use client";

import { useEffect } from "react";

const useAutoLogoutOnLeave = () => {
  useEffect(() => {
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
