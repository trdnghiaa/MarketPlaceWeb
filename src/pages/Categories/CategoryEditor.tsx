import { FC, useCallback, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { BasicLayout } from "src/layouts/common";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { MESSAGE_TERMS, TRANSLATE_TERMS } from "src/utils";
import { Category } from "src/models";
import { useStore } from "src/stores";
import { Backdrop, Button, CircularProgress, FormControl, Grid, InputLabel, OutlinedInput, Paper, styled, Typography } from "@mui/material";
import { IconPopoverSelect } from "src/components/IconPopoverSelect";
import { AdvanceOptionCreator } from "src/components/AdvanceOption";
import { TreeViewSelector } from "src/components/TreeView/TreeViewSelector";

const Root = styled(Paper)(({ theme }) => ({
    "&": {
        marginBottom: theme.spacing(2)
    }
}));

const currencyRegex = /\.|,|\D/gi;

export const CategoryEditor: FC = observer(({}) => {
    const [submitting, setSubmitting] = useState(false);
    const { isLoggedIn, isDone, sCategoryEditor, sCategories } = useStore();

    const { category } = useParams();
    let [searchParams, setSearchParams] = useSearchParams();
    const { enqueueSnackbar } = useSnackbar();

    const location = useLocation();
    const navigator = useNavigate();

    useEffect(() => {
        sCategoryEditor.set_isCreateNew(/\/new/i.test(location.pathname))
        if (isDone && isLoggedIn) {
            if (category && category != sCategoryEditor.category._id || sCategoryEditor.isCreateNew && sCategoryEditor.category._id) {
                sCategoryEditor.clean();
            }
            if (sCategoryEditor.isCreateNew) {
                const parent = searchParams.get("parent");
                if (parent) {
                    sCategoryEditor.set_parent(sCategories.categories.find(e => e._id == parent) || new Category());
                    setSearchParams({});
                }
            } else if (!category) {
                enqueueSnackbar(MESSAGE_TERMS.CATEGORY_ID_INVALID);
                navigator("/categories");
                return;
            }
            sCategoryEditor.init(category);
        }
    }, []);

    const saveHandle = () => {
        setSubmitting(true);
        sCategoryEditor.doSave().then((data) => {
            enqueueSnackbar(MESSAGE_TERMS.get(data.message), { variant: "success" });
        }).catch((err) => {
            enqueueSnackbar(MESSAGE_TERMS.get(err.message), { variant: "error" });
        })
        setSubmitting(false);
    }

    const dropCategoryHandle = () => {
        sCategoryEditor.set_parent(new Category());
    }

    const setCategoryHandle = useCallback((category: Category) => {
        if (category._id == sCategoryEditor.category._id) {
            enqueueSnackbar(MESSAGE_TERMS.CATEGORY_PARENT_IS_THIS, { variant: "error" });
            return;
        }
        sCategoryEditor.set_parent(category)
        sCategoryEditor.getParentAdvanceOption();
    }, [sCategoryEditor.parent]);

    return <BasicLayout>
        {sCategoryEditor.isLoading ? <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={true}
            >
                <CircularProgress color="inherit" />
            </Backdrop> :
            <Root elevation={6}>
                <Typography variant={"h5"} fontWeight={"bold"}>
                    {TRANSLATE_TERMS.CREATE_CATEGORY}
                </Typography>
                <Typography variant={"h6"} fontWeight={"bold"} sx={{ ml: 1, mt: 2 }}>
                    {TRANSLATE_TERMS.CATEGORY_CATEGORY_BASIC_INFO}
                </Typography>
                <Grid container>
                    <Grid item container sx={{ mt: 2 }} direction={"row"} justifyContent={"center"}
                          alignItems={"center"}>
                        <Grid item xs={1}>
                            <IconPopoverSelect setIcon={(icon: string) => {sCategoryEditor.category.set_icon(icon);}}
                                               icon={sCategoryEditor.category.icon} />
                        </Grid>
                        <Grid item xs={8}>
                            <FormControl fullWidth disabled={false}>
                                <InputLabel htmlFor="category_name">
                                    {TRANSLATE_TERMS.ENTER_CATEGORY_NAME}
                                </InputLabel>
                                <OutlinedInput
                                    id="category_name"
                                    value={sCategoryEditor.category.name}
                                    onChange={(event,) => {
                                        sCategoryEditor.category.set_name(event.target.value);
                                    }}
                                    label={TRANSLATE_TERMS.ENTER_CATEGORY_NAME}
                                    name="first_name"
                                    required
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid item container sx={{ mt: 2 }} direction={"row"} justifyContent={"center"}
                          alignItems={"center"}>
                        <Grid item xs={10}>
                            <TreeViewSelector category={sCategoryEditor.parent} dropCategoryHandle={dropCategoryHandle}
                                              set_category={setCategoryHandle}
                                              withCheckbox={true}
                                              chooseCategoryPlaceholder={TRANSLATE_TERMS.CHOOSE_CATEGORY_CREATE_PLACEHOLDER} />
                        </Grid>
                    </Grid>
                    <Grid item container sx={{ ml: 2, mt: 2 }}>
                        <FormControl fullWidth disabled={false}>
                            <InputLabel htmlFor="min_price">
                                {TRANSLATE_TERMS.MIN_PRICE_TEXT}
                            </InputLabel>
                            <OutlinedInput
                                id="min_price"
                                value={sCategoryEditor.category.basicInfo.min_price.toLocaleString("vi", { style: "decimal" })}
                                onChange={(event) => {
                                    const value = event.target.value.replaceAll(currencyRegex, "")
                                    console.log(value);
                                    sCategoryEditor.category.basicInfo.set_min(+value || 0);
                                }}
                                label={TRANSLATE_TERMS.MIN_PRICE_TEXT}
                                name="min_price"
                                required
                            />
                        </FormControl>
                    </Grid>

                    <Grid item container sx={{ ml: 2, mt: 2 }}>
                        <FormControl fullWidth disabled={false}>
                            <InputLabel htmlFor="category_name">
                                {TRANSLATE_TERMS.MAX_PRICE_TEXT}
                            </InputLabel>
                            <OutlinedInput
                                id="category_name"
                                value={sCategoryEditor.category.basicInfo.max_price.toLocaleString("vi", { style: "decimal" })}
                                onChange={(event,) => {
                                    const value = event.target.value.replaceAll(currencyRegex, "")
                                    console.log(value)
                                    sCategoryEditor.category.basicInfo.set_max(+value || 0);
                                }}
                                label={TRANSLATE_TERMS.MAX_PRICE_TEXT}
                                name="first_name"
                                required
                            />
                        </FormControl>
                    </Grid>
                    <Grid item container sx={{ ml: 2, mt: 2 }}>
                        <FormControl fullWidth disabled={false}>
                            <InputLabel htmlFor="min_image">
                                {TRANSLATE_TERMS.MIN_IMAGE_TEXT}
                            </InputLabel>
                            <OutlinedInput
                                id="min_image"
                                type={"number"}
                                value={sCategoryEditor.category.imageInfo.min}
                                inputProps={{ min: 1, max: 20 }}
                                onChange={(event) => {
                                    const value = event.target.value;
                                    sCategoryEditor.category.imageInfo.set_min(+value || 0);
                                }}
                                label={TRANSLATE_TERMS.MIN_IMAGE_TEXT}
                                name="min_image"
                                required
                            />
                        </FormControl>
                    </Grid>

                    <Grid item container sx={{ ml: 2, mt: 2 }}>
                        <FormControl fullWidth disabled={false}>
                            <InputLabel htmlFor="max_image">
                                {TRANSLATE_TERMS.MAX_IMAGE_TEXT}
                            </InputLabel>
                            <OutlinedInput
                                id="max_image"
                                type={"number"}
                                value={sCategoryEditor.category.imageInfo.max}
                                inputProps={{ min: 1, max: 20 }}
                                onChange={(event,) => {
                                    const value = event.target.value;
                                    sCategoryEditor.category.imageInfo.set_max(+value || 0);
                                }}
                                label={TRANSLATE_TERMS.MAX_IMAGE_TEXT}
                                name="max_image"
                                required
                            />
                        </FormControl>
                    </Grid>

                    {sCategoryEditor.category &&
                        <AdvanceOptionCreator advanceOptions={sCategoryEditor.category.advancedSchemaInfo}
                                              set_advanceOption={(v) => {sCategoryEditor.category.set_advancedSchemaInfo(v);}} />}
                    <Grid item container justifyContent={"center"}>
                        <Button variant={"outlined"} onClick={saveHandle} disabled={submitting}>
                            {sCategoryEditor.isCreateNew ? TRANSLATE_TERMS.CREATE_CATEGORY : TRANSLATE_TERMS.SAVE_BUTTON}
                        </Button>
                    </Grid>
                </Grid>
            </Root>}
    </BasicLayout>
})