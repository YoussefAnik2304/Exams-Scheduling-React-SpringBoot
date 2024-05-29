import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import ProfCourseView from "@/components/ProfCourseView.tsx";
import {Prof} from "@/types/prof.ts";

type ProfCourseView = {
    prof: Prof
}
export default function ProfCourseViewPage({prof}: ProfCourseView) {

    return(
        <Card className="bg-transparent border-0 shadow-none">
            <CardHeader className="p-3 md:p-6">
                <CardTitle className="flex gap-x-2 items-center">
                    <span className="text-2xl md:text-3xl">Prof Courses</span>
                </CardTitle>
                <CardDescription className="text-sm md:text-lg">General information about the prof Courses</CardDescription>
            </CardHeader>
            <CardContent className="p-3 md:p-6">
                {prof.coursesTeaching && prof.coursesTeaching.length > 0 ?
                    (<div className="grid md:grid-cols-3 gap-3">
                        {prof.coursesTeaching?.map(item => (
                            <ProfCourseView key={item.courseId} course={item}/>
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