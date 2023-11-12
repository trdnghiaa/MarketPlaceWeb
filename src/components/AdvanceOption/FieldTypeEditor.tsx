import { observer } from "mobx-react-lite";
import { FC, KeyboardEvent, useState } from "react";
import { AdvanceField, TextType } from "src/models";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { MESSAGE_TERMS, TRANSLATE_TERMS } from "src/utils";
import { useSnackbar } from "notistack";
import { AutoCompleteCustom } from "src/components/AutoCompleteCustom";

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
    const handleChange = (event: SelectChangeEvent) => {
        data.option.set_textType(TextType[event.target.value as string]);
    };
    return <>
        <FormControl fullWidth>
            <InputLabel htmlFor="text_type">
                {TRANSLATE_TERMS.TEXT_TYPE_LABEL}
            </InputLabel>
            <Select
                value={data.option.textType}
                label={TRANSLATE_TERMS.TEXT_TYPE_LABEL}
                onChange={handleChange}
            >
                {Object.keys(TextType)
                    .map(e => <MenuItem key={e} value={e}>{TRANSLATE_TERMS[e] || e}</MenuItem>)}
            </Select>

        </FormControl>
    </>;
});