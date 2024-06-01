import {z} from "zod";
// export const sponsorFormSchema = z.object({
//     sponsorName: z.string({
//         required_error: "Sponsor name is required.",
//     }).min(4, {message: "Sponsor name should be at least 4 characters long"})
//         .max(25, {message: "Sponsor name should be no longer than 25 characters"}),
//     sponsorContact: z.string({
//         invalid_type_error: "Sponsor contact must be a string",
//     }).optional().default(""),
//     sponsorProfil: z.string({
//         invalid_type_error: "Sponsor profile must be a string",
//     }).optional().default(""),
//
// })

export const CourseFormSchema = z.object({
    titre: z.string().min(1, "Course title is required"),
    nbrStudents: z.string().min(1, "Number of students must be at least 1"),
    typeElement: z.string(),
})

