import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import EditProfInfos from "@/components/EditProfInfos.tsx";
import EditProfCoursePage from "@/Pages/EditProfCoursePage.tsx";
import {useLocation} from "react-router-dom";
import {useProfs} from "@/context/ProfsContext.tsx";
import {useEffect, useState} from "react";
import { Prof } from "@/types/prof.ts";


export default function ProfViewAdminPage() {
    const location = useLocation();
    const { getProf } = useProfs();
    const [partnerChanged, setCourseChanges] = useState<boolean>(false);
    const handleCourseChange = (changed : boolean ) => {
        setCourseChanges(changed);
    }
    useEffect(() => {
        getProf(location.state.profId);
    }, [partnerChanged]);

    return(
        <section className="space-y-8">
            {Prof && <EditProfInfos  prof={prof}/>}
            <Tabs defaultValue="profOrganizers" className="space-y-4">
                <div className="px-4 md:px-6">
                    <TabsList className="bg-transparent space-x-1 md:space-x-2">
                        <TabsTrigger className="data-[state=active]:bg-primary/10 bg-muted/30 px-3 py-2 md:px-4 md:py-3 rounded-full"  value="profOrganizers">Organizers</TabsTrigger>
                        <TabsTrigger className="data-[state=active]:bg-primary/10 bg-muted/30 px-3 py-2 md:px-4 md:py-3 rounded-full"  value="profSponsors">Sponsors</TabsTrigger>
                    </TabsList>
                </div>
                <TabsContent value="profOrganizers">
                    {prof && <EditProfCoursePage handleCourseChange={handleCourseChange} prof={prof}/>}
                </TabsContent>
                <TabsContent value="profSponsors">
                    {prof && <EditProfCoursePage handleCourseChange={handleCourseChange} prof={prof}/>}
                </TabsContent>
            </Tabs>
        </section>
    )
}