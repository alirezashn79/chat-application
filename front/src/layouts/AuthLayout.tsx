import { useUserContext } from "@/contexts/user";
import { Navigate, Outlet } from "react-router-dom";

export default function AuthLayout() {
  /* ---------- context ---------- */
  const { user } = useUserContext();
  return user ? (
    <Navigate to="/" replace />
  ) : (
    <div className="container flex-center h-screen">
      <Outlet />
    </div>
  );
}
