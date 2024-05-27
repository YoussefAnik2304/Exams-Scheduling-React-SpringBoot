import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Event} from "@/types/event.ts";
import {format} from "date-fns";
import {useSubscription} from "@/context/SubscriptionsContext.tsx";
import {useNavigate} from "react-router-dom";
import {GetDecodedToken} from "@/helpers/Helpers.tsx";
import {useAuth} from "@/context/AuthContext.tsx";
import {HOST} from "@/api/axios.ts";

type EventInfosProps = {
    event: Event
}
export default function EventInfos({event}: EventInfosProps) {
    const {createFreeSubscription} = useSubscription();
    const {isLoggedIn} = useAuth();
    const navigate = useNavigate();
    const handleGetTicket = () => {
        if(isLoggedIn()) {
            const decodedToken = GetDecodedToken();
            const userId = decodedToken.UserId;
            const EventId = event.eventId!;
            if(event.paying) {
                localStorage.setItem("eventId", EventId.toString());
                navigate("/user/event/checkout");
            }else {
                createFreeSubscription(userId, EventId);
            }
        }
        else {
            navigate("/login");
        }

    }
    return (

        <Card className="bg-transparent border-0 shadow-none">
            <CardHeader>
                <CardTitle className="flex gap-x-2 items-center">
                    <span className="text-2xl md:text-3xl">Event Information</span>
                </CardTitle>
                <CardDescription className="text-sm md:text-lg">General information about the event</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <Card className="bg-card border-0 shadow-none rounded-xl overflow-hidden">
                        <CardHeader className="relative w-full h-36 bg-gradient-to-r from-pink-400 to-blue-500 mb-12">
                            <div className="h-28 w-28 border-4 border-white rounded-xl absolute top-1/2 left-6 md:left-12">
                                <img className="h-full w-full object-cover rounded-lg" src={HOST + event.thumbnail}/>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6">
                            <p className="text-lg md:text-2xl font-medium mb-3">{event.eventName}</p>
                            <div className="flex items-end  md:items-center justify-between">
                                <div className="flex flex-col md:items-center md:flex-row gap-y-2 lg:gap-x-6 font-medium">
                                    <div className="flex items-center gap-x-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth={1.5}
                                             stroke="currentColor" className="size-5">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"/>
                                        </svg>
                                        <span className="text-sm">{format(new Date(event.startDate), "yyyy-MM-dd")}  - </span>
                                        <span className="text-sm">{format(new Date(event.endDate), "yyyy-MM-dd")}</span>
                                    </div>
                                    <div className="flex items-center gap-x-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                             className="bi bi-geo size-5" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd"
                                                  d="M8 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999zm2.493 8.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.3 1.3 0 0 0-.37.265.3.3 0 0 0-.057.09V14l.002.008.016.033a.6.6 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.6.6 0 0 0 .146-.15l.015-.033L12 14v-.004a.3.3 0 0 0-.057-.09 1.3 1.3 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465s-2.462-.172-3.34-.465c-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411"/>
                                        </svg>
                                        <span className="text-sm">{event.eventLocation}</span>
                                    </div>
                                    <div className="flex items-center gap-x-2">
                                        <span className="text-sm">{event.subscriptionsCount + " / " + event.seatsCapacity}</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth={1.5}
                                             stroke="currentColor" className="size-5">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"/>
                                        </svg>
                                    </div>
                                    {event.paying &&
                                        <div className="flex items-center gap-x-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                            </svg>
                                            <span className="text-sm">{event.subscriptionPrice} DH</span>
                                        </div>
                                    }
                                    <span>
                            <Badge className="bg-green-400 hover:bg-green-400">{event.paying ? "Paying" : "Free"}</Badge>
                        </span>
                                </div>
                                {isLoggedIn() && event.subscribedUsers?.includes(GetDecodedToken().UserId) ? (
                                    <Button className="space-x-1.5 rounded-lg bg-amber-500 hover:bg-amber-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                             stroke="currentColor" className="size-5">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                        </svg>
                                        <span>On the list</span>
                                    </Button>
                                ) : (
                                    <Button onClick={handleGetTicket} className="space-x-1.5 rounded-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                             stroke="currentColor" className="size-5">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z"/>
                                        </svg>
                                        <span>Get Ticket</span>
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-card border-0 ">
                        <CardHeader>
                            <h3 className="font-medium text-lg md:text-xl">About The Event</h3>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{event.eventDescription}</p>
                        </CardContent>
                    </Card>
                </div>
            </CardContent>
        </Card>
    )
}