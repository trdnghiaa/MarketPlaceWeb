import { routerConfig } from "./config/router";
import { SnackbarProvider } from "notistack";
import { ThemeProvider } from "@mui/material";
import { theme } from "./utils";

import { Provider } from "mobx-react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { store, StoreContext } from "./stores";
import { FC, useEffect } from "react";
import { Protected } from "./components/Protected";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ConfirmDialog } from "./components/Dialog";


export const App: FC = () => {
    function isAuth(isPrivate: Boolean, element: any, isAdmin: Boolean) {
        if (!isPrivate) return element;
        return <Protected isAdmin={isAdmin}>{element}</Protected>;
    }

    useEffect(() => {
        store.checkLogin();
        // Service.getAll().then(([err, data]) => {
        // 	if (!err) {
        // 		store.set_services(data);
        // 		return;
        // 	}
        // 	window.alert(err.message);
        // });
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
                                    {routerConfig.map(
                                        ({
                                             path,
                                             component,
                                             isPrivate = false,
                                             isAdmin = false,
                                         }) => (
                                            <Route
                                                key={path}
                                                path={path}
                                                element={isAuth(
                                                    isPrivate,
                                                    component,
                                                    isAdmin
                                                )}
                                            />
                                        )
                                    )}
                                </Routes>
                            </BrowserRouter>
                        </LocalizationProvider>
                    </SnackbarProvider>
                </Provider>
            </StoreContext.Provider>
        </ThemeProvider>
    );
};
