import { AdvanceField } from "src/models";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

export const SelectOptionOfField: FC<{fieldName: string, options: string[], fields: AdvanceField[], setSelectOption: (v: string[]) => void, selectedOption: string[]}> = observer(({ fieldName, fields, options, setSelectOption, selectedOption }) => {
    const [mapOptions, setMapOptions] = useState({});

    useEffect(() => {
        setMapOptions(selectedOption.reduce((r, e) => ({ ...r, [e]: true }), {}));
    }, [fieldName, options])

    useEffect(() => {
        const fields = Object.keys(mapOptions).filter(e => mapOptions[e]);
        setSelectOption(fields);
    }, [mapOptions]);

    return <FormGroup>
        {options.map(e =>
            <FormControlLabel key={e} control={<Checkbox
                onChange={(event) => {
                    setMapOptions({ ...mapOptions, [e]: event.target.checked });
                }}
                checked={selectedOption.includes(e)} />}
                              label={e} />)}

    </FormGroup>
});