import { observer } from "mobx-react-lite";
import { Box, Icon, Typography } from "@mui/material";
import { TRANSLATE_TERMS } from "../../utils";
import { OptionalForTreeViewItem } from "./OptionalForTreeViewItem";
import React, { FC } from "react";
import { TreeViewData } from "../../stores/CategoryStore";

export const CategoryView: FC<{data: TreeViewData, isAdd: boolean}> = observer(({ data, isAdd }) => {

    const labelInfo = data.getChildCount();
    const labelText = data.name;

    return <>
    <Box color="inherit" sx={{ mr: 1, fontSize: 40 }}>
            <Icon className="material-icons-two-tone">{isAdd ? "add" : data.icon}</Icon>
        </Box>

        <Typography variant={"subtitle1"} sx={{ fontWeight: 'inherit', flexGrow: 1 }}>
            {isAdd ? TRANSLATE_TERMS.ADD_CATEGORY_PREFIX(labelText) : labelText}
        </Typography>
        <Typography variant="caption" color="inherit">
            {isAdd || labelInfo == 0 ? "" : labelInfo}
        </Typography>
        {!isAdd && <OptionalForTreeViewItem data={data} />}
    </>
})