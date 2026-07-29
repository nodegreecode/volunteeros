import { Grid, Card, CardContent, Typography } from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import PeopleIcon from "@mui/icons-material/People";
import EventIcon from "@mui/icons-material/Event";

import type { Organization } from "@/features/admin/adminTypes.ts";

export default function OrganizationStats({
  organization,
}: {
  organization: Organization;
}) {
  const stats = [
    {
      title: "Projects",
      value: organization.projectsCount,
      icon: <FolderIcon fontSize="large" />,
    },
    {
      title: "Volunteers",
      value: organization.volunteersCount,
      icon: <PeopleIcon fontSize="large" />,
    },
    {
      title: "Events",
      value: organization.eventsCount,
      icon: <EventIcon fontSize="large" />,
    },
  ];
  return (
    <Grid container spacing={3} mb={4}>
      {stats.map((stat) => (
        <Grid item xs={12} md={4} key={stat.title}>
          <Card elevation={2}>
            <CardContent
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              {stat.icon}

              <div>
                <Typography variant="h4">{stat.value}</Typography>

                <Typography color="text.secondary">{stat.title}</Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

