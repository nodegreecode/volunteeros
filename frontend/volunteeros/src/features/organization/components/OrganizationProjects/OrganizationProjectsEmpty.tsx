import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useOrganization } from "@/features/organization/orgHooks";

export default function OrganizationProjectsEmpty() {
  const { organization, isLoading } = useOrganization();
  const canCreateProject = !!organization;
  return (
    <div>
      <h2>No projects yet</h2>

      {canCreateProject ? (
        <p>
          Create your first volunteer project to start accepting volunteers.
        </p>
      ) : (
        <p>
          You need to create an organization first before you can create
          volunteer projects.
        </p>
      )}

      <Button
        component={Link}
        to="create"
        variant="contained"
        disabled={isLoading || !canCreateProject}
      >
        Create Project
      </Button>
    </div>
  );
}
