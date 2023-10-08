import { makeAutoObservable, observable } from "mobx";
import { FetchAPI, Method } from "../service/fetchAPI";

export class Category {
    @observable
    _id: string;
    @observable
    icon: string;
    @observable
    name: string;
    @observable
    description: string;
    @observable
    parent: string;

    constructor(data?: any) {
        this.icon = "";
        this.name = "";
        this._id = "";
        this.description = "";
        this.parent = "ROOT";

        if (data) {
            const { _id, icon, name, description, parent } = data;

            this.icon = icon;
            this._id = _id;
            this.name = name;
            this.description = description;
            this.parent = parent;
        }

        makeAutoObservable(this);
    }

    static async getList(page: number, size: number, query?: string) {
        // @ts-ignore
        const searchParams: string = new URLSearchParams({ page, size, ...(query ? { query } : {}) }).toString();

        const [err, data] = await FetchAPI<{data: Category[], count: number, totalPages: number}>(Method.GET, `/categories?` + searchParams);

        return [err, data] as const;
    }

}