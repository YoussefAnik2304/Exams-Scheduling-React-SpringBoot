import {createBrowserRouter} from "react-router-dom";
//  import Dashboard from "@/Pages/Dashboard.tsx";
import App from "@/App";
import LoginPage from "@/Pages/LoginPage.tsx";
import SignupPage from "@/Pages/SignupPage.tsx";
import DefaultLayoutAdmin from "@/layout/DefaultLayoutAdmin.tsx";
import DefaultLayoutUser from "@/layout/DefaultLayoutUser.tsx";
import FormationsPage from "@/Pages/FormationsPage.tsx";
import ProfViewPage from "@/Pages/ProfViewPage.tsx";
import ProfViewAdminPage from "@/Pages/ProfViewAdminPage.tsx";
import ProfsPageAdmin from "@/Pages/ProfsPageAdmin.tsx";
import UsersPage from "@/Pages/UsersPage.tsx";
import UnAuthorized from "@/Pages/UnAuthorized.tsx";
import NotFoundPage from "@/Pages/NotFoundPage.tsx";
import DefaultLayoutHome from "@/layout/DefaultLayoutHome.tsx";
import ProfilePage from "@/Pages/ProfilePage.tsx";
import CreateProfPage from "@/Pages/CreateProfPage.tsx";
import HomePage from "@/Pages/HomePage.tsx";
import CreateCoursePage from "@/Pages/CreateCoursePage.tsx";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "", element: <HomePage/> },
            { path: "login", element: <LoginPage /> },
            { path: "register", element: <SignupPage /> },
            { path: "unauthorized", element: <UnAuthorized /> },
            {
                path: "/home",
                element: <DefaultLayoutHome/>,
                children: [
                    {
                        path: "prof",
                        element: <ProfViewPage/>
                    }
                ]
            },
            { path: "*", element: <NotFoundPage/> },
            {
                path: "/admin",
                element:
                        <DefaultLayoutAdmin/>,
                children: [
                    {
                        path: "profs",
                        element:

                            <ProfsPageAdmin/>

                    },

                    {
                        path: "profs/create",
                        element:

                                <CreateProfPage/>

                    },
                    {
                        path: "profs/edit",
                        element:

                                <ProfViewAdminPage/>

                    },
                    {
                        path: "courses",
                        element:

                                <UsersPage/>

                    },

                    {
                        path: "courses/create",
                        element:

                                <CreateCoursePage/>

                    },
                    {
                        path: "courses/edit",
                        element:

                            <ProfilePage/>

                    },
                ]

            },
            {
                path: "/user",
                element:

                        <DefaultLayoutUser/>,

                children: [
                    {
                        path: "profs",
                        element:
                                <FormationsPage/>
                    },
                    {
                        path: "prof/view",
                        element:

                                <ProfViewPage/>

                    },
                    {
                        path: "profile",
                        element:

                                <ProfilePage/>

                    },
                ]
            },
        ]
    },
]);