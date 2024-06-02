import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logoImageTypoDark from "@/assets/images/logoExamifyTypoLight.png";
import logoImageTypo from "@/assets/images/logoExamifyTypoDark.png";
import logoImageWhite from "@/assets/images/logoExamifyTypoWhite.png";
import {ModeToggle} from "@/components/mode-toggle.tsx";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm} from "react-hook-form"
import { z } from "zod"
import {signupFormSchema} from "@/zod/schemas/signup-schema.ts";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
// import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
// import {cn} from "@/lib/utils.ts";
// import {Calendar} from "@/components/ui/calendar.tsx";
// import { format } from "date-fns";

import {useAuth} from "@/context/AuthContext.tsx";
import {PasswordInput} from "@/components/PasswordInput.tsx";

export default function SignupPage() {

  const signupForm = useForm<z.infer<typeof signupFormSchema>>({
      resolver: zodResolver(signupFormSchema),
      defaultValues: {
          profilePhoto: "",
          email: "",
          firstName: "",
          lastName: "",
          password: "",
          passwordConfirmation: ""
      }
  })
    const { registerUser } = useAuth();
  function onSubmit(values: z.infer<typeof signupFormSchema>) {
    registerUser(values);
  }
    
  return (
    <div className="w-full flex md:h-screen content-center md:content-stretch lg:grid-cols-2">
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
      <div className="relative flex items-center justify-center w-full py-6 px-10 md:px-16 xl:px-24">
        <span className={"absolute top-0 right-0 p-4 md:p-10"}>
          <ModeToggle/>
        </span>
        <div className="w-full">
            <div className="grid gap-y-6">
                <div className="grid gap-2 text-center">
                    <div className="h-16">
                        <img src={logoImageTypo} className="hidden dark:block h-full w-full object-contain"/>
                        <img src={logoImageTypoDark} className="dark:hidden h-full w-full object-contain"/>
                    </div>
                    <h1 className="text-3xl font-bold">Welcome to Examify</h1>
                    <p className="text-balance text-muted-foreground">
                        Enter your information
                    </p>
                </div>
                {/*<Form {...signupForm}>*/}

                <Form {...signupForm}>
                    <form onSubmit={signupForm.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={signupForm.control}
                                name="firstName"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>First Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Please enter your first name"
                                                   type={"text"} {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={signupForm.control}
                                name="lastName"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Last Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Please enter your last name" type={"text"} {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={signupForm.control}
                                name="email"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="user@example.com" type={"text"} {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={signupForm.control}
                                name="password"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <PasswordInput {...field}/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={signupForm.control}
                                name="passwordConfirmation"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Password Confirmation</FormLabel>
                                        <FormControl>
                                            <PasswordInput {...field}/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" className="w-full">
                                Confirm
                            </Button>
                            <Button variant="outline" className="w-full">
                                Cancel
                            </Button>
                        </div>
                    </form>
                </Form>
                <div className="mt-4 text-center text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="underline">
                Sign in
            </Link>
        </div>
    </div>
    </div>
    </div>
    </div>
    )
    } ;
