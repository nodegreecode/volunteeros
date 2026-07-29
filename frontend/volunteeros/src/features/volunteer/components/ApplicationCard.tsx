import {
  Stack,
  Card,
  Typography,
  Chip,
  Button,
  CardActions,
  CardContent,
} from "@mui/material";

import type { ProjectParticipationResponseDto } from "@/features/volunteer/volTypes";
import { useWithdrawParticipation } from "@/features/volunteer/volHooks.ts";

type ApplicationCardProps = {
  application: ProjectParticipationResponseDto;
};


export default function ApplicationCard({ application }: ApplicationCardProps) {
  const { mutate: withdraw, isPending } = useWithdrawParticipation();

  const canWithdraw = application.status === "PENDING";

  function handleWithdraw(participationId: string) {
    withdraw({ participationId });
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{application.projectTitle}</Typography>
        <Typography color="text.secondary">
          {application.organizationName}
        </Typography>
        <Stack sx={{ mt: 2 }} spacing={1}>
          <Chip
            label={application.status}
            color={
              application.status === "APPROVED"
                ? "success"
                : application.status === "REJECTED"
                  ? "error"
                  : "warning"
            }
          />

          <Typography>
            Applied: {new Date(application.joinedAt).toLocaleDateString()}
          </Typography>
          {application.status === "REJECTED" && (
            <Typography>
              Rejected: {new Date(application.rejectedAt).toLocaleDateString()}
            </Typography>
          )}
        </Stack>
      </CardContent>

      <CardActions>
        {canWithdraw && (
          <Button
            color="error"
            variant="outlined"
            onClick={() => handleWithdraw(application.id)}
            disabled={isPending}
          >
            Withdraw
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
