import { TreeItem, treeItemClasses, TreeItemContentProps, TreeItemProps, TreeView, useTreeItem } from "@mui/x-tree-view";
import { styled } from "@mui/system";
import React, { FC, ForwardedRef } from "react";
import { observer } from "mobx-react-lite";
import { CategoryEditor } from "./CategoryEditor";
import { CategoryView } from "./CategoryView";
import { Category, TreeViewData } from "src/models";
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
    isLeaf?: boolean,
    isView?: boolean
    onClickLeaf?: (category: Category) => void,
    onSelectItem?: (category: Category) => void,
    currentSelect?: Category,
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
    isView: boolean,
    onClickLeaf?: (category: Category) => void,
    onSelectItem?: (category: Category) => void,
    currentSelect?: Category
}

/**
 * ComponentContent custom for {@link TreeItem}
 * @see {@link https://mui.com/x/react-tree-view/#contentcomponent-prop|TreeView MUI document}
 */
const CustomContent = React.forwardRef(function CustomContent(
    props: CustomContentProps,
    ref: ForwardedRef<any>
) {
    const {
        nodeId,
        data,
        isAdd,
        isView,
        onClickLeaf,
        onSelectItem, currentSelect
    } = props;

    const treeItemControl = useTreeItem(nodeId);

    const handleExpansionClick = (
        event: React.MouseEvent<HTMLDivElement>,
    ) => {
        treeItemControl.handleExpansion(event);
    };

    return (<>
            {data.isView ?
                <CategoryView data={data} isAdd={!!isAdd} nodeId={nodeId} isView={isView}
                              handleExpansion={handleExpansionClick}
                              onClick={onClickLeaf ? onClickLeaf : (category) => {}} onSelect={onSelectItem}
                              currentSelect={currentSelect} /> :
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
        isView,
        onClickLeaf,
        onSelectItem,
        currentSelect,
        ...other
    } = props;

    return (
        <StyledTreeItemRoot
            label={null}
            // @ts-ignore
            ContentComponent={CustomContent}
            ContentProps={{
                // @ts-ignore
                data,
                isAdd,
                isView,
                onClickLeaf, onSelectItem, currentSelect
            }}
            {...other}
            ref={ref} />
    );
}));

export const TreeCategory: FC<{root: TreeViewData, isView: boolean, onClickLeaf?: (category: Category) => void, onSelectItem?: (category: Category) => void, currentSelect?: Category}> = observer(({ root, isView, ...props }) => {
    const renderNode = (node: TreeViewData) => {
        return <StyledTreeItem key={node._id} nodeId={node._id} data={node} isView={isView} {...props}>
            {node.isView && node.children.length > 0 && <TreeView aria-label="Category Tree View">
                {node.children.map(renderNode)}
            </TreeView>}
            {!node.isAddNew && node.isView && !isView &&
                <StyledTreeItem key={"ADD_" + node._id} nodeId={"ADD_" + node._id} data={node} isAdd={true}
                                onClick={(e) => {console.log(e)}} />}
        </StyledTreeItem>
    }

    return <TreeView aria-label="Category Tree View">
        {root.children.map(renderNode)}
        {!isView && <StyledTreeItem key={"ADD_" + root._id} nodeId={"ADD_" + root._id} data={root} isAdd={true} />}
    </TreeView>;
})

