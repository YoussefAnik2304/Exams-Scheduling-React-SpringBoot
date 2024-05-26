import {Outlet} from "react-router-dom";
import NavBarUser from "@/components/NavBarUser.tsx";
import {Footer} from "@/components/Footer.tsx";
import {ScrollToTop} from "@/components/ScrollToTop.tsx";
import {useAuth} from "@/context/AuthContext.tsx";

export default function DefaultLayoutUser() {
    const {user} = useAuth();
    console.log(user);
    return (
        <>
            <NavBarUser/>
            <div className="flex flex-col justify-center sm:gap-4 bg-background">
                <div className="px-4 md:px-20 py-10">
                    <Outlet/>
                </div>
            </div>
            <Footer />
            <ScrollToTop />
        </>
    )
}