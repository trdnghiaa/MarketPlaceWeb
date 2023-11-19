import React, { FC } from "react";
import { EPostStatus, Post } from "src/models";
import { observer } from "mobx-react-lite";
import { Button, Card, CardActions, cardActionsClasses, CardContent, CardMedia, Chip, Grid, Skeleton, Typography } from "@mui/material";
import { HOST } from "src/service/fetchAPI";
import { toCurrency } from "src/utils/currency";
import { UserAvatar } from "src/components/Navbar/UserAvatar";
import { styled } from "@mui/system";
import { formatSmartDay, TRANSLATE_TERMS } from "src/utils";

const PostButtonStyled = styled(Button)(({}) => ({
    "&:hover": {
        background: "none",
    },
    [`& .${cardActionsClasses.root}`]: {
        padding: 0
    }
}));

const CardStyled = styled(Card)(({ theme }) => ({
    "&": {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%", height: "25rem",
        // padding: 0,
        paddingBottom: theme.spacing(2)
    }
}))

export const PostCard: FC<{post: Post, index: number}> = observer(({ post, index }) => {
    return <PostButtonStyled href={`/posts/${post._id}`} sx={{ width: "100%" }}>
        <CardStyled elevation={4}>
            <CardMedia
                sx={{ height: 250, boxShadow: "inset 0 0 10px #434343", position: "relative" }}
                image={HOST + post.images[0]?.realPath || ""}
                title={post.title}
            />
            <CardContent sx={{ px: 0, py: 1 }}>
                <Typography gutterBottom variant="subtitle2"
                            fontWeight={"bold"}>{post.title}</Typography>
                <Typography variant="body1" color="error"
                            fontWeight={"bold"}>{toCurrency(post.price, true)}</Typography>
            </CardContent>
            <CardActions>
                <Grid container alignItems={"center"} spacing={2}>
                    <Grid item xs={2}>
                        <UserAvatar user={post.createdBy} sx={{ width: 32, height: 32 }} />
                    </Grid>
                    <Grid item xs={6} container direction={"column"}>
                        <Typography variant="caption" fontWeight={"bold"}>{post.createdBy.fullName}</Typography>
                        {post.status == EPostStatus.APPROVED &&
                            <Typography variant="caption">{formatSmartDay(post.approvedDate)}</Typography>}
                        {post.status != EPostStatus.APPROVED && <Chip label={TRANSLATE_TERMS[post.status]}
                                                                      color={post.status == EPostStatus.DENIED ? "error" : "secondary"}
                                                                      size={"small"} />}
                    </Grid>
                    <Grid item xs={5}>
                        <Typography variant="body2">{post.city}</Typography>
                    </Grid>
                </Grid>
            </CardActions>
        </CardStyled>
    </PostButtonStyled>;

})

export const PostCardSkeleton: FC = observer(({}) => {
    return <PostButtonStyled sx={{ width: "100%" }} disabled>
        <Card sx={{ width: "100%", height: "25rem" }} elevation={4}>
            <Skeleton variant="rectangular" width={"100%"} height={200} animation="wave" />
            <CardContent sx={{ px: 0, py: 1 }}>
                <Skeleton animation="wave" />
                <Skeleton width="60%" animation="wave" />
            </CardContent>
            <CardActions>
                <Grid container alignItems={"center"} spacing={2}>
                    <Grid item xs={2}>
                        <Skeleton variant="circular" width={32} height={32} animation="wave" />
                    </Grid>
                    <Grid item xs={6} container direction={"column"}>
                        <Skeleton width={"80%"} animation="wave" />
                        <Skeleton width={"40%"} animation="wave" />
                    </Grid>
                    <Grid item xs={4}>
                        <Skeleton animation="wave" />
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    </PostButtonStyled>
});