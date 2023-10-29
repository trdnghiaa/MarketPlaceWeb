import { FC, useState, MouseEvent } from "react";
import {
	FormControl,
	InputLabel,
	OutlinedInput,
	InputAdornment,
	IconButton, Grid,
} from "@mui/material";
import { useStore } from "src/stores";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { TRANSLATE_TERMS } from "src/utils";

export const CreateAccount: FC = () => {
	const { sSignUp } = useStore();

	const [values, setValues] = useState({
		showPassword: false,
	});

	const handleClickShowPassword = () => {
		setValues({
			showPassword: !values.showPassword,
		});
	};

	const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	return (
		<div>
			<h2 style={{ width: "100%" }}>{TRANSLATE_TERMS.CREATE_NEW_ACCOUNT}</h2>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<FormControl fullWidth sx={{ width: 1 }}>
						<InputLabel htmlFor="username">
							{TRANSLATE_TERMS.USERNAME_TEXT}
						</InputLabel>
						<OutlinedInput
							id="username"
							label={TRANSLATE_TERMS.USERNAME_TEXT}
							name="username"
							onChange={(event) =>
								sSignUp.set_username(event.target.value)
							}
							required
						/>
					</FormControl>
				</Grid>
				<Grid item xs={12}>
					<FormControl sx={{ width: 1 }}>
						<InputLabel htmlFor="password">
						{TRANSLATE_TERMS.PASSWORD_TEXT}
						</InputLabel>
						<OutlinedInput
							id="password"
							type={
								values.showPassword
									? "text"
									: "password"
							}
							onChange={(event) =>
								sSignUp.set_password(event.target.value)
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
							label={TRANSLATE_TERMS.PASSWORD_TEXT}
							name="password"
							required
						/>
					</FormControl>
				</Grid>
				<Grid item xs={12}>
					<FormControl sx={{ width: 1 }}>
						<InputLabel htmlFor="password-confirm">
							{TRANSLATE_TERMS.CONFIRM_PASSWORD_TEXT}
						</InputLabel>
						<OutlinedInput
							id="password-confirm"
							type={
								values.showPassword
									? "text"
									: "password"
							}
							onChange={(event) =>
								sSignUp.set_confirm(event.target.value)
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
							label= {TRANSLATE_TERMS.CONFIRM_PASSWORD_TEXT}
							name="confirmPassword"
							required
						/>
					</FormControl>
				</Grid>
			</Grid>
		</div>
	);
};
