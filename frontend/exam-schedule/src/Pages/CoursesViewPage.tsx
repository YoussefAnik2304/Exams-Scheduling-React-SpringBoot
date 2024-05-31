import { useEffect, useState } from "react";
import CourseViewPage from "@/Pages/CourseViewPage.tsx";
import { useCourse } from "@/context/CourseContext.tsx";
import { Course } from "@/types/Course"; // Adjust the import as necessary

export default function CoursesViewPage() {
    const [courses, setCourses] = useState<Course[]>([]);
    const { getCourses } = useCourse();

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

    return (
        <div className="grid md:grid-cols-3 gap-3">
            {courses.map((course, index) => (
                <CourseViewPage key={index} course={course} />
            ))}
        </div>
    );
}
