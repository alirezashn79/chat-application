import { io, Socket } from "socket.io-client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useUserContext } from "@/contexts/user.tsx";
import { BASE_URL } from "@/helpers/constants.ts";

interface SocketContextProps {
  socket: Socket | null;
  onlineUsers: Array<string> | null;
}

const SocketContext = createContext<SocketContextProps | undefined>(undefined);

export function useSocketContext() {
  const context = useContext(SocketContext);
  if (!context) throw new Error("socketContext not found");
  return context;
}

export function SocketContextProvider({ children }: { children: ReactNode }) {
  /* ---------- state ---------- */
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<Array<string> | null>(null);

  /* ---------- context ---------- */
  const { user } = useUserContext();

  /* ---------- hook ---------- */
  const socketContextProviderValue = useMemo(
    () => ({ socket, onlineUsers }),
    [socket, onlineUsers]
  );

  /* ---------- life cycle ---------- */
  useEffect(() => {
    if (user) {
      const _socket = io(BASE_URL, {
        query: {
          userId: user.id,
        },
      });
      setSocket(_socket);

      _socket?.on("getOnlineUsers", (onlineUsers: Array<string>) => {
        setOnlineUsers(onlineUsers);
      });
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [user]);

  return (
    <SocketContext.Provider value={socketContextProviderValue}>
      {children}
    </SocketContext.Provider>
  );
}
