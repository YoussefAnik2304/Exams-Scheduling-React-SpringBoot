import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import EventOrganizerView from "@/components/EventOrganizerView.tsx";
import {Event} from "@/types/event.ts";

type EventOrganizerView = {
    event: Event
}
export default function EventOrganizerViewPage({event} : EventOrganizerView) {

    return(
        <Card className="bg-transparent shadow-none border-0 rounded-xl">
            <CardHeader className="p-3 md:p-6">
                <CardTitle className="flex gap-x-2 items-center">
                    <span className="text-2xl md:text-3xl">Event Organizers</span>
                </CardTitle>
                <CardDescription className="text-sm md:text-lg">General information about the event Organizers</CardDescription>
            </CardHeader>
            <CardContent className="p-3 md:p-6">
                {event.organizers && event.organizers.length > 0 ?
                    (<div className="grid md:grid-cols-3 gap-3">
                        {event.organizers?.map(item => (
                            <EventOrganizerView key={item.organizerId} organizer={item}/>
                        ))}
                    </div>)
                    :
                    (<div
                        className="min-h-56 flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
                        x-chunk="dashboard-02-chunk-1">
                        <div className="flex flex-col items-center gap-1 text-center">
                            <h3 className="text-lg md:text-2xl font-bold tracking-tight">
                                No Organizers for this event
                            </h3>
                        </div>
                    </div>)
                }
            </CardContent>
        </Card>
    )
}