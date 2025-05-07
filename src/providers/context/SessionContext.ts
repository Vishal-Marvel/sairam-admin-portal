import { createContext, useContext } from "react";

interface SessionContextType {
  token: string | null;
  setSession: (token: string) => void;
  clearSession: () => void;
  isTokenExpired: () => boolean | null;
}

export const SessionContext = createContext<SessionContextType>({
  token: null,
  setSession: () => {},
  clearSession: () => {},
  isTokenExpired: () => false,
});

export const useSession = () => {
  const context = useContext(SessionContext);

  if (context === undefined)
    throw new Error("useSession must be used within a SessionProvider");

  return context;
};
