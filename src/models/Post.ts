import { User } from "./User";
import { Attachment } from "./Attachment";
import { action, computed, makeObservable, observable } from "mobx";
import { Category } from "./Category";
import { FetchAPI, Method } from "src/service/fetchAPI";
import { class2JSON } from "src/utils";
import { Suggestion } from "src/stores/SearchStore";

export enum EPostStatus {
    APPROVED = "APPROVED",
    DENIED = "DENIED",
    PENDING = "PENDING",
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
    @observable
    address: string;
    @observable
    favorite: boolean;
    @observable
    reason: string;
    @observable
    approvedDate: Date;

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
        this.address = "";
        this.favorite = false;
        this.reason = "";
        this.approvedDate = new Date();

        if (data) {
            const { _id, title, description, createdBy, created_at, expires, view, status, images, category, advanceInfo, price, address, favorite, reason, approvedDate } = data;
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
            this.images = images ? images.map((e: any) => new Attachment(e)) : [];
            this.address = address;
            this.favorite = favorite;
            this.reason = reason;
            this.approvedDate = new Date(approvedDate);
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

    @computed get city() {
        const city = this.address.split(", ")[3] || "";
        return city.length > 11 ? city.replace("Thành phố ", "TP.") : city;
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

        const [err, data] = await FetchAPI<{data: Post, message: string}>(Method.POST, "/posts/", body);
        return [err, data] as const;
    }

    @action
    async favoritePost() {
        const [err, data] = await FetchAPI(Method.GET, `/posts/${this._id}/favorite`);
        if (data) {
            this.favorite = !this.favorite;
        }
        return [err, data];
    }

    static async getById(id: string) {
        const [err, data] = await FetchAPI<Post>(Method.GET, `/posts/${id}?includes=images,createdBy,category`);
        return [err, data] as const;
    }

    static async deniedPost(_id: string, reason: string) {
        const [err, data] = await FetchAPI<{message: string}>(Method.POST, "/posts/censorship", { _id, isApproved: false, reason });
        return [err, data] as const;
    }

    static async approvedPost(_id: string) {
        const [err, data] = await FetchAPI<{message: string}>(Method.POST, "/posts/censorship", { _id, isApproved: true });
        return [err, data] as const;
    }

    @action set_address(v: string) {
        this.address = v;
    }

    static async getRecommend() {
        const [err, data] = await FetchAPI<Post[]>(Method.GET, "/posts/recommend")
        return [err, data] as const;
    }

    static async getPostForYou() {
        const [err, data] = await FetchAPI<Post[]>(Method.GET, `/public/posts/for-you`);

        return [err, data ? data.map(e => new Post({ ...e, status: EPostStatus.APPROVED })) : []] as const;
    }

    static async getPublicPost(id: string) {
        const [err, data] = await FetchAPI<Post>(Method.GET, `/public/posts/${id}?includes=images,createdBy,category`);
        return [err, data] as const;
    }

    static async getPostWithFilter(filter: object, page: number, size: number) {
        const [err, data] = await FetchAPI<{data: Post[], count: number, totalPages: number}>(Method.POST, `/posts/search?includes=images,createdBy,category&page=${page}&size=${size}`, filter);

        return [err, data] as const;
    }

    static async getMyPost(filter: object) {
        const [err, data] = await FetchAPI<Post[]>(Method.POST, "/posts/my-post?includes=images,category,createdBy", filter);

        return [err, data] as const;
    }

    static async getFavorites() {
        const [err, data] = await FetchAPI<Post[]>(Method.GET, "/posts/favorites?includes=images,category,createdBy");

        return [err, data.map(e => new Post(e))] as const;
    }

    static async getSuggestion(query: string, category: string) {
        const [err, data] = await FetchAPI<Suggestion[]>(Method.POST, "/public/suggestions", { query, category });

        return [err, data] as const;
    }

    static async searchPublicPost(filter: object, page: number, size: number) {
        const [err, data] = await FetchAPI<{data: Post[], size: number, count: number, totalPages: number}>(Method.POST, `/public/posts/search?page=${page}&size=${size}&includes=images,createdBy`, filter);
        return [err, data] as const;
    }

    static async getSimilarPost(_id: string) {
        const [err, data] = await FetchAPI<Post[]>(Method.POST, `/public/posts/similar`, { _id });
        return [err, data] as const
    }
}