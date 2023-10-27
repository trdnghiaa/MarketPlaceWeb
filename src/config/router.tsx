// import page
import { Account, Home, Login, MyPost, NewAccount, NewPost, NotFound, Order, Profile, SavedPost, Voucher, } from "../pages";
import { Register } from "../pages/Register";
import React from "react";
import { UserRole } from "../models";
import { RouteGuard } from "../components/Protected";
import { PageMiddle } from "../pages/PageMiddle";
import { Categories } from "../pages/Categories";
import { NotificationPage } from "../pages/User/Notification";
import { Detail } from "../pages/Detail";
import { Search } from "../pages/Search";

export interface RouteModel {
    path: string,
    component: React.ComponentElement<any, any>;
    isPrivate?: boolean; // have logged in?
    role?: UserRole;
    name: string;
}

const routersAdmin: RouteModel[] = [
    {
        path: "/accounts/new", component:
            <NewAccount />, isPrivate: true, role: UserRole.ADMIN, name: "Tạo tài khoản"
    },
    {
        path: "/accounts",
        component: <Account />,
        isPrivate: true,
        role: UserRole.ADMIN, name: "Quản lý tài khoản",
    },
    {
        path: "/accounts/:account/:mode",
        component: <Profile />,
        isPrivate: true,
        role: UserRole.ADMIN, name: ":mode thông tin người dùng"
    },
    {
        path: "/categories",
        component: <Categories />,
        isPrivate: true,
        role: UserRole.ADMIN,
        name: "Quản lý thể loại"
    }
];

// u can add new route in here
const routers: RouteModel[] = [
    { path: "/", component: <Home />, name: "Trang chủ" },
    { path: "/login", component: <Login />, name: "Đăng nhập" },
    { path: "/vouchers", component: <Voucher />, isPrivate: true, name: "Vourcher" },
    { path: "/orders", component: <Order />, isPrivate: true, name: "Danh sách đơn hàng" },
    { path: "/partnership", component: <Register />, name: "" },
    { path: "/profile/:mode", component: <Profile />, isPrivate: true, name: ":mode thông tin người dùng" },
    { path: "/new-post", component: <NewPost />, name: "Tạo tin mới", isPrivate: true },
    { path: "/my-post", component: <MyPost />, name: "Tin đã đăng", isPrivate: true },
    { path: "/saved-post", component: <SavedPost />, name: "Tin đã lưu", isPrivate: true },
    { path: "/signup", component: <Register />, name: "Đăng ký tài khoản" },
    { path: "/notifications", component: <NotificationPage />, name: "Thông báo", isPrivate: true },
    { path: "*", component: <NotFound />, name: "Không tim thấy trang" },
    { path: "/detail", component: <Detail />, name: "Trang thông tin bài đăng"},
    {path: "/search", component: <Search />, name: ""}
];

export const routerConfig = routers.concat(routersAdmin).map((e) => {
    if (e.isPrivate)
        e.component = <RouteGuard allowRole={e.role || UserRole.USER}
                                  children={<PageMiddle child={e.component} name={e.name} key={e.path} />} />
    else {
        e.component = <PageMiddle child={e.component} name={e.name} key={e.path} />;
    }
    return e;
});
