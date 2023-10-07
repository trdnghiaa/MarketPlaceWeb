import { action, makeObservable, observable } from "mobx";
import { Post } from "../models/Post";
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

    @action set_file(v: ExtFile[]) {
        this.file = v;
    }
}