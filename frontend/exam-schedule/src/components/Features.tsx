import {useEvents} from "@/context/EventsContext.tsx";
import {useEffect} from "react";
import EventCard from "@/components/EventCard.tsx";
import {useAuth} from "@/context/AuthContext.tsx";
import EventCardHome from "@/components/EventCardHome.tsx";


export function Features() {
    const {isLoggedIn} = useAuth();
    const { latestEvents,fetchLatestEvents } = useEvents();
    useEffect(() => {
        fetchLatestEvents();
    }, []);
    return (
      <section id="event" className="container flex flex-col py-20 md:py-20 gap-y-8">
          <div>
              <h2 className="text-3xl lg:text-4xl font-bold md:text-center">
                  Latest{" "}
                  <span className="text-primary">Added Events</span>
              </h2>
              <p className="text-center mt-4 mb-10 text-xl text-muted-foreground">Discover the exciting array of events
                  currently available on our platform</p>
          </div>
          {latestEvents && latestEvents.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 justify-center gap-8">
                  {latestEvents.map(event => (
                      isLoggedIn() ? <EventCard forUser={false} event={event} key={event.eventId}/> : <EventCardHome event={event}/>
              ))}
          </div>
      ) : (<div
          className="min-h-48 flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
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

      </section>
    );
}
