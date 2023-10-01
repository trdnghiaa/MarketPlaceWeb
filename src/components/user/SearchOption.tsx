
import {
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Paper,
} from "@mui/material";
import { FC } from "react";

export const SearchOption: FC<{renderOption: Function}> = ({renderOption}) => {
	return (
		<Paper
			sx={{
				width: "30%",
				bgcolor: "background.paper",
				background: "rgba(242,243,243,1.00)",
			}}
		>
			<nav aria-label="main mailbox folders">
				<List>
					{/*{SERVICES.map(({code, name, icon}) => (*/}
					{/*	<ListItem button key={code} onClick={() => {*/}
					{/*		renderOption(code)*/}
					{/*	}}>*/}
					{/*		<ListItemIcon>*/}
					{/*			<img*/}
					{/*				src={icon}*/}
					{/*				alt="Service Icon"*/}
					{/*			></img>*/}
					{/*		</ListItemIcon>*/}
					{/*		<ListItemText primary={name} />*/}
					{/*	</ListItem>*/}
					{/*))}*/}
				</List>
			</nav>
		</Paper>
	);
};
