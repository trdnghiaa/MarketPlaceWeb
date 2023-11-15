import { CSSProperties, FC, MouseEvent, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";
import { UserDrawer } from "src/components/user";
import { APP_NAME, DRAWER_ITEMS, TRANSLATE_TERMS, USER_SETTINGS } from "src/utils";
import { useStore } from "src/stores";
import { observer } from "mobx-react-lite";
import { Button, Grid } from "@mui/material";
import { styled } from '@mui/system';
import { Link } from "react-router-dom";
import { DropdownSetting } from "src/components/Settings";
import { blue } from "@mui/material/colors";
import { NotificationMenu } from "src/components/NotificationWeb";
import { UserAvatar } from "src/components/Navbar/UserAvatar";


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

    useEffect(() => {
        if (isDone && isLoggedIn) {
            sNotificationWeb.init();
        }
    }, []);

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
                        {isLoggedIn && <NotificationMenu />}
                        {isLoggedIn ? (
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title={TRANSLATE_TERMS.OPEN_SETTINGS}>
                                    <Button onClick={handleOpenUserMenu("user")}>
                                        <UserAvatar user={currentUser} />
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