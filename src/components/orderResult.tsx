import { observer } from "mobx-react";
import { FC, Fragment } from "react";
import { Order } from "src/models/Order";
import { Divider, Link, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Typography } from "@mui/material";
import InboxIcon from '@mui/icons-material/Inbox';
import { UserRole } from "src/models/types";
import { Grid } from "@mui/material/";
import moment from "moment";


export const OrderResult: FC<{displayType: UserRole | string, orders: Order[]}> = observer(({ displayType, orders }) => {

    const makeTitleContent = ({ user}: Order) => {
        return `${displayType == UserRole.USER ? "Bạn" : user.fullName} Đã Đặt Dịch Vụ ${displayType == UserRole.USER ? "của " : ""}`
    }

    return (
        <Grid container marginX={3}>
            {orders.map((o) => (
                <Paper elevation={3} style={{ width: "100%", padding: "1rem", margin: "0.4rem 0" }}>
                    <Grid item>
                        <List>
                            <Typography fontWeight={"bolder"}>{makeTitleContent(o)}</Typography>
                            <Typography>{moment(o.createdAt).format("HH:mm DD/MM/yyyy")}</Typography>
                        </List>
                        <List>
                            <Divider />
                            {o.details.map((d) => (
                                <ListItem disablePadding>
                                    <Link href={d.link ? d.link : "/"} sx={{ width: "100%", textDecoration: "none" }}>
                                        <ListItemButton>
                                            <ListItemIcon sx={{ marginX: 1 }}>
                                                {d.thumbnail ? <img src={d.thumbnail} width={64} height={64} /> :
                                                    <InboxIcon />}
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={d.productName}
                                                secondary={
                                                    <Fragment>
                                                        <Typography
                                                            sx={{ display: 'inline', color: "#888" }}
                                                            component="span"
                                                            variant="body2"
                                                            color="text.primary"
                                                        >
                                                            Số lượng:
                                                        </Typography>
                                                        {" " + d.quantity}
                                                    </Fragment>
                                                } />
                                            <ListItemText primary={d.price.toLocaleString() + " VND"}
                                                          style={{ textAlign: "end", color: "#888" }} />
                                        </ListItemButton>
                                    </Link>
                                </ListItem>
                            ))}
                            <Divider />
                        </List>
                        <Grid container justifyContent={"space-between"}>
                            <Typography variant={"h4"}>
                                <Typography sx={{ fontWeight: "bolder" }}>Tổng Tiền: </Typography>
                                {o.total.toLocaleString() + " VND"}
                            </Typography>
                            <Typography>
                                {displayType == UserRole.USER && <Typography variant={"h6"}
                                                                             style={{ color: "#5aaa14" }}>+ {o.reward} điểm</Typography>}
                                <Typography></Typography>
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>
            ))}
        </Grid>
    )
})
