import { action, makeObservable, observable } from "mobx";
import { Order } from "../models/Order";

export class OrderStore{
    constructor() {
        makeObservable(this);
    }
    @observable orders: Order[] = [];
    @observable mode: string = "PARTNER"
    
    @action set_orders(v: Order[]){
        this.orders = v;
    }
    @action set_mode(v: string) {
        this.mode = v;
    }
}