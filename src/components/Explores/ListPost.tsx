import React, { FC } from "react";
import { observer } from "mobx-react-lite";
import { Grid, Typography } from "@mui/material";
import { PostCard, PostCardSkeleton } from "src/components/Explores/PostCard";
import { Post } from "src/models";
import { theme, TRANSLATE_TERMS } from "src/utils";
import { Interests } from "@mui/icons-material";


export const ListPost: FC<{posts: Post[], isLoading?: boolean, length?: number}> = observer(({ posts, isLoading, length }) => {
    const skeleton = new Array(length || 12).fill(0);

    return <Grid container direction={"row"}>
        {!isLoading && posts.map((e, i) => <Grid item key={i} sm={6} md={4} lg={3} sx={{ width: "100%" }}>
            <PostCard post={e} index={i} />
        </Grid>)}
        {isLoading && skeleton.map((e, i) => {
            return <Grid item key={i} sm={6} md={4} lg={3} sx={{ width: "100%" }}>
                <PostCardSkeleton />
            </Grid>
        })}
        {(posts.length == 0 && !isLoading) &&
            <Grid container justifyContent={"center"} alignItems={"center"} direction="column" sx={{ height: "75vh" }}>
                <Interests style={{ fontSize: "64px", marginBottom: theme.spacing(1) }} />
                <Typography variant={"h3"}>{TRANSLATE_TERMS.NO_POSTS}</Typography>
            </Grid>}
    </Grid>
});