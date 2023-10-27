import { NotificationWeb } from "@models";
import { action, makeObservable, observable } from "mobx";

export class NotificationWebStore {
    @observable isLoading: boolean = false;
    @observable count: number = 0;
    @observable types: object = { all: 0 };
    @observable listMenu: NotificationWeb[] = []

    /**
     * For Notification page
     * isPageLoading
     */
    @observable isPageLoading: boolean = false;
    @observable currentPage: number = 0;
    @observable countPage: number = 0;
    @observable listPage: NotificationWeb[] = [];
    @observable currentType: string = "all";

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
    async init(withType = false) {
        if (this.isLoading) return;
        this.set_isLoading(true);
        await this.getSync();
        await this.syncCount();

        if (withType) {
            await this.getNotificationType();
            await this.getTotalType();
        }
        this.set_isLoading(false);
    }

    async initForPage() {
        if (this.isPageLoading) return;
        this.set_isPageLoading(true);

        await Promise.all([this.getNotificationType(), this.getTotalType()]);
        this.set_isPageLoading(false);
        await this.loadMore();
    }

    @action set_isPageLoading(v: boolean) {
        this.isPageLoading = v;
    }

    @action
    async getSync() {
        const [err, data] = await NotificationWeb.getSync();

        if (err) throw err;

        this.set_list(data.map(e => new NotificationWeb(e)));
    }

    @action
    async seen(notification: NotificationWeb) {
        const [err, data] = await NotificationWeb.seen(notification._id);

        if (err) throw err;
        notification.is_seen = true;
        return data;
    }

    @action set_list(v: NotificationWeb[]) {
        this.listMenu = v;
    }

    @action set_count(v: number) {
        this.count = v;
    }

    @action set_types(v: object) {
        this.types = v;
    }

    @action set_listPage(v: NotificationWeb[]) {
        this.listPage = v;
    }

    @action set_countPage(v: number) {
        this.countPage = v;
    }

    @action
    async seenAll() {
        const [err, data] = await NotificationWeb.seenAll();
        return [err, data] as const;
    }

    @action
    async getNotificationType() {
        const [err, data] = await NotificationWeb.getCategory();

        if (err) throw err;

        this.types = data.reduce((r, e) => ({ ...r, [e]: 0 }), {});
    }

    @action
    async getTotalType() {
        const [err, data] = await NotificationWeb.getTotalByType();
        if (err) throw err;
        let count = 0;
        Object.keys(data).map(e => {
            count += data[e];
            this.set_types({ ...this.types, [e]: data[e] })
        });

        this.set_types({ ...this.types, all: count });
    }

    @action
    async loadMore() {
        if (this.isPageLoading) return;
        this.set_isPageLoading(true);
        const [err, data] = await NotificationWeb.advanceSearch(this.currentType, this.currentPage);

        this.set_countPage(data.totalPages);


        this.set_listPage([...this.listPage, ...data.data]);
        this.set_isPageLoading(false);
    }

    @action set_currentPage(v: number) {
        this.currentPage = v;
    }

    @action set_currentType(v: string) {
        this.currentType = v;
    }
}
