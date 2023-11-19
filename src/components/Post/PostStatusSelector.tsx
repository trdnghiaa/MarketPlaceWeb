import { FC } from "react";
import { observer } from "mobx-react-lite";
import { EPostStatus } from "src/models";
import { Chip, Grid } from "@mui/material";
import { TRANSLATE_TERMS } from "src/utils";

export const PostStatusSelector: FC<{selectHandle: (e: string) => void, selectedValue: string}> = observer(({ selectHandle, selectedValue }) => {
    const getPostStatusColor = (status: string) => {
        switch (status) {
            case "ALL":
                return "default"
            case EPostStatus.APPROVED:
                return "success";
            case EPostStatus.DENIED:
                return "error";
            default:
                return "secondary";
        }
    }

    return <>
        <Grid item key={""} sx={{ display: "flex", alignItems: "center" }}>
            <Chip label={TRANSLATE_TERMS["ALL"]} color={getPostStatusColor("ALL")}
                  onClick={() => {selectHandle("")}}
                  variant={selectedValue == "" ? "filled" : "outlined"} />
        </Grid>
        {Object.keys(EPostStatus).map((e, i) => {
            return <Grid item key={i} sx={{ display: "flex", alignItems: "center" }}>
                <Chip label={TRANSLATE_TERMS[e]} color={getPostStatusColor(e)}
                      onClick={() => {selectHandle(e)}}
                      variant={selectedValue == e ? "filled" : "outlined"} />
            </Grid>
        })}
    </>
});
