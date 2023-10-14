import React, { FC, MouseEvent } from "react";
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { Delete, Edit, MoreVert } from "@mui/icons-material";
import { MESSAGE_TERMS, TRANSLATE_TERMS } from "../../utils";
import { useSnackbar } from "notistack";
import { useStore } from "../../stores";
import { TreeViewData } from "../../models";

export const OptionalForTreeViewItem: FC<{data: TreeViewData, nodeId: string}> = ({ data }) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const { enqueueSnackbar } = useSnackbar();
    const { sCategories } = useStore();

    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent) => {
        event.preventDefault();
        setAnchorEl(event.currentTarget as HTMLElement);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const onEditHandle = (event: MouseEvent<HTMLLIElement>) => {
        event.preventDefault();
        data.isView = false;
    }

    const onDeleteHandle = () => {
        try {
            data.delete().then(([err, data]) => {
                if (err) throw err;

                enqueueSnackbar(MESSAGE_TERMS.get(data.message), { variant: "success" });
                sCategories.init();
            }).catch((e) => {
                enqueueSnackbar(MESSAGE_TERMS.get(e.message), { variant: "error" });
            });
        } catch (e) {
            enqueueSnackbar(MESSAGE_TERMS.get((e instanceof Error ? e.message : e) as string), { variant: "error" });
        }
    }

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
            <Menu id="long-menu" MenuListProps={{
                'aria-labelledby': 'long-button',
            }} anchorEl={anchorEl} open={open} onClose={handleClose} slotProps={{
                paper: {
                    style: {
                        padding: 0
                    },
                }
            }}>
                <MenuItem key="edit" onClick={onEditHandle} disableRipple>
                    <ListItemIcon>
                        <Edit fontSize="small" />
                    </ListItemIcon>

                    <ListItemText>{TRANSLATE_TERMS.EDIT}</ListItemText>
                </MenuItem>
                <MenuItem key="delete" onClick={onDeleteHandle} disableRipple>
                    <ListItemIcon>
                        <Delete fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>{TRANSLATE_TERMS.DELETE}</ListItemText>
                </MenuItem>
            </Menu>
        </div>
    );
};