import { action, makeObservable, observable } from "mobx";
import { EColumn } from "src/models";

export class StyleField {
    @observable
    col: EColumn

    constructor(data?: any) {
        this.col = EColumn.FULL;
        if (data) {
            const { col } = data;
            this.col = col as EColumn;
        }
        makeObservable(this);
    }

    @action set_col(v: number) {
        this.col = v;
    }
}