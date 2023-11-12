import { observer } from "mobx-react-lite";
import { FC, useEffect, useState } from "react";
import { AdvanceField, EColumn } from "src/models";
import { FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { TRANSLATE_TERMS } from "src/utils";

export const StyleField: FC<{data: AdvanceField}> = observer(({ data }) => {
    const [cols, setCols] = useState<string[]>([]);

    useEffect(() => {
        setCols(Object.keys(EColumn).filter((e) => !+e));
    }, []);

    const selectRequiredFieldNameChange = (event: SelectChangeEvent<string>) => {
        const { value } = event.target;
        data.style.set_col(value as unknown as EColumn);
    };

    return <FormControl fullWidth component={Grid} item xs={10}>
        <InputLabel id={"col_label"}>{TRANSLATE_TERMS.COLUMN_LABEL_TEXT}</InputLabel>
        <Select
            labelId="col_label"
            value={data.style.col != null ? data.style.col.toString() : ""}
            label={TRANSLATE_TERMS.COLUMN_LABEL_TEXT}
            onChange={selectRequiredFieldNameChange}
        >
            {cols.map(e => <MenuItem key={e} value={`${EColumn[e]}`}>{TRANSLATE_TERMS[e] || e}</MenuItem>)}
            <MenuItem value={""} selected>{TRANSLATE_TERMS.REFERENCE_NONE_TEXT}</MenuItem>
        </Select>
    </FormControl>
});