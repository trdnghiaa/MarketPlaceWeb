import { action, makeObservable, observable } from "mobx";
import { AdvanceField, AdvanceOption, Attachment, Category, FieldType, Post } from "src/models";
import { MESSAGE_TERMS } from "src/utils";
import { DESCRIPTION_POST_MAX_LENGTH, TITLE_POST_MAX_LENGTH } from "src/config";
import { ExtFile } from "@dropzone-ui/react";

export class NewPostStore {
    @observable isLoading: boolean = false;
    @observable file: ExtFile[] = [];
    @observable post: Post = new Post();
    @observable titleMaxLength = TITLE_POST_MAX_LENGTH;
    @observable descriptionMaxLength = DESCRIPTION_POST_MAX_LENGTH;
    @observable dropTemp: Attachment[] = []

    constructor() {
        makeObservable(this);
    }


    @action
    async init(id?: string) {
        this.post = new Post();
        if (id) {
            await this.getPost(id);
        }
    }

    @action
    async getSchema() {
        const [err, data] = await AdvanceOption.getAdvanceOption(this.post.category._id);

        if (err) throw err;
        this.post.category.set_advancedSchemaInfo(data);
    }

    @action get_post() {
        return this.post;
    }

    @action
    async getPost(id: string) {
        if (this.isLoading) return;
        this.set_isLoading(true);
        const [err, data] = await Post.getById(id);

        if (err) throw err;

        const files: ExtFile[] = [];

        for (let image of data.images) {
            files.push(await image.toExtFile());
        }

        this.set_file(files);

        this.set_post(data);
        this.set_isLoading(false);
    }

    @action set_category(v: Category) {
        this.post.set_category(v);
    }

    @action set_file(v: ExtFile[]) {
        this.file = v;
    }

    @action set_isLoading(v: boolean) {
        this.isLoading = v;
    }

    showPostButton() {
        return !!this.post.category._id;

    }

    @action set_post(v: Post) {
        this.post = v;
    }

    @action postValidate() {
        if (!this.post.title) {
            throw new Error("ENTER_POST_TITLE");
        }

        if (!this.post.description) {
            throw new Error("ENTER_POST_DESCRIPTION");
        }

        if (!this.file.length) {
            throw new Error("REQUIRED_IMAGE_FOR_POST");
        }

        if (this.file.length < this.post.category.imageInfo.min) {
            throw new Error("IMAGE_LESS");
        }

        if (this.post.price < this.post.category.basicInfo.min_price) {
            throw new Error("PRICE_LESS");
        }

        if (this.post.price > this.post.category.basicInfo.max_price) {
            throw new Error("PRICE_OVERFLOW")
        }

        const schema = this.post.category.advancedSchemaInfo;

        if (!schema.length) {
            throw new Error("ADVANCE_SCHEMA_INFO_NOT_VALID");
        }

        for (let option of schema) {
            if (option.fields.length) {
                this.validateFieldList(option.fields, option);
            }
        }

    }

    @action validateFieldList(fields: AdvanceField[], option: AdvanceOption) {
        for (let field of fields) {
            this.validateFieldInfo(field, option);
        }
    }

    @action validateFieldInfo(field: AdvanceField, schema: AdvanceOption) {
        if (!field.fieldName || !field.fieldType) {
            throw new Error("FIELD_INVALID");
        }

        const option = field.option;
        const path2Field = `<b>${schema.title}</b> > <b>${field.labelName}</b>`;

        if (option.isRequired && !this.post.advanceInfo[field.fieldName]) {
            throw new Error(MESSAGE_TERMS.get("REQUIRED_FIELD_IS_EMPTY", { path: path2Field, label_type: field.fieldType == FieldType.TEXT ? "nhập" : "chọn", }))
        }

        if (option.isRequiredWithField && option.requiredFieldName) {
            if (Object.keys(option.requiredOptions).includes(option.requiredFieldName)) {
                const requiredWithValue = option.requiredOptions[option.requiredFieldName];

                if (requiredWithValue.includes(this.post.advanceInfo[option.requiredFieldName] as string)) {
                    if (!this.post.advanceInfo[field.fieldName]) {
                        const fieldRequired = schema.fields.find((e) => e.fieldName == option.requiredFieldName);
                        const requiredFieldValue = fieldRequired ? MESSAGE_TERMS.get("LABEL_VALUE_TEXT", { label: fieldRequired.labelName, value: this.post.advanceInfo[fieldRequired.fieldName] }) : "";

                        throw new Error(MESSAGE_TERMS.get("REQUIRED_FIELD_WITH_FIELD", { path: path2Field, requiredFieldValue }))
                    }
                }
            }
        }
    }

    @action dropTrash() {
        this.dropTemp.forEach((e) => {
            Attachment.dropFileTemp(e._id);
        })
    }

    @action
    async submit() {
        this.postValidate()
        return await this.post.save();
    }
}