import { Grid, Paper, Typography } from "@mui/material";
import { TRANSLATE_TERMS } from "src/utils";
import { FC } from "react";
import { observer } from "mobx-react-lite";

export const DescriptionPost: FC<{description: string}> = observer(({ description }) => {
    return <Paper elevation={4}>
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Typography variant={"h6"} fontWeight={700}>{TRANSLATE_TERMS.DESCRIPTION_POST_TEXT}</Typography>
            </Grid>
            <Grid xs={12} sx={{ px: 2 }}>
                <Typography dangerouslySetInnerHTML={{ __html: description }} variant={"body1"} />
            </Grid>
        </Grid>
    </Paper>
});


