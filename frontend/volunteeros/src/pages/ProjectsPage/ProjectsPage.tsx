import { useAuth } from "@/features/auth/authHooks.ts";
import Loading from "@/components/common/Loading.tsx";
import OrganizationProjectPage from "@/features/organization/pages/OrganizationProjectPage/OrganizationProjectPage.tsx";
import VolunteerProjectsPage from "@/features/volunteer/pages/VolunteerProjectsPage/VolunteerProjectsPage";
import AdminProjectsPage from "@/features/admin/ProjectsPage/AdminProjectsPage.tsx";

export default function ProjectsPage() {
  const { user, isAuthenticated, userIsLoading } = useAuth();

  if (userIsLoading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return null;
  }

  const userRole = user.roles[0];

  switch (userRole) {
    case "ROLE_ORGANIZATION":
      return <OrganizationProjectPage />;
    case "ROLE_VOLUNTEER":
      return <VolunteerProjectsPage />;
    case "ROLE_ADMIN":
      return <AdminProjectsPage />;
    default:
      return null;
  }
}
