import { observer } from "mobx-react";
import { FC, useEffect } from "react";
import { useStore } from "src/stores";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { Order } from "src/models/Order";

export const OrderTable: FC = observer(() => {
    const { enqueueSnackbar } = useSnackbar();
    const navigator = useNavigate();
    const { sOrder } = useStore();

    useEffect(() => {
        Order.getOfMe().then(([err, data]) => {
            if (err) {
                enqueueSnackbar(err.message, { variant: "error" });
                return;
            }
            sOrder.set_orders(data);
        })
    }, []);

    // const makeTitleContent = ({user, service, partner}: Order) => {
    //     return <Typography>
    //         <Typography sx={{fontWeight: "bolder"}}>"{user.fullName}"</Typography>
    //         <Typography>Đã Đặt Dịch Vụ</Typography>
    //         <Typography sx={{fontWeight: "bolder"}}>"{service.serviceName}"</Typography>
    //         <Typography>của</Typography>
    //         <Typography sx={{fontWeight: "bolder"}}>"{partner.companyName}"</Typography>
    //     </Typography>
    // }

    // const columns: Column<Order>[] = [
    //     {
    //         title: "order", render: (data) => {
    //             return makeTitleContent(data);
    //         }
    //     },
    //     {
    //         title: "Created At", field: "createdAt", type: "date", render: (data) => {
    //             return moment(data.createdAt).format("HH:mm DD-MM-yyyy")
    //         }, defaultSort: "desc"
    //     },
    //     {title: "Total", field: "total", type: "numeric"},
    //     {title: "Reward", field: "reward", type: "numeric"},
    //     {title: "Voucher Code", field: "voucherCode"}
    // ];

    return <></>

    // return <MaterialTable
    //     style={generalStyles.paddingTable}
    //     title="Orders Manager"
    //     columns={columns}
    //     data={sOrder.orders}
    // />
})