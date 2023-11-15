import { makeObservable, observable } from "mobx";

export class CountriesStore {
    @observable
    countries: object;

    constructor() {
        this.countries = {};
        this.getCountries();

        makeObservable(this);
    }

    async getCountries() {
        const data = await (await fetch("https://raw.githubusercontent.com/dvhcvn/data/master/data.json")).json();
        const city = {};
        for (const { level1_id, level2s, ...item } of data) {
            const districts = {};

            for (const { level3s, level2_id, ...item1 } of level2s) {
                const wards = {};

                for (const { level3_id, ...item2 } of level3s) {
                    wards[item2.name] = {
                        ...item2,
                        id: level3_id,
                    };
                }

                districts[item1.name] = {
                    ...item1,
                    wards,
                    id: level2_id,
                };
            }

            city[item.name] = {
                ...item,
                id: level1_id,
                districts,
            };
        }
        this.countries = city;
    }
}