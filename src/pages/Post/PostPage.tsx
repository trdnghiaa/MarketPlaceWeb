import { FC, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { BasicLayout } from "src/layouts/common";
import { styled } from "@mui/system";
import { Alert, AlertTitle, Box, Grid, Paper } from "@mui/material";
import { useStore } from "src/stores";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { MESSAGE_TERMS, theme, TRANSLATE_TERMS } from "src/utils";
import { NotFoundPost } from "src/components/Post/NotFoundPost";
import ImageGallery from "react-image-gallery";

import "/node_modules/react-image-gallery/styles/scss/image-gallery.scss";
import { SellerInfo } from "src/components/user/SellerInfo";
import { PostInfo } from "src/components/Post/PostInfo";
import { DescriptionPost } from "src/components/Post/DescriptionPost";
import { AdvanceInfoPost } from "src/components/Post/AdvanceInfoPost";
import { Loader } from "src/components/Loading";
import { EPostStatus, UserRole } from "src/models";
import { VerifierBox } from "src/components/Post/VerifierBox";
import { Similar } from "src/components/Similar";

const Root = styled(Box)(() => ({
    ".image-gallery-svg": {
        width: "1rem"
    },
    ".image-gallery": {
        minHeight: "20vh"
    }
}));

export const PostPage: FC<{}> = observer(({}) => {
    const { sPost, isDone, currentUser } = useStore();
    const { id } = useParams();
    const { enqueueSnackbar } = useSnackbar();
    useNavigate();

    useEffect(() => {
        if (id && isDone) {
            sPost.init(id).catch((err) => {
                sPost.set_isNotFound(true);
                enqueueSnackbar(MESSAGE_TERMS.get(err), { variant: "error" });
            });
        }

    }, [isDone, id]);
    return <BasicLayout>
        <Loader isLoading={sPost.isLoading || !isDone}>
            <Root
                sx={{ marginBottom: theme.spacing(currentUser?.role != UserRole.USER && sPost.post.status == EPostStatus.PENDING ? 64 : 4) }}>
                {sPost.isNotFound && <NotFoundPost />}
                {
                    !sPost.isNotFound && <Grid container spacing={1}>
                        <Grid item xs={12} md={8}>
                            <Paper elevation={4}>
                                <ImageGallery items={sPost.images} showIndex={true} showBullets={true} showThumbnails={true}
                                              showPlayButton={false} />
                            </Paper>
                            {sPost.post.status == EPostStatus.DENIED &&
                                <Alert severity="error" sx={{ my: 1 }} variant="filled" elevation={4}>
                                    <AlertTitle>{TRANSLATE_TERMS.DENIED}</AlertTitle>
                                    * {sPost.post.reason}
                                </Alert>}
                            <PostInfo post={sPost.post} />
                            <DescriptionPost description={sPost.post.description} />
                            <AdvanceInfoPost post={sPost.post} />
                        </Grid>
                        <Grid item xs={12} md={4} container spacing={1} direction={"column"}>
                            <Grid item>
                                <SellerInfo user={sPost.post.createdBy} />
                            </Grid>
                            {sPost.post.status == EPostStatus.APPROVED && <Grid item>
                                <Similar posts={sPost.similar} />
                            </Grid>}
                        </Grid>
                        {sPost.post.status == EPostStatus.PENDING && currentUser?.role && currentUser?.role != UserRole.USER &&
                            <VerifierBox post={sPost.post} />}
                    </Grid>
                }
            </Root>
        </Loader>
    </BasicLayout>
});