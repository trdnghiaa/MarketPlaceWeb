import * as React from "react";
import { FC } from "react";
import { observer } from "mobx-react-lite";
import { Box, Button, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import { goBack, theme } from "../utils";
import { ArrowBack } from "@mui/icons-material";

export const NotFound: FC = observer(() => {
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
                         Trang này không có đâu thằng GAY ạ!
                    </Typography>

                    <Button variant="contained" onClick={(event) => {
                        event.preventDefault();
                        goBack();
                    }} startIcon={<ArrowBack />}>Back</Button>
                </Box>
            </header>
        </div>
    );
});
