import { action, makeObservable, observable } from "mobx";
import { Category, Post } from "src/models";
import { Store } from "src/stores/Store";

export class PostManagerStore {
    @observable
    isLoading: boolean = false;

    @observable
    filterStatus: string = "";
    @observable
    filterCategory: Category = new Category();
    @observable
    search: string = "";
    @observable
    posts: Post[] = [];
    @observable
    count: number = 0;
    @observable
    totalPages: number = 0;
    @observable
    page: number = 1;
    @observable
    size: number = 12;


    constructor(private store: Store) {
        makeObservable(this);
    }

    @action
    async init() {
        if (this.isLoading) return;
        this.set_isLoading(true);
        this.set_page(1);
        this.set_count(0);
        this.set_totalPages(0);

        const [err, data] = await this.load();
        if (err) {
            throw err;
        }

        this.set_count(data.count);
        this.set_posts(data.data.map(e => new Post(e)));
        this.set_totalPages(data.totalPages);

        this.set_isLoading(false);
    }

    @action
    async loadMore() {
        if (this.isLoading) return;
        this.set_isLoading(true);

        const [err, data] = await this.load();
        if (err) throw err;
        this.set_count(data.count);
        this.set_posts([...this.posts, ...data.data.map(e => new Post(e))]);
        this.set_totalPages(data.totalPages);

        this.set_isLoading(false);
    }

    @action
    async load() {
        this.set_isLoading(true);
        const filter = {};
        if (this.filterStatus) {
            filter["status"] = this.filterStatus;
        }

        if (this.search) {
            const $regex = { $regex: this.search }
            filter["$or"] = [{ title: $regex }, { description: $regex }];
        }

        if (this.filterCategory._id) {
            const child = this.store.sCategories.getChildrenById(this.filterCategory._id);
            filter["category"] = child.length ? child.map(e => e._id) : this.filterCategory._id;

        }

        const [err, data] = await Post.getPostWithFilter(filter, this.page, this.size);
        return [err, data] as const
    }

    @action set_filterStatus(v: string) {
        this.filterStatus = v;
    }

    @action set_count(v: number) {
        this.count = v;
    }

    @action set_posts(v: Post[]) {
        this.posts = v;
    }

    @action set_totalPages(v: number) {
        this.totalPages = v;
    }

    @action isShowLoadMore() {
        return this.page < this.totalPages;
    }

    @action set_page(v: number) {
        this.page = v;
    }

    @action set_isLoading(v: boolean) {
        this.isLoading = v;
    }

    @action set_filterCategory(v: Category) {
        this.filterCategory = v;
    }

    @action set_search(value: string) {
        this.search = value;
    }
}