import { observer } from "mobx-react-lite";
import { Box, Button, Grid, Icon, Typography } from "@mui/material";
import { theme, TRANSLATE_TERMS } from "../../utils";
import { OptionalForTreeViewItem } from "./OptionalForTreeViewItem";
import React, { FC, MouseEvent } from "react";
import { TreeViewData } from "../../models";
import styled from "@emotion/styled";

const Root = styled(Grid)({
    "&": {
        alignItems: "center"
    },
})

export const CategoryView: FC<{data: TreeViewData, isAdd: boolean, nodeId: string, handleExpansion: Function}> = observer(({ data, isAdd, nodeId, handleExpansion }) => {
    const labelInfo = data.getChildCount();
    const labelText = data.name;

    const handleExpansionClick = (
        event: React.MouseEvent<HTMLDivElement>,
    ) => {
        handleExpansion(event);
    };

    const addNew = (event: MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        data.addNew();
    };

    return <Root container>
        <Button sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0, flexGrow: 1, px: theme.spacing(2) }} component={Grid} onClick={isAdd ? addNew : handleExpansionClick} color={"inherit"}>
            <Box color="inherit" sx={{ mr: 1, fontSize: 40 }}>
                <Icon className="material-icons-two-tone">{isAdd ? "add" : data.icon}</Icon>
            </Box>
            <Typography variant={"subtitle1"} sx={{ fontWeight: 'inherit', flexGrow: 1 }}>
                {isAdd ? TRANSLATE_TERMS.ADD_CATEGORY_PREFIX(labelText) : labelText}
            </Typography>
            <Typography variant="caption" color="inherit">
                {isAdd || labelInfo == 0 ? "" : labelInfo}
            </Typography>
        </Button>
        {!isAdd && <OptionalForTreeViewItem data={data} nodeId={nodeId} />}
    </Root>
})