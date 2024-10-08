import { IErrorData } from "src/models/types";

export const headers: {[key: string]: string} = {
    "Content-Type": "application/json",
    'Access-Control-Allow-Origin': '*',
    Accept: "application/json",
};


// blind port with localhost
export const HOST: string = window.location.hostname == "localhost" ? (process.env?.REACT_APP_API || "") : "https://high3ar.club";


export function setAuthorizationToken(token: string) {
    if (!token) delete headers.Authorization;
    else {
        headers.Authorization = `Bearer ${token}`;
    }
}

export const UPLOAD_URL = HOST + "/api/storages"

export enum Method {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE"
}

export async function FetchAPI<T = any, TError = any>(
    method: Method,
    input: string,
    body?: {}
): Promise<[IErrorData<TError> | undefined, T]> {
    try {
        const url = new URL("/api" + input, HOST);

        const res = await fetch(url.toJSON(), {
            method,
            mode: "cors",
            headers,
            ...(method !== "GET" && body
                ? { body: JSON.stringify(body) }
                : {}),
        });
        if (res.ok) {
            try {
                const data = await res.json();

                if (data.success) {
                    if (data.data)
                        return [undefined, data.data as any as T]
                    else
                        return [undefined, data as any as T];
                }

                return [Object.assign(new Error(data.message)), data.data as any as T];
            } catch (error) {
                console.warn(error);
                return [undefined, null as any as T];
            }
        }

        const err = Object.assign(new Error(res.statusText) || String(res.status), { status: res.status })
        try {
            const e = await res.json();
            return [Object.assign(err, e), null as any];
        } catch {
            return [err, null as any];
        }

    } catch (err) {
        console.warn(err);
        return [undefined, null as any];
    }
}

export async function FetchFile(input: string, fileName: string) {
    try {
        const response = await fetch(HOST + input, {});

        const blob = await response.blob();

        return new File([blob], `${fileName}.jpg`, { type: "image/jpeg" });
    } catch (err) {
        console.warn(err);
        return undefined;
    }
}
