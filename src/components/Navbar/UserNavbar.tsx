import { CSSProperties, FC, MouseEvent, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";
import { UserDrawer } from "../user";
import { APP_NAME, DRAWER_ITEMS, theme, TRANSLATE_TERMS, USER_SETTINGS } from "../../utils";
import { useStore } from "../../stores";
import { observer } from "mobx-react-lite";
import { Badge, Button, Container, Divider, Grid, IconButton } from "@mui/material";
import { styled } from '@mui/system';
import { Link, useNavigate } from "react-router-dom";
import { DropdownSetting } from "../Settings";
import { blue, grey } from "@mui/material/colors";
import { NotificationsRounded } from "@mui/icons-material";
import { NotificationMenu } from "../NotificationWeb";
import { NotificationWeb } from "../../models";


const pages = DRAWER_ITEMS.slice(1);



const PREFIX = "UNB-"

const classes = {
    appbar: `${PREFIX}Appbar`,
    toolbar: `${PREFIX}Toolbar`,
    linkItems: `${PREFIX}items`,
    notification: `${PREFIX}notification`,
}

const styles: {[name: string]: CSSProperties} = {
    notificationLink: { width: "100%", textAlign: "center" },
    gridRoot: { display: "flex", flexGrow: 1 },
}

const Root = styled("div")({
    '&': {
        width: "100%",
    },
    [`& .${classes.appbar}`]: {
        // width: "100vw"
    },
    [`& .${classes.toolbar}`]: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
    },
    [`& .${classes.linkItems}`]: { alignItems: "center", display: "flex" },
    [`& .${classes.notification}`]: { maxHeight: "50vh", minWidth: "30vw" },
});

export const UserNavbar: FC = observer(() => {
    const { isLoggedIn, currentUser, sNotificationWeb, isDone } = useStore();
    const [anchorElUser, setAnchorElUser] = useState<{user: HTMLElement | null, notify: HTMLElement | null}>({ user: null, notify: null });
    const navigator = useNavigate();

    const handleOpenUserMenu = (name: string) => {
        return (event: MouseEvent<HTMLElement>) => {

            "notify" === name && sNotificationWeb.init();

            setAnchorElUser((state) => ({ ...state, [name]: event.currentTarget }));
        }
    };
    const handleCloseUserMenu = (name: string) => {
        return () => {
            setAnchorElUser((state) => ({ ...state, [name]: null }));
        }
    }

    const gotoPage = (notification: NotificationWeb) => {
        handleCloseUserMenu("notify")();

        sNotificationWeb.seen(notification);

        navigator(notification.url);
    }

    useEffect(() => {
        if (isDone && isLoggedIn) {
            sNotificationWeb.init();
        }
    });

    return (
        <Root>
            <AppBar position="static" color="inherit" className={classes.appbar}>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Toolbar disableGutters className={classes.toolbar}>
                        <UserDrawer />
                        <Grid style={styles.gridRoot}>
                            {/*<img src={APP_LOGO_URL} width={64} alt="Logo"/>*/}
                            <Link style={{ color: "black" }} to={"/"}>
                                <Typography
                                    variant="h4"
                                    noWrap
                                    component="div"
                                    sx={{
                                        mr: 2,
                                        display: { xs: "none", md: "flex" },
                                    }}
                                >
                                    <Typography sx={{ fontWeight: 900 }} variant="h4">
                                        {APP_NAME.split(" ")[0]}
                                    </Typography>
                                    <Typography variant="h4" sx={{ fontWeight: 100, textDecoration: "underline" }}>
                                        {APP_NAME.split(" ")[1]}
                                    </Typography>
                                </Typography>
                            </Link>
                        </Grid>
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: {
                                    xs: "none",
                                    md: "flex",
                                },
                                justifyContent: "end",
                            }}
                        >
                            {pages.map(({ title, link, Icon }) => (
                                <Link to={link ? link : "/"} key={title} className={classes.linkItems}>
                                    <ListItem
                                        sx={{
                                            width: "fit-content", color: blue[800]
                                        }}
                                    >
                                        <ListItemIcon
                                            sx={{ minWidth: "2rem", color: blue[300] }}
                                        >
                                            <Icon />
                                        </ListItemIcon>
                                        <ListItemText primary={title} />
                                    </ListItem>
                                </Link>
                            ))}
                        </Box>
                        {isLoggedIn &&
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title={TRANSLATE_TERMS.OPEN_NOTIFICATION}>
                                    <ListItem sx={{ width: "fit-content" }}>
                                        <IconButton onClick={handleOpenUserMenu("notify")}>
                                            <Badge badgeContent={sNotificationWeb.count} color="error">
                                                <NotificationsRounded color="action"
                                                                      sx={{ minWidth: "2rem", color: blue[300] }} />
                                            </Badge>
                                        </IconButton>
                                    </ListItem>
                                </Tooltip>
                                <Menu
                                    className={classes.notification}
                                    sx={{ mt: "45px" }}
                                    slotProps={{
                                        paper: {
                                            sx: { padding: 0, "ul": { paddingBottom: 0 } }
                                        },
                                        root: {
                                            sx: { padding: 0 }
                                        }
                                    }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser.notify}
                                    anchorOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    open={Boolean(anchorElUser.notify)}
                                    onClose={handleCloseUserMenu("notify")}>
                                    <Container>
                                        <Grid container justifyContent="space-between" alignItems="center"
                                              className={classes.notification}>
                                            <Typography variant="h6">{TRANSLATE_TERMS.NOTIFICATION}</Typography>
                                            <Link to={"/notifications"}>
                                                <Typography
                                                    variant="subtitle1">{TRANSLATE_TERMS.SEEN_ALL_NOTIFICATION}
                                                </Typography>
                                            </Link>
                                        </Grid>
                                        <Divider />
                                        <NotificationMenu goto={gotoPage} />
                                    </Container>
                                    <Grid container
                                          sx={{ position: "sticky", bottom: 0, width: "100%", backgroundColor: grey[50], py: "4px", alignItems: "center" }}>
                                        <Link style={styles.notificationLink}
                                              to={"/notifications"}>{TRANSLATE_TERMS.NOTIFICATION_PAGE}</Link>
                                    </Grid>
                                </Menu>
                            </Box>
                        }
                        {isLoggedIn ? (
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title={TRANSLATE_TERMS.OPEN_SETTINGS}>
                                    <Button onClick={handleOpenUserMenu("user")}>
                                        <Avatar src="/static/images/avatar/2.jpg" sx={{ margin: theme.spacing(1) }} />
                                        <Typography color="black">{currentUser?.fullName}</Typography>
                                    </Button>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: "45px" }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser.user}
                                    anchorOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    open={Boolean(anchorElUser.user)}
                                    onClose={handleCloseUserMenu("user")}>
                                    <DropdownSetting menu={USER_SETTINGS} closeHandle={handleCloseUserMenu("user")} />
                                </Menu>
                            </Box>
                        ) : (
                            <>
                                <Link to="/Login">
                                    <Button>{TRANSLATE_TERMS.LOGIN_TEXT}</Button>
                                </Link>
                                <Typography sx={{ m: 1 }}>/</Typography>
                                <Link to="/signup">
                                    <Button>{TRANSLATE_TERMS.SIGNUP_TEXT}</Button>
                                </Link>
                            </>
                        )}
                    </Toolbar>
                </Grid>
            </AppBar>
        </Root>
    );
});