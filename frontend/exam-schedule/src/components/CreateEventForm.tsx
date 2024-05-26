import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "@/components/ui/button.tsx";
import {cn} from "@/lib/utils.ts";
import {format, isBefore, startOfDay} from "date-fns";
import {Calendar} from "@/components/ui/calendar.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {useFieldArray, useForm} from "react-hook-form";
import {z} from "zod";
import {createEventFormSchema} from "@/zod/schemas/event-schema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {Avatar, AvatarFallback} from "@/components/ui/avatar.tsx";
import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {organizerFormSchema, sponsorFormSchema} from "@/zod/schemas/partner-schema.ts";
import {useEffect, useState} from "react";
import {Separator} from "@/components/ui/separator.tsx";
import {useEvents} from "@/context/EventsContext.tsx";

export default function CreateEventForm() {

    const {createEvent} = useEvents();
    const [currentImage, setCurrentImage] = useState<File>(new File([], ""));
    const [previewImage, setPreviewImage] = useState<string>("");
    const [organizerDialogOpen, setOrganizerDialogOpen] = useState<boolean>(false);
    const [sponsorDialogOpen, setSponsorDialogOpen] = useState<boolean>(false);
    const createEventForm = useForm<z.infer<typeof createEventFormSchema>>({
        resolver: zodResolver(createEventFormSchema),
        defaultValues: {
            eventOrganizers: [],
            eventSponsors: []
        }
    })

    const { fields:  eventSponsors, append: appendSponsor, remove: removeSponsor } = useFieldArray({
        name: "eventSponsors",
        control: createEventForm.control,
    })

    const { fields: eventOrganizers, append: appendOrganizer, remove: removeOrganizer } = useFieldArray({
        name: "eventOrganizers",
        control: createEventForm.control,
    })
    function onSubmit(values: z.infer<typeof createEventFormSchema>) {
        createEvent(values);
    }

    const organizerForm = useForm<z.infer<typeof organizerFormSchema>>({
        resolver: zodResolver(organizerFormSchema),
    })
    function onSubmitOrganizerForm(values: z.infer<typeof organizerFormSchema>) {
        appendOrganizer({organizerName: values.organizerName, organizerContact: values.organizerContact, organizerProfil: values.organizerProfil});
        setOrganizerDialogOpen(false);
    }

    const sponsorForm = useForm<z.infer<typeof sponsorFormSchema>>({
        resolver: zodResolver(sponsorFormSchema),
    })
    function onSubmitSponsorForm(values: z.infer<typeof sponsorFormSchema>) {
        appendSponsor({sponsorName: values.sponsorName, sponsorContact: values.sponsorContact, sponsorProfil: values.sponsorProfil});
        setSponsorDialogOpen(false);
    }

    const selectImage = (event: React.ChangeEvent<HTMLInputElement>) : void => {
        if(!event.target.files || event.target.files.length === 0) {
            return;
        }
        const selectedFile = event.target.files[0] as File;
        setCurrentImage(selectedFile);

    };
    useEffect(() => {
        setPreviewImage(URL.createObjectURL(currentImage));
        createEventForm.setValue("eventImage", currentImage);
    }, [currentImage]);

    return (
        <Card className="bg-card border-0 shadow-none p-2 md:p-4 lg:p-10">
            <CardHeader className="p-3 md:p-6 mb-4">
                <CardTitle className="flex gap-x-2 items-center">
                    <span className="text-2xl md:text-3xl">Event Creation</span>
                </CardTitle>
                <CardDescription className="text-sm md:text-lg">Please fill the form with correct information</CardDescription>
            </CardHeader>
            <CardContent className="p-3 md:p-6">
                <Form {...createEventForm}>
                    <form onSubmit={createEventForm.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="mb-10">
                            <div className="flex flex-nowrap items-center gap-x-4 mb-6">
                                <div className="border-b w-[50px]"/>
                                <span
                                    className="text-md whitespace-nowrap text-foreground/80">Event Information</span>
                                <div className="border-b w-full"/>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-4 gap-y-4">
                                <FormField
                                    control={createEventForm.control}
                                    name="eventImage"
                                    render={() => (
                                        <FormItem className="md:col-span-1">
                                            <FormLabel>Event Thumbnail</FormLabel>
                                            <div className="relative flex justify-center items-center h-36 md:h-72 bg-muted/50 rounded-xl overflow-hidden">
                                                <span className="z-40">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                      <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"/>
                                                    </svg>
                                                </span>
                                                <FormControl className="absolute top-0 left-0 h-36 md:h-72 rounded-full">
                                                    <Input type="file" onChange={selectImage} className="opacity-0 z-40"/>
                                                </FormControl>

                                                {currentImage.size > 0 && (<img className="absolute top-0 left-0 w-full h-full object-cover text-sm" src={previewImage} alt="thumbnail"/>)}
                                            </div>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={createEventForm.control}
                                    name="eventName"
                                    render={({field}) => (
                                        <FormItem className="md:col-start-1">
                                            <FormLabel>Event Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Please enter the event name"
                                                       type="text" {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={createEventForm.control}
                                    name="eventLocation"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Event Location</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Please enter the event location"
                                                       type="text" {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={createEventForm.control}
                                    name="startDate"
                                    render={({field}) => (
                                        <FormItem className="flex flex-col gap-y-2">
                                            <FormLabel className="block mt-0.5">Start Date</FormLabel>
                                            <Popover>
                                                <FormControl>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            variant="outline"
                                                            className={cn(
                                                                "text-left font-normal",
                                                                !field.value && "text-muted-foreground"
                                                            )}
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                 viewBox="0 0 24 24" strokeWidth={1.5}
                                                                 stroke="currentColor" className="mr-2 h-4 w-4">
                                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"/>
                                                            </svg>

                                                            {field.value ? (
                                                                format(field.value, "dd/MM/yyyy")
                                                            ) : (
                                                                <span>Pick a date</span>
                                                            )}
                                                        </Button>
                                                    </PopoverTrigger>
                                                </FormControl>
                                                <PopoverContent className="p-0 px-3 flex items-center">
                                                    <Calendar
                                                        mode="single"
                                                        selected={new Date(field.value)}
                                                        onSelect={(date) => field.onChange(date && format(date, "yyyy-MM-dd"))}
                                                        disabled={(date) => isBefore(startOfDay(date), startOfDay(new Date()))}
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={createEventForm.control}
                                    name="endDate"
                                    render={({field}) => (
                                        <FormItem className="flex flex-col gap-y-2">
                                            <FormLabel className="block mt-0.5">End Date</FormLabel>
                                            <Popover>
                                                <FormControl>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            variant="outline"
                                                            className={cn(
                                                                "text-left font-normal",
                                                                !field.value && "text-muted-foreground"
                                                            )}
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                 viewBox="0 0 24 24" strokeWidth={1.5}
                                                                 stroke="currentColor" className="mr-2 h-4 w-4">
                                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"/>
                                                            </svg>

                                                            {field.value ? (
                                                                format(field.value, "dd/MM/yyyy")
                                                            ) : (
                                                                <span>Pick a date</span>
                                                            )}
                                                        </Button>
                                                    </PopoverTrigger>
                                                </FormControl>
                                                <PopoverContent className="p-0 px-3 flex items-center">
                                                    <Calendar
                                                        mode="single"
                                                        selected={new Date(field.value)}
                                                        onSelect={(date) => field.onChange(date && format(date, "yyyy-MM-dd"))}
                                                        disabled={(date) => isBefore(startOfDay(date), startOfDay(new Date()))}
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={createEventForm.control}
                                    name="seatsCapacity"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Seats Capacity</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Please enter number of available seats"
                                                       type="number"  {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={createEventForm.control}
                                    name="subscriptionPrice"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Subscription Price</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Please enter subscription price"
                                                       type="number" {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={createEventForm.control}
                                    name="eventDescription"
                                    render={({field}) => (
                                        <FormItem className="md:col-span-2">
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Textarea className="max-h-28"
                                                          placeholder="Type event description here"
                                                          {...field}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={createEventForm.control}
                                    name="paying"
                                    render={({field}) => (
                                        <FormItem className="flex items-center gap-x-3">
                                            <FormLabel>Priced</FormLabel>
                                            <FormControl>
                                                    <span className="m-0">
                                                        <Checkbox checked={field.value}
                                                                  onCheckedChange={field.onChange}/>
                                                    </span>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <div className="mb-10">
                            <div className="flex flex-nowrap items-center gap-x-4 mb-6">
                                <div className="border-b w-[50px]"/>
                                <span
                                    className="text-md whitespace-nowrap text-foreground/80">Event Organizers</span>
                                <div className="border-b w-full"/>
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-end">
                                    <Form {...organizerForm}>
                                        <Dialog open={organizerDialogOpen} onOpenChange={setOrganizerDialogOpen}>
                                            <DialogTrigger className="w-full flex justify-end">
                                                <Button className="w-full md:w-fit space-x-2" type="reset">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                         strokeWidth={1.5} stroke="currentColor" className="size-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              d="M12 4.5v15m7.5-7.5h-15"/>
                                                    </svg>
                                                    <span>Add Organizer</span>
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="border-0">
                                                <DialogHeader>
                                                    <DialogTitle>Edit Organizer</DialogTitle>
                                                    <DialogDescription>
                                                        Make changes to Organizer here. Click save when you're done.
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <form onSubmit={organizerForm.handleSubmit(onSubmitOrganizerForm)} className="space-y-6">
                                                    <FormField
                                                        control={organizerForm.control}
                                                        name="organizerName"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Organizer Name</FormLabel>
                                                                <FormControl>
                                                                    <Input type="text" {...field} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={organizerForm.control}
                                                        name="organizerContact"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Organizer Contact</FormLabel>
                                                                <FormControl>
                                                                    <Input type="text" {...field} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={organizerForm.control}
                                                        name="organizerProfil"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Organizer Profile</FormLabel>
                                                                <FormControl>
                                                                    <Input type="text" {...field} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <DialogFooter>
                                                        <Button onClick={organizerForm.handleSubmit(onSubmitOrganizerForm)}>Save Changes</Button>
                                                    </DialogFooter>
                                                </form>
                                            </DialogContent>
                                        </Dialog>
                                    </Form>
                                </div>
                                {eventOrganizers.map((field, index) => (
                                    <Card className="bg-muted/30 border-0 rounded-xl" key={field.id}>
                                        <CardContent className="p-4">
                                            <div className="flex items-center gap-x-6">
                                                <Avatar className="h-12 w-12 md:h-16 md:w-16 bg-indigo-600 rounded-xl">
                                                    <AvatarFallback
                                                        className="bg-gradient-to-r  from-purple-600 to-blue-500 rounded-xl text-white text-lg md:text-2xl font-medium">{field.organizerName.charAt(0).toUpperCase()}</AvatarFallback>
                                                </Avatar>
                                                <div className="w-full flex justify-between">
                                                    <div className="grid gap-y-1">
                                                        <h3 className="text-lg md:text-xl font-medium">{field.organizerName}</h3>
                                                        <span
                                                            className="text-sm text-muted-foreground">{field.organizerContact}</span>
                                                        <span
                                                            className="text-sm text-muted-foreground">{field.organizerProfil}</span>
                                                    </div>
                                                    <div className="flex justify-center items-center gap-x-2">
                                                        <Button size="icon" variant="ghost" className="space-x-2" onClick={() => removeOrganizer(index)}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                 viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                                                                 className="size-5">
                                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
                                                            </svg>
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                        <div className="mt-14">
                            <div className="flex flex-nowrap items-center gap-x-4 mb-6">
                                <div className="border-b w-[50px]"/>
                                <span
                                    className="text-md whitespace-nowrap text-foreground/80">Event Sponsors</span>
                                <div className="border-b w-full"/>
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-end">
                                    <Form {...sponsorForm}>
                                        <Dialog open={sponsorDialogOpen} onOpenChange={setSponsorDialogOpen}>
                                            <DialogTrigger className="w-full flex justify-end">
                                                <Button className="w-full md:w-fit space-x-2" type="reset">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                         strokeWidth={1.5} stroke="currentColor" className="size-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              d="M12 4.5v15m7.5-7.5h-15"/>
                                                    </svg>
                                                    <span>Add Sponsor</span>
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Edit Sponsor</DialogTitle>
                                                    <DialogDescription>
                                                        Make changes to Sponsor here. Click save when you're done.
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <form onSubmit={sponsorForm.handleSubmit(onSubmitSponsorForm)} className="space-y-6">
                                                    <FormField
                                                        control={sponsorForm.control}
                                                        name="sponsorName"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Sponsor Name</FormLabel>
                                                                <FormControl>
                                                                    <Input type="text" {...field} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={sponsorForm.control}
                                                        name="sponsorContact"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Sponsor Contact</FormLabel>
                                                                <FormControl>
                                                                    <Input type="text" {...field} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={sponsorForm.control}
                                                        name="sponsorProfil"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Sponsor Profile</FormLabel>
                                                                <FormControl>
                                                                    <Input type="text" {...field} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <DialogFooter>
                                                        <Button onClick={sponsorForm.handleSubmit(onSubmitSponsorForm)}>Save Changes</Button>
                                                    </DialogFooter>
                                                </form>
                                            </DialogContent>
                                        </Dialog>
                                    </Form>
                                </div>
                                {eventSponsors.map((field, index) => (
                                    <Card className="bg-muted/30 border-0 rounded-xl" key={field.id}>
                                        <CardContent className="p-4">
                                            <div className="flex items-center gap-x-6">
                                                <Avatar className="h-12 w-12 md:h-16 md:w-16 bg-indigo-600 rounded-xl">
                                                    <AvatarFallback
                                                        className="bg-gradient-to-r from-rose-600 to-red-500 rounded-xl text-white text-lg md:text-2xl font-medium">{field.sponsorName.charAt(0).toUpperCase()}</AvatarFallback>
                                                </Avatar>
                                                <div className="w-full flex justify-between">
                                                    <div className="grid gap-y-1">
                                                        <h3 className="text-lg md:text-xl font-medium">{field.sponsorName}</h3>
                                                        <span
                                                            className="text-sm text-muted-foreground">{field.sponsorContact}</span>
                                                        <span className="text-sm text-muted-foreground">{field.sponsorProfil}</span>
                                                    </div>
                                                    <div className="flex justify-center items-center gap-x-2">
                                                        <Button size="icon" variant="ghost" className="space-x-2" onClick={() => removeSponsor(index)}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                 viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                                                                 className="size-5">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
                                                            </svg>
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                        <Separator/>
                        <div className="flex justify-end">
                            <Button onClick={createEventForm.handleSubmit(onSubmit)} className="space-x-2 w-full md:w-fit">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5} stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                                </svg>
                                <span>Create</span>
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}