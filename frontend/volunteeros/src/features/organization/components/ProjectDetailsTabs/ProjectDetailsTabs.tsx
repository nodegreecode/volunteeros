import {NavLink, useLocation} from "react-router-dom";
import {Tab, Tabs} from "@mui/material";

export default function ProjectDetailsTabs(){

    const location = useLocation();

    const isParticipants = location.pathname.endsWith("/participants");

    const value = isParticipants ? 1 : 0;

    return <>

        <Tabs value={value}>
            <Tab

                label="Events"
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

                label="Participants"
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