import { FC, MouseEvent } from "react";
import { AdvanceField, FieldType } from "src/models";
import { observer } from "mobx-react-lite";
import { buttonClasses, Card, CardHeader, FormControl, Grid, gridClasses, IconButton, InputLabel, MenuItem, OutlinedInput, paperClasses, Select, SelectChangeEvent, Tooltip, Typography } from "@mui/material";
import { HelpOutline, HighlightOff } from "@mui/icons-material";
import { TRANSLATE_TERMS } from "src/utils";
import { SelectOptionFieldEditor, SelectorFieldsEditor, TextOptionFieldEditor } from "./FieldTypeEditor";
import { styled } from "@mui/system";

const Root = styled(Grid)(({ theme }) => ({
        "&": { margin: "1rem" },
        [`& .${gridClasses.container}, .${paperClasses.root}`]: {
            marginTop: theme.spacing(2)
        },
        [`& .${buttonClasses.root}`]: {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
        },
    }
));

export const FieldItemEditor: FC<{data: AdvanceField, index: number, removeHandle: (event: MouseEvent<HTMLButtonElement>) => void, fields: AdvanceField[]}> = observer(({ data, index, removeHandle, fields }) => {
    const handleChange = (event: SelectChangeEvent) => {
        data.set_fieldType(FieldType[event.target.value as string]);
    };

    return <Root>
        <Card elevation={2}>
            <CardHeader
                action={<IconButton aria-label="remove" onClick={removeHandle}><HighlightOff
                    color={"error"} /></IconButton>}
                title={<Typography variant={"subtitle1"}
                                   fontWeight={"bold"}>{TRANSLATE_TERMS.ADD_FIELD_TEXT} {data.labelName ? `"${data.labelName}"` : index + 1}</Typography>} />
            <Grid container direction={"row"} spacing={2} alignItems={"top"}>
                <Grid item md={6} xs={10}>
                    <FormControl fullWidth disabled={false}>
                        <InputLabel htmlFor="category_label_name">
                            {TRANSLATE_TERMS.LABEL_NAME_LABEL}
                        </InputLabel>
                        <OutlinedInput
                            id="category_label_name"
                            value={data.labelName}
                            onChange={(event) => {
                                data.set_labelName(event.target.value);
                            }}
                            label={TRANSLATE_TERMS.LABEL_NAME_LABEL}
                            name="first_name"
                            required
                        />
                    </FormControl>
                </Grid>
                <Tooltip title={TRANSLATE_TERMS.FIELD_NAME_DESCRIPTION} arrow>
                    <HelpOutline />
                </Tooltip>
            </Grid>
            <Grid container direction={"row"} spacing={2} alignItems={"top"}>
                <Grid item md={6} xs={10}>
                    <FormControl fullWidth disabled={false}>
                        <InputLabel htmlFor="category_name">
                            {TRANSLATE_TERMS.FIELD_NAME_LABEL}
                        </InputLabel>
                        <OutlinedInput
                            id="category_name"
                            value={data.fieldName}
                            onChange={(event) => {
                                data.set_fieldName(event.target.value);
                            }}
                            label={TRANSLATE_TERMS.FIELD_NAME_LABEL}
                            name="first_name"
                            required
                        />
                    </FormControl>
                </Grid>
                <Tooltip title={TRANSLATE_TERMS.FIELD_NAME_DESCRIPTION} arrow>
                    <HelpOutline />
                </Tooltip>
            </Grid>
            <Grid container direction={"row"} spacing={2} alignItems={"top"}>
                <Grid item xs={6}>
                    <FormControl fullWidth>
                        <InputLabel>{TRANSLATE_TERMS.FIELD_TYPE_LABEL}</InputLabel>
                        <Select
                            value={data.fieldType}
                            label={TRANSLATE_TERMS.FIELD_TYPE_LABEL}
                            onChange={handleChange}
                        >
                            {Object.keys(FieldType)
                                .map(e => <MenuItem key={e} value={e}>{TRANSLATE_TERMS[e] || e}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Grid>
                <Tooltip title={TRANSLATE_TERMS.FIELD_TYPE_DESCRIPTION}>
                    <HelpOutline />
                </Tooltip>
            </Grid>

            {data.fieldType == FieldType.SELECTOR && <Grid container direction={"row"} spacing={2} alignItems={"top"}>
                <Grid item xs={6}>
                    <SelectorFieldsEditor data={data} fields={fields} />
                </Grid>
            </Grid>}
            <Grid container direction={"row"} spacing={2} alignItems={"top"}>
                {(data.fieldType == FieldType.OPTION || data.fieldType == FieldType.SELECTOR) && <>
                    <Grid item xs={6}>
                        <SelectOptionFieldEditor data={data} />
                    </Grid>
                    <Tooltip title={TRANSLATE_TERMS.FIELD_NAME_DESCRIPTION}>
                        <HelpOutline />
                    </Tooltip>
                </>}
                {
                    data.fieldType == FieldType.TEXT && <>
                        <Grid item xs={6}>
                            <TextOptionFieldEditor data={data} />
                        </Grid>
                        <Tooltip title={TRANSLATE_TERMS.FIELD_NAME_DESCRIPTION} arrow>
                            <HelpOutline />
                        </Tooltip>
                    </>
                }
            </Grid>
        </Card>
    </Root>
})