import { ChangeEvent, FC, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Accordion, AccordionDetails, AccordionSummary, FormControlLabel, Grid, Switch, Typography } from "@mui/material";
import { TRANSLATE_TERMS } from "src/utils";
import { Settings } from "@mui/icons-material";
import { AdvanceField, FieldType } from "src/models";
import { RequiredField, } from "./Required";
import { SelectorFieldsEditor } from "./Reference"
import { DependsOption } from "src/components/AdvanceOption/Depends";
import { StyleField } from "src/components/AdvanceOption/StyleField";

export const AdvanceFieldOption: FC<{data: AdvanceField, fields: AdvanceField[]}> = observer(({ data, fields }) => {
    const [isDepends, setIsDepend] = useState<boolean>(false);

    useEffect(() => {
        setIsDepend(Object.keys(data.option.depends).length > 0);
    }, [data.option.depends]);

    const isDependsChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { checked } = event.target;
        setIsDepend(checked);
        if (!checked)
            data.option.set_depends({});
    }

    return <Accordion elevation={6}>
        <AccordionSummary
            expandIcon={<Settings />}
            aria-controls="advance-field-option"
            id="advance-field-option"
        >
            <Typography variant={"h6"} fontWeight={"bold"}>{TRANSLATE_TERMS.ADVANCE_FIELD_OPTION_TEXT}</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <Grid container direction={"column"} spacing={2} alignItems={"top"}>
                <RequiredField data={data} fields={fields} />
                {data.fieldType === FieldType.DROPDOWN &&
                    <Grid item xs={6}>
                        <SelectorFieldsEditor data={data} fields={fields} />
                    </Grid>
                }
                <Grid item xs={6}>
                    <Grid container direction={"column"} spacing={1}
                          sx={{ border: "1px solid #999", padding: 1 }}>
                        <FormControlLabel control={<Switch checked={isDepends} onChange={isDependsChange} />}
                                          label={TRANSLATE_TERMS.DEPENDS_SWITCH_TEXT} />
                        {isDepends &&
                            <DependsOption depends={data.option.depends} fields={fields} set_depends={(v) => {
                                data.option.set_depends(v);
                            }} currentField={data.fieldName} />
                        }
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <Grid container direction={"column"} spacing={1} sx={{ border: "1px solid #999", padding: 1 }}>
                        <StyleField data={data} />
                    </Grid>
                </Grid>
            </Grid>

        </AccordionDetails>
    </Accordion>

});