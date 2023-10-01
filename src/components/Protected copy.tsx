import {FC, ReactElement, useEffect} from "react";

import {observer} from "mobx-react-lite"
import {store} from "../stores";
import {Navigate, useNavigate} from "react-router-dom";
import {Loading} from "./Loading";
import {UserRole} from "../models/types";
import {useSnackbar} from "notistack";

export const Protected: FC<{ isAdmin: Boolean, children: ReactElement }> = observer(({isAdmin, children}) => {
    const {isLoggedIn, isDone, isLoading, role} = store;
    const {enqueueSnackbar} = useSnackbar();

    useEffect(() => {
        store.checkLogin();
    }, []);

    function isAdminPage(children: ReactElement) {
        if (isAdmin) {
            if (role == UserRole.ADMIN) return children;

            enqueueSnackbar("User Role Not Allowed Access Page!", {variant: "error"})
            return <Navigate to="/"/>
        } else
            return children;
    }

    return <>
        {isLoading || !isDone ? <Loading/> : (!isLoggedIn ?
            <Navigate to="/login"/> : isAdminPage(children))}
    </>;
})