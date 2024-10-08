import { FC } from "react";
import { observer } from "mobx-react-lite";
import { EPostStatus, Post } from "src/models";
import { Grid, IconButton, Paper, Typography } from "@mui/material";
import { toCurrency } from "src/utils/currency";
import { AccessTime, LocationOn, Share, VerifiedUser } from "@mui/icons-material";
import { formatSmartDay, setCurrentURL, TRANSLATE_TERMS } from "src/utils";
import { Tooltip } from "@mui/material/";
import { useSnackbar } from "notistack";
import { useStore } from "src/stores";
import { useNavigate } from "react-router-dom";
import { FavoritePostButton } from "src/components/Post/FavoritePostButton";

export const PostInfo: FC<{post: Post}> = observer(({ post }) => {
    const { enqueueSnackbar } = useSnackbar()
    const { currentUser } = useStore();
    const navigate = useNavigate();

    const favoriteToggle = () => {
        if (currentUser?._id) {
            post.favoritePost();
        } else {
            setCurrentURL(window.location.pathname);
            navigate("/login")
        }
    }

    const handleCopyToClipboard = async () => {
        try {

            await navigator.clipboard.writeText(window.location.href);
            enqueueSnackbar(TRANSLATE_TERMS.COPY_SUCCESS, { variant: "success" })
        } catch (error) {
            console.error('Failed to copy to clipboard:', error);
        }
    };

    return <Paper elevation={4} sx={{ my: 1 }}>
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Typography variant={"h5"} fontWeight={700}>{post.title}</Typography>
            </Grid>
            <Grid item xs={12} container justifyContent={"space-between"} alignItems={"center"}>
                <Grid item>
                    <Typography variant={"h6"} color={"error"}
                                fontWeight={"bold"}>{toCurrency(post.price, true)} </Typography>
                </Grid>
                <Grid item>
                    <IconButton onClick={handleCopyToClipboard} color={"warning"} component={Tooltip}
                                title={TRANSLATE_TERMS.SHARE_POST}>
                        <Share />
                    </IconButton>
                    <FavoritePostButton onClick={favoriteToggle} post={post} />
                </Grid>
            </Grid>
            <Grid item xs={12} container alignItems={"center"} sx={{ color: "#777" }}>
                <LocationOn color={"error"} />
                <Typography variant={"subtitle2"} fontWeight={400} sx={{ ml: 1 }}>{post.address} </Typography>
            </Grid>
            <Grid item xs={12} container alignItems={"center"} sx={{ color: "#777" }}>
                <AccessTime color={"warning"} />
                <Typography variant={"subtitle2"} fontWeight={400}
                            sx={{ ml: 1 }}>{formatSmartDay(post.status == EPostStatus.APPROVED ? post.approvedDate : post.created_at)} </Typography>
            </Grid>
            {post.status == EPostStatus.APPROVED &&
                <Grid item xs={12} container alignItems={"center"} sx={{ color: "#777" }}>
                    <VerifiedUser color={"success"} />
                    <Typography variant={"subtitle2"} fontWeight={400}
                                sx={{ ml: 1 }}>{TRANSLATE_TERMS.VERIFIED_TEXT} </Typography>
                </Grid>}
        </Grid>

    </Paper>
});