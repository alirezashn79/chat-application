import AuthCard from "@/components/modules/auth/AuthCard.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { useUserContext } from "@/contexts/user.tsx";
import useMutation from "@/hooks/useMutation.ts";
import { User } from "@/types";
import { fireToast } from "@/utils/Toast.tsx";
import { registerSchema } from "@/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Register() {
  /* ---------- hook ---------- */
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });
  const { execute, data, loading } = useMutation<User>();

  /* ---------- context ---------- */
  const { setUser } = useUserContext();

  /* ---------- handler ---------- */
  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    execute({
      url: "/api/user/signup",
      body: values,
    });
  };
  useEffect(() => {
    if (data) {
      localStorage.setItem("user", JSON.stringify(data));

      setUser(data);

      fireToast("success", "successfully registered!");

      window.location.replace("/");
    }
  }, [data, setUser]);

  return (
    <AuthCard variant="REGISTER">
      <Form {...form}>
        {
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize">first name</FormLabel>
                  <FormControl>
                    <Input placeholder="your first name..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize">last name</FormLabel>
                  <FormControl>
                    <Input placeholder="your last name..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
