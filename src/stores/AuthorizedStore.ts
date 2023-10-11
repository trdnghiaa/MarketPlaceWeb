import { action, observable } from "mobx";
import { User } from "../models/User";
import { clearAll, clearJwtToken, getJwtToken, getRole, setRole, } from "../utils/LoginUtils";
import { setAuthorizationToken } from "../service/fetchAPI";
import { UserRole } from "../models/types";
import { BaseStore } from "./BaseStore";
import { store } from "./index";

export class AuthorizedStore extends BaseStore {
    @observable currentUser?: User;
    @observable token = "";
    @observable role = UserRole.USER.toString();
    @observable isLoggedIn = false;
    @observable isDone = false;
    @observable isLoading = false;

    checkLogin() {
        if (this.currentUser) return true;

        const authToken = getJwtToken();

        if (!authToken) {
            this.set_isDone(true);
            return false;
        }
        // this.set_isDone(false);

        this.set_isLoggedIn(true);
        const role = getRole();
        if (role) this.set_role(role);

        if (!this.isLoading) {
            this.setToken(authToken).then((res) => {
                if (!res[0]) {
                    this.currentUser = new User(res[1]);
                } else {
                    clearJwtToken();
                    // eslint-disable-next-line no-restricted-globals
                    location.reload();
                }
                this.set_isDone(true);
                this.set_isLoading(false);
            });
            this.set_isLoading(true);
        }

        return true;
    }

    async setToken(token: string): Promise<any> {
        setAuthorizationToken(token);
        const [err, data] = await User.getMe();

        // console.log(err, data)

        if (err) {
            setAuthorizationToken("");
            clearJwtToken();
            this.set_isDone(true);
            return [err, data] as const;
        }

        this.set_role(data.role);
        this.set_token(token);
        this.set_isLoggedIn(true);

        if (data.role === UserRole.ADMIN)
            User.getTypes().then(([err, data]) => {
                if (!err) {
                    store.types = data;
                    return;
                }
                window.alert(err.message);
            })

        setRole(data.role);

        this.currentUser = data;
        return [err, data] as const;
    }

    @action set_isDone(v: boolean) {
        this.isDone = v;
    }

    @action set_role(v: string) {
        this.role = v;
    }

    @action set_token(v: string) {
        this.token = v;
    }

    @action set_isLoggedIn(v: boolean) {
        this.isLoggedIn = v;
    }

    @action set_isLoading(v: boolean) {
        this.isLoading = v;
    }

    @action Logout() {
        clearAll();
        // eslint-disable-next-line no-restricted-globals
        location.reload();
    }

}
