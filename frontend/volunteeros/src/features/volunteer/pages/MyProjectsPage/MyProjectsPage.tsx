import { useState } from "react";
import {
  Card,
  Tabs,
  Tab,
  Container,
  Divider,
  Typography,
  Stack,
  Box,
} from "@mui/material";
import ApplicationList from "@/features/volunteer/components/ApplicationList.tsx";
import ApprovedProjectList from "@/features/volunteer/components/ApprovedProjectList";

export default function MyProjectsPage() {
  const [tab, setTab] = useState(0);

  return (
    <Container maxWidth="xl">
      <Stack spacing={3}>
        <Typography variant="h4">My Projects</Typography>

        <Card>
          <Tabs value={tab} onChange={(_, value) => setTab(value)}>
            <Tab label="Applications" />

            <Tab label="Approved Projects" />
          </Tabs>

          <Divider />

          <Box sx={{ p: 3 }}>
            {tab === 0 && <ApplicationList />}

            {tab === 1 && <ApprovedProjectList />}
          </Box>
        </Card>
      </Stack>
    </Container>
  );
}
