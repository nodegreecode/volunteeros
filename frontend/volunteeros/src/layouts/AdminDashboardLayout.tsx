import {Box, Paper} from "@mui/material";

import {Outlet} from "react-router-dom";
import AdminTabs from "@/features/admin/components/AdminTabs/AdminTabs.tsx";

export default function AdminDashboardLayout() {
    return <>
        <Box>
            <Paper sx={{mb: 3}}>
                <AdminTabs/>
            </Paper>
            <Outlet/>
        </Box>
    </>
}