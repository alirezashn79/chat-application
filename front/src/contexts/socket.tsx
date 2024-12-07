import { io, Socket } from "socket.io-client";
import { createContext, ReactNode, useEffect, useMemo, useState } from "react";
import { useUserContext } from "@/contexts/user.tsx";
import { BASE_URL } from "@/helpers/constants.ts";

interface SocketContextProps {
  socket: Socket | null;
}

const SocketContext = createContext<SocketContextProps | undefined>(undefined);

export function SocketContextProvider({ children }: { children: ReactNode }) {
  /* ---------- state ---------- */
  const [socket, setSocket] = useState<Socket | null>(null);

  /* ---------- context ---------- */
  const { user } = useUserContext();

  /* ---------- hook ---------- */
  const socketContextProviderValue = useMemo(() => ({ socket }), [socket]);

  /* ---------- life cycle ---------- */
  useEffect(() => {
    if (user) {
      const _socket = io(BASE_URL);
      setSocket(_socket);
      console.log(_socket);
    } else {
      socket?.close();
      setSocket(null);
    }
  }, [user]);

  return (
    <SocketContext.Provider value={socketContextProviderValue}>
      {children}
    </SocketContext.Provider>
  );
}
