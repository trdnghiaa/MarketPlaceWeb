import { action, makeAutoObservable, observable } from "mobx";
import { FetchAPI, Method } from "src/service/fetchAPI";
import { AdvanceOption } from "./AdvanceField";
import { class2JSON } from "src/utils";

export class Category {
    @observable
    _id: string;
    @observable
    icon: string;
    @observable
    name: string;
    @observable
    parent: string;
    @observable
    advancedSchemaInfo: AdvanceOption[];

    constructor(data?: any) {
        this.icon = "";
        this.name = "";
        this._id = "";
        this.parent = "ROOT";
        this.advancedSchemaInfo = [];

        if (data) {
            const { _id, icon, name, parent, advancedSchemaInfo } = data;

            this.icon = icon;
            this._id = _id;
            this.name = name;
            this.parent = parent;
            this.advancedSchemaInfo = advancedSchemaInfo instanceof Array ? advancedSchemaInfo.map((e) => new AdvanceOption(e)) : [];
        }

        makeAutoObservable(this);
    }

    @action set_icon(v: string) {
        this.icon = v;
    }

    async save() {
        const uri = "/categories/";
        const method: Method = this._id ? Method.PUT : Method.POST;

        const path: string = uri + (this._id && this._id) || "";

        console.log(this.toJSON());

        const [err, data] = await FetchAPI<{data: Category, message: string}>(method, path, this.toJSON());

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
        return class2JSON(this);
    }

    static async getById(category: string) {
        const [err, data] = await FetchAPI<Category>(Method.GET, "/categories/" + category);


        return [err, data] as const;
    }

    @action set_name(v: string) {
        this.name = v;
    }

    @action set_advancedSchemaInfo(v: AdvanceOption[]) {
        this.advancedSchemaInfo = v;
    }

    @action set_parent(v: string) {
        this.parent = v;
    }
}