import { Prof } from "@/types/prof.ts";

export interface Group {
    id?: number;
    name: string;
    filiere :string;
    departement:string;
}
export interface GroupCreate{
    id?: number;
    name: string;
}