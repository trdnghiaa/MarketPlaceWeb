import { useState } from "react";
import {
	Box,
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from "@mui/material";

import { DesktopDatePicker, TimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

export const SearchRentCar = () => {
	const [date, setDate] = useState<Date | null>(
		new Date("2022-08-18T21:11:54")
	);
	const [value, setValue] = useState<Date | null>(null);
	const handleDateChange = (newValue: Date | null) => {
		setDate(newValue);
	};
	return (
		<Box
			sx={{
				width: "70%",
				bgcolor: "background.paper",
				padding: "1rem",
				display: "flex",
				flexWrap: "wrap",
			}}
		>
			<FormControl
				style={{
					width: "40%",
					marginRight: "2rem",
					marginBottom: "1rem",
				}}
			>
				<InputLabel id="demo-simple-select-label">
					Cho thuê xe
				</InputLabel>
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					label="Cho thuê xe"
				>
					<MenuItem value={10}>Tự lái</MenuItem>
					<MenuItem value={20}>Có người lái</MenuItem>
				</Select>
			</FormControl>
			<FormControl style={{ width: "50%", marginRight: "1rem" }}>
				<InputLabel id="simple-select-label">
					Địa điểm thuê xe của bạn
				</InputLabel>
				<Select
					labelId="simple-select-label"
					id="simple-select"
					label="Địa điểm thuê xe của bạn"
				>
					<MenuItem value={10}>HCM</MenuItem>
					<MenuItem value={20}>Hà Nội</MenuItem>
					<MenuItem value={30}>Thirty</MenuItem>
				</Select>
			</FormControl>
			<FormControl
				sx={{
					width: "40%",
					marginRight: "2rem",
					marginBottom: "1rem",
				}}
				variant="outlined"
			>
				<DesktopDatePicker
					label="Ngày bắt đầu"
					format="MM/dd/yyyy"
					value={date}
					onChange={handleDateChange}
				/>
			</FormControl>
			<FormControl>
				<TimePicker
					label="Giờ bắt đầu"
					value={value}
					onChange={(newValue) => {
						setValue(newValue);
					}}
				/>
			</FormControl>
			<FormControl
				sx={{
					width: "40%",
					marginRight: "2rem",
					marginBottom: "1rem",
				}}
				variant="outlined"
			>
				<DesktopDatePicker
					label="Ngày kết thúc"
					format="MM/dd/yyyy"
					value={date}
					onChange={handleDateChange}
				/>
			</FormControl>
			<FormControl>
				<TimePicker
					label="Giờ kết thúc"
					value={value}
					onChange={(newValue) => {
						setValue(newValue);
					}}
				/>
			</FormControl>
			<Button
				variant="contained"
				style={{ height: "fit-content", margin: "auto" }}
			>
				Tìm kiếm xe
			</Button>
		</Box>
	);
};
