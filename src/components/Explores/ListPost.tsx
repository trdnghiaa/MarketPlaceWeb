import React, { FC } from "react";
import { observer } from "mobx-react-lite";
import { Grid, Paper, Typography } from "@mui/material";
import { TRANSLATE_TERMS } from "src/utils";
import { useStore } from "src/stores";
import { PostCard } from "src/components/Explores/PostCard";


export const PostForYou: FC<{}> = observer(({}) => {
    const { sHome } = useStore();
    return <Paper elevation={6}>
        <Typography variant={"h5"} fontWeight={700} paragraph>{TRANSLATE_TERMS.POST_FOR_YOU}</Typography>
        <Grid container direction={"row"} spacing={1} justifyContent={"space-around"}>
            {sHome.posts.map((e, i) => <Grid item key={i} sm={6} md={4} lg={3} sx={{ width: "100%" }}>
                <PostCard post={e} />
            </Grid>)}
        </Grid>
    </Paper>
});