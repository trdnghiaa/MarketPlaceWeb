import { FC, KeyboardEvent } from "react";
import { observer } from "mobx-react-lite";
import { Autocomplete, FormControl, TextField } from "@mui/material";
import { TRANSLATE_TERMS } from "src/utils";

const NonUsingPopper: FC = () => {
    return <></>
}

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