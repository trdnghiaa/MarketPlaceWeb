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
    parent: string;

    constructor(data?: any) {
        this.icon = "";
        this.name = "";
        this._id = "";
        this.parent = "ROOT";

        if (data) {
            const { _id, icon, name, parent } = data;

            this.icon = icon;
            this._id = _id;
            this.name = name;
            this.parent = parent;
        }

        makeAutoObservable(this);
    }

    async save() {
        const uri = "/categories/";
        const method: Method = this._id ? Method.PUT : Method.POST;

        const path: string = uri + (this._id && this._id) || "";

        const [err, data] = await FetchAPI(method, path, this.toJSON());

        return [err, data] as const;
    }

    static async getList() {
        const [err, data] = await FetchAPI<Category[]>(Method.GET, `/categories`);

        return [err, data] as const;
    }

    static async delete(id: string) {
        const [err, data] = await FetchAPI(Method.DELETE, "/categories/" + id);

        return [err, data] as const;
    }

    toJSON() {
        return {
            _id: this._id,
            icon: this.icon,
            name: this.name,
            parent: this.parent
        }
    }
}