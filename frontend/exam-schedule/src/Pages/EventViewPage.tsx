import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import EventInfos from "@/components/EventInfos.tsx";
import EventOrganizerViewPage from "@/Pages/EventOrganizerViewPage.tsx";
import EventSponsorViewPage from "@/Pages/EventSponsorViewPage.tsx";

import {useEffect} from "react";
import {useEvents} from "@/context/EventsContext.tsx";
import {useLocation} from "react-router-dom";


export default function EventViewPage() {
    const location = useLocation();
    const { event, fetchEventById } = useEvents();
    useEffect(() => {
        fetchEventById(location.state.eventId);
    }, []);
    return(
        <section className="space-y-8">
            {event && <EventInfos event={event}/>}
            <Tabs defaultValue="eventOrganizers" className="space-y-4">
                <div className="px-3 md:px-6">
                    <TabsList className="bg-transparent">
                        <TabsList className="bg-transparent space-x-1 md:space-x-2">
                            <TabsTrigger className="data-[state=active]:bg-primary/10 bg-muted/30 px-3 py-2 md:px-4 md:py-3 rounded-full"  value="eventOrganizers">Organizers</TabsTrigger>
                            <TabsTrigger className="data-[state=active]:bg-primary/10 bg-muted/30 px-3 py-2 md:px-4 md:py-3 rounded-full"  value="eventSponsors">Sponsors</TabsTrigger>
                        </TabsList>
                    </TabsList>
                </div>
                <TabsContent value="eventOrganizers">
                    {event && <EventOrganizerViewPage event={event}/>}
                </TabsContent>
                <TabsContent value="eventSponsors">
                    {event && <EventSponsorViewPage event={event}/>}
                </TabsContent>
            </Tabs>
        </section>
    )
}