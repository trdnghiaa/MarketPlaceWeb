// import page
import {
    Login,
    Account,
    Voucher,
    NotFound,
    Profile,
    Home,
    Order, NewAccount,
} from "../pages";
import { Register } from "../pages/Register";

// u can add new route in here
export const routerConfig = [
    { path: "/", component: <Home /> },
    { path: "/login", component: <Login /> },
    { path: "/vouchers", component: <Voucher />, isPrivate: true },
    { path: "/orders", component: <Order />, isPrivate: true },
    { path: "/partnership", component: <Register /> },
    { path: "/profile/:mode", component: <Profile />, isPrivate: true },
    { path: "/accounts/new", component: <NewAccount />, isPrivate: true, isAdmin: true },
    {
        path: "/accounts",
        component: <Account />,
        isPrivate: true,
        isAdmin: true,
    },
    {
        path: "/accounts/:account/:mode",
        component: <Profile />,
        isPrivate: true,
        isAdmin: true,
    },
    { path: "/home", component: <Home /> },
    { path: "/signup", component: <Register /> },
    { path: "*", component: <NotFound /> },
];
