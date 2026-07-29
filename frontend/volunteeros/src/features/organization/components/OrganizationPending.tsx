import { Card, CardContent, Typography, Chip, Stack, Box } from "@mui/material";

interface OrganizationPendingProps {
  id: number;
  organizationForm: string;
  organizationName: string;
  applicationStatus: string;
  description: string;
  memberRole: string;
  submittedAt: string;
  reviewedAt: string;
}
import PendingActionsIcon from "@mui/icons-material/PendingActions";

export default function OrganizationPending({
  application,
}: OrganizationPendingProps) {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "start",
          height: "100%",
        }}
      >
        <Card
          sx={{
            maxWidth: 500,
            mx: "auto",
            mt: 4,
          }}
        >
          <CardContent>
            <Stack spacing={2}>
              <Stack direction="row" spacing={1} alignItems="center">
                <PendingActionsIcon color="warning" />

                <Typography variant="h6">Application Under Review</Typography>
              </Stack>

              <Typography>
                Organization:
                <strong> {application.organizationName}</strong>
              </Typography>
              <Chip
                label={application.applicationStatus}
                color="warning"
                sx={{
                  width: "fit-content",
                }}
              />
              <Typography variant="body2" color="text.secondary">
                Submitted:
                {new Date(application.submittedAt).toLocaleDateString()}
              </Typography>

              <Typography variant="body2">
                Your organization application is currently being reviewed. You
                will receive a notification after the review is completed.
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}
