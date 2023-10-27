import { observer } from "mobx-react-lite";
import { ChangeEvent, FC, KeyboardEvent, useEffect, useState } from "react";
import { AdvanceField, FieldType } from "../../models";
import { Autocomplete, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, Switch, TextField } from "@mui/material";
import { MESSAGE_TERMS, TRANSLATE_TERMS } from "../../utils";
import { reaction } from "mobx";
import { useSnackbar } from "notistack";

const NonUsingPopper: FC = () => {
    return <></>
}

export const SelectOptionFieldEditor: FC<{data: AdvanceField}> = observer(({ data }) => {
    const [Enum, setEnum] = useState<string[]>(data.option.Enum);
    const [content, setContent] = useState<string>("");
    const { enqueueSnackbar } = useSnackbar();

    const onEnter = (event: KeyboardEvent<HTMLDivElement>) => {
        if (13 == event.keyCode) {
            const value = event.target['value'].trim();
            const setterValue = Array.from(new Set([...data.option.Enum, value].map((e) => e.trim())));

            if (data.option.Enum.length + 1 != setterValue.length) {
                enqueueSnackbar(MESSAGE_TERMS.DUPLICATE_OPTION_REMOVED, { variant: "warning" });
            }

            setEnum(setterValue)
            data.option.set_enum(setterValue);
            event.target['blur']();
            event.target['focus']();
        }
    }

    const changeEvent = (event: any, values: string[] | null) => {
        setEnum(values || []);
        data.option.set_enum(values || []);
    };

    const ChangeInputEvent = (event: any, value: string) => {
        setContent(value);
    }

    return <AutoCompleteCustom onEnter={onEnter} changeHandle={changeEvent} changeInputHandle={ChangeInputEvent}
                               list={data.option.Enum} content={content} />
});

export const TextOptionFieldEditor: FC<{data: AdvanceField}> = observer(({ data }) => {
    return <>
        <FormControl fullWidth>
            <InputLabel htmlFor="text_placeholder">
                {TRANSLATE_TERMS.TEXT_PLACEHOLDER_LABEL}
            </InputLabel>
            <OutlinedInput id={"text_placeholder"} defaultValue={data.option.placeholder} onChange={(event) => {
                data.option.set_placeholder(event.target.value as string);
            }} label={TRANSLATE_TERMS.TEXT_PLACEHOLDER_LABEL} />
        </FormControl>
    </>;
});

export const SelectorFieldsEditor: FC<{data: AdvanceField, fields: AdvanceField[]}> = observer(({ data, fields }) => {
    // const [field, setField] = useState<AdvanceField>(new AdvanceField());
    const isReferenceHandle = (event: ChangeEvent<HTMLInputElement>) => {
        const { checked } = event.target;
        data.option.set_isReference(checked);
        if (!checked) {
            data.option.set_referenceName("");
            data.option.set_reference({});
        }
    }

    useEffect(() => {
        const field: AdvanceField = fields.find((e) => e.fieldName == data.option.referenceName) || new AdvanceField();

        const disposer = reaction(() => [data.option.referenceName, fields.find((e) => e.fieldName == data.option.referenceName), field.option.Enum], (values) => {
            console.log("run", values);

            const name: string = values[0] as string;
            const field: AdvanceField = new AdvanceField(values[1]);
            const Enum = field.option.Enum;


            const reference = {
                [name]: Enum.reduce((r: object, e: string) => ({ ...r, [e]: data.option.reference[name] ? data.option.reference[name][e] || [] : [] }), {}),
            };
            data.option.set_reference(reference);
        }, {});
        return () => {
            console.log("cancel");
            // disposer();
        }
    }, []);

    // useEffect(() => {
    //     const referenceName = data.option.referenceName;
    //     setField(new AdvanceField(fields.find((e) => e.fieldName == referenceName)));
    //     console.log(field);
    // }, [data.option.referenceName]);

    const selectReferenceChange = (event: SelectChangeEvent<string>) => {
        const { value } = event.target;
        data.option.set_referenceName(value);
    }

    return <>
        <FormControlLabel control={<Switch checked={data.option.isReference} onChange={isReferenceHandle} />}
                          label={TRANSLATE_TERMS.REFERENCE_SWITCH_TEXT} sx={{ mb: 2 }} />

        {data.option.isReference && <>
            <FormControl fullWidth>
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
                <Grid container direction={"column"} spacing={1}
                      sx={{ border: "1px solid #999", padding: 1 }}>
                    {Object.keys(data.option.reference[data.option.referenceName] || [])
                        .map((e) => <ReferenceItem reference={data.option.reference[data.option.referenceName]}
                                                   name={e} key={e} />)
                    }</Grid>}

        </>}
    </>
});

export const ReferenceItem: FC<{reference: {[name: string]: string[]}, name: string}> = observer(({ reference, name }) => {
    const [Enum, setEnum] = useState<string[]>([]);
    const [content, setContent] = useState<string>("");

    const onEnter = (event: KeyboardEvent<HTMLDivElement>) => {
        if (13 == event.keyCode) {

            Enum.push(event.target['value'].trim());
            reference[name] = Enum;
            event.target['blur']();
            event.target['focus']();
        }
    }

    const changeEvent = (event: any, values: string[] | null) => {
        setEnum(values || []);
        reference[name] = values || [];
    };

    const ChangeInputEvent = (event: any, value: string) => {
        setContent(value);
    }

    return <Grid item>
        <AutoCompleteCustom onEnter={onEnter} changeHandle={changeEvent} changeInputHandle={ChangeInputEvent}
                            list={reference[name]} content={content} label={name} />
    </Grid>
})

export const AutoCompleteCustom: FC<{onEnter: (event: KeyboardEvent<HTMLDivElement>) => void, changeHandle: (event: any, values: string[] | null, reason: string) => void, changeInputHandle: (event: any, value: string) => void, list: string[], content: string, label?: string}> = observer(({ onEnter, changeHandle, changeInputHandle, list, content, label }) => {
    return <FormControl fullWidth>
        <Autocomplete
            multiple
            limitTags={4}
            value={list}
            onKeyDown={onEnter}
            onChange={changeHandle}
            inputValue={content}
            onInputChange={changeInputHandle}
            renderInput={(params) => {
                return <TextField {...params} label={label ? label : TRANSLATE_TERMS.ADD_SELECT_OPTION_FIELD_LABEL} />
            }}
            PopperComponent={NonUsingPopper}
            blurOnSelect={true}
            options={[]} />
    </FormControl>;
})