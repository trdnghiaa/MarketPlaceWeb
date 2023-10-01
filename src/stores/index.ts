import { createContext, useContext} from "react";
import { Store } from "./Store";

import {makeObservable} from "mobx";

export const store = makeObservable(new Store());

export const StoreContext = createContext(store);

export function useStore() {
	return useContext(StoreContext);
}

// @ts-ignore
window.store = store;
