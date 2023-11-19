import { FC, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Grid, Paper, Typography } from "@mui/material";
import { TRANSLATE_TERMS } from "src/utils";
import { AdvanceInfoValue, Post } from "src/models";

const AdvanceItemPost: FC<{values: AdvanceInfoValue, item: string, fields: object}> = observer(({ values, item, fields }) => {
    return <Grid item xs={6} sx={{ mb: 2 }}>
        <Typography variant={"body2"} component={"span"} fontWeight={700}>{fields[item].labelName}</Typography>
        <Typography variant={"body2"} component={"span"} fontWeight={700}>: </Typography>
        <Typography variant={"body2"}
                    component={"span"}>{values[item] || TRANSLATE_TERMS.UNKNOWN_VALUE_FIELD}</Typography>
    </Grid>
});

export const AdvanceInfoPost: FC<{post: Post}> = observer(({ post }) => {
    const [fields, setFields] = useState<object>({})

    useEffect(() => {
        const result = {};
        for (const option of post.category.advancedSchemaInfo) {
            for (const field of option.fields) {
                result[field.fieldName] = field;
            }
        }

        setFields(result);
    }, [post.category.advancedSchemaInfo])

    return <Paper elevation={4} sx={{ my: 1 }}>
        <Grid container spacing={2} justifyContent={"center"}>
            <Grid item xs={12}>
                <Typography variant={"h6"} fontWeight={700}>{TRANSLATE_TERMS.SPECIFICATION_TEXT}</Typography>
            </Grid>
            <Grid item xs={10} container justifyContent={"start"}>
                {Object.keys(fields).length && Object.keys(fields)
                    .map(e => <AdvanceItemPost key={e} values={post.advanceInfo} item={e} fields={fields} />)}
            </Grid>
        </Grid>
    </Paper>
});