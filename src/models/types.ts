export enum UserRole {
    USER = "USER",
    ADMIN = "ADMIN",
    SENSOR = "SENSOR"
}

export const roles: string[] = ["ADMIN", "USER", "PARTNER"];

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

export interface IErrorData<T> extends Error {
    status: number;
    message: string;
    errorObject?: T
}

export enum MODE {
    VIEW = "view",
    EDIT = "edit"
}