import { User } from "./User";
import { makeAutoObservable, observable } from "mobx";
import { FetchAPI, FetchFile, Method } from "src/service/fetchAPI";
import { ExtFileInstance } from "@dropzone-ui/react";

export class Attachment {
    @observable _id: string;
    @observable realPath: string;
    @observable post: string;
    @observable createdBy: User;
    @observable is_delete: boolean;

    constructor(data?: any) {
        this._id = "";
        this.realPath = "";
        this.post = "";
        this.createdBy = new User();
        this.is_delete = false;

        if (data) {
            const { realPath, post, createdBy, is_delete, _id } = data;
            this._id = _id;
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

    async toExtFile() {
        const file = await this.getBlob();
        const splitName = this.realPath.split("/");

        return ExtFileInstance.toExtFile({
            id: this._id,
            // imageUrl: HOST + this.realPath,
            file: file,
            size: file?.size,
            type: file?.type,
            // downloadUrl: HOST + this.realPath,
            uploadStatus: "success",
            valid: true,
            uploadMessage: "Tải file thành công!",
            name: file?.name,
        } as ExtFileInstance);
    }

    async getBlob() {
        const file = await FetchFile(this.realPath, this._id);
        return file;
    }
}