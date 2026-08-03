import {Outlet} from "react-router-dom";
import Header from "@/components/Header/Header.tsx";
import Sidebar from "@/components/Sidebar/Sidebar";
import {Box} from "@mui/material";
import {Toolbar} from "@mui/material";
import {menuConfig} from "@/components/Sidebar/menuConfig.ts";
import {useProfile} from "@/features/auth/authHooks.ts";


export default function DashboardLayout() {

    const {data: user} = useProfile();

    if (!user) {
        return null;
    }

    const menuItems = menuConfig[user.roles[0]];

    return (
        <>
            <Box
                sx={{display: "flex", flexDirection: "column", minHeight: "100vh"}}
            >
                <Header/>
                <Toolbar/>
                <Box
                    sx={{
                        display: "flex",
                        flex: 1,
                    }}
                >
                    <Sidebar items={menuItems}/>

                    <Box
                        component="main"
                        sx={{
                            flex: 1,
                            p: 3,
                        }}
                    >
                        <Outlet/>
                    </Box>
                </Box>
            </Box>
        </>
    );
}
