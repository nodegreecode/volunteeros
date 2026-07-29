import { Box, Typography, Container, Stack, Grid } from "@mui/material";
import {
  useAllActiveProjects,
  useApplyForProject,
} from "@/features/volunteer/volHooks.ts";
import ProjectCard from "@/features/volunteer/components/ProjectCard.tsx";


export default function VolunteerProjectsPage() {
  const { projects } = useAllActiveProjects();

  const { mutate: applyForProject, isPending } = useApplyForProject();

  function handleApplyForProject(projectId: number) {
    applyForProject({ projectId });
  }

  return (
    <Container maxWidth="xl">
      <Stack spacing={3}>
        <Box>
          <Typography variant="h4">Browse Projects</Typography>

          <Typography color="text.secondary">
            Find volunteering opportunities
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {projects?.map((project) => (
            <Grid
              size={{
                xs: 12,
                sm: 6,
                md: 3,
              }}
              sx={{
                display: "flex",
              }}
              key={project.id}
            >
              <ProjectCard project={project} onApply={handleApplyForProject} isApplying={isPending} />
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Container>
  );
}
