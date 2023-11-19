import { FC, ReactNode } from "react";
import { Backdrop, CircularProgress } from "@mui/material";
import { BasicLayout } from "src/layouts/common";
import { observer } from "mobx-react-lite";

export const Loading: FC<{}> = () => {
    return (
        <BasicLayout>
            <Backdrop
                sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 3,
                }}
                open={true}
            >
                <CircularProgress color="primary" />
            </Backdrop>
        </BasicLayout>
    );
};

export const Loader: FC<{isLoading: boolean, children: ReactNode}> = observer(({ isLoading, children }) => {
    return <>
        {isLoading ? <Backdrop
            sx={{
                color: "#fff",
                zIndex: (theme) => theme.zIndex.drawer + 3,
            }}
            open={true}
        >
            <CircularProgress color="primary" />
        </Backdrop> : children}
    </>
})
