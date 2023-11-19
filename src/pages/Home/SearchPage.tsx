import { FC, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { BasicLayout } from "src/layouts/common";
import { useSearchParams } from "react-router-dom";
import { useStore } from "src/stores";
import { ListPost } from "src/components/Explores/ListPost";
import { Category } from "src/models";
import { Pagination } from "@mui/material";
import { styled } from "@mui/system";

const PaginationStyled = styled(Pagination)(({ theme }) => ({
    "&": {
        display: "flex",
        justifyContent: "center",
        margin: theme.spacing(2)
    }
}))

export const SearchPage: FC<{}> = observer(({}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { sSearch, sCategories } = useStore();

    useEffect(() => {
        sSearch.set_filter({});
        searchParams.forEach((value, key) => {
            if (key == "query") {
                sSearch.set_query(value);
            } else {
                sSearch.set_filterValue(key == "category" ? key : `advanceInfo.${key}`, value);
            }
        });

        if (!searchParams.get("category"))
            sSearch.set_category(new Category());
        sSearch.init();
    }, [searchParams, sSearch.page])
    return <BasicLayout>
        <ListPost posts={sSearch.posts} isLoading={sSearch.isLoading} />
        <PaginationStyled count={sSearch.totalPages} page={sSearch.page} onChange={(e, v) => {
            sSearch.set_page(v);
        }} />
    </BasicLayout>
});