import { action, makeObservable, observable } from "mobx";
import { FetchAPI, Method } from "../service/fetchAPI";
import { User } from "../models/User";
import { MIN_YEAR_OLD_USER, TRANSLATE_TERMS } from "../utils";

export class SignUpStore {
    constructor() {
        makeObservable(this);
    }

    @observable user: User = new User();
    // 0 - Nam
    // 1 - Nữ
    @observable username: string = "";
    @observable password: string = "";
    @observable confirm: string = "";

    @action set_DOB(newValue: Date) {
        this.user.dob = newValue;
    }

    @action get_User() {
        return this.user;
    }

    @action set_username(v: string) {
        if (v)
            this.username = v;
    }

    @action set_password(v: string) {
        if (v)
            this.password = v || "";
    }

    @action set_confirm(v: string) {
        if (v)
            this.confirm = v;
    }

    @action
    async doSignUp() {
        const { user } = this;
        const regexs = {
            phone: /^[0-9\-\+]{10,12}$/g,
            email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
        }

        if (!user.last_name) {
            throw new Error(TRANSLATE_TERMS.MISS_LAST_NAME);
        }

        if (!user.first_name) {
            throw new Error(TRANSLATE_TERMS.MISS_FIRST_NAME);
        }

        if (user.dob.getFullYear() >= MIN_YEAR_OLD_USER) {
            throw new Error(TRANSLATE_TERMS.WRONG_BIRTHDAY);
        }

        if (!user.address) {
            throw new Error(TRANSLATE_TERMS.MISS_ADDRESS);
        }

        if (!user.email) {
            throw new Error(TRANSLATE_TERMS.MISS_EMAIL);
        }

        if (!user.phone) {
            throw new Error(TRANSLATE_TERMS.MISS_PHONE);
        }

        if (!regexs.phone.test(user.phone)) {
            throw new Error(TRANSLATE_TERMS.WRONG_PHONE);
        }

        if (!regexs.email.test(user.email)) {
            throw new Error(TRANSLATE_TERMS.WRONG_EMAIL);
        }

        if (this.username === "" || this.password === "" || this.confirm === "") {
            throw new Error(TRANSLATE_TERMS.MISS_USER_N_PASS)
        }

        if (this.password.length < 8) {
            throw new Error(TRANSLATE_TERMS.WRONG_PASS_LENGTH);
        }

        const [err, data] = await FetchAPI<User>(
            Method.POST,
            "/auth/signup",
            {
                ...this.user,
                username: this.username,
                password: this.password,
            }
        );

        return [err, data] as const;
    }

    @action
    async convertToPartnerAccount() {
        const [err, data] = await FetchAPI<{message: string}>(Method.POST, "/users/")
    }
}
