import { FC, useCallback, useEffect } from "react";

import { BasicLayout } from "../../layouts/common";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores";
import { setTitle, TRANSLATE_TERMS } from "../../utils";
import { TreeView, treeViewClasses } from "@mui/x-tree-view";
import { StyledTreeItem } from "../../components/TreeView";
import { TreeViewData } from "../../models";
import { Divider, Paper, Typography } from "@mui/material";
import { styled } from "@mui/system";

const Root = styled(Paper)(({ theme }) => ({

    "&": {
        padding: theme.spacing(5)
    },
    [`& .${treeViewClasses.root}`]: { flexGrow: 1, maxWidth: "400px", overflowY: 'auto' }
}))

export const Categories: FC = observer(() => {
    const { sCategories } = useStore();

    useEffect(() => {
        setTitle("Quản lý thể loại");
    }, [])

    const load = useCallback(() => {
        sCategories.init();
    }, [sCategories]);

    useEffect(() => {
        load();
    }, [load]);

    const renderNode = (node: TreeViewData) => {
        return <StyledTreeItem key={node._id} nodeId={node._id} data={node}>
            {node.isView && node.children.length > 0 && <TreeView aria-label="Category Tree View">
                {node.children.map(renderNode)}
            </TreeView>}
            {!node.isAddNew && node.isView && <StyledTreeItem key={"ADD_" + node._id} nodeId={"ADD_" + node._id} data={node} isAdd={true} />}
        </StyledTreeItem>
    }


    return <BasicLayout>
        <Root elevation={2}>
            <Typography variant={"h4"}>{TRANSLATE_TERMS.CATEGORY_MANAGEMENT_TEXT}</Typography>
            <Divider />
            <TreeView
                aria-label="Category Tree View">
                {sCategories.treeViewData.children.map(renderNode)}
                <StyledTreeItem key={"ADD_" + sCategories.treeViewData._id}
                                nodeId={"ADD_" + sCategories.treeViewData._id} data={sCategories.treeViewData}
                                isAdd={true} />
            </TreeView>
        </Root>
    </BasicLayout>
});