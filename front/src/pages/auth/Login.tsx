import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/validators";
import { z } from "zod";
import AuthCard from "@/components/modules/AuthCard.tsx";
import { fireToast } from "@/utils/Toast.tsx";
import useMutation from "@/hooks/useMutation.ts";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Login() {
  /* ---------- hook ---------- */
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { execute, data, loading } = useMutation();
  const navigate = useNavigate();

  /* ---------- handler ---------- */
  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    execute({
      url: "/api/user/signin",
      body: values,
    });
  };

  useEffect(() => {
    if (data) {
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/", {
        replace: true,
      });
      fireToast("success", "successfully logged in");
    }
  }, [data, navigate]);

  return (
    <AuthCard variant="LOGIN">
      <Form {...form}>
        {
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize">email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="your email..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize">password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="your password..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={loading} type="submit">
              Submit
            </Button>
          </form>
        }
      </Form>
    </AuthCard>
  );
}
