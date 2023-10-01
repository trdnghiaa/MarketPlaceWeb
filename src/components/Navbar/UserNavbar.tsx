import {useState, MouseEvent, FC} from "react";
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
import {UserDrawer} from "../user";
import {
    LOGO_TRAVELOKA,
    DRAWER_ITEMS,
    DRAWER_ICONS, USER_SETTINGS, APP_NAME,
} from "../../utils/constraint";
import {store} from "../../stores";
import {observer} from "mobx-react-lite";
import {Button, Grid} from "@mui/material";
import { styled } from '@mui/system';
import {theme} from "../../utils/theme";
import {Link} from "react-router-dom";
import {DropdownSetting} from "../Settings";

const pages = DRAWER_ITEMS.slice(1);
const icons = DRAWER_ICONS.slice(1);

const PREFIX = "UNB-"

const classes = {
    toolbar: `${PREFIX}Toolbar`,
}

const Root = styled("div")({
    [`& .${classes.toolbar}`]: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        padding: theme.spacing(1),
    },
});

export const UserNavbar: FC<{}> = observer(() => {

    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <Root><AppBar position="static" color="inherit">
            <Grid
                container
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
            >
                <Toolbar disableGutters
                         className={classes.toolbar}
                >
                    <UserDrawer/>
                    <Grid style={{display: "flex", flexGrow: 1}}>
                        {/*<img src={LOGO_TRAVELOKA} alt="Logo"/>*/}
                        <Typography
                            variant="h4"
                            noWrap
                            component="div"
                            sx={{
                                mr: 2,
                                display: {xs: "none", md: "flex"},
                            }}
                        >
                            {APP_NAME}
                        </Typography>
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
                        {pages.map(({title, link}, index) => (
                            <Link to={link ? link : "/"} key={title}>
                                <ListItem
                                    button
                                    sx={{
                                        width: "fit-content",
                                    }}
                                >

                                    <ListItemIcon
                                        sx={{minWidth: "2rem"}}
                                    >
                                        <img
                                            src={icons[index]}
                                            alt="Menu Icon"
                                        ></img>
                                    </ListItemIcon>
                                    <ListItemText primary={title}/>
                                </ListItem>
                            </Link>
                        ))}
                    </Box>
                    {store.isLoggedIn ? (
                        <Box sx={{flexGrow: 0}}>
                            <Tooltip title="Open settings">
                                <Button onClick={handleOpenUserMenu}>
                                    <Avatar src="/static/images/avatar/2.jpg" sx={{margin: theme.spacing(1)}}/>
                                    <Typography color="black">{store.currentUser?.fullName}</Typography>
                                </Button>
                            </Tooltip>
                            <Menu
                                sx={{mt: "45px"}}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}>
                                <DropdownSetting menu={USER_SETTINGS} closeHandle={handleCloseUserMenu}/>
                            </Menu>
                        </Box>
                    ) : (
                        <>
                            <Link to="/Login">
                                <Button>Login</Button>
                            </Link>
                            <Typography sx={{m: 1}}>/</Typography>
                            <Link to="/signup">
                                <Button>Sign Up</Button>
                            </Link>
                        </>
                    )}
                </Toolbar>
            </Grid>
        </AppBar></Root>
    );
});