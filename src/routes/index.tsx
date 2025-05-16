import { type RouteObject, Navigate } from "react-router-dom";
import ActivityList from "../pages/ActivityList";
import ActivityDetail from "../pages/ActivityDetail";
import LoginPage from "../pages/LoginPage";
import NewActivity from "../pages/NewActivity";
import EditActivityDetail from "../pages/EditActivityDetail";
import EditActivities from "../pages/EditActivitiesList";
import ApproveActivity from "../pages/ApproveActivity";
import CancelActivity from "../pages/CancelActivity";

export const routes: RouteObject[] = [
  
  { path: "/activities", element: <ActivityList /> },
  { path: "/activities/:id", element: <ActivityDetail /> },
  { path: "/activities/new", element: <NewActivity /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/activities/:id", element: <ActivityDetail /> },
  { path: "/activities/edit", element: <EditActivities /> },
  { path: "/activities/:id/edit",element: <EditActivityDetail />,},
  { path: "/activities/:id/approve", element: <ApproveActivity /> },
  { path: "/activities/:id/cancel", element: <CancelActivity /> },
  { path: "/home", element: <Navigate to="/" replace /> },

];
