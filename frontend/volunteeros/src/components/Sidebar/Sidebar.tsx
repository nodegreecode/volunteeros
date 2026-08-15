import {

    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Box,
    Avatar,
    Button
} from "@mui/material";
import {styled} from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import {NavLink, useNavigate, Link as RouterLink} from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FolderIcon from "@mui/icons-material/Folder";
import SettingsIcon from "@mui/icons-material/Settings";
import MailIcon from "@mui/icons-material/Mail";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import {DRAWER_WIDTH, DRAWER_COLLAPSED_WIDTH} from "@/shared/layout/layout.ts";
import {useState} from "react";
import type {MouseEvent} from "react";
import avatar from "@/assets/planting-flowers.jpg";
import {useLogout} from "@/features/auth/authHooks.ts";

interface MenuItem {
    label: string;
    path: string;
}

interface SidebarProps {
    items: MenuItem[];
}

const HEADER_HEIGHT = 64;

const openedMixin = (theme: any) => ({
    width: DRAWER_WIDTH,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});

const closedMixin = (theme: any) => ({
    width: DRAWER_COLLAPSED_WIDTH,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
});

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})<{ open: boolean }>(({theme, open}) => ({
    width: DRAWER_WIDTH,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",

    ...(open && {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": {...openedMixin(theme), backgroundColor: "#F1F2F7"}
    }),

    ...(!open && {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": {...closedMixin(theme), backgroundColor: "#F1F2F7"}
    }),

}));

export default function Sidebar({items, isOpen, user}: SidebarProps) {

    const navigate = useNavigate();

    const logoutMutation = useLogout();

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    function handleOpenMenu(event: MouseEvent<HTMLElement>) {
        setAnchorEl(event.currentTarget);
    }

    function handleCloseMenu() {
        setAnchorEl(null);
    }

    function handleLogout() {
        handleCloseMenu();
        logoutMutation.mutate(undefined, {
            onSuccess: () => {
                navigate("/auth/login");
            },
        });
    }

    return (
        <>
            <Drawer
                variant="permanent"
                open={isOpen}
            >
                <Box component={RouterLink} to="/app" sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 1.5,
                    height: HEADER_HEIGHT,
                    //pt: 2,
                    textDecoration: "none",
                    color: "inherit",
                    borderBottom: "1px solid #eee",
                }}>
                    <Avatar src={user?.avatar?.url} variant="rounded" sx={{width: 36, height: 36}}/>
                    <Box component="span"
                         sx={{
                             fontWeight: 600,
                             fontSize: 16,
                             opacity: isOpen ? 1 : 0,
                             transition: "opacity .2s",
                             whiteSpace: "nowrap"
                         }}>
                        VolunteerOS
                    </Box>

                </Box>

                <List
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        flex: 1
                    }}
                >
                    {items.map((item) => (
                        <ListItem key={item.path} disablePadding>
                            <ListItemButton component={NavLink} to={item.path} sx={{
                                minHeight: 48,
                                justifyContent: isOpen ? "initial" : "center",
                                px: 2.5
                            }}>
                                <ListItemIcon>
                                    {item.label === "Dashboard" ? (<DashboardIcon/>) : (<FolderIcon/>)}
                                </ListItemIcon>
                                <ListItemText primary={item.label} sx={{
                                    opacity: isOpen ? 1 : 0,
                                    transition: "opacity .2s",
                                    whiteSpace: "nowrap"
                                }}/>
                            </ListItemButton>
                        </ListItem>
                    ))}
                    <Box sx={{mt: "auto"}}>
                        <ListItem disablePadding>
                            <ListItemButton
                                sx={{
                                    gap: 1,
                                }}
                                onClick={handleOpenMenu}>
                                <ListItemIcon>
                                    <Avatar src={user?.avatar?.url}/>
                                </ListItemIcon>
                                <ListItemText
                                    primary={`${user.firstName} ${user.lastName}`}
                                    secondary={user.email}
                                    sx={{
                                        minWidth: 0, // important inside flex layouts
                                        "& .MuiListItemText-primary": {
                                            fontSize: "0.85rem",
                                            fontWeight: 500,
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap",
                                        },
                                        "& .MuiListItemText-secondary": {
                                            fontSize: "0.75rem",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap",
                                        },
                                    }}

                                />
                            </ListItemButton>
                        </ListItem>
                    </Box>
                </List>

                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleCloseMenu}
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                    }}
                    slotProps={{
                        paper: {
                            sx: {
                                ml: 2
                            }
                        }
                    }}
                >
                    <MenuItem component={NavLink} to="profile" onClick={handleCloseMenu}
                              sx={{gap: 1, minWidth: 220}}>
                        <ListItemIcon sx={{minWidth: 32}}>
                            <SettingsIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Account Settings"/>
                    </MenuItem>
                    <MenuItem component={NavLink} to="contact" onClick={handleCloseMenu}
                              sx={{gap: 1, minWidth: 220}}>
                        <ListItemIcon sx={{minWidth: 32}}>
                            <MailIcon/>
                        </ListItemIcon>
                        <ListItemText primary=" Contact"/>
                    </MenuItem>
                    <MenuItem onClick={handleLogout} disabled={logoutMutation.isPending}
                              sx={{gap: 1, minWidth: 220}}>
                        <ListItemIcon sx={{minWidth: 32}}>
                            <LogoutIcon/>
                        </ListItemIcon>
                        <ListItemText primary=" Log out"/>
                    </MenuItem>
                </Menu>
            </Drawer>

        </>
    );
}
