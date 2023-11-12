import { FC, MouseEvent, useCallback, useState } from "react";
import { observer } from "mobx-react-lite";
import { AdvanceField, AdvanceOption } from "src/models";
import { styled } from "@mui/system";
import { Button, buttonClasses, Card, CardHeader, FormControl, Grid, gridClasses, IconButton, InputLabel, OutlinedInput, paperClasses, Typography } from "@mui/material";
import { Add, HighlightOff } from "@mui/icons-material";
import { TRANSLATE_TERMS } from "src/utils";
import { FieldItemEditor } from "./FieldItemEditor";

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

export const OptionItemEditor: FC<{data: AdvanceOption, index: number, removeHandle: (event: MouseEvent<HTMLButtonElement>) => void}> = observer(({ data, index, removeHandle }) => {
    const [fields, setFields] = useState<AdvanceField[]>(data.fields);

    const handleAdd = useCallback(() => {
        fields.push(new AdvanceField());
        data.set_fields(fields);
        console.log(fields, data.fields)
    }, [data.fields]);

    return <Root>
        <Card elevation={6}>
            <CardHeader
                action={<IconButton aria-label="remove" onClick={removeHandle}><HighlightOff
                    color={"error"} /></IconButton>}
                title={<Typography variant={"subtitle1"}
                                   fontWeight={"bold"}>{TRANSLATE_TERMS.ADD_OPTION_TEXT} {data.title ? `"${data.title}"` : index + 1}</Typography>} />
            <Grid container direction={"row"} spacing={2} alignItems={"top"}>
                <Grid item md={6} xs={10}>
                    <FormControl fullWidth disabled={false}>
                        <InputLabel htmlFor="category_name">
                            {TRANSLATE_TERMS.TITLE_OPTION_TEXT}
                        </InputLabel>
                        <OutlinedInput
                            id="category_name"
                            value={data.title}
                            onChange={(event,) => {
                                data.title = event.target.value;
                            }}
                            label={TRANSLATE_TERMS.TITLE_OPTION_TEXT}
                            name="first_name"
                            required
                        />
                    </FormControl>
                </Grid>
            </Grid>
            {data.fields.length > 0 && data.fields.map((e, i) => {
                const removeFieldAdvance = () => {
                    fields.splice(i, 1);
                    data.set_fields(fields);
                };
                return <FieldItemEditor key={i} data={e} index={i} fields={data.fields}
                                        removeHandle={removeFieldAdvance} />
            })}
            <Button color={"primary"} variant={"outlined"} onClick={handleAdd}>
                <Add />
                <Typography>
                    {TRANSLATE_TERMS.ADD_FIELD_BUTTON_TEXT}
                </Typography>
            </Button>
        </Card>
    </Root>
});