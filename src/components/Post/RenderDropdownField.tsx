import { observer } from "mobx-react-lite";
import { FC, SyntheticEvent, useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { AdvanceField, AdvanceInfoValue } from "src/models";
import { RequiredTextField } from "src/components/Post/RequiredTextField";
import { TRANSLATE_TERMS } from "src/utils";

export const RenderDropdownField: FC<{data: AdvanceField, values: AdvanceInfoValue}> = observer(({ data, values }) => {
    const [option, setOption] = useState<string[]>([]);

    const onChange = (e: SyntheticEvent, value: string | null) => {
        values[data.fieldName] = !value ? "" : value;
    }

    useEffect(() => {
        if (data.option.isReference) {
            if (values[data.option.referenceName]) {
                const value: string = (values[data.option.referenceName] as string) || "";

                if (data.option.reference[data.option.referenceName]) {
                    const references = data.option.reference[data.option.referenceName];

                    if (references) {
                        values[data.fieldName] = "";
                        setOption(references[value]);
                    }
                }

            }
        } else {
            setOption(data.option.Enum);
        }
    }, [values[data.option.referenceName]])

    return <Autocomplete
        disablePortal
        id={data.fieldName}
        options={option}
        value={values[data.fieldName] as string || ""}
        onChange={onChange}
        slotProps={{ paper: { sx: { padding: 1 } } }}
        noOptionsText={TRANSLATE_TERMS.NO_OPTION_TEXT}
        renderInput={(params) =>
            <TextField {...params} label={<>{data.labelName} <RequiredTextField data={data} values={values} /> </>}
                       fullWidth />}
    />
});