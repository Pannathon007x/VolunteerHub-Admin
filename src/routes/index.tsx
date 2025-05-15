import { type RouteObject, Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ActivityList from "../pages/ActivityList";
import ActivityDetail from "../pages/ActivityDetail";
import MyActivities from "../pages/MyActivities";
import LoginPage from "../pages/LoginPage";
import NewActivity from "../pages/NewActivity";
import NotFoundPage from "../pages/NotFoundPage";
import EditActivities from "../pages/EditActivities";
import ApproveActivity from "../pages/ApproveActivity";
import CloseActivity from "../pages/CloseActivity";
import CancelActivity from "../pages/CancelActivity";

export const routes: RouteObject[] = [
    { path: "/", element: <HomePage /> },
    { path: "/activities", element: <ActivityList /> },
    { path: "/activities/:id", element: <ActivityDetail /> },
    { path: "/activities/new", element: <NewActivity /> },
    { path: "/my-activities", element: <MyActivities /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/activities/:id", element: <ActivityDetail /> },
    { path: "/activities/edit", element: <EditActivities /> },
    { path: "/activities/:id/approve", element: <ApproveActivity /> },
    { path: "/activities/:id/close", element: <CloseActivity /> },
    { path: "/activities/:id/cancel", element: <CancelActivity /> },

  { path: "/home", element: <Navigate to="/" replace /> },


    { path: "*", element: <NotFoundPage /> },
];
