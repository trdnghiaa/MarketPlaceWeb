import { action, computed, makeObservable, observable } from "mobx";
import { enqueueSnackbar } from "notistack";
import { MESSAGE_TERMS } from "../utils/messageTerms";

export enum DialogType {
    confirm = "confirm",
}

export class DialogStore {
    confirmDialogBase: Object = {
        isOpen: false,
        questionText: "",
        descriptionText: "",
        agreeButtonText: "",
        disagreeButtonText: "",
    }

    @observable
    controller: Object = {
        confirm: {
            isOpen: false,
            questionText: "",
            descriptionText: "",
            agreeButtonText: "",
            disagreeButtonText: "",
        }
    }

    constructor() {
        makeObservable(this);
    }

    @action
    getIsOpenByName(name: DialogType): boolean {
        return this.controller[name].isOpen || false;
    }

    @action
    closeHandleByName(name: DialogType): VoidFunction {
        return () => {
            this.controller[name] = Object.assign(this.confirmDialogBase);
        }
    }

    @action
    openDialog(name: DialogType, question: string, description: string, confirmHandle: Function,  options?: Object) {
        const current = this.controller[name];
        if (!current) {
            enqueueSnackbar(MESSAGE_TERMS.NO_DIALOG_EXISTED, { variant: "error" });
        }

        current.questionText = question;
        current.descriptionText = description;
        current.isOpen = true;

        for (const key in options) {
            current[key] = options[key];
        }
    }

}