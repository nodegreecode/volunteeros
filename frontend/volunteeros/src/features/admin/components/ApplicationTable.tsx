import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
} from "@mui/material";
import type { OrganizationApplicationResponseDto } from "@/features/admin/adminTypes.ts";


interface ApplicationTableProps {
  applications: OrganizationApplicationResponseDto[];
  onSelect: (application: OrganizationApplicationResponseDto) => void;
}

export default function ApplicationTable({ applications, onSelect }: ApplicationTableProps) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Organization</TableCell>
          <TableCell>Applicant</TableCell>
          <TableCell>Submitted</TableCell>
          <TableCell>Status</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {applications.map((app: OrganizationApplicationResponseDto) => (
          <TableRow
            hover
            key={app.id}
            onClick={() => onSelect(app)}
            sx={{
              cursor: "pointer",
            }}
          >
            <TableCell>{app.organizationForm}</TableCell>
            <TableCell>{app.organizationName}</TableCell>
            <TableCell>{app.submittedAt}</TableCell>
            <TableCell>
              <Chip label={app.applicationStatus} color="warning" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
