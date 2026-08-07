import {Outlet} from "react-router-dom";
import Header from "@/components/Header/Header.tsx";
import Sidebar from "@/components/Sidebar/Sidebar";
import {Box} from "@mui/material";
//import {Toolbar} from "@mui/material";
import {menuConfig} from "@/components/Sidebar/menuConfig.ts";
import {useProfile} from "@/features/auth/authHooks.ts";
import {useState} from "react";

export default function DashboardLayout() {

    const {data: user} = useProfile();

    if (!user) {
        return null;
    }

    const [isOpen, setIsOpen] = useState(true);

    const menuItems = menuConfig[user.roles[0]];

    function toggleDrawer() {
        setIsOpen(!isOpen);
    }

    return (
        <>
            <Box sx={{display: "flex", minHeight: "100vh"}}>
                <Sidebar items={menuItems} isOpen={isOpen} user={user}/>

                <Box sx={{display: "flex", flexDirection: "column", flex: 1,}}>
                    <Header drawerOpen={isOpen} toggleDrawer={toggleDrawer}/>

                    <Box component="main" sx={{flex: 1, py: 3, px:10}}>
                        <Box sx={{maxWidth: 1300, mx: "auto", width: "100%"}}>
                            <Outlet/>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
}
