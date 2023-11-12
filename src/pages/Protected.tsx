import { FC, ReactElement, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useSnackbar } from "notistack";
import { Navigate, useLocation } from "react-router-dom";

import { store } from "src/stores";
import { Loading } from "src/components/Loading";
import { UserRole } from "src/models";
import { MESSAGE_TERMS, setCurrentURL } from "src/utils";


export const RouteGuard: FC<{allowRole: UserRole; children: ReactElement}> = observer(({ allowRole, children }) => {
    const { isLoggedIn, isDone, isLoading, role } = store;
    const { enqueueSnackbar } = useSnackbar();
    const location = useLocation();

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

    function RedirectLogin() {
        setCurrentURL(location.pathname);

        return <Navigate to="/login" replace={true} />;
    }


    return (
        <>
            {isLoading || !isDone ? <Loading /> : !isLoggedIn ? <RedirectLogin /> : (
                <AdminRouteControl />)}
        </>
    );
});
