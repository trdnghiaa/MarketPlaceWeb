import { FC, ReactNode, useEffect } from "react";
import { Container } from "@mui/material";

import { Appbar } from "src/components/Navbar/appbar";
import { UserNavbar } from "src/components/user";

import "./common.scss";
import { store, useStore } from "src/stores";
import { UserRole } from "src/models";
import { observer } from "mobx-react";

export const BasicLayout: FC<{children: ReactNode}> = observer(
    ({ children }) => {
        const { role, isLoading, sCategories } = useStore();

        useEffect(() => {
            if (!sCategories.categories.length)
                sCategories.init();
        }, []);


        return (
            <>
                <div className="App">
                    {isLoading ? <></> : store.isLoggedIn && role !== UserRole.USER ? (
                        <Appbar />
                    ) : (
                        <UserNavbar />
                    )}
                </div>
                <Container component="main" maxWidth="xl">
                    {children}
                </Container>
            </>
        );
    }
);