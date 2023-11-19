import { FC, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { BasicLayout } from "src/layouts/common";
import { useStore } from "src/stores";
import { Grid, Paper } from "@mui/material";
import { ListPost } from "src/components/Explores/ListPost";

export const SavedPost: FC<{}> = observer(({}) => {
    const { sSavedPost } = useStore();

    useEffect(() => {
        sSavedPost.init();
    }, [])

    return <BasicLayout>
        <Paper>
            <Grid container spacing={1} sx={{ mb: 1 }} direction={{
                xs: "column", md: "row"
            }}>
                {/*<Grid item xs={12} container spacing={1}>*/}
                {/*    <PostStatusSelector selectHandle={(v) => {sSavedPost.set_filterStatus(v)}}*/}
                {/*                        selectedValue={sSavedPost.filterStatus} />*/}
                {/*</Grid>*/}
            </Grid>
            <ListPost posts={sSavedPost.posts} isLoading={sSavedPost.isLoading} />
        </Paper>
    </BasicLayout>
})