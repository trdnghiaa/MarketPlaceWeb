import { Drafts, NotificationsRounded } from "@mui/icons-material";
import { Badge, Container, Divider, Grid, IconButton, Link as MLink, ListItemIcon, MenuItem, Stack, Typography } from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import { observer } from "mobx-react";
import { CSSProperties, FC, MouseEvent, useState } from "react";
import { useStore } from "../../stores";
import { formatSmartToday, MESSAGE_TERMS, TRANSLATE_TERMS } from "../../utils";
import { NotificationWeb } from "../../models";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import ListItem from "@mui/material/ListItem";
import Menu from "@mui/material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";


const styles: {[name: string]: CSSProperties} = {
    notificationLink: { width: "100%", textAlign: "center" },
    notification: { maxHeight: "50vh", minWidth: "30vw" }
}

export const NotificationMenu: FC = observer(({}) => {
    const [anchorElNotify, setAnchorElNotify] = useState<HTMLElement | null>(null);
    const { sNotificationWeb } = useStore();
    const navigator = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const handleOpenNotificationMenu = (event: MouseEvent<HTMLElement>) => {
        sNotificationWeb.init();
        setAnchorElNotify(event.currentTarget);
    };

    const gotoPage = (notification: NotificationWeb) => {
        handleCloseNotificationMenu();

        sNotificationWeb.seen(notification);

        navigator(notification.url);
    }

    const handleCloseNotificationMenu = () => {
        setAnchorElNotify(null);
    }

    const seenAllHandle = () => {
        try{
            sNotificationWeb.seenAll().then(([err, data]) => {
                if(err) throw err;

                enqueueSnackbar(MESSAGE_TERMS.get(data.message), {variant: "success"});
            });
        }catch (e) {
            enqueueSnackbar(MESSAGE_TERMS.get(e), {variant: "error"})
        }
    }

    return <Box sx={{ flexGrow: 0 }}>
        <Tooltip title={TRANSLATE_TERMS.OPEN_NOTIFICATION}>
            <ListItem sx={{ width: "fit-content" }}>
                <IconButton onClick={handleOpenNotificationMenu}>
                    <Badge badgeContent={sNotificationWeb.count} color="error">
                        <NotificationsRounded color="action"
                                              sx={{ minWidth: "2rem", color: blue[300] }} />
                    </Badge>
                </IconButton>
            </ListItem>
        </Tooltip>
        <Menu
            style={styles.notification}
            sx={{ mt: "45px" }}
            slotProps={{
                paper: {
                    sx: { padding: 0, minWidth: "500px", sm: { minWidth: "200px" }, "ul": { paddingBottom: 0 }, }
                },
                root: {
                    sx: { padding: 0 }
                }
            }}
            id="menu-appbar"
            anchorEl={anchorElNotify}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            open={Boolean(anchorElNotify)}
            onClose={handleCloseNotificationMenu}>
            <Container>
                <Grid container justifyContent="space-between" alignItems="center" style={styles.notification}>
                    <Typography variant="h6">{TRANSLATE_TERMS.NOTIFICATION}</Typography>
                    <MLink component="button" variant="subtitle1" onClick={seenAllHandle}>{TRANSLATE_TERMS.SEEN_ALL_NOTIFICATION}</MLink>
                </Grid>
                <Divider />
                <NotificationList goto={gotoPage} />
            </Container>
            <Grid container
                  sx={{ position: "sticky", bottom: 0, width: "100%", backgroundColor: grey[50], py: "4px", alignItems: "center" }}>
                <Link style={styles.notificationLink} to={"/notifications"}>{TRANSLATE_TERMS.GO_TO_NOTIFICATION_PAGE}</Link>
            </Grid>
        </Menu>
    </Box>
});

export const NotificationList: FC<{goto: (notification: NotificationWeb) => void}> = observer(({ goto }) => {
    const { sNotificationWeb } = useStore();

    return <>
        {sNotificationWeb.listMenu.map((e) => (
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
                                sx={{ color: grey[500] }}>{formatSmartToday(e.created_at)}</Typography>
                </Stack>
            </MenuItem>))}
    </>
})