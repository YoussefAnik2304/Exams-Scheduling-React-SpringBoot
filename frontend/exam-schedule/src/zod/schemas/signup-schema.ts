import {z} from "zod";
export const signupFormSchema = z.object({
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
    profilePhoto: z.string({}),
    email: z.string({
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
}).refine(
    (values) => {
        return values.password === values.passwordConfirmation;
    },
    {
        message: "Passwords must match!",
        path: ["passwordConfirmation"],
    }
);
