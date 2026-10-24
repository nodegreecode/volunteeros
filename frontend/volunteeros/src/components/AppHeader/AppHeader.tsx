import {AppBar, Toolbar, Typography,Box, Badge, Popover, ListItem, ListItemText, List} from "@mui/material";
import {
    useNotifications,
    useUnreadNotifications,
    useMarkNotificationAsRead
} from "@/features/users/userHooks.ts";

import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {useMatches} from "react-router-dom";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import Divider from "@mui/material/Divider";
import {useState} from "react";


export default function AppHeader({toggleDrawer}) {

    const matches = useMatches();

    const {data: notifications} = useNotifications();

    const {data: unreadNotifications} = useUnreadNotifications();

    const {mutate: markNotificationAsRead} = useMarkNotificationAsRead();

    const title = matches.map(match => match.handle?.title)
        .filter(Boolean)
        .pop() || "VolunteerOS";

    const [notificationAnchor, setNotificationAnchor] = useState<null | HTMLButtonElement>(null);

    function handleNotificationClick(event: React.MouseEvent<HTMLButtonElement>) {
        setNotificationAnchor(event.currentTarget);
    }

    function handleNotificationClose() {
        setNotificationAnchor(null);
    }

    function handleMarkAsReadNotification(notificationId: number) {
        markNotificationAsRead(notificationId);
    }

    const notificationsOpen = Boolean(notificationAnchor);

    return (
        <AppBar
            position="static"
            elevation={0}
            sx={{
                width: "100%",
                borderBottom: "1px solid #eee",
                color: "inherit",
                backgroundColor: "#fff",
            }}
        >
            <Toolbar sx={{justifyContent: "space-between"}}>
                {/* Left side */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                    }}
                >
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={toggleDrawer}
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="h1">
                        {title}
                    </Typography>
                </Box>
                {/* Right side */}
                <IconButton edge="start" color="inherit" onClick={handleNotificationClick}>
                    <Badge badgeContent={unreadNotifications?.length} invisible={unreadNotifications?.length === 0}
                           color="error">
                        <NotificationsNoneIcon/>
                    </Badge>
                </IconButton>
            </Toolbar>
            <Popover
                open={notificationsOpen}
                anchorEl={notificationAnchor}
                onClose={handleNotificationClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <Box sx={{width: 360, maxWidth: "90vw"}}>
                    <Box sx={{p: 2}}>
                        <Typography variant="h6">
                            Notifications
                        </Typography>
                    </Box>

                    <Divider/>

                    <List disablePadding>
                        {notifications?.map((notification) => (
                            <>
                                <ListItem sx={{
                                    backgroundColor: notification?.read ? "transparent" : "action.hover",
                                }}
                                          onClick={() => handleMarkAsReadNotification(notification.id)}
                                          key={notification.id}>
                                    <ListItemText
                                        primary={`Notification title: ${notification.title}`}
                                        secondary={notification.message}
                                    />
                                </ListItem>

                                <Divider/>
                            </>

                        ))}
                    </List>
                </Box>
            </Popover>
        </AppBar>

    );
}
