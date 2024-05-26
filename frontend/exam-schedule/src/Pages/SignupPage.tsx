import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logoImageTypoDark from "@/assets/images/logoExamifyTypoLight.png";
import logoImageTypo from "@/assets/images/logoExamifyTypoDark.png";
import logoImageWhite from "@/assets/images/logoExamifyTypoWhite.png";
import {ModeToggle} from "@/components/mode-toggle.tsx";
import { zodResolver } from "@hookform/resolvers/zod"
import {Controller, useForm} from "react-hook-form"
import { z } from "zod"
import {signupFormSchema} from "@/zod/schemas/signup-schema.ts";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
// import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
// import {cn} from "@/lib/utils.ts";
// import {Calendar} from "@/components/ui/calendar.tsx";
// import { format } from "date-fns";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {useAuth} from "@/context/AuthContext.tsx";
import {PasswordInput} from "@/components/PasswordInput.tsx";

export default function SignupPage() {

  const signupForm = useForm<z.infer<typeof signupFormSchema>>({
      resolver: zodResolver(signupFormSchema),
      defaultValues: {

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
                          <Input placeholder="Please enter your first name" type={"text"} {...field} />
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
                  name="phone"
                  render={({field}) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Please enter your phone number" type={"text"} {...field} />
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                  )}
              />
                {/*<FormField*/}
                {/*    control={signupForm.control}*/}
                {/*    name="role"*/}
                {/*    render={({ field }) => (*/}
                {/*        <FormItem>*/}
                {/*            <FormLabel>Role</FormLabel>*/}
                {/*            <FormControl>*/}
                {/*                <Select {...field}>*/}
                {/*                    <SelectTrigger id="role">*/}
                {/*                        <SelectValue placeholder="Select your role" />*/}
                {/*                    </SelectTrigger>*/}
                {/*                    <SelectContent position="popper">*/}
                {/*                        <SelectItem value="admin">Admin</SelectItem>*/}
                {/*                        <SelectItem value="user">User</SelectItem>*/}
                {/*                    </SelectContent>*/}
                {/*                </Select>*/}
                {/*            </FormControl>*/}
                {/*            <FormMessage />*/}
                {/*        </FormItem>*/}
                {/*    )}*/}
                {/*/>*/}
                <FormField
                    control={signupForm.control}
                    name="role"
                    render={({}) => (
                        <FormItem>
                            <FormLabel>Role</FormLabel>
                            <FormControl>
                                <Controller
                                    name="role"
                                    control={signupForm.control}
                                    render={({ field }) => (
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger id="role">
                                                <SelectValue placeholder="Select your role" />
                                            </SelectTrigger>
                                            <SelectContent position="popper">
                                                <SelectItem value="admin">Admin</SelectItem>
                                                <SelectItem value="user">User</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            </FormControl>

                        </FormItem>
                    )}
                />
              {/*<FormField*/}
              {/*    control={signupForm.control}*/}
              {/*    name="birthDate"*/}
              {/*    render={({field}) => (*/}
              {/*        <FormItem className="flex flex-col gap-y-2">*/}
              {/*          <FormLabel className="block mt-0.5">Birth Date</FormLabel>*/}
              {/*            <Popover>*/}
              {/*                <FormControl>*/}
              {/*                    <PopoverTrigger asChild>*/}
              {/*                        <Button*/}
              {/*                            variant="outline"*/}
              {/*                            className={cn(*/}
              {/*                                "text-left font-normal",*/}
              {/*                                !field.value && "text-muted-foreground"*/}
              {/*                            )}*/}
              {/*                        >*/}
              {/*                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mr-2 h-4 w-4">*/}
              {/*                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />*/}
              {/*                            </svg>*/}

              {/*                            {field.value ? (*/}
              {/*                                format(field.value, "dd/MM/yyyy")*/}
              {/*                            ) : (*/}
              {/*                                <span>Sélectionner une date</span>*/}
              {/*                            )}*/}
              {/*                        </Button>*/}
              {/*                    </PopoverTrigger>*/}
              {/*                </FormControl>*/}
              {/*                <PopoverContent className="p-0 px-3 flex items-center">*/}
              {/*                    <Calendar*/}
              {/*                        mode="single"*/}
              {/*                        selected={new Date(field.value)}*/}
              {/*                        onSelect={(date) => field.onChange(date && format(date, "yyyy-MM-dd"))}*/}
              {/*                        initialFocus*/}
              {/*                    />*/}
              {/*                </PopoverContent>*/}
              {/*            </Popover>*/}
              {/*          <FormMessage/>*/}
              {/*        </FormItem>*/}
              {/*    )}*/}
              {/*/>*/}
                <FormField
                    control={signupForm.control}
                    name="username"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="Please enter your username" type={"text"} {...field} />
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
  );
}
