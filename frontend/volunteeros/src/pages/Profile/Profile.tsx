import {Box, Paper} from "@mui/material";

import {Outlet, useOutletContext} from "react-router-dom";
import AccountSettingsTabs from "@/features/users/components/AccountSettingsTabs/AccountSettingsTabs.tsx";

export default function Profile() {

    const {user} = useOutletContext();

    return (
        <Box sx={{display: "flex", justifyContent: "center"}}>

            <Paper sx={{width: "100%", maxWidth: 900, mb: 3}}>
                <AccountSettingsTabs/>
                <Box>
                    <Outlet context={{user}}/>
                </Box>
            </Paper>

        </Box>
    );
}