import React, { createContext } from "react";
import { ErrorHandler } from "@/helpers/ErrorHandler.tsx";
import { Group,GroupCreate } from "@/types/Group.ts";
import { Prof } from "@/types/prof.ts";
import useToastHelper from "@/helpers/useToastHelper.tsx";
import { FetchResponse, handleFetch } from "@/api/axios";
import { useNavigate } from "react-router-dom";

type GroupsContextType = {
    createGroup: (group: Group) => Promise<void>;
    updateGroup: (group: Group, groupId: number) => Promise<void>;
    deleteGroup: (groupId: number) => Promise<void>;
    getGroup: (groupId: number) => Promise<Group>;
    getGroups: () => Promise<Group[]>;
    getGroupMembers: (groupId: number) => Promise<Prof[]>;
};

type Props = { children: React.ReactNode };

const GroupsContext = createContext<GroupsContextType>({} as GroupsContextType);

export const GroupsProvider: React.FC<Props> = ({ children }: Props) => {
    const { showToast } = useToastHelper();
    const navigate = useNavigate();

    const createGroup = async (group: Group) => {
        const formData = new FormData();
        formData.append("name", group.name);
        try {
            const res = await handleFetch("Groups/add", "POST", formData);
            if (group.filiere !== "") {
                const response = await handleFetch(`Groups/${res.data.id}/addMembers/FILIERE/${group.filiere}`, "POST");
            } else if (group.departement !== "") {
                const response = await handleFetch(`Groups/${res.data.id}/addMembers/DEPARTEMENT/${group.departement}`, "POST");
            } else {
                const response = await handleFetch(`Groups/${res.data.id}/addMembers/random`, "POST");
            }
            showToast("Something went wrong!", "Sccessufully created");
            navigate(`/Groups/${res.data.id}`);

        } catch (error) {
            const ErrorMessage = ErrorHandler(error);
            showToast("Something went wrong!", ErrorMessage);
            throw error;
        }
    };

    const updateGroup = async (group: Group, groupId: number) => {
        try {
            const res: FetchResponse = await handleFetch(`Groups/update/${groupId}`, "PUT", group);
            navigate(`/Groups/${res.data.id}`);
        } catch (error) {
            const ErrorMessage = ErrorHandler(error);
            throw ErrorMessage;
        }
    };

    const deleteGroup = async (groupId: number) => {
        try {
            await handleFetch(`Groups/remove/${groupId}`, "DELETE");
            navigate("/Groups");
        } catch (error) {
            const ErrorMessage = ErrorHandler(error);
            showToast("Something went wrong!", ErrorMessage);
            throw error;
        }
    };

    const getGroup = async (groupId: number): Promise<Group> => {
        try {
            const response = await handleFetch(`Groups/${groupId}`, "GET");
            return response.data;
        } catch (error) {
            const ErrorMessage = ErrorHandler(error);
            showToast("Something went wrong!", ErrorMessage);
            throw error;
        }
    };

    const getGroups = async (): Promise<Group[]> => {
        try {
            const response = await handleFetch("Groups/List", "GET");
            return response.data;
        } catch (error) {
            const ErrorMessage = ErrorHandler(error);
            showToast("Something went wrong!", ErrorMessage);
            throw error;
        }
    };

    const getGroupMembers = async (groupId: number): Promise<Prof[]> => {
        try {
            const response = await handleFetch(`Groups/${groupId}/members`, "GET");
            
            return response.data;
        } catch (error) {
            const ErrorMessage = ErrorHandler(error);
            showToast("Something went wrong!", ErrorMessage);
            throw error;
        }
    };

    return (
        <GroupsContext.Provider
            value={{
                createGroup,
                updateGroup,
                deleteGroup,
                getGroup,
                getGroups,
                getGroupMembers,
            }}
        >
            {children}
        </GroupsContext.Provider>
    );
};

export const useGroups = (): GroupsContextType => React.useContext(GroupsContext);