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

    static async getList() {
        const [err, data] = await FetchAPI<Category[]>(Method.GET, `/categories`);

        return [err, data] as const;
    }

    async save() {
        const [err, data] = await FetchAPI(Method.POST, "/categories", this.toJSON());

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