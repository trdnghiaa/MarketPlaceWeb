import { FC, ReactElement, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useSnackbar } from "notistack";
import { Navigate } from "react-router-dom";

import { store } from "../stores";
import { Loading } from "./Loading";
import { UserRole } from "../models";
import { MESSAGE_TERMS } from "../utils";


export const RouteGuard: FC<{allowRole: UserRole; children: ReactElement}> = observer(({ allowRole, children }) => {
    const { isLoggedIn, isDone, isLoading, role } = store;
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        store.checkLogin();
    }, []);

    function hasRole(): boolean {
        if (role == UserRole.ADMIN) return true;

        if (allowRole == UserRole.SENSOR) {
            return role == UserRole.SENSOR;
        }

        if (allowRole == UserRole.USER) {
            return !!role;
        }

        return false;
    }

    function AdminRouteControl() {
        if (hasRole()) return children;

        enqueueSnackbar(MESSAGE_TERMS.NOT_ALLOW_ACCESS_PAGE, {
            variant: "error",
        });
        return <Navigate to="/" />;
    }

    return (
        <>
            {isLoading || !isDone ? <Loading /> : !isLoggedIn ? <Navigate to="/login" replace={true} /> : (<AdminRouteControl />)}
        </>
    );
});
