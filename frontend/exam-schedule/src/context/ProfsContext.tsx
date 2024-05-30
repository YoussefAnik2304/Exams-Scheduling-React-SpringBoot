import React, { createContext } from "react";
import { ErrorHandler } from "@/helpers/ErrorHandler.tsx";
import useToastHelper from "@/helpers/useToastHelper.tsx";
import { handleFetch } from "@/api/axios";
import { useNavigate } from "react-router-dom";
import {Prof} from "@/types/prof.ts";


type ProfsContextType = {
    createProf: (prof: Prof) => void;
    updateProf: (prof: Prof, profId: number) => void;
    deleteProf: (profId: number) => void;
};

type Props = { children: React.ReactNode };

const ProfsContext = createContext<ProfsContextType>({} as ProfsContextType);

export const ProfsProvider = ({ children }: Props) => {
    const { showToast } = useToastHelper();
    const navigate = useNavigate();

    const createProf = async (prof: Prof) => {
        const formData = new FormData();
        formData.append("FirstName", prof.FirstName);
        formData.append("LastName", prof.LastName);
        formData.append("password", prof.password);
        formData.append("email", prof.email);
        formData.append("group", prof.group);
        formData.append("filiere", prof.filiere);
        formData.append("departement", prof.departement);
        if (prof.profImage) {
            formData.append("profImage", prof.profImage);
        }

        await handleFetch("Profs/add", "POST", formData)
            .then((res) => {
                const resultMessage = res.data.resultDescription.loggingMessage;
                showToast("Success", resultMessage);
                navigate(`/Profs/${res.data.id}`);
            })
            .catch((e) => {
                const errorMessage = ErrorHandler(e);
                showToast("Something went wrong!", errorMessage);
            });
    };

    const updateProf = async (prof: Prof, profId: number) => {
        const formData = new FormData();
        formData.append("FirstName", prof.FirstName);
        formData.append("LastName", prof.LastName);
        formData.append("password", prof.password);
        formData.append("email", prof.email);
        formData.append("group", prof.group);
        formData.append("filiere", prof.filiere);
        formData.append("departement", prof.departement);
        if (prof.profImage) {
            formData.append("profImage", prof.profImage);
        }

        await handleFetch(`Profs/update/${profId}`, "PUT", formData)
            .then((res) => {
                const resultMessage = res.data.resultDescription.loggingMessage;
                showToast("Success", resultMessage);
                navigate(`/Profs/${res.data.id}`);
            })
            .catch((e) => {
                const errorMessage = ErrorHandler(e);
                showToast("Something went wrong!", errorMessage);
            });
    };

    const deleteProf = async (profId: number) => {
        await handleFetch(`Profs/delete/${profId}`, "DELETE")
            .then((res) => {
                const resultMessage = res.data.resultDescription.loggingMessage;
                showToast("Success", resultMessage);
                navigate("/Profs");
            })
            .catch((e) => {
                const errorMessage = ErrorHandler(e);
                showToast("Something went wrong!", errorMessage);
            });
    };

    return (
        <ProfsContext.Provider
            value={{
                createProf,
                updateProf,
                deleteProf,
            }}
        >
            {children}
        </ProfsContext.Provider>
    );
};

export const useProfs = (): ProfsContextType => React.useContext(ProfsContext);
