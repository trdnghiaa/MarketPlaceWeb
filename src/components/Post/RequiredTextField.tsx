import { observer } from "mobx-react-lite";
import { FC } from "react";
import { AdvanceField, AdvanceInfoValue } from "src/models";
import { Typography } from "@mui/material";

export const RequiredTextField: FC<{data: AdvanceField, values: AdvanceInfoValue}> = observer(({ data, values }) => {
    const isRequired = () => {
        const requiredFieldName = data.option.requiredFieldName;
        if (requiredFieldName) {
            if (values[requiredFieldName] && data.option.requiredOptions[requiredFieldName]) {
                return data.option.requiredOptions[requiredFieldName].includes(values[requiredFieldName] as string);
            }
        }
        return data.option.isRequired;
    }

    return <>
        {
            isRequired() && <RequiredDot />
        }
    </>
});

export const RequiredDot: FC = () => {
    return <Typography color={"error"} component={"span"}>*</Typography>
}

export const LabelRequired: FC<{label: string}> = observer(({ label }) => {
    return <>{label} <RequiredDot /></>
});