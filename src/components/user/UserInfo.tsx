import { FC } from "react";
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { FormControl, FormControlLabel, FormLabel, Grid, InputLabel, MenuItem, OutlinedInput, Radio, RadioGroup, Select, SelectChangeEvent, } from "@mui/material";
import { User, UserRole } from "src/models";
import { observer } from "mobx-react";
import { useStore } from "src/stores";
import { TRANSLATE_TERMS } from "src/utils";
import { AddressSelect } from "src/components/AddressSelect";

export const UserInfo: FC<{user: User; setUser?: any; isView?: boolean}> =
    observer(({ user, setUser, isView }) => {
        const { role, types, currentUser } = useStore();

        const handleDateChange = (newValue: unknown) => {
            if (newValue instanceof Date) user.dob = newValue;
        };

        const handleGenderChange = (event: SelectChangeEvent) => {
            user.gender = event.target.value == "1";
        };

        const handleChangeType = (event: SelectChangeEvent) => {
            user.role = event.target.value;
        };

        const hasChangeRole = (): boolean => {
            return (role == UserRole.ADMIN && currentUser && currentUser._id != user._id) as boolean;
        }

        return (
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <h2>{TRANSLATE_TERMS.PERSONAL_INFORMATION}</h2>
                </Grid>
                <Grid container item xs={12} spacing={2}>
                    <Grid item xs={6}>
                        <FormControl fullWidth disabled={isView}>
                            <InputLabel htmlFor="last_name">
                                {TRANSLATE_TERMS.FIRST_NAME}
                            </InputLabel>
                            <OutlinedInput
                                id="last_name"
                                value={user.last_name}
                                onChange={(event,) => {
                                    user.last_name = event.target.value;
                                }}
                                label={TRANSLATE_TERMS.FIRST_NAME}
                                name="first_name"
                                required
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth disabled={isView}>
                            <InputLabel htmlFor="first_name">
                                {TRANSLATE_TERMS.LAST_NAME}
                            </InputLabel>
                            <OutlinedInput
                                id="first_name"
                                value={user.first_name}
                                onChange={(event) => {
                                    user.first_name = event.target.value;
                                }}
                                label={TRANSLATE_TERMS.LAST_NAME}
                                name="last_name"
                                required
                            />
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid
                    item
                    xs={6}
                    style={{ display: "flex", alignItems: "center" }}
                >
                    <FormControl disabled={isView}>
                        <FormLabel id="radio-buttons-group">
                            {TRANSLATE_TERMS.GENDER}
                        </FormLabel>
                        <RadioGroup
                            row
                            value={+user.gender}
                            name="radio-buttons-group"
                            onChange={handleGenderChange}
                        >
                            <FormControlLabel
                                value={0}
                                control={<Radio />}
                                label={TRANSLATE_TERMS.FEMALE}
                            />
                            <FormControlLabel
                                value={1}
                                control={<Radio />}
                                label={TRANSLATE_TERMS.MALE}
                            />
                        </RadioGroup>
                    </FormControl>
                    {hasChangeRole() && (
                        <FormControl disabled={isView}>
                            <InputLabel id="demo-simple-select-label">
                                {TRANSLATE_TERMS.ROLE}
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={user.role}
                                label="Quyền"
                                onChange={handleChangeType}
                            >
                                {types.map((item) => (
                                    <MenuItem value={item} key={item}>
                                        {item}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}
                </Grid>
                <Grid item xs={6}>
                    <FormControl variant="outlined" fullWidth>
                        <DesktopDatePicker
                            label={TRANSLATE_TERMS.DATETIME}
                            format="dd/MM/yyyy"
                            value={user.dob}
                            onChange={handleDateChange}
                            disabled={isView}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    {/*<FormControl fullWidth disabled={isView}>*/}
                    {/*    <InputLabel htmlFor="address">{TRANSLATE_TERMS.ADDRESS}</InputLabel>*/}
                    {/*    <OutlinedInput*/}
                    {/*        id="address"*/}
                    {/*        label="Địa chỉ"*/}
                    {/*        name="address"*/}
                    {/*        required*/}
                    {/*        value={user.address}*/}
                    {/*        onChange={(event) => {*/}
                    {/*            setUser.address = event.target.value;*/}

                    {/*        }}*/}
                    {/*    />*/}
                    {/*</FormControl>*/}
                    <AddressSelect set_address={(address: string) => {user.set_address(address)}}
                                   address={user.address} isView={!!isView} />
                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth disabled={isView}>
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <OutlinedInput
                            id="email"
                            label="Email"
                            name="email"
                            type="email"
                            value={user.email}
                            onChange={(event) => {
                                setUser.email = event.target.value;
                            }}
                            required
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth disabled={isView}>
                        <InputLabel htmlFor="phone">
                            {TRANSLATE_TERMS.PHONE_TEXT}
                        </InputLabel>
                        <OutlinedInput
                            id="phone"
                            label={TRANSLATE_TERMS.PHONE_TEXT}
                            name="phone"
                            value={user.phone}
                            onChange={(event) => {
                                setUser.phone = event.target.value;
                            }}
                            required
                        />
                    </FormControl>
                </Grid>
            </Grid>
        );
    });
