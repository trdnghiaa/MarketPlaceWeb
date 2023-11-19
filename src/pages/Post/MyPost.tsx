import { FC, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { BasicLayout } from "src/layouts/common";
import { Grid, Paper, Typography } from "@mui/material";
import { ListPost } from "src/components/Explores/ListPost";
import { useStore } from "src/stores";
import { PostStatusSelector } from "src/components/Post/PostStatusSelector";
import { TRANSLATE_TERMS } from "src/utils";

export const MyPost: FC<{}> = observer(({}) => {
    const { sMyPost } = useStore();

    useEffect(() => {
        sMyPost.init();
    }, [sMyPost.filterStatus]);

    return <BasicLayout>
        <Paper>
            <Grid container spacing={1} sx={{ mb: 1 }} direction={{
                xs: "column", md: "row"
            }}>
                <Grid item xs={12}>
                    <Typography variant={"h5"} fontWeight={700}>{TRANSLATE_TERMS.POST_MANAGER_TEXT}</Typography>
                </Grid>
                <Grid item xs={12} container spacing={1}>
                    <PostStatusSelector selectHandle={(v) => {sMyPost.set_filterStatus(v)}}
                                        selectedValue={sMyPost.filterStatus} />
                </Grid>
            </Grid>
            <ListPost posts={sMyPost.posts} isLoading={sMyPost.isLoading} />
        </Paper>
    </BasicLayout>
})