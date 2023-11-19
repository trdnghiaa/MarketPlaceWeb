import { action, makeObservable, observable } from "mobx";
import { Depend, Reference, RequireOption, TextType } from "src/models";

export class FieldOption {
    @observable
    Enum: string[];
    @observable
    multiSelect: boolean;
    @observable
    textType: TextType;

    @observable
    referenceName: string;
    @observable
    reference: Reference[];
    @observable
    isReference: boolean;

    @observable
    isRequired: boolean;
    @observable
    isRequiredWithField: boolean;
    @observable
    requiredFieldName: string;
    @observable
    requiredOptions: RequireOption;

    @observable depends: Depend;

    constructor(data?: any) {
        this.Enum = [];
        this.multiSelect = false;
        this.textType = TextType.TEXT;

        this.reference = [];
        this.isReference = false;
        this.referenceName = "";

        this.isRequired = false;
        this.isRequiredWithField = false;
        this.requiredFieldName = "";
        this.requiredOptions = {};
        this.depends = {};

        if (data) {
            const { Enum, multiSelect, reference, isReference, referenceName, isRequired, isRequiredWithField, requiredFieldName, requiredOptions, depends, textType } = data;
            this.Enum = Enum;
            this.multiSelect = multiSelect;
            this.reference = reference;
            this.isReference = isReference;
            this.referenceName = referenceName;
            this.isRequired = isRequired;
            this.isRequiredWithField = isRequiredWithField;
            this.requiredFieldName = requiredFieldName;
            this.requiredOptions = requiredOptions;
            this.depends = depends as Depend || {};
            this.textType = textType as TextType || TextType.TEXT;
        }


        makeObservable(this);
    }

    @action set_enum(v: string[]) {
        this.Enum = v;
    }

    @action set_textType(v: TextType) {
        this.textType = v;
    }

    @action set_isReference(v: boolean) {
        this.isReference = v;
    }

    @action set_reference(v: Reference[]) {
        this.reference = v;
    }

    @action set_referenceName(v: string) {
        this.referenceName = v;
    }

    @action set_isRequired(v: boolean) {
        this.isRequired = v;
    }

    @action set_isRequiredWithField(v: boolean) {
        this.isRequiredWithField = v;
    }

    @action set_requiredFieldName(v: string) {
        this.requiredFieldName = v;
    }

    @action set_requiredOptions(v: RequireOption) {
        this.requiredOptions = v;
    }

    @action set_depends(v: Depend) {
        this.depends = v;
    }
}