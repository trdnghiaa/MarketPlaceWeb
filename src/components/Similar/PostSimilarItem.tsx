import { FC } from "react";
import { observer } from "mobx-react-lite";
import { Box, Grid, Paper, Typography, typographyClasses } from "@mui/material";
import { Post } from "src/models";
import { HOST } from "src/service/fetchAPI";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";

const Image = styled(Box)(() => ({
    "&": {
        height: 180,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        position: "relative"
    }
}));

const ThumbnailContent = styled(Box)(({ theme }) => ({
    "&": {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0c0c0c61",
        padding: theme.spacing(2),
        textAlign: "center",
        textTransform: "capitalize",
        transition: "background 250ms ease-in-out"
    },
    "&:hover": {
        background: "#0c0c0c00"
    },
    [`& .${typographyClasses.h6}`]: {
        fontWeight: 700,
        color: "#eee",
        textShadow: "2px 2px #666",
    }
}))

export const PostSimilarItem: FC<{post: Post}> = observer(({ post }) => {
    return <Grid item>
        <Paper elevation={2} sx={{ padding: 0, position: "relative" }} to={`/posts/${post._id}`} component={Link}>
            <Image sx={{ backgroundImage: `url(${HOST + post.images[0].realPath})`, }} />
            <ThumbnailContent>
                <Typography variant={"h6"}>{post.title}</Typography>
            </ThumbnailContent>
        </Paper>
    </Grid>
});