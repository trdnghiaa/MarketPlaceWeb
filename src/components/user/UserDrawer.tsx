import { Fragment, KeyboardEvent, MouseEvent, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, } from "@mui/material";

import { DRAWER_ITEMS } from "src/utils";
import { Link } from "react-router-dom";
import { blue } from "@mui/material/colors";

type Anchor = "left";

export const UserDrawer = () => {
    const [state, setState] = useState({
        left: false,
    });

    const toggleDrawer =
        (anchor: Anchor, open: boolean) =>
            (event: KeyboardEvent | MouseEvent) => {
                if (
                    event.type === "keydown" &&
                    ((event as KeyboardEvent).key === "Tab" ||
                        (event as KeyboardEvent).key === "Shift")
                ) {
                    return;
                }

                setState({ ...state, [anchor]: open });
            };

    const list = (anchor: Anchor) => (
        <Box
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {DRAWER_ITEMS.map(({ title, link, Icon, isDrawer },) => (
                    isDrawer && <Link to={link ? link : "/"} key={title}>
                        <ListItem sx={{ color: blue[800] }}>
                            <ListItemIcon sx={{ color: blue[300] }}>
                                <Icon />
                            </ListItemIcon>
                            <ListItemText primary={title} />
                        </ListItem>
                    </Link>
                ))}
            </List>
            <Divider />
            <List>
                {/*{SERVICES.map(({code, name, icon}, index) => (*/}
                {/*    <ListItem button key={code}>*/}
                {/*        <ListItemIcon>*/}
                {/*            <img src={icon}></img>*/}
                {/*        </ListItemIcon>*/}
                {/*        <ListItemText primary={name}/>*/}
                {/*    </ListItem>*/}
                {/*))}*/}
            </List>
        </Box>
    );

    return (
        <Fragment key="left">
            <MenuIcon
                onClick={toggleDrawer("left", true)}
                style={{ cursor: "pointer", marginRight: "1rem" }}
            ></MenuIcon>

            <Drawer
                open={state["left"]}
                onClose={toggleDrawer("left", false)}
            >
                {list("left")}
            </Drawer>
        </Fragment>
    );
};
