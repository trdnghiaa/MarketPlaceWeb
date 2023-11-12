import { ChangeEvent, FC, SyntheticEvent, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { BasicLayout } from "src/layouts/common";
import { styled } from "@mui/system";
import { useStore } from "src/stores";
import { useSnackbar } from "notistack";
import { Backdrop, Button, CircularProgress, FormControl, FormHelperText, Grid, InputLabel, OutlinedInput, Paper, Typography } from "@mui/material";
import { MESSAGE_TERMS, theme, TRANSLATE_TERMS } from "src/utils";
import { Dropzone, ExtFile, FileItem, ValidateFileResponse } from "@dropzone-ui/react";
import { headers, UPLOAD_URL } from "src/service/fetchAPI";

import 'react-quill/dist/quill.snow.css';
import ReactQuill from "react-quill";
import { PostAdd } from "@mui/icons-material";
import { Attachment, Category } from "src/models";
import { EDITOR_CONFIG } from "src/config";
import { TreeViewSelector } from "src/components/TreeView/TreeViewSelector";
import { RenderSchemaOption } from "src/components/Post/RenderSchemaOption";
import { useSearchParams } from "react-router-dom";

const PREFIX = "NewPost-";

const classes = {
    root: `${PREFIX}root`
}

const Root = styled("div")({
    root: {
        width: "80%",
        // minHeight: "500px",
        margin: "2rem auto",
        padding: "0 3rem"
    }
})

export const NewPost: FC = observer(({}) => {
    const [submitting, setSubmitting] = useState(false);
    const [expanded, setExpanded] = useState<boolean>(false);
    const { sNewPost, sCategories, isDone, currentUser } = useStore();
    const { enqueueSnackbar } = useSnackbar();
    const isView = false;
    let [searchParams, setSearchParams] = useSearchParams();

    const [syntheticFiles, setSyntheticFiles] = useState<ExtFile[]>([]);

    useEffect(() => {
        if (!isDone) return;
        sNewPost.init();
        setSyntheticFiles([]);

        const category_id = searchParams.get("category");
        if (category_id) {
            const category = sCategories.categories.find((e) => e._id == category_id);

            if (category) {
                sNewPost.post.set_category(category);
            }
        }
        if (sNewPost.post.category._id) {
            sNewPost.getSchema();
        }
    }, [sCategories.isLoading]);

    const handleDelete = (id: any) => {
        const file: ExtFile | undefined = sNewPost.file.find((x) => x.id == id);

        if (!file?.xhr) return;

        const responseXHR = JSON.parse(file.xhr.responseText);

        Attachment.dropFileTemp(responseXHR.payload._id).then(([err, data]) => {
            if (err) {
                return enqueueSnackbar(err, { variant: "error" });
            }

            sNewPost.set_file(sNewPost.file.filter((x) => x.id !== id));

            return enqueueSnackbar(MESSAGE_TERMS.FILE_TEMP_DELETED, { variant: "success" });
        }).catch((err) => {
            enqueueSnackbar(err.message, { variant: "error" });
        });
    };

    const updateFiles = (files: ExtFile[]) => {
        sNewPost.set_file(files);
    };

    const fileValidation = (file: File) => {
        const isMultiDot = file.name.split(".").length > 2;
        const invalidCharacter: String[] = Array.from(new Set(file.name.replace(/[a-zA-Z0-9- _.]/g, "").split('')));
        if (file.size == 0) {
            enqueueSnackbar(MESSAGE_TERMS.FILE_EMPTY, { variant: "error" })
            return { errors: [MESSAGE_TERMS.FILE_EMPTY] } as ValidateFileResponse;
        }

        // check error characters contain data
        if (invalidCharacter.length || isMultiDot) {
            const err = MESSAGE_TERMS.FILE_NAME_INVALID(isMultiDot ? ["."] : invalidCharacter);
            enqueueSnackbar(err, { variant: "error" });
            return { errors: [err] } as ValidateFileResponse;
        }

        // enqueueSnackbar(`Tệp ${file.name} đã được thêm thành công`, { variant: "success" })

        return { valid: true } as ValidateFileResponse;
    };

    const dropCategoryHandle = () => {
        sNewPost.set_category(new Category());
        setSearchParams({});
    }

    const handleChange = (event: SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded);
    };

    const handleChangeCategory = (v: Category) => {
        sNewPost.post.set_category(v);
        setSearchParams({ category: v._id });
    }

    const submitHandle = () => {
        const arg = { ...sNewPost.post.category.imageInfo, ...sNewPost.post.category.basicInfo, categoryName: sNewPost.post.category.name }
        setSubmitting(true);
        try {
            sNewPost.submit().then(([err, data]) => {
                if (err) {
                    return enqueueSnackbar(<div
                        dangerouslySetInnerHTML={{ __html: MESSAGE_TERMS.get(err, arg) }} />, { variant: "error" });
                }

            }).catch((err) => {
                enqueueSnackbar(<div
                    dangerouslySetInnerHTML={{ __html: MESSAGE_TERMS.get(err, arg) }} />, { variant: "error" });
                setSubmitting(false);
            });
        } catch (err) {
            setSubmitting(false);
            enqueueSnackbar(<div
                dangerouslySetInnerHTML={{ __html: MESSAGE_TERMS.get(err, arg) }} />, { variant: "error" });
        }


    }

    const changeTitlePost = (event: ChangeEvent<HTMLInputElement>) => {
        sNewPost.post.set_title(event.target.value);
    }

    const changePricePost = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.replaceAll(/\.|,|\D/gi, "");
        sNewPost.post.set_price(+value || 0);
    };

    return <BasicLayout>
        <Root>
            {sNewPost.isLoading ? <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={true}
            >
                <CircularProgress color="inherit" />
            </Backdrop> : <Paper
                sx={{ position: "relative", px: theme.spacing(5), py: theme.spacing(4) }}
                elevation={12}
                className={classes.root}
            >
                <Grid container direction={{ xs: "column", md: "row" }} spacing={2} justifyContent={"center"}
                      alignItems={"stretch"}
                >
                    <Grid item xs={4} mt={2}>
                        <Dropzone onChange={updateFiles} value={sNewPost.file}
                                  maxFiles={0 || sNewPost.post.category.imageInfo.max}
                                  min={0 || sNewPost.post.category.imageInfo.min}
                                  disabled={syntheticFiles.length >= 6}
                                  accept="image/*, video/*"
                                  label={TRANSLATE_TERMS.get("DROPZONE_PLACEHOLDER", { ...sNewPost.post.category.imageInfo })}
                                  footer={false}
                                  header
                                  headerConfig={{
                                      deleteFiles: false
                                  }}
                            // onUploadStart={(file) => {
                            //     console.log(file);
                            // }}
                                  onUploadFinish={(file) => {
                                      const images = sNewPost.post.images;
                                      for (let e of file) {
                                          images.push(new Attachment(e.serverResponse?.payload));
                                      }
                                  }}
                                  validator={fileValidation}
                                  autoClean={true}
                                  uploadConfig={{
                                      preparingTime: 100,
                                      uploadingMessage: "Đang tải hình ảnh lên",
                                      url: UPLOAD_URL,
                                      uploadLabel: "attachment",
                                      autoUpload: true, headers: {
                                          Authorization: headers.Authorization
                                      },
                                  }}
                        >
                            {sNewPost.file.map((f) => (
                                <FileItem
                                    {...f}
                                    key={f.id}
                                    onDelete={handleDelete}
                                    info
                                    preview
                                    resultOnTooltip
                                />
                            ))}
                        </Dropzone>
                    </Grid>
                    <Grid item xs={8} flexGrow={1} container>
                        {/*<Grid xs={12}>*/}
                        {/*    <Typography variant={"h2"}>{TRANSLATE_TERMS.CREATE_POST}</Typography>*/}
                        {/*</Grid>*/}
                        <Grid item xs={12} sx={{ mt: 1 }}>
                            <TreeViewSelector category={sNewPost.post.category} dropCategoryHandle={dropCategoryHandle}
                                              set_category={handleChangeCategory} />
                        </Grid>

                        {sNewPost.post.category.advancedSchemaInfo &&
                            <RenderSchemaOption data={sNewPost.post.category.advancedSchemaInfo}
                                                values={sNewPost.post.advanceInfo} />}

                        {sNewPost.post.category._id && <>
                            <Grid item xs={12} sx={{ my: 2 }}>
                                <FormControl fullWidth disabled={isView} sx={{ mb: 2 }}>
                                    <InputLabel htmlFor={"title_post"}>
                                        {TRANSLATE_TERMS.PRODUCT_PRICE}
                                    </InputLabel>
                                    <OutlinedInput
                                        id={"title_post"}
                                        value={sNewPost.post.price.toLocaleString("vi", { style: "decimal" })}
                                        onChange={changePricePost}
                                        label={TRANSLATE_TERMS.PRODUCT_PRICE}
                                        name="title"
                                        required
                                        error={!sNewPost.post.price}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sx={{ my: 2 }}>
                                <Typography variant={"h6"} fontWeight={"bold"}
                                            sx={{ mb: 2 }}>{TRANSLATE_TERMS.TITLE_DESCRIPTION_POST_TEXT}</Typography>
                                <FormControl fullWidth disabled={isView} sx={{ mb: 2 }}>
                                    <InputLabel htmlFor={"title_post"}>
                                        {TRANSLATE_TERMS.TITLE_POST_TEXT}
                                    </InputLabel>
                                    <OutlinedInput
                                        id={"title_post"}
                                        defaultValue={sNewPost.post.title}
                                        onChange={changeTitlePost}
                                        label={TRANSLATE_TERMS.TITLE_POST_TEXT}
                                        name="title"
                                        required
                                        error={sNewPost.post.title.length > sNewPost.titleMaxLength || sNewPost.post.title.length == 0}
                                    />
                                    <FormHelperText>{TRANSLATE_TERMS.get("TITLE_LENGTH", { length: sNewPost.post.title.length, max_length: sNewPost.titleMaxLength })}</FormHelperText>
                                </FormControl>
                                <Typography variant={"h6"}>{TRANSLATE_TERMS.get("DESCRIPTION_POST_TEXT")}</Typography>
                                <ReactQuill theme="snow" value={sNewPost.post.description}
                                            onChange={(value) => {sNewPost.post.set_description(value)}}
                                            style={{ height: "20vh" }}
                                            placeholder={TRANSLATE_TERMS.DESCRIPTION_PLACEHOLDER}
                                            modules={EDITOR_CONFIG.modules} formats={EDITOR_CONFIG.formats} />
                            </Grid>
                        </>}
                        <Grid item xs={12} container justifyContent={"center"} pt={2}>
                            {
                                sNewPost.showPostButton() && <Button
                                    variant="contained"
                                    size="large"
                                    disabled={submitting}
                                    style={{ margin: "1rem" }}
                                    onClick={submitHandle}
                                    startIcon={<PostAdd />}
                                >
                                    {TRANSLATE_TERMS.POST_TEXT}
                                </Button>
                            }
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>}

        </Root>
    </BasicLayout>;
})