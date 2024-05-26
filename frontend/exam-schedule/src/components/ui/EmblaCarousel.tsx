import '../../stylesheets/embla.css'
import {Badge} from "@/components/ui/badge.tsx";
import {Card, CardContent, CardFooter} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Event} from "@/types/event.ts";
import CalendarImage from "@/assets/images/call.png";
import {format} from "date-fns";
import {Link, useNavigate} from "react-router-dom";
import {useSubscription} from "@/context/SubscriptionsContext.tsx";
import {GetDecodedToken} from "@/helpers/Helpers.tsx";


type PropType = {
	index: number
	inView: boolean
	Event: Event
}

export const EmblaCarousel: React.FC<PropType> = (props : PropType) => {
	const {createFreeSubscription} = useSubscription();
	const navigate = useNavigate();

	const routeState = {
		eventId: props.Event.eventId
	}
	const decodedToken = GetDecodedToken();
	const userId = decodedToken.UserId;
	const handleGetTicket = () => {
		const EventId = props.Event.eventId!;
		if(props.Event.paying) {
			localStorage.setItem("eventId", EventId.toString());
			navigate("/user/checkout");
		}else {
			createFreeSubscription(userId, EventId);
		}
	}
	return (
		<div className="embla__slide">
			<Card className="relative flex justify-between items-center max-h-96 md:max-h-72 rounded-3xl p-6 lg:p-12 bg-gradient-to-r from-[#4217df] to-[#0075ff] border-0">
				<div className="flex flex-col justify-between">
					<CardContent className="space-y-4 p-0 text-white">
						<span className="text-xl md:text-3xl text-wrap break-words font-medium">{props.Event.eventName}</span>
						<div className="flex flex-col md:flex-row md:items-center font-medium gap-y-3 md:gap-x-4">
							<div className="flex items-center gap-x-2">
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
									<path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"/>
								</svg>
								<span
									className="text-sm">{format(new Date(props.Event.startDate), "yyyy-MM-dd")} - </span>
								<span className="text-sm">{format(new Date(props.Event.endDate), "yyyy-MM-dd")}</span>
							</div>
							<div className="flex items-center gap-x-2">
								<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-geo size-5" viewBox="0 0 16 16">
									<path fill-rule="evenodd" d="M8 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999zm2.493 8.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.3 1.3 0 0 0-.37.265.3.3 0 0 0-.057.09V14l.002.008.016.033a.6.6 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.6.6 0 0 0 .146-.15l.015-.033L12 14v-.004a.3.3 0 0 0-.057-.09 1.3 1.3 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465s-2.462-.172-3.34-.465c-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411"/>
								</svg>
								<span className="text-sm">{props.Event.eventLocation}</span>
							</div>
							{props.Event.paying &&
								<div className="flex items-center gap-x-2">
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
										<path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
									</svg>
									<span className="text-sm">{props.Event.subscriptionPrice} DH</span>
								</div>
							}
							<span className="flex">
								<Badge className="bg-green-400">{props.Event.paying ? "Paying" : "Free"}</Badge>
							</span>
						</div>
					</CardContent>
					<CardFooter className="flex justify-start gap-x-4 p-0 mt-5 md:mt-8">
						{
							props.Event.subscribedUsers?.includes(userId) ? (
								<Button className="space-x-1.5 rounded-lg bg-amber-500 hover:bg-amber-500">
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
										<path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
									</svg>
									<span>On the list</span>
								</Button>
							) : (
								<Button onClick={handleGetTicket} className="space-x-1.5 rounded-lg">
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
										<path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z"/>
									</svg>
									<span>Get Ticket</span>
								</Button>
							)
						}
						<Link to="/user/event/view" state={routeState}>
							<Button className="space-x-1.5 bg-white hover:bg-gray-200 text-muted rounded-lg">
								<span className="text-gray-800">View Event</span>
							</Button>
						</Link>
					</CardFooter>
				</div>
				<div className="hidden md:flex justify-center items-center -rotate-12 h-20 md:h-48 aspect-square">
					<img className="h-full object-cover" src={CalendarImage}/>
				</div>
			</Card>
		</div>
	)
}
