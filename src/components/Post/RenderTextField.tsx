import { observer } from "mobx-react-lite";
import { FC } from "react";
import { AdvanceField, AdvanceInfoValue, TextType } from "src/models";
import { FormControl, InputLabel, OutlinedInput, SelectChangeEvent } from "@mui/material";
import { RequiredTextField } from "src/components/Post/RequiredTextField";

export const RenderTextField: FC<{data: AdvanceField, values: AdvanceInfoValue}> = observer(({ data, values }) => {
    const handleChange = (event: SelectChangeEvent) => {
        console.log(event.target.value);
    }
    return <FormControl fullWidth>
        <InputLabel htmlFor={data.fieldName}>
            {data.labelName} <RequiredTextField data={data} values={values} />
        </InputLabel>
        <OutlinedInput
            id={data.fieldName}
            value={values[data.fieldName]}
            type={data.option.textType}
            onChange={(event) => {
                const { value } = event.target;
                values[data.fieldName] = data.option.textType === TextType.NUMBER ? +value : value;
            }}
            label={data.labelName}
            required
        />
    </FormControl>
});