import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog.tsx";
import { useUserContext } from "@/contexts/user.tsx";
import useMutation from "@/hooks/useMutation.ts";
import { useNavigate } from "react-router-dom";

export default function LogoutComponent() {
  /* ---------- context ---------- */
  const { setUser } = useUserContext();

  /* ---------- hook ---------- */
  const { execute } = useMutation();
  const navigate = useNavigate();

  /* ---------- handler ---------- */
  const handleLogout = () => {
    execute({
      url: "/api/user/signout",
      body: null,
    });
    setUser(null);
    navigate("/login", { replace: true });
  };
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Do you want to log out?</AlertDialogTitle>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={handleLogout}>Logout</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
