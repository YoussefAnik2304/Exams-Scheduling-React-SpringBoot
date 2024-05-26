import {Organizer, Sponsor} from "@/types/eventPartner.ts";

export interface Event {
    eventId?: number,
    eventName: string,
    eventLocation: string,
    eventDescription: string,
    startDate: string,
    endDate: string,
    seatsCapacity: number,
    paying: boolean,
    subscriptionPrice: number,
    thumbnail?: string,
    published?: boolean,
    archived?: boolean | null,
    createdAt?: string | null,
    updatedAt?: string | null;
    deletedAt?: string | null;
    eventImage?: File | null,
    organizers?: Organizer[],
    sponsors?: Sponsor[],
    subscriptionsCount?: number | null,
    subscribedUsers?: string[] | null,
}

export interface CreateEvent {
    eventName: string,
    eventLocation: string,
    eventDescription: string,
    startDate: string,
    endDate: string,
    seatsCapacity: number,
    paying: boolean,
    subscriptionPrice: number,
    organizers?: Organizer[],
    sponsors?: Sponsor[],
}
