import { Paper } from "@mui/material";
import React, {FC} from "react";
import { OrderResult } from "./orderResult";
import {UserRole} from "../models/types";
import {Order} from "../models/Order";

export const UserOrderHistory: FC<{displayType: UserRole | string, orders: Order[]}> = ({displayType, orders}) => {
	return (
		<Paper elevation={8} sx={{ display: "flex", flexWrap: "wrap", mt: 2, mb: 2, padding: 1 }}>
			<h2 style={{ margin: "1rem" }}>Lịch sử giao dịch</h2>
			<OrderResult displayType={displayType} orders={orders}/>
		</Paper>
	);
};
