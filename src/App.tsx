import { RouteModel, routerConfig } from "./config/router";
import { SnackbarProvider } from "notistack";
import { ThemeProvider } from "@mui/material";
import { setTitle, theme } from "./utils";

import { Provider } from "mobx-react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { store, StoreContext } from "./stores";
import { FC, useEffect } from "react";
import { Protected } from "./components/Protected";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ConfirmDialog } from "./components/Dialog";


export const App: FC = () => {
    useEffect(() => {
        store.checkLogin();
    });

    return (
        <ThemeProvider theme={theme}>
            <StoreContext.Provider value={store}>
                <Provider store={store}>
                    <SnackbarProvider maxSnack={3} autoHideDuration={5000} preventDuplicate>
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
                </Provider>
            </StoreContext.Provider>
        </ThemeProvider>
    );
};


