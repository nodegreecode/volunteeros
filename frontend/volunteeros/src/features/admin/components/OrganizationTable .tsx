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

type OrganizationTableProps = {
  organizations: Organization[];
  onSelect: (organization: Organization) => void;
};

export default function OrganizationTable({
  organizations,
  onSelect,
}: OrganizationTableProps) {
  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Applications</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {organizations.map((org) => (
              <TableRow key={org.id} hover>
                <TableCell>{org.orgName}</TableCell>
                <TableCell>{org.email}</TableCell>
                <TableCell>{org.applicationsCount}</TableCell>
                <TableCell align="right">
                  <Button variant="outlined" onClick={() => onSelect(org)}>
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
