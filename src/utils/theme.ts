import { createTheme } from "@mui/material";

export const theme = createTheme({
    components: {
        MuiCssBaseline: {
            styleOverrides: {}
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    padding: "1rem",
                    // backgroundColor: "#000"
                },
            },
        },
    },
});

export const generalStyles = {
    paddingTable: { padding: "0rem 1rem" },
    widthTable: { width: "100%" },
};
