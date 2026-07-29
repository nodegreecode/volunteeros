import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
} from "@mui/material";
import type { OrganizationApplicationResponseDto } from "@/features/admin/adminTypes.ts";

interface Project {
  id: string;
  title: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  status: string;
  requiredVolunteers: string;
  createdAt: string;
}

interface ApplicationTableProps {
  projects: Project[];
  onSelect?: (project: Project) => void;
}

export default function ApplicationTable({ projects, onSelect, }: ApplicationTableProps) {
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
        {projects.map((p) => (
          <TableRow
            hover
            key={p.id}
            onClick={() => onSelect(p)}
            sx={{
              cursor: "pointer",
            }}
          >
            <TableCell>{p.title}</TableCell>
            <TableCell>{p.description}</TableCell>
            <TableCell>{p.location}</TableCell>
            <TableCell>
              <Chip label={p.status} color="warning" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
