import {FC, MouseEvent, useState} from "react";
import {observer} from "mobx-react-lite";
import {FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, Typography} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useStore} from "../../stores";
import {UserRole} from "../../models/types";

export const ChangePassword: FC = observer(() => {
    const {sProfile, role} = useStore();
    const [showPassword, setShowPassword] = useState({
        old: false,
        password: false,
        confirm: false
    })
    const [change, setChange] = useState(false);

    const makeHandleClickShowPassword = (id: "old" | "password" | "confirm") => {
        return (event: any) => {

            setShowPassword((state) => {
                state[id] = !state[id];
                return state;
            });
            setChange(!change);
        };
    }

    const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return <Paper elevation={8} style={{padding: "2rem", marginBottom: "1rem"}}>
        <Grid container spacing={1}>
        <Grid item>
            <h2>Đổi Mật Khẩu</h2>
        </Grid>

        {role !== UserRole.ADMIN && <Grid item xs={12}>
            <FormControl sx={{width: 1}}>
                <InputLabel htmlFor="old_password">
                    Mật khẩu
                </InputLabel>
                <OutlinedInput
                    id="old_password"
                    type={
                        showPassword.old
                            ? "text"
                            : "password"
                    }
                    onChange={(event) =>
                        sProfile.set_oldPassword(event.target.value)
                    }
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={makeHandleClickShowPassword("old")}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword.old ? (
                                    <VisibilityOff/>
                                ) : (
                                    <Visibility/>
                                )}
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Mật khẩu"
                    name="password"
                    required
                />
            </FormControl>
        </Grid>}
        <Grid item xs={12}>
            <FormControl sx={{width: 1}}>
                <InputLabel htmlFor="password">
                    Mật khẩu
                </InputLabel>
                <OutlinedInput
                    id="password"
                    type={
                        showPassword.password
                            ? "text"
                            : "password"
                    }
                    onChange={(event) =>
                        sProfile.set_password(event.target.value)
                    }
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={makeHandleClickShowPassword("password")}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword.password ? (
                                    <VisibilityOff/>
                                ) : (
                                    <Visibility/>
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
        {role != UserRole.ADMIN && <Grid item xs={12}>
            <FormControl sx={{width: 1}}>
                <InputLabel htmlFor="password-confirm">
                    Xác nhận mật khẩu
                </InputLabel>
                <OutlinedInput
                    id="password-confirm"
                    type={
                        showPassword.confirm
                            ? "text"
                            : "password"
                    }
                    onChange={(event) =>
                        sProfile.set_confirm(event.target.value)
                    }
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={makeHandleClickShowPassword("confirm")}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword.confirm ? (
                                    <VisibilityOff/>
                                ) : (
                                    <Visibility/>
                                )}
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Xác nhận mật khẩu"
                    name="confirmPassword"
                    required
                />
            </FormControl>
        </Grid>}
    </Grid>
    </Paper>
});