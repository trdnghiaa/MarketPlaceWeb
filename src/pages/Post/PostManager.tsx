import { FC, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { BasicLayout } from "src/layouts/common";
import { Autocomplete, Button, FormControl, Grid, InputLabel, OutlinedInput, Paper, TextField, Typography } from "@mui/material";
import { Category } from "src/models";
import { useStore } from "src/stores";
import { TRANSLATE_TERMS } from "src/utils";
import { ListPost } from "src/components/Explores/ListPost";
import { useDebounce } from "src/utils/useBounce";
import { PostStatusSelector } from "src/components/Post/PostStatusSelector";


export const PostManager: FC<{}> = observer(({}) => {
    const { sPostManager, sCategories } = useStore();
    const debounceSearch = useDebounce(sPostManager.search, 600);

    useEffect(() => {
        sPostManager.init();
    }, [sPostManager.filterStatus, debounceSearch, sPostManager.filterCategory]);

    function selectFilterStatus(e: string) {
        sPostManager.set_filterStatus(e);
    }

    const loadMoreHandle = () => {
        sPostManager.set_page(sPostManager.page + 1);
        sPostManager.loadMore();
    };

    return <BasicLayout>
        <Paper>
            <Grid container spacing={1} sx={{ mb: 1 }} direction={{
                xs: "column", md: "row"
            }}>
                <Grid item xs={4} container spacing={1}>
                    <PostStatusSelector selectHandle={selectFilterStatus} selectedValue={sPostManager.filterStatus} />
                </Grid>
                <Grid item xs={4}>
                    <Autocomplete
                        renderInput={(params) =>
                            <TextField {...params} label={TRANSLATE_TERMS.CHOOSE_CATEGORY_PLACEHOLDER} fullWidth />}
                        options={new Array(...sCategories.categories).sort(({ parent: a }, { parent: b }) => {
                            return a === "ROOT" && b !== "ROOT" ? -1 : a == "ROOT" && b === "ROOT" ? 1 : 0
                        })}
                        disablePortal
                        groupBy={(option) => sCategories.findById(option.parent).name}
                        id={"category"}
                        value={sPostManager.filterCategory}
                        getOptionLabel={(option) => option.name}
                        onChange={(e, value) => {sPostManager.set_filterCategory(new Category(value))}}
                        slotProps={{ paper: { sx: { padding: 1 } } }}
                        noOptionsText={TRANSLATE_TERMS.NO_OPTION_TEXT} />
                </Grid>
                <Grid item xs={4}>
                    <FormControl fullWidth>
                        <InputLabel htmlFor={"search"}>
                            {TRANSLATE_TERMS.SEARCH_POST}
                        </InputLabel>
                        <OutlinedInput
                            id={"search"}
                            value={sPostManager.search}
                            onChange={(event) => {
                                const { value } = event.target;
                                sPostManager.set_search(value);
                            }}
                            label={TRANSLATE_TERMS.SEARCH_POST}
                            required
                        />
                    </FormControl>
                </Grid>
            </Grid>
            {sPostManager.count != 0 && <Typography
                variant={"h5"}
                paragraph
                dangerouslySetInnerHTML={{ __html: TRANSLATE_TERMS.get("SEARCH_RESULT_POST_TEXT", { count: sPostManager.count }) }} />}
            <ListPost posts={sPostManager.posts} isLoading={sPostManager.isLoading} />
            <Grid container justifyContent={"center"}>
                {
                    sPostManager.isShowLoadMore() &&
                    <Grid item sx={{ mt: 2 }}><Button variant={"outlined"}
                                                      onClick={loadMoreHandle}>{TRANSLATE_TERMS.LOAD_MORE}</Button></Grid>
                }
            </Grid>
        </Paper>
    </BasicLayout>
});