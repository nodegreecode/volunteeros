import { Card, CardContent, Stack, Typography } from "@mui/material";

export default function ParticipationStats({ participations }) {

  const totleParticipations = participations.length ?? 0;
  const rejected = participations.reduce((acc, current) => {
    const status = current.status;
    if (status === "REJECTED") {
      return acc + 1;
    }

    return acc;
  }, 0);

  const approved = participations.reduce((acc, current) => {
    const status = current.status;
    if (status === "APPROVED") {
      return acc + 1;
    }

    return acc;
  }, 0);

  const pending = participations.reduce((acc, current) => {
    const status = current.status;
    if (status === "PENDING") {
      return acc + 1;
    }

    return acc;
  }, 0);

  const statsNew = [
    {
      label: "Pending",
      value: pending,
    },
    {
      label: "Approved",
      value: approved,
    },
    {
      label: "Rejected",
      value: rejected,
    },
    {
      label: "Total",
      value: totleParticipations,
    },
  ];

  return (
    <Stack direction="row" spacing={2}>
      {statsNew.map((item) => (
        <Card key={item.label} sx={{ flex: 1 }}>
          <CardContent>
            <Typography color="text.secondary">{item.label}</Typography>

            <Typography variant="h4">{item.value}</Typography>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}
