import { FC, useState, MouseEvent } from "react";
import {
	FormControl,
	InputLabel,
	OutlinedInput,
	InputAdornment,
	IconButton, Grid,
} from "@mui/material";
import { useStore } from "../stores";
import { Visibility, VisibilityOff } from "@mui/icons-material";

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
			<h2 style={{ width: "100%" }}>Tạo tài khoản</h2>
			<Grid container spacing={2}>
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
								sSignUp.set_username(event.target.value)
							}
							required
						/>
					</FormControl>
				</Grid>
				<Grid item xs={12}>
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
							label="Mật khẩu"
							name="password"
							required
						/>
					</FormControl>
				</Grid>
				<Grid item xs={12}>
					<FormControl sx={{ width: 1 }}>
						<InputLabel htmlFor="password-confirm">
							Xác nhận mật khẩu
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
							label="Xác nhận mật khẩu"
							name="confirmPassword"
							required
						/>
					</FormControl>
				</Grid>
			</Grid>
		</div>
	);
};
