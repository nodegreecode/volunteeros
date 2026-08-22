import {Tabs, Tab} from "@mui/material";
import {useLocation} from "react-router-dom";
import {NavLink} from "react-router-dom";

export default function VolunteerTabs() {

    const location = useLocation();

    const tabs = [
        {
            label: "Overview",
            path: "/app/volunteer",
        },
        {
            label: "Projects",
            path: "/app/volunteer/projects",
        },
        {
            label: "My Projects",
            path: "/app/volunteer/my-projects",
        },
        {
            label: "My Skills",
            path: "/app/volunteer/skills",
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