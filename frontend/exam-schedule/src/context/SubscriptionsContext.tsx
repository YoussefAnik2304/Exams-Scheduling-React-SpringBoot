import React, {createContext, useState} from "react";
import {ErrorHandler} from "@/helpers/ErrorHandler.tsx";
import useToastHelper from "@/helpers/useToastHelper.tsx";
import {Query, result, resultArray} from "@/types/helperTypes.ts";
import {CreateSubscription, Subscription} from "@/types/subscription.ts";
import {useNavigate} from "react-router-dom";
import { AxiosWithAuth } from "@/api/axios";


type SubscriptionContextType = {
    subscriptions: Subscription[];
    totalPages: number;
    userTotalPages: number;
    fetchSubscriptionsTotalPages: (itemsPerPage : number) => void;
    fetchUserSubscriptionsTotalPages: (itemsPerPage: number, userId: string) => void;
    fetchSubscriptions: (query : Query) => void;
    fetchUserSubscriptions: (query : Query, userId: string) => void;
    createSubscription: (Subscription : CreateSubscription, userId: string, eventId: number) => void;
    createFreeSubscription: (userId: string, eventId: number) => void;
    removeSubscription: (userId: string, subscriptionId: number) => void;
}

type Props = { children: React.ReactNode };

const SUBSCRIPTION_END_POINT = "http://localhost:5014/api/subscription";

const SubscriptionsContext = createContext<SubscriptionContextType>({} as SubscriptionContextType);
export const SubscriptionsProvider  = ({ children } : Props) => {
    const navigate = useNavigate();
    const {showToast} = useToastHelper();
    const [totalPages, setTotalPages] = useState<number>(0);
    const [userTotalPages, setUserTotalPages] = useState<number>(0);
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

    const fetchSubscriptionsTotalPages= async (itemsPerPage: number) => {
        await AxiosWithAuth.get<result<number>>(  SUBSCRIPTION_END_POINT + "/pages?itemsPerPage=" + itemsPerPage)
            .then((res) => {
                setTotalPages(res.data.resultObject);
            }).catch((e) => {
                const ErrorMessage = ErrorHandler(e);
                showToast("Something went wrong!", ErrorMessage);
            });

    };

    const fetchUserSubscriptionsTotalPages = async (itemsPerPage: number, userId: string) => {
        await AxiosWithAuth.get<result<number>>(  SUBSCRIPTION_END_POINT + "/user/pages/" + userId + "?itemsPerPage=" + itemsPerPage)
            .then((res) => {
                setUserTotalPages(res.data.resultObject);
            }).catch((e) => {
                const ErrorMessage = ErrorHandler(e);
                showToast("Something went wrong!", ErrorMessage);
            });

    };

    const fetchSubscriptions = async (query : Query) => {
        await AxiosWithAuth.get<resultArray<Subscription>>(SUBSCRIPTION_END_POINT + "/subscriptions",
            {
                params: query
            })
            .then((res) => {
                setSubscriptions(res.data.resultObject);
            }).catch((e) => {
                const ErrorMessage = ErrorHandler(e);
                showToast("Something went wrong!", ErrorMessage);
            });

    };

    const fetchUserSubscriptions = async (query : Query, userId: string) => {
        await AxiosWithAuth.get<resultArray<Subscription>>(SUBSCRIPTION_END_POINT + "/user/" + userId,
            {
                params: query
            })
            .then((res) => {
                setSubscriptions(res.data.resultObject);
            }).catch((e) => {
                const ErrorMessage = ErrorHandler(e);
                showToast("Something went wrong!", ErrorMessage);
            });

    };
    const createSubscription = async (Subscription : CreateSubscription, userId: string, eventId: number ) => {
        const formData = new FormData();
        formData.append("cardNumber", Subscription.cardNumber);
        formData.append("cardHolderName", Subscription.cardHolder);
        formData.append("cardCVC", Subscription.cvc);
        formData.append("expiryDate", Subscription.expirationDate);

        await AxiosWithAuth.post<result<Subscription>>(SUBSCRIPTION_END_POINT + "/create/" + userId + "/" + eventId, formData,
            { headers: {"Content-Type": 'multipart/form-data'}
            })
            .then((res) => {
                const resultMessage = res.data.resultDescription.loggingMessage;
                showToast("Success", resultMessage);
                navigate("/user/subscriptions");

            }).catch((e) => {
                const ErrorMessage = ErrorHandler(e);
                showToast("Something went wrong!", ErrorMessage);
            });
    }

    const createFreeSubscription = async (userId: string, eventId: number) => {
        await AxiosWithAuth.post<result<Subscription>>(SUBSCRIPTION_END_POINT + "/create/free/" + userId + "/" + eventId)
            .then((res) => {
                const resultMessage = res.data.resultDescription.loggingMessage;
                showToast("Success", resultMessage);
                navigate("/user/subscriptions");
            }).catch((e) => {
                const ErrorMessage = ErrorHandler(e);
                showToast("Something went wrong!", ErrorMessage);
            });
    }

    const removeSubscription = async (userId: string, subscriptionId: number) => {
        await AxiosWithAuth.put<result<Subscription>>(SUBSCRIPTION_END_POINT + "/unsubscribe/" + userId + "/" + subscriptionId)
            .then((res) => {
                const resultMessage = res.data.resultDescription.loggingMessage;
                showToast("Success", resultMessage);
                navigate("/user/subscriptions");
            }).catch((e) => {
                const ErrorMessage = ErrorHandler(e);
                showToast("Something went wrong!", ErrorMessage);
            });
    }





    return (
        <SubscriptionsContext.Provider value={{createSubscription, createFreeSubscription, fetchSubscriptionsTotalPages, fetchUserSubscriptionsTotalPages, userTotalPages ,totalPages, fetchSubscriptions, subscriptions, fetchUserSubscriptions, removeSubscription}}>
            {children}
        </SubscriptionsContext.Provider>
    );
};
export const useSubscription = () : SubscriptionContextType => React.useContext(SubscriptionsContext);