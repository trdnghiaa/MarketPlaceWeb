import React, { FC } from "react";
import { Button, Container, IconButton, Popover } from "@mui/material";
import Icon from '@mui/material/Icon';
import { useStore } from "src/stores";

export const IconPopoverSelect: FC<{setIcon: Function, icon: string}> = ({ setIcon, icon }) => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const { iconDB } = useStore();

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = 'simple-popover';

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const cancelHandle = () => {}

    const selectIconHandle = ((name: string) => () => {
        setIcon(name);
        handleClose()
    });


    return <>
        <IconButton onClick={handleClick} aria-describedby={id}>
            <Icon baseClassName="material-icons-two-tone">{icon ? icon : "add_reaction"}</Icon>
        </IconButton>
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
        >
            <Container maxWidth={"xs"} fixed sx={{ height: "50vh", px: 0 }}>
                {iconDB.map((e: any) => (<Button color={"inherit"} key={e.name} onClick={selectIconHandle(e.name)}>
                    <Icon baseClassName="material-icons-two-tone" fontSize={"large"}>{e.name}</Icon></Button>))}
            </Container>
        </Popover>

    </>
};
