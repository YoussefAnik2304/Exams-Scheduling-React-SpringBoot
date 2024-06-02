import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@/components/ui/separator.tsx";
import { useProfs } from "@/context/ProfsContext.tsx";
import { PasswordInput } from "@/components/PasswordInput.tsx";
import { Prof } from "@/types/prof.ts";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import createProfFormSchema from "@/zod/schemas/prof-schema.ts";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function CreateProfForm() {

    const { createProf } = useProfs();
    const createProfForm = useForm<z.infer<typeof createProfFormSchema>>({
        resolver: zodResolver(createProfFormSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            passwordConfirmation: '',
            group: '',
            filiere: '',
            departement: '',
            enabled: false,
            accountNonExpired: false,
            credentialsNonExpired: false,
            coursesTeaching: [],
        }
    });

    function onSubmit(values: z.infer<typeof createProfFormSchema>) {
        const { email, firstName, lastName, password, group, departement, filiere, enabled, accountNonExpired, credentialsNonExpired } = values;
        const submittedProf: Prof = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            group: group,
            departement: departement,
            filiere: filiere,
            password: password,
            enabled: enabled,
            accountNonExpired: accountNonExpired,
            credentialsNonExpired: credentialsNonExpired,
        }
        createProf(submittedProf);
    }

    return (
        <Card className="bg-card border-0 shadow-none p-2 md:p-4 lg:p-10">
            <CardHeader className="p-3 md:p-6 mb-4">
                <CardTitle className="flex gap-x-2 items-center">
                    <span className="text-2xl md:text-3xl">Professor Creation</span>
                </CardTitle>
                <CardDescription className="text-sm md:text-lg">Please fill the form with correct information</CardDescription>
            </CardHeader>
            <CardContent className="p-3 md:p-6">
                <Form {...createProfForm}>
                    <form onSubmit={createProfForm.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="mb-10">
                            <div className="flex flex-nowrap items-center gap-x-4 mb-6">
                                <div className="border-b w-[50px]" />
                                <span className="text-md whitespace-nowrap text-foreground/80">Prof Information</span>
                                <div className="border-b w-full" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-4 gap-y-4">
                                <FormField
                                    control={createProfForm.control}
                                    name="firstName"
                                    render={({ field }) => (
                                        <FormItem className="md:col-start-1">
                                            <FormLabel>First Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Please enter your first name" type="text" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={createProfForm.control}
                                    name="lastName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Last Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Please enter your last name" type="text" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={createProfForm.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="user@example.com" type="email" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={createProfForm.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <PasswordInput {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={createProfForm.control}
                                    name="passwordConfirmation"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password Confirmation</FormLabel>
                                            <FormControl>
                                                <PasswordInput {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={createProfForm.control}
                                    name="filiere"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Filiere</FormLabel>
                                            <FormControl>
                                                <Select value={field.value} onValueChange={field.onChange}>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select Filiere" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectItem value="GI">GI</SelectItem>
                                                            <SelectItem value="ID">ID</SelectItem>
                                                            <SelectItem value="GC">GC</SelectItem>
                                                            <SelectItem value="GEE">GEE</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={createProfForm.control}
                                    name="departement"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Departement</FormLabel>
                                            <FormControl>
                                                <Select value={field.value} onValueChange={field.onChange}>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select Departement" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectItem value="Dept1">Dept1</SelectItem>
                                                            <SelectItem value="Dept2">Dept2</SelectItem>
                                                            <SelectItem value="Dept3">Dept3</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={createProfForm.control}
                                    name="group"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Group</FormLabel>
                                            <FormControl>
                                                <Select value={field.value} onValueChange={field.onChange}>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select Group" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectItem value="Group1">Group1</SelectItem>
                                                            <SelectItem value="Group2">Group2</SelectItem>
                                                            <SelectItem value="Group3">Group3</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={createProfForm.control}
                                    name="enabled"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Enabled</FormLabel>
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={(checked) => field.onChange(checked)}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={createProfForm.control}
                                    name="accountNonExpired"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Account Non Expired</FormLabel>
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={(checked) => field.onChange(checked)}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={createProfForm.control}
                                    name="credentialsNonExpired"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Credentials Non Expired</FormLabel>
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={(checked) => field.onChange(checked)}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <Separator />
                        <div className="flex justify-end">
                            <Button onClick={createProfForm.handleSubmit(onSubmit)} className="space-x-2 w-full md:w-fit">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                                <span>Create</span>
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
