import { observer } from "mobx-react-lite";
import { FC, MouseEvent } from "react";
import { Chip, Grid, Typography } from "@mui/material";
import { AdvanceField, AdvanceInfoValue } from "src/models";
import { RequiredTextField } from "src/components/Post/RequiredTextField";

export const RenderOptionField: FC<{data: AdvanceField, values: AdvanceInfoValue}> = observer(({ data, values }) => {
    return <>
        <Typography variant={"body1"} sx={{ mb: 1 }}>
            {data.labelName} <RequiredTextField data={data} values={values} />
        </Typography>
        <Grid container spacing={1}>
            {data.option.Enum.map((e, i) => {
                const onSelected = (event: MouseEvent<HTMLDivElement>) => {
                    values[data.fieldName] = e;
                };

                return <Grid item key={i}>
                    <Chip label={e}
                          variant={values[data.fieldName] == e ? "filled" : "outlined"}
                          color={"info"}
                          size={"medium"}
                          onClick={onSelected} />
                </Grid>
            })
            }
        </Grid>
    </>
});