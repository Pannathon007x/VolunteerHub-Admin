import { type RouteObject, Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ActivityList from "../pages/ActivityList";
import ActivityDetail from "../pages/ActivityDetail";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import NewActivity from "../pages/NewActivity";
import EditActivityDetail from "../pages/EditActivityDetail";
import EditActivities from "../pages/EditActivities";
import ApproveActivity from "../pages/ApproveActivity";
import CloseActivity from "../pages/CloseActivity";
import CancelActivity from "../pages/CancelActivity";
import ApprovedActivitiesshow from "../pages/ApprovedActivitiesshow";
import MyActivities from "../pages/MyActivities";
import HistoryEvents from "../pages/HistoryEvents";

export const routes: RouteObject[] = [
  { path: "/", element: <HomePage /> },
  { path: "/activities", element: <ActivityList /> },
  { path: "/activities/:id", element: <ActivityDetail /> },
  { path: "/activities/new", element: <NewActivity /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/activities/:id", element: <ActivityDetail /> },
  { path: "/activities/edit", element: <EditActivities /> },
  { path: "/activities/:id/edit",element: <EditActivityDetail />,},
  { path: "/activities/:id/approve", element: <ApproveActivity /> },
  { path: "/activities/approved",element: <ApprovedActivitiesshow />,},
  { path: "/my-activities",element: <MyActivities />,},
  { path: "/history", element: <HistoryEvents /> },
  { path: "/activities/:id/close", element: <CloseActivity /> },
  { path: "/activities/:id/cancel", element: <CancelActivity /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/home", element: <Navigate to="/" replace /> },

];
