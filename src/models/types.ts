import { SvgIconComponent } from "@mui/icons-material";

export enum UserRole {
    USER = "USER",
    ADMIN = "ADMIN",
    SENSOR = "SENSOR"
}

export const roles: string[] = ["ADMIN", "SENSOR", "USER"];

export interface MenuLink{
    title: string,
    link?: string
}

export interface MenuItem {
    title: string,
    handle?: Function,
    link?: string,
    icon?: string
}

export interface MenuItemIcon {
    title: string,
    handle?: Function,
    link?: string,
    Icon: SvgIconComponent,
    isDrawer: boolean,
}

export interface IErrorData<T> extends Error {
    status: number;
    message: string;
    errorObject?: T
}

export enum MODE {
    VIEW = "view",
    EDIT = "edit"
}