export type UserProfil = {
    userId?: string | null,
    userRole?: string | null,
    username: string,
    email: string,
    password?: string | null,
    firstName: string,
    lastName: string,
    phone: string,
    role: string,
    profilPhoto: string,
    createdAt: string,
    token: string,
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
    username: string,
    firstName: string,
    lastName: string,
    phone?: string | null,
    role: string,
    profilePhoto?: File | null,
}