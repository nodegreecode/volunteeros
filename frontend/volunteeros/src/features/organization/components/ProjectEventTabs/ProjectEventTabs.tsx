import {Tab, Tabs} from "@mui/material";
import {NavLink, useLocation} from "react-router-dom";

export default function ProjectEventTabs() {

    const location = useLocation();

    const isRegistration = location.pathname.endsWith("/registration");
    const isCheckIn = location.pathname.endsWith("/check-in");

    const value = isCheckIn ? 2 : isRegistration ? 1 : 0;

    return (<Tabs value={value}>
        <Tab

            label="Information"
            component={NavLink}
            to="."
            sx={{
                textTransform: "none",
                "&.Mui-selected": {
                    fontWeight: "bold",
                },
            }}
        />
        <Tab

            label="Registration"
            component={NavLink}
            to="registration"
            sx={{
                textTransform: "none",
                "&.Mui-selected": {
                    fontWeight: "bold",
                },
            }}
        />
        <Tab

            label="Check-In"
            component={NavLink}
            to="check-in"
            sx={{
                textTransform: "none",
                "&.Mui-selected": {
                    fontWeight: "bold",
                },
            }}
        />
    </Tabs>)
}