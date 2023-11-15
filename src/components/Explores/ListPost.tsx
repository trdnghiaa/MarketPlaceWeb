import React, { FC } from "react";
import { observer } from "mobx-react-lite";
import { Grid } from "@mui/material";
import { PostCard } from "src/components/Explores/PostCard";
import { Post } from "src/models";


export const ListPost: FC<{posts: Post[]}> = observer(({ posts }) => {
    return <Grid container direction={"row"} spacing={1}>
        {posts.map((e, i) => <Grid item key={i} sm={6} md={4} lg={3} sx={{ width: "100%" }}>
            <PostCard post={e} />
        </Grid>)}
    </Grid>
});