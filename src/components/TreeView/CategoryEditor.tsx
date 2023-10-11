import { observer } from "mobx-react-lite";
import React, { FC, MouseEvent, useState } from "react";
import { Divider, Grid, IconButton, InputBase, Paper, Tooltip } from "@mui/material";
import { MESSAGE_TERMS, TRANSLATE_TERMS } from "../../utils";
import { Add, HighlightOff } from "@mui/icons-material";
import { TreeViewData } from "../../stores/CategoryStore";
import { IconPopoverSelect } from "../IconPopoverSelect";
import { useSnackbar } from "notistack";
import { useStore } from "../../stores";

export const CategoryEditor: FC<{data: TreeViewData}> = observer(({ data }) => {
    const [submitting, setSubmitting] = useState(false);

    const { enqueueSnackbar } = useSnackbar();

    const { sCategories } = useStore();

    const cancelHandle = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        data.removeInTree();

    }

    const createHandle = async () => {
        setSubmitting(true);

        data.save().then(([err, data]) => {
            if (err) throw err;

            enqueueSnackbar(MESSAGE_TERMS.get(data.message), { variant: "success" });
            sCategories.init();
        }).catch((e) => {
            setSubmitting(true);
            enqueueSnackbar(MESSAGE_TERMS.get(e.message), { variant: "error" });
        });

    }

    const setIcon = (e: string) => {
        data.icon = e;
    };

    return <Grid direction={"column"} sx={{ width: "100%", maxHeight: "50vh" }}>
        <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}>
            <IconPopoverSelect setIcon={setIcon} icon={data.icon} />
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder={TRANSLATE_TERMS.ENTER_CATEGORY_NAME}
                inputProps={{ 'aria-label': TRANSLATE_TERMS.ENTER_CATEGORY_NAME }}
                value={data.name}
                onChange={(event) => {
                    data.set_name(event.currentTarget.value);
                }}
            />
            <Tooltip title={TRANSLATE_TERMS.ADD}>
                <IconButton disabled={submitting} color="success" type="button" sx={{ p: '10px' }} aria-label="add"
                            onClick={createHandle}>
                    <Add />
                </IconButton>
            </Tooltip>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <Tooltip title={TRANSLATE_TERMS.CANCEL}>
                <IconButton color="error" sx={{ p: '10px' }} aria-label="cancel" onClick={cancelHandle}>
                    <HighlightOff />
                </IconButton>
            </Tooltip>
        </Paper>
    </Grid>
})