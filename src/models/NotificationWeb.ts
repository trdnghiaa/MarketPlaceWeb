import { action, observable } from "mobx";
import { FetchAPI, Method } from "src/service/fetchAPI";
import { Object2Filter } from "src/utils";

export class NotificationWeb {
    @observable _id: string;
    @observable title: string;
    @observable description: string;
    @observable is_seen: boolean;
    @observable created_at: Date;
    @observable url: string;
    @observable type: string;

    constructor(data?: any) {
        this._id = "";
        this.title = "";
        this.description = "";
        this.is_seen = false;
        this.created_at = new Date();
        this.url = "/";
        this.type = "";
        if (data != null) {
            const { _id, title, description, is_seen, created_at, url, type } = data;

            this._id = _id;
            this.title = title;
            this.description = description;
            this.is_seen = is_seen;
            this.created_at = new Date(created_at);
            this.url = url;
            this.type = type;
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

    static async seenAll() {
        const [err, data] = await FetchAPI<{message: string}>(Method.PUT, "/notification/all",)

        return [err, data] as const;
    }

    static async getCount() {
        const [err, data] = await FetchAPI<{count: number}>(Method.GET, "/notification/count")

        return [err, data] as const;
    }

    static async getCategory() {
        const [err, data] = await FetchAPI<Array<string>>(Method.GET, "/notification/category");

        return [err, data] as const;
    }

    static async getTotalByType() {
        const [err, data] = await FetchAPI<object>(Method.GET, "/notification/total-by-type");

        return [err, data] as const;
    }

    static async advanceSearch(type: string, page: number) {
        // @ts-ignore
        const query: string = new URLSearchParams({ page, ...(type == "" ? {} : Object2Filter({ type })) }).toString();

        const [err, data] = await FetchAPI<{data: NotificationWeb[], count: number, totalPages: number}>(Method.GET, "/notification?size=5&" + query);
        data.data = data.data.map(e => new NotificationWeb(e));

        return [err, data] as const;

    }
}