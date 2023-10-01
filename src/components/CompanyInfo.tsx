import React from "react";
import {Grid, FormControl, InputLabel, OutlinedInput} from "@mui/material";
import {useStore} from "../stores";
import {observer} from "mobx-react-lite";

export const CompanyInfo = observer(() => {
    const {sSignUp} = useStore();
    return (
        <Grid container spacing={2}>
            <Grid item>
                <h2>Thông tin doanh nghiệp</h2>
            </Grid>
            <Grid item xs={12}>
                <FormControl fullWidth>
                    <InputLabel htmlFor="outlined">Tên doanh nghiệp</InputLabel>
                    <OutlinedInput
                        id="outlined"
                        label="Tên doanh nghiệp"
                        name="address"
                        required
                        defaultValue={sSignUp.user.companyName}
                        onChange={({target}) => {
                            sSignUp.user.companyName = target.value;
                        }}
                    />
                </FormControl>
            </Grid>
        </Grid>
    );
})
