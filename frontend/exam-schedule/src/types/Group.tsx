import { Prof } from "@/types/prof.ts";

export interface Group {
    id?: number;
    name: string;
    members: Prof[];
}