import {FetchAPI, Method} from "../service/fetchAPI";
import {action, makeObservable, observable} from "mobx";

export class OrderDetail{
    @observable detailId: string;
    @observable productName: string;
    @observable quantity: number;
    @observable price: number;
    @observable thumbnail: string;
    @observable link: string;
    @observable orderId: string;

    constructor(data?: any){
        this.detailId = "";
        this.productName = "";
        this.quantity = 0;
        this.price = 0;
        this.thumbnail = "";
        this.link = "";
        this.orderId = "";
        makeObservable(this)
    }

    static async update(detail: OrderDetail){
        const [err, data] = await FetchAPI<{message: string}>(Method.PUT, `/order-detail/${detail.detailId}`, detail);
        return [err, data] as const;
    }

    static async delete(id: string){
        const [err, data] = await FetchAPI<{message: string}>(Method.DELETE, `/order-detail/${id}`);
        return [err, data] as const;
    }
}