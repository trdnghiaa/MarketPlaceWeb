import { FC, MouseEvent, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { BasicLayout } from "../../layouts/common";
import { UserInfo } from "../../components/user";
import { useStore } from "../../stores";
import { Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, Typography } from "@mui/material";
import { randomStringWithLength, theme } from "../../utils";
import { Cached, Save, Visibility, VisibilityOff } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { CreateAccount } from "../../components/CreateAccount";

export const NewAccount: FC<{}> = observer(({}) => {
    const { sNewAccount } = useStore();
    const { enqueueSnackbar } = useSnackbar();
    const [submitting, setSubmitting] = useState(false);
    const navigator = useNavigate();

    const [values, setValues] = useState({
        showPassword: false,
    });

    const handleClickShowPassword = () => {
        setValues({
            showPassword: !values.showPassword,
        });
    };

    const handleRandomPassword = () => {
        const password = randomStringWithLength(8);

        sNewAccount.set_password(password);
    }

    const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleCreate = () => {
        sNewAccount.createAccount().then(([err, data]) => {
            setSubmitting(false);
            if (err)
                return enqueueSnackbar(err.message, { variant: "error" });
            navigator("/Login");
        }).catch((e) => {
            enqueueSnackbar(e.message, { variant: "error" });
        })
    };

    useEffect(() => {}, [sNewAccount.password]);

    return <BasicLayout>
        <Paper elevation={3} sx={{ padding: theme.spacing(3) }}>
            <Typography variant="h3"> Tạo người dùng</Typography>

            <UserInfo user={sNewAccount.user} setUser={sNewAccount.get_User()} />

            <Grid container spacing={2} mt={2}>
                <Grid item xs={12}>
                    <FormControl fullWidth sx={{ width: 1 }}>
                        <InputLabel htmlFor="username">
                            Tên đăng nhập
                        </InputLabel>
                        <OutlinedInput
                            id="username"
                            label="Tên đăng nhập"
                            name="username"
                            onChange={(event) =>
                                sNewAccount.set_username(event.target.value)
                            }
                            required
                        />
                    </FormControl>
                </Grid>
                <Grid item container alignItems="center" spacing={2}>
                    <Grid item flexGrow={1}>
                        <FormControl sx={{ width: 1 }}>
                            <InputLabel htmlFor="password">
                                Mật khẩu
                            </InputLabel>
                            <OutlinedInput
                                id="password"
                                type={
                                    values.showPassword
                                        ? "text"
                                        : "password"
                                }
                                value={sNewAccount.password}
                                onChange={(event) =>
                                    sNewAccount.set_password(event.target.value)
                                }
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {values.showPassword ? (
                                                <VisibilityOff />
                                            ) : (
                                                <Visibility />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Mật khẩu"
                                name="password"
                                required
                            />
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <Button variant={"contained"} startIcon={<Cached />} onClick={handleRandomPassword} >Tạo mật khẩu</Button>
                    </Grid>
                </Grid>
            </Grid>

            <Grid container spacing={theme.spacing(2)} direction="row" justifyContent="flex-end" mt={theme.spacing(1)}>
                <Grid item>
                    <Button variant="outlined" color="error" onClick={() => {window.history.go(-1);}}>Hủy</Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" disabled={submitting} startIcon={<Save />}
                            onClick={handleCreate}>Lưu</Button>
                </Grid>
            </Grid>
        </Paper>
    </BasicLayout>
})