import React, { FC } from "react";
import { EPostStatus, Post } from "src/models";
import { observer } from "mobx-react-lite";
import { Button, Card, CardActions, cardActionsClasses, CardContent, CardMedia, Chip, Grid, Typography } from "@mui/material";
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

export const PostCard: FC<{post: Post}> = observer(({ post }) => {
    return <PostButtonStyled href={`/posts/${post._id}`} sx={{ width: "100%" }}>
        <Card sx={{ width: "100%", height: "25rem" }}>
            <CardMedia
                sx={{ height: 250 }}
                image={HOST + post.images[0].realPath}
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
                        <UserAvatar user={post.createdBy} sx={{ width: 28, height: 28 }} />
                    </Grid>
                    <Grid item xs={6} container direction={"column"}>
                        <Typography variant="caption" fontWeight={"bold"}>{post.createdBy.fullName}</Typography>
                        {post.status == EPostStatus.APPROVED &&
                            <Typography variant="caption">{formatSmartDay(post.approvedDate)}</Typography>}
                        {post.status == EPostStatus.DENIED && <Chip label={TRANSLATE_TERMS.DENY} />}
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="caption">{post.city}</Typography>
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    </PostButtonStyled>;

})