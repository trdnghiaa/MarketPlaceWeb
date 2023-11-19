import React, { FC, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Button, Grid, Icon, Paper, Skeleton, Typography } from "@mui/material";
import { TRANSLATE_TERMS } from "src/utils";
import { useStore } from "src/stores";
import { styled } from "@mui/system";
import { Category } from "src/models";


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

const ButtonCategories: FC<{categories: Category[]}> = observer(({ categories }) => {
    return <>
        {categories.map((e, i) => <Grid item key={i} md={2}>
            <Grid container direction={"column"}
                  alignItems={"center"}
                  justifyContent={"center"} component={CategoryButton} href={"/search?category=" + e._id}
                  color={"inherit"}
                  variant={"text"}>
                <Icon baseClassName="material-icons-two-tone" fontSize="large">{e.icon}</Icon>
                <Typography variant={"subtitle1"} fontWeight={"bold"} textAlign={"center"}>{e.name}</Typography>
            </Grid>
        </Grid>)}
    </>
});

const ButtonCategoriesSkeleton: FC = observer(() => {
    const skeleton = new Array(12).fill(0);
    return <>
        {skeleton.map((e, i) => <Grid item key={i} md={2}>
            <Grid container direction={"column"} alignItems={"center"}>
                <Skeleton variant="rounded" width={36} height={36} animation={"wave"} sx={{ mb: 1 }} />
                <Skeleton variant="rounded" width={"60%"} animation={"wave"} />
            </Grid>
        </Grid>)}
    </>
})

export const Explores: FC<{}> = observer(({}) => {
    const { sCategories } = useStore();
    useEffect(() => {}, []);
    return <Paper elevation={6}>
        <Typography variant={"h5"} fontWeight={700} paragraph>{TRANSLATE_TERMS.EXPLORE_CATEGORY}</Typography>
        <Grid container spacing={2} justifyContent={"space-around"}>
            {sCategories.isLoading || sCategories.categories.length == 0 ? <ButtonCategoriesSkeleton /> :
                <ButtonCategories categories={sCategories.categories} />}
        </Grid>
    </Paper>
});