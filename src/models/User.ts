import { FetchAPI, Method } from "src/service/fetchAPI";
import { action, computed, makeObservable, observable } from "mobx";
import { UserRole } from "./types";

export class User {
    @observable
    _id: string;
    @observable
    email: string;
    @observable
    username: string;
    @observable
    first_name: string;
    @observable
    last_name: string;
    @observable
    gender: boolean;
    @observable
    dob: Date;
    @observable
    phone: string;
    @observable
    address: string;
    @observable
    role: UserRole | string;
    @observable
    reward: number;
    @observable
    access_token: string;
    @observable
    last_access: Date;
    @observable
    avatar: string;

    constructor(data?: any) {
        this._id = "";
        this.email = "";
        this.username = "";
        this.first_name = "";
        this.last_name = "";
        this.gender = false;
        this.dob = new Date();
        this.phone = "";
        this.address = "";
        this.role = UserRole.USER;
        this.reward = 0;
        this.access_token = "";
        this.last_access = new Date();
        this.avatar = "";

        if (data != null) {
            const {
                _id,
                email,
                username,
                first_name,
                last_name,
                gender,
                dob,
                phone,
                address,
                role,
                reward,
                last_access,
                avatar
            } = data;

            this._id = _id;
            this.email = email;
            this.username = username;
            this.first_name = first_name;
            this.last_name = last_name;
            this.gender = gender;
            this.dob = new Date(dob);
            this.phone = phone;
            this.address = address;
            this.role = role;
            this.reward = reward;
            this.last_access = new Date(last_access);
            this.avatar = avatar;

        }
        makeObservable(this);
    }

    @computed get fullName() {
        return this.last_name + " " + this.first_name;
    }

    @action set_gender(v: boolean) {
        this.gender = v;
    }

    static async getAllUser(page: number, size: number, query?: string) {
        // @ts-ignore
        const searchParams: string = new URLSearchParams({ page, size, ...(query ? { query } : {}) }).toString();

        const [err, data] = await FetchAPI<{data: User[], count: number, totalPages: number}>(Method.GET, `/users?` + searchParams);

        return [err, data] as const;
    }

    static async getUserById(id: string) {
        const [err, data] = await FetchAPI<User>(
            Method.GET,
            "/users/" + id
        );

        return [err, new User(data)] as const;
    }

    static async getTypes() {
        const [err, data] = await FetchAPI<string[]>(
            Method.GET,
            "/users/types"
        );
        return [err, data] as const;
    }

    static async getMe() {
        const [err, data] = await FetchAPI<User>(Method.GET, "/users/me");

        return [err, new User(data)] as const;
    }

    static async update(id: string, user: any) {
        const [err, data] = await FetchAPI<{message: string}>(Method.PUT, "/users/" + id, user);
        return [err, data] as const;
    }

    static async delete(id: string) {
        const [err, data] = await FetchAPI<{message: string}>(Method.DELETE, "/users/" + id);
        return [err, data] as const;
    }

    static async changePassword(id: string, new_password: string, old_password: string) {
        const [err, data] = await FetchAPI<{message: string}>(Method.POST, `/users/${id}/change-password`, {
            new_password,
            old_password
        });
        return [err, data] as const;
    }

    @action set_address(v: string) {
        this.address = v;
    }
}
