import { FC } from "react";
import { observer } from "mobx-react-lite";
import { BasicLayout } from "../../layouts/common";
import { UserInfo } from "../../components/user";
import { useStore } from "../../stores";
import { Button, Grid, Paper, Typography } from "@mui/material";
import { theme } from "../../utils";
import { Save } from "@mui/icons-material";

export const NewAccount: FC<{}> = observer(({}) => {
    const { sNewAccount } = useStore();
    return <BasicLayout>
        <Paper elevation={3} sx={{ padding: theme.spacing(3) }}>
            <Typography variant="h3"> Tạo người dùng</Typography>
            <UserInfo user={sNewAccount.user} setUser={sNewAccount.get_User()}/>

            <Grid container spacing={theme.spacing(2)} direction="row" justifyContent="flex-end" mt={theme.spacing(1)}>
                <Grid item>
                    <Button variant="outlined" color="error" onClick={() => {window.history.go(-1);}}>Hủy</Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="success" startIcon={<Save />}>Lưu</Button>
                </Grid>
            </Grid>
        </Paper>
    </BasicLayout>
})