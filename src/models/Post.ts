import { User } from "./User";
import { Attachment } from "./Attachment";
import { action, makeObservable, observable } from "mobx";
import { Category } from "./Category";
import { FetchAPI, Method } from "src/service/fetchAPI";
import { class2JSON } from "src/utils";

export enum EPostStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    DENIED = "DENIED"
}

export interface AdvanceInfoValue {
    [name: string]: string | number;
}

export class Post {
    @observable
    _id: string;
    @observable
    title: string;
    @observable
    description: string;
    @observable
    createdBy: User;
    @observable
    created_at: Date;
    @observable
    expires: Date;
    @observable
    view: number;
    @observable
    status: EPostStatus;
    @observable
    images: Attachment[];
    @observable
    category: Category;
    @observable
    advanceInfo: AdvanceInfoValue;
    @observable
    price: number;

    constructor(data?: any) {
        this._id = "";
        this.title = "";
        this.description = "";
        this.createdBy = new User();
        this.created_at = new Date();
        this.expires = new Date();
        this.view = 0;
        this.status = EPostStatus.PENDING;
        this.images = [];
        this.category = new Category();
        this.advanceInfo = {};
        this.price = 0;

        if (data) {
            const { _id, title, description, createdBy, created_at, expires, view, status, images, category, advanceInfo, price } = data;
            this._id = _id;
            this.title = title;
            this.description = description;
            this.createdBy = new User(createdBy);
            this.created_at = new Date(created_at);
            this.expires = new Date(expires);
            this.view = view;
            this.status = status;
            this.category = new Category(category);
            this.advanceInfo = advanceInfo || {};
            this.price = price;
            this.images = images.map((e: any) => new Attachment(e)) || [];
        }
        makeObservable(this);
    }

    @action set_title(v: string) {
        this.title = v;
    }

    @action set_category(v: Category) {
        this.category = new Category(v);
    }

    set_description(value: string) {
        this.description = value;
    }

    @action set_price(v: number) {
        this.price = v;
    }

    @action
    async save() {
        const body = class2JSON(this);

        body.category = this.category._id;
        body.images = this.images.map(e => e._id);
        delete body.createdBy;
        delete body.created_at;
        delete body.view;
        delete body.expires;

        const [err, data] = await FetchAPI(Method.POST, "/posts/", body);
        return [err, data] as const;
    }
}