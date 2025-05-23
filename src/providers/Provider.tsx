import { useEffect, useState } from "react";
import { SessionContext } from "@/providers/context/SessionContext";
import { useLocation, useNavigate } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { LoaderModal } from "@/components/Loader";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { ScrollArea } from "@/components/ui/scroll-area";

export const publicRoutes = ["/", "/login"];

export function Providers({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    isTokenExpired();
    if (!token && !publicRoutes.includes(pathname)) {
      navigate("/");
    }
  }, [pathname, token]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      //@ts-ignore
    }
  }, [pathname]);

  const setSession = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    //@ts-ignore
  };

  const clearSession = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/");
  };

  const isTokenExpired = () => {
    if (token) {
      let exp;

      try {
        exp = JSON.parse(atob(token.split(".")[1]));
      } catch (e) {
        return null;
      }
      if (exp.exp * 1000 < Date.now()) {
        clearSession();
        return true;
      }
      return false;
    }
    return true;
  };
  return (
    <SessionContext.Provider
      value={{
        token,
        isTokenExpired,
        clearSession,
        setSession,
      }}
    >
      <Toaster position="top-right" />
      <LoaderModal />
      <SpeedInsights />
      <ScrollArea className="h-screen">{children}</ScrollArea>
      <ScrollToTopButton />
    </SessionContext.Provider>
  );
}
