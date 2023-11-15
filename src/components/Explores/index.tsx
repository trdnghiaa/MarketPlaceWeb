import React, { FC } from "react";
import { observer } from "mobx-react-lite";
import { Button, Grid, Icon, Paper, Typography } from "@mui/material";
import { TRANSLATE_TERMS } from "src/utils";
import { useStore } from "src/stores";
import { styled } from "@mui/system";


const CategoryButton = styled(Button)(({}) => ({
    "&": {
        transition: "border 250ms ease-in-out",
        border: "1px solid #0000",
    },
    "&:hover": {
        background: "none",
        border: "1px solid #4446",

    }
}));

export const Explores: FC<{}> = observer(({}) => {
    const { sCategories } = useStore();
    return <Paper elevation={6}>
        <Typography variant={"h5"} fontWeight={700} paragraph>{TRANSLATE_TERMS.EXPLORE_CATEGORY}</Typography>
        <Grid container spacing={2} justifyContent={"space-around"}>
            {sCategories.categories.map((e, i) => <Grid item key={i} md={2}>
                <Grid container direction={"column"}
                      alignItems={"center"}
                      justifyContent={"center"} component={CategoryButton} href={"/category/" + e._id} color={"inherit"}
                      variant={"text"}>
                    <Icon baseClassName="material-icons-two-tone" fontSize="large">{e.icon}</Icon>
                    <Typography variant={"subtitle1"} fontWeight={"bold"}>{e.name}</Typography>
                </Grid>
            </Grid>)}
        </Grid>
    </Paper>
});