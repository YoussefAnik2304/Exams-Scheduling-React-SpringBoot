import {Course} from "@/types/profCourse.ts";

export interface Prof {
    Id?: number,
    FirstName: string,
    LastName: string,
    password:string,
    email: string,
    group: string,
    filiere: string,
    departement: string,
    published?: boolean | null,
    profImage: File | null,
    coursesTeaching?: Course[],
    coursesSupervising?: Course[],
}

export interface CreateProf {
    FirstName: string,
    LastName: string,
    password:string,
    email: string,
    group: string,
    filiere: string,
    departement: string,
    published?: boolean | null,
    profImage: File | null,
    coursesTeaching?: Course[],
    coursesSupervising?: Course[],
}
