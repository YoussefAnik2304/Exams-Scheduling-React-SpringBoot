import {z} from "zod";
export const sponsorFormSchema = z.object({
    sponsorName: z.string({
        required_error: "Sponsor name is required.",
    }).min(4, {message: "Sponsor name should be at least 4 characters long"})
        .max(25, {message: "Sponsor name should be no longer than 25 characters"}),
    sponsorContact: z.string({
        invalid_type_error: "Sponsor contact must be a string",
    }).optional().default(""),
    sponsorProfil: z.string({
        invalid_type_error: "Sponsor profile must be a string",
    }).optional().default(""),

})

export const organizerFormSchema = z.object({
    organizerName: z.string({
        required_error: "Organizer name is required.",
    }).min(4, {message: "Organizer name should be at least 4 characters long"})
        .max(25, {message: "Organizer name should be no longer than 25 characters"}),
    organizerContact: z.string({
        invalid_type_error: "Organizer contact must be a string",
    }).optional().default(""),
    organizerProfil: z.string({
        invalid_type_error: "Organizer profile must be a string",
    }).optional().default(""),

})