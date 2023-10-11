import React, { FC } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { Delete, Edit, MoreVert } from "@mui/icons-material";
import { TreeViewData } from "../../stores/CategoryStore";

export const OptionalForTreeViewItem: FC<{data: TreeViewData}> = ({ data }) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVert />
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        padding: 0
                        // maxHeight: ITEM_HEIGHT * 4.5,
                        // width: '20ch',
                    },
                }}
            >
                <MenuItem key="edit" onClick={handleClose}>
                    <Edit fontSize="small" color="warning"/>
                </MenuItem>
                <MenuItem key="delete" onClick={handleClose}>
                    <Delete fontSize="small" color="error"/>
                </MenuItem>
            </Menu>
        </div>
    );
};