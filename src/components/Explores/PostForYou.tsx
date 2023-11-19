import React, { FC } from "react";
import { observer } from "mobx-react-lite";
import { Button, Grid, Paper, Typography } from "@mui/material";
import { theme, TRANSLATE_TERMS } from "src/utils";
import { useStore } from "src/stores";
import { ListPost } from "src/components/Explores/ListPost";


export const PostForYou: FC<{}> = observer(({}) => {
    const { sHome } = useStore();
    return <Paper elevation={6}>
        <Typography variant={"h5"} fontWeight={700} paragraph>{TRANSLATE_TERMS.POST_FOR_YOU}</Typography>
        <ListPost posts={sHome.posts} isLoading={sHome.isLoading || sHome.posts.length == 0} />
        <Grid container justifyContent={"center"} sx={{ mt: theme.spacing(2) }}>
            <Button variant={"outlined"} size={"large"}>{TRANSLATE_TERMS.LOAD_MORE}</Button>
        </Grid>
    </Paper>
});