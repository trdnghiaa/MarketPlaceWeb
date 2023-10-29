import { FC, useCallback, useEffect, useMemo } from "react";

import { BasicLayout } from "src/layouts/common";
import { observer } from "mobx-react-lite";
import { useSnackbar } from "notistack";
import { useStore } from "src/stores";
import { MaterialReactTable, MRT_ColumnDef } from "material-react-table";
import { User } from "src/models/User";
import { Box, Button, IconButton } from "@mui/material";
import { Add, Delete as DeleteIcon, Edit as EditIcon, } from '@mui/icons-material';

import { MRT_Localization_VI } from "material-react-table/locales/vi";
import { setTitle } from "src/utils";
import { useNavigate } from "react-router-dom";
import { Visibility } from "@mui/icons-material/";
import { PAGINATION_SIZE_LIST } from "src/config";
import { Tooltip } from "@mui/material/";
import { yellow } from "@mui/material/colors";
import { DialogType } from "src/stores/DialogStore";
import { MESSAGE_TERMS } from "src/utils/messageTerms";


export const Account: FC<{}> = observer(({}) => {
    const { sAccount, sDialog } = useStore();
    const { enqueueSnackbar } = useSnackbar();

    const navigate = useNavigate();

    useEffect(() => {
        setTitle("Quản lý tài khoản");
    }, [])

    function load() {
        sAccount.init();
    }

    useEffect(() => {
        load();
    }, [sAccount.page, sAccount.size, sAccount.queryText]);


    const columns = useMemo<MRT_ColumnDef<User>[]>(() => [
        { accessorKey: "username", header: "Người dùng" },
        {
            accessorKey: "fullName", header: "Họ và Tên", Cell: ({ row }) => {
                const user: User = new User(row.original);
                return user.fullName;
            }
        },
        { accessorKey: "email", header: "Email" },
        { accessorKey: "phone", header: "Số Điện Thoại" },
        {
            accessorKey: "role", header: "Quyền",
            enableHiding: true
        },
    ], []);

    const deleteHandle = useCallback((_id: string, username: string) => {
        return () => {
            sDialog.openDialog(DialogType.confirm, MESSAGE_TERMS.DELETE_USER_QUESTION.replace("{user}", `@${username}`), MESSAGE_TERMS.DELETE_USER_DESCRIPTION, async () => {
                User.delete(_id).then(([err, data]) => {
                    if (err) {
                        return enqueueSnackbar(MESSAGE_TERMS.get(err.message), { variant: "error" });
                    }
                    load();
                    enqueueSnackbar(MESSAGE_TERMS.get(data.message), { variant: "success" });
                });
            }, { agreeButtonText: "Xóa" });
        }
    }, []);

    useCallback(() => {}, []);
    return <BasicLayout>
        <MaterialReactTable
            columns={columns}
            data={sAccount.users}
            layoutMode={"grid"}
            manualPagination
            state={{ isLoading: sAccount.isLoading, pagination: { pageSize: sAccount.size, pageIndex: sAccount.page } }}
            rowCount={sAccount.totalRow}
            muiTablePaginationProps={{
                rowsPerPageOptions: PAGINATION_SIZE_LIST,
                page: sAccount.page,
                onRowsPerPageChange: (event) => {
                    sAccount.set_size(+event.target.value);
                },
                onPageChange: (event, value) => {
                    sAccount.set_page(value);
                }
            }}
            enableColumnFilters={false}
            onGlobalFilterChange={(value) => {
                sAccount.set_queryText(value);
            }}
            localization={MRT_Localization_VI}

            positionActionsColumn="last"
            enableRowActions
            displayColumnDefOptions={{ 'mrt-row-actions': { size: 100 } }}
            renderRowActions={({ row, table }) => {
                const user = row.original;

                return <Box sx={{ display: 'flex', flexWrap: 'nowrap', marginRight: "10rem", gap: '2px' }}>
                    <Tooltip title="Impersonate User">
                        <IconButton

                            onClick={() => {
                                navigate(`/accounts/${user._id}/edit`)
                            }}
                        >
                            <Visibility />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit User">
                        <IconButton
                            sx={{ color: yellow[600] }}
                            onClick={() => {
                                navigate(`/accounts/${user._id}/edit`)
                            }}
                        >
                            <EditIcon />
                        </IconButton></Tooltip>
                    <Tooltip title="Delete User">
                        <IconButton
                            color="error"
                            onClick={deleteHandle(user._id, user.username)}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            }}
            muiTableProps={{
                sx: {
                    tableLayout: "fixed"
                }
            }}
            renderTopToolbarCustomActions={({ table }) => (
                <Button variant="outlined" startIcon={<Add />} onClick={() => {
                    navigate("/accounts/new");
                }}>
                    Thêm
                </Button>
            )}
        />
    </BasicLayout>
});