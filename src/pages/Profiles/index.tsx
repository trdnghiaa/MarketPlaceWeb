import { FC, useCallback, useEffect, useState } from "react";
import { Button, Grid } from "@mui/material/";

import { useNavigate, useParams } from "react-router-dom";

import { UserInfo, UserReward } from "src/components/user";
import { UserOrderHistory } from "src/components/userOrderHistory";
import { BasicLayout } from "src/layouts/common";
import { UserOptionBar } from "src/components/Settings/UserOptionBar";
import { useSnackbar } from "notistack";
import { useStore } from "src/stores";
import { MODE, User, UserRole } from "src/models";
import { MenuList } from "@mui/material";
import { observer } from "mobx-react";
import { DropdownSetting } from "src/components/Settings";
import { MESSAGE_TERMS, theme, USER_SETTINGS } from "src/utils";
import { ChangePassword } from "src/pages/User/ChangePassword";
import { MyVoucher } from "src/pages/User/MyVoucher";


export const Profile: FC = observer(() => {
    const { sProfile, role } = useStore();
    const { enqueueSnackbar } = useSnackbar();
    const navigator = useNavigate();
    const [submitting, setSubmitting] = useState<boolean>(false);

    const { account, mode } = useParams();

    useEffect(() => {
        if (mode) {
            sProfile.set_IsView(mode === MODE.VIEW);
            sProfile.set_IsChangePassword(false);

            sProfile.getUser(account).catch((err) => {
                enqueueSnackbar(err.message, { variant: "error" });
            });


            // (typeof account == "string" ? User.getUserById(account) : User.getMe()).then(([err, data]) => {
            //     if (err) {
            //         enqueueSnackbar(err.message, { variant: "error" });
            //         return;
            //     }
            //     sProfile.set_user(data);
            //
            //     if (sProfile.user.role != UserRole.ADMIN) {
            //         // (typeof account == "string" ? Order.getByAccount(account) : Order.getOfMe()).then(([err, data]) => {
            //         //     if (err) {
            //         //         enqueueSnackbar(err.message, { variant: "error" })
            //         //         return;
            //         //     }
            //         //     sProfile.set_orders(data);
            //         // })
            //     }
            //
            // });
        } else {
            navigator("/404");
        }
    }, [mode, account]);

    const ChangeModeHandle = useCallback(() => {
        const href: string = (account ? `/accounts/${account}/` : "/profile/") + (sProfile.isView ? "edit" : "view");

        if (!sProfile.isView) {
            setSubmitting(true);
            sProfile.updateInfo().then(([err, data]) => {
                if (err) {
                    setSubmitting(false);
                    return enqueueSnackbar(err.message, { variant: "error" });
                }
                enqueueSnackbar(MESSAGE_TERMS.get(data.message), { variant: "success" });
                setSubmitting(false);
                navigator(href);
            });
        } else
            navigator(href);
    }, []);

    const ChangePasswordHandle = useCallback(() => {
        try {
            if (sProfile.isChangePassword) {
                setSubmitting(true);
                const { user, old_password, new_password, confirm_password } = sProfile;

                if (role !== UserRole.ADMIN) {
                    if (!old_password) {
                        throw new Error("Vui lòng điền mật khẩu cũ !");
                    }
                    if (!new_password) {
                        throw new Error("Vui lòng điền mật khẩu mới !");
                    }
                    if (!confirm_password) {
                        throw new Error("Vui lòng điền xác nhận mật khẩu !");
                    }

                    if (confirm_password != new_password) {
                        throw new Error("Mật khẩu xác nhận không đúng !");
                    }
                }

                if (new_password.length < 8) {
                    throw new Error("Mật khẩu ít nhất phải có 8 kí tự !")
                }


                User.changePassword(user._id, new_password, old_password).then(([err, data]) => {
                    if (!err)
                        sProfile.set_IsChangePassword(!sProfile.isChangePassword);
                    enqueueSnackbar(err ? err.message : data.message, { variant: err ? "error" : "success" });
                    setSubmitting(false);
                }).catch((err) => {
                    enqueueSnackbar(err.message, { variant: "error" });
                    setSubmitting(false);
                })
            } else
                sProfile.set_IsChangePassword(!sProfile.isChangePassword);
        } catch (e: any) {
            enqueueSnackbar(e.message, { variant: "error" });
            setSubmitting(false);
        }
    }, [])

    const CancelChangePasswordHandle = useCallback(() => {
        sProfile.set_password("");
        sProfile.set_oldPassword("");
        sProfile.set_confirm("");
        sProfile.set_IsChangePassword(false);
    }, []);

    return (
        <BasicLayout>
            <Grid container spacing={2} direction="row">
                <Grid item xs md xl={2} style={{ width: "100%" }}>
                    {role == UserRole.USER ?
                        <MenuList dense>
                            <DropdownSetting menu={USER_SETTINGS} closeHandle={() => {}} />
                        </MenuList> : <UserOptionBar />}
                </Grid>

                <Grid item xs={12} md={8}>
                    <UserInfo user={sProfile.get_user()} setUser={sProfile.get_user()} isView={sProfile.isView} />

                    {sProfile.isChangePassword && <ChangePassword />}

                    <Grid container spacing={1} direction="row" justifyContent="flex-end"
                          style={{ margin: theme.spacing(1) }}>

                        {sProfile.isChangePassword && <Grid item>
                            <Button variant="outlined" color="error"
                                    onClick={CancelChangePasswordHandle}>Hủy</Button>
                        </Grid>}

                        {sProfile.isView &&
                            <Grid item>
                                <Button disabled={submitting} variant="contained"
                                        color={sProfile.isChangePassword ? "success" : "primary"}
                                        onClick={ChangePasswordHandle}>
                                    {sProfile.isChangePassword ? "Lưu" : "Đổi Mật Khẩu"}
                                </Button>
                            </Grid>}

                        {!sProfile.isView &&
                            <Grid item>
                                <Button disabled={submitting} variant="outlined"
                                        color="error"
                                        onClick={() => {
                                            CancelChangePasswordHandle();
                                            navigator(`${account ? `/accounts/${account}/` : "/profile/"}view`);
                                        }}>
                                    Hủy
                                </Button>
                            </Grid>}

                        <Grid item>
                            <Button disabled={submitting} variant="contained"
                                    color={sProfile.isView ? "primary" : "success"}
                                    onClick={ChangeModeHandle}
                                    sx={{ mb: 1 }}>
                                {sProfile.isView ? "Chỉnh sửa" : "Lưu"}
                            </Button>
                        </Grid>
                    </Grid>
                    {sProfile.user.role === UserRole.USER &&
                        <div><UserReward reward={sProfile.user.reward} /><MyVoucher usedVoucher={sProfile.UsedVouchers}
                                                                                    availVouchers={sProfile.AvailableVouchers}
                                                                                    expiredVouchers={sProfile.ExpiredVouchers} />
                        </div>}
                    {sProfile.user.role !== UserRole.ADMIN &&
                        <UserOrderHistory displayType={sProfile.user.role} orders={sProfile.orders} />}
                </Grid>
            </Grid>
        </BasicLayout>
    );
});
