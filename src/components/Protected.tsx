import { FC, ReactElement, useEffect } from "react";

import { observer } from "mobx-react-lite";
import { store } from "../stores";
import { Navigate } from "react-router-dom";
import { Loading } from "./Loading";
import { UserRole } from "../models/types";
import { useSnackbar } from "notistack";
import { MESSAGE_TERMS } from "../utils/messageTerms";

export const Protected: FC<{isAdmin: Boolean; children: ReactElement}> =
    observer(({ isAdmin, children }) => {
        const { isLoggedIn, isDone, isLoading, role } = store;
        const { enqueueSnackbar } = useSnackbar();

        useEffect(() => {
            store.checkLogin();
        }, []);

        function isAdminPage(children: ReactElement) {
            if (isAdmin) {
                if (role == UserRole.ADMIN) return children;

                enqueueSnackbar("User Role Not Allowed Access Page!", {
                    variant: "error",
                });
                return <Navigate to="/" />;
            } else return children;
        }

        return (
            <>
                {isLoading || !isDone ? (
                    <Loading />
                ) : !isLoggedIn ? (
                    <Navigate to="/login" replace={true}/>
                ) : (
                    isAdminPage(children)
                )}
            </>
        );
    });

export const RouteGuard: FC<{allowRole: UserRole; children: ReactElement}> =
    observer(({ allowRole, children }) => {
        const { isLoggedIn, isDone, isLoading, role } = store;
        const { enqueueSnackbar } = useSnackbar();

        useEffect(() => {
            store.checkLogin();
        }, []);

        function hasRole(): boolean{
            if(role == UserRole.ADMIN) return true;

            if(allowRole == UserRole.SENSOR) {
                return role == UserRole.SENSOR;
            }

            if(allowRole == UserRole.USER) {
                return !!role;
            }

            return false;
        }

        function isAdminPage() {
            if (hasRole()) return children;

            enqueueSnackbar(MESSAGE_TERMS.NOT_ALLOW_ACCESS_PAGE, {
                variant: "error",
            });
            return <Navigate to="/" />;
        }

        return (
            <>
                {isLoading || !isDone ? (
                    <Loading />
                ) : !isLoggedIn ? (
                    <Navigate to="/login" />
                ) : (
                    isAdminPage()
                )}
            </>
        );
    });
