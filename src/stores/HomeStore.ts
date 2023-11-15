import { action, makeObservable, observable } from "mobx";
import { Post } from "src/models";

export class HomeStore {
    @observable
    posts: Post[] = [];

    constructor() {
        makeObservable(this);
    }

    @action
    async getList() {
        const [err, data] = await Post.getPostForYou();

        if (err) {
            throw err;
        }

        this.posts = data;
    }
}