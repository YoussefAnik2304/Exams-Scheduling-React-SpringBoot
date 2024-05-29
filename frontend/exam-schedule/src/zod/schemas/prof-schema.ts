import {z} from "zod";
import {CourseFormSchema} from "@/zod/schemas/course-schema.ts";

const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_MIME_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
];
export const editProfFormSchema = z.object({
    profFirstName: z.string({
        required_error: "Prof First Name is required.",
    }).min(10, {message: "Prof First Name should be at least 10 characters long"})
        .max(40, {message: "Prof First Name should be no longer than 40 characters"}),
    profLastName: z.string({
        required_error: "Prof Last Name is required.",
    }).min(10, {message: "Prof Last Name should be at least 10 characters long"})
        .max(40, {message: "Prof Last Name should be no longer than 40 characters"}),

    profImage: z.any()
        .refine((file) => {
            return file.size <= MAX_FILE_SIZE;
        }, `Max image size is 5MB.`)
        .refine(
            (file) => ACCEPTED_IMAGE_MIME_TYPES.includes(file.type),
            "Only .jpg, .jpeg, .png and .webp formats are supported."
        ).optional(),

    profUsername: z.string({
        required_error: "username is required"
     }).min(6, {message: "username should be at least 6 characters long"}),
    profEmail: z.string({
        required_error: "email is required.",
    }).email({message: "invalid email address"}),
    password: z.string({
        required_error: "password is required",
    }).regex(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
    ), {message: "your password is weak"}),
    passwordConfirmation: z.string({
        required_error: "password is required",
    }).regex(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
    ), {message: "your password is weak"}),
    profGroup: z.string({}),

    profFiliere: z.string({}),

    profDepartement: z.string({}),

    role: z.string({}),

    coursesTeaching: z.array(CourseFormSchema).optional(),

    }).refine(
    (values) => {
        return values.password === values.passwordConfirmation;
    },
    {
        message: "Passwords must match!",
        path: ["passwordConfirmation"],
    }

);

export const createProfFormSchema = z.object({
    profFirstName: z.string({
        required_error: "Prof First Name is required.",
    }).min(10, { message: "Prof First Name should be at least 10 characters long" })
        .max(40, { message: "Prof First Name should be no longer than 40 characters" }),

    profLastName: z.string({
        required_error: "Prof Last Name is required.",
    }).min(10, { message: "Prof Last Name should be at least 10 characters long" })
        .max(40, { message: "Prof Last Name should be no longer than 40 characters" }),

    profImage: z.any()
        .refine(file => file.size <= MAX_FILE_SIZE, { message: "Max image size is 5MB." })
        .refine(file => ACCEPTED_IMAGE_MIME_TYPES.includes(file.type), { message: "Only .jpg, .jpeg, .png and .webp formats are supported." })
        .optional(),

    profUsername: z.string({
        required_error: "Username is required.",
    }).min(6, { message: "Username should be at least 6 characters long" }),

    profGroup: z.string({}),

    profFiliere: z.string({}),

    profDepartement: z.string({}),

    role: z.string({}),


    profEmail: z.string({
        required_error: "Email is required.",
    }).email({ message: "Invalid email address." }),

    password: z.string({
        required_error: "Password is required.",
    }).regex(
        new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"),
        { message: "Your password is weak." }
    ),

    passwordConfirmation: z.string({
        required_error: "Password confirmation is required.",
    }).regex(
        new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"),
        { message: "Your password is weak." }
    ),

    coursesTeaching: z.array(CourseFormSchema).optional(),
})
    .refine((values) => values.password === values.passwordConfirmation, {
        message: "Passwords must match!",
        path: ["passwordConfirmation"],
    }
    );

