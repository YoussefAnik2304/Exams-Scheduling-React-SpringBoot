
// export interface Prof {
//     id: number;
//     firstName: string;
//     lastName: string;
//     email: string;
//     password: string;
//     group: Group;
//     filiere: Filiere;
//     departement: Departement;
//     cordinated_surveil: null;
//     enabled: boolean;
//     accountNonExpired: boolean;
//     credentialsNonExpired: boolean;
//     username: string;
//     authorities: Authority[];
//     accountNonLocked: boolean;
//   }

import {Course} from "@/types/Course.ts";

export interface Prof {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    group: string;
    filiere: string;
    departement: string;
    cordinated_surveil?: null,
    enabled: boolean|string,
    accountNonExpired: boolean |string,
    credentialsNonExpired: boolean |string,
    authorities?: Authority[]| null,
    accountNonLocked?: boolean;
    coursesTeaching?: Course[],
    coursesSupervising?: Course[],
}
  
 export  interface Group {
    id: number;
    name: string;
  }
  
 export  interface Filiere {
    id: number;
    name: string;
  }
  
 export interface Departement {
    id: number;
    nom: string;
  }
  
  interface Authority {
    authority: string;
  }

export interface CreateProf {
    firstName: string,
    lastName: string,
    password:string,
    email: string,
    group: string,
    filiere: string,
    departement: string,
    published?: boolean | null,

}
