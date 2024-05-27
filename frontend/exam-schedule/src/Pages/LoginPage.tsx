import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import {ModeToggle} from "@/components/mode-toggle.tsx";
import logoImageTypoDark from "@/assets/images/logoExamifyTypoLight.png";
import logoImageTypo from "@/assets/images/logoExamifyTypoDark.png";
import logoImageWhite from "@/assets/images/logoExamifyTypoWhite.png";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {loginFormSchema} from "@/zod/schemas/login-schema.ts";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {useAuth} from "@/context/AuthContext.tsx";
import {PasswordInput} from "@/components/PasswordInput.tsx";



export default function LoginPage() {
  const loginForm = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {

    }
  })
    const { loginUser } = useAuth();


    const handleLogin = (values: z.infer<typeof loginFormSchema>) => {
        loginUser(values.email, values.password);
    }
  return (
    <div className="w-full h-screen content-center md:content-stretch lg:grid lg:grid-cols-2">
      <div className="relative flex items-center justify-center py-12">
        <span className={"absolute top-0 right-0 p-10"}>
          <ModeToggle/>
        </span>
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <div className="h-16 flex justify-start">
              <img src={logoImageTypo} className="hidden dark:block h-full w-full object-contain"/>
              <img src={logoImageTypoDark} className="dark:hidden h-full w-full object-contain"/>
            </div>
            <h1 className="text-3xl font-bold">Welcome Back</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <Form {...loginForm}>
            <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-8">
                <div className="grid gap-4">
                  <FormField
                      control={loginForm.control}
                      name="email"
                      render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="m@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                      )}
                  />
                  <FormField
                      control={loginForm.control}
                      name="password"
                      render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <PasswordInput {...field}/>
                            </FormControl>
                            <FormMessage />
                            <FormDescription>
                              <Link to="/forgot-password" className="ml-auto inline-block text-sm underline">
                                Forgot your password?
                              </Link>
                            </FormDescription>
                          </FormItem>
                      )}
                  />
                  <Button type="submit" className="w-full">Login</Button>
          </div>
        </form>
      </Form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden lg:flex flex-col gap-y-6 justify-center px-36 bg-gradient-to-b from-[#442bc6] to-[#534dcb] lg:block">
        <div className="h-16">
          <img src={logoImageWhite} className="h-full object-contain"/>
        </div>
        <span className="font-medium text-4xl px-3.5 text-white">Welcome to Examify Your Journey Starts Here</span>
        <p className={"text-sm px-3.5 text-white"}>
            Your gateway to seamless exam management. Log in now to streamline your exam scheduling and monitor professors attendance
            effortlessly. Enhance the efficiency of your educational institution with Examify.
        </p>
      </div>
    </div>
  );
}
