import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCourse } from "@/context/CourseContext.tsx";
import { Course } from "@/types/Course.ts";
import { Button } from "@/components/ui/button"; // Adjust the import path as needed
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Prof} from "@/types/prof.ts";
import {useProfs} from "@/context/ProfsContext.tsx";
import {useForm,FormProvider} from "react-hook-form";
import * as React from "react";



export default function EditCoursePopover({ course }: { course: Course }) {
    const { updateCourse } = useCourse();
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState<Course>({
        titre: course.titre,
        typeElement: course.typeElement,
        nbrStudents: course.nbrStudents,
        grade: course.grade,
        professor: course.professor
    });

    const {getProfs}=useProfs();

    const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
    const [professors, setProfessors] = useState<Prof[]>([]);
    // Update formValues when course changes
    useEffect(() => {
        setFormValues(course);
    }, [course]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const methods = useForm<Course>({
        defaultValues: {
            titre: course.titre,
            typeElement: course.typeElement,
            nbrStudents: course.nbrStudents,
            grade: course.grade,
            professor: course.professor
        },
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (course.courseId) {
            await updateCourse(formValues, course.courseId);
            setIsPopoverOpen(false);
            navigate("/admin/courses");
        }
    };

    useEffect(() => {
        const getProfessors = async () => {
            const professorData = await getProfs();
            setProfessors(professorData);
        };
        getProfessors();
    }, []);

    return (
        <FormProvider {...methods}>
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger asChild>
                <Button onClick={() => setIsPopoverOpen(true)}>Edit Course</Button>
            </PopoverTrigger>
            <PopoverContent className="p-4 bg-white border border-gray-200 rounded-lg shadow-md">
                <form onSubmit={handleSubmit}>
                    <div>
                        <Label htmlFor="titre">Title</Label>
                        <Input
                            type="text"
                            name="titre"
                            value={formValues.titre}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <FormField
                            // control={updateCourseForm.control}
                            name="typeElement"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Type</FormLabel>
                                    <FormControl>
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Course Type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem value="ELEMENT">ELEMENT</SelectItem>
                                                    <SelectItem value="MODULE">MODULE</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div>
                        <Label htmlFor="nbrStudents">Number of Students</Label>
                        <Input
                            type="number"
                            name="nbrStudents"
                            value={formValues.nbrStudents}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <FormField
                            // control={formValues.grade}
                            name="grade"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Grade</FormLabel>
                                    <FormControl>
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Grade" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem value="FIRST">FIRST</SelectItem>
                                                    <SelectItem value="SECONDE">SECONDE</SelectItem>
                                                    <SelectItem value="THIRD">THIRD</SelectItem>
                                                    <SelectItem value="FOURTH">FOURTH</SelectItem>
                                                    <SelectItem value="FIFTH">FIFTH</SelectItem>

                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div>
                        <FormField
                            // control={formValues.professor}
                            name="professor"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Professor</FormLabel>
                                    <FormControl>
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select Professor" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {professors.map((professor) => (
                                                        <SelectItem
                                                            key={professor.id}
                                                            value={professor.id ? professor.id.toString() : ''}
                                                        >
                                                            {professor.firstName+' '+professor.lastName}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                        <Button type="submit" className="w-full">
                            Save Changes
                        </Button>
                        <Button type="button" className="w-full" variant={"outline"} onClick={() => setIsPopoverOpen(false)}>
                            Cancel
                        </Button>
                    </div>
                </form>
            </PopoverContent>
        </Popover>
        </FormProvider>
    );
}
