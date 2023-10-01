import { useState, ChangeEvent, MouseEvent } from "react";
import { VisibilityOff, Visibility } from "@mui/icons-material/";
import {
	MenuItem,
	Select,
	FormControl,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	IconButton,
	Box,
} from "@mui/material";

interface State {
	amount: string;
	password: string;
	weight: string;
	weightRange: string;
	showPassword: boolean;
}

export const DetailInfo = () => {
	const [values, setValues] = useState<State>({
		amount: "",
		password: "",
		weight: "",
		weightRange: "",
		showPassword: false,
	});

	const handleChange =
		(prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
			setValues({ ...values, [prop]: event.target.value });
		};

	const handleClickShowPassword = () => {
		setValues({
			...values,
			showPassword: !values.showPassword,
		});
	};

	const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	return (
		<Box sx={{ display: "flex", flexWrap: "wrap" }}>
			<div>
				<FormControl fullWidth sx={{ m: 1 }}>
					<InputLabel htmlFor="outlined-adornment-amount">
						Full name
					</InputLabel>
					<OutlinedInput
						id="outlined-adornment-amount"
						value={values.amount}
						onChange={handleChange("amount")}
						startAdornment={
							<InputAdornment position="start"></InputAdornment>
						}
						label="fullname"
					/>
				</FormControl>
				<FormControl sx={{ m: 1, width: "25ch" }}>
					<InputLabel id="demo-simple-select-label">
						Gender
					</InputLabel>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						label="Gender"
					>
						<MenuItem value={10}>Male</MenuItem>
						<MenuItem value={20}>Female</MenuItem>
						<MenuItem value={30}>Other</MenuItem>
					</Select>
				</FormControl>
				<FormControl
					sx={{ m: 1, width: "25ch" }}
					variant="outlined"
				></FormControl>
				<FormControl
					sx={{ m: 1, width: "25ch" }}
					variant="outlined"
				>
					<InputLabel htmlFor="outlined-adornment-password">
						Password
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
									onMouseDown={
										handleMouseDownPassword
									}
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
						label="Password"
					/>
				</FormControl>
			</div>
		</Box>
	);
};
