import {
  Card,
  CardContent,
  Typography,
  Button,
  Divider,
  Box,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";

import type { Organization } from "@/features/admin/adminTypes.ts";

interface Props {
  organization: Organization;
  onEdit: () => void;
}

export default function OrganizationDetailsCard({
  organization,
  onEdit,
}: Props) {
  console.log(organization.website);
  console.log(organization.city);

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">Organization Information</Typography>
          <Button startIcon={<EditIcon />} onClick={onEdit}>
            Edit
          </Button>
        </Box>

        <Divider sx={{ my: 3 }} />
        <Typography variant="subtitle1">
          <strong>Organization name:</strong> {organization.orgName}
        </Typography>
        <Typography variant="subtitle1">
          <strong>Organization form:</strong> {organization.orgForm}
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography>
            <strong>Description:</strong> {organization.description}
          </Typography>
          <Typography>
            <strong>Website:</strong> {organization.website}
          </Typography>
          <Typography>
            <strong>Location:</strong> {organization.city}
          </Typography>
          <Typography>
            <strong>Phone:</strong> {organization.phone}
          </Typography>
          <Typography>
            <strong>Email:</strong> {organization.email}
          </Typography>
          <Typography>
            <strong>Created:</strong> {organization.createdAt}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
