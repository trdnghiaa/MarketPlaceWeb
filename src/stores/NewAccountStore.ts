import { action, makeAutoObservable, observable } from "mobx";
import { User } from "../models/User";
import { MIN_YEAR_OLD_USER } from "../utils";
import { FetchAPI, Method } from "../service/fetchAPI";
import { Store } from "./Store";
import { MESSAGE_TERMS } from "../utils/messageTerms";

export class NewAccountStore {
    @observable
    user: User = new User();
    @observable
    username: string = "";
    @observable
    password: string = "";

    @action init() {
        this.user = new User();
        this.set_username("");
        this.set_username("");
    }

    @action set_username(v: string) {
        if (v)
            this.username = v;
    }

    @action set_password(v: string) {
        if (v)
            this.password = v || "";
    }


    constructor(private store: Store) {
        makeAutoObservable(this);
    }

    @action get_User() {
        return this.user;
    }

    @action
    async createAccount() {
        const { user } = this;
        const regexs = {
            phone: /^[0-9\-\+]{10,12}$/g,
            email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
        }

        if (!user.last_name) {
            throw new Error(MESSAGE_TERMS.MISS_LAST_NAME);
        }

        if (!user.first_name) {
            throw new Error(MESSAGE_TERMS.MISS_FIRST_NAME);
        }

        if (user.dob.getFullYear() >= MIN_YEAR_OLD_USER) {
            throw new Error(MESSAGE_TERMS.WRONG_BIRTHDAY);
        }

        if (!user.address) {
            throw new Error(MESSAGE_TERMS.MISS_ADDRESS);
        }

        if (!user.email) {
            throw new Error(MESSAGE_TERMS.MISS_EMAIL);
        }

        if (!user.phone) {
            throw new Error(MESSAGE_TERMS.MISS_PHONE);
        }

        if (!regexs.phone.test(user.phone)) {
            throw new Error(MESSAGE_TERMS.WRONG_PHONE);
        }

        if (!regexs.email.test(user.email)) {
            throw new Error(MESSAGE_TERMS.WRONG_EMAIL);
        }

        if (!this.username || !this.password) {
            throw new Error(MESSAGE_TERMS.MISS_USER_N_PASS)
        }

        if (this.password.length < 8) {
            throw new Error(MESSAGE_TERMS.WRONG_PASS_LENGTH);
        }

        const [err, data] = await FetchAPI<{message: string, data: User}>(
            Method.POST,
            "/users/create",
            {
                ...this.user,
                username: this.username,
                password: this.password,
            }
        );

        return [err, data] as const;
    }
}