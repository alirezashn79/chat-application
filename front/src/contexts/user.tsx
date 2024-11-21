import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";
import { User } from "@/types";

interface UserContextProps {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}

interface UserContextProviderProps {
  children: ReactNode;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) throw new Error("userContext not found");
  return context;
}

export function UserContextProvider({ children }: UserContextProviderProps) {
  /* ---------- hook ---------- */
  const [user, setUser] = useState<User | null>(null);

  const userContextProviderValue = useMemo(
    () => ({ user, setUser }),
    [user, setUser],
  );

  return (
    <UserContext.Provider value={userContextProviderValue}>
      {children}
    </UserContext.Provider>
  );
}
