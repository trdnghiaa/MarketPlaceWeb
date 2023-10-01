import { FC, useEffect, useState } from "react";
import { BasicLayout } from "../layouts/common";
import { store, useStore } from "../stores";
import { observer } from "mobx-react-lite";
import { Oops } from "../components/Error/Oops";
import { Typography } from "@mui/material";
import { UserRole } from "../models/types";
import { useNavigate } from "react-router-dom";
import { Loading } from "../components/Loading";

const { REACT_APP_VOUCHER_HOST } = process.env;

export const Voucher: FC = observer(() => {
    const { token, role } = useStore();
    const navigator = useNavigate();
    const [done, setDone] = useState(false);

    useEffect(() => {
        if (role == UserRole.ADMIN) {
            return;
        }
        window.history.pushState(null, "", "/");
        setDone(true);
    })

    return (
        <>
            {done ? <BasicLayout>
                <Oops children={<Typography>Oops Xảy Ra Lỗi Rồi</Typography>} />
            </BasicLayout> : <Loading />}
        </>

    );
});
