import { Drafts } from "@mui/icons-material";
import { ListItemIcon, MenuItem, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { observer } from "mobx-react";
import { FC } from "react";
import { useStore } from "../../stores";
import { formatDDMMYYYY } from "../../utils";
import { NotificationWeb } from "../../models/NotificationWeb";

export const NotificationMenu: FC<{goto: (notification: NotificationWeb) => void}> = observer(({ goto }) => {
    const { sNotificationWeb } = useStore();

    return <>
        {sNotificationWeb.list.map((e) => (
            <MenuItem key={e._id} onClick={() => {goto(e)}}
                      style={{ ...(e.is_seen ? {} : { backgroundColor: grey[200] }) }}>
                <ListItemIcon>
                    <Drafts />
                </ListItemIcon>
                <Stack direction="column">
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{e.title}</Typography>
                    <Typography variant="body2" noWrap={true} sx={{ color: grey[500] }}
                                nonce={""}>{e.description}</Typography>
                    <Typography variant="caption"
                                sx={{ color: grey[500] }}>{formatDDMMYYYY(e.created_date)}</Typography>
                </Stack>
            </MenuItem>))}
    </>
})