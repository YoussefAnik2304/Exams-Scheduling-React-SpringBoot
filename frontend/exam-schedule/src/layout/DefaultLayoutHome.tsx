import {Outlet} from "react-router-dom";
import {Footer} from "@/components/Footer.tsx";
import {ScrollToTop} from "@/components/ScrollToTop.tsx";
import {NavBarHome} from "@/components/NavBarHome.tsx";
export default function DefaultLayoutHome() {
    return (
        <>
            <NavBarHome/>
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