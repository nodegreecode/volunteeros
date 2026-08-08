import {Tab, Tabs} from "@mui/material";
import {NavLink, useLocation} from "react-router-dom";

export default function AccountSettingsTabs() {

    const location = useLocation();

    const tabs = [
        {
            label: "Personal Information",
            path: "/app/profile"
        },
        {
            label: "Account & Data",
            path: "/app/profile/account-and-data",
        },

    ];

    const activeTab = tabs.findIndex(tab => location.pathname === tab.path);

    return (<Tabs
        value={activeTab}
    >
        {tabs.map(tab => (
            <Tab
                key={tab.path}
                label={tab.label}
                component={NavLink}
                to={tab.path}
                sx={{
                    "&.Mui-selected": {
                        fontWeight: "bold",
                    },
                }}
            />
        ))}
    </Tabs>)
}