import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";
import ProfInfos from "@/components/profInfos.tsx";
import ProfCourseViewPage from "@/Pages/ProfCourseViewPage.tsx";
import { useProfs } from "@/context/ProfsContext.tsx";
import { Prof } from "@/types/prof.ts";
import { Button } from "@/components/ui/button"; // Adjust the import path as needed
import { handleFetch } from "@/api/axios";

interface LocationState {
    profId: number;
}

export default function ProfViewPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { getProf, deleteProf } = useProfs();
    const [prof, setProf] = useState<Prof | null>(null);

    useEffect(() => {
        const fetchProf = async () => {
            try {
                const locationState = location.state as LocationState;
                if (locationState && locationState.profId) {
                    const profData = await getProf(locationState.profId);
                    setProf(profData);
                } else {
                    throw new Error("No professor ID found in location state");
                }
            } catch (error) {
                console.error("Error fetching professor:", error instanceof Error ? error.message : error);
            }
        };

        fetchProf();
    }, [getProf, location.state]);
    const  getprofs=()=>{
        const profs=handleFetch('Professors/List','GET');
        console.log(profs);
    }
    const handleEdit = () => {
        navigate(`/edit-prof/${prof?.Id}`, { state: { prof } });
    };

    const handleDelete = async () => {
        if (prof && prof.Id) {
            await deleteProf(prof.Id);
            navigate("/profs");
        }
    };

    return (
        <div>
            <h1>Professor  Page</h1>
            <button onClick={getprofs}>get profs </button>

            {prof && <ProfInfos prof={prof} />}
            {prof && (
                <div className="flex space-x-4">
                    <Button type="button" onClick={handleEdit} className="w-full bg-blue-500 text-white">
                        Edit
                    </Button>
                    <Button type="button" onClick={handleDelete} className="w-full bg-red-500 text-white">
                        Delete
                    </Button>
                </div>
            )}
            <Tabs defaultValue="profCourses">
                <TabsList className="bg-transparent space-x-1 md:space-x-2">
                    <TabsTrigger className="data-[state=active]:bg-primary/10 bg-muted/30 px-3 py-2 md:px-4 md:py-3 rounded-full" value="profCourses">Courses</TabsTrigger>
                </TabsList>
                <TabsContent value="profCourses">
                    {prof && <ProfCourseViewPage prof={prof} />}
                </TabsContent>
            </Tabs>
        </div>
    );
}
