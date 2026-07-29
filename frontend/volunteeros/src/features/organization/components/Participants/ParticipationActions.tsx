import { Stack, Button } from "@mui/material";
import { useUpdateParticipationStatus } from "@/features/organization/orgHooks";
import type { Participant } from "./ParticipationTable";
import Loading from "@/components/common/Loading.tsx";

enum ParticipationStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  CANCELLED = "CANCELLED",
}

export default function ParticipationActions({
  participant, onApprove, onReject, isPending
}: {
  participant: Participant;
}) {

  return (
    <Stack direction="row" spacing={2}>
      <Button
        variant="contained"
        color="success"
        fullWidth
        disabled={isPending}
        onClick={onApprove}
      >
        Approve
      </Button>

      <Button
        variant="outlined"
        color="error"
        fullWidth
        disabled={isPending}
        onClick={onReject}
      >
        Reject
      </Button>
    </Stack>
  );
}
