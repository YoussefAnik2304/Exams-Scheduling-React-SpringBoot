import Sidebar from "@/components/SideBar.tsx";
import NavBarAdmin from "@/components/NavBarAdmin.tsx";
import {Outlet} from "react-router-dom";
import {Footer} from "@/components/Footer.tsx";
import {ScrollToTop} from "@/components/ScrollToTop.tsx";

export default function DefaultLayoutAdmin() {
    return (
        <>
            <NavBarAdmin/>
            <div className="flex min-h-screen w-full flex-col bg-background">
                <Sidebar/>
                <div className="flex flex-col justify-center sm:gap-4 sm:pl-14 bg-background">
                    <div className="px-4 md:px-20 py-10">
                        <Outlet/>
                    </div>
                </div>
            </div>
            <Footer />
            <ScrollToTop />
        </>
    )
}