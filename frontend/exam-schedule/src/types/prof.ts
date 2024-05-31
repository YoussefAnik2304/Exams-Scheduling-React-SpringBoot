import {Course} from "@/types/Course.ts";

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
    coursesTeaching?: Course[],
    coursesSupervising?: Course[],
}
