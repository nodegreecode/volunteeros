import { List, ListItem, Chip,  ListItemText } from "@mui/material";
import type { OrganizationApplicationResponseDto } from "@/features/admin/adminTypes.ts";

interface ApplicationsSectionProps {
  applications: OrganizationApplicationResponseDto[];
}

const statusLabelColor: Record<string, "warning" | "error" | "success"> = {
  PENDING: "warning",
  REJECTED: "error",
  APPROVED: "success",
};

export default function ApplicationsSection({ applications }: ApplicationsSectionProps) {


  return (
    <List>
      {applications?.map(
        (application: OrganizationApplicationResponseDto, index : number) => (
          <ListItem key={index}>
            <ListItemText
              primary="Organization Application"
              secondary={application.submittedAt}
            />

            <Chip
              label={application.applicationStatus}
              color={
                statusLabelColor[application?.applicationStatus] || "default"
              }
            />
          </ListItem>
        ),
      )}
    </List>
  );
}
