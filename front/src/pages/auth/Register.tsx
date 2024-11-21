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
import { registerSchema } from "@/validators";
import { z } from "zod";
import AuthCard from "@/components/modules/AuthCard.tsx";
import { fireToast } from "@/utils/Toast.tsx";
import useMutation from "@/hooks/useMutation.ts";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

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
  const { execute, data, loading } = useMutation();
  const navigate = useNavigate();

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
      navigate("/", {
        replace: true,
      });
      fireToast("success", "successfully registered!");
    }
  }, [data, navigate]);

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
