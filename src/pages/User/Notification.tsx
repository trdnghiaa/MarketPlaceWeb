import { observer } from "mobx-react-lite";
import * as React from "react";
import { FC, ReactElement, useCallback, useEffect } from "react";
import { BasicLayout } from "src/layouts/common";
import { Card, CardActionArea, cardActionAreaClasses, cardClasses, CardContent, Chip, Divider, Grid, ListItemIcon, ListItemText, MenuItem, MenuList, Paper, Skeleton, Typography } from "@mui/material";
import { formatSmartToday, theme, TRANSLATE_TERMS } from "src/utils";
import { AccessTime, AllInbox, CircleNotificationsOutlined, PermIdentity, SupervisorAccount } from "@mui/icons-material";
import { useStore } from "src/stores";
import styled from "@emotion/styled";
import { grey } from "@mui/material/colors";
import { NotificationWeb } from "src/models";

const Root = styled(Paper)({
    [`& .${cardClasses.root}`]: {
        padding: 0,
    },
    [`& .${cardActionAreaClasses.root}`]: {
        backgroundColor: grey[100],
        padding: theme.spacing(2)
    }
});

const getIconByType = (type: string): ReactElement => {
    switch (type) {
        case "ACCOUNT":
            return <PermIdentity />;
        case "POST":
            return <AllInbox />;
        case "CHAT":
            return <SupervisorAccount />;
        case "all":
            return <CircleNotificationsOutlined />
        default:
            return <></>;
    }
}

/**
 * @see {@link https://stackoverflow.com/questions/57778950/how-to-load-more-search-results-when-scrolling-down-the-page-in-react-js|Scroll End To Load More}
 */
export const NotificationPage: FC = observer(({}) => {
    const { sNotificationWeb } = useStore();

    const handleScroll = useCallback(() => {
        if (document.scrollingElement && window.innerHeight + document.documentElement.scrollTop === document.scrollingElement.scrollHeight && !sNotificationWeb.isPageLoading && sNotificationWeb.currentPage < sNotificationWeb.countPage - 1) {
            sNotificationWeb.set_currentPage(sNotificationWeb.currentPage + 1);
            sNotificationWeb.loadMore();
        }
    }, []);

    useEffect(() => {
        window.removeEventListener('scroll', handleScroll, true);
        window.addEventListener('scroll', handleScroll, true);
        sNotificationWeb.initForPage();
    }, []);

    const setTypeHandle = (type:  string) => {
        return () => {
            sNotificationWeb.set_currentPage(0);
            sNotificationWeb.set_countPage(0);
            sNotificationWeb.set_listPage([]);
            sNotificationWeb.set_currentType(type);
            sNotificationWeb.loadMore();
        }
    };

    /**
     * Get key from object and sort first char on string
     */
    const notificationType: string[] = Object.keys(sNotificationWeb.types)
        .sort((a, b) => b.charCodeAt(0) - a.charCodeAt(0));

    return <BasicLayout>
        <Root elevation={4}>
            <Typography variant={"h4"} sx={{ fontWeight: "bold" }}>{TRANSLATE_TERMS.NOTIFICATION}</Typography>
            <Divider />
            <Grid container spacing={2} direction={{ xs: "column", sm: "row" }}>
                <Grid item sm={3}>
                    <MenuList>
                        {notificationType.map((e) => (<MenuItem key={e} onClick={setTypeHandle(e)} selected={e == sNotificationWeb.currentType}>
                            <ListItemIcon>
                                {getIconByType(e)}
                            </ListItemIcon>
                            <ListItemText>{TRANSLATE_TERMS[e.toUpperCase()] || e}</ListItemText>
                            <Typography variant="body2" color="primary">{sNotificationWeb.types[e] || 0}</Typography>
                        </MenuItem>))}
                    </MenuList>
                    <Divider />
                </Grid>

                <Grid item sm={9} container spacing={1} direction="column">
                    {sNotificationWeb.listPage.map(e => <NotificationItem notification={e} />)}
                    {sNotificationWeb.isPageLoading && [...new Array(10)].map((e, i) => <NotificationItemSkeleton
                        key={i} keyProps={i} />)}
                </Grid>
            </Grid>
        </Root>
    </BasicLayout>
})

const NotificationItem: FC<{notification: NotificationWeb}> = observer(({ notification }) => {
    const getColorByType = (type: string) => {
        switch (type) {
            case "ACCOUNT":
                return "info";
            case "POST":
                return "secondary";
            case "CHAT":
                return "primary";
            default:
                return "default";
        }
    }

    return <Grid item key={notification._id} flexGrow={1}>
        <Card variant="elevation">
            <CardActionArea onClick={() => {}}>
                <CardContent>
                    <Grid container direction={"row"} justifyContent={"space-between"} alignItems={"center"}
                          sx={{ mb: theme.spacing(2) }}>
                        <Chip label={notification.type} color={getColorByType(notification.type)}
                              icon={getIconByType(notification.type)} />
                        <Grid item display={"flex"}>
                            <AccessTime fontSize={"small"} sx={{ mr: theme.spacing(1) }} />
                            <Typography variant={"body2"}>{formatSmartToday(notification.created_at)}</Typography>
                        </Grid>
                    </Grid>
                    <Grid sx={{ ml: theme.spacing(2) }}>
                        <Typography variant={"h6"} fontWeight={"600"}>{notification.title}</Typography>
                        <Typography variant={"body2"} color={grey[500]}>{notification.description}</Typography>
                    </Grid>
                </CardContent>
            </CardActionArea>
        </Card>
    </Grid>
})

export const NotificationItemSkeleton: FC<{keyProps: number}> = ({ keyProps }) => {
    return <Card variant="elevation" key={keyProps}>
        <CardActionArea>
            <CardContent>
                <Grid container direction={"row"} justifyContent={"space-between"} alignItems={"center"}
                      sx={{ mb: theme.spacing(2) }}>
                    <Skeleton variant="rounded" sx={{ minWidth: 100, height: 30, borderRadius: 20 }} />
                    <Grid item display={"flex"}>
                        <Skeleton variant="circular" width={32} height={32} />
                        <Skeleton variant="text" sx={{ minWidth: 100, ml: 2 }} />
                    </Grid>
                </Grid>
                <Grid sx={{ ml: theme.spacing(2) }}>
                    <Skeleton variant="text" width={"100%"} height={40} />
                    <Skeleton variant="text" width={"100%"} />
                    <Skeleton variant="text" width={"100%"} />
                </Grid>
            </CardContent>
        </CardActionArea>
    </Card>
}