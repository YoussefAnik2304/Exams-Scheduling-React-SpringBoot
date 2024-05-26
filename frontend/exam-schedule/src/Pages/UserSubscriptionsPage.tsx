import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Search} from "lucide-react";
import {Input} from "@/components/ui/input.tsx";
import EventCard from "@/components/EventCard.tsx";
import {useSubscription} from "@/context/SubscriptionsContext.tsx";
import {useEffect, useState} from "react";
import {Query} from "@/types/helperTypes.ts";
import Paginator from "@/components/Paginator.tsx";
import {Link} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";
import {GetDecodedToken} from "@/helpers/Helpers.tsx";

export default function UserSubscriptionsPage() {
    const {subscriptions, userTotalPages,fetchUserSubscriptionsTotalPages ,fetchUserSubscriptions} = useSubscription();
    const [currentUserSubscriptionsPage, setCurrentSubscriptionsPage] = useState<number>(1);
    const [query, setQuery] = useState<Query>({
        Search: "",
        PageNumber: 1,
        PageSizeDefault:4,
        PageSizeCustom: 4,
    });

    const decodedToken = GetDecodedToken();
    const userId = decodedToken.UserId;
    const handlePageChange = (currentPage : number) => {
        setCurrentSubscriptionsPage(currentPage);
        setQuery(prevQuery => ({ ...prevQuery, PageNumber: currentPage }));
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(prevQuery => ({ ...prevQuery, Search: e.target.value }));
    };
    useEffect(() => {
        fetchUserSubscriptions(query, userId);
    }, [query]);

    useEffect(() => {
        fetchUserSubscriptionsTotalPages(4, userId);
    }, []);

    /**/
    return(
        <Card className="bg-transparent border-0 shadow-none">
            <CardHeader className="px-4 md:px-6">
                <CardTitle className="flex gap-x-2 items-center">
                    <span className="text-2xl md:text-3xl">My Events Subscriptions</span>
                </CardTitle>
                <CardDescription className="text-sm md:text-lg">List of subscriptions you are currently engaged with.</CardDescription>
            </CardHeader>
            <CardContent className="p-4 md:p-6 space-y-6 md:space-y-12">
                <div className="flex flex-col gap-y-6">
                    <div className="relative flex-1 md:grow-0">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
                        <Input onChange={handleSearchChange} type="search" placeholder="Search..." className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"/>
                    </div>
                    {subscriptions && subscriptions.length > 0 ?
                        (<div className="flex flex-col gap-y-6 md:gap-y-12">
                            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5">
                                {subscriptions.map((subscription) => (
                                    <EventCard subscriptionId={subscription.subscriptionId} forUser={true} event={subscription.subscriptionEvent} key={subscription.eventId}/>
                                ))}
                            </div>
                            <Paginator
                                currentPage={currentUserSubscriptionsPage}
                                totalPages={userTotalPages}
                                onPageChange={(pageNumber) => handlePageChange(pageNumber)}
                                showPreviousNext
                            />
                        </div>)
                        :
                        (
                            !query.Search ? (
                                <div
                                    className="min-h-96 flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
                                    x-chunk="dashboard-02-chunk-1">
                                    <div className="flex flex-col items-center gap-1 text-center">
                                        <h3 className="text-lg md:text-2xl font-bold tracking-tight">
                                            You have no Subscriptions
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            Browse available events and subscribe to them.
                                        </p>
                                        <Link to="/user/events">
                                            <Button  className="mt-4 space-x-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                     strokeWidth={1.5}
                                                     stroke="currentColor" className="size-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"/>
                                                </svg>
                                                <span>Browse Events</span>
                                            </Button>
                                        </Link>

                                    </div>
                                </div>
                            ) : (<div
                                className="min-h-96 flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
                                x-chunk="dashboard-02-chunk-1">
                                <div className="flex flex-col items-center gap-1 text-center">
                                    <h3 className="text-lg md:text-2xl font-bold tracking-tight">
                                        No Subscriptions found
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        No Subscriptions found for the name you provided.
                                    </p>
                                </div>
                            </div>)
                        )}
                </div>
            </CardContent>
        </Card>
    )
}