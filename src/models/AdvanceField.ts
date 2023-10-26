import { action, makeObservable, observable } from "mobx";
import { FetchAPI, Method } from "../service/fetchAPI";

export enum FieldType {
    TEXT = "TEXT",
    OPTION = "OPTION",
    YEAR = "YEAR",
    SELECTOR = "SELECTOR",
}

export interface Reference {
    [name: string]: {
        [name: string]: string[]
    }
}

export class FieldOption {
    @observable
    Enum: string[];
    @observable
    multiSelect: boolean;
    @observable
    placeholder: string;
    @observable
    referenceName: string;
    @observable
    reference: Reference;
    @observable
    isReference: boolean;

    constructor(data?: any) {
        this.Enum = [];
        this.multiSelect = false;
        this.placeholder = "";
        this.reference = {};
        this.isReference = false;
        this.referenceName = "";

        if (data) {
            const { Enum, multiSelect, reference, isReference, referenceName } = data;
            this.Enum = Enum;
            this.multiSelect = multiSelect;
            this.reference = reference;
            this.isReference = isReference;
            this.referenceName = referenceName;
        }

        makeObservable(this);
    }

    @action set_enum(v: string[]) {
        this.Enum = v;
    }

    @action set_placeholder(v: string) {
        this.placeholder = v;
    }

    @action set_isReference(v: boolean) {
        this.isReference = v;
    }

    @action set_reference(v: Reference) {
        this.reference = v;
    }

    @action set_referenceName(v: string) {
        this.referenceName = v;
    }
}

export class AdvanceField {
    @observable
    _id: string;
    @observable
    fieldName: string;
    @observable
    labelName: string;
    @observable
    fieldType: FieldType;
    @observable
    option: FieldOption;

    constructor(data?: any) {
        this.fieldName = "";
        this.labelName = "";
        this.fieldType = FieldType.TEXT;
        this._id = "";
        this.option = new FieldOption();

        if (data) {
            const { _id, fieldName, labelName, fieldType, option } = data;

            this.option = new FieldOption(option);
            this._id = _id;
            this.fieldName = fieldName;
            this.labelName = labelName;
            this.fieldType = FieldType[fieldType];
        }

        makeObservable(this);
    }

    @action set_fieldType(v: FieldType) {
        this.fieldType = v;
    }

    @action set_fieldName(v: string) {
        this.fieldName = v;
    }

    @action set_labelName(v: string) {
        this.labelName = v;
    }
}

export class AdvanceOption {
    @observable
    title: string;
    @observable
    fields: AdvanceField[];

    constructor(data?: any) {
        this.title = "";
        this.fields = [];
        if (data) {
            const { fields, title } = data;
            this.title = title;
            this.fields = fields instanceof Array ? fields.map(e => new AdvanceField(e)) : [];
        }
        makeObservable(this);
    }

    @action set_fields(v: AdvanceField[]) {
        this.fields = v;
    }

    static async getAdvanceOption(id: string) {
        const [err, data] = await FetchAPI<AdvanceOption[]>(Method.GET, `/categories/${id}/schema`);

        return [err, data] as const;
    }
}
