import {createContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import {RegisterUser, UserProfil} from "@/types/user.ts";
import { useToast } from "@/components/ui/use-toast.ts"
import { JwtPayload} from "jwt-decode";
import axios from "axios";
import {ErrorHandler} from "@/helpers/ErrorHandler.tsx";
import {handleFetch} from "@/api/axios.ts";

export type customJwtPayload = JwtPayload & { UserId: string, role: string };


type UserContextType = {
    user: UserProfil | null;
    token: string | null;
    registerUser: (User : RegisterUser) => void;
    loginUser: (email: string, password: string) => void;
    updateUser: (User: RegisterUser, userId: string) => void;
    logout: () => void;
    isLoggedIn: () => boolean;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
    const navigate = useNavigate();
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<UserProfil | null>(null);
    const [isReady, setIsReady] = useState(false);
    const {toast} = useToast();

    useEffect(() => {
        const user = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        if (user && token) {
            setUser(JSON.parse(user));
            setToken(token);
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        }
        setIsReady(true);
    }, []);

    const registerUser = async (User :RegisterUser) => {
        const formData = new FormData();
        formData.append("firstName", User.firstName);
        formData.append("lastName", User.lastName);
        formData.append("email", User.email);
        formData.append("password", User.password);
    
        await axios.post<UserProfil>("http://localhost:8080/Auth/register", formData,{
            headers: {
                "Content-Type": "application/json",
            }
    })
            .then((res) => {
                if (res) {
                    const jwtToken = res.data.access_token;
                    localStorage.setItem("token", jwtToken);
                    const userObj = {
                        email: res.data.email,
                        firstName: res.data.firstName,
                        lastName: res.data.lastName,
                        password: res.data.password
                    };
                    localStorage.setItem("loggedinuser", JSON.stringify(userObj));
                    toast({
                        title: "Success",
                        description: "You have been logged in successfully",
                    });
                    navigate("/admin");
                }
            })
            .catch((e) => {
                const ErrorMessage = ErrorHandler(e);
                toast({
                    title: "Something went wrong!",
                    description: ErrorMessage,
                });
            });
    };
    
    const updateUser = async (User: RegisterUser) => {
        const formData = new FormData();
        formData.append("email", User.email);
        formData.append("password", User.password);
        formData.append("firstname", User.firstName);
        formData.append("lastname", User.lastName);
        await handleFetch("/Auth/update","post",formData)
            .then((res) => {
                if (res && res.data) {
                    const result = res.data.resultObject;
                    const userObj = {
                        email: result.email,
                        firstName: result.firstName,
                        lastName: result.lastName,
                    };
                    localStorage.setItem("loggedinuser", JSON.stringify(userObj));
                    const resultMessage = res.data.resultDescription.loggingMessage;
                    toast({
                        title: "Success",
                        description: resultMessage,
                    })
                }
            })
            .catch((e) => {
                const ErrorMessage = ErrorHandler(e);
                toast({
                    title: "Something went wrong!",
                    description: ErrorMessage,
                })
            });
    };

    const loginUser = async (email: string, password: string) => {

        await axios.post<UserProfil>("http://localhost:8080/Auth/login", {
            email: email,
            password: password,
        })
            .then((res) => {
                if (res && res.data && res.data.access_token!=null) {

                    const jwtToken = res?.data.access_token;
                    localStorage.setItem("token", jwtToken);
                    const userObj = {
                        email: res?.data.email,
                        firstName: res?.data.firstName,
                        lastName: res?.data.lastName,
                        password: res?.data.password,
                    };
                    localStorage.setItem("loggedinuser", JSON.stringify(userObj));
                    toast({
                        title: "Success",
                        description: "You have been logged in successfully",
                    })
                        navigate("/admin");
                }
            })
            .catch((e) => {
                const ErrorMessage = ErrorHandler(e);
                toast({
                    title: "Something went wrong!",
                    description: ErrorMessage,
                })
            });
    };

    const isLoggedIn = () => {
        return !!user;
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setToken("");
        navigate("/");
    };

    return (
        <UserContext.Provider value={{ loginUser, user, token, logout, isLoggedIn, registerUser, updateUser }}>
            {isReady ? children : null}
        </UserContext.Provider>
    );
};

export const useAuth = () : UserContextType => React.useContext(UserContext);