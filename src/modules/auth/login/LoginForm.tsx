import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeOff, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { loginSchema, LoginSchema } from "@/lib/schemas/auth";
import { loginUser } from "@/services/auth.service";
import { useState } from "react";
import { useSessionStore } from "@/hooks/useSession";

const defaultValues = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<LoginSchema>({
    defaultValues,
    resolver: zodResolver(loginSchema),
  });

  const { setSession } = useSessionStore();

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const loginUserMutation = useMutation({
    mutationFn: (data: LoginSchema) => loginUser(data),
    onSuccess: ({ data }) => {
      toast.success("User logged in successfully");
      setSession(data);
      router.push("/movies");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const onSubmit = (data: LoginSchema) => {
    loginUserMutation.mutate(data);
  };

  return (
    <Form {...form}>
      <form className="pt-4 space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="">Email address</FormLabel>
              <FormControl onClick={() => form.clearErrors("email")}>
                <Input placeholder="E.g. example@gmail.com" {...field} />
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
              <FormLabel className="">Password</FormLabel>
              <FormControl onClick={() => form.clearErrors("password")}>
                <Input
                  placeholder="Enter password"
                  type={showPassword ? "text" : "password"}
                  {...field}
                  endIcon={
                    showPassword ? (
                      <EyeOff
                        className="h-10 w-10 p-3 text-secondary-dark cursor-pointer"
                        onClick={togglePassword}
                      />
                    ) : (
                      <Eye
                        className="h-10 w-10 p-3 text-secondary-dark cursor-pointer"
                        onClick={togglePassword}
                      />
                    )
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex w-full flex-col items-center justify-center gap-4 py-6">
          <Button
            className="w-72 rounded-3xl"
            size={"lg"}
            type="submit"
            variant="primary"
          >
            {loginUserMutation.isPending ? (
              <Loader className="mx-1 animate-spin" />
            ) : null}
            Sign in
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
