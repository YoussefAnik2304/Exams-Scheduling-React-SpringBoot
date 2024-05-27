import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import EditEventInfos from "@/components/EditEventInfos.tsx";
import EditEventOrganizerPage from "@/Pages/EditEventOrganizerPage.tsx";
import EditEventSponsorPage from "@/Pages/EditEventSponsorPage.tsx";
import {useLocation} from "react-router-dom";
import {useEvents} from "@/context/EventsContext.tsx";
import {useEffect, useState} from "react";

export default function EventViewAdminPage() {
    const location = useLocation();
    const { event, fetchEventById } = useEvents();
    const [partnerChanged, setPartnerChanges] = useState<boolean>(false);
    const handlePartnerChange = (changed : boolean ) => {
        setPartnerChanges(changed);
    }
    useEffect(() => {
        fetchEventById(location.state.eventId);
    }, [partnerChanged]);

    return(
        <section className="space-y-8">
            {event && <EditEventInfos  event={event}/>}
            <Tabs defaultValue="eventOrganizers" className="space-y-4">
                <div className="px-4 md:px-6">
                    <TabsList className="bg-transparent space-x-1 md:space-x-2">
                        <TabsTrigger className="data-[state=active]:bg-primary/10 bg-muted/30 px-3 py-2 md:px-4 md:py-3 rounded-full"  value="eventOrganizers">Organizers</TabsTrigger>
                        <TabsTrigger className="data-[state=active]:bg-primary/10 bg-muted/30 px-3 py-2 md:px-4 md:py-3 rounded-full"  value="eventSponsors">Sponsors</TabsTrigger>
                    </TabsList>
                </div>
                <TabsContent value="eventOrganizers">
                    {event && <EditEventOrganizerPage handlePartnerChange={handlePartnerChange} event={event}/>}
                </TabsContent>
                <TabsContent value="eventSponsors">
                    {event && <EditEventSponsorPage handlePartnerChange={handlePartnerChange} event={event}/>}
                </TabsContent>
            </Tabs>
        </section>
    )
}