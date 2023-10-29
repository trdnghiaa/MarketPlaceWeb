import * as React from "react";
import { FC } from "react";
import { observer } from "mobx-react-lite";
import { Box, Button, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import { TRANSLATE_TERMS, goBack, theme } from "src/utils";
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
                        {TRANSLATE_TERMS.NOT_FOUND_PAGE}
                    </Typography>

                    <Button variant="contained" onClick={(event) => {
                        event.preventDefault();
                        goBack();
                    }} startIcon={<ArrowBack />}>{TRANSLATE_TERMS.BACK_BUTTON}</Button>
                </Box>
            </header>
        </div>
    );
});
