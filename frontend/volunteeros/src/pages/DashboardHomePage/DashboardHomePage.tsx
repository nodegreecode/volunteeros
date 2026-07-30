import { useAuth } from "@/features/auth/authHooks.ts";
import {
  Box,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

export default function DashboardHomePage() {
  //const { isLoading } = useAuth();

 /* if (isLoading) {
    return <div>Loading...</div>;
  } */

  return (
    <Box sx={{ maxWidth: 900, mx: "auto" }}>
      <Typography variant="h4" gutterBottom>
        Welcome to the Volunteer Platform
      </Typography>

      <Typography variant="body1" sx={{ mb: 6 }}>
        This dashboard is your central place for managing your activity on the
        platform. Depending on your role, you can create and manage projects,
        browse volunteering opportunities, review applications, and keep your
        profile up to date.
      </Typography>

      <Card sx={{ mb: 6 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            🚀 Getting Started
          </Typography>

          <List>
            <ListItem>
              <ListItemText
                primary="Complete your profile"
                secondary="Add your contact information, biography, and any additional details to help others learn more about you."
              />
            </ListItem>

            <ListItem>
              <ListItemText
                primary="Explore the navigation menu"
                secondary="Use the sidebar to access projects, applications, participants, and other features available for your account."
              />
            </ListItem>

            <ListItem>
              <ListItemText
                primary="Stay up to date"
                secondary="Visit your dashboard regularly to track new applications, project updates, and notifications."
              />
            </ListItem>
          </List>
        </CardContent>
      </Card>

      <Card sx={{ mb: 6 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            💡 Tips for Using the Platform
          </Typography>

          <Typography>
            Keep your profile information current so other users can easily
            identify and contact you.
          </Typography>

          <Typography>
            Review new projects and applications frequently to avoid missing
            important opportunities.
          </Typography>

          <Typography>
            Use the navigation menu to quickly switch between sections of the
            platform. Each page is designed to help you complete common tasks
            efficiently.
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            📚 Need Help?
          </Typography>

          <Typography>
            If you experience any issues while using the platform, please
            contact the support team or refer to the documentation provided by
            your organization.
          </Typography>

          <Typography>
            As the platform evolves, additional features and tools will become
            available through the dashboard.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
