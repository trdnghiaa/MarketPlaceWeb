import { createContext, useContext } from "react";
import { Store } from "./Store";

import { makeObservable } from "mobx";

export const store = makeObservable(new Store());

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}

export * from "./Store";
export * from "./DialogStore";

// if (process.env.NODE_ENV == "development")
// @ts-ignore
window.store = store;
export { PostStore } from "src/stores/PostStore";