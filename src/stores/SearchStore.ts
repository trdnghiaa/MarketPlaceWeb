import { action, makeObservable, observable } from "mobx";
import { Category, Post } from "src/models";
import { Store } from "src/stores/Store";

export interface Suggestion {
    title: string,
    url: string;
}

export class SearchStore {
    @observable
    isLoading: boolean = false;
    @observable
    suggestionLoading: boolean = false;
    @observable
    category: Category = new Category();
    @observable
    query: string = "";
    @observable
    suggestion: Suggestion[] = [];
    @observable
    openSuggestion: boolean = false;
    @observable
    filter: object = {};
    @observable
    size: number = 12;
    @observable
    page: number = 1;
    @observable
    posts: Post[] = [];
    @observable
    count: number = 0;
    @observable
    totalPages: number = 0;

    constructor(private store: Store) {
        makeObservable(this);
    }

    @action set_query(v: string) {
        this.query = v;
    }

    @action
    async getSuggestion() {
        if (this.suggestionLoading || !this.query) return;
        this.set_suggestionLoading(true);
        const [err, data] = await Post.getSuggestion(this.query, this.category._id);
        this.set_suggestion(data);
        this.set_suggestionLoading(false);
    }

    @action set_suggestion(v: Suggestion[]) {
        this.suggestion = v;
    }

    @action set_openSuggestion(v: boolean) {
        this.openSuggestion = v;
    }

    @action set_category(v: Category) {
        this.category = v;
    }

    @action
    async init() {
        if (this.isLoading) return;
        this.set_isLoading(true);

        if (this.filter["category"]) {
            Category.getPublicById(this.filter["category"]).then(([err, data]) => {
                if (err) {
                    console.log(err);
                    return;
                }
                this.set_category(data);
            });
        }

        if (this.query) {
            this.filter["title"] = { $regex: this.query };
        } else {
            delete this.filter["title"];
        }


        const [err, data] = await Post.searchPublicPost(this.filter, this.page, this.size);
        if (err) throw err;
        this.set_posts(data.data.map(e => new Post(e)));
        this.set_totalPages(data.totalPages);
        this.set_count(data.count);
        this.set_isLoading(false);
    }

    @action set_posts(v: Post[]) {
        this.posts = v;
    }

    @action set_count(v: number) {
        this.count = v;
    }

    @action set_totalPages(v: number) {
        this.totalPages = v;
    }

    @action set_suggestionLoading(v: boolean) {
        this.suggestionLoading = v;
    }

    @action set_isLoading(v: boolean) {
        this.isLoading = v;
    }

    @action set_filter(v: object) {
        this.filter = v;
    }

    set_filterValue(key: string, value: any) {
        this.filter[key] = value;
    }

    @action set_page(v: number) {
        this.page = v;
    }
}