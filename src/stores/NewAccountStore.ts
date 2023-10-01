import { action, makeObservable, observable } from "mobx";
import { User } from "../models/User";

export class NewAccountStore {
    @observable
    user: User = new User();

    constructor() {
        makeObservable(this);
    }

    @action get_User() {
        return this.user;
    }
}