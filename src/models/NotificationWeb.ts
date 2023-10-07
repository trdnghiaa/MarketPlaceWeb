import { action, observable } from "mobx";
import { FetchAPI, Method } from "../service/fetchAPI";

export class NotificationWeb {
    @observable _id: string;
    @observable title: string;
    @observable description: string;
    @observable is_seen: boolean;
    @observable created_date: Date;
    @observable url: string;

    constructor(data?: any) {
        this._id = "";
        this.title = "";
        this.description = "";
        this.is_seen = false;
        this.created_date = new Date();
        this.url = "/";
        if (data != null) {
            const { _id, title, description, is_seen, created_date, url } = data;

            this._id = _id;
            this.title = title;
            this.description = description;
            this.is_seen = is_seen;
            this.created_date = new Date(created_date);
            this.url = url;
        }
    }

    @action set_isSeen(v: boolean) {
        this.is_seen = v;
    }

    static async getSync() {
        const [err, data] = await FetchAPI<NotificationWeb[]>(Method.GET, "/notification/sync")

        return [err, data] as const;
    }

    static async seen(_id: string) {
        const [err, data] = await FetchAPI<{message: string}>(Method.PUT, "/notification", { _id })

        return [err, data] as const;
    }

    static async seenAll(_id: string[]) {
        const [err, data] = await FetchAPI<{message: string}>(Method.PUT, "/notification", { _id })

        return [err, data] as const;
    }

    static async getCount() {
        const [err, data] = await FetchAPI<{count: number}>(Method.GET, "/notification/count")

        return [err, data] as const;
    }
}