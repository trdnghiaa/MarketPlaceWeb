import { FC } from "react";
import { observer } from "mobx-react-lite";
import { Button, Grid, Typography } from "@mui/material";
import { goBack, TRANSLATE_TERMS } from "src/utils";

export const NotFoundPost: FC<{}> = observer(({}) => {
    return <Grid container justifyContent={"center"} alignItems={"center"} direction={{ md: "row", xs: "column" }}>
        <Grid item xs={6}>
            <img src={"/images/404.svg"} style={{ width: "100%" }} alt={TRANSLATE_TERMS.NOT_FOUND_POST} />
        </Grid>
        <Grid item container xs={6} direction={"column"} alignItems={"center"}>
            <Grid item>
                <Typography variant={"h5"} textAlign={"center"} sx={{ my: 2 }}
                            fontWeight={"bold"}>{TRANSLATE_TERMS.NOT_FOUND_POST}</Typography>
            </Grid>
            <Grid item>
                <Button onClick={goBack} variant={"outlined"}>{TRANSLATE_TERMS.BACK_BUTTON}</Button>
            </Grid>
        </Grid>
    </Grid>
});