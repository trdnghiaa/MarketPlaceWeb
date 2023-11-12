import { ChangeEvent, FC, useEffect } from "react";
import { AdvanceField, FieldType } from "src/models";
import { observer } from "mobx-react-lite";
import { reaction } from "mobx";
import { FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Switch } from "@mui/material";
import { TRANSLATE_TERMS } from "src/utils";
import { ReferenceItem } from "src/components/AdvanceOption";

export const SelectorFieldsEditor: FC<{data: AdvanceField, fields: AdvanceField[]}> = observer(({ data, fields }) => {
    const isReferenceHandle = (event: ChangeEvent<HTMLInputElement>) => {
        const { checked } = event.target;
        data.option.set_isReference(checked);
        if (!checked) {
            data.option.set_referenceName("");
            data.option.set_reference({});
        }
    };

    useEffect(() => {
        const field: AdvanceField = new AdvanceField(fields.find((e) => e.fieldName == data.option.referenceName));
        reaction(() => [data.option.referenceName, new AdvanceField(fields.find((e) => e.fieldName == data.option.referenceName)), field.option.Enum.length], (values) => {
            const referenceName: string = values[0] as string;
            const advanceField: AdvanceField = new AdvanceField(fields.find((e) => e.fieldName == data.option.referenceName));
            const reference = {
                [referenceName]: advanceField.option.Enum.reduce((r, e) => ({ ...r, [e]: data.option.reference[referenceName] ? data.option.reference[referenceName][e] || [] : [] }), {}),
            };
            console.log(reference)
            data.option.set_reference(reference);
        });
    }, [data.option.referenceName]);

    const selectReferenceChange = (event: SelectChangeEvent<string>) => {
        const { value } = event.target;
        if (value == "") {
            data.option.set_isReference(false);
            data.option.set_reference({});
        }
        data.option.set_referenceName(value);
    }

    return <Grid container direction={"column"} spacing={1}
                 sx={{ border: "1px solid #999", padding: 1 }}>
        <FormControlLabel control={<Switch checked={data.option.isReference} onChange={isReferenceHandle} />}
                          label={TRANSLATE_TERMS.REFERENCE_SWITCH_TEXT} />

        {data.option.isReference && <>
            <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel id="selector_reference_label">{TRANSLATE_TERMS.REFERENCE_LABEL_TEXT}</InputLabel>
                <Select
                    labelId="selector_reference_label"
                    id="reference_selector"
                    value={data.option.referenceName}
                    label={TRANSLATE_TERMS.REFERENCE_LABEL_TEXT}
                    onChange={selectReferenceChange}
                >
                    {
                        fields.filter((e) => e.fieldName != data.fieldName || e.fieldType == FieldType.OPTION)
                            .map(e => <MenuItem key={e.fieldName}
                                                value={e.fieldName}>{`${e.labelName} (${e.fieldName})`}</MenuItem>)
                    }
                    <MenuItem value={""}>{TRANSLATE_TERMS.REFERENCE_NONE_TEXT}</MenuItem>
                </Select>
            </FormControl>

            {data.option.referenceName &&
                <Grid item xs={6} container direction="column" spacing={1} sx={{ mt: 2 }}>
                    {Object.keys(data.option.reference[data.option.referenceName] || {})
                        .map((e) => <ReferenceItem reference={data.option.reference[data.option.referenceName]}
                                                   name={e} key={e} />)
                    }</Grid>}

        </>}
    </Grid>
});
