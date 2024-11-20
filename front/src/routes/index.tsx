import { Route, Routes } from "react-router-dom";
import Register from "@/pages/auth/Register.tsx";
import AuthLayout from "@/layouts/AuthLayout.tsx";
import Login from "@/pages/auth/Login.tsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}
