import { FC, ReactNode } from "react";
import { Container } from "@mui/material";

import { Appbar } from "../components/Navbar/appbar";
import { UserNavbar } from "../components/user";

import "./common.scss";
import { store, useStore } from "../stores";
import { UserRole } from "../models";
import { observer } from "mobx-react";

export const BasicLayout: FC<{ children: ReactNode }> = observer(
	({ children }) => {
		const { role, isLoading } = useStore();

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
// <>
// <div>
//     <p>ABC</p>
// </div>
// <div>
//     <p>ABC</p>
// </div>
// <div>
//     <p>ABC</p>
// </div>
// </>

// <div id="root">
// 		<div>
//  	   <p>ABC</p>
// 		</div>
// 		<div>
//     		<p>ABC</p>
// 		</div>
// 		<div>
//     		<p>ABC</p>
// 		</div>
// </div>