import { User } from "./User";
import { Attachment } from "./Attachment";
import { action, makeObservable } from "mobx";

export enum EPostStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    DENIED = "DENIED"
}

export class Post {
    _id: string;
    title: string;
    description: string;
    createdBy: User;
    created_at: Date;
    expires: Date;
    view: number;
    status: EPostStatus;
    images: Attachment[];

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

        if (data) {
            const { _id, title, description, createdBy, created_at, expires, view, status, images } = data;
            this._id = _id;
            this.title = title;
            this.description = description;
            this.createdBy = new User(createdBy);
            this.created_at = new Date(created_at);
            this.expires = new Date(expires);
            this.view = view;
            this.status = status;

            if(images.length > 0) {
                for(let i =0; i < images.length; i++) {
                    images[i] = new Attachment(images[i]);
                }
                this.images =  images;
            }

        makeObservable(this);
        }
    }

    @action set_title(v: string) {
       this.title = v;
    }

    set_description(value: string) {
        this.description = value;
    }
}