import { action, makeObservable, observable } from "mobx";
import { Category, TreeViewData } from "src/models";

export class CategoryStore {
    @observable categories: Category[] = [];
    @observable isLoading: boolean = false;
    @observable treeViewData: TreeViewData = new TreeViewData({
        name: "DANH MỤC",
        _id: "ROOT",
        description: "",
        parent: "",
        icon: "",
        children: [],
    });
    @observable nodeMapped: {[name: string]: TreeViewData} = {};

    @observable CategorySelected: TreeViewData = new TreeViewData();

    @observable maxHeightTree: number = 0;

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

    @action getChildrenById(_id: string) {
        const data = this.nodeMapped[_id];
        if (data) {
            return data.children;
        }
        return [];
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
                if (e.height > this.maxHeightTree) {
                    this.maxHeightTree = e.height;
                }
            } else {
                result.addChild(e);
            }

            return result;
        }, result);
        this.nodeMapped = nodeMapped;
    }

    findById(_id: string) {
        if (_id == "ROOT") {
            return new Category({ _id, name: "Danh Mục" })
        }
        const category = new Category(this.categories.find(e => e._id == _id));
        return category;
    }

    @action
    set_categories(v: Category[]) {
        this.categories = v;
    }

    @action
    set_isLoading(v: boolean) {
        this.isLoading = v;
    }

    @action
    async findByIdWithAdvance(_id: string) {
        const [err, data] = await Category.getPublicById(_id);

        return [err, data] as const
    }
}