import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import ProfInfos from "@/components/profInfos.tsx";
import ProfCourseViewPage from "@/Pages/ProfCourseViewPage.tsx";

import {useEffect} from "react";
import {useProfs} from "@/context/ProfsContext.tsx";
import {useLocation} from "react-router-dom";


export default function ProfViewPage() {
    const location = useLocation();
    const { prof, fetchProfById } = useProfs();
    useEffect(() => {
        fetchProfById(location.state.profId);
    }, []);
    return(
        <section className="space-y-8">
            {prof && <ProfInfos prof={prof}/>}
            <Tabs defaultValue="profCourses" className="space-y-4">
                <div className="px-3 md:px-6">
                    <TabsList className="bg-transparent">
                        <TabsList className="bg-transparent space-x-1 md:space-x-2">
                            <TabsTrigger className="data-[state=active]:bg-primary/10 bg-muted/30 px-3 py-2 md:px-4 md:py-3 rounded-full"  value="profCourses">Courses</TabsTrigger>
                        </TabsList>
                    </TabsList>
                </div>
                <TabsContent value="profCourses">
                    {prof && <ProfCourseViewPage prof={prof}/>}
                </TabsContent>
                <TabsContent value="profCourses">
                    {prof && <ProfCourseViewPage prof={prof}/>}
                </TabsContent>
            </Tabs>
        </section>
    )
}