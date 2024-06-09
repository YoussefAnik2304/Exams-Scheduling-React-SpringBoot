import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCourse } from "@/context/CourseContext.tsx";
import { Course } from "@/types/Course.ts";
import { Button } from "@/components/ui/button"; // Adjust the import path as needed
import { DataTable } from "@/components/data-table/data-table"; // Adjust the import path as needed
import {
    useReactTable,
    ColumnDef,
    getCoreRowModel,
    getSortedRowModel,
    getPaginationRowModel,
} from "@tanstack/react-table";
import CourseEditPopover from "@/components/EditCoursePopover.tsx"; // Adjust the import path as needed

export default function CoursesViewPage() {
    const navigate = useNavigate();
    const { deleteCourse, getCourses } = useCourse();
    const [courses, setCourses] = useState<Course[]>([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const coursesData = await getCourses();
                setCourses(coursesData);
            } catch (error) {
                console.error("Error fetching courses:", error instanceof Error ? error.message : error);
            }
        };

        fetchCourses();
    }, []);

    const handleDelete = async (courseId?: number) => {
        console.log("Deleting course with ID:", courseId);
        if (typeof courseId === 'number') {
            await deleteCourse(courseId);
            setCourses(courses.filter((course) => course.courseId !== courseId));
        }
    };

    const columns = useMemo<ColumnDef<Course>[]>(
        () => [
            {
                accessorKey: "titre",
                header: "Title",
                cell: (info) => info.getValue(),
            },
            {
                accessorKey: "typeElement",
                header: "Type",
                cell: (info) => info.getValue(),
            },
            {
                accessorKey: "nbrStudents",
                header: "Number of Students",
                cell: (info) => info.getValue(),
            },
            {
                accessorKey: "grade",
                header: "Grade",
                cell: (info) => info.getValue(),
            },
            {
                accessorKey: "professor",
                header: "Professor",
                cell: (info) => info.getValue(),
            },
            {
                accessorKey: "actions",
                header: "Actions",
                cell: ({ row }) => (
                    <div className="flex space-x-2">
                        <CourseEditPopover course={row.original} />
                        <Button
                            type="button"
                            onClick={() => handleDelete(row.original.courseId)}
                            className="bg-red-500 text-white"
                        >
                            Delete
                        </Button>
                    </div>
                ),
            },
        ],
        []
    );

    const table = useReactTable({
        data: courses,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Courses List</h1>
                <div className="flex space-x-2">
                    <Button
                        type="button"
                        onClick={() => navigate("/admin/courses/create")}
                        className="space-x-2 w-full md:w-fit"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                        </svg>
                        <span>Add Course</span>
                    </Button>
                </div>
            </div>
            <DataTable table={table} />
        </div>
    );
}
