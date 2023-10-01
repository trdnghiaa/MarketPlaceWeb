import * as React from "react";
import { FC, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Box, Typography, Button} from "@mui/material";
import { blue } from "@mui/material/colors";
import { setTitle, theme } from "../utils";
import { ArrowBack } from "@mui/icons-material";

export const NotFound: FC = observer(() => {
    useEffect(() => {
        setTitle("NOT FOUND");
    }, [])
    return (
        <div className="App">
            <header className="App-header">
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        minHeight: '100vh',
                        backgroundColor: blue[300],
                    }}
                >
                    <Typography variant="h1"
                                sx={{ color: 'white', fontSize: "20rem", fontStyle: "italic", fontWeight: "bold" }}>404</Typography>

                    <Typography variant="h6" style={{ color: 'white' }} sx={{ marginBottom: theme.spacing(2) }}>
                        The page you’re looking for doesn’t exist.
                    </Typography>

                    <Button variant="contained" onClick={(event) => {
                        event.preventDefault();
                        window.history.go(-1);
                    }} startIcon={<ArrowBack />}>Back</Button>
                </Box>
            </header>
        </div>
    );
});
