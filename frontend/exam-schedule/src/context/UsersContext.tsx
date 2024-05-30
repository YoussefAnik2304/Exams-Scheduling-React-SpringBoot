import {Query, result, resultArray} from "@/types/helperTypes.ts";
import {User} from "@/types/user.ts";
import React, {createContext, useState} from "react";
import useToastHelper from "@/helpers/useToastHelper.tsx";
import {ErrorHandler} from "@/helpers/ErrorHandler.tsx";
import {HOST} from "@/api/axios.ts";


type UsersContextType = {
    users: User[];
    fetchUsers: (query: Query) => void;
    totalPages: number;
    fetchUsersTotalPages: (itemsPerPage : number) => void;
    activateAccount: (userId : string, activeStatus : boolean) => void;
}

type Props = { children: React.ReactNode };
const USER_END_POINT = "http://localhost:5014/api/account";

const UsersContext = createContext<UsersContextType>({} as UsersContextType);

export const AccountsProvider  = ({ children } : Props) => {
    const {showToast} = useToastHelper();
    const [users, setUsers] = useState<User[]>([]);
    const [totalPages, setTotalPages] = useState<number>(0);

    const fetchUsersTotalPages = async (itemsPerPage: number) => {
        await AxiosWithAuth.get<result<number>>(  USER_END_POINT + "/users/pages?itemsPerPage=" + itemsPerPage)
            .then((res) => {
                setTotalPages(res.data.resultObject);
            }).catch((e) => {
                const ErrorMessage = ErrorHandler(e);
                showToast("Something went wrong!", ErrorMessage);
            });

    };
    const fetchUsers = async (query : Query) => {
        await AxiosWithAuth.get<resultArray<User>>(USER_END_POINT + "/users?itemsPerPage=",
            {
                params: query
            })
            .then((res) => {
                setUsers(res.data.resultObject);
            }).catch((e) => {
                const ErrorMessage = ErrorHandler(e);
                showToast("Something went wrong!", ErrorMessage);
            });

    };

    const activateAccount = async (userId: string, activeStatus : boolean) => {
        await AxiosWithAuth.put<result<User>>(USER_END_POINT + "/active/" + userId + "/" + activeStatus)
            .then((res) => {
                const resultMessage = res.data.resultDescription.loggingMessage;
                console.log(res)
                showToast("Success", resultMessage);
            }).catch((e) => {
                const ErrorMessage = ErrorHandler(e);
                showToast("Something went wrong!", ErrorMessage);
            });

    };

    return (
        <UsersContext.Provider value={{users, fetchUsers, totalPages, fetchUsersTotalPages, activateAccount}}>
            {children}
        </UsersContext.Provider>
    );
}

export const useUsers = () : UsersContextType => React.useContext(UsersContext);