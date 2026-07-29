import { useOrganizationProjects } from "@/features/organization/orgHooks.ts";
import Loading from "@/components/common/Loading";
import OrganizationProjectsEmpty from "@/features/organization/components/OrganizationProjects/OrganizationProjectsEmpty";
import OrganizationProjectsOverview from "@/features/organization/components/OrganizationProjects/OrganizationProjectsOverview";

export default function OrganizationProjectPage() {
  const { projects, isLoading } = useOrganizationProjects();


  if (isLoading) {
    return <Loading />;
  }

  if (!projects || projects.length === 0) {
    return <OrganizationProjectsEmpty />;
  }

  return <OrganizationProjectsOverview projects={projects} />;
}
