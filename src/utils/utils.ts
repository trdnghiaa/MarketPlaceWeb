export const randomStringWithLength = (length: number) => {
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    let randomstring = '';
    for (let i = 0; i < length; i++) {
        const rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum, rnum + 1);
    }
    return randomstring;
}

export const goBack = () => window.history.go(-1);

// @ts-ignore
export const class2JSON = (clss: any) => {
    if (clss instanceof Array) return clss.map(class2JSON);

    switch (typeof clss) {
        case "string":
            return clss;
        case "object":
            const result = {};
            const keys = Object.keys(clss);
            for (const key of keys) {
                result[key] = class2JSON(clss[key]);
            }
            return result;
        case "boolean":
            return Boolean(clss);
    }
    return {};
}