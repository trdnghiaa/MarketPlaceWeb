import React, { FC, MouseEvent } from "react";
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { Delete, Edit, MoreVert } from "@mui/icons-material";
import { MESSAGE_TERMS, TRANSLATE_TERMS } from "@utils";
import { useSnackbar } from "notistack";
import { DialogType, useStore } from "@stores";
import { TreeViewData } from "@models";
import { useNavigate } from "react-router-dom";

export const OptionalForTreeViewItem: FC<{data: TreeViewData, nodeId: string}> = ({ data }) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const { enqueueSnackbar } = useSnackbar();
    const { sCategories, sDialog } = useStore();
    const navigator = useNavigate();

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
        navigator(`/categories/${data._id}/edit`);
    }

    const onDeleteHandle = () => {
        try {
            const descriptionUsed = data.children.length ? "DELETE_CATEGORY_DESCRIPTION_WITH_CHILDREN" : "DELETE_CATEGORY_DESCRIPTION";

            sDialog.openDialog(DialogType.confirm, TRANSLATE_TERMS.DELETE_CATEGORY_QUESTION_TEXT, TRANSLATE_TERMS.get(descriptionUsed, { name: data.name, child: data.getNameOfChild(true) }), () => {
                data.delete().then(([err, data]) => {
                    if (err) throw err;

                    enqueueSnackbar(MESSAGE_TERMS.get(data.message), { variant: "success" });
                    sCategories.init();
                }).catch((e) => {
                    enqueueSnackbar(MESSAGE_TERMS.get(e.message), { variant: "error" });
                });
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