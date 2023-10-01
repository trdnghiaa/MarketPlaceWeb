import { Container } from "@mui/material";
import { ADVERTISEMENTS } from "../../utils/constraint";

export const AdsSlider = () => {
	return (
		<div
			style={{
				background: "rgba(73,179,232,1.00)",
				padding: "2rem",
				marginBottom: "1rem",
			}}
		></div>
	);
};

function AdvertisementItem({ src }: any) {
	return (
		<div style={{ width: "5rem", height: "4rem" }}>
			<img src={src} alt="Ads" />
		</div>
	);
}
