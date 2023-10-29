import { FC } from "react";
import { MenuItem as MenuItemType } from "src/models/types";
import { MenuItem, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

export const DropdownSetting: FC<{menu: MenuItemType[], closeHandle: Function}> = ({ menu, closeHandle }) => {
    const navigator = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    return <>{menu.map(({ title, handle, link, icon }) => (
        <MenuItem
            key={title}
            onClick={() => {
                if (handle) handle((err: {message: string}) => {
                    enqueueSnackbar(err.message, { variant: "error" });
                });
                else if (link) {
                    navigator(link)
                } else
                    closeHandle()
            }}
        >
            <Typography
                textAlign="center"
                sx={{
                    width: "fit-content",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                {icon && <img src={icon} style={{ marginRight: "1rem" }} alt={""} />}
                {title}
            </Typography>
        </MenuItem>
    ))}</>
}