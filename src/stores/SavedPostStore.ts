import { action, makeObservable, observable } from "mobx";
import { Post } from "src/models";

export class SavedPostStore {
    @observable
    isLoading: boolean = false;
    @observable
    posts: Post[] = [];

    constructor() {
        makeObservable(this);
    }

    async init() {
        if (this.isLoading) return;
        this.set_isLoading(true);

        const [err, data] = await Post.getFavorites();

        if (err) throw err;

        this.set_posts(data);
        this.set_isLoading(false);
    }

    @action set_isLoading(v: boolean) {
        this.isLoading = v;
    }

    @action set_posts(v: Post[]) {
        this.posts = v;
    }
}