import { FC, useCallback, useEffect, useMemo } from "react";

import { BasicLayout } from "../../layouts/common";
import { observer } from "mobx-react-lite";
import { useSnackbar } from "notistack";
import { useStore } from "../../stores";
import { MaterialReactTable, MRT_ColumnDef } from "material-react-table";
import { User } from "../../models/User";
import { Box, Button, IconButton } from "@mui/material";
import { Add, Delete as DeleteIcon, Edit as EditIcon, } from '@mui/icons-material';

import { MRT_Localization_VI } from "material-react-table/locales/vi";
import { setTitle } from "../../utils";
import { useNavigate } from "react-router-dom";
import { Visibility } from "@mui/icons-material/";
import { PAGINATION_SIZE_LIST } from "../../config";
import { Tooltip } from "@mui/material/";
import { yellow } from "@mui/material/colors";
import { DialogType } from "../../stores/DialogStore";
import { MESSAGE_TERMS } from "../../utils/messageTerms";


export const Account: FC<{}> = observer(({}) => {
    const { sAccount, sDialog } = useStore();
    const { enqueueSnackbar } = useSnackbar();

    const navigate = useNavigate();

    useEffect(() => {
        setTitle("Quản lý tài khoản");
    }, [])

    useEffect(() => {
        sAccount.init();
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
            // size: 40,
            // enableResizing: true
        },
    ], []);

    const handleClose = useCallback(() => {}, []);

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
            renderRowActions={({ row, table }) => (
                <Box sx={{ display: 'flex', flexWrap: 'nowrap', marginRight: "10rem", gap: '2px' }}>
                    <Tooltip title="Impersonate User">
                        <IconButton

                            onClick={() => {
                                navigate(`/accounts/${row.original._id}/edit`)
                            }}
                        >
                            <Visibility />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit User">
                        <IconButton
                            sx={{ color: yellow[600] }}
                            onClick={() => {
                                navigate(`/accounts/${row.original._id}/edit`)
                            }}
                        >
                            <EditIcon />
                        </IconButton></Tooltip>
                    <Tooltip title="Delete User">
                        <IconButton
                            color="error"
                            onClick={() => {
                                sDialog.openDialog(DialogType.confirm, MESSAGE_TERMS.DELETE_USER_QUESTION.replace("{user}",`@${ row.original.username}`), MESSAGE_TERMS.DELETE_USER_DESCRIPTION, () => {
                                    window.alert("delete");
                                }, {agreeButtonText: "Xóa"});
                            }}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            )}
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