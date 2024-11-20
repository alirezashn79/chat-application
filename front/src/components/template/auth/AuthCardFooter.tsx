import { CardFooter } from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router-dom";

interface AuthCardFooterProps {
  variant: "REGISTER" | "LOGIN";
}

export default function AuthCardFooter({ variant }: AuthCardFooterProps) {
  return (
    <CardFooter>
      <div className="flex items-center gap-x-2 text-sm">
        {variant === "REGISTER" ? (
          <>
            <p>Do you have any account?</p>
            <Button variant="ghost" size="sm">
              <Link to="/login">Login</Link>
            </Button>
          </>
        ) : (
          <>
            <p>Don't have an account?</p>
            <Button variant="ghost" size="sm">
              <Link to="/register">Register</Link>
            </Button>
          </>
        )}
      </div>
    </CardFooter>
  );
}
