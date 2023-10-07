import { routerConfig } from "./config/router";
import { SnackbarProvider } from "notistack";
import { ThemeProvider } from "@mui/material";
import { theme } from "./utils";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { store, StoreContext } from "./stores";
import { FC, useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ConfirmDialog } from "./components/Dialog";

/**
 * App is a React Component initialize:
 * - ThemeProvider is a controller theme color, style, component for MUI5.
 * - MobxStore Context is a controller Global Store.
 * - Localization define Adapter format Date.
 * - Router define control path, location, params and corresponding Component.
 * - Snackbar Provider is a controller toast message.
 * @constructor
 */
export const App: FC = () => {

    useEffect(() => {
        store.checkLogin();
    },  []);

    return (
        <ThemeProvider theme={theme}>
            <StoreContext.Provider value={store}>
                {/*<Provider store={store}>*/}
                    <SnackbarProvider maxSnack={3} autoHideDuration={5000}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <BrowserRouter>
                                <ConfirmDialog />
                                <Routes>
                                    {
                                        routerConfig.map((route) => <Route key={route.path} path={route.path} element={route.component} />)
                                    }
                                </Routes>
                            </BrowserRouter>
                        </LocalizationProvider>
                    </SnackbarProvider>
                {/*</Provider>*/}
            </StoreContext.Provider>
        </ThemeProvider>
    );
};


