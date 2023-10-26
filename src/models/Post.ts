import { User } from "./User";
import { Attachment } from "./Attachment";
import { action, makeObservable, observable } from "mobx";
import { Category } from "./Category";

export enum EPostStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    DENIED = "DENIED"
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

        if (data) {
            const { _id, title, description, createdBy, created_at, expires, view, status, images, category} = data;
            this._id = _id;
            this.title = title;
            this.description = description;
            this.createdBy = new User(createdBy);
            this.created_at = new Date(created_at);
            this.expires = new Date(expires);
            this.view = view;
            this.status = status;
            this.category = new Category(category);

            if(images.length > 0) {
                for(let i =0; i < images.length; i++) {
                    images[i] = new Attachment(images[i]);
                }
                this.images =  images;
            }
        }
        makeObservable(this);
    }

    @action set_title(v: string) {
       this.title = v;
    }

    @action set_category(v: Category) {
        this.category = v;
    }

    set_description(value: string) {
        this.description = value;
    }
}