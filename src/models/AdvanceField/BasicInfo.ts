import { action, makeObservable, observable } from "mobx";
import { MAX_PRICE_DEFAULT, MIN_PRICE_DEFAULT } from "src/config";

export class BasicInfo {
    @observable min_price: number;
    @observable max_price: number;

    constructor(data?: any) {
        this.min_price = MIN_PRICE_DEFAULT;
        this.max_price = MAX_PRICE_DEFAULT;
        if (data) {
            const { min_price, max_price } = data;
            this.min_price = min_price;
            this.max_price = max_price;
        }
        makeObservable(this);
    }

    @action set_min(v: number) {
        this.min_price = v;
    }

    @action set_max(v: number) {
        this.max_price = v;
    }
}