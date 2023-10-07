import { NotificationWeb } from "../models/NotificationWeb";
import { action, makeObservable, observable } from "mobx";

export class NotificationWebStore {
    @observable isLoading: boolean = false;
    @observable count: number = 0;

    @observable list: NotificationWeb[] = []

    constructor() {
        makeObservable(this);
    }

    @action set_isLoading(v: boolean) {
        this.isLoading = v;
    }

    @action
    async syncCount() {
        const [err, data] = await NotificationWeb.getCount();

        if(err) throw err;

        this.count = data.count;
    }

    @action init() {
        if(this.isLoading) return;
        this.set_isLoading(true);
        this.getSync();
        this.syncCount();
        this.set_isLoading(false);

    }

    @action async getSync() {
        const [err, data] = await NotificationWeb.getSync();

        if(err) throw err;

        this.list = data;
    }

    @action async seen(notification: NotificationWeb) {
        const [err, data] = await NotificationWeb.seen(notification._id);

        if(err) throw err;

        notification.is_seen = true;


    }
}
