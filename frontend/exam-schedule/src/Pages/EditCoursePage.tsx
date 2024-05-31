import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCourse } from "@/context/CourseContext.tsx";
import { Course } from "@/types/Course.tsx";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function EditCoursePage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { updateCourse, getCourse } = useCourse();
    const [course, setCourse] = useState<Course | null>(null);
    const [formValues, setFormValues] = useState<Course>({
        titre: '',
        typeElement: { titre: '' },
        nbrStudents: ''
    });
    const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const courseData = await getCourse(location.state.courseId);
                setCourse(courseData);
                setFormValues(courseData);
            } catch (error) {
                console.error("Error fetching course:", error instanceof Error ? error.message : error);
            }
        };

        fetchCourse();
    }, [getCourse, location.state.courseId]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (course && course.courseId) {
            await updateCourse(formValues, course.courseId);
            setIsPopoverOpen(false);
            navigate("/courses");
        }
    };

    return (
        <div>
            {course && (
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
                                <Label htmlFor="typeElement">Type Element</Label>
                                <Input
                                    type="text"
                                    name="typeElement"
                                    value={formValues.typeElement.titre}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="nbrStudents">Number of Students</Label>
                                <Input
                                    type="text"
                                    name="nbrStudents"
                                    value={formValues.nbrStudents}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="flex justify-end gap-2 mt-4">
                                <Button type="submit" className="w-full">
                                    Save Changes
                                </Button>
                                <Button type="button" className="w-full" onClick={() => setIsPopoverOpen(false)}>
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </PopoverContent>
                </Popover>
            )}
        </div>
    );
}
