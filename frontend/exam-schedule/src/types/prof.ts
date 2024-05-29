import {Course} from "@/types/profCourse.ts";

export interface Prof {
    profId?: number,
    profFirstName: string,
    profLastName: string,
    profUsername: string,
    password:string,
    passwordConfirmation:string,
    profEmail: string,
    role: string,
    profGroup: string,
    profFiliere: string,
    profDepartement: string,
    published?: boolean | null,
    createdAt?: string | null,
    updatedAt?: string | null;
    deletedAt?: string | null;
    profImage?: File | null,
    coursesTeaching?: Course[],
    coursesSupervising?: Course[],
}

export interface CreateProf {
    profFirstName: string,
    profLastName: string,
    profUsername: string,
    profEmail: string,
    profGroup: string,
    profFiliere: string,
    profDepartement: string,
    coursesTeaching?: Course[],
    coursesSupervising?: Course[],
}
