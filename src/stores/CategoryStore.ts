import { action, makeObservable, observable } from "mobx";
import { Category, TreeViewData } from "src/models";

export class CategoryStore {
    @observable categories: Category[] = [];
    @observable isLoading: boolean = false;
    @observable treeViewData: TreeViewData = new TreeViewData({
        name: "ROOT",
        _id: "ROOT",
        description: "",
        parent: "",
        icon: "",
        children: [],
    });

    @observable CategorySelected: TreeViewData = new TreeViewData();

    constructor() {
        makeObservable(this);
    }

    @action
    async init() {
        if (this.isLoading)
            return;
        this.set_isLoading(true);
        const [err, data] = await Category.getList();

        if (err) {
            throw new Error(err.message);
        }

        this.set_categories(data);
        this.mapped2TreeViewData();
        this.set_isLoading(false);
    }

    @action mapped2TreeViewData() {
        const result: TreeViewData = this.treeViewData;
        result.children = [];

        const nodeMapped = {};

        const treeList = this.categories.map(e => {
            const node = new TreeViewData(e);
            nodeMapped[node._id] = node;
            return node;
        });

        this.treeViewData = treeList.reduce((result, e) => {
            if (e.parent && nodeMapped[e.parent]) {
                const parent = nodeMapped[e.parent];
                parent.addChild(e);
            } else {
                result.addChild(e);
            }

            return result;
        }, result);
    }


    @action
    set_categories(v: Category[]) {
        this.categories = v;
    }

    @action
    set_isLoading(v: boolean) {
        this.isLoading = v;
    }
}