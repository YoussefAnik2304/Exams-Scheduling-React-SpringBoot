import {createContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import {RegisterUser, UserProfil} from "@/types/user.ts";
import { useToast } from "@/components/ui/use-toast.ts"
import {jwtDecode, JwtPayload} from "jwt-decode";
import axios from "axios";
import {ErrorHandler} from "@/helpers/ErrorHandler.tsx";
import {AxiosWithAuth} from "@/api/axios.ts";
import {result} from "@/types/helperTypes.ts";

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

    const registerUser = async (User : RegisterUser) => {
        const formData = new FormData();
        formData.append("email", User.email);
        formData.append("password", User.password);
        formData.append("username", User.username);
        formData.append("firstname", User.firstName);
        formData.append("lastname", User.lastName);
        formData.append("phone", User.phone!);
        formData.append("role", User.role);
        await axios.post<UserProfil>( "http://localhost:5014/api/account/register", formData,
            { headers: {"Content-Type": 'multipart/form-data'}
            })
            .then((res) => {
                if (res) {
                    const jwtToken = res?.data.token;
                    localStorage.setItem("token", jwtToken);
                    const decodedToken = jwtDecode<customJwtPayload>(jwtToken);
                    const userObj = {
                        username: res?.data.username,
                        email: res?.data.email,
                        firstName: res?.data.firstName,
                        lastName: res?.data.lastName,
                        phone: res?.data.phone,
                        role: res?.data.role,
                        profilPhoto: res?.data.profilPhoto,
                        createdAt: res?.data.createdAt,
                        token: jwtToken
                    };
                    localStorage.setItem("user", JSON.stringify(userObj));
                    setToken(jwtToken!);
                    setUser(userObj!);
                    toast({
                        title: "Success",
                        description: "You account has been successfully created",
                    })
                    if(decodedToken.role === "User")
                        navigate("/user/events");
                    else if(decodedToken.role === "Admin")
                        navigate("/admin/events");
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

    const updateUser = async (User: RegisterUser, userId: string) => {
        const formData = new FormData();
        formData.append("email", User.email);
        formData.append("password", User.password);
        formData.append("username", User.username);
        formData.append("firstname", User.firstName);
        formData.append("lastname", User.lastName);
        formData.append("phone", User.phone!);
        formData.append("user", User.role);
        formData.append("Image", User.profilePhoto!);
        await AxiosWithAuth.put<result<UserProfil>>( "http://localhost:5014/api/account/update/" + userId, formData,
            { headers: {"Content-Type": 'multipart/form-data'}
            })
            .then((res) => {
                if (res && res.data) {
                    const result = res.data.resultObject;
                    const jwtToken = localStorage.getItem("token")
                    const userObj = {
                        username: result.username,
                        email: result.email,
                        firstName: result.firstName,
                        lastName: result.lastName,
                        phone: result.phone,
                        role: result.role,
                        profilPhoto: result.profilPhoto,
                        createdAt: result.createdAt,
                        token: jwtToken!
                    };
                    localStorage.setItem("user", JSON.stringify(userObj));
                    setToken(jwtToken!);
                    setUser(userObj!);
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
        await axios.post("http://localhost:5014/api/account/signin", {
            email: email,
            password: password,
        })
            .then((res) => {
                if (res && res.data) {
                    const jwtToken = res?.data.token;
                    localStorage.setItem("token", jwtToken);
                    const decodedToken = jwtDecode<customJwtPayload>(jwtToken);
                    const userObj = {
                        username: res?.data.username,
                        email: res?.data.email,
                        firstName: res?.data.firstName,
                        lastName: res?.data.lastName,
                        phone: res?.data.phone,
                        role: res?.data.role,
                        profilPhoto: res?.data.profilPhoto,
                        createdAt: res?.data.createdAt,
                        token: jwtToken
                    };
                    localStorage.setItem("user", JSON.stringify(userObj));
                    setToken(jwtToken!);
                    setUser(userObj!);
                    toast({
                        title: "Success",
                        description: "You have been logged in successfully",
                    })
                    if(decodedToken.role === "User")
                        navigate("/user/events");
                    else if(decodedToken.role === "Admin")
                        navigate("/admin/events");
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