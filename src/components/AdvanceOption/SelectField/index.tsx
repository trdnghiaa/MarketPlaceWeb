import { FC } from "react";
import { observer } from "mobx-react-lite";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { TRANSLATE_TERMS } from "src/utils";
import { AdvanceField } from "src/models";

export const SelectField: FC<{fieldName: string, set_fieldName: (v: string) => void, fields: AdvanceField[], currentField: string}> = observer(({ fieldName, set_fieldName, fields, currentField }) => {
    const filterFieldForRequiredField = (e: AdvanceField) => e.fieldName && e.labelName && e.fieldName != currentField;

    const selectRequiredFieldNameChange = (event: SelectChangeEvent<string>) => {
        const { value } = event.target;
        set_fieldName(value);
    }

    return <FormControl fullWidth>
        <InputLabel>{TRANSLATE_TERMS.FIELD_TYPE_LABEL}</InputLabel>
        <Select
            value={fieldName}
            label={TRANSLATE_TERMS.FIELD_TYPE_LABEL}
            onChange={selectRequiredFieldNameChange}
        >
            {fields.filter(filterFieldForRequiredField)
                .map(e => <MenuItem key={e.fieldName}
                                    value={e.fieldName}>{e.labelName} ({e.fieldName} - {e.fieldType})</MenuItem>)}
            <MenuItem value={""} selected>{TRANSLATE_TERMS.REFERENCE_NONE_TEXT}</MenuItem>
        </Select>
    </FormControl>
});