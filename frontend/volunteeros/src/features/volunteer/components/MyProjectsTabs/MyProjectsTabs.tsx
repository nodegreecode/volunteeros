import {Tab, Tabs} from "@mui/material";
import {NavLink, useLocation} from "react-router-dom";

export default function MyProjectsTabs() {
    const location = useLocation();

    const isParticipants = location.pathname.endsWith("/participation");

    const value = isParticipants ? 1 : 0;

    return<>
        <Tabs value={value}>
            <Tab

                label="Approved Projects"
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

                label="Participation Applications"
                component={NavLink}
                to="participation"
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