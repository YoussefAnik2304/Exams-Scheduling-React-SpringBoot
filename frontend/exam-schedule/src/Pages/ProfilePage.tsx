import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {cn} from "@/lib/utils.ts";
import {format} from "date-fns";
import {Calendar} from "@/components/ui/calendar.tsx";
import {PasswordInput} from "@/components/PasswordInput.tsx";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {editProfileFormSchema} from "@/zod/schemas/profile-schema.ts";
import {useAuth} from "@/context/AuthContext.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {GetDecodedToken} from "@/helpers/Helpers.tsx";

export default function ProfilePage() {
    const {updateUser} = useAuth();
    const role = GetDecodedToken().role;
    const userId = GetDecodedToken().UserId;
    const user = JSON.parse(localStorage.getItem("user")!);
    const [currentImage, setCurrentImage] = useState<File>(new File([], ""));
    const [previewImage, setPreviewImage] = useState<string>("");
    const editProfileForm = useForm<z.infer<typeof editProfileFormSchema>>({
        resolver: zodResolver(editProfileFormSchema),
        defaultValues: {

        }
    })
    function onSubmit(values: z.infer<typeof editProfileFormSchema>) {
        updateUser(values, userId);
    }

    const selectProfileImage = (event: React.ChangeEvent<HTMLInputElement>) : void => {
        if(!event.target.files || event.target.files.length === 0) {
            return;
        }
        const selectedFile = event.target.files[0] as File;
        setCurrentImage(selectedFile);

    };
    useEffect(() => {
        setPreviewImage(URL.createObjectURL(currentImage));
        editProfileForm.setValue("profilImage", currentImage);
    }, [currentImage]);

    return(
        <Card className="bg-transparent border-0 shadow-none">
            <div className="flex flex-col md:flex-row justify-between md:items-center">
                <CardHeader className="px-4 md:px-6">
                    <CardTitle className="flex gap-x-2 items-center">
                        <span className="text-2xl md:text-3xl">Your Profile</span>
                    </CardTitle>
                    <CardDescription className="text-sm md:text-lg">Profile Information and Overview</CardDescription>
                </CardHeader>
                <div className="flex justify-end gap-x-2 p-3 md:p-6 pt-0 md:pt-6">

                </div>
            </div>
            <CardContent className="p-4 md:p-6">
                <div className="space-y-4">
                    <Card className="bg-card border-0 shadow-none rounded-xl overflow-hidden">
                        {/*<CardHeader className="relative w-full h-28 md:h-36 bg-gradient-to-r from-pink-400 to-blue-500 mb-12 md:mb-16">*/}
                        {/*    <div className="h-28  md:h-36 w-28  md:w-36 border-4 border-white rounded-full absolute top-1/2 left-6 md:left-12">*/}
                        {/*        <img className="h-full w-full object-cover rounded-full" src={user?.profilPhoto ? HOST + user.profilPhoto : "/placeholder-user.jpg"}/>*/}
                        {/*    </div>*/}
                        {/*</CardHeader>*/}
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <p className="text-xl md:text-3xl font-medium mb-4">{user?.firstName + " " + user?.lastName}<Badge
                                    className="ml-4">{role}</Badge></p>

                                <Form {...editProfileForm}>
                                    <Dialog>
                                        <DialogTrigger className="w-fit">
                                            <Button className="space-x-1.5 rounded-lg w-fit">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                     strokeWidth={1.5}
                                                     stroke="currentColor" className="size-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"/>
                                                </svg>
                                                <span>Edit Profile</span>
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-2xl max-h-screen">
                                            <DialogHeader>
                                                <DialogTitle>Edit Profile</DialogTitle>
                                                <DialogDescription>
                                                    Make changes to Your Profile here. Click save when you're done.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <form onSubmit={editProfileForm.handleSubmit(onSubmit)}
                                                  className="space-y-6">
                                                <ScrollArea className="h-96">
                                                    <div
                                                        className="p-4 grid grid-cols-1 md:grid-cols-2 md:gap-x-2 gap-y-4">
                                                        <FormField
                                                            control={editProfileForm.control}
                                                            name="profilImage"
                                                            render={() => (
                                                                <FormItem className="md:col-span-1">
                                                                    <FormLabel>Profile Image</FormLabel>
                                                                    <div
                                                                        className="relative flex justify-center items-center h-28 md:h-52 bg-muted/50 rounded-xl overflow-hidden">
                                                                <span className="z-40">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                         viewBox="0 0 24 24" strokeWidth={1.5}
                                                                         stroke="currentColor" className="w-6 h-6">
                                                                      <path strokeLinecap="round" strokeLinejoin="round"
                                                                            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"/>
                                                                    </svg>
                                                                </span>
                                                                        <FormControl
                                                                            className="absolute top-0 left-0 h-28 md:h-52 rounded-full">
                                                                            <Input type="file"
                                                                                   onChange={selectProfileImage}
                                                                                   className="opacity-0 z-40"/>
                                                                        </FormControl>

                                                                        {currentImage.size > 0 && (<img
                                                                            className="absolute top-0 left-0 w-full h-full object-cover text-sm"
                                                                            src={previewImage} alt="thumbnail"/>)}
                                                                    </div>
                                                                    <FormMessage/>
                                                                </FormItem>
                                                            )}
                                                        />
                                                        <FormField
                                                            control={editProfileForm.control}
                                                            name="firstName"
                                                            render={({field}) => (
                                                                <FormItem className="col-start-1">
                                                                    <FormLabel>First Name</FormLabel>
                                                                    <FormControl>
                                                                        <Input
                                                                            placeholder="Please enter your first name"
                                                                            type={"text"} {...field} />
                                                                    </FormControl>
                                                                    <FormMessage/>
                                                                </FormItem>
                                                            )}
                                                        />
                                                        <FormField
                                                            control={editProfileForm.control}
                                                            name="lastName"
                                                            render={({field}) => (
                                                                <FormItem>
                                                                    <FormLabel>Last Name</FormLabel>
                                                                    <FormControl>
                                                                        <Input placeholder="Please enter your last name"
                                                                               type={"text"} {...field} />
                                                                    </FormControl>
                                                                    <FormMessage/>
                                                                </FormItem>
                                                            )}
                                                        />
                                                        <FormField
                                                            control={editProfileForm.control}
                                                            name="phone"
                                                            render={({field}) => (
                                                                <FormItem>
                                                                    <FormLabel>Phone Number</FormLabel>
                                                                    <FormControl>
                                                                        <Input
                                                                            placeholder="Please enter your phone number"
                                                                            type={"text"} {...field} />
                                                                    </FormControl>
                                                                    <FormMessage/>
                                                                </FormItem>
                                                            )}
                                                        />
                                                        <FormField
                                                            control={editProfileForm.control}
                                                            name="birthDate"
                                                            render={({field}) => (
                                                                <FormItem className="flex flex-col gap-y-2">
                                                                    <FormLabel className="block mt-0.5">Birth
                                                                        Date</FormLabel>
                                                                    <Popover>
                                                                        <FormControl>
                                                                            <PopoverTrigger asChild>
                                                                                <Button
                                                                                    variant="outline"
                                                                                    className={cn(
                                                                                        "text-left font-normal",
                                                                                        !field.value && "text-muted-foreground"
                                                                                    )}
                                                                                >
                                                                                    <svg
                                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                                        fill="none" viewBox="0 0 24 24"
                                                                                        strokeWidth={1.5}
                                                                                        stroke="currentColor"
                                                                                        className="mr-2 h-4 w-4">
                                                                                        <path strokeLinecap="round"
                                                                                              strokeLinejoin="round"
                                                                                              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"/>
                                                                                    </svg>

                                                                                    {field.value ? (
                                                                                        format(field.value, "dd/MM/yyyy")
                                                                                    ) : (
                                                                                        <span>Sélectionner une date</span>
                                                                                    )}
                                                                                </Button>
                                                                            </PopoverTrigger>
                                                                        </FormControl>
                                                                        <PopoverContent
                                                                            className="p-0 px-3 flex items-center">
                                                                            <Calendar
                                                                                mode="single"
                                                                                selected={new Date(field.value)}
                                                                                onSelect={(date) => field.onChange(date && format(date, "yyyy-MM-dd"))}
                                                                                initialFocus
                                                                            />
                                                                        </PopoverContent>
                                                                    </Popover>
                                                                    <FormMessage/>
                                                                </FormItem>
                                                            )}
                                                        />
                                                        <FormField
                                                            control={editProfileForm.control}
                                                            name="username"
                                                            render={({field}) => (
                                                                <FormItem>
                                                                    <FormLabel>Username</FormLabel>
                                                                    <FormControl>
                                                                        <Input placeholder="Please enter your username"
                                                                               type={"text"} {...field} />
                                                                    </FormControl>
                                                                    <FormMessage/>
                                                                </FormItem>
                                                            )}
                                                        />
                                                        <FormField
                                                            control={editProfileForm.control}
                                                            name="email"
                                                            render={({field}) => (
                                                                <FormItem>
                                                                    <FormLabel>Email</FormLabel>
                                                                    <FormControl>
                                                                        <Input placeholder="user@example.com"
                                                                               type={"email"} {...field} />
                                                                    </FormControl>
                                                                    <FormMessage/>
                                                                </FormItem>
                                                            )}
                                                        />
                                                        <FormField
                                                            control={editProfileForm.control}
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
                                                    </div>
                                                </ScrollArea>
                                                <DialogFooter>
                                                    <Button type="submit">Save Changes</Button>
                                                </DialogFooter>
                                            </form>
                                        </DialogContent>
                                    </Dialog>
                                </Form>
                            </div>
                            <div className="flex flex-col  gap-y-4">
                                <div
                                    className="flex flex-col md:items-center md:flex-row gap-y-2 lg:gap-x-6 font-medium">
                                    <div className="flex items-center gap-x-2 text-muted-foreground">
                                        <span className="text-sm">{user?.email}</span>
                                        <span className="text-sm">{user?.phone}</span>
                                    </div>
                                </div>
                                <div
                                    className="flex flex-col md:items-center md:flex-row gap-y-2 lg:gap-x-6 font-medium">
                                    <div className="flex items-center gap-x-2 text-muted-foreground">
                                        <span className="text-sm">{user?.username}</span>
                                    </div>
                                </div>

                            </div>
                        </CardContent>
                    </Card>
                </div>
            </CardContent>
        </Card>
    )
}