import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

import { SignUpSchema, signupSchema } from "@/lib/schemas/auth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { registerUser } from "@/services/auth.service";
import { Loader } from "lucide-react";

const defaultValues = {
  email: "",
  name: "",
  password: "",
};

const RegisterForm = () => {
  const router = useRouter();
  const form = useForm<SignUpSchema>({
    defaultValues,
    resolver: zodResolver(signupSchema),
  });

  const registerUserMutation = useMutation({
    mutationFn: (data: SignUpSchema) => registerUser(data),
    onSuccess: () => {
      toast.success("User created successfully");
      router.push("/login");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const onSubmit = (data: SignUpSchema) => {
    registerUserMutation.mutate(data);
  };

  return (
    <div>
      <Form {...form}>
        <form className="pt-4" onSubmit={form.handleSubmit(onSubmit)}>
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="">Username</FormLabel>
                <FormControl onClick={() => form.clearErrors("name")}>
                  <Input placeholder="Enter username" {...field} />
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
                  <Input placeholder="Enter password" {...field} />
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
              {registerUserMutation.isPending ? (
                <Loader className="mx-1 animate-spin" />
              ) : null}
              Sign up
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default RegisterForm;
