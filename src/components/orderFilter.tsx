import { useState } from "react";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { Container, FormControl, Button } from "@mui/material";

export const OrderFilter = () => {
	const [start, setStart] = useState<Date | null>(new Date());

	const [end, setEnd] = useState<Date | null>(new Date());

	const handleStartChange = (newValue: Date | null) => {
		setStart(newValue);
	};

	const handleEndChange = (newValue: Date | null) => {
		setEnd(newValue);
	};

	return (
		<Container sx={{ display: "flex", flexWrap: "wrap", mb: 2, mt: 2 }}>
			<span style={{ margin: "1rem" }}>From</span>
			<FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
				<DesktopDatePicker
					label="Date desktop"
					format="MM/dd/yyyy"
					value={start}
					onChange={handleStartChange}
				/>
			</FormControl>
			<span style={{ margin: "1rem" }}>to</span>
			<FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
				<DesktopDatePicker
					label="Date desktop"
					format="MM/dd/yyyy"
					value={end}
					onChange={handleEndChange}
				/>
			</FormControl>
			<Button variant="contained" sx={{ m: 2 }}>
				Search
			</Button>
		</Container>
	);
};
