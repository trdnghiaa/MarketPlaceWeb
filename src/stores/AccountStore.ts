import { action, makeObservable, observable } from "mobx";
import { User } from "src/models";
import { PAGE_SIZE_DEFAULT } from "src/config";

export class AccountStore {
    @observable users: User[] = [];
    @observable size: number = PAGE_SIZE_DEFAULT || 10;
    @observable page: number = 0;
    @observable totalPages: number = 10;
    @observable totalRow: number = 0;
    @observable isLoading: boolean = false;
    @observable queryText: string = "";

    constructor() {
        makeObservable(this);
    }

    @action set_users(v: User[]) {
        this.users = v;
    }

    @action set_isLoading(v: boolean) {
        this.isLoading = v;
    }

    @action
    async init() {
        if (this.isLoading) return;

        this.set_isLoading(true);
        const [err, data] = await User.getAllUser(this.page, this.size, this.queryText);

        if (err) {
            throw new Error(err.message);
        }

        this.users = data.data;
        this.totalPages = data.totalPages;
        this.totalRow = data.count;
        this.set_isLoading(false);
    }

    @action set_page(v: number) {
        this.page = v;
    }

    @action set_size(v: number) {
        this.size = v;
    }

    @action
    set_queryText(v: string) {
        this.queryText = v;
    }
}