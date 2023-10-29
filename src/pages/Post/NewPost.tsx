import { FC, SyntheticEvent, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { BasicLayout } from "src/layouts/common";
import { styled } from "@mui/system";
import { useStore } from "src/stores";
import { useSnackbar } from "notistack";
import { Button, FormControl, Grid, InputLabel, OutlinedInput, Paper, Typography } from "@mui/material";
import { MESSAGE_TERMS, theme, TRANSLATE_TERMS } from "src/utils";
import { Dropzone, ExtFile, FileItem, ValidateFileResponse } from "@dropzone-ui/react";
import { headers, UPLOAD_URL } from "src/service/fetchAPI";

import 'react-quill/dist/quill.snow.css';
import ReactQuill from "react-quill";
import { PostAdd } from "@mui/icons-material";
import { Attachment, Category } from "src/models";
import { EDITOR_CONFIG } from "src/config";
import { TreeViewSelector } from "src/components/TreeView/TreeViewSelector";

const PREFIX = "NewPost-";

const classes = {
    root: `${PREFIX}root`
}

const Root = styled("div")({
    root: {
        width: "80%",
        minHeight: "500px",
        margin: "2rem auto",
        padding: "0 3rem"
    }
})

export const NewPost: FC = observer(({}) => {
    const [submitting, setSubmitting] = useState(false);
    const [expanded, setExpanded] = useState<boolean>(false);
    const { sNewPost, sCategories } = useStore();
    const { enqueueSnackbar } = useSnackbar();
    const isView = false;

    const [syntheticFiles, setSyntheticFiles] = useState<ExtFile[]>([]);

    useEffect(() => {
        setSyntheticFiles([]);
    }, []);

    const handleDelete = (id: any) => {
        const file: ExtFile | undefined = sNewPost.file.find((x) => x.id == id);

        if (!file?.serverResponse) return;

        Attachment.dropFileTemp(file.serverResponse.payload._id).then(([err, data]) => {
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

        enqueueSnackbar(`Tệp ${file.name} đã được thêm thành công`, { variant: "success" })

        return { valid: true } as ValidateFileResponse;
    };

    const dropCategoryHandle = () => {
        sNewPost.set_category(new Category());
    }

    const handleChange = (event: SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded);
    };

    return <BasicLayout>
        <Root>
            <Paper
                sx={{ position: "relative", px: theme.spacing(5), py: theme.spacing(4) }}
                elevation={12}
                className={classes.root}
            >
                <Grid container direction={"row"} spacing={2} justifyContent={"center"}>
                    <Grid item xs={4} mt={2}>
                        <Dropzone onChange={updateFiles} value={sNewPost.file} maxFiles={6}
                                  disabled={syntheticFiles.length >= 6}
                                  accept="image/*, video/*"
                                  label={TRANSLATE_TERMS.DROPZONE_PLACEHOLDER}
                                  onUploadStart={(file) => {
                                      console.log(file);
                                  }}
                                  onUploadFinish={(file) => {
                                      console.log(file);

                                      sNewPost.set_file(file);
                                  }}
                                  validator={fileValidation}
                                  autoClean={true}
                                  uploadConfig={{
                                      url: UPLOAD_URL, uploadLabel: "attachment", autoUpload: true, headers: {
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
                    <Grid item xs={8} flexGrow={1}>
                        {/*<Grid xs={12}>*/}
                        {/*    <Typography variant={"h2"}>{TRANSLATE_TERMS.CREATE_POST}</Typography>*/}
                        {/*</Grid>*/}
                        <Grid item xs={12} sx={{ mt: 1 }}>
                            <FormControl fullWidth disabled={isView}>
                                <InputLabel htmlFor="title_post">
                                    {TRANSLATE_TERMS.TITLE_POST_TEXT}
                                </InputLabel>
                                <OutlinedInput
                                    id="title_post"
                                    defaultValue={sNewPost.post.title}
                                    onChange={(event) => {
                                        sNewPost.post.set_title(event.target.value);
                                    }}
                                    label={TRANSLATE_TERMS.TITLE_POST_TEXT}
                                    name="title"
                                    required
                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sx={{ mt: 1 }}>
                            <TreeViewSelector category={sNewPost.post.category} dropCategoryHandle={dropCategoryHandle}
                                              set_category={(e) => {sNewPost.post.set_category(e)}} />
                        </Grid>

                        <Grid item xs={12} sx={{ my: 2, height: "300px" }}>
                            <Typography variant={"h6"}>{TRANSLATE_TERMS.DESCRIPTION_POST_TEXT}</Typography>
                            <ReactQuill theme="snow" value={sNewPost.post.description}
                                        onChange={(value) => {sNewPost.post.set_description(value)}}
                                        style={{ height: "70%" }}
                                        placeholder={TRANSLATE_TERMS.DESCRIPTION_PLACEHOLDER}
                                        modules={EDITOR_CONFIG.modules} formats={EDITOR_CONFIG.formats} />
                        </Grid>

                        <Grid container justifyContent={"center"} pt={2}>
                            <Button
                                variant="contained"
                                size="large"
                                disabled={submitting}
                                style={{ margin: "1rem" }}
                                onClick={() => {}}
                                startIcon={<PostAdd />}
                            >
                                {TRANSLATE_TERMS.POST_TEXT}
                            </Button>
                        </Grid>

                    </Grid>
                </Grid>

                {/*    <Grid*/}
                {/*        item*/}
                {/*        xs={6}*/}
                {/*        style={{ display: "flex", alignItems: "center" }}*/}
                {/*    >*/}
                {/*        <FormControl disabled={isView}>*/}
                {/*            <FormLabel id="radio-buttons-group">*/}
                {/*                Giới tính*/}
                {/*            </FormLabel>*/}
                {/*            <RadioGroup*/}
                {/*                row*/}
                {/*                value={+user.gender}*/}
                {/*                name="radio-buttons-group"*/}
                {/*                onChange={handleGenderChange}*/}
                {/*            >*/}
                {/*                <FormControlLabel*/}
                {/*                    value={0}*/}
                {/*                    control={<Radio />}*/}
                {/*                    label="Female"*/}
                {/*                />*/}
                {/*                <FormControlLabel*/}
                {/*                    value={1}*/}
                {/*                    control={<Radio />}*/}
                {/*                    label="Male"*/}
                {/*                />*/}
                {/*            </RadioGroup>*/}
                {/*        </FormControl>*/}
                {/*        {hasChangeRole() && (*/}
                {/*            <FormControl disabled={isView}>*/}
                {/*                <InputLabel id="demo-simple-select-label">*/}
                {/*                    Quyền*/}
                {/*                </InputLabel>*/}
                {/*                <Select*/}
                {/*                    labelId="demo-simple-select-label"*/}
                {/*                    id="demo-simple-select"*/}
                {/*                    value={user.role}*/}
                {/*                    label="Quyền"*/}
                {/*                    onChange={handleChangeType}*/}
                {/*                >*/}
                {/*                    {types.map((item) => (*/}
                {/*                        <MenuItem value={item} key={item}>*/}
                {/*                            {item}*/}
                {/*                        </MenuItem>*/}
                {/*                    ))}*/}
                {/*                </Select>*/}
                {/*            </FormControl>*/}
                {/*        )}*/}
                {/*    </Grid>*/}
                {/*    <Grid item xs={6}>*/}
                {/*        <FormControl variant="outlined" fullWidth>*/}
                {/*            <DesktopDatePicker*/}
                {/*                label="Ngày sinh"*/}
                {/*                format="dd/MM/yyyy"*/}
                {/*                value={user.dob}*/}
                {/*                onChange={handleDateChange}*/}
                {/*                disabled={isView}*/}
                {/*            />*/}
                {/*        </FormControl>*/}
                {/*    </Grid>*/}
                {/*    <Grid item xs={12}>*/}
                {/*        <FormControl fullWidth disabled={isView}>*/}
                {/*            <InputLabel htmlFor="address">Địa chỉ</InputLabel>*/}
                {/*            <OutlinedInput*/}
                {/*                id="address"*/}
                {/*                label="Địa chỉ"*/}
                {/*                name="address"*/}
                {/*                required*/}
                {/*                value={user.address}*/}
                {/*                onChange={(event) => {*/}
                {/*                    setUser.address = event.target.value;*/}

                {/*                }}*/}
                {/*            />*/}
                {/*        </FormControl>*/}
                {/*    </Grid>*/}
                {/*    <Grid item xs={6}>*/}
                {/*        <FormControl fullWidth disabled={isView}>*/}
                {/*            <InputLabel htmlFor="email">Email</InputLabel>*/}
                {/*            <OutlinedInput*/}
                {/*                id="email"*/}
                {/*                label="Email"*/}
                {/*                name="email"*/}
                {/*                type="email"*/}
                {/*                value={user.email}*/}
                {/*                onChange={(event) => {*/}
                {/*                    setUser.email = event.target.value;*/}
                {/*                }}*/}
                {/*                required*/}
                {/*            />*/}
                {/*        </FormControl>*/}
                {/*    </Grid>*/}
                {/*    <Grid item xs={6}>*/}
                {/*        <FormControl fullWidth disabled={isView}>*/}
                {/*            <InputLabel htmlFor="phone">*/}
                {/*                Số điện thoại*/}
                {/*            </InputLabel>*/}
                {/*            <OutlinedInput*/}
                {/*                id="phone"*/}
                {/*                label="Số điện thoại"*/}
                {/*                name="phone"*/}
                {/*                value={user.phone}*/}
                {/*                onChange={(event) => {*/}
                {/*                    setUser.phone = event.target.value;*/}
                {/*                }}*/}
                {/*                required*/}
                {/*            />*/}
                {/*        </FormControl>*/}
                {/*    </Grid>*/}
            </Paper>
        </Root>
    </BasicLayout>;
})