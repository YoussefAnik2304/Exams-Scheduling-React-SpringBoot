import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {Search} from "lucide-react";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area.tsx";
import {useEffect, useState} from "react";
import {Query} from "@/types/helperTypes.ts";
import {useSubscription} from "@/context/SubscriptionsContext.tsx";
import {Input} from "@/components/ui/input.tsx";
import Paginator from "@/components/Paginator.tsx";
import {format} from "date-fns";

export default function SubscriptionsPage() {
    const {subscriptions, totalPages, fetchSubscriptions, fetchSubscriptionsTotalPages} = useSubscription();
    const [currentSubscriptionsPage, setCurrentSubscriptionsPage] = useState<number>(1);
    const [query, setQuery] = useState<Query>({
        Search: "",
        PageNumber: 1,
        PageSizeDefault:6,
        PageSizeCustom: 6,
    });

    const handlePageChange = (currentPage : number) => {
        setCurrentSubscriptionsPage(currentPage);
        setQuery(prevQuery => ({ ...prevQuery, PageNumber: currentPage }));
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(prevQuery => ({ ...prevQuery, Search: e.target.value }));
    };
    useEffect(() => {
        fetchSubscriptions(query);
    }, [query]);

    useEffect(() => {
        fetchSubscriptionsTotalPages(6);
    }, []);
    return(
        <Card className="bg-card border-0" x-chunk="dashboard-06-chunk-0">
            <CardHeader className="p-4 md:p-6">
                <CardTitle className="text-2xl md:text-3xl">Subscription</CardTitle>
                <CardDescription className="text-sm md:text-lg">
                    Manage events subscriptions and view their details.
                </CardDescription>
            </CardHeader>
            <CardContent className="p-4 md:p-6 overflow-hidden space-y-6 md:space-y-8">
                <div className="relative flex-1 md:grow-0">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
                    <Input
                        onChange={handleSearchChange}
                        type="search"
                        placeholder="Search..."
                        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                    />
                </div>
                <ScrollArea className="w-full whitespace-nowrap rounded-md">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-primary/10 hover:bg-primary/15 dark:bg-muted/30 dark:hover:bg-muted/30">
                                <TableHead className="hidden w-[100px] sm:table-cell">
                                    <span className="sr-only">Image</span>
                                </TableHead>
                                <TableHead>Subscriber</TableHead>
                                <TableHead>Payment Status</TableHead>
                                <TableHead>Subscription Price</TableHead>
                                <TableHead>Event</TableHead>
                                <TableHead>Created at</TableHead>
                                <TableHead>Canceled at</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {subscriptions && subscriptions.length > 0 ? (
                                    subscriptions.map((subscription, index) => (
                                        <TableRow key={index} className="bg-primary/5 dark:bg-muted/20 hover:bg-primary/10 dark:hover:bg-muted/10">
                                            <TableCell className="hidden sm:table-cell">
                                                <div className="flex justify-center items-center text-white aspect-square rounded-md h-12 object-cover bg-gradient-to-r from-purple-500 to-indigo-500">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                         viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                                                         className="size-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z"/>
                                                    </svg>
                                                </div>
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                {subscription.subscriptionUser.firstName + " " + subscription.subscriptionUser.lastName}
                                            </TableCell>
                                            <TableCell>
                                            {subscription.subscriptionPayment != null ? (<Badge
                                                        className="bg-amber-400 hover:bg-amber-400">{subscription.subscriptionPayment.paymentStatus}</Badge>) :
                                                    <Badge className="bg-green-400 hover:bg-green-400">Free</Badge>}
                                            </TableCell>
                                            <TableCell>
                                                {subscription.subscriptionPayment != null ? subscription.subscriptionPayment.paymentAmount : "Free"}
                                            </TableCell>
                                            <TableCell>
                                                {subscription.subscriptionEvent.eventName}
                                            </TableCell>
                                            <TableCell>
                                                {format(new Date(subscription.subscriptionDate), "yyyy-MM-dd")}
                                            </TableCell>
                                            <TableCell>
                                                {subscription.unsubscriptionDate ? format(new Date(subscription.subscriptionDate), "yyyy-MM-dd") : "none"}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) :
                                (
                                    <TableRow className="bg-muted/10 hover:bg-muted/20">
                                        <TableCell colSpan={7} className="w-full text-center font-medium">
                                            No Subscriptions
                                        </TableCell>
                                    </TableRow>
                                )}

                        </TableBody>
                    </Table>
                    <ScrollBar orientation="horizontal"/>
                </ScrollArea>
                <div className="flex justify-start">
                    <Paginator
                        currentPage={currentSubscriptionsPage}
                        totalPages={totalPages}
                        onPageChange={(pageNumber) => handlePageChange(pageNumber)}
                        showPreviousNext={true}
                    />
                </div>
            </CardContent>
        </Card>
    )
}