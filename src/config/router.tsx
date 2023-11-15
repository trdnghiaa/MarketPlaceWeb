import { Account, Categories, CategoryEditor, Home, Login, MyPost, NewAccount, NewPost, NotFound, NotificationPage, Order, PageMiddle, PostManager, PostPage, Profile, Register, RouteGuard, SavedPost, Voucher, } from "src/pages";
import React from "react";
import { UserRole } from "src/models";

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
            <NewAccount />, role: UserRole.ADMIN, name: "Tạo tài khoản"
    },
    {
        path: "/accounts",
        component: <Account />,
        role: UserRole.ADMIN, name: "Quản lý tài khoản",
    },
    {
        path: "/accounts/:account/:mode",
        component: <Profile />,
        role: UserRole.ADMIN, name: ":mode thông tin người dùng"
    },
    {
        path: "/categories",
        component: <Categories />,
        role: UserRole.ADMIN,
        name: "Quản lý danh mục"
    },
    {
        path: "/categories/new",
        component: <CategoryEditor />,
        role: UserRole.ADMIN,
        name: "Thêm danh mục"
    },
    {
        path: "/categories/:category/edit",
        component: <CategoryEditor />,
        role: UserRole.ADMIN,
        name: "Chỉnh sửa danh mục"
    }, {
        path: "/post-manager",
        component: <PostManager />,
        role: UserRole.SENSOR,
        name: "Quản lý tin đăng"
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
    { path: "/posts/:id/", component: <PostPage />, name: "Tin đăng" },
    { path: "*", component: <NotFound />, name: "Không tim thấy trang" },
];

export const routerConfig = routers.concat(routersAdmin).map((e) => {
    if (e.isPrivate || e.role)
        e.component = <RouteGuard allowRole={e.role || UserRole.USER}
                                  children={<PageMiddle child={e.component} name={e.name} key={e.path} />} />
    else {
        e.component = <PageMiddle child={e.component} name={e.name} key={e.path} />;
    }
    return e;
});
