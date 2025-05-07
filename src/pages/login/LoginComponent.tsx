import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { AlertCircle } from "lucide-react";
import { useSession } from "@/providers/context/SessionContext";
import PasswordInput from "@/components/PasswordInput";
import { useNavigate } from "react-router-dom";
import { useLoader } from "@/hooks/use-loader";
import { axiosInstance } from "@/lib/axiosConfig";
import { useEffect } from "react";

const formSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

const LoginComponent = () => {
  const { startLoad, stopLoad } = useLoader();
  const router = useNavigate();

  const { setSession } = useSession();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      
      startLoad();
      const response = await axiosInstance.post("/auth/login", {
        userId: form.getValues("email"),
        password: form.getValues("password"),
      });
      setSession(response.data.jwt);
      router("/report");
      form.reset();
    } catch (error: any) {
      const errorMessage = await error.response.data;

      toast(
        <span className="flex gap-5">
          <AlertCircle /> {errorMessage.message}
        </span>
      );
    } finally {
      stopLoad();
    }
  };

  return (
    <Card className=" shadow-md bg-white/80 rounded-2xl w-1/3">
      <CardHeader>
        <CardTitle>Log In</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid w-full items-center gap-10 ">
              <FormField
                disabled={isLoading}
                name={"email"}
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <span className="flex items-center gap-5">
                        <Input
                          className=" bg-slate-300 shadow-inner"
                          disabled={isLoading}
                          placeholder="Email"
                          type="text"
                          {...field}
                        />
                      </span>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                disabled={isLoading}
                name={"password"}
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        className=" bg-slate-300 shadow-inner"
                        disabled={isLoading}
                        placeholder="Enter Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col space-y-1.5 pt-2">
              <Button type="submit" disabled={isLoading} variant={"primary"}>
                Log In
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
      {/* <CardFooter className="flex text-center ">
          <div className="flex flex-col items-center w-full justify-center gap-3">
            Haven't Signed up yet?{" "}
            <Link to={"/student/signin"}>
              <Button variant="primary" className="p-2">
                Sign in
              </Button>
            </Link>
          </div>
          <div className="flex flex-col items-center w-full justify-center gap-3">
            Forgot password?{" "}
            <Link to={"/forgetpass?student=1"}>
              <Button variant="primary" className="p-2">
                Click here
              </Button>
            </Link>
          </div>
        </CardFooter> */}
    </Card>
  );
};

export default LoginComponent;
