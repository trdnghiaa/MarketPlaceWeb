import { FC, useEffect } from "react";

import { BasicLayout } from "../../layouts/common";
import { observer } from "mobx-react-lite";
import { useSnackbar } from "notistack";
import { useStore } from "../../stores";
import { setTitle } from "../../utils";
import { useNavigate } from "react-router-dom";
import { TreeView } from "@mui/x-tree-view";
import { TreeViewData } from "../../stores/CategoryStore";
import { StyledTreeItem } from "../../components/TreeView";

export const Categories: FC<{}> = observer(({}) => {
    const { sCategories} = useStore();

    useEffect(() => {
        setTitle("Quản lý thể loại");
    }, [])

    function load() {
        sCategories.init();
    }

    useEffect(() => {
        load();
    }, []);

    const renderNode = (node: TreeViewData) => {
        return <StyledTreeItem key={node._id} nodeId={node._id} data={node} color="#1a73e8" bgColor="#e8f0fe">
            <TreeView
                aria-label="file system navigator"
                defaultEndIcon={<div style={{ width: 24 }} />}
                sx={{ flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}>
                {node.children.map(renderNode)}
            </TreeView>
            {!node.isAddNew &&
                <StyledTreeItem key={"ADD_" + node._id} nodeId={"ADD_" + node._id} data={node} isAdd={true}
                                color="#1a73e8" bgColor="#e8f0fe" />}
        </StyledTreeItem>
    }


    return <BasicLayout>
        <TreeView
            aria-label="file system navigator"
            defaultEndIcon={<div style={{ width: 24 }} />}
            sx={{ height: "100%", flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
        >
            {sCategories.treeViewData.children.map(renderNode)}
            <StyledTreeItem key={"ADD_" + sCategories.treeViewData._id} nodeId={"ADD_" + sCategories.treeViewData._id} data={sCategories.treeViewData} isAdd={true} color="#1a73e8" bgColor="#e8f0fe" />
        </TreeView>
    </BasicLayout>
});