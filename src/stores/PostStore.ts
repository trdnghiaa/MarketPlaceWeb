import { action, makeObservable, observable } from "mobx";
import { EPostStatus, Post, User, UserRole } from "src/models";
import { ReactImageGalleryItem } from "react-image-gallery";
import { HOST } from "src/service/fetchAPI";
import { Store } from "src/stores/Store";

export class PostStore {
    @observable
    post: Post = new Post();
    @observable
    isLoading: boolean = false;

    @observable
    isNotFound: boolean = false;
    @observable
    images: ReactImageGalleryItem[] = [];

    @observable
    reason: string = "";
    @observable
    similar: Post[] = [];

    constructor(private store: Store) {
        makeObservable(this);
    }

    @action set_isLoading(v: boolean) {
        this.isLoading = v;
    }

    @action set_post(v: Post) {
        this.post = v;
    }

    @action set_isNotFound(v: boolean) {
        this.isNotFound = v;
    }

    @action set_images(v: ReactImageGalleryItem[]) {
        this.images = v;
    }

    @action isUsePublic() {
        const user = new User(this.store.currentUser);

        return !user._id || user.role == UserRole.USER;
    }

    @action
    async init(id: string) {
        if (this.isLoading) return;
        this.set_isLoading(true);
        this.set_isNotFound(false);

        this.set_similar([]);

        const [err, data] = await (this.isUsePublic() ? Post.getPublicPost(id) : Post.getById(id));


        if (err) {
            this.set_isLoading(false);
            throw err;
        }

        this.set_post(new Post(data));

        this.set_images(data.images.map(e => ({ original: HOST + e.realPath, thumbnail: HOST + e.realPath })) as ReactImageGalleryItem[]);
        if (this.post.status == EPostStatus.APPROVED)
            this.getSimilar();

        this.set_isLoading(false);
    }

    @action
    async getSimilar() {
        const [err, data] = await Post.getSimilarPost(this.post._id);

        if (err) throw err;

        this.set_similar(data);
    }

    @action set_reason(v: string) {
        this.reason = v;
    }

    @action
    async sendReport() {
        const [err, data] = await Post.deniedPost(this.post._id, this.reason);
        if (!err) {
            this.post.status = EPostStatus.DENIED;
        }
        return [err, data] as const;
    }

    @action
    async sendApproved() {
        const [err, data] = await Post.approvedPost(this.post._id);
        if (!err) {
            this.post.status = EPostStatus.APPROVED;
        }
        return [err, data] as const;
    }

    @action set_similar(v: Post[]) {
        this.similar = v;
    }
}