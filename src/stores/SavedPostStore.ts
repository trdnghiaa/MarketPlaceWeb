import { makeAutoObservable } from "mobx";

export class SavedPostStore {
    constructor() {
        makeAutoObservable(this);
    }
}