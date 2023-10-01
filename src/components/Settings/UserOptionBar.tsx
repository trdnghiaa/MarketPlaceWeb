import {FC, useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import {Link, useNavigate, useParams} from "react-router-dom";
import {Divider, ListItemText, MenuItem, MenuList} from "@mui/material";

export const UserOptionBar: FC = observer(({}) => {
    return <MenuList dense>
        <MenuItem>
            <Link to="/detail" color="black">
                <ListItemText>
                    Personal Infomation
                </ListItemText>
            </Link>
        </MenuItem>
        <MenuItem>
            <Link to="/detail/reward" color="black">
                <ListItemText>Reward</ListItemText>
            </Link>
        </MenuItem>
        <Divider/>
        <MenuItem>
            <Link
                to="/detail/order-history"
                color="black"
            >
                <ListItemText>
                    Order History
                </ListItemText>
            </Link>
        </MenuItem>
        <MenuItem>
            <Link to="/detail/orders" color="black">
                <ListItemText>List Ordrer</ListItemText>
            </Link>
        </MenuItem>
        <MenuItem>
            <Link to="/detail/voucher" color="black">
                <ListItemText>Voucher</ListItemText>
            </Link>
        </MenuItem>
        <Divider/>
        <MenuItem>
            <Link
                to="/detail/notification"
                color="black"
            >
                <ListItemText>
                    Notification
                </ListItemText>
            </Link>
        </MenuItem>
    </MenuList>
});