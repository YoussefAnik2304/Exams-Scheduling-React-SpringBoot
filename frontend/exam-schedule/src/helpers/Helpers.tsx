import {jwtDecode} from "jwt-decode";
import {customJwtPayload} from "@/context/AuthContext.tsx";


export const GetDecodedToken = () => {
    const jwtToken = localStorage.getItem("token")!;
    return jwtDecode<customJwtPayload>(jwtToken);
}