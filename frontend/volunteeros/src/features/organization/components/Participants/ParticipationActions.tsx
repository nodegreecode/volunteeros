import { Stack, Button } from "@mui/material";
import type { Participant } from "./ParticipationTable";

export default function ParticipationActions({onApprove, onReject, isPending
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
