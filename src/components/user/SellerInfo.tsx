import { FC } from "react";
import { observer } from "mobx-react-lite";
import { User } from "src/models";
import { Button, CircularProgress, Grid, Paper, Typography } from "@mui/material";
import { formatSmartCurrent, MESSAGE_TERMS, TRANSLATE_TERMS } from "src/utils";
import { UserAvatar } from "src/components/Navbar/UserAvatar";
import { useStore } from "src/stores";
import { useSnackbar } from "notistack";
import { Call } from "@mui/icons-material";


export const SellerInfo: FC<{user: User}> = observer(({ user }) => {
    const { sPost } = useStore();
    const { enqueueSnackbar } = useSnackbar();
    const phoneHandle = () => {
        if (sPost.phone) {
            window.location.href = "tel:" + sPost.phone;
        } else {
            sPost.showPhone().catch((err) => {
                console.log()
                enqueueSnackbar(MESSAGE_TERMS.get(err.message == "AUTHENTICATION_NOT_AVAILABLE" ? "SHOW_PHONE_REQUIRE_LOGGED" : err), { variant: "error" });
            });
        }
    }
    return <Paper elevation={2}>
        <Grid container justifyContent={"space-between"} alignItems={"center"}>
            <Grid item>
                <UserAvatar user={user} />
            </Grid>
            <Grid item container xs={9} direction={"column"}>
                <Grid item>
                    <Typography variant="h6" fontWeight={"bold"}>{user.fullName}</Typography>
                </Grid>
                <Grid item>
                    <Typography variant="caption">{formatSmartCurrent(user.last_access)}</Typography>
                </Grid>
            </Grid>
            <Grid item xs={12} container justifyContent={"center"} sx={{ mt: 2 }}>
                <Button variant={"outlined"} color={"warning"} size={"medium"} disabled={sPost.isLoadingPhone}
                        onClick={phoneHandle} startIcon={<Call />}>
                    {sPost.isLoadingPhone ?
                        <CircularProgress
                            size="1rem" /> : (sPost.phone ? TRANSLATE_TERMS.get("CALL_NOW", { phone: sPost.phone }) : TRANSLATE_TERMS.DISPLAY_PHONE_BUTTON)}
                </Button>
            </Grid>
        </Grid>
    </Paper>
});