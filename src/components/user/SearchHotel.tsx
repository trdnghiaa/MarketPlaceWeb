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
import { DesktopDatePicker } from "@mui/x-date-pickers";

export const SearchHotel = () => {
	const [date, setDate] = useState<Date | null>(
		new Date("2022-08-18T21:11:54")
	);
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
			<FormControl style={{ marginRight: "1rem" }} fullWidth>
				<InputLabel id="simple-select-label">
					Thành phố, địa điểm hoặc tên khách sạn
				</InputLabel>
				<Select
					labelId="simple-select-label"
					id="simple-select"
					label="Thành phố, địa điểm hoặc tên khách sạn"
				>
					<MenuItem value={10}>Hà Nội</MenuItem>
					<MenuItem value={20}>TP HCM</MenuItem>
				</Select>
			</FormControl>
			<FormControl sx={{ width: "25ch", mr: 2 }} variant="outlined">
				<DesktopDatePicker
					label="Nhận phòng"
					format="MM/dd/yyyy"
					value={date}
					onChange={handleDateChange}
				/>
			</FormControl>
			<FormControl style={{ width: "25ch", marginRight: "2rem" }}>
				<InputLabel id="demo-simple-select-label">
					Số đêm
				</InputLabel>
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					label="Số đêm"
				>
					<MenuItem value={10}>1 đêm</MenuItem>
					<MenuItem value={20}>2 đêm</MenuItem>
				</Select>
			</FormControl>
			<FormControl style={{ width: "25ch", marginRight: "1rem" }}>
				<InputLabel id="simple-select-label">Số phòng</InputLabel>
				<Select
					labelId="simple-select-label"
					id="simple-select"
					label="Số phòng"
				>
					<MenuItem value={10}>HCM</MenuItem>
					<MenuItem value={20}>Hà Nội</MenuItem>
					<MenuItem value={30}>Thirty</MenuItem>
				</Select>
			</FormControl>

			<FormControl style={{ marginRight: "1rem", width: "30%" }}>
				<InputLabel id="simple-select-label">
					Số hành khách
				</InputLabel>
				<Select
					labelId="simple-select-label"
					id="simple-select"
					label="Số hành khách"
				>
					<MenuItem value={10}>HCM</MenuItem>
					<MenuItem value={20}>Hà Nội</MenuItem>
					<MenuItem value={30}>Thirty</MenuItem>
				</Select>
			</FormControl>
			<Button
				variant="contained"
				style={{ height: "fit-content", margin: "auto" }}
			>
				Tìm combo tiết kiệm
			</Button>
		</Box>
	);
};
