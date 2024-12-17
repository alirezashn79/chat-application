import { useUserContext } from "@/contexts/user";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  /* ---------- context ---------- */
  const { user } = useUserContext();

  return user ? <Outlet /> : <Navigate to="/login" replace />;
}
