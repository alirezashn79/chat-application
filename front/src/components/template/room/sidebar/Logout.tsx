import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog.tsx";
import useMutation from "@/hooks/useMutation.ts";

export default function LogoutComponent() {
  /* ---------- hook ---------- */
  const { execute } = useMutation();

  /* ---------- handler ---------- */
  const handleLogout = () => {
    execute({
      url: "/api/user/signout",
      body: null,
    });
    localStorage.removeItem("user");
    window.location.replace("/login");
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
