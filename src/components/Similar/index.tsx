import { FC } from "react";
import { observer } from "mobx-react-lite";
import { Grid, Paper, Typography } from "@mui/material";
import { Post } from "src/models";
import { PostSimilarItem } from "src/components/Similar/PostSimilarItem";
import { TRANSLATE_TERMS } from "src/utils";

export const Similar: FC<{posts: Post[]}> = observer(({ posts }) => {
    return <Paper elevation={6}>
        <Typography variant={"h5"} fontWeight={700} sx={{ mb: 2 }}>{TRANSLATE_TERMS.SIMILAR_TEXT}</Typography>
        <Grid container spacing={1} direction={"column"}>
            {posts.map((e) => {
                return <PostSimilarItem post={e} key={e._id} />
            })}
        </Grid>
    </Paper>
});