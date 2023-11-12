import { FC, KeyboardEvent, useState } from "react";
import { observer } from "mobx-react-lite";
import { Grid } from "@mui/material";
import { AutoCompleteCustom } from "src/components/AutoCompleteCustom";

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
});