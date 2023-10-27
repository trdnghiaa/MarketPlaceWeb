import { action, makeObservable, observable } from "mobx";
import { Post } from "../models";
import { PAGE_SIZE_DEFAULT } from "../config";

export class SearchStore{

    @observable posts: Post[] = [];
    @observable size: number = PAGE_SIZE_DEFAULT || 10;
    @observable page: number = 0;
    @observable totalPages: number = 10;
    @observable isLoading: boolean = false;
    @observable queryText: string = "";

     constructor() {
        makeObservable(this);   
    }

    @action set_post(v: Post[]) {
        this.posts = v;
    }

    @action set_isLoading(v: boolean) {
        this.isLoading = v;
    }

    @action 
        async init(){
            if(this.isLoading) return;

            this.set_isLoading(true);
            const [err, data] = await Post.getListPost(this.page, this.size, this.queryText);

            if (err) {
                throw new Error(err.message);
            }

            this.posts = data.data;
            this.totalPages = data.totalPages;
            this.set_isLoading(false);
        }

        @action set_page(v: number) {
            this.page = v;
        }
    
        @action set_size(v: number) {
            this.size = v;
        }
    
        @action
        set_queryText(v: string) {
            this.queryText = v;
        }
}