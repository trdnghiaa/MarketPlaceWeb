import { action, makeObservable, observable } from "mobx";
import { FieldOption, FieldType, StyleField } from "src/models";


export class AdvanceField {
    // @observable
    // _id: string;
    @observable
    fieldName: string;
    @observable
    labelName: string;
    @observable
    fieldType: FieldType;
    @observable
    option: FieldOption;
    @observable style: StyleField;

    constructor(data?: any) {
        this.fieldName = "";
        this.labelName = "";
        this.fieldType = FieldType.TEXT;
        // this._id = "";
        this.option = new FieldOption();
        this.style = new StyleField();

        if (data) {
            const { _id, fieldName, labelName, fieldType, option, style } = data;

            this.option = new FieldOption(option);
            // this._id = _id;
            this.fieldName = fieldName;
            this.labelName = labelName;
            this.fieldType = FieldType[fieldType];
            this.style = new StyleField(style);
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


