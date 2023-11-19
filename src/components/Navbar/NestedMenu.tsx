import * as React from 'react';
import { FC } from 'react';
import { Button, ClickAwayListener, Grow, Icon, ListItemIcon, ListItemText, MenuItem, MenuList, Paper, Popper, Typography } from '@mui/material';
import { Category, TreeViewData } from "src/models";
import MenuIcon from "@mui/icons-material/Menu";
import { theme } from "src/utils";

// Array<{
//     name: string;
//     icon: string;
//     menuLevel: number;
//     nestedOptions?: SubMenuProps['options'];
// }>;
type SubMenuProps = {
    height: number;
    options: TreeViewData[];
    clickHandle: (data: TreeViewData) => void;
    category: Category;
};


/**
 * @param options
 * @param height
 * @constructor
 * @see {@link https://deploy-preview-37570--material-ui.netlify.app/material-ui/react-menu/#nested-menu|Nested Menu}
 */
function SubMenu({ options, height, clickHandle, category }: SubMenuProps) {
    const [anchors, setAnchors] = React.useState<{
        elements: Array<null | HTMLElement>;
        options: Array<null | typeof options>;
    }>({
        elements: new Array(height).fill(null),
        options: new Array(height).fill(null),
    });

    const duration = React.useRef<Record<string, number>>({});
    const mouseEntered = React.useRef<Record<string, boolean>>({});

    const handleOpen = (
        event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
        level = 0,
        nestedOptions = options,
    ) => {
        const target = event.currentTarget;
        setAnchors((prevAnchors) => ({
            elements: prevAnchors.elements.map((element, index) =>
                index === level ? (nestedOptions.length ? target : null) : element,
            ),
            options: prevAnchors.options.map((element, index) =>
                index === level ? nestedOptions : element,
            ),
        }));
    };
    const handleClose = (level: number) => {
        setAnchors((prevAnchors) => ({
            elements: prevAnchors.elements.map((element, index) =>
                index >= level ? null : element,
            ),
            options: prevAnchors.options.map((element, index) =>
                index >= level ? null : element,
            ),
        }));
    };

    const buttonRef = React.useRef(null);

    const getId = (option: (typeof options)[0], index: number) => {
        return `${index}-${option.height}`;
    };

    return (
        <React.Fragment>
            <Button
                ref={buttonRef}
                onClick={(event) => {
                    handleOpen(event);
                }}
                startIcon={<MenuIcon />}
            >
                <Typography>{category.name}</Typography>
            </Button>

            {anchors.elements.map((anchorElement, index) =>
                anchorElement ? (
                    <Popper
                        open={Boolean(anchorElement)}
                        anchorEl={anchorElement}
                        key={`${anchorElement.innerText} menu`}
                        role={undefined}
                        placement={index > 0 ? 'right-start' : 'bottom-start'}
                        sx={{ zIndex: theme.zIndex.appBar + 3 }}
                        transition
                    >
                        {({ TransitionProps }) => (
                            <Grow
                                {...TransitionProps}
                                style={{
                                    transformOrigin: 'left top',
                                }}
                            >
                                <Paper>
                                    <ClickAwayListener
                                        onClickAway={(e) => {
                                            if (e.target === buttonRef.current) {
                                                handleClose(0);
                                                return;
                                            }

                                            const optionWithoutSubMenu = anchors.elements.every(
                                                (element) => !e.composedPath().includes(element!),
                                            );

                                            if (optionWithoutSubMenu) {
                                                handleClose(0);
                                            }
                                        }}
                                    >
                                        <MenuList
                                            autoFocusItem={Boolean(anchorElement)}
                                            id="nested-menu"
                                            aria-labelledby="nested-button"
                                        >
                                            {(anchors.options[index] ?? []).map((option, optIndex) => (
                                                <MenuItem
                                                    key={option.name}
                                                    aria-haspopup={!!option.children ?? undefined}
                                                    aria-expanded={
                                                        option.children
                                                            ? anchors.elements.some(
                                                                (element) => element?.innerText === option.name,
                                                            )
                                                            : undefined
                                                    }
                                                    onClick={() => {
                                                        clickHandle(option);
                                                        if (!option.children) {
                                                            handleClose(0);
                                                        }
                                                    }}
                                                    onMouseMove={(event) => {
                                                        if (
                                                            duration.current[getId(option, optIndex)] &&
                                                            !mouseEntered.current[getId(option, optIndex)]
                                                        ) {
                                                            if (
                                                                Date.now() -
                                                                duration.current[getId(option, optIndex)] >
                                                                20
                                                            ) {
                                                                mouseEntered.current[getId(option, optIndex)] = true;
                                                                if (!option.children) {
                                                                    handleClose(option.height + 1);
                                                                } else if (
                                                                    option.children &&
                                                                    anchors.options[option.height + 1] &&
                                                                    !option.children.every((val, i) => {
                                                                        if (!anchors.options[option.height + 1]?.length) {
                                                                            return false;
                                                                        }
                                                                        return val.name ===
                                                                            anchors.options[option.height + 1]?.[i].name;
                                                                    })
                                                                ) {
                                                                    handleClose(option.height + 1);
                                                                    handleOpen(
                                                                        event,
                                                                        option.height + 1,
                                                                        option.children,
                                                                    );
                                                                } else {
                                                                    handleOpen(
                                                                        event,
                                                                        option.height + 1,
                                                                        option.children,
                                                                    );
                                                                }
                                                            }
                                                        }
                                                    }}
                                                    onMouseLeave={() => {
                                                        duration.current[getId(option, optIndex)] = 0;
                                                        mouseEntered.current[getId(option, optIndex)] = false;
                                                    }}
                                                    onMouseEnter={() => {
                                                        duration.current[getId(option, optIndex)] = Date.now();
                                                    }}
                                                    onKeyDown={(event) => {
                                                        if (option.children.length) {
                                                            if (
                                                                event.key === 'ArrowRight' ||
                                                                event.key === 'Enter'
                                                            ) {
                                                                handleOpen(
                                                                    event,
                                                                    option.height + 1,
                                                                    option.children,
                                                                );
                                                            }
                                                        }
                                                        if (event.key === 'ArrowLeft' && option.height > 0) {
                                                            handleClose(option.height);
                                                            anchors.elements[option.height]?.focus();
                                                        }

                                                        if (event.key === 'Escape') {
                                                            handleClose(0);
                                                        }
                                                    }}
                                                >
                                                    <ListItemIcon>
                                                        <Icon
                                                            baseClassName="material-icons-two-tone">{option.icon}</Icon>
                                                    </ListItemIcon>
                                                    <ListItemText>{option.name}</ListItemText>
                                                    {option.children.length > 0 ? (
                                                        <Icon
                                                            baseClassName="material-icons-two-tone">chevron_right</Icon>
                                                    ) : null}
                                                </MenuItem>
                                            ))}
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                ) : null,
            )}
        </React.Fragment>
    );
}

export const NestedMenu: FC<{data: TreeViewData, height: number, clickHandle: (data: TreeViewData) => void, category: Category}> = ({ data, height, clickHandle, category }) => {
    return <SubMenu options={data.children} height={height + 1} clickHandle={clickHandle} category={category} />;
}