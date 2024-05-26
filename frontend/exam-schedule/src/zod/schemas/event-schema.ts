import {z} from "zod";
import {organizerFormSchema, sponsorFormSchema} from "@/zod/schemas/partner-schema.ts";

const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_MIME_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
];
export const editEventFormSchema = z.object({
    eventName: z.string({
        required_error: "Event name is required.",
    }).min(10, {message: "Event name should be at least 10 characters long"})
        .max(40, {message: "Event name should be no longer than 40 characters"}),
    eventLocation: z.string({
        required_error: "Event location is required.",
        invalid_type_error: "Event location must be a string",
    }).min(4, {message: "Event location should be at least 4 characters long"})
        .max(40, {message: "Event location should be no longer than 40 characters"}),
    eventDescription: z.string({
        required_error: "Event description is required.",
        invalid_type_error: "Event description must be a string",
    }).min(8, {message: "Event description should be at least 8 characters long"})
        .max(1000, {message: "Event description should be no longer than 1000 characters"}),
    startDate: z.string({
        required_error: "Event start date is required."
    }),
    endDate: z.string({
        required_error: "Event end date is required."
    }),
    seatsCapacity: z.coerce.number({
        required_error: "Event seats capacity is required."
    }).min(1, {message: "Event seats capacity should be at least 1"})
        .max(100000, {message: "Event seats capacity should be less than 100000"}),
    paying: z.boolean({
        required_error: "Event paying status is required."
    }),
    subscriptionPrice: z.coerce.number({
        required_error: "Event subscription price is required."
    }).min(0, {message: "Event subscription price should be at least 0"})
        .max(100000, {message: "Event subscription price should be less than 100000"}),
    eventImage: z.any()
        .refine((file) => {
            return file.size <= MAX_FILE_SIZE;
        }, `Max image size is 5MB.`)
        .refine(
            (file) => ACCEPTED_IMAGE_MIME_TYPES.includes(file.type),
            "Only .jpg, .jpeg, .png and .webp formats are supported."
        ).optional(),
})


export const createEventFormSchema = z.object({
    eventName: z.string({
        required_error: "Event name is required.",
    }).min(10, {message: "Event name should be at least 10 characters long"})
        .max(25, {message: "Event name should be no longer than 25 characters"}),
    eventLocation: z.string({
        required_error: "Event location is required.",
        invalid_type_error: "Event location must be a string",
    }).min(4, {message: "Event location should be at least 4 characters long"})
        .max(25, {message: "Event location should be no longer than 25 characters"}),
    eventDescription: z.string({
        required_error: "Event description is required.",
        invalid_type_error: "Event description must be a string",
    }).min(8, {message: "Event description should be at least 8 characters long"})
        .max(1000, {message: "Event description should be no longer than 1000 characters"}),
    startDate: z.string({
        required_error: "Event start date is required."
    }),
    endDate: z.string({
        required_error: "Event end date is required."
    }),
    seatsCapacity: z.coerce.number({
        required_error: "Event seats capacity is required."
    }).min(1, {message: "Event seats capacity should be at least 1"})
        .max(100000, {message: "Event seats capacity should be less than 100000"}),
    paying: z.boolean({
        required_error: "Event paying status is required."
    }),
    subscriptionPrice: z.coerce.number({
        required_error: "Event subscription price is required."
    }).min(0, {message: "Event subscription price should be at least 1"})
        .max(100000, {message: "Event subscription price should be less than 100000"}),
    eventImage: z.any()
        .refine((file) => {
            return file.size <= MAX_FILE_SIZE;
        }, `Max image size is 5MB.`)
        .refine(
            (file) => ACCEPTED_IMAGE_MIME_TYPES.includes(file.type),
            "Only .jpg, .jpeg, .png and .webp formats are supported."
        ).optional(),
    eventOrganizers: z.array(organizerFormSchema).optional(),
    eventSponsors: z.array(sponsorFormSchema).optional(),
})