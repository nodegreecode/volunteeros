import {
  Box,
  Typography,
  Container,
  Stack,
  Card,
  Tabs,
  Tab,
  Divider,
  Badge,

} from "@mui/material";
import { useState, useEffect } from "react";
import ProjectTable from "@/features/admin/components/ProjectTable .tsx";
import ProjectDrawer from "@/features/admin/components/ProjectDrawer";
import Loading from "@/components/common/Loading.tsx";
import ProjectsApplicationDrawer from "@/features/admin/components/ProjectsApplicationDrawer";
import ProjectsApplicationTable from "@/features/admin/components/ProjectsApplicationTable";
import type { Organization } from "@/features/admin/adminTypes.ts";
import type { OrganizationApplicationResponseDto } from "@/features/admin/adminTypes.ts";
import {
  useProjects,
  usePendingModerationProjects,
  useActivateProject,
  useCancelProject,
  usePendingProjectsSse,
} from "@/features/admin/adminHooks";

interface Project {
  id: string;
  title: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  status: string;
  requiredVolunteers: string;
  createdAt: string;
}

export default function AdminProjectsPage() {
  const { projects, isLoading : isLoadingProjects, isError } = useProjects();
  const { pendingProjects, isLoading: isLoadingPendingProjects } = usePendingModerationProjects();
  const { mutate: activate, isPending :  isPendingActivateProject } = useActivateProject();
  const { mutate: cancel, isPending : isPendingCancelProject } = useCancelProject();

  const { notifications, notificationCount } = usePendingProjectsSse();

  const [tab, setTab] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const [selectedPendingProject, setSelectedPendingProject] =
    useState<Project | null>(null);

  if (isLoadingProjects) {
    return <Loading />;
  }


  function handleActivateProject(projectId: number) {
    if (!selectedPendingProject) {
      return;
    }

    activate({ projectId });
  }

  function handleCancelProject(projectId: number) {
    if (!selectedPendingProject) {
      return;
    }

    cancel({ projectId });
  }

  return (
    <>
      <Container maxWidth="xl">
        <Stack spacing={3}>
          <Box>
            <Typography variant="h4">Projects</Typography>

            <Typography color="text.secondary">
              Manage organizations and review applications
            </Typography>
          </Box>

          <Card>
            <Tabs value={tab} onChange={(_, value) => setTab(value)}>
              <Tab label="Projects" />
              <Tab
                label={
                  <Badge badgeContent={notificationCount} color="error">
                    Applications
                  </Badge>
                }
              />
            </Tabs>

            <Divider />

            {tab === 0 && (
              <ProjectTable projects={projects} onSelect={setSelectedProject} />
            )}

            {tab === 1 && (
              <ProjectsApplicationTable
                projects={pendingProjects}
                onSelect={setSelectedPendingProject}
              />
            )}
          </Card>

          <ProjectDrawer
            open={!!selectedProject}
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
          {selectedPendingProject && (
            <ProjectsApplicationDrawer
              open={!!selectedPendingProject}
              project={selectedPendingProject}
              onClose={() => setSelectedPendingProject(null)}
              onApprove={() => handleActivateProject(selectedPendingProject.id)}
              onReject={() => handleCancelProject(selectedPendingProject.id)}
            />
          )}
        </Stack>
      </Container>
    </>
  );
}
