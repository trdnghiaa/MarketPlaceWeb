import { FC, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { AdvanceField, Depend } from "src/models";
import { SelectField } from "src/components/AdvanceOption/SelectField";
import { SelectOptionOfField } from "src/components/AdvanceOption/SelectField/SelectOptionOfField";
import { Typography } from "@mui/material";

export const DependsOption: FC<{depends: Depend, set_depends: (v: Depend) => void, fields: AdvanceField[], currentField: string}> = observer(({ depends, set_depends, fields, currentField }) => {
    const [fieldName, setFieldName] = useState<string>("");

    useEffect(() => {


        const keys = Object.keys(depends);
        if (keys.length == 1) {
            setFieldName(keys[0]);
        }
    }, [fieldName, depends]);

    return <>
        <SelectField fieldName={fieldName} set_fieldName={(v) => {
            set_depends({ [v]: [] });
            setFieldName(v);
        }} fields={fields} currentField={currentField} />
        <SelectOptionOfField fieldName={fieldName}
                             options={new AdvanceField(fields.find(e => e.fieldName == fieldName)).option.Enum}
                             fields={fields}
                             selectedOption={depends[fieldName] || []}
                             setSelectOption={(v) => {
                                 if (fieldName) {
                                     set_depends({ [fieldName]: v });
                                 }
                             }} />
        <Typography variant={"body2"} color={"error"}>* Khi chọn 1 hoặc nhiều tùy chọn. Nó sẽ được xuất hiện khi người
            dùng chọn tùy chọn đó.</Typography>
    </>
});