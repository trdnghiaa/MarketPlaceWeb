import { User } from "./User";
import { makeAutoObservable, observable } from "mobx";
import { FetchAPI, Method } from "src/service/fetchAPI";

export class Attachment {
    @observable
    realPath: string;
    @observable post: string;
    @observable createdBy: User;
    @observable is_delete: boolean;

    constructor(data?: any) {
        this.realPath = "";
        this.post = "";
        this.createdBy = new User();
        this.is_delete = false;

        if (data) {
            const { realPath, post, createdBy, is_delete } = data;

            this.realPath = realPath;
            this.post = post;
            this.createdBy = createdBy;
            this.is_delete = is_delete;
        }

        makeAutoObservable(this);
    }

    static async dropFileTemp(id: string) {
        const [err, data] = await FetchAPI(Method.DELETE, `/storages/${id}`);
        if (err) {
            throw err;
        }

        return [err, data] as const;
    }

}