"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // check localStorage immediately
    const user = localStorage.getItem("user");
    if (!user) {
      router.replace("/login"); // replace avoids adding extra history
    } else {
      setIsAuthenticated(true);
    }
    setIsChecked(true);
  }, [router]);

  // render nothing until check is done
  if (!isChecked) return null;

  if (!isAuthenticated) return null;

  return <>{children}</>;
};

export default PrivateRoute;
