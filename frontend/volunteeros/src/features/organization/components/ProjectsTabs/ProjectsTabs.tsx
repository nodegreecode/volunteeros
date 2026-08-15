import {Tab, Tabs} from "@mui/material";
import {NavLink, useLocation} from "react-router-dom";

export default function ProjectsTabs() {
    const location = useLocation();

    const isParticipants = location.pathname.endsWith("/participants");

    const value = isParticipants ? 1 : 0;

    return <>

        <Tabs value={value}>
            <Tab

                label="All Projects"
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

                label="All Participants"
                component={NavLink}
                to="participants"
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