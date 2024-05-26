import EventsCarousel from "@/components/EventsCarousel.tsx";
import {EmblaOptionsType} from "embla-carousel";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import EventCard from "@/components/EventCard.tsx";
import {Search} from "lucide-react";
import { Input } from "@/components/ui/input";
import {useEffect, useState} from "react";
import {useEvents} from "@/context/EventsContext.tsx";
import Paginator from "@/components/Paginator.tsx";
import {Query} from "@/types/helperTypes.ts";

export default function EventsPage() {
    const { events, latestEvents, totalPages, fetchEvents, fetchEventsTotalPages, fetchLatestEvents } = useEvents();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [query, setQuery] = useState<Query>({
        Search: "",
        PageNumber: 1,
        PageSizeDefault:8,
        PageSizeCustom: 8,
    });
    const OPTIONS: EmblaOptionsType = { loop: true }
    const SLIDES = latestEvents
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(prevQuery => ({ ...prevQuery, Search: e.target.value }));
    };
    const handlePageChange = (currentPage : number) => {
        setCurrentPage(currentPage);
        setQuery(prevQuery => ({ ...prevQuery, PageNumber: currentPage }));
    };

    useEffect(() => {
        fetchEvents(query, true);
    }, [query]);

    useEffect(() => {
        fetchEventsTotalPages(8, true);
        fetchLatestEvents();
    }, []);
    return (
        <div>
            <Card className="bg-transparent border-0 shadow-none">
                <CardHeader className="px-4 md:px-6">
                    <CardTitle className="flex gap-x-2 items-center">
                        <span className="text-2xl md:text-3xl">Recently Added Events</span>
                    </CardTitle>
                    <CardDescription className="text-sm md:text-lg">Explore the recently added events in our platfrom</CardDescription>
                </CardHeader>
                <CardContent className="px-3 md:px-6">
                    {latestEvents && <EventsCarousel slides={SLIDES} options={OPTIONS}/>}
                </CardContent>
            </Card>
            <Card className="bg-transparent border-0 shadow-none">
                <CardHeader className="px-4 md:px-6">
                    <CardTitle className="flex gap-x-2 items-center">
                        <span className="text-2xl md:text-3xl">Explore Events</span>
                    </CardTitle>
                    <CardDescription className="text-sm md:text-lg">Stay Updated with the Exciting Events on Our Platform</CardDescription>
                </CardHeader>
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
                    {events && events.length > 0 ?
                        (<div className="flex flex-col gap-y-6 md:gap-y-12">
                            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5">
                                {events.map(event => (
                                    <EventCard forUser={false} event={event} key={event.eventId}/>
                                ))}
                            </div>
                            <Paginator
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={(pageNumber) => handlePageChange(pageNumber)}
                                showPreviousNext
                            />
                        </div>)
                            :
                            (<div
                            className="min-h-96 flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
                            x-chunk="dashboard-02-chunk-1">
                            <div className="flex flex-col items-center gap-1 text-center">
                                <h3 className="text-lg md:text-2xl font-bold tracking-tight">
                                    No event for the moment
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Check back later to discover and add new events to your schedule.
                                </p>
                            </div>
                        </div>)}
                </CardContent>
            </Card>
        </div>
    )
}