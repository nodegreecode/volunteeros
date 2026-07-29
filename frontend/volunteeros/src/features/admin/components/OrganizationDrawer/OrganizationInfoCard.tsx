import { Card, CardContent, Typography, Stack } from "@mui/material";
import InfoRow from "@/features/admin/components/InfoRow.tsx";
import type { Organization } from "@/features/admin/adminTypes.ts";

interface OrganizationInfoCardProps {
  organization: Organization;
}

export default function OrganizationInfoCard({ organization }: OrganizationInfoCardProps) {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Organization Information
        </Typography>

        <Stack spacing={2}>
          <InfoRow label="Organization Form: " value={organization.orgForm} />
          <InfoRow label="Description: " value={organization.description} />
          <InfoRow label="Address: " value={organization.city} />
          <InfoRow label="Email: " value={organization.email} />
          <InfoRow label="Phone: " value={organization.phone} />
          <InfoRow label="Website: " value={organization.website} />
          <InfoRow label="Created: " value={organization.createdAt} />
        </Stack>
      </CardContent>
    </Card>
  );
}
