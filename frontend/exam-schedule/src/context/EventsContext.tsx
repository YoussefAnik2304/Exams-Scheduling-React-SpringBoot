import {Event} from "@/types/event.ts";
import React, {createContext, useState} from "react";
import {ErrorHandler} from "@/helpers/ErrorHandler.tsx";
import {useNavigate} from "react-router-dom";
import useToastHelper from "@/helpers/useToastHelper.tsx";
import {Query, result, resultArray} from "@/types/helperTypes";
import {AxiosWithAuth, AxiosWithoutToken} from "@/api/axios.ts";

type EventsContextType = {
    events: Event[];
    event: Event | null;
    latestEvents: Event[];
    fetchEvents: (query: Query, published : boolean) => void;
    fetchLatestEvents: () => void;
    fetchEventById: (id: number) => void;
    totalPages: number;
    fetchEventsTotalPages: (itemsPerPage : number, published : boolean) => void;
    createEvent: (Event : Event) => void;
    updateEvent: (Event : Event, eventId : number) => void;
    deleteEvent: (eventId : number) => void;
    publishEvent: (eventId : number, publishStatus : boolean) => void;
}
type Props = { children: React.ReactNode };

export const HOST = "http://localhost:5014"
const EVENT_END_POINT = "http://localhost:5014/api/event";

const EventsContext = createContext<EventsContextType>({} as EventsContextType);
export const EventsProvider  = ({ children } : Props) => {
    const {showToast} = useToastHelper();
    const navigate = useNavigate();
    const [events, setEvents] = useState<Event[]>([]);
    const [latestEvents, setLatestEvents] = useState<Event[]>([]);
    const [event, setEvent] = useState<Event | null>(null);
    const [totalPages, setTotalPages] = useState<number>(0);

    const fetchLatestEvents = async () => {
        const query = {
            Search: "",
            PageNumber: 1,
            PageSizeDefault: 4,
            PageSizeCustom: 8,
        }
        await AxiosWithoutToken.get<resultArray<Event>>(EVENT_END_POINT + '/published',{
            params: query
        })
            .then((res) => {
                setLatestEvents(res.data.resultObject);
            }).catch((e) => {
                const ErrorMessage = ErrorHandler(e);
                showToast("Something went wrong!", ErrorMessage);
            });

    };
    const fetchEventsTotalPages = async (itemsPerPage: number, published : boolean) => {
        const ApiURl  = published ? "/pages/published?itemsPerPage=" : "/pages?itemsPerPage=";
        await AxiosWithAuth.get<result<number>>(  EVENT_END_POINT + ApiURl + itemsPerPage)
            .then((res) => {
                setTotalPages(res.data.resultObject);
            }).catch((e) => {
                const ErrorMessage = ErrorHandler(e);
                showToast("Something went wrong!", ErrorMessage);
            });

    };
    const fetchEvents = async (query : Query , published : boolean) => {
        const ApiURl  =  published ? "/published" : "/events";
        await AxiosWithAuth.get<resultArray<Event>>(EVENT_END_POINT + ApiURl,
            {
                params: query
            })
            .then((res) => {
                setEvents(res.data.resultObject);
            }).catch((e) => {
                const ErrorMessage = ErrorHandler(e);
                showToast("Something went wrong!", ErrorMessage);
            });

    };
    const fetchEventById = async (id: number) => {
        await AxiosWithAuth.get<result<Event>>(EVENT_END_POINT + "/" + id)
            .then((res) => {
                setEvent(res.data.resultObject);
            }).catch((e) => {
                const ErrorMessage = ErrorHandler(e);
                showToast("Something went wrong!", ErrorMessage);
            });
    };

    const createEvent = async (Event : Event) => {
        const formData = new FormData();
        formData.append("eventName", Event.eventName);
        formData.append("startDate", Event.startDate);
        formData.append("endDate", Event.endDate);
        formData.append("eventLocation", Event.eventLocation);
        formData.append("eventDescription", Event.eventDescription);
        formData.append("seatsCapacity", Event.seatsCapacity.toString());
        formData.append("paying", Event.paying.toString());
        formData.append("subscriptionPrice", Event.subscriptionPrice.toString());
        formData.append("Image", Event.eventImage!);
        formData.append("organizers",  JSON.stringify(Event.organizers));
        formData.append("sponsors", JSON.stringify(Event.sponsors));

        await AxiosWithAuth.post<result<Event>>(EVENT_END_POINT + "/create", formData,
            { headers: {"Content-Type": 'multipart/form-data'}
            })
            .then((res) => {
                const resultMessage = res.data.resultDescription.loggingMessage;
                showToast("Success", resultMessage);
                navigate("/admin/events");

            }).catch((e) => {
                const ErrorMessage = ErrorHandler(e);
                showToast("Something went wrong!", ErrorMessage);
            });
    };

    const updateEvent = async (Event : Event, eventId : number) => {
        const formData = new FormData();
        formData.append("eventName", Event.eventName);
        formData.append("startDate", Event.startDate);
        formData.append("endDate", Event.endDate);
        formData.append("eventLocation", Event.eventLocation);
        formData.append("eventDescription", Event.eventDescription);
        formData.append("seatsCapacity", Event.seatsCapacity.toString());
        formData.append("paying", Event.paying.toString());
        formData.append("subscriptionPrice", Event.subscriptionPrice.toString());
        formData.append("Image", Event.eventImage!);
        formData.append("organizers",  JSON.stringify(Event.organizers));
        formData.append("sponsors", JSON.stringify(Event.sponsors));

        await AxiosWithAuth.put<result<Event>>(EVENT_END_POINT + "/update/" + eventId, formData,
            { headers: {"Content-Type": 'multipart/form-data'}
            })
            .then((res) => {
                const resultMessage = res.data.resultDescription.loggingMessage;
                showToast("Success", resultMessage);
                navigate("/admin/events");

            }).catch((e) => {
                const ErrorMessage = ErrorHandler(e);
                showToast("Something went wrong!", ErrorMessage);
            });
    };

    const deleteEvent = async (eventId : number) => {

        await AxiosWithAuth.delete<result<Event>>(EVENT_END_POINT + "/delete/" + eventId)
            .then((res) => {
                const resultMessage = res.data.resultDescription.loggingMessage;
                showToast("Success", resultMessage);
                navigate("/admin/events");

            }).catch((e) => {
                const ErrorMessage = ErrorHandler(e);
                showToast("Something went wrong!", ErrorMessage);
            });
    };

    const publishEvent = async (eventId : number, publishStatus : boolean) => {

        await AxiosWithAuth.put<result<Event>>(EVENT_END_POINT + "/publish/" + eventId + "/" + publishStatus)
            .then((res) => {
                const resultMessage = res.data.resultDescription.loggingMessage;
                showToast("Success", resultMessage);
            }).catch((e) => {
                const ErrorMessage = ErrorHandler(e);
                showToast("Something went wrong!", ErrorMessage);
            });
    };

    return (
        <EventsContext.Provider value={{
            events,
            event,
            latestEvents,
            fetchEvents,
            fetchLatestEvents,
            fetchEventById,
            totalPages,
            fetchEventsTotalPages,
            createEvent,
            updateEvent,
            deleteEvent,
            publishEvent}}>
            {children}
        </EventsContext.Provider>
    );
};
export const useEvents = () : EventsContextType => React.useContext(EventsContext);