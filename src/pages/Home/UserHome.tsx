import { FC, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Box, Grid } from "@mui/material";
import { Explores } from "src/components/Explores";
import { useStore } from "src/stores";
import { useSnackbar } from "notistack";
import { MESSAGE_TERMS } from "src/utils";
import { PostForYou } from "src/components/Explores/PostForYou";

export const UserHome: FC<{}> = observer(({}) => {
    const { sHome } = useStore();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        sHome.getList().catch((e) => {
            enqueueSnackbar(MESSAGE_TERMS.get(e), { variant: "error" });
        })
    })
    return <Box>
        <Grid container direction={"column"} spacing={2}>
            <Grid item xs={12}>
                <Explores />
            </Grid>
            <Grid item xs={12}>
                <PostForYou />
            </Grid>
        </Grid>
    </Box>
});