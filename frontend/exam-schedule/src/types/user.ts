export type UserProfil = {
    userId?: string | null,
    email: string,
    password?: string | null,
    firstName: string,
    lastName: string,
    access_token: string,
}
export type RegisterForm={
    email: string,
    password?: string | null,
    firstName: string,
    lastName: string,
}

export type LoginDto = {
    email:string,
    password:string
}

export type User = {
    userId: string,
    username: string,
    email: string,
    firstName: string,
    lastName: string,
}

export type RegisterUser = { 
    firstName: string,
    lastName: string,
    email: string,
    password: string
}