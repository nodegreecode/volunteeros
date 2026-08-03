import {Tabs, Tab} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";
import {NavLink} from "react-router-dom";

export default function AdminTabs() {

    //const navigate = useNavigate();
    const location = useLocation();

    const tabs = [
        {
            label: "Overview",
            path: "/app/admin"
        },
        {
            label: "Organizations",
            path: "/app/admin/organizations",
        },
        {
            label: "Projects",
            path: "/app/admin/projects",
        },
        {
            label: "Moderation",
            path: "/app/admin/moderation",
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