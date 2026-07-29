import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import { NavLink } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FolderIcon from "@mui/icons-material/Folder";
import { DRAWER_WIDTH } from "@/shared/layout/layout.ts";

interface MenuItem {
  label: string;
  path: string;
}

interface SidebarProps {
  items: MenuItem[];
}

const HEADER_HEIGHT = 64;

export default function Sidebar({ items }: SidebarProps) {
  const menuItems = items;

  return (
    <>
      <Drawer
        variant="permanent"
        sx={{
          width: DRAWER_WIDTH,

          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
            top: HEADER_HEIGHT,
            height: `calc(100% - ${HEADER_HEIGHT}px)`,
          },
        }}
      >
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.path}>
              <ListItemButton component={NavLink} to={item.path}>
                <ListItemIcon>
                  {item.label === "Home" ? <DashboardIcon /> : <FolderIcon />}
                </ListItemIcon>
                <ListItemText>{item.label}</ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}
