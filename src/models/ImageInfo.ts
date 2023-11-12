import { action, makeObservable, observable } from "mobx";

export class ImageInfo {
    @observable
    min: number;
    @observable
    max: number;

    constructor(data?: any) {
        this.min = 1;
        this.max = 10;
        if (data) {
            const { min, max } = data;
            this.min = min;
            this.max = max;
        }
        makeObservable(this);
    }

    @action set_min(v: number) {

        this.min = v;
        console.log(v, this.min);

    }

    @action set_max(v: number) {
        this.max = v;
    }
}