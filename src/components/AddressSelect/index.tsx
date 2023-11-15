import { ChangeEvent, FC, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Autocomplete, FormControl, Grid, InputLabel, OutlinedInput, TextField } from "@mui/material";
import { TRANSLATE_TERMS } from "src/utils";
import { useStore } from "src/stores";
import { LabelRequired } from "src/components/Post/RequiredTextField";
import { useDebounce } from "src/utils/useBounce";

export const AddressSelect: FC<{set_address: (address: string) => void, address: string, isView: boolean}> = observer(({ set_address, address, isView }) => {
    const { sCountries } = useStore();

    const [cities, setCities] = useState<string[]>([]);
    const [districts, setDistricts] = useState<string[]>([]);
    const [wards, setWards] = useState<string[]>([]);

    const [city, setCity] = useState<string>("");
    const [district, setDistrict] = useState<string>("");
    const [ward, setWard] = useState<string>("");
    const [detail, setDetail] = useState<string>("");

    const debounceValue = useDebounce(detail, 500);

    useEffect(() => {
        const splitAdd = address.split(", ");
        setCity(splitAdd[3] || "");
        setDistrict(splitAdd[2] || "");
        setWard(splitAdd[1] || "");
        setDetail(splitAdd[0] || "");
    }, [address]);

    useEffect(() => {
        setCities(Object.keys(sCountries.countries));
    }, [sCountries.countries]);

    useEffect(() => {
        setWards([]);
        setDistricts([]);

        if (city) {
            const data = sCountries.countries[city].districts;
            setDistricts(Object.keys(data))
        }
        changeAddress();
    }, [city]);

    useEffect(() => {
        setWards([]);

        if (district) {
            const data = sCountries.countries[city].districts[district].wards;
            setWards(Object.keys(data));
        }
        changeAddress();
    }, [district]);

    useEffect(() => {
        changeAddress();
    }, [ward])

    useEffect(() => {
        changeAddress();
    }, [debounceValue]);

    const changeAddress = () => {
        if (ward && district && city) {
            set_address([detail, ward, district, city].join(", "));
        }
    }

    const changeCity = (event: any, newValue: string | null) => {
        setCity(newValue || "");
    }

    const changeDistrict = (event: any, newValue: string | null) => {
        setDistrict(newValue || "");
    }

    const changeWard = (event: any, newValue: string | null) => {
        setWard(newValue || "");
    }

    const changeDetail = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;

        setDetail(value || "");
    };

    return <Grid container spacing={2} justifyContent={"space-between"}>
        <Grid item xs={4}>
            <Autocomplete
                disablePortal
                id="city_address"
                options={cities}
                value={city}
                onChange={changeCity}
                disabled={isView}
                renderInput={(params) => <TextField {...params} label={<LabelRequired
                    label={TRANSLATE_TERMS.CITY_ADDRESS_TEXT} />} />}
            />
        </Grid>
        <Grid item xs={4}>
            <Autocomplete
                disablePortal
                id="district_address"
                value={district}
                onChange={changeDistrict}
                options={districts}
                disabled={isView}
                renderInput={(params) => <TextField {...params} label={<LabelRequired
                    label={TRANSLATE_TERMS.ADDRESS_DESTRICT_TEXT} />} />}
            />
        </Grid>
        <Grid item xs={4}>
            <Autocomplete
                disablePortal
                id="wards_address"
                value={ward}
                onChange={changeWard}
                options={wards}
                disabled={isView}
                renderInput={(params) => <TextField {...params} label={<LabelRequired
                    label={TRANSLATE_TERMS.ADDRESS_WARDS_TEXT} />} />}
            />
        </Grid>
        <Grid item xs={12}>
            <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel htmlFor={"detail_address"}>
                    <LabelRequired
                        label={TRANSLATE_TERMS.ADDRESS_DETAIL_TEXT} />
                </InputLabel>
                <OutlinedInput
                    disabled={isView}
                    id={"detail_address"}
                    value={detail}
                    onChange={changeDetail}
                    label={TRANSLATE_TERMS.ADDRESS_DETAIL_TEXT}
                    name="detail_address"
                    required
                />
            </FormControl>
        </Grid>
    </Grid>
});