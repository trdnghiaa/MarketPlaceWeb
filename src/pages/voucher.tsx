import { FC, useEffect, useState } from "react";
import { BasicLayout } from "src/layouts/common";
import { useStore } from "src/stores";
import { observer } from "mobx-react-lite";
import { Oops } from "src/components/Error/Oops";
import { Typography } from "@mui/material";
import { UserRole } from "src/models/types";
import { useNavigate } from "react-router-dom";
import { Loading } from "src/components/Loading";
import { TRANSLATE_TERMS } from "src/utils";

export const Voucher: FC = observer(() => {
    const { role } = useStore();
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
                <Oops children={<Typography>{TRANSLATE_TERMS.OOPS_SOMETHING_WRONG}</Typography>} />
            </BasicLayout> : <Loading />}
        </>

    );
});
