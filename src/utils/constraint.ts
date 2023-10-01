import { store } from "../stores";
import { MenuItem, MenuLink } from "../models/types";


export const srcIcon = "./favicon.ico";

export const PRIMARY_COLOR = "#1976d2";

export const APP_NAME = "ChoToi";

export const ADVERTISEMENTS = [
    "https://ik.imagekit.io/tvlk/image/imageResource/2022/04/05/1649154913787-703cafe0bf9fed04d9937ba931cf5866.jpeg?tr=h-230,q-75,w-472",
    "https://ik.imagekit.io/tvlk/image/imageResource/2022/04/20/1650452762625-64e60040df800d64883810d8418bf55f.png?tr=h-230,q-75,w-472",
    "https://ik.imagekit.io/tvlk/image/imageResource/2022/04/20/1650419216415-bbacd77365861c070e21903a924646c2.jpeg?tr=h-230,q-75,w-472",
    "https://ik.imagekit.io/tvlk/image/imageResource/2022/04/20/1650452397612-fa7bad123bb9e7b59477e09af81eaee6.png?tr=h-230,q-75,w-472",
    "https://ik.imagekit.io/tvlk/image/imageResource/2022/03/17/1647503048361-a3928b8284951876f8517363b77e110c.jpeg?tr=h-230,q-75,w-472",
    "https://ik.imagekit.io/tvlk/image/imageResource/2022/04/07/1649315686206-427fdc6225748d594d5b914dfa7d0cad.jpeg?tr=h-230,q-75,w-472",
];

export const MIN_YEAR_OLD_USER = new Date().getFullYear() - 16;

export const ADMIN_SETTINGS: MenuItem[] = [
    { title: "Profile", link: "/profile/view" },
    { title: "Dashboard", link: "/" },
    { title: "Logout", handle: store.Logout },
];

// u can add new item in menu here
export const MENU_SENSOR = [
    { name: "vouchers", path: "/vouchers" },
    { name: "orders", path: "/orders" },
];

export const MENU_ADMIN = [
    { name: "Tài Khoản", path: "/accounts" },
    { name: "Thể Loại", path: "/categories" },
    { name: "Bài Đăng", path: "/post" },
    { name: "vouchers", path: "/vouchers" },
]

export const USER_SETTINGS: MenuItem[] = [
    {
        title: "Chỉnh sửa hồ sơ",
        link: "/profile/view",
        icon: "https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/5/57c03b6d35b76670f2d701310cc18b26.svg",
    },
    {
        title: "Điểm thưởng của tôi",
        link: "/",
        icon: "https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/e/e092465666a2dfe398407794a893cbcc.svg",
    },
    {
        title: "Thẻ của tôi",
        link: "/",
        icon: "https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/4/468b3a08ab94b440b4e09fb9130eee1e.svg",
    },
    {
        title: "Danh sách giao dịch",
        link: "/orders/history",
        icon: "https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/0/0965a06a63e873adb97d5ed7d7b92dbe.svg",
    },
    {
        title: "Đặt chỗ của tôi",
        link: "/",
        icon: "https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/b/b0f87008a7a01d72ffb5eacf06870cba.svg",
    },
    {
        title: "Thông báo giá vé máy bay",
        link: "/",
        icon: "https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/7/70100d4a2047ac955124953dbc3351db.svg",
    },
    {
        title: "Khuyến mãi",
        link: "/vouchers",
        icon: "https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/c/cef9778118bdd85e1062cdd0b6196362.svg",
    },
    {
        title: "Đăng xuất",
        handle: store.Logout,
        icon: "https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/6/6464840154eb190d10525ea67e77648a.svg",
    },
];

export const MENU_ICONS = [
    "https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/5/57c03b6d35b76670f2d701310cc18b26.svg",
    "https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/e/e092465666a2dfe398407794a893cbcc.svg",
    "https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/4/468b3a08ab94b440b4e09fb9130eee1e.svg",
    "https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/0/0965a06a63e873adb97d5ed7d7b92dbe.svg",
    "https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/b/b0f87008a7a01d72ffb5eacf06870cba.svg",
    "https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/7/70100d4a2047ac955124953dbc3351db.svg",
    "https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/c/cef9778118bdd85e1062cdd0b6196362.svg",
    "https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/6/6464840154eb190d10525ea67e77648a.svg",
];

export const DRAWER_ITEMS: MenuLink[] = [
    { title: "Trang chủ", link: "/" },
    { title: "Hợp tác với chúng tôi", link: "/partnership" },
    { title: "Đã Lưu" },
    { title: "Đặt chỗ của tôi" },
];

export const DRAWER_ICONS = [
    "https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/4/455eab646e53732d81380eabadf10b47.svg",
    "https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/b/bdab924c2bd3a5fb492022beb158a6ef.svg",
    "https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/c/c80a2b136969e32f4db682792d1110f6.svg",
    "https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/b/b0f87008a7a01d72ffb5eacf06870cba.svg",
];

export const LOGO_TRAVELOKA =
    "https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/3/30bf6c528078ba28d34bc3e37d124bdb.svg";


export const regexes = {
    phone: /^[0-9\-\+]{10,12}$/g,
    email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
}