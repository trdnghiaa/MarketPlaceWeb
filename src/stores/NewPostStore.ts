import { action, makeObservable, observable } from "mobx";
import { Category, Post } from "@models";
import { ExtFile } from "@files-ui/core";

export class NewPostStore {
    @observable file: ExtFile[] = [];
    @observable post: Post = new Post();

    constructor() {
        makeObservable(this);
    }


    @action init() {
        this.post = new Post();
    }

    @action get_post() {
        return this.post;
    }

    @action set_category(v: Category) {
        this.post.set_category(v);
    }

    @action set_file(v: ExtFile[]) {
        this.file = v;
    }
}