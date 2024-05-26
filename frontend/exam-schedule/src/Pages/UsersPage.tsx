import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {MoreHorizontal, Search} from "lucide-react";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area.tsx";
import {useEffect, useState} from "react";
import {useUsers} from "@/context/UsersContext.tsx";
import {Query} from "@/types/helperTypes.ts";
import Paginator from "@/components/Paginator.tsx";
import {Input} from "@/components/ui/input.tsx";
import {format} from "date-fns";

export default function UsersPage() {
    const {users, totalPages, fetchUsers, fetchUsersTotalPages, activateAccount} = useUsers();
    const [statusChanged, setStatusChanged] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [query, setQuery] = useState<Query>({
        Search: "",
        PageNumber: 1,
        PageSizeDefault:6,
        PageSizeCustom: 6,
    });
    const handlePageChange = (currentPage : number) => {
        setCurrentPage(currentPage);
        setQuery(prevQuery => ({ ...prevQuery, PageNumber: currentPage }));
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(prevQuery => ({ ...prevQuery, Search: e.target.value }));
    };

    const handleActiveStatusChange = async (userId : string, activeStatus : boolean) => {
        await activateAccount(userId, activeStatus);
        setStatusChanged(true);
    }

    useEffect(() => {
        fetchUsers(query);
    }, [query, statusChanged]);

    useEffect(() => {
        fetchUsersTotalPages(6);
    }, []);

    return(
        <Card className="bg-card border-0" x-chunk="dashboard-06-chunk-0">
            <CardHeader className="p-4 md:p-6">
                <CardTitle className="text-2xl md:text-3xl">Platform Users</CardTitle>
                <CardDescription className="text-sm md:text-lg">
                    Manage platform users and view their details.
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
                                <TableHead>Full Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Username</TableHead>
                                <TableHead>Account Status</TableHead>
                                <TableHead>Created at</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users && users.length > 0 ? (
                                    users.map((user, index) => (
                                        <TableRow key={index} className="bg-primary/5 dark:bg-muted/20 hover:bg-primary/10 dark:hover:bg-muted/10">
                                            <TableCell className="hidden sm:table-cell">
                                                {/*<img
                                                    alt="Product image"
                                                    className="aspect-square rounded-md object-cover"
                                                    height="64"
                                                    src={user.profilePhoto ? HOST + user.profilePhoto : "/placeholder.svg"}
                                                    width="64"
                                                />*/}
                                                <div className="flex justify-center items-center text-white aspect-square rounded-md h-12 object-cover bg-gradient-to-r from-purple-500 to-indigo-500">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                         viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                                                         className="size-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"/>
                                                    </svg>


                                                </div>
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                {user.firstName + " " + user.lastName}
                                            </TableCell>
                                            <TableCell>
                                                {user.email}
                                            </TableCell>
                                            <TableCell>
                                            {user.username}
                                            </TableCell>
                                            <TableCell>
                                                {user.activeStatus ? (<Badge className="bg-green-400 hover:bg-green-400">Active</Badge>) :
                                                    <Badge className="bg-red-500 hover:bg-red-500">Inactive</Badge>}

                                            </TableCell>
                                            <TableCell>
                                                {format(new Date(user.createdAt), "yyyy-MM-dd")}
                                            </TableCell>
                                            <TableCell>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button
                                                            aria-haspopup="true"
                                                            size="icon"
                                                            variant="ghost"
                                                        >
                                                            <MoreHorizontal className="h-4 w-4"/>
                                                            <span className="sr-only">Toggle menu</span>
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                        <DropdownMenuItem disabled={user.activeStatus}>
                                                            <button
                                                                onClick={() => handleActiveStatusChange(user.userId, true)}
                                                                className="flex justify-center gap-x-2">
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                     viewBox="0 0 24 24"
                                                                     strokeWidth={1.5} stroke="currentColor"
                                                                     className="size-5">
                                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                                          d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                                                </svg>
                                                                <span>Activate</span>
                                                            </button>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem disabled={!user.activeStatus}>
                                                            <button
                                                                onClick={() => handleActiveStatusChange(user.userId, false)}
                                                                className="flex justify-center gap-x-2">
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                     viewBox="0 0 24 24"
                                                                     strokeWidth={1.5} stroke="currentColor"
                                                                     className="size-5">
                                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                                          d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                                                </svg>
                                                                <span>Deactivate</span>
                                                            </button>
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) :
                                (
                                    <TableRow className="bg-muted/10 hover:bg-muted/20">
                                        <TableCell colSpan={6} className="w-full text-center font-medium">
                                            No users
                                        </TableCell>
                                    </TableRow>
                                )}

                        </TableBody>
                    </Table>
                    <ScrollBar orientation="horizontal"/>
                </ScrollArea>
                <div className="flex justify-start">
                    <Paginator
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={(pageNumber) => handlePageChange(pageNumber)}
                        showPreviousNext
                    />
                </div>
            </CardContent>
            <CardFooter>
            </CardFooter>
        </Card>
    )
}