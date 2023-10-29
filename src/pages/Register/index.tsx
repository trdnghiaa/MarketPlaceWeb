import { FC, useEffect, useState } from "react";
import { BasicLayout } from "src/layouts/common";
import { UserInfo } from "src/components/user";
import { CreateAccount } from "src/components/CreateAccount";
import { Button, Grid, Paper, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useStore } from "src/stores";
import { useNavigate } from "react-router-dom";
import { MESSAGE_TERMS } from "src/utils";
import { observer } from "mobx-react-lite";
import { UserRole } from "src/models/types";
import { Oops } from "src/components/Error/Oops";
import { styled } from "@mui/system";

const PREFIX = "REGISTER-";

const classes = {
    root: `${PREFIX}root`
}

const Root = styled("div")({
    root: {
        width: "80%",
        minHeight: "500px",
        margin: "2rem auto",
        padding: "0 3rem"
    }
})

export const Register: FC = observer(() => {
    const [submitting, setSubmitting] = useState(false);
    const { sSignUp, currentUser, role } = useStore();
    const { enqueueSnackbar } = useSnackbar();
    const navigator = useNavigate();

    useEffect(() => {
        if (currentUser) {
            // sSignUp.user = currentUser;
            // Logout();
        }
    }, [currentUser])

    const handleSignUp = () => {
        sSignUp.doSignUp().then(([err, data]) => {
            setSubmitting(false);
            if (err)
                return enqueueSnackbar(MESSAGE_TERMS.get(err.message), { variant: "error" });
            navigator("/login");
        }).catch((e) => {
            enqueueSnackbar(MESSAGE_TERMS.get(e.message), { variant: "error" });
        })
    }

    return (
        <BasicLayout>
            <Root>
                <Paper
                    sx={{ position: "relative" }}
                    elevation={12}
                    className={classes.root}
                >

                    {role == UserRole.USER ? <>
                            {/* <Grid container justifyContent={"center"} pt={2}>
                             <img src={LOGO_TRAVELOKA} alt="Logo" />
                             </Grid> */}

                            <Typography variant={"h4"} align={"center"}>
                                Đăng kí tài khoản người dùng
                            </Typography>

                            <UserInfo setUser={sSignUp.get_User()} isView={false} user={sSignUp.user} />

                            <CreateAccount />
                            <Grid container justifyContent={"center"} pt={2}>
                                <Button
                                    variant="contained"
                                    disabled={submitting}
                                    style={{ margin: "1rem" }}
                                    onClick={handleSignUp}
                                >
                                    Đăng ký tài khoản
                                </Button>
                            </Grid>
                        </> :
                        <Grid container direction={"row"} justifyContent={"center"} alignItems={"center"}>
                            <Oops>
                                <Typography>Không thể tiếp tục nâng hạng mức tài khoản.</Typography>
                            </Oops>
                        </Grid>
                    }
                </Paper>
            </Root>
        </BasicLayout>
    );
});
