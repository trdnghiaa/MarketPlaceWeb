import { action, makeObservable, observable } from "mobx";
import { FetchAPI, Method } from "../service/fetchAPI";
import { User } from "../models/User";
import { ServiceStore } from "./ServiceStore";
import { MIN_YEAR_OLD_USER } from "../utils/constraint";

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
            throw new Error("Vui lòng điền họ");
        }

        if (!user.first_name) {
            throw new Error("Vui lòng điền tên");
        }

        if (user.dob.getFullYear() >= MIN_YEAR_OLD_USER) {
            throw new Error("Bạn phải lớn hơn 16 tuổi");
        }

        if (!user.address) {
            throw new Error("Vui lòng điền địa chỉ của bạn");
        }

        if (!user.email) {
            throw new Error("Vui lòng điền số email của bạn");
        }

        if (!user.phone) {
            throw new Error("Vui lòng điền số điện thoại của bạn");
        }

        if (!regexs.phone.test(user.phone)) {
            throw new Error("Số Điện thoại của bạn không đúng. Vui lòng thử lại");
        }

        if (!regexs.email.test(user.email)) {
            throw new Error("Email của bạn không đúng. Vui lòng thử lại");
        }

        if (this.username === "" || this.password === "" || this.confirm === "") {
            throw new Error("Vui lòng nhập đủ tên đăng nhập và mật khẩu")
        }

        if (this.password.length < 8) {
            throw new Error("Mật khẩu phải tối thiểu 8 ký tự");
        }

        if (this.password !== this.confirm) {
            throw new Error("Mật khẩu không khớp");
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
