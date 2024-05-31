import {createBrowserRouter} from "react-router-dom";
//  import Dashboard from "@/Pages/Dashboard.tsx";
import App from "@/App";
import LoginPage from "@/Pages/LoginPage.tsx";
import SignupPage from "@/Pages/SignupPage.tsx";
import DefaultLayoutAdmin from "@/layout/DefaultLayoutAdmin.tsx";
import DefaultLayoutUser from "@/layout/DefaultLayoutUser.tsx";
import ProfViewPage from "@/Pages/ProfViewPage.tsx";
import UnAuthorized from "@/Pages/UnAuthorized.tsx";
import NotFoundPage from "@/Pages/NotFoundPage.tsx";
import DefaultLayoutHome from "@/layout/DefaultLayoutHome.tsx";
import ProfilePage from "@/Pages/ProfilePage.tsx";
import CreateProfPage from "@/Pages/CreateProfPage.tsx";
import HomePage from "@/Pages/HomePage.tsx";
import CreateCoursePage from "@/Pages/CreateCoursePage.tsx";
import CoursesViewPage from "@/Pages/CoursesViewPage.tsx";
import ProfsViewPage from "@/Pages/ProfsViewPage.tsx";
import EditProfPage from "@/Pages/EditProfPage.tsx";
import EditCoursePage from "@/Pages/EditCoursePage.tsx";


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
                    { path: "prof", element: <ProfViewPage/> }
                ]
            },
            { path: "*", element: <NotFoundPage/> },
            {
                path: "/admin",
                element: <DefaultLayoutAdmin/>,
                children: [
                    { path: "profs", element: <ProfsViewPage/> },
                    { path: "profs/create", element: <CreateProfPage/> },
                    { path: "profs/edit/:id", element: <EditProfPage/> },
                    { path: "courses", element: <CoursesViewPage/> },
                    { path: "courses/create", element: <CreateCoursePage/> },
                    { path: "courses/edit/:id", element: <EditCoursePage/> },
                ]
            },
            {
                path: "/user",
                element: <DefaultLayoutUser/>,
                children: [
                    { path: "profs", element: <ProfsViewPage/> },
                    { path: "prof/view/:id", element: <ProfViewPage/> },
                    { path: "profile", element: <ProfilePage/> },
                ]
            },
        ]
    },
]);
