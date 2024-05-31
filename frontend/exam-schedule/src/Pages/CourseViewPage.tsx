import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import CourseView from "@/components/CourseView.tsx";
import {Course} from "@/types/Course.ts";

type CourseView = {
    course: Course
}
export default function CourseViewPage({course}: CourseView) {

    return(
        <Card className="bg-transparent border-0 shadow-none">
        <CardHeader className="p-3 md:p-6">
        <CardTitle className="flex gap-x-2 items-center">
        <span className="text-2xl md:text-3xl">Prof Courses</span>
    </CardTitle>
    <CardDescription className="text-sm md:text-lg">General information about the Courses</CardDescription>
    </CardHeader>
            <CardContent className="p-3 md:p-6">
                {course.titre && course.titre.length > 0 ? (
                    <div className="grid md:grid-cols-3 gap-3">
                        <CourseView course={course} />
                    </div>
                ) : (
                    <div className="min-h-56 flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
                        <div className="flex flex-col items-center gap-1 text-center">
                            <h3 className="text-lg md:text-2xl font-bold tracking-tight">
                                No Courses Available
                            </h3>
                        </div>
                    </div>
                )}
            </CardContent>
    </Card>
)
}

