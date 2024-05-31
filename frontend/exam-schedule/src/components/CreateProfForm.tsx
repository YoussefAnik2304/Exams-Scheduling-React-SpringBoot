import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useFieldArray, useForm} from "react-hook-form";
import {z} from "zod";
import {createProfFormSchema} from "@/zod/schemas/prof-schema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {Avatar, AvatarFallback} from "@/components/ui/avatar.tsx";
import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {CourseFormSchema} from "@/zod/schemas/course-schema.ts";
import {useEffect, useState} from "react";
import {Separator} from "@/components/ui/separator.tsx";
import { useProfs} from "@/context/ProfsContext.tsx";
import {PasswordInput} from "@/components/PasswordInput.tsx";
import {Prof} from "@/types/prof.ts";

export default function CreateProfForm() {

    const {createProf} = useProfs();
    const [currentImage, setCurrentImage] = useState<File>(new File([], ""));
    const [previewImage, setPreviewImage] = useState<string>("");
    const [courseDialogOpen, setCourseDialogOpen] = useState<boolean>(false);
    const createProfForm = useForm<z.infer<typeof createProfFormSchema>>({
        resolver: zodResolver(createProfFormSchema),
        defaultValues: {
        }
    })

    const { fields: Courses, append: appendCourse, remove: removeCourse } = useFieldArray({
        name: "Courses",
        control: createProfForm.control,
    })
    function onSubmit(values: z.infer<typeof createProfFormSchema>) {
        const { email,FirstName,LastName,password,group,profImage,departement,filiere} = values
        const submittedProf : Prof  = {
            FirstName: FirstName,
            LastName: LastName,
            email: email,
            group:group,
            profImage:profImage,
            departement:departement,
            filiere:filiere,
            password:password,
        }
        createProf(submittedProf);
    }

    function onSubmitCourseForm(values: z.infer<typeof CourseFormSchema>) {
        appendCourse({courseTitle: values.titre});
        setCourseDialogOpen(false);
    }

    const courseForm = useForm<z.infer<typeof CourseFormSchema>>({
        resolver: zodResolver(CourseFormSchema),
    })

    const selectImage = (event: React.ChangeEvent<HTMLInputElement>) : void => {
        if(!event.target.files || event.target.files.length === 0) {
            return;
        }
        const selectedFile = event.target.files[0] as File;
        setCurrentImage(selectedFile);

    };
    useEffect(() => {
        setPreviewImage(URL.createObjectURL(currentImage));
        createProfForm.setValue("profImage", currentImage);
    }, [currentImage]);

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
                                <div className="border-b w-[50px]"/>
                                <span
                                    className="text-md whitespace-nowrap text-foreground/80">Prof Information</span>
                                <div className="border-b w-full"/>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-4 gap-y-4">
                                <FormField
                                    control={createProfForm.control}
                                    name="profImage"
                                    render={() => (
                                        <FormItem className="md:col-span-1">
                                            <FormLabel>Prof Image</FormLabel>
                                            <div className="relative flex justify-center items-center h-36 md:h-72 bg-muted/50 rounded-xl overflow-hidden">
                                                <span className="z-40">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                      <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"/>
                                                    </svg>
                                                </span>
                                                <FormControl className="absolute top-0 left-0 h-36 md:h-72 rounded-full">
                                                    <Input type="file" onChange={selectImage} className="opacity-0 z-40"/>
                                                </FormControl>

                                                {currentImage.size > 0 && (<img className="absolute top-0 left-0 w-full h-full object-cover text-sm" src={previewImage} alt="thumbnail"/>)}
                                            </div>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={createProfForm.control}
                                    name="FirstName"
                                    render={({field}) => (
                                        <FormItem className="md:col-start-1">
                                            <FormLabel>First Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Please enter your first name"
                                                       type="text" {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={createProfForm.control}
                                    name="LastName"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Last Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Please enter your last name"
                                                       type="text" {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={createProfForm.control}
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
                                {/*<FormField*/}
                                {/*    control={createProfForm.control}*/}
                                {/*    name="coursesTeaching"*/}
                                {/*    render={({field}) => (*/}
                                {/*        <FormItem>*/}
                                {/*            <FormLabel>Username</FormLabel>*/}
                                {/*            <FormControl>*/}
                                {/*                <Input placeholder="Please enter courses"*/}
                                {/*                       type="text" {...field} />*/}
                                {/*            </FormControl>*/}
                                {/*            <FormMessage/>*/}
                                {/*        </FormItem>*/}
                                {/*    )}*/}
                                {/*/>*/}
                                <FormField
                                    control={createProfForm.control}
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
                                    control={createProfForm.control}
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
                        </div>
                        <div className="mb-10">
                            <div className="flex flex-nowrap items-center gap-x-4 mb-6">
                                <div className="border-b w-[50px]"/>
                                <span
                                    className="text-md whitespace-nowrap text-foreground/80">Prof Courses</span>
                                <div className="border-b w-full"/>
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-end">
                                    <Form {...courseForm}>
                                        <Dialog open={courseDialogOpen} onOpenChange={setCourseDialogOpen}>
                                            <DialogTrigger className="w-full flex justify-end">
                                                <Button className="w-full md:w-fit space-x-2" type="reset">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                         strokeWidth={1.5} stroke="currentColor" className="size-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              d="M12 4.5v15m7.5-7.5h-15"/>
                                                    </svg>
                                                    <span>Add Course</span>
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="border-0">
                                                <DialogHeader>
                                                    <DialogTitle>Edit Course</DialogTitle>
                                                    <DialogDescription>
                                                        Make changes to Course here. Click save when you're done.
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <form onSubmit={courseForm.handleSubmit(onSubmitCourseForm)} className="space-y-6">
                                                    <FormField
                                                        control={courseForm.control}
                                                        name="titre"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Course Name</FormLabel>
                                                                <FormControl>
                                                                    <Input type="text" {...field} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <DialogFooter>
                                                        <Button onClick={courseForm.handleSubmit(onSubmitCourseForm)}>Save Changes</Button>
                                                    </DialogFooter>
                                                </form>
                                            </DialogContent>
                                        </Dialog>
                                    </Form>
                                </div>
                                {Courses.map((field, index) => (
                                    <Card className="bg-muted/30 border-0 rounded-xl" key={field.id}>
                                        <CardContent className="p-4">
                                            <div className="flex items-center gap-x-6">
                                                <Avatar className="h-12 w-12 md:h-16 md:w-16 bg-indigo-600 rounded-xl">
                                                    <AvatarFallback
                                                        className="bg-gradient-to-r  from-purple-600 to-blue-500 rounded-xl text-white text-lg md:text-2xl font-medium">{field.id.charAt(0).toUpperCase()}</AvatarFallback>
                                                </Avatar>
                                                <div className="w-full flex justify-between">
                                                    <div className="grid gap-y-1">
                                                        <h3 className="text-lg md:text-xl font-medium">{field.id}</h3>
                                                    </div>
                                                    <div className="flex justify-center items-center gap-x-2">
                                                        <Button size="icon" variant="ghost" className="space-x-2" onClick={() => removeCourse(index)}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                 viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                                                                 className="size-5">
                                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
                                                            </svg>
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                        <Separator/>
                        <div className="flex justify-end">
                            <Button onClick={createProfForm.handleSubmit(onSubmit)} className="space-x-2 w-full md:w-fit">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5} stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                                </svg>
                                <span>Create</span>
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}