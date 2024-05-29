import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import EditProfCourse from "@/components/EditprofCourse.tsx";
import { Prof} from "@/types/prof.ts";
import {Button} from "@/components/ui/button.tsx";
import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {CourseFormSchema} from "@/zod/schemas/course-schema.ts";
import {useState} from "react";
import {useCourse} from "@/context/CourseContext.tsx";

type EditProfCourseView = {
    prof: Prof,
    handleCourseChange : (changed : boolean ) => void
}
export default function EditProfCoursePage({prof, handleCourseChange} : EditProfCourseView) {
    const {createCourse} = useCourse();
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const courseForm = useForm<z.infer<typeof CourseFormSchema>>({
        resolver: zodResolver(CourseFormSchema),
    })
    async function onSubmit(values: z.infer<typeof CourseFormSchema>) {
        await createCourse(values, prof.profId!);
        handleCourseChange(true);
        setIsCreateDialogOpen(false);
    }
    return (
        <Card className="bg-transparent border-0 shadow-none">
            <div className="flex flex-col md:flex-row justify-between md:items-center">
                <CardHeader className="p-3 md:p-6">
                    <CardTitle className="flex gap-x-2 items-center">
                        <span className="text-2xl md:text-3xl">Event Courses</span>
                    </CardTitle>
                    <CardDescription className="text-sm md:text-lg">General information about the prof Courses</CardDescription>
                </CardHeader>
                <div className="p-3 md:p-6">
                    <Button className="space-x-2" onClick={() => setIsCreateDialogOpen(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                        </svg>
                        <span>Add Course</span>
                    </Button>
                </div>
                {isCreateDialogOpen && <Form {...courseForm}>
                    <Dialog open={isCreateDialogOpen} onOpenChange={() => setIsCreateDialogOpen(false)}>
                        <DialogContent className="border-0">
                            <DialogHeader>
                                <DialogTitle>Add Course</DialogTitle>
                                <DialogDescription>
                                    Add new Course to the prof here. Click save when you're done.
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={courseForm.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                    control={courseForm.control}
                                    name="courseTitle"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Course Name</FormLabel>
                                            <FormControl>
                                                <Input type="text" {...field} />
                                            </FormControl>
                                            <FormMessage/>
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
            </div>
                <CardContent className="p-3 md:p-6">
                    {prof.coursesTeaching && prof.coursesTeaching.length > 0 ?
                        (<div className="flex flex-col gap-y-3">
                            {prof.coursesTeaching?.map(item => (
                                <EditProfCourse handleCourseChange={handleCourseChange} profId={prof.profId!} key={item.courseId} course={item}/>
                            ))}
                        </div>)
                        :
                        (<div
                            className="min-h-56 flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
                            x-chunk="dashboard-02-chunk-1">
                            <div className="flex flex-col items-center gap-1 text-center">
                                <h3 className="text-lg md:text-2xl font-bold tracking-tight">
                                    No Courses for this prof
                                </h3>
                            </div>
                        </div>)
                    }
                </CardContent>
        </Card>
)
}