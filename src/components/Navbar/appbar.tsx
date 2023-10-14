import { MouseEvent, useState } from "react";
import { AppBar, Avatar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography, } from "@mui/material/";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { ADMIN_SETTINGS, APP_NAME, MENU_ADMIN, MENU_SENSOR, theme } from "../../utils";
import { store, useStore } from "../../stores";
import { DropdownSetting } from "../Settings";
import { UserRole } from "../../models";

export const Appbar = () => {
    const { role } = useStore();
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{
                            mr: 2,
                            display: { xs: "none", md: "flex" },
                        }}
                    >
                        {APP_NAME}
                    </Typography>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "flex", md: "none" },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                            }}
                        >
                            {(role === UserRole.ADMIN ? MENU_ADMIN : MENU_SENSOR).map(({ name, path }) => (
                                <MenuItem key={name}>
                                    <Link to={path}>
                                        <Typography textAlign="center">
                                            {name}
                                        </Typography>
                                    </Link>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{
                            flexGrow: 1,
                            display: { xs: "flex", md: "none" },
                        }}
                    >
                        {APP_NAME}
                    </Typography>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", md: "flex" },
                        }}
                    >
                        {(role === UserRole.ADMIN ? MENU_ADMIN : MENU_SENSOR).map(({ name, path }) => (
                            <Link to={path} key={name}>
                                <Button
                                    key={name}
                                    onClick={handleCloseNavMenu}
                                    sx={{
                                        my: 2,
                                        color: "white",
                                        display: "block",
                                    }}
                                >
                                    {name}
                                </Button>
                            </Link>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <Button onClick={handleOpenUserMenu} color="inherit">
                                <Avatar src="/static/images/avatar/2.jpg" sx={{ margin: theme.spacing(1) }} />
                                <Typography color="white">{store.currentUser?.fullName}</Typography>
                            </Button>
                        </Tooltip>
                        <Menu
                            sx={{ mt: "45px" }}
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
                            onClose={handleCloseUserMenu}
                        >
                            <DropdownSetting menu={ADMIN_SETTINGS} closeHandle={handleCloseNavMenu} />
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
