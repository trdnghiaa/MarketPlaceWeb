import { Avatar, Box, Button, Grid, TextField, Typography, } from "@mui/material";
import { FC, useState } from "react";

import { APP_NAME, MESSAGE_TERMS, PRIMARY_COLOR, srcIcon, theme, TRANSLATE_TERMS } from "src/utils";
import { useStore } from "src/stores";
import { useSnackbar } from "notistack";
import { observer } from "mobx-react";
import { Link, useSearchParams } from "react-router-dom";
import styled from "@emotion/styled";

const prefix = "Login";

const classes = {
    root: prefix + "Root",
    loginForm: prefix + "form",
    marginTop: prefix + "MT",
    avatar: prefix + "AV",
};

const Root = styled.div({
    [`& .${classes.root}`]: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: PRIMARY_COLOR,
        // backgroundImage: "url(/images/background.jpg)",
        // backgroundRepeat: "no-repeat",
        // backgroundSize: "cover"
    },
    [`& .${classes.loginForm}`]: {
        backgroundColor: "#fff",
        padding: "3rem 5rem 1rem 5rem !important",
    },
    [`& .${classes.marginTop}`]: { marginTop: "1rem !important" },
    [`& .${classes.avatar}`]: {
        marginRight: "auto",
        marginLeft: "auto",
        marginBottom: "1rem",
    },
});

const Copyright: FC = () => {
    return (
        <Typography variant="body2" align="center">
            Copyright © {APP_NAME} {new Date().getFullYear()}.
        </Typography>
    );
};

const NotHaveAccount: FC = () => {
    return (
        <>
            <Typography>
                Bạn chưa có tài khoản?{" "}
                <Link
                    to={"/signup"}
                    style={{
                        color: PRIMARY_COLOR,
                        marginTop: theme.spacing(2),
                    }}
                >
                    Đăng kí
                </Link>
            </Typography>
        </>
    );
};

export const Login: FC<{}> = observer(() => {
    const { sSignIn } = useStore();
    const { enqueueSnackbar } = useSnackbar();
    const [submitting, setSubmitting] = useState(false);
    const redirect: string = useSearchParams()[0].get("redirect") || "";

    const handleLogin = () => {
        if (!sSignIn.username || !sSignIn.password) {
            enqueueSnackbar(MESSAGE_TERMS.LOGIN_INVALID, {
                variant: "error",
            });
            return;
        }

        setSubmitting(true);
        sSignIn
            .doLogin(redirect)
            .then((err) => {
                if (err)
                    return enqueueSnackbar(MESSAGE_TERMS.get(err), {
                        variant: "error",
                    });
            })
            .catch(function (error) {
                enqueueSnackbar(error.message, { variant: "error" });
            })
            .finally(() => setSubmitting(false));
    };
    return (
        // @ts-ignore
        <Root>
            <div className={classes.root}>
                <Grid container direction="column" alignItems="center">
                    <Grid item xs={1} sm={3} className={classes.loginForm}>
                        <Avatar
                            className={classes.avatar}
                            variant="square"
                            src={srcIcon}
                            sx={{ width: 64, height: 64 }}
                        />
                        <Typography align="center" variant="h4">
                            Login {APP_NAME}
                        </Typography>
                        <TextField
                            fullWidth={true}
                            id="username"
                            label={TRANSLATE_TERMS.USERNAME_TEXT}
                            variant="outlined"
                            className={classes.marginTop}
                            defaultValue={sSignIn.username}
                            onChange={(event) =>
                                sSignIn.set_username(event.target.value)
                            }
                        />
                        <TextField
                            fullWidth={true}
                            id="password"
                            label={TRANSLATE_TERMS.PASSWORD_TEXT}
                            type="password"
                            variant="outlined"
                            className={classes.marginTop}
                            defaultValue={sSignIn.password}
                            onChange={(event) =>
                                sSignIn.set_password(event.target.value)
                            }
                        />
                        <Button
                            fullWidth={true}
                            variant="contained"
                            className={classes.marginTop}
                            onClick={handleLogin}
                            disabled={submitting}
                        >
                            {TRANSLATE_TERMS.LOGIN_TEXT}
                        </Button>

                        <NotHaveAccount />

                        <Box mt={6}>
                            <Copyright />
                        </Box>
                    </Grid>
                </Grid>
            </div>
        </Root>
    );
});
