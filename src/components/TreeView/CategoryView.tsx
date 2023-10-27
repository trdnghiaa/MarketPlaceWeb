import { observer } from "mobx-react-lite";
import { Box, Button, Checkbox, Grid, Icon, Typography } from "@mui/material";
import { theme, TRANSLATE_TERMS } from "@utils";
import { OptionalForTreeViewItem } from "./OptionalForTreeViewItem";
import React, { ChangeEvent, FC, MouseEvent } from "react";
import { Category, TreeViewData } from "@models";
import styled from "@emotion/styled";
import { RadioButtonChecked, RadioButtonUnchecked } from "@mui/icons-material";
import { createSearchParams, useNavigate } from "react-router-dom";

const Root = styled(Grid)({
    "&": {
        alignItems: "center"
    },
})

export const CategoryView: FC<{data: TreeViewData, isAdd: boolean, nodeId: string, handleExpansion: Function, isView: boolean, onClick: (category: Category) => void, onSelect?: (category: Category) => void, currentSelect?: Category}> = observer(({ data, isAdd, nodeId, handleExpansion, isView, onClick, onSelect, currentSelect }) => {
    const navigator = useNavigate();
    const labelInfo = data.getChildCount();
    const labelText = data.name;

    const handleExpansionClick = (
        event: React.MouseEvent<HTMLDivElement>,
    ) => {
        // isLeaf onClick
        if (onClick && data.children.length == 0) {
            onClick(data.category);
        }
        handleExpansion(event);
    };

    const addNew = (event: MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        navigator({
            pathname: "/categories/new",
            search: createSearchParams({
                parent: data._id
            }).toString()
        });
    };

    const checkboxChangeHandle = (event: ChangeEvent<HTMLInputElement>) => {
        if (onSelect) {
            if (event.target.checked) {
                onSelect(data.category);
            } else {
                onSelect(new Category());
            }
        } else {
            throw new Error("onSelectItem is not implement");
        }

    }

    return <Root container>
        {onSelect && currentSelect && <Checkbox onChange={checkboxChangeHandle} icon={<RadioButtonUnchecked />}
                                                checkedIcon={<RadioButtonChecked />}
                                                checked={currentSelect._id == data._id} />}
        <Button sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0, flexGrow: 1, px: theme.spacing(2) }}
                component={Grid} onClick={isAdd ? addNew : handleExpansionClick} color={"inherit"}>
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
        {!isAdd && !isView && <OptionalForTreeViewItem data={data} nodeId={nodeId} />}
    </Root>
})