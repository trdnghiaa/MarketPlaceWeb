import {FC, useEffect} from "react";
import {OrderTable} from "../../components/Order/OrderTable";
import {BasicLayout} from "../../layouts/common";
import {OrderResult} from "../../components/orderResult";
import {useStore} from "../../stores";
import {useSnackbar} from "notistack";
import {Order as OrderDTO} from "../../models/Order"
import {observer} from "mobx-react-lite";
import {FormControlLabel, Switch} from "@mui/material";
import {UserRole} from "../../models/types";

export const Order: FC = observer(() => {
    const {enqueueSnackbar} = useSnackbar();
    const {sOrder, role} = useStore();

    useEffect(() => {
        OrderDTO.getOfMe().then(([err, data]) => {
            if (err) {
                enqueueSnackbar(err.message, {variant: "error"});
                return;
            }
            sOrder.set_orders(data);
        })
    }, []);

    return <BasicLayout>
        {role == UserRole.ADMIN && <FormControlLabel control={<Switch checked={sOrder.mode == "USER"} onChange={() => sOrder.set_mode(sOrder.mode == "USER" ? "PARTNER" : "USER")}/>}
                                                     label={sOrder.mode == "USER" ? "USER DISPLAY" : "PARTNER DISPLAY"}/>}

        <OrderResult displayType={sOrder.mode} orders={sOrder.orders}/>
        {/*<OrderTable/>*/}
    </BasicLayout>;
});
