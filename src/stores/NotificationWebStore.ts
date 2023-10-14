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

        if (err) throw err;

        this.set_count(data.count);
    }

    @action
    async init() {
        if (this.isLoading) return;
        this.set_isLoading(true);
        await this.getSync();
        await this.syncCount();
        this.set_isLoading(false);

    }

    @action
    async getSync() {
        const [err, data] = await NotificationWeb.getSync();

        if (err) throw err;

        this.set_list(data);
    }

    @action
    async seen(notification: NotificationWeb) {
        const [err, data] = await NotificationWeb.seen(notification._id);

        if (err) throw err;
        notification.is_seen = true;
        return data;
    }

    @action set_list(v: NotificationWeb[]) {
        this.list = v;
    }

    @action set_count(v: number) {
        this.count = v;
    }


    @action
    async seenAll() {
        const [err, data] = await NotificationWeb.seenAll();
        return [err, data] as const;
    }
}
