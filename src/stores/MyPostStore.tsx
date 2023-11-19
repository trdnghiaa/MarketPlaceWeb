import { action, makeAutoObservable, observable } from "mobx";
import { Post } from "src/models";

export class MyPostStore {
    @observable
    posts: Post[] = [];
    @observable
    isLoading: boolean = false;
    @observable
    filterStatus: string = "";

    constructor() {
        makeAutoObservable(this);
    }

    @action
    async init() {
        if (this.isLoading) return;

        this.set_isLoading(true);

        const filter = {};

        if (this.filterStatus) {
            filter["status"] = this.filterStatus;
        }

        const [err, data] = await Post.getMyPost(filter);

        this.set_posts(data.map(e => new Post(e)));

        this.set_isLoading(false);
    }

    @action set_isLoading(v: boolean) {
        this.isLoading = v;
    }

    @action set_posts(v: Post[]) {
        this.posts = v;
    }

    set_filterStatus(v: string) {
        this.filterStatus = v;
    }
}