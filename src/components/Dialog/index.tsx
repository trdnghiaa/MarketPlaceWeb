import { FC, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from "@mui/material";
import { DialogType, useStore } from "@stores";

export const ConfirmDialog: FC<{}> = observer(({}) => {
    const { sDialog } = useStore();

    useEffect(() => {}, [sDialog.controller[DialogType.confirm].isOpen]);

    return <Dialog
        open={sDialog.getIsOpenByName(DialogType.confirm)}
        onClose={sDialog.closeHandleByName(DialogType.confirm)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogTitle id="alert-dialog-title">
            {sDialog.controller["confirm"].questionText || ""}
        </DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                <Typography variant={"body1"}
                            dangerouslySetInnerHTML={{ __html: sDialog.controller["confirm"].descriptionText || "" }}></Typography>
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button
                onClick={sDialog.closeHandleByName(DialogType.confirm)}>{sDialog.controller["confirm"].disagreeButtonText || "Hủy"}</Button>
            <Button onClick={sDialog.actionHandleByName(DialogType.confirm)} autoFocus>
                {sDialog.controller["confirm"].agreeButtonText || "Đồng Ý"}
            </Button>
        </DialogActions>
    </Dialog>
})