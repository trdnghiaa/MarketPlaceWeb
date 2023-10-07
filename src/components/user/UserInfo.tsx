import { FC } from "react";
import { DesktopDatePicker } from '@mui/x-date-pickers';
import {
    Select,
    SelectChangeEvent,
    MenuItem,
    OutlinedInput,
    InputLabel,
    FormControl,
    Grid,
    FormControlLabel,
    FormLabel,
    RadioGroup,
    Radio,
} from "@mui/material";
import { User } from "../../models/User";
import { observer } from "mobx-react";
import { UserRole } from "../../models/types";
import { useStore } from "../../stores";
import { useParams } from "react-router-dom";

export const UserInfo: FC<{user: User; setUser?: any; isView?: boolean}> =
    observer(({ user, setUser, isView }) => {
        const { role, types, currentUser } = useStore();
        const { account } = useParams();

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
                    <h2>Thông tin cá nhân</h2>
                </Grid>
                <Grid container item xs={12} spacing={2}>
                    <Grid item xs={6}>
                        <FormControl fullWidth disabled={isView}>
                            <InputLabel htmlFor="last_name">
                                Họ và tên đệm
                            </InputLabel>
                            <OutlinedInput
                                id="last_name"
                                value={user.last_name}
                                onChange={(event,) => {
                                    user.last_name = event.target.value;
                                }}
                                label="Họ và tên"
                                name="first_name"
                                required
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth disabled={isView}>
                            <InputLabel htmlFor="first_name">
                                Tên
                            </InputLabel>
                            <OutlinedInput
                                id="first_name"
                                value={user.first_name}
                                onChange={(event) => {
                                    user.first_name = event.target.value;
                                }}
                                label="Tên"
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
                            Giới tính
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
                                label="Female"
                            />
                            <FormControlLabel
                                value={1}
                                control={<Radio />}
                                label="Male"
                            />
                        </RadioGroup>
                    </FormControl>
                    {hasChangeRole() && (
                        <FormControl disabled={isView}>
                            <InputLabel id="demo-simple-select-label">
                                Quyền
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
                            label="Ngày sinh"
                            format="dd/MM/yyyy"
                            value={user.dob}
                            onChange={handleDateChange}
                            disabled={isView}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth disabled={isView}>
                        <InputLabel htmlFor="address">Địa chỉ</InputLabel>
                        <OutlinedInput
                            id="address"
                            label="Địa chỉ"
                            name="address"
                            required
                            value={user.address}
                            onChange={(event) => {
                                setUser.address = event.target.value;

                            }}
                        />
                    </FormControl>
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
                            Số điện thoại
                        </InputLabel>
                        <OutlinedInput
                            id="phone"
                            label="Số điện thoại"
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
