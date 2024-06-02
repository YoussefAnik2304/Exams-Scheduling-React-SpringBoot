import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Search} from "lucide-react";
import {Input} from "@/components/ui/input.tsx";
import EventCardAdmin from "@/components/EventCardAdmin.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useProfs} from "@/context/ProfsContext.tsx";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Query} from "@/types/helperTypes.ts";
import { Prof } from "@/types/prof";

export default function ProfsPageAdmin() {

    const { getProfs} = useProfs();

    const [query, setQuery] = useState<Query>({
        Search: "",
        PageNumber: 1,
        PageSizeDefault: 8,
        PageSizeCustom: 8,
    });
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(prevQuery => ({...prevQuery, Search: e.target.value}));
    };


    useEffect(() => {
        getProfs();
    }, []);


    return (
        <Card className="bg-transparent border-0 shadow-none">
            <div className="flex flex-col md:flex-row justify-between md:items-center">
                <CardHeader className="px-4 md:px-6">
                    <CardTitle className="text-2xl md:text-3xl">Manage Profs</CardTitle>
                    <CardDescription className="text-sm md:text-lg">Keep track of and manage all profs on
                        platform</CardDescription>
                </CardHeader>
                <Link to="/admin/prof/create" className="px-4 md:px-6">
                    <Button className="space-x-2  w-full md:w-fit">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                        </svg>
                        <span>Add Prof</span>
                    </Button>
                </Link>
            </div>
            <CardContent className="p-4 md:p-6 space-y-6 md:space-y-12">
                <div className="relative flex-1 md:grow-0">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
                    <Input
                        onChange={handleSearchChange}
                        type="search"
                        placeholder="Search..."
                        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                    />
                </div>
                {prof && prof.length > 0 ?
                    (<div className="flex flex-col gap-y-6 md:gap-y-12">
                        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5">
                            {prof.map((prof: Prof) => (
                                <EventCardAdmin prof={prof} key={prof.id}/>
                            ))}
                        </div>
                    </div>)
                    :
                    (<div
                        className="min-h-96 flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
                        x-chunk="dashboard-02-chunk-1">
                        <div className="flex flex-col items-center gap-1 text-center">
                            <h3 className="text-lg md:text-2xl font-bold tracking-tight">
                                No prof for the moment
                            </h3>
                        </div>
                    </div>)}
                </CardContent>
        </Card>
)
}