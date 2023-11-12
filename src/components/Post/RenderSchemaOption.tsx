import { observer } from "mobx-react-lite";
import { FC } from "react";
import { AdvanceField, AdvanceInfoValue, AdvanceOption, FieldType } from "src/models";
import { Grid, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { RenderOptionField } from "src/components/Post/RenderOptionField";
import { RenderTextField } from "src/components/Post/RenderTextField";
import { RenderDropdownField } from "src/components/Post/RenderDropdownField";

export const RenderSchemaOption: FC<{data: AdvanceOption[], values: AdvanceInfoValue}> = observer(({ data, values }) => {
    return <Grid item xs={12} container>
        {data.map((e, i) => <RenderOption key={i} data={e} values={values} />)}
    </Grid>
});

const BoxRoot = styled(Grid)(({ theme }) => ({
    "&": {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    }
}));

export const RenderOption: FC<{data: AdvanceOption, values: AdvanceInfoValue}> = observer(({ data, values }) => {
    return <BoxRoot item xs={12}>
        <Typography variant={"h6"} fontWeight={"bold"}>{data.title}</Typography>
        <Grid container spacing={2}>
            {data.fields.map((e, i) => <RenderField data={e} values={values} key={i} />)}
        </Grid>
    </BoxRoot>
})

export const RenderField: FC<{data: AdvanceField, values: AdvanceInfoValue}> = observer(({ data, values }) => {
    const withDepends = () => {
        const keys = Object.keys(data.option.depends);

        if (keys.length) {
            const key = keys[0];
            return data.option.depends[key].includes(values[key] as string);
        }

        return true;
    }

    const RenderInput = () => {
        switch (data.fieldType) {
            case FieldType.DROPDOWN:
                return <RenderDropdownField data={data} values={values} />;
            case FieldType.OPTION:
                return <RenderOptionField data={data} values={values} />;
            case FieldType.TEXT:
                return <RenderTextField data={data} values={values} />;
            case FieldType.YEAR:
                return <Typography>{data.labelName}</Typography>
            default:
                return <></>
        }
    }

    return <Grid item xs={data.style.col} sx={{ mb: 2 }}>
        {
            withDepends() && <RenderInput />
        }
    </Grid>
});