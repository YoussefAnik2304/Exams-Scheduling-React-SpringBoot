import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import EditEventSponsor from "@/components/EditEventSponsor.tsx";
import {Event} from "@/types/event.ts";
import {Button} from "@/components/ui/button.tsx";
import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {sponsorFormSchema} from "@/zod/schemas/partner-schema.ts";
import {useState} from "react";
import {usePartner} from "@/context/PartnersContext.tsx";

type EditEventSponsorView = {
    event: Event,
    handlePartnerChange : (changed : boolean ) => void
}
export default function EditEventSponsorPage({event, handlePartnerChange} : EditEventSponsorView) {
    const {createSponsor} = usePartner();
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const sponsorForm = useForm<z.infer<typeof sponsorFormSchema>>({
        resolver: zodResolver(sponsorFormSchema),
    })
    async function onSubmit(values: z.infer<typeof sponsorFormSchema>) {
        await createSponsor(values, event.eventId!);
        handlePartnerChange(true);
        setIsCreateDialogOpen(false);
    }
    return (
        <Card className="bg-transparent border-0 shadow-none">
            <div className="flex flex-col md:flex-row justify-between md:items-center">
                <CardHeader className="p-3 md:p-6">
                    <CardTitle className="flex gap-x-2 items-center">
                        <span className="text-2xl md:text-3xl">Event Sponsors</span>
                    </CardTitle>
                    <CardDescription className="text-sm md:text-lg">General information about the event Sponsors</CardDescription>
                </CardHeader>
                <div className="p-3 md:p-6">
                    <Button className="space-x-2" onClick={() => setIsCreateDialogOpen(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                        </svg>
                        <span>Add Sponsor</span>
                    </Button>
                </div>
                {isCreateDialogOpen && <Form {...sponsorForm}>
                    <Dialog open={isCreateDialogOpen} onOpenChange={() => setIsCreateDialogOpen(false)}>
                        <DialogContent className="border-0">
                            <DialogHeader>
                                <DialogTitle>Add Sponsor</DialogTitle>
                                <DialogDescription>
                                    Add new Sponsor to the event here. Click save when you're done.
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={sponsorForm.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                    control={sponsorForm.control}
                                    name="sponsorName"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Sponsor Name</FormLabel>
                                            <FormControl>
                                                <Input type="text" {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={sponsorForm.control}
                                    name="sponsorContact"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Sponsor Contact</FormLabel>
                                            <FormControl>
                                                <Input type="text" {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={sponsorForm.control}
                                    name="sponsorProfil"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Sponsor Profile</FormLabel>
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
                    {event.sponsors && event.sponsors.length > 0 ?
                        (<div className="flex flex-col gap-y-3">
                            {event.sponsors?.map(item => (
                                <EditEventSponsor handlePartnerChange={handlePartnerChange} eventId={event.eventId!} key={item.sponsorId} sponsor={item}/>
                            ))}
                        </div>)
                        :
                        (<div
                            className="min-h-56 flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
                            x-chunk="dashboard-02-chunk-1">
                            <div className="flex flex-col items-center gap-1 text-center">
                                <h3 className="text-lg md:text-2xl font-bold tracking-tight">
                                    No Sponsors for this event
                                </h3>
                            </div>
                        </div>)
                    }
                </CardContent>
        </Card>
)
}