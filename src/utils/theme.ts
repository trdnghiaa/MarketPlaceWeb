import { createTheme } from "@mui/material";

export const theme = createTheme({
	components: {
		MuiPaper: {
			styleOverrides: {
				root: {
					padding: "1rem",
				},
			},
		},
	},
});

export const generalStyles = {
	paddingTable: { padding: "0rem 1rem" },
	widthTable: { width: "100%" },
};
