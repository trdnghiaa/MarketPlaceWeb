import { observer } from "mobx-react-lite";
import { FC, MouseEvent, useCallback } from "react";
import { Button, buttonClasses, Grid, gridClasses, paperClasses, Typography } from "@mui/material";
import { TRANSLATE_TERMS } from "../../utils";
import { Add } from "@mui/icons-material";
import { AdvanceOption } from "../../models";
import { styled } from "@mui/system";
import { OptionItemEditor } from "./OptionItemEditor";

const Root = styled(Grid)(({ theme }) => ({
        "&": { margin: "1rem" },
        [`& .${gridClasses.container}, .${paperClasses.root}`]: {
            marginTop: theme.spacing(2)
        },
        [`& .${buttonClasses.root}`]: {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
        },
    }
));

export const AdvanceOptionCreator: FC<{advanceOptions: AdvanceOption[], set_advanceOption: (v: AdvanceOption[]) => void}> = observer(({ advanceOptions, set_advanceOption }) => {
    const handleAdd = useCallback((event?: MouseEvent<HTMLButtonElement>) => {
        set_advanceOption([...advanceOptions, new AdvanceOption()]);
    }, [advanceOptions]);

    return <Root container justifyContent={"center"} className={"abs"}>
        <Grid item xs={12}>
            <Typography variant={"h5"} fontWeight={"bold"}>
                {TRANSLATE_TERMS.CATEGORY_ADVANCE_INFO}
            </Typography>
        </Grid>
        <Grid item container direction={"column"}>
            {advanceOptions.length > 0 && advanceOptions.map((e, i) => {
                const removeHandle = (event: MouseEvent<HTMLButtonElement>) => {
                    const advance = Array.from(advanceOptions);
                    advance.splice(i, 1);
                    set_advanceOption(advance);
                }

                return <OptionItemEditor key={i} data={e} index={i} removeHandle={removeHandle} />;
            })}
            <Button color={"secondary"} variant={"outlined"} onClick={handleAdd}>
                <Add />
                <Typography>
                    {TRANSLATE_TERMS.ADD_ADVANCE_OPTION_TEXT}
                </Typography>
            </Button>
        </Grid>
    </Root>;
});

