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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const defaultValues = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const form = useForm<LoginSchema>({
    defaultValues,
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginSchema) => {
    console.log(data);
  };

  return (
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
            {/* {requestOtp.isPending || isPending ? (
                <Loader className="mx-1 animate-spin" />
              ) : null} */}
            Sign up
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
