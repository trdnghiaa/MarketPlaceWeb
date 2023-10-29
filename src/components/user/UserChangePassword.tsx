import { ChangeEvent, MouseEvent, useState } from "react";
import { Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { TRANSLATE_TERMS } from "src/utils";

export const UserChangePassword = () => {
    interface State {
        amount: string;
        password: string;
        weight: string;
        weightRange: string;
        showPassword: boolean;
    }

    const [values, setValues] = useState({
        amount: "",
        password: "",
        weight: "",
        weightRange: "",
        showPassword: false,
    });

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleChange =
        (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
            setValues({ ...values, [prop]: event.target.value });
        };

    return (
        <Grid container>
            <h2 style={{ margin: "1rem" }}>{TRANSLATE_TERMS.CHANGE_PASSWORD_TEXT}</h2>
            <FormControl sx={{ m: 1, width: 1 }}>
                <InputLabel htmlFor="outlined-adornment-password">
                    {TRANSLATE_TERMS.OLD_PASSWORD_TEXT}
                </InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={values.showPassword ? "text" : "password"}
                    value={values.password}
                    onChange={handleChange("password")}
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
                    label={TRANSLATE_TERMS.OLD_PASSWORD_TEXT}
                />
            </FormControl>
            <FormControl sx={{ m: 1, width: 1 }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                    {TRANSLATE_TERMS.NEW_PASSWORD_TEXT}
                </InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={values.showPassword ? "text" : "password"}
                    value={values.password}
                    onChange={handleChange("password")}
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
                    label="Mật khẩu mới"
                />
            </FormControl>
            <FormControl sx={{ m: 1, width: 1 }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                    {TRANSLATE_TERMS.CONFIRM_PASSWORD_TEXT}
                </InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={values.showPassword ? "text" : "password"}
                    value={values.password}
                    onChange={handleChange("password")}
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
                    label={TRANSLATE_TERMS.CHANGE_PASSWORD_TEXT}
                />
            </FormControl>
            <FormControl sx={{ m: 1 }}>
                <Button variant="contained">{TRANSLATE_TERMS.SAVE_BUTTON}</Button>
            </FormControl>
            <FormControl sx={{ m: 1 }}>
                <Button variant="contained" style={{ background: "red" }}>
                    {TRANSLATE_TERMS.CANCEL}
                </Button>
            </FormControl>
        </Grid>
    );
};
