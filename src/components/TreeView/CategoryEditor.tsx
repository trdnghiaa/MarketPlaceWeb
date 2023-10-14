import { observer } from "mobx-react-lite";
import React, { FC, useState } from "react";
import { Divider, dividerClasses, Grid, IconButton, iconButtonClasses, InputBase, inputBaseClasses, Paper, paperClasses, Tooltip } from "@mui/material";
import { MESSAGE_TERMS, theme, TRANSLATE_TERMS } from "../../utils";
import { Add, HighlightOff } from "@mui/icons-material";
import { IconPopoverSelect } from "../IconPopoverSelect";
import { useSnackbar } from "notistack";
import { useStore } from "../../stores";
import { TreeViewData } from "../../models";
import styled from "@emotion/styled";

const Root = styled(Grid)({
    "&": {
        width: "100%"
    },
    [`& .${paperClasses.root}`]: {
        p: '2px 4px', display: 'flex', alignItems: 'center', width: "100%",
        [`& .${inputBaseClasses.root}`]: {
            marginLeft: 1, fontSize: theme.typography.subtitle1.fontSize, flexGrow: 1,
        },
        [`& .${iconButtonClasses.root}`]: { padding: '10px' },
        [`& .${dividerClasses.root}`]: { height: 28, m: 0.5 }
    },


})


export const CategoryEditor: FC<{data: TreeViewData, props: any}> = observer(({ data, props }) => {
    const [submitting, setSubmitting] = useState(false);

    const { enqueueSnackbar } = useSnackbar();

    const { sCategories } = useStore();


    const cancelHandle = () => {
        if (data._id) {
            data.isView = true;
        } else {
            console.log("remove")
            data.removeInTree();
        }
    }

    const createHandle = async () => {
        setSubmitting(true);

        try {
            data.save().then(([err, data]) => {
                if (err) throw err;

                enqueueSnackbar(MESSAGE_TERMS.get(data.message), { variant: "success" });
                sCategories.init();
                setSubmitting(false);
            }).catch((e) => {
                throw e;
            });
        } catch (e) {
            setSubmitting(false);
            enqueueSnackbar(MESSAGE_TERMS.get((e instanceof Error ? e.message : e) as string), { variant: "error" });
        }

    }

    const setIcon = (e: string) => {
        data.icon = e;
    };

    return <Root container>
        <Paper component="form">
            <IconPopoverSelect setIcon={setIcon} icon={data.icon} />
            <InputBase
                placeholder={TRANSLATE_TERMS.ENTER_CATEGORY_NAME}
                inputProps={{ 'aria-label': TRANSLATE_TERMS.ENTER_CATEGORY_NAME }}
                value={data.name}
                onChange={(event) => {
                    data.set_name(event.currentTarget.value);
                }}
            />
            <Tooltip title={TRANSLATE_TERMS.ADD}>
                <IconButton disabled={submitting} color="success" type="button" aria-label="add"
                            onClick={createHandle}>
                    <Add />
                </IconButton>
            </Tooltip>
            <Divider orientation="vertical" />
            <Tooltip title={TRANSLATE_TERMS.CANCEL}>
                <IconButton color="error" aria-label="cancel" onClick={cancelHandle}>
                    <HighlightOff />
                </IconButton>
            </Tooltip>
        </Paper>
    </Root>
})