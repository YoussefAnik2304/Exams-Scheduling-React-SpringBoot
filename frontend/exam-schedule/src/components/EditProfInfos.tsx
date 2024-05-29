import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {editProfFormSchema} from "@/zod/schemas/prof-schema.ts";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog.tsx";
import {useEffect, useState} from "react";
import {Prof} from "@/types/prof.ts";
import {useProfs} from "@/context/ProfsContext.tsx";
import {HOST} from "@/api/axios.ts";
import {PasswordInput} from "@/components/PasswordInput.tsx";


type EditProfInfosProps = {
    prof: Prof
}
export default function EditProfInfos({prof} : EditProfInfosProps) {

    const {updateProf, deleteProf, publishProf} = useProfs();
    const [currentImage, setCurrentImage] = useState<File>(new File([], ""));
    const [previewImage, setPreviewImage] = useState<string>("");
    const [published, setPublished] = useState<boolean>(false);

    const handlePublish = async (publishStatus : boolean) => {
        await publishProf(prof.profId!, publishStatus);
        setPublished(publishStatus);
    }

    const editProfForm = useForm<z.infer<typeof editProfFormSchema>>({
        resolver: zodResolver(editProfFormSchema),
    })
    function onSubmit(values: z.infer<typeof editProfFormSchema>) {
        updateProf(values, prof.profId!);
    }

    const selectImage = (prof: React.ChangeEvent<HTMLInputElement>) : void => {
        if(!prof.target.files || prof.target.files.length === 0) {
            return;
        }
        const selectedFile = prof.target.files[0] as File;
        setCurrentImage(selectedFile);

    };

    const handleDeleteProfConfirm = () => {
        deleteProf(prof.profId!);
    }
    useEffect(() => {

        editProfForm.setValue("profLastName", prof.profLastName);
        editProfForm.setValue("profFirstName", prof.profFirstName);
        editProfForm.setValue("profUsername", prof.profUsername);
        editProfForm.setValue("profEmail", prof.profEmail);
        editProfForm.setValue("password", prof.password);
        editProfForm.setValue("passwordConfirmation", prof.passwordConfirmation);
        editProfForm.setValue("profImage", prof.profImage);
        setPublished(prof.published!);

    }, []);
    useEffect(() => {
        setPreviewImage(URL.createObjectURL(currentImage));
        editProfForm.setValue("profImage", currentImage);
    }, [currentImage]);

    return (

        <Card className="bg-transparent border-0 shadow-none">
            <div className="flex flex-col md:flex-row justify-between md:items-center">
                <CardHeader className="px-4 md:px-6">
                    <CardTitle className="flex gap-x-2 items-center">
                        <span className="text-2xl md:text-3xl">Edit Prof Information</span>
                    </CardTitle>
                    <CardDescription className="text-sm md:text-lg">Edit General information of the prof</CardDescription>
                </CardHeader>
                <div className="flex justify-end gap-x-2 p-3 md:p-6 pt-0 md:pt-6">
                    <AlertDialog>
                        <AlertDialogTrigger className="w-full">
                            <Button className="bg-destructive hover:bg-red-600 space-x-1.5 rounded-lg w-full md:w-fit">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5} stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
                                </svg>
                                <span>Delete</span>
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Delete Prof</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete
                                    the prof
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter className="space-x-2">
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDeleteProfConfirm} className="bg-destructive hover:bg-red-600 ml-0 md:ml-2">Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                    <Form {...editProfForm}>
                        <Dialog>
                            <DialogTrigger className="w-full">
                                <Button className="space-x-1.5 rounded-lg w-full md:w-fit">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5}
                                         stroke="currentColor" className="size-5">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"/>
                                    </svg>
                                    <span>Edit Prof</span>
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl max-h-screen">
                                <DialogHeader>
                                    <DialogTitle>Edit Prof</DialogTitle>
                                    <DialogDescription>
                                        Make changes to Prof here. Click save when you're done.
                                    </DialogDescription>
                                </DialogHeader>
                                <form onSubmit={editProfForm.handleSubmit(onSubmit)} className="space-y-6">
                                    <ScrollArea className="h-96">
                                        <div className="p-4 grid grid-cols-1 md:grid-cols-2 md:gap-x-2 gap-y-4">
                                            <FormField
                                                control={editProfForm.control}
                                                name="profImage"
                                                render={() => (
                                                    <FormItem className="md:col-span-1">
                                                        <FormLabel>Prof Thumbnail</FormLabel>
                                                        <div className="relative flex justify-center items-center h-28 md:h-52 bg-muted/50 rounded-xl overflow-hidden">
                                                <span className="z-40">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                      <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"/>
                                                    </svg>
                                                </span>
                                                            <FormControl className="absolute top-0 left-0 h-28 md:h-52 rounded-full">
                                                                <Input type="file" onChange={selectImage} className="opacity-0 z-40"/>
                                                            </FormControl>

                                                            {currentImage.size > 0 && (<img className="absolute top-0 left-0 w-full h-full object-cover text-sm" src={previewImage} alt="thumbnail"/>)}
                                                        </div>
                                                        <FormMessage/>
                                                    </FormItem>
                                                )}
                                            />
                                        <FormField
                                            control={editProfForm.control}
                                            name="profLastName"
                                            render={({ field }) => (
                                                <FormItem className="md:col-start-1">
                                                    <FormLabel>Last Name</FormLabel>
                                                    <FormControl>
                                                        <Input type="text" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={editProfForm.control}
                                            name="profLastName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>First Name</FormLabel>
                                                    <FormControl>
                                                        <Input type="text" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                            <FormField
                                                control={editProfForm.control}
                                                name="profUsername"
                                                render={({ field }) => (
                                                    <FormItem className="md:col-start-1">
                                                        <FormLabel>Username</FormLabel>
                                                        <FormControl>
                                                            <Input type="text" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={editProfForm.control}
                                                name="profEmail"
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
                                                control={editProfForm.control}
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
                                                control={editProfForm.control}
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
            </div>
            <CardContent className="p-4 md:p-6">
                <div className="space-y-4">
                    <Card className="bg-card border-0 shadow-none rounded-xl overflow-hidden">
                        <CardHeader className="relative w-full h-36 bg-gradient-to-r from-pink-400 to-blue-500 mb-12">
                            <div className="h-28 w-28 border-4 border-white rounded-xl absolute top-1/2 left-6 md:left-12">
                                <img className="h-full w-full object-cover rounded-lg" src={HOST + prof.profImage}/>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6">
                            <p className="text-lg md:text-2xl font-medium mb-3">{prof.profFirstName} {" "}</p>
                            <p className="text-lg md:text-2xl font-medium mb-3">{prof.profLastName}</p>
                            <div className="flex items-end  md:items-center justify-between">
                                <div
                                    className="flex flex-col md:items-center md:flex-row gap-y-2 lg:gap-x-6 font-medium">
                                    <div className="flex items-center gap-x-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth={1.5}
                                             stroke="currentColor" className="size-5">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"/>
                                        </svg>
                                    </div>
                                    <div className="flex items-center gap-x-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                             className="bi bi-geo size-5" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd"
                                                  d="M8 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999zm2.493 8.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.3 1.3 0 0 0-.37.265.3.3 0 0 0-.057.09V14l.002.008.016.033a.6.6 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.6.6 0 0 0 .146-.15l.015-.033L12 14v-.004a.3.3 0 0 0-.057-.09 1.3 1.3 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465s-2.462-.172-3.34-.465c-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411"/>
                                        </svg>
                                        <span className="text-sm">{prof.profEmail}</span>
                                    </div>
                                </div>
                                {published ? (
                                    <Button onClick={() => handlePublish(false)} className="space-x-1.5 rounded-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                             className="size-5">
                                            <path fillRule="evenodd"
                                                  d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                                                  clipRule="evenodd"/>
                                        </svg>
                                        <span>UnPublish</span>
                                    </Button>
                                ) : (
                                    <Button onClick={() => handlePublish(true)} className="space-x-1.5 rounded-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth={1.5}
                                             stroke="currentColor" className="size-5">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"/>
                                        </svg>
                                        <span>Publish</span>
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-card border-0 ">
                        <CardHeader>
                            <h3 className="font-medium text-lg md:text-xl">About The Prof</h3>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{prof.profDepartement}.</p>
                        </CardContent>
                    </Card>
                </div>
            </CardContent>
        </Card>
    )
}