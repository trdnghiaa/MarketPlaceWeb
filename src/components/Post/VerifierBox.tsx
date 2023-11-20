import { FC, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Button, Chip, FormControl, FormLabel, Grid, Paper, TextField, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { Post } from "src/models";
import { FetchAPI, Method } from "src/service/fetchAPI";
import { useSnackbar } from "notistack";
import { MESSAGE_TERMS, theme, TRANSLATE_TERMS } from "src/utils";
import { LabelRequired } from "src/components/Post/RequiredTextField";
import { useStore } from "src/stores";

const Root = styled(Paper)(({ theme }) => ({
    "&": {
        backgroundColor: "#eee",
        position: "fixed",
        bottom: 0,
        right: 0,
        left: 0,
        padding: `${theme.spacing(2)} ${theme.spacing(4)}`
    }
}));

interface DenyPolicy {
    title: string,
    content: string
}

export const VerifierBox: FC<{post: Post}> = observer(({ post }) => {
    const { sPost } = useStore();
    const [policies, setPolicies] = useState<DenyPolicy[]>([]);
    const [isCancel, setIsCancel] = useState(false);
    const [isInit, setIsInit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const isCancelHandle = () => {
        setIsCancel(true);
    }

    const getPolicies = async () => {
        setIsLoading(true);
        const [err, data] = await FetchAPI<DenyPolicy[]>(Method.GET, `/policy`)
        if (err) {
            enqueueSnackbar(MESSAGE_TERMS.get(err), { variant: "error" });
        }
        setPolicies(data);
        setIsLoading(false);
    }

    useEffect(() => {
        if (!isInit && !isLoading) {
            getPolicies();
            setIsInit(true);
        }
    }, []);

    const sendReport = () => {
        sPost.sendReport().then(([err, data]) => {
            if (err) {
                return enqueueSnackbar(MESSAGE_TERMS.get(err), { variant: "error" });
            }
            enqueueSnackbar(MESSAGE_TERMS.get(data.message), { variant: "success" });
        })
    }

    const approvedHandle = () => {
        sPost.sendApproved().then(([err, data]) => {
            if (err) {
                return enqueueSnackbar(MESSAGE_TERMS.get(err), { variant: "error" });
            }
            enqueueSnackbar(MESSAGE_TERMS.get(data.message), { variant: "success" });
        });
    };

    return <Root elevation={6} sx={{ zIndex: theme.zIndex.drawer }}>
        <Grid container justifyContent={"space-between"}>
            <Grid item xs={9}>
                <Typography variant={"h5"} fontWeight={700}>{TRANSLATE_TERMS.VERIFY_POST_CONTENT}</Typography>
            </Grid>
            {
                !isCancel && <Grid item xs={3} container spacing={1} justifyContent={"end"}>
                    <Grid item>
                        <Button color={"error"} variant={"outlined"} onClick={isCancelHandle}>
                            {TRANSLATE_TERMS.DENY}
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button color={"success"} variant={"contained"} onClick={approvedHandle}>
                            {TRANSLATE_TERMS.APPROVE}
                        </Button>
                    </Grid>
                </Grid>
            }
            {isCancel && <Grid item xs={12} container>
                <Grid item xs={12} sx={{ my: 2 }}>
                    <FormLabel id="reason-radio-group">{TRANSLATE_TERMS.REASON_SUGGESTION}</FormLabel>
                    <Grid container spacing={1} sx={{ my: 1 }}>
                        {policies.map((e, i) => {
                            const clickHandle = () => {
                                sPost.set_reason(e.content);
                            }
                            return <Grid item key={i}>
                                <Chip label={e.title} onClick={clickHandle} />
                            </Grid>;
                        })}
                    </Grid>
                    <FormControl fullWidth>
                        <TextField
                            label={<LabelRequired label={TRANSLATE_TERMS.DENY_REASON_TEXT} />}
                            multiline
                            rows={4}
                            maxRows={6}
                            value={sPost.reason}
                            onChange={(e) => {
                                sPost.set_reason(e.target.value);
                            }}
                        />
                    </FormControl>

                </Grid>
                <Grid item xs={12} container justifyContent={"end"} spacing={2}>
                    <Grid item>
                        <Button color={"error"} variant={"outlined"} onClick={() => {setIsCancel(false)}}>
                            {TRANSLATE_TERMS.CANCEL}
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button color={"success"} variant={"contained"} onClick={sendReport}>
                            {TRANSLATE_TERMS.SEND}
                        </Button>
                    </Grid>
                </Grid>
            </Grid>}
        </Grid>
    </Root>
});