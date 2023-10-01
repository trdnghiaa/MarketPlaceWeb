import { useState, MouseEvent, ChangeEvent } from "react";
import {
	IconButton,
	Paper,
	Button,
	OutlinedInput,
	InputLabel,
	InputAdornment,
	FormControl, Grid,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

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
			<h2 style={{ margin: "1rem" }}>Đổi mật khẩu</h2>
			<FormControl sx={{ m: 1, width: 1 }}>
				<InputLabel htmlFor="outlined-adornment-password">
					Mật khẩu cũ
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
					label="Mật khẩu cũ"
				/>
			</FormControl>
			<FormControl sx={{ m: 1, width: 1 }} variant="outlined">
				<InputLabel htmlFor="outlined-adornment-password">
					Mật khẩu mới
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
					Xác nhận mật khẩu
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
					label="Xác nhận mật khẩu"
				/>
			</FormControl>
			<FormControl sx={{ m: 1 }}>
				<Button variant="contained">Lưu</Button>
			</FormControl>
			<FormControl sx={{ m: 1 }}>
				<Button variant="contained" style={{ background: "red" }}>
					Hủy
				</Button>
			</FormControl>
		</Grid>
	);
};
