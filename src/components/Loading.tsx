import { FC } from "react";
import { Backdrop, CircularProgress } from "@mui/material";
import { BasicLayout } from "../layouts/common";

export const Loading: FC<{}> = () => {
	return (
		<BasicLayout>
			<Backdrop
				sx={{
					color: "#fff",
					zIndex: (theme) => theme.zIndex.drawer + 1,
				}}
				open={true}
			>
				<CircularProgress color="primary" />
			</Backdrop>
		</BasicLayout>
	);
};
