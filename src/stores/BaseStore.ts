import {action, makeObservable, observable} from "mobx";

export class BaseStore {
	constructor() {
		makeObservable(this);
	}

	@observable
	types: string[] = new Array<string>();
}
