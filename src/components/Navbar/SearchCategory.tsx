import React, { FC, useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import { styled } from "@mui/system";
import Paper from "@mui/material/Paper";
import { theme } from "src/utils";
import { useStore } from "src/stores";
import { TreeViewData } from "src/models";
import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import Icon from "@mui/material/Icon";
import { KeyboardArrowRight } from "@mui/icons-material";


const CustomPaper = styled(Paper)(({}) => ({
    "&": {
        position: "absolute",
        zIndex: theme.zIndex.modal,
        maxHeight: "50vh",
    },
}));

// top: (domRect?.bottom || 0) - 20, left: 0, right: domRect?.width
export const SearchCategory: FC<{open: boolean, domRect: DOMRect | null}> = observer(({ open, domRect }) => {
    const { sCategories } = useStore();
    const ref = useRef<HTMLDivElement>(null);
    const [domReactChild, setDomReactChild] = useState<DOMRect>();

    useEffect(() => {
        if (ref.current)
            setDomReactChild(ref.current.getBoundingClientRect());
    }, []);

    const renderMenu = (treeViewData: TreeViewData) => {
        console.log(domReactChild)
        return treeViewData.children.map(e => {
            return <MenuItem key={e._id} onMouseEnter={() => {e.set_open(true)}}
                             onMouseLeave={() => {
                                 e.set_open(false)
                             }} sx={{ position: "relative", px: 0 }}>
                <ListItemIcon>
                    <Icon baseClassName="material-icons-two-tone">{e.icon}</Icon>
                </ListItemIcon>
                <ListItemText>{e.name}</ListItemText>
                {e.children.length > 0 && <KeyboardArrowRight />}
                {e.children.length > 0 && <CustomPaper
                    elevation={6}
                    sx={{ display: e.open ? "block" : "none", top: 0, left: (domReactChild?.width || 0) - 20 }}>
                    {renderMenu(e)}
                </CustomPaper>}

            </MenuItem>
        })
    }
    return <CustomPaper elevation={6}
                        sx={{ display: open ? "block" : "none", top: (domRect?.bottom || 0) - 20, left: 0 }} ref={ref}>

        {renderMenu(sCategories.treeViewData)}
    </CustomPaper>
});