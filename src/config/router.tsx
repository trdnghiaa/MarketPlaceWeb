// import page
import { Account, Home, Login, MyPost, NewAccount, NewPost, NotFound, Order, Profile, SavedPost, Voucher, } from "../pages";
import { Register } from "../pages/Register";
import React from "react";
import { UserRole } from "../models/types";
import { RouteGuard } from "../components/Protected";
import { PageMiddle } from "../pages/PageMiddle";

export interface RouteModel {
    path: string,
    component: React.ComponentElement<any, any>;
    isPrivate?: boolean;
    role?: UserRole;
    isAdmin?: boolean;
    name: string;
}

// u can add new route in here
const routers: RouteModel[] = [
    { path: "/", component: <Home />, name: "Trang chủ" },
    { path: "/login", component: <Login />, name: "Đăng nhập" },
    { path: "/vouchers", component: <Voucher />, isPrivate: true, name: "Vourcher" },
    { path: "/orders", component: <Order />, isPrivate: true, name: "Danh sách đơn hàng" },
    { path: "/partnership", component: <Register />, name: "" },
    { path: "/profile/:mode", component: <Profile />, isPrivate: true, name: ":mode thông tin người dùng" },
    {
        path: "/accounts/new", component:
            <NewAccount />, isPrivate: true, isAdmin: true, role: UserRole.ADMIN, name: "Tạo tài khoản"
    },
    {
        path: "/accounts",
        component: <Account />,
        isPrivate: true,
        isAdmin: true, role: UserRole.ADMIN, name: "Quản lý tài khoản",
    },
    {
        path: "/accounts/:account/:mode",
        component: <Profile />,
        isPrivate: true,
        isAdmin: true, role: UserRole.ADMIN, name: ":mode thông tin người dùng"
    },
    { path: "/new-post", component: <NewPost />, name: "Tạo tin mới", isPrivate: true },
    { path: "/my-post", component: <MyPost />, name: "Tin đã đăng", isPrivate: true },
    { path: "/saved-post", component: <SavedPost />, name: "Tin đã lưu", isPrivate: true },
    { path: "/signup", component: <Register />, name: "Đăng ký tài khoản" },
    { path: "*", component: <NotFound />, name: "Không tim thấy trang" },
];

export const routerConfig = routers.map((e) => {
    if (e.isPrivate)
        e.component = <RouteGuard allowRole={e.role || UserRole.USER}
                                  children={<PageMiddle child={e.component} name={e.name} />} />
    else {
        e.component = <PageMiddle child={e.component} name={e.name} />;
    }
    return e;
});
