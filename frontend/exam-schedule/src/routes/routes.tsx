import {createBrowserRouter} from "react-router-dom";
//  import Dashboard from "@/Pages/Dashboard.tsx";
import App from "@/App";
import LoginPage from "@/Pages/LoginPage.tsx";
import SignupPage from "@/Pages/SignupPage.tsx";
import DefaultLayoutAdmin from "@/layout/DefaultLayoutAdmin.tsx";
import DefaultLayoutUser from "@/layout/DefaultLayoutUser.tsx";
import EventsPage from "@/Pages/EventsPage.tsx";
import EventViewPage from "@/Pages/EventViewPage.tsx";
import EventViewAdminPage from "@/Pages/EventViewAdminPage.tsx";
import CreateEventPage from "@/Pages/CreateEventPage.tsx";
import EventsPageAdmin from "@/Pages/EventsPageAdmin.tsx";
import UsersPage from "@/Pages/UsersPage.tsx";
import SubscriptionsPage from "@/Pages/SubscriptionsPage.tsx";
import UserSubscriptionsPage from "@/Pages/UserSubscriptionsPage.tsx";
import ProtectedRoute from "@/routes/ProtectedRoute.tsx";
import UnAuthorized from "@/Pages/UnAuthorized.tsx";
import NotFoundPage from "@/Pages/NotFoundPage.tsx";
import DefaultLayoutHome from "@/layout/DefaultLayoutHome.tsx";
import ProfilePage from "@/Pages/ProfilePage.tsx";
import HomePage from "@/Pages/HomePage.tsx";


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
                        path: "event",
                        element: <EventViewPage/>
                    }
                ]
            },
            { path: "*", element: <NotFoundPage/> },
            {
                path: "/admin",
                element:
                    <ProtectedRoute allowedRoles={["Admin"]}>
                        <DefaultLayoutAdmin/>,
                    </ProtectedRoute>,
                children: [
                    {
                        path: "event/edit",
                        element:
                            <ProtectedRoute allowedRoles={["Admin"]}>
                                <EventViewAdminPage/>
                            </ProtectedRoute>
                    },
                    {
                        path: "event/create",
                        element:
                            <ProtectedRoute allowedRoles={["Admin"]}>
                                <CreateEventPage/>
                            </ProtectedRoute>
                    },
                    {
                        path: "events",
                        element:
                            <ProtectedRoute allowedRoles={["Admin"]}>
                                <EventsPageAdmin/>
                            </ProtectedRoute>
                    },
                    {
                        path: "users",
                        element:
                            <ProtectedRoute allowedRoles={["Admin"]}>
                                <UsersPage/>
                            </ProtectedRoute>

                    },
                    {
                        path: "subscriptions",
                        element:
                            <ProtectedRoute allowedRoles={["Admin"]}>
                                <SubscriptionsPage/>
                            </ProtectedRoute>
                    },
                    {
                        path: "profile",
                        element:
                            <ProtectedRoute allowedRoles={["Admin"]}>
                                <ProfilePage/>
                            </ProtectedRoute>
                    },
                ]
            },
            {
                path: "/user",
                element:
                    <ProtectedRoute allowedRoles={["User"]}>
                        <DefaultLayoutUser/>
                    </ProtectedRoute>,

                children: [
                    {
                        path: "events",
                        element:
                            <ProtectedRoute allowedRoles={["User"]}>
                                <EventsPage/>
                            </ProtectedRoute>
                    },
                    {
                        path: "event/view",
                        element:
                            <ProtectedRoute allowedRoles={["Admin"]}>
                                <EventViewPage/>
                            </ProtectedRoute>
                    },
                    {
                        path: "subscriptions",
                        element:
                            <ProtectedRoute allowedRoles={["Admin"]}>
                                <UserSubscriptionsPage/>
                            </ProtectedRoute>
                    },
                    {
                        path: "profile",
                        element:
                            <ProtectedRoute allowedRoles={["Admin"]}>
                                <ProfilePage/>
                            </ProtectedRoute>
                    },
                ]
            },
        ]
    },
]);