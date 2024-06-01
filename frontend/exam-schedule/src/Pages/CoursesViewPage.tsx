import { useEffect, useState } from "react";
import CourseViewPage from "@/Pages/CourseViewPage.tsx";
import { useCourse } from "@/context/CourseContext.tsx";
import { Course } from "@/types/Course"; // Adjust the import as necessary
import { Button } from "@/components/ui/button"; // Adjust the import path as needed
import {useNavigate} from "react-router-dom"; // Adjust the import as necessary

export default function CoursesViewPage() {
    const [courses, setCourses] = useState<Course[]>([]);
    const { getCourses, deleteCourse, updateCourse } = useCourse();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const data = await getCourses();
                if (data) {
                    setCourses(data);
                }
            } catch (error) {
                if (error instanceof Error) {
                    console.error("Error fetching courses:", error.message);
                } else {
                    console.error("Unexpected error:", error);
                }
            }
        };

        fetchCourses();
    }, [getCourses]);

    const handleEdit = (course: Course) => {
        updateCourse(course,course.courseId!);
        navigate(`/admin/courses/edit/${course.courseId}`, { state: { course } });

    };

    const handleDelete = async (courseId?: number) => {
        if (courseId === undefined) return;

        try {
            await deleteCourse(courseId);
            setCourses((prevCourses) => prevCourses.filter(course => course.courseId !== courseId));
        } catch (error) {
            if (error instanceof Error) {
                console.error("Error deleting course:", error.message);
            } else {
                console.error("Unexpected error:", error);
            }
        }
    };

    return (
        <div className="grid md:grid-cols-3 gap-3">
            {courses.map((course) => (
                <div key={course.courseId} className="course-card">
                    <CourseViewPage course={course} />
                    <div className="button-group">
                        <Button onClick={() => handleEdit(course)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Edit</Button>
                        <Button onClick={() => handleDelete(course.courseId)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</Button>
                    </div>
                </div>
            ))}
        </div>
    );
}
