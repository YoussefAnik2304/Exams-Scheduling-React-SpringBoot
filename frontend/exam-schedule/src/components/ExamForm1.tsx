import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {createProfFormSchema} from "@/zod/schemas/prof-schema.ts";
import {zodResolver} from "@hookform/resolvers/zod";

import {useEffect, useState} from "react";
import {Separator} from "@/components/ui/separator.tsx";
import { useProfs} from "@/context/ProfsContext.tsx";

import {DataTableColumnHeader} from "@/components/data-table/data-table-column-header.tsx";


export default function ExamForm1() {

    const {createProf} = useProfs();
    const [currentImage, setCurrentImage] = useState<File>(new File([], ""));
    const [previewImage, setPreviewImage] = useState<string>("");
    const [courseDialogOpen, setCourseDialogOpen] = useState<boolean>(false);
    const createProfForm = useForm<z.infer<typeof createProfFormSchema>>({
        resolver: zodResolver(createProfFormSchema),
        defaultValues: {
            coursesTeaching: [],
        }
    })

    // const { fields: profCourses, append: appendCourse, remove: removeCourse } = useFieldArray({
    //     name: "eventCourses",
    //     control: createProfForm.control,
    // })
    // function onSubmit(values: z.infer<typeof createProfFormSchema>) {
    //     const {profUsername, profEmail,profFirstName,profLastName,password,passwordConfirmation,profGroup,role,profDepartement,profFiliere} = values
    //     const submittedProf : Prof  = {
    //         profFirstName: profFirstName,
    //         profLastName: profLastName,
    //         profUsername: profUsername,
    //         profEmail: profEmail,
    //         role:role,
    //         profGroup:profGroup,
    //         profDepartement:profDepartement,
    //         profFiliere:profFiliere,
    //         password:password,
    //         passwordConfirmation:passwordConfirmation,
    //     }
    //     createProf(submittedProf);
    // }

    // function onSubmitCourseForm(values: z.infer<typeof CourseFormSchema>) {
    //     appendCourse({courseTitle: values.courseTitle});
    //     setCourseDialogOpen(false);
    // }
    //
    // const courseForm = useForm<z.infer<typeof CourseFormSchema>>({
    //     resolver: zodResolver(CourseFormSchema),
    // })

    useEffect(() => {
        setPreviewImage(URL.createObjectURL(currentImage));
        createProfForm.setValue("profImage", currentImage);
    }, [currentImage]);

    return (
        <Card className="bg-card border-0 shadow-none p-2 md:p-4 lg:p-10">
            <CardHeader className="p-3 md:p-6 mb-4">
                <CardTitle className="flex gap-x-2 items-center">
                    <span className="text-2xl md:text-3xl">Exam Planning</span>
                </CardTitle>
                <CardDescription className="text-sm md:text-lg">Please fill the form with correct information</CardDescription>
            </CardHeader>
            <CardContent className="p-3 md:p-6">
                <DataTableColumnHeader  title={"salam"}/>
            </CardContent>
        </Card>
    )
}