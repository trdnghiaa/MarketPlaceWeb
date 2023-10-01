import { makeObservable, observable } from "mobx";
import { FetchAPI, Method } from "../service/fetchAPI";

export class Voucher{
    @observable
    title: string;
    @observable
    content: string;
    @observable
    effectiveAt: string;
    @observable
    voucherCode: string;
    @observable
    amount: number;
    @observable
    expirationAt: string;
    @observable
    type: string
    @observable
    description: string

    constructor(data? : any){
        this.title = "";
        this.content = "";
        this.effectiveAt = "";
        this.amount = 0;
        this.voucherCode = "";
        this.expirationAt = "";
        this.type = "";
        this.description = "";
        makeObservable(this)
    }

    static async getMyVoucher(userId: string, type: string){
        const res = await fetch(`https://api.votuan.xyz/api/v1/user/voucher/owner?type=${type}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
                'user_id': `${userId}`
            }
        });
        return res.json();
    }

}