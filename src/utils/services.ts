export const Object2Filter = (obj: object): object => {
    const filter: Array<Object> = [];

    for (let key of Object.keys(obj)) {
        filter.push({ field: key, type: "=", value: obj[key] });
    }

    return arrFilter2Obj(filter);
}

function arrFilter2Obj(filters: Array<Object>): object {
    const obj = {};

    for (const index in filters) {
        for (const key in filters[index]) {
            obj[`filters[${index}][${key}]`] = filters[index][key];
        }
    }
    return obj;
}