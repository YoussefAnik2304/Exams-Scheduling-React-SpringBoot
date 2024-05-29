import {z} from "zod";

const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_MIME_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
];
export const editProfileFormSchema = z.object({
    firstName: z.string({
        required_error: "first name is required",
        invalid_type_error: "first name must be a string"
    })
        .min(2, {message: "first name should be at least 6 characters long"})
        .max(20, {message: "first name should be no longer than 20 characters"}),
    lastName: z.string({
        required_error: "last name is required",
        invalid_type_error: "last name must be a string"
    })
        .min(2, {message: "last name should be at least 6 characters long"})
        .max(20, {message: "last name should be no longer than 20 characters"}),
    phone: z.optional(z.string({invalid_type_error: "phone number must be a string"}).regex(new RegExp('(?:\\+212|0)(?:6|7)\\d{8}'), {message: "phone number format is invalid"})),
    birthDate: z.string({required_error: "birth date is required"}),
    username: z.string({
        required_error: "username is required"
    }).min(6, {message: "username should be at least 6 characters long"}),
    email: z.string({
        required_error: "email is required.",
    }).email({message: "invalid email address"}),
    password: z.string({
        required_error: "password is required",
    }).regex(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
    ), {message: "your password is weak"}),
    role: z.enum(['admin', 'user'], { required_error: 'Role is required' }),
    profilImage: z.any()
        .refine((file) => {
            return file.size <= MAX_FILE_SIZE;
        }, `Max image size is 5MB.`)
        .refine(
            (file) => ACCEPTED_IMAGE_MIME_TYPES.includes(file.type),
            "Only .jpg, .jpeg, .png and .webp formats are supported."
        ).optional(),
})
