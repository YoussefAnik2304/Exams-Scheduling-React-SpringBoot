import {z} from "zod";
export const loginFormSchema = z.object({
    email: z.string({
        required_error: "Email address is required.",
    }).email({message: "invalid email address"}),
    password: z.string({
        required_error: "Password is required",
    })
})