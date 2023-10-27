import { FC, useCallback, useEffect } from "react";

import { BasicLayout } from "../../layouts/common";
import { observer } from "mobx-react-lite";
import { useStore } from "@stores";
import { setTitle, TRANSLATE_TERMS } from "@utils";
import { treeViewClasses } from "@mui/x-tree-view";
import { TreeCategory } from "@components/TreeView";
import { Divider, Grid, IconButton, Paper, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { Category } from "@models";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Root = styled(Paper)(({ theme }) => ({
    "&": {
        padding: theme.spacing(5)
    },
    [`& .${treeViewClasses.root}`]: { flexGrow: 1, maxWidth: "400px", overflowY: 'auto' }
}))

export const Categories: FC = observer(() => {
    const { sCategories } = useStore();
    const navigator = useNavigate();

    useEffect(() => {
        setTitle("Quản lý thể loại");
    }, [])

    const load = useCallback(() => {
        sCategories.init();
    }, [sCategories]);

    const selectedCategory = (category: Category) => {

    }

    useEffect(() => {
        load();
    }, [load]);

    return <BasicLayout>
        <Root elevation={2}>
            <Grid container justifyContent={"space-between"}>
                <Typography variant={"h4"}>{TRANSLATE_TERMS.CATEGORY_MANAGEMENT_TEXT}</Typography>
                <IconButton onClick={() => {
                    navigator("/categories/new")
                }}>
                    <Add color={"primary"} />
                </IconButton>
            </Grid>
            <Divider />
            <TreeCategory root={sCategories.treeViewData} isView={false} onClickLeaf={selectedCategory} />
        </Root>
    </BasicLayout>
});