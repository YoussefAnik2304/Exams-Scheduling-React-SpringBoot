import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import EditEventOrganizer from "@/components/EditEventOrganizer.tsx";
import {Event} from "@/types/event.ts";
import {Button} from "@/components/ui/button.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {organizerFormSchema} from "@/zod/schemas/partner-schema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {useState} from "react";
import {usePartner} from "@/context/PartnersContext.tsx";


type EditEventOrganizerView = {
    event: Event,
    handlePartnerChange : (changed : boolean ) => void
}
export default function EditEventOrganizerPage({event, handlePartnerChange} : EditEventOrganizerView) {
    const {createOrganizer} = usePartner();
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

    const organizerForm = useForm<z.infer<typeof organizerFormSchema>>({
        resolver: zodResolver(organizerFormSchema),
    })

    async function onSubmit(values: z.infer<typeof organizerFormSchema>) {
        await createOrganizer(values, event.eventId!);
        handlePartnerChange(true);
        setIsCreateDialogOpen(false);
    }

    return (
        <>
            <Card className="bg-transparent shadow-none border-0 rounded-xl">
                <div className="flex flex-col md:flex-row justify-between md:items-center">
                    <CardHeader className="p-3 md:p-6">
                        <CardTitle className="flex gap-x-2 items-center">
                            <span className="text-2xl md:text-3xl">Event Organizers</span>
                        </CardTitle>
                        <CardDescription className="text-sm md:text-lg">General information about the event
                            Organizers</CardDescription>
                    </CardHeader>
                    <div className="p-3 md:p-6">
                        <Button className="space-x-2" onClick={() => setIsCreateDialogOpen(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                 stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                            </svg>
                            <span>Add Organizer</span>
                        </Button>
                    </div>
                    {isCreateDialogOpen && <Form {...organizerForm}>
                        <Dialog open={isCreateDialogOpen} onOpenChange={() => setIsCreateDialogOpen(false)}>
                            <DialogContent className="border-0">
                                <DialogHeader>
                                    <DialogTitle>Add Organizer</DialogTitle>
                                    <DialogDescription>
                                        Add new Organizer to the event here. Click save when you're done.
                                    </DialogDescription>
                                </DialogHeader>
                                <form onSubmit={organizerForm.handleSubmit(onSubmit)} className="space-y-6">
                                    <FormField
                                        control={organizerForm.control}
                                        name="organizerName"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Organizer Name</FormLabel>
                                                <FormControl>
                                                    <Input type="text" {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={organizerForm.control}
                                        name="organizerContact"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Organizer Contact</FormLabel>
                                                <FormControl>
                                                    <Input type="text" {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={organizerForm.control}
                                        name="organizerProfil"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Organizer Profile</FormLabel>
                                                <FormControl>
                                                    <Input type="text" {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                    <DialogFooter>
                                        <Button type="submit">Save Changes</Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </Form>}
                </div>
                <CardContent className="p-3 md:p-6">
                    {event.organizers && event.organizers.length > 0 ?
                        (<div className="flex flex-col gap-y-3">
                            {event.organizers?.map(item => (
                                <EditEventOrganizer handlePartnerChange={handlePartnerChange} eventId={event.eventId!} key={item.organizerId} organizer={item}/>
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
        </>
)
}