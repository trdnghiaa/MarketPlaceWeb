import { SignUpStore } from "./SignUpStore";
import { SignInStore } from "./SignInStore";
import { AuthorizedStore } from "./AuthorizedStore";
import { observable } from "mobx";
import { ProfileStore } from "./ProfileStore";
import {AccountStore} from "./AccountStore";
import { OrderStore } from "./OrderStore";
import { OrderDetailStore } from "./OrderDetailStore";
import { NewAccountStore } from "./NewAccountStore";
import { DialogStore } from "./DialogStore";


export class Store extends AuthorizedStore {
	@observable
	sSignIn = new SignInStore();
	@observable
	sSignUp = new SignUpStore();
	@observable
	sProfile = new ProfileStore();
	@observable
	sAccount = new AccountStore();
	@observable
	sOrder = new OrderStore();
	@observable
	sOrderDetail = new OrderDetailStore();
	@observable
	sNewAccount = new NewAccountStore();
	@observable
	sDialog = new DialogStore();
}
