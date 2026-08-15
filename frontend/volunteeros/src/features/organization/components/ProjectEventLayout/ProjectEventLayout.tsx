import {Outlet, useParams} from "react-router-dom";
import {useProjectEvents} from "@/features/volunteer/volHooks.ts";
import Loading from "@/components/common/Loading.tsx";

export default function ProjectEventLayout() {

    const {projectId} = useParams();

    const {data: events, isLoading: isLoadingEvents} = useProjectEvents(Number(projectId));

    if (isLoadingEvents) {
        return <Loading/>
    }

    return <>
        <Outlet context={events}/>
    </>
}