import { action, observable } from "mobx";
import { FetchAPI, Method } from "../service/fetchAPI";
import { clearCurrentURL, getCurrentURL, setJwtToken } from "@utils";

export class SignInStore {
    private signInRedirect: string = "/";

    @observable username: string = "";
    @observable password: string = "";

    @action set_username(v: string) {
        this.username = v;
    }

    @action set_password(v: string) {
        this.password = v;
    }

    @action
    async doLogin(urlCallback: string) {
        const [err, data] = await FetchAPI<{access_token: string}>(Method.POST, "/auth/login", {
            user: this.username,
            pass: this.password
        });

        if (!err) {
            setJwtToken(data.access_token);

            const currentUrl = getCurrentURL();
            this.signInRedirect = currentUrl || "/";

            clearCurrentURL();
            window.history.pushState(null, "", "/");
            window.location.href = urlCallback ? `${urlCallback}?appId=marketplace&token=${data.access_token}` : this.signInRedirect;
            return;
        }
        return err.message;
    }

    @action
    async LoginWithAdmin(id: string) {
        const [err, data] = await FetchAPI<{access_token: string}>(Method.POST, "/auth/login-admin/" + id);
        if (!err) {
            setJwtToken(data.access_token);
            const currentURL = getCurrentURL();
            this.signInRedirect = currentURL || "/";
            clearCurrentURL();

            window.location.href = this.signInRedirect;
        }
        return err;
    }

}