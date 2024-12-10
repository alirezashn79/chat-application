import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { UserContextProvider } from "@/contexts/user.tsx";
import { SocketContextProvider } from "@/contexts/socket.tsx";
import { ThemeContextProvider } from "@/contexts/theme.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeContextProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <UserContextProvider>
          <SocketContextProvider>
            <App />
          </SocketContextProvider>
        </UserContextProvider>
      </ThemeContextProvider>
    </BrowserRouter>
  </StrictMode>,
);
