export const toCurrency = (v: number, withUnit?: boolean) => {

    return v.toLocaleString("vi", withUnit ? { style: 'currency', currency: 'VND' } : { style: "decimal" })
}

export const currency2Number = (v: string) => {
    v = v.replaceAll(/\.|,|\D/gi, "");
    return +v || 0;
}