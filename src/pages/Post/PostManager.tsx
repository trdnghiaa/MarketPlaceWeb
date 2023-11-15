import { FC, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { BasicLayout } from "src/layouts/common";
import { Button, Chip, Grid, Paper } from "@mui/material";
import { EPostStatus } from "src/models";
import { useStore } from "src/stores";
import { TRANSLATE_TERMS } from "src/utils";
import { ListPost } from "src/components/Explores/ListPost";

export const PostManager: FC<{}> = observer(({}) => {

    const { sPostManager } = useStore();

    const getPostStatusColor = (status: string) => {
        switch (status) {
            case "ALL":
                return "secondary"
            case EPostStatus.APPROVED:
                return "success";
            case EPostStatus.DENIED:
                return "error";
            default:
                return "default";
        }
    }

    useEffect(() => {
        sPostManager.init();
    }, [sPostManager.filterStatus, sPostManager.search]);

    function selectFilterStatus(e: string) {
        sPostManager.set_filterStatus(e);
    }

    const loadMoreHandle = () => {
        sPostManager.set_page(sPostManager.page + 1);
        sPostManager.loadMore();
    };

    return <BasicLayout>
        <Paper>
            <Grid container spacing={1} sx={{ mb: 1 }}>
                <Grid item key={""}>
                    <Chip label={TRANSLATE_TERMS["ALL"]} color={getPostStatusColor("ALL")}
                          onClick={() => {selectFilterStatus("")}}
                          variant={sPostManager.filterStatus == "" ? "filled" : "outlined"} />
                </Grid>
                {Object.keys(EPostStatus).map((e, i) => {

                    return <Grid item key={i}>
                        <Chip label={TRANSLATE_TERMS[e]} color={getPostStatusColor(e)}
                              onClick={() => {selectFilterStatus(e)}}
                              variant={sPostManager.filterStatus == e ? "filled" : "outlined"} />
                    </Grid>
                })}
            </Grid>
            <ListPost posts={sPostManager.posts} />
            <Grid container justifyContent={"center"}>
                {
                    sPostManager.isShowLoadMore() &&
                    <Grid item sx={{ mt: 2 }}><Button variant={"outlined"}
                                                      onClick={loadMoreHandle}>{TRANSLATE_TERMS.LOAD_MORE}</Button></Grid>
                }
            </Grid>
        </Paper>
    </BasicLayout>
});