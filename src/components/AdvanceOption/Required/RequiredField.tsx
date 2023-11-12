import { ChangeEvent, FC } from "react";
import { AdvanceField } from "src/models";
import { observer } from "mobx-react-lite";
import { Box, Checkbox, FormControlLabel, FormGroup, Grid, SelectChangeEvent, Typography } from "@mui/material";
import { TRANSLATE_TERMS } from "src/utils";
import { SelectField } from "src/components/AdvanceOption/SelectField";
import { SelectOptionOfField } from "src/components/AdvanceOption/SelectField/SelectOptionOfField";

export const RequiredField: FC<{data: AdvanceField, fields: AdvanceField[]}> = observer(({ data, fields }) => {
    const isRequiredHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { checked } = event.target;
        data.option.set_isRequired(checked);
    }

    const isRequiredWithFieldHandle = (event: ChangeEvent<HTMLInputElement>) => {
        const { checked } = event.target;
        data.option.set_isRequiredWithField(checked);
        if (!checked) {
            data.option.set_requiredFieldName("");
            data.option.set_requiredOptions({});
        }
    }

    const selectRequiredFieldNameChange = (event: SelectChangeEvent<string>) => {
        const { value } = event.target;
        data.option.set_requiredFieldName(value);
    }

    // useEffect(() => {
    //     const field: AdvanceField = new AdvanceField(fields.find(e => e.fieldName == data.option.requiredFieldName));
    //     data.option.set_requiredOptions({ [field.fieldName]: [] });
    // }, [data.option.requiredFieldName]);

    return <Grid item xs={12} container direction={"column"} spacing={1}>
        <Box sx={{ border: "1px solid #999", padding: 1 }}>
            {
                !data.option.isRequiredWithField && <Grid item xs={6}>
                    <FormControlLabel required control={<Checkbox checked={data.option.isRequired}
                                                                  onChange={isRequiredHandleChange} />}
                                      label={TRANSLATE_TERMS.REQUIRED_TEXT_LABEL} />
                </Grid>
            }
            {
                data.option.isRequired && <RequiredAlertText />
            }
            {
                !data.option.isRequired && <Grid item xs={12}>
                    <FormControlLabel required control={<Checkbox checked={data.option.isRequiredWithField}
                                                                  onChange={isRequiredWithFieldHandle} />}
                                      label={TRANSLATE_TERMS.REQUIRED_WITH_OPTION_FIELD_TEXT_LABEL} sx={{ mb: 1 }} />
                </Grid>
            }
            {
                data.option.isRequiredWithField && <Grid item md={12}>
                    <SelectField fieldName={data.option.requiredFieldName}
                                 set_fieldName={(v) => {data.option.set_requiredFieldName(v)}} fields={fields}
                                 currentField={data.fieldName} />
                    <FormGroup>
                        <SelectOptionOfField fieldName={data.fieldName}
                                             options={new AdvanceField(fields.find(e => e.fieldName == data.option.requiredFieldName)).option.Enum}
                                             fields={fields}
                                             selectedOption={data.option.requiredOptions[data.option.requiredFieldName] || []}
                                             setSelectOption={(v) => {
                                                 if (data.option.requiredFieldName) {
                                                     data.option.set_requiredOptions({ [data.option.requiredFieldName]: v });
                                                 }
                                             }} />
                        <RequiredFieldAlertText />
                    </FormGroup>
                </Grid>
            }
        </Box>
    </Grid>;
});

export const RequiredAlertText: FC = () => {
    return <Typography variant={"body2"} color={"error"}>{TRANSLATE_TERMS.REQUIRED_ALERT_TEXT}</Typography>
}

export const RequiredFieldAlertText: FC = () => {
    return <Typography variant={"body2"} color={"error"}>{TRANSLATE_TERMS.REQUIRED_FIELD_ALERT_TEXT}</Typography>
}