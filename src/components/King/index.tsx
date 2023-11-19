import React, { FC } from "react";
import { observer } from "mobx-react-lite";
import { styled } from "@mui/system";
import { Box } from "@mui/material";

const BoxStyled = styled(Box)(({ theme }) => ({
    "&": {
        // backgroundColor: theme.palette.secondary.main,
        width: 40,
        height: 40,
        borderRadius: '50%',
        position: "absolute",
        top: 0, left: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#eee",
        fontWeight: "bold"

    }
}));

const BoxArrowRight = styled(Box)(({ theme }) => ({
    "&": {
        width: 0,
        height: 0,
        borderStyle: "solid",
        borderWidth: "0 0 40px 40px",
        borderColor: `transparent transparent ${theme.palette.warning.light} transparent`,
        position: "absolute",
        top: 0, left: 0,


    }
}));

const BoxArrowLeft = styled(Box)(({ theme }) => ({
    "&": {
        width: 0,
        height: 0,
        borderStyle: "solid",
        borderWidth: "40px 0 0 40px",
        borderColor: `transparent transparent transparent ${theme.palette.warning.light}`,
        position: "absolute",
        top: 0, left: 0,


    }
}));

const BoxArrowTop = styled(Box)(({ theme }) => ({
    "&": {
        width: 0,
        height: 0,
        borderStyle: "solid",
        borderWidth: " 0 20px 40px 20px",
        borderColor: `transparent transparent ${theme.palette.warning.main} transparent`,
        position: "absolute",
        top: 0, left: 0,


    }
}));


export const King: FC<{content: string}> = observer(({ content }) => {
    return <BoxStyled sx={{ transform: "rotate(-40deg)" }}>
        <BoxArrowTop component="span" />
        <BoxArrowRight component="span"></BoxArrowRight>
        <BoxArrowLeft />

        <BoxStyled>{content}</BoxStyled>
    </BoxStyled>
});