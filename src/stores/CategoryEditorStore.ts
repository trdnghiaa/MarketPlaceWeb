import { action, makeAutoObservable, observable } from "mobx";
import { AdvanceOption, Category, FieldType } from "src/models";
import { MESSAGE_TERMS, TRANSLATE_TERMS } from "src/utils";
import { ROOT_CATEGORY } from "src/config";
import { Store } from "./Store";


export class CategoryEditorStore {
    @observable
    isLoading: boolean = false;

    @observable
    id: string = "";

    @observable
    category: Category = new Category();

    @observable
    parent: Category = new Category();

    @observable
    isCreateNew: boolean = false;

    @observable
    isView: boolean = false;

    @observable
    advanceOptionParent: AdvanceOption[] = [];

    @observable
    childOfCategory: Category[] = [];

    constructor(private store: Store) {
        makeAutoObservable(this);
    }

    @action init() {
        this.set_category(new Category());
        this.set_parent(new Category());
    }

    @action set_category(v: Category) {
        this.category = v;
    }

    @action set_advanceOption(v: AdvanceOption[]) {
        this.advanceOptionParent = v;
    }

    @action
    async get(category: string) {
        const [err, data] = await Category.getById(category);

        if (err) throw err;

        this.set_category(data);
    }

    @action set_parent(v: Category) {
        this.parent = v;
    }

    @action validateAdvanceOption() {
        for (let index = 0; index < this.category.advancedSchemaInfo.length; index++) {
            const currentOption = this.category.advancedSchemaInfo[index];


            if (!currentOption.title) {
                throw new Error(MESSAGE_TERMS.get("MISS_ADVANCE_OPTION_TITLE", { index: TRANSLATE_TERMS.ADD_OPTION_TEXT + " " + (index + 1) }));
            }

            if (!currentOption.fields.length) {
                throw new Error("MISS_FIELDS_ADVANCE_OPTION");
            }

            for (let indexField = 0; indexField < currentOption.fields.length; indexField++) {
                const currentField = currentOption.fields[indexField];

                if (!currentField.fieldName) {
                    throw new Error(MESSAGE_TERMS.get("MISS_FIELD_NAME", { path: `"${currentOption.title} > ${TRANSLATE_TERMS.ADD_FIELD_TEXT} ${indexField + 1}"` }));
                }

                if (currentField.fieldType == FieldType.OPTION) {
                    console.log(currentField.option)
                    if (currentField.option.Enum.length < 2) {
                        throw new Error(MESSAGE_TERMS.get("MISS_ENUM_OPTION_FIELD", { path: `"${currentOption.title} > ${TRANSLATE_TERMS.ADD_FIELD_TEXT} ${currentField.fieldName}"` }))
                    }
                }
            }

        }
    }

    @action
    async doSave(): Promise<{data: Category, message: string}> {
        return new Promise(async (resolve, reject) => {
            try {
                this.set_isLoading(true);
                if (!this.category.name) {
                    throw new Error("MISS_CATEGORY_NAME")
                }

                if (!this.category.icon) {
                    throw new Error("MISS_CATEGORY_ICON");
                }

                if (this.category.advancedSchemaInfo.length > 0) {
                    this.validateAdvanceOption();
                }
                // if (!this.category._id || this.parent._id)
                this.category.set_parent(this.parent._id || ROOT_CATEGORY);

                const [err, data] = await this.category.save();
                if (err) throw err;

                resolve(data);
            } catch (e) {
                reject(e);
            }
            this.set_isLoading(false);
        });
    }

    @action set_isLoading(v: boolean) {
        this.isLoading = v;
    }

    @action
    async getById(id: string) {
        if (this.isLoading) return;

        this.set_isLoading(true);
        const [err, data] = await Category.getById(id);

        if (err)
            throw err;

        this.set_category(new Category(data));

        if (data.parent != ROOT_CATEGORY) {
            const parent: Category = this.store.sCategories.categories.find((e) => e._id == data.parent) || new Category();
            await this.getParentAdvanceOption();
            this.set_parent(parent);
        }
        this.set_isLoading(false);
    }

    @action
    async getParentAdvanceOption() {
        let id = "";

        if (this.isCreateNew) {
            if (!this.parent._id) return;
            id = this.parent._id;
        } else {
            if (!this.category._id) return;
            id = this.category._id;
        }

        const [err, data] = await AdvanceOption.getAdvanceOption(id);

        if (err) throw err;

        this.category.set_advancedSchemaInfo(data.concat(this.category.advancedSchemaInfo)
            .map(e => new AdvanceOption(e)));
    }

    @action getChildOfCategory() {

    }

    @action set_isCreateNew(v: boolean) {
        this.isCreateNew = v;
    }
}