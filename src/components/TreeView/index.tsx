import { TreeItem, treeItemClasses, TreeItemProps } from "@mui/x-tree-view";
import { styled } from "@mui/system";
import { Box, useTheme } from "@mui/material";
import React, { MouseEvent } from "react";
import { observer } from "mobx-react-lite";
import { TreeViewData } from "../../stores/CategoryStore";
import { CategoryEditor } from "./CategoryEditor";
import { CategoryView } from "./CategoryView";

declare module 'react' {
    interface CSSProperties {
        '--tree-view-color'?: string;
        '--tree-view-bg-color'?: string;
    }
}

type StyledTreeItemProps = TreeItemProps & {
    bgColor?: string;
    bgColorForDarkMode?: string;
    color?: string;
    colorForDarkMode?: string;
    data: TreeViewData,
    isAdd?: boolean
};

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
    color: theme.palette.text.secondary,
    [`& .${treeItemClasses.content}`]: {
        color: theme.palette.text.secondary,
        borderTopRightRadius: theme.spacing(2),
        borderBottomRightRadius: theme.spacing(2),
        paddingRight: theme.spacing(1),
        fontWeight: "500",
        '&.Mui-expanded': {
            fontWeight: "500",
        },
        '&:hover': {
            backgroundColor: theme.palette.action.hover,
        },
        '&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused': {
            backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
            color: 'var(--tree-view-color)',
        },
        [`& .${treeItemClasses.label}`]: {
            fontWeight: 'inherit',
            color: 'inherit',
        },
    },
    [`& .${treeItemClasses.group}`]: {
        marginLeft: theme.spacing(4),
        [`& .${treeItemClasses.content}`]: {
            paddingLeft: theme.spacing(0),
        },
    },
})) as unknown as typeof TreeItem;

export const StyledTreeItem = observer(React.forwardRef(function StyledTreeItem(
    props: StyledTreeItemProps,
    ref: React.Ref<HTMLLIElement>,
) {
    const { palette } = useTheme();
    const {
        bgColor,
        color,
        data,
        isAdd,
        colorForDarkMode,
        bgColorForDarkMode,
        ...other
    } = props;

    const styleProps = {
        '--tree-view-color': palette.mode !== 'dark' ? color : colorForDarkMode,
        '--tree-view-bg-color': palette.mode !== 'dark' ? bgColor : bgColorForDarkMode,
    };


    function addNew(event: MouseEvent<HTMLLIElement>) {
        event.preventDefault();
        data.addNew();
    }

    return (
        <StyledTreeItemRoot
            onClick={isAdd ? addNew : (event) => {}}
            label={
                <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0, }}>
                    {data.isView ? <CategoryView data={data} isAdd={!!isAdd} /> : <CategoryEditor data={data} />}
                </Box>
            }
            style={styleProps}
            {...other}
            ref={ref} />
    );
}));

