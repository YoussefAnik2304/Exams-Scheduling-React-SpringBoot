
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

export interface Prof {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    filiere: string;
    departement: string;
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
