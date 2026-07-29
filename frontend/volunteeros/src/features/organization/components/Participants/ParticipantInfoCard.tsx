import { Card, CardContent, Typography, Stack } from "@mui/material";

import type { Participant } from "./ParticipationTable";

export default function ParticipantInfoCard({
  participant,
}: {
  participant: Participant;
}) {
  return (
    <Card>
      <CardContent>
        <Typography variant="subtitle1">Volunteer Information</Typography>

        <Stack spacing={1} mt={2}>
          <Typography>
            <strong>Name:</strong> {participant.volunteerFirstName}{" "}
            {participant.volunteerLastName}
          </Typography>
          <Typography>
            <strong>Project:</strong> {participant.projectName}
          </Typography>
          <Typography>
            <strong>Joined:</strong>{" "}
            {new Date(participant.joinedAt).toLocaleString()}
          </Typography>

          <Typography>
            <strong>Status:</strong> {participant.status}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
