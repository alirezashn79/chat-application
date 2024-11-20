import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { ReactNode } from "react";
import AuthCardFooter from "@/components/template/auth/AuthCardFooter.tsx";

interface AuthCardProps {
  children: ReactNode;
  variant: "REGISTER" | "LOGIN";
}
export default function AuthCard({ children, variant }: AuthCardProps) {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="capitalize">{variant.toLowerCase()}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <AuthCardFooter variant={variant} />
    </Card>
  );
}
