import { TreeItem, treeItemClasses, TreeItemContentProps, TreeItemProps, useTreeItem } from "@mui/x-tree-view";
import { styled } from "@mui/system";
import React from "react";
import { observer } from "mobx-react-lite";
import { CategoryEditor } from "./CategoryEditor";
import { CategoryView } from "./CategoryView";
import { TreeViewData } from "../../models";
import { Box } from "@mui/material";


declare module 'react' {
    interface CSSProperties {
        '--tree-view-color'?: string;
        '--tree-view-bg-color'?: string;
    }
}

type StyledTreeItemProps = TreeItemProps & {
    data: TreeViewData,
    isAdd?: boolean,
};

/**
 * Using MUI {@link styled} custom stylesheet for {@link TreeItem}
 * @see {@link https://mui.com/system/styled/#introduction|Styled MUI Document}
 */
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

/**
 * Custom Props for {@link CustomContentProps}
 * Addition properties for props off {@link ContentComponent}
 */
type CustomContentProps = TreeItemContentProps & {
    data: TreeViewData,
    isAdd?: boolean,
}

/**
 * ComponentContent custom for {@link TreeItem}
 * @see {@link https://mui.com/x/react-tree-view/#contentcomponent-prop|TreeView MUI document}
 */
const CustomContent = React.forwardRef(function CustomContent(
    props: CustomContentProps,
    ref
) {
    const {
        nodeId,
        data,
        isAdd
    } = props;

    const treeItemControl = useTreeItem(nodeId);

    const handleExpansionClick = (
        event: React.MouseEvent<HTMLDivElement>,
    ) => {
        treeItemControl.handleExpansion(event);
    };

    return (<>
            {data.isView ?
                <CategoryView data={data} isAdd={!!isAdd} nodeId={nodeId} handleExpansion={handleExpansionClick} /> :
                <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0, }}>
                    <CategoryEditor data={data} props={props} />
                </Box>}
        </>
    );
});

/**
 * Document for your component TreeView
 *
 * @see {@link https://mui.com/x/react-tree-view/getting-started/|TreeView MUI}
 * @see {@link https://mui.com/x/react-tree-view/#contentcomponent-prop|TreeView MUI Custom}
 */
export const StyledTreeItem = observer(React.forwardRef(function StyledTreeItem(
    props: StyledTreeItemProps,
    ref: React.Ref<HTMLLIElement>,
) {
    const {
        data,
        isAdd,
        ...other
    } = props;

    return (
        <StyledTreeItemRoot
            label={null}
            // @ts-ignore
            ContentComponent={CustomContent}
            ContentProps={{
                // @ts-ignore
                data: data,
                isAdd: isAdd
            }}
            {...other}
            ref={ref} />
    );
}));

