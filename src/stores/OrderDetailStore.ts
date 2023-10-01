import { action, makeObservable, observable } from "mobx";
import { Order } from "../models/Order";

export class OrderDetailStore{
    constructor() {
        makeObservable(this);
    }
    @observable order: Order = new Order();

    @action set_order(v: Order){
        this.order = v;
    }

}