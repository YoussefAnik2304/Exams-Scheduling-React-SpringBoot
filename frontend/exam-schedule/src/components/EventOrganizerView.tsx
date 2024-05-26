import {Card, CardContent} from "@/components/ui/card.tsx";
import {Organizer} from "@/types/eventPartner.ts";

type OrganizerProps = {
    organizer : Organizer
}
export default function EventOrganizerView({organizer}: OrganizerProps) {

    return(
        <Card className="bg-card border-0 rounded-xl">
            <CardContent className="px-4 md:px-6 py-6 md:py-12">
                <div className="flex items-center gap-x-6">
                    {/*<Avatar className="h-16 w-16 bg-indigo-600 rounded-xl">
                        <AvatarFallback className="bg-gradient-to-r from-purple-600 to-blue-500 rounded-xl text-white text-lg md:text-2xl font-medium">CN</AvatarFallback>
                    </Avatar>*/}
                    <div className="w-full">
                        <div className="flex flex-col justify-center items-center gap-y-2">
                            <h3 className="text-xl font-medium">{organizer.organizerName}</h3>
                            <span className="text-center text-sm text-muted-foreground">{organizer.organizerProfil ? organizer.organizerProfil : "No Available Profile"}</span>
                            <span className="flex gap-x-2 text-sm text-muted-foreground">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                     className="size-5">
                                  <path fillRule="evenodd"
                                        d="M17.834 6.166a8.25 8.25 0 1 0 0 11.668.75.75 0 0 1 1.06 1.06c-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788 3.807-3.808 9.98-3.808 13.788 0A9.722 9.722 0 0 1 21.75 12c0 .975-.296 1.887-.809 2.571-.514.685-1.28 1.179-2.191 1.179-.904 0-1.666-.487-2.18-1.164a5.25 5.25 0 1 1-.82-6.26V8.25a.75.75 0 0 1 1.5 0V12c0 .682.208 1.27.509 1.671.3.401.659.579.991.579.332 0 .69-.178.991-.579.3-.4.509-.99.509-1.671a8.222 8.222 0 0 0-2.416-5.834ZM15.75 12a3.75 3.75 0 1 0-7.5 0 3.75 3.75 0 0 0 7.5 0Z"
                                        clipRule="evenodd"/>
                                </svg>
                                <span>{organizer.organizerContact ? organizer.organizerContact : "No Available Contact"}</span>
                            </span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}