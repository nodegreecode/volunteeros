import {Tabs, Tab} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";
import {NavLink} from "react-router-dom";

export default function OrganizationTabs() {

    //const navigate = useNavigate();
    const location = useLocation();

    const tabs = [
        {
            label: "Overview",
            path: "/app/organization",
        },
        {
            label: "Organization",
            path: "/app/organization/organization",
        },
        {
            label: "Projects",
            path: "/app/organization/projects",
        },
        {
            label: "Participants",
            path: "/app/organization/participants",
        },
    ];

    const activeTab = tabs.findIndex(tab => location.pathname === tab.path);
    return (
        <Tabs
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
        </Tabs>
    )
}