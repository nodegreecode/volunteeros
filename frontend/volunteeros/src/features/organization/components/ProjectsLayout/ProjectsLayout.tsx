import {Outlet} from "react-router-dom";
import {useOrganizationProjects} from "@/features/organization/orgHooks.ts";
import Loading from "@/components/common/Loading.tsx";
import OrganizationProjectsEmpty
    from "@/features/organization/components/OrganizationProjects/OrganizationProjectsEmpty.tsx";


export default function ProjectsLayout() {

    const {data: projects, isLoading } = useOrganizationProjects();

    if (isLoading) {
        return <Loading />;
    }

    if (!projects || projects.length === 0) {
        return <OrganizationProjectsEmpty />;
    }
    return<>
        <Outlet context={projects}/>
    </>
}