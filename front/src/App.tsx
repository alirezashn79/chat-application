import AppRoutes from "./routes";
import { Toaster } from "@/components/ui/sonner";

export default function App() {
  return (
    <>
      <AppRoutes />
      <Toaster />
    </>
  );
}
