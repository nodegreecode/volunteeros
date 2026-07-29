import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";
import type { Organization } from "@/features/admin/adminTypes.ts";

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

type ProjectTableProps = {
  projects: Project[];
  onSelect: (project: Project) => void;
};

export default function ProjectTable({
  projects,
  onSelect,
}: ProjectTableProps) {
  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Location</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {projects?.map((p) => (
              <TableRow key={p.id} hover>
                <TableCell>{p.title}</TableCell>
                <TableCell>{p.description}</TableCell>
                <TableCell>{p.location}</TableCell>
                <TableCell align="right">
                  <Button variant="outlined" onClick={() => onSelect(p)}>
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
