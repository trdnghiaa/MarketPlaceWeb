import { makeAutoObservable } from "mobx";

export class MyPostStore {
    constructor() {
        makeAutoObservable(this);
    }
}