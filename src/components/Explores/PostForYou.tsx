import React, { FC } from "react";
import { observer } from "mobx-react-lite";
import { Paper, Typography } from "@mui/material";
import { TRANSLATE_TERMS } from "src/utils";
import { useStore } from "src/stores";
import { ListPost } from "src/components/Explores/ListPost";


export const PostForYou: FC<{}> = observer(({}) => {
    const { sHome } = useStore();
    return <Paper elevation={6}>
        <Typography variant={"h5"} fontWeight={700} paragraph>{TRANSLATE_TERMS.POST_FOR_YOU}</Typography>
        <ListPost posts={sHome.posts} />
    </Paper>
});