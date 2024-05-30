export type UserProfil = {
    userId?: string | null,
    email: string,
    password?: string | null,
    firstName: string,
    lastName: string,
    profilPhoto: string,
    access_token: string,
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
    phone: string,
    role: string,
    activeStatus: boolean,
    profilePhoto?: string | null,
    createdAt: string,
}

export type RegisterUser = {
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    profilePhoto?: File | null,
}