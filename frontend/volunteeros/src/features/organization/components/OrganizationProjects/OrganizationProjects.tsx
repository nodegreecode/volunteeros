import Loading from "@/components/common/Loading";
import OrganizationProjectsEmpty from "./OrganizationProjectsEmpty";
import OrganizationProjectsOverview from "./OrganizationProjectsOverview";
import { useOrganizationProjects } from "../projectHooks";

export default function OrganizationProjects() {
  const { projects, isLoading } = useOrganizationProjects();

  if (isLoading) {
    return <Loading />;
  }

  if (!projects || projects.length === 0) {
    return <OrganizationProjectsEmpty />;
  }

  return <OrganizationProjectsOverview projects={projects} />;
}
