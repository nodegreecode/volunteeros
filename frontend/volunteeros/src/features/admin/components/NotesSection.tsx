import { Card, CardContent, Typography } from "@mui/material";

export default function NotesSection() {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Internal Notes
        </Typography>

        <Typography color="text.secondary">
          Organization submitted all required documents. Waiting for finance
          team verification before approval.
        </Typography>
      </CardContent>
    </Card>
  );
}
