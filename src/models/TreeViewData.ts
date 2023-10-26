import { action, makeObservable, observable } from "mobx";
import { Category } from "./Category";

export class TreeViewData {
    @observable name: string;
    @observable _id: string;
    @observable parentNode: TreeViewData | null;
    @observable parent: string;
    @observable icon: string;
    @observable children: TreeViewData[];
    @observable isView: boolean;
    @observable isAddNew = false;
    @observable category = new Category();

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
            this.category = new Category(data);
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
        newTreeData._id = "";
        this.children.push(newTreeData);
    }

    @action save() {
        if (!this.name || !this.icon || !this.parentNode)
            throw new Error("CATEGORY_INVALID");

        const category = new Category({ name: this.name, icon: this.icon, parent: this.parentNode._id, _id: this._id });

        return category.save();
    }

    @action delete() {
        if (!this._id || this._id.length != 24) throw new Error("CATEGORY_ID_INVALID");

        return Category.delete(this._id);
    }

    @action addChild(child: TreeViewData) {
        child.parentNode = this;
        this.children.push(child);
    }

    @action getChildCount(): number {
        return this.children.reduce((r, e) => r + e.getChildCount(), this.children.length);
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

    @action getNameNChild(): string[] {
        const map = this.children.flatMap(e => e.getNameNChild());
        return [this.name, ...map];
    }

    @action getNameOfChild(bold?: boolean): string {
        const data = this.children.flatMap(e => e.getNameNChild());
        return (bold ? data.map(e => `<b>${e}</b>`) : data).join(", ");
    }
}