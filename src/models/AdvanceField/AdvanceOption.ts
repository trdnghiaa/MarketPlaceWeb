import { action, makeObservable, observable } from "mobx";
import { FetchAPI, Method } from "src/service/fetchAPI";
import { AdvanceField } from "src/models";

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