import {Tab, Tabs} from "@mui/material";
import {NavLink, useLocation} from "react-router-dom";

export default function VolunteerProjectsTabs() {
    const location = useLocation();

    const isParticipants = location.pathname.endsWith("/my-projects");

    const value = isParticipants ? 1 : 0;

    return <>

        <Tabs value={value}>
            <Tab

                label="Browse Projects"
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

                label="My Projects"
                component={NavLink}
                to="../my-projects"
                sx={{
                    textTransform: "none",
                    "&.Mui-selected": {
                        fontWeight: "bold",
                    },
                }}
            />

        </Tabs>
    </>
}