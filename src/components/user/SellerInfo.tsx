import { FC } from "react";
import { observer } from "mobx-react-lite";
import { User } from "src/models";
import { Button, Grid, Paper, Typography } from "@mui/material";
import { formatSmartCurrent, TRANSLATE_TERMS } from "src/utils";
import { UserAvatar } from "src/components/Navbar/UserAvatar";

export const SellerInfo: FC<{user: User}> = observer(({ user }) => {
    return <Paper elevation={2}>
        <Grid container justifyContent={"space-between"} alignItems={"center"}>
            <Grid item>
                <UserAvatar user={user} />
            </Grid>
            <Grid item container xs={6} direction={"column"}>
                <Grid item>
                    <Typography variant="h6" fontWeight={"bold"}>{user.fullName}</Typography>
                </Grid>
                <Grid item>
                    <Typography variant="caption">{formatSmartCurrent(user.last_access)}</Typography>
                </Grid>
            </Grid>
            <Grid item>
                <Button variant={"outlined"} color={"warning"} size={"medium"}>{TRANSLATE_TERMS.CHAT_WITH_SELLER}
                </Button>
            </Grid>
        </Grid>
    </Paper>
});