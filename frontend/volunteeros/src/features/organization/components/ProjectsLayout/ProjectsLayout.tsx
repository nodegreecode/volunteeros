import {Outlet} from "react-router-dom";
import {useOrganizationProjects} from "@/features/project/projectHook.ts";
import Loading from "@/components/common/Loading.tsx";



export default function ProjectsLayout() {

    const {data: projects, isLoading } = useOrganizationProjects();

    if (isLoading) {
        return <Loading />;
    }

    return<>
        <Outlet context={projects}/>
    </>
}