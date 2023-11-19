import { FC, KeyboardEvent, useState } from "react";
import { observer } from "mobx-react-lite";
import { Grid } from "@mui/material";
import { AutoCompleteCustom } from "src/components/AutoCompleteCustom";
import { Reference } from "src/models";

export const ReferenceItem: FC<{reference: Reference}> = observer(({ reference }) => {
    const [Enum, setEnum] = useState<string[]>(reference.option);
    const [content, setContent] = useState<string>("");

    const onEnter = (event: KeyboardEvent<HTMLDivElement>) => {
        if (13 == event.keyCode) {

            Enum.push(event.target['value'].trim());
            reference.option = Enum;
            event.target['blur']();
            event.target['focus']();
        }
    }

    const changeEvent = (event: any, values: string[] | null) => {
        setEnum(values || []);
        reference.option = values || [];
    };

    const ChangeInputEvent = (event: any, value: string) => {
        setContent(value);
    }

    return <Grid item>
        <AutoCompleteCustom onEnter={onEnter} changeHandle={changeEvent} changeInputHandle={ChangeInputEvent}
                            list={reference.option} content={content} label={reference.name} />
    </Grid>
});