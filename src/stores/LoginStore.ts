import { action, observable } from "mobx";
import {FetchAPI, Method} from "../service/fetchAPI";
import {
	clearCurrentURL,
	getCurrentURL,
	setJwtToken,
} from "../utils/LoginUtils";
import { Store } from "./Store";

export class LoginStore {
	constructor(private store: Store) {}

	@observable username: string = "";
	@observable password: string = "";
	@observable rememberMe: boolean = true;
	signInRedirect: string = "/";

	@action set_username = (v: string) => {
		this.username = v;
	};
	@action set_password = (v: string) => {
		this.password = v;
	};
	@action set_rememberMe = (v: boolean) => {
		this.rememberMe = v;
	};

	@action async doLogin() {
		const [err, data]: any = await FetchAPI<{ token: string }>(
			Method.POST,
			"/auth/login",
			{
				username: this.username,
				password: this.password,
			}
		);
		if (!err) {
			setJwtToken(data.token);
			const currentURL = getCurrentURL();
			this.signInRedirect = currentURL || "/";
			clearCurrentURL();

			window.location.href = this.signInRedirect;
			return;
		}
		return data;
	}
}
