import { FC, useState } from "react";
import { BasicLayout } from "../layouts/common";
import { countries } from "../utils";
import {
	Grid,
	Paper,
	Box,
	TextField,
	Autocomplete,
	FormControl,
	Select,
	InputLabel,
	SelectChangeEvent,
	Button,
} from "@mui/material";

export const CreateCompany: FC = () => {
	const [service, setService] = useState("");

	const handleChange = (event: SelectChangeEvent) => {
		setService(event.target.value as string);
	};

	return (
		<BasicLayout>
			<Paper
				elevation={12}
				sx={{
					display: "flex",
					flexWrap: "wrap",
					margin: "1rem auto",
					width: "80%",
				}}
			>
				<h2 style={{ width: "100%", marginLeft: "2rem" }}>
					Thông tin công ty
				</h2>
				<Grid container spacing={2} style={{ padding: "2rem" }}>
					<Grid item xs={12}>
						<Box>
							<TextField
								fullWidth
								id="company-name"
								label="Tên công ty"
								variant="outlined"
							/>
						</Box>
					</Grid>
					<Grid item xs={8}>
						<Autocomplete
							id="country-select-demo"
							sx={{ width: "100%" }}
							options={countries}
							autoHighlight
							getOptionLabel={(option) => option.label}
							renderOption={(props, option) => (
								<Box
									component="li"
									sx={{
										"& > img": {
											mr: 2,
											flexShrink: 0,
										},
									}}
									{...props}
								>
									<img
										loading="lazy"
										width="20"
										src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
										srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
										alt=""
									/>
									{option.label} ({option.code}) +
									{option.phone}
								</Box>
							)}
							renderInput={(params) => (
								<TextField
									{...params}
									label="Chọn quốc gia của bạn"
									inputProps={{
										...params.inputProps,
										autoComplete: "new-password", // disable autocomplete and autofill
									}}
								/>
							)}
						/>
					</Grid>
					<Grid item xs={4}>
						<Box>
							<TextField
								fullWidth
								id="company-phone"
								label="Số điện thoại"
								variant="outlined"
							/>
						</Box>
					</Grid>
					<Grid item xs={8}>
						<Box>
							<TextField
								fullWidth
								id="company-address"
								label="Địa chỉ công ty"
								variant="outlined"
							/>
						</Box>
					</Grid>
					<Grid item xs={4}>
						<Box>
							<FormControl fullWidth>
								<InputLabel id="company-service">
									Chọn dịch vụ
								</InputLabel>
								<Select
									labelId="company-service"
									id="company-service"
									value={service}
									label="Chon dich vu"
									onChange={handleChange}
								>
								</Select>
							</FormControl>
						</Box>
					</Grid>
					<Grid item>
						<Button variant="contained">Tạo công ty</Button>
					</Grid>
				</Grid>
			</Paper>
		</BasicLayout>
	);
};
