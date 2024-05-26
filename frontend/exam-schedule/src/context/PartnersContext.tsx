import React, {createContext} from "react";
import {ErrorHandler} from "@/helpers/ErrorHandler.tsx";
import {Organizer, Sponsor} from "@/types/eventPartner.ts";
import useToastHelper from "@/helpers/useToastHelper.tsx";
import {result} from "@/types/helperTypes.ts";
import { AxiosWithAuth } from "@/api/axios";


type PartnersContextType = {
    createOrganizer: (Organizer : Organizer, eventId: number) => void;
    updateOrganizer: (Organizer: Organizer, organizerId : number, eventId : number) => void;
    deleteOrganizer: (organizerId : number, eventId : number) => void;
    createSponsor: (Sponsor: Sponsor, eventId : number) => void;
    updateSponsor: (Sponsor: Sponsor, sponsorId : number, eventId : number) => void;
    deleteSponsor: (sponsorId : number, eventId : number) => void;
}

type Props = { children: React.ReactNode };

const ORGANIZER_END_POINT = "http://localhost:5014/api/organizer";
const SPONSOR_END_POINT = "http://localhost:5014/api/sponsor";

const PartnersContext = createContext<PartnersContextType>({} as PartnersContextType);
export const PartnersProvider  = ({ children } : Props) => {
    const {showToast} = useToastHelper();
    const createOrganizer = async (Organizer: Organizer, eventId : number) => {
        const formData = new FormData();
        formData.append("organizerName", Organizer.organizerName);
        formData.append("organizerContact", Organizer.organizerContact!);
        formData.append("organizerProfil", Organizer.organizerProfil!);

        await AxiosWithAuth.post<result<Organizer>>(ORGANIZER_END_POINT + "/create/" + eventId, formData,
            { headers: {"Content-Type": 'multipart/form-data'}
            })
            .then((res) => {
                const resultMessage = res.data.resultDescription.loggingMessage;
                showToast("Success", resultMessage);

            }).catch((e) => {
                const ErrorMessage = ErrorHandler(e);
                showToast("Something went wrong!", ErrorMessage);
            });
    }

    const updateOrganizer = async (Organizer: Organizer, organizerId : number, eventId : number) => {
        const formData = new FormData();
        formData.append("organizerName", Organizer.organizerName);
        formData.append("organizerContact", Organizer.organizerContact!);
        formData.append("organizerProfil", Organizer.organizerProfil!);

        await AxiosWithAuth.put<result<Organizer>>(ORGANIZER_END_POINT + "/update/" + organizerId + "/" + eventId, formData,
            { headers: {"Content-Type": 'multipart/form-data'}
            })
            .then((res) => {
                const resultMessage = res.data.resultDescription.loggingMessage;
                showToast("Success", resultMessage);

            }).catch((e) => {
                const ErrorMessage = ErrorHandler(e);
                showToast("Something went wrong!", ErrorMessage);
            });
    }

    const deleteOrganizer = async (organizerId : number, eventId : number) => {

        await AxiosWithAuth.delete<result<Organizer>>(ORGANIZER_END_POINT + "/delete/" + organizerId + "/" + eventId)
            .then((res) => {
                const resultMessage = res.data.resultDescription.loggingMessage;
                showToast("Success", resultMessage);

            }).catch((e) => {
                const ErrorMessage = ErrorHandler(e);
                showToast("Something went wrong!", ErrorMessage);
            });
    };
    const createSponsor = async (Sponsor: Sponsor, eventId : number) => {
        const formData = new FormData();
        formData.append("sponsorName", Sponsor.sponsorName);
        formData.append("sponsorContact", Sponsor.sponsorContact!);
        formData.append("sponsorProfil", Sponsor.sponsorProfil!);

        await AxiosWithAuth.post<result<Sponsor>>(SPONSOR_END_POINT + "/create/" + eventId, formData,
            { headers: {"Content-Type": 'multipart/form-data'}
            })
            .then((res) => {
                const resultMessage = res.data.resultDescription.loggingMessage;
                showToast("Success", resultMessage);

            }).catch((e) => {
                const ErrorMessage = ErrorHandler(e);
                showToast("Something went wrong!", ErrorMessage);
            });
    }

    const updateSponsor = async (Sponsor: Sponsor, sponsorId : number, eventId : number) => {
        const formData = new FormData();
        formData.append("sponsorName", Sponsor.sponsorName);
        formData.append("sponsorContact", Sponsor.sponsorContact!);
        formData.append("sponsorProfil", Sponsor.sponsorProfil!);

        await AxiosWithAuth.put<result<Sponsor>>(SPONSOR_END_POINT + "/update/" + sponsorId + "/" + eventId, formData,
            { headers: {"Content-Type": 'multipart/form-data'}
            })
            .then((res) => {
                const resultMessage = res.data.resultDescription.loggingMessage;
                showToast("Success", resultMessage);

            }).catch((e) => {
                const ErrorMessage = ErrorHandler(e);
                showToast("Something went wrong!", ErrorMessage);
            });
    }

    const deleteSponsor = async (sposnorId : number, eventId : number) => {

        await AxiosWithAuth.delete<result<Sponsor>>(SPONSOR_END_POINT + "/delete/" + sposnorId + "/" + eventId)
            .then((res) => {
                const resultMessage = res.data.resultDescription.loggingMessage;
                showToast("Success", resultMessage);

            }).catch((e) => {
                const ErrorMessage = ErrorHandler(e);
                showToast("Something went wrong!", ErrorMessage);
            });
    };


    return (
        <PartnersContext.Provider value={{createOrganizer,
            updateOrganizer,
            deleteOrganizer,
            createSponsor,
            updateSponsor,
            deleteSponsor,}}>
            {children}
        </PartnersContext.Provider>
    );
};
export const usePartner = () : PartnersContextType => React.useContext(PartnersContext);