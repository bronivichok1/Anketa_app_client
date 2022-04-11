import Admin from "./pages/Admin"
import Auth from "./pages/Auth"
import DeleteReports from "./pages/DeleteReports"
import EditAdmins from "./pages/EditAdmins"
import EditAnketa from "./pages/EditAnketa"
import EditCafedras from "./pages/EditCafedras"
import EditCafedrasUsers from "./pages/EditCafedrasUsers"
import EditUser from "./pages/EditUser"
import Report from "./pages/Report"
import SeeReports from "./pages/SeeReports"
import { ADMIN_ROUTE, DELETE_REPORTS_ROUTE, EDIT_ADMINS_ROUTE, EDIT_BLANK_ROUTE, EDIT_CAFEDRAS_ROUTE, EDIT_CAFEDRAS_USERS_ROUTE, EDIT_USER, LOGIN_ROUTE, REPORT_ROUTE, SEE_REPORTS_ROUTE } from "./utils/consts"

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: <Admin/>
    },
    {
        path: DELETE_REPORTS_ROUTE,
        Component: <DeleteReports/>
    },
    {
        path: EDIT_ADMINS_ROUTE,
        Component: <EditAdmins/>
    },
    {
        path: EDIT_BLANK_ROUTE,
        Component: <EditAnketa/>
    },
    {
        path: EDIT_CAFEDRAS_ROUTE,
        Component: <EditCafedras/>
    },
    {
        path: EDIT_CAFEDRAS_USERS_ROUTE,
        Component: <EditCafedrasUsers/>
    },
   
]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: <Auth/>
    },
   
]

export const publicAuthRoutes = [
    {
        path: REPORT_ROUTE,
        Component: <Report/>
    },
    {
        path: SEE_REPORTS_ROUTE,
        Component: <SeeReports/>
    },
    {
        path: EDIT_USER,
        Component: <EditUser/>
    },
   
]