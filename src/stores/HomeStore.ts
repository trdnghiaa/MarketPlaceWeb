import { action, makeObservable, observable } from "mobx";
import { Post } from "src/models";

export class HomeStore {
    @observable
    posts: Post[] = [];

    @observable
    isLoading: boolean = false;

    constructor() {
        makeObservable(this);
    }

    @action
    async getList() {
        if (this.isLoading) return;
        this.set_isLoading(true);
        const [err, data] = await Post.getPostForYou();

        if (err) {
            throw err;
        }

        this.set_posts(data);
        this.set_isLoading(false);
    }

    @action set_isLoading(v: boolean) {
        this.isLoading = v;
    }

    private set_posts(v: Post[]) {
        this.posts = v;
    }
}