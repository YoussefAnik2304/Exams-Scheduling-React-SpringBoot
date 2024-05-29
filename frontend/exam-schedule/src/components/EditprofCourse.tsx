import {Card, CardContent} from "@/components/ui/card.tsx";
import {Avatar, AvatarFallback} from "@/components/ui/avatar.tsx";
import {Button} from "@/components/ui/button.tsx";
import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog.tsx";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog.tsx";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {CourseFormSchema} from "@/zod/schemas/course-schema.ts";
import {useState} from "react";
import {Course} from "@/types/profCourse.ts";
import {useCourse} from "@/context/CourseContext.tsx";

type CourseProps = {
    course : Course,
    profId : number,
    handleCourseChange : (changed : boolean ) => void
}
export default function EditEventCourse({course, profId, handleCourseChange} : CourseProps) {
    const {updateCourse, deleteCourse} = useCourse();
    const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);

    const editCourseForm = useForm<z.infer<typeof CourseFormSchema>>({
        resolver: zodResolver(CourseFormSchema),
        defaultValues: {
            courseTitle: "",
        }
    })

    const openEditDialog = (open : boolean) => {
        editCourseForm.setValue("courseTitle", course.courseTitle);
        setIsUpdateDialogOpen(open);
    }
    async function onSubmit(values: z.infer<typeof CourseFormSchema>) {
        await updateCourse(values ,course.courseId!, profId);
        setIsUpdateDialogOpen(false);
        handleCourseChange(true);

    }
    const handleDeleteCourseConfirm = async () => {
        await deleteCourse(course.courseId!, profId);
        handleCourseChange(true);
    }
    return(
        <Card className="bg-card border-0">
            <CardContent className="p-4">
                <div className="flex items-center gap-x-6">
                    <Avatar className="h-16 w-16 bg-indigo-600 rounded-xl">
                        <AvatarFallback className="bg-gradient-to-r from-rose-600 to-red-500 rounded-xl text-white text-lg md:text-2xl font-medium">CN</AvatarFallback>
                    </Avatar>
                    <div className="w-full flex justify-between">
                        <div className="grid gap-y-1">
                            <h3 className="text-xl font-medium">{course.courseTitle}</h3>
                        </div>
                        <div className="flex justify-center items-center gap-x-2">
                            <Button onClick={() => openEditDialog(true)} size="icon" variant="ghost" className="space-x-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5} stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"/>
                                </svg>
                            </Button>
                            {isUpdateDialogOpen && <Form {...editCourseForm}>
                                <Dialog key={course.courseId} open={isUpdateDialogOpen}
                                        onOpenChange={() => openEditDialog(!isUpdateDialogOpen)}>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Edit Course</DialogTitle>
                                            <DialogDescription>
                                                Make changes to Course here. Click save when you're done.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <form onSubmit={editCourseForm.handleSubmit(onSubmit)} className="space-y-6">
                                            <FormField
                                                control={editCourseForm.control}
                                                name="courseTitle"
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
                                                <Button type="submit">Save Changes</Button>
                                            </DialogFooter>
                                        </form>
                                    </DialogContent>
                                </Dialog>
                            </Form>}
                            <AlertDialog>
                                <AlertDialogTrigger>
                                    <Button size="icon" variant="ghost" className="space-x-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
                                        </svg>
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Delete Course</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will permanently delete
                                            the Course
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter className="space-x-2">
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={handleDeleteCourseConfirm} className="bg-destructive hover:bg-red-600 ml-0 md:ml-2">Continue</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>

                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}