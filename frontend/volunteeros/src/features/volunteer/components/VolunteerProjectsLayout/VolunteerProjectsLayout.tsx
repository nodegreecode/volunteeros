import {Outlet} from "react-router-dom";
import VolunteerProjectsTabs from "@/features/volunteer/components/VolunteerProjectsTabs/VolunteerProjectsTabs.tsx";

export default function VolunteerProjectsLayout() {

    return <>
        <VolunteerProjectsTabs/>
        <Outlet/>
    </>
}