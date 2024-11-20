import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="container flex-center h-screen">
      <Outlet />
    </div>
  );
}
