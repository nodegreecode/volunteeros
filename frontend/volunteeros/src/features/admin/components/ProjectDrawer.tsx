import { Box, Drawer, Divider } from "@mui/material";
import ProjectDrawerHeader from "@/features/admin/components/ProjectDrawerHeader";
import NotesSection from "@/features/admin/components/NotesSection.tsx";
import ProjectInfoCard from "@/features/admin/components/ProjectInfoCard.tsx";

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

type ProjectDrawerProps = {
  open: boolean;
  project: Project | null;
  onClose: () => void;
};

export default function ProjectDrawer({
  open,
  project,
  onClose,
}: ProjectDrawerProps) {
  return (
    <>
      <Drawer anchor="right" open={open} onClose={onClose}>
        <Box
          sx={{
            width: 500,
            p: 3,
          }}
        >
          {project && (
            <>
              <ProjectDrawerHeader  title={project.title} status={project.status} onClose={onClose} />
              <ProjectInfoCard project={project} />
              <Divider />

              <Divider />
              <NotesSection />
            </>
          )}
        </Box>
      </Drawer>
    </>
  );
}
