import { action, makeObservable, observable } from "mobx";
import { Category } from "../models/Category";

export class TreeViewData {
    @observable name: string;
    @observable _id: string;
    @observable parentNode: TreeViewData | null;
    @observable parent: string;
    @observable icon: string;
    @observable children: TreeViewData[];
    @observable isView;
    @observable isAddNew = false;

    constructor(data?: any) {
        this.name = "";
        this._id = "";
        this.parent = "";
        this.parentNode = null;
        this.icon = "";
        this.children = [];

        this.isView = true;

        if (data) {
            const { name, _id, parent, icon, children } = data;

            this.name = name;
            this._id = _id;
            this.parent = parent;
            this.icon = icon;
            this.children = children || [];
        }
        makeObservable(this);
    }

    @action addNew() {
        const newTreeData = new TreeViewData();
        newTreeData.isAddNew = true;
        newTreeData.isView = false;
        newTreeData.parentNode = this;
        newTreeData._id = (+new Date()).toString();
        this.children.push(newTreeData);
    }

    @action save() {
        if (!this.name || !this.icon || !this.parentNode)
            throw new Error("CATEGORY_INVALID");

        const category = new Category({ name: this.name, icon: this.icon, parent: this.parentNode._id });

        return category.save();
    }

    @action addChild(child: TreeViewData) {
        child.parentNode = this;
        this.children.push(child);
    }

    @action getChildCount(): number {
        const result = this.children.length;

        const count = this.children.reduce((r, e) => {
            return r + e.getChildCount();
        }, 0)

        return result + count;
    }

    @action removeInTree() {
        const parent = this.parentNode;

        if (parent) {
            parent.children = parent?.children.filter(e => e._id !== this._id) || [];
        }
    }

    @action set_name(v: string) {
        this.name = v;
    }
}

export class CategoryStore {
    @observable categories: Category[] = [];
    @observable isLoading: boolean = false;
    @observable treeViewData: TreeViewData = new TreeViewData({
        name: "ROOT",
        _id: "ROOT",
        description: "",
        parent: "",
        icon: "",
        children: []
    });

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
    }

    @action mapped2TreeViewData() {
        const result: TreeViewData = this.treeViewData;
        result.children = [];

        const nodeMapped = {};

        const treeList = this.categories.map(e => {
            const node = new TreeViewData(e)
            nodeMapped[node._id] = node;
            return node;
        });

        const r = treeList.reduce((result, e) => {
            if (e.parent && nodeMapped[e.parent]) {
                const parent = nodeMapped[e.parent];
                parent.addChild(e);
            } else {
                result.children.push(e);
            }

            return result;
        }, result);

        this.treeViewData = r;
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