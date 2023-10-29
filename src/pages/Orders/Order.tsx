import { FC, useEffect } from "react";
import { BasicLayout } from "src/layouts/common";
import { OrderResult } from "src/components/orderResult";
import { useStore } from "src/stores";
import { useSnackbar } from "notistack";
import { Order as OrderDTO } from "src/models/Order"
import { observer } from "mobx-react-lite";
import { FormControlLabel, Switch } from "@mui/material";
import { UserRole } from "src/models/types";

export const Order: FC = observer(() => {
    const { enqueueSnackbar } = useSnackbar();
    const { sOrder, role } = useStore();

    useEffect(() => {
        OrderDTO.getOfMe().then(([err, data]) => {
            if (err) {
                enqueueSnackbar(err.message, { variant: "error" });
                return;
            }
            sOrder.set_orders(data);
        })
    }, []);

    return <BasicLayout>
        {role == UserRole.ADMIN && <FormControlLabel control={<Switch checked={sOrder.mode == "USER"}
                                                                      onChange={() => sOrder.set_mode(sOrder.mode == "USER" ? "PARTNER" : "USER")} />}
                                                     label={sOrder.mode == "USER" ? "USER DISPLAY" : "PARTNER DISPLAY"} />}

        <OrderResult displayType={sOrder.mode} orders={sOrder.orders} />
        {/*<OrderTable/>*/}
    </BasicLayout>;
});
