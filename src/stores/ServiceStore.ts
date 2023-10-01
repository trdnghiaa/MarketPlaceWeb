import {action, observable} from "mobx";

export class ServiceStore {

    @observable services: string[] = new Array<string>();
    @action add_services(v: string) {
        console.log(this)
        this.services.push(v);
    }

    @action remove_service(v: string) {
        let ser = this.services.indexOf(v);
        this.services.splice(ser, 1);
    }
}