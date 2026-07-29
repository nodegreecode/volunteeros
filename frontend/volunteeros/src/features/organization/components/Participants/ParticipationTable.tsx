import {
  Button,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stack,
} from "@mui/material";

import { useEffect, useState } from "react";

import ParticipantDrawer from "@/features/organization/components/Participants/ParticipantDrawer";
import { useUpdateParticipationStatus } from "@/features/organization/orgHooks.ts";

function statusColor(status: string) {
  switch (status) {
    case "APPROVED":
      return "success";

    case "REJECTED":
      return "error";

    default:
      return "warning";
  }
}

enum ParticipationStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  CANCELLED = "CANCELLED",
}

export interface Participant {
  id: number;
  projectId: number;
  projectName: string;
  volunteerId: number;
  volunteerFirstName: string;
  volunteerLastName: string;
  status: ParticipationStatus;
  joinedAt: string;
}

interface ParticipationTableProps {
  participants: Participant[];
}

export default function ParticipationTable({
  participants,
}: ParticipationTableProps) {
  const { mutate: updateParticipationStatus, isPending } =
    useUpdateParticipationStatus();

  const [selectedParticipant, setSelectedParticipant] =
    useState<Participant | null>(null);

  const [drawerOpen, setDrawerOpen] = useState(false);

  function handleView(participant: Participant) {
    setSelectedParticipant(participant);
    setDrawerOpen(true);
  }

  function handleStatusUpdate(
    participantId: number,
    status: ParticipationStatus,
  ) {
    updateParticipationStatus({
      participationId: participantId,
      status: status,
    });
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Volunteer</TableCell>
              <TableCell>Project</TableCell>
              <TableCell>Applied</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {participants.map((item: Participant) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div>{item.volunteerLastName}</div>
                  <small>{item.volunteerFirstName}</small>
                </TableCell>
                <TableCell>{item.projectName}</TableCell>
                <TableCell>
                  {new Date(item.joinedAt).toLocaleDateString()}
                </TableCell>

                <TableCell>
                  <Chip
                    label={item.status}
                    color={statusColor(item.status)}
                    size="small"
                  />
                </TableCell>

                <TableCell align="right">
                  <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => handleView(item)}
                    >
                      View
                    </Button>

                    {item.status === "PENDING" && (
                      <>
                        <Button
                          size="small"
                          color="success"
                          variant="contained"
                          disabled={isPending}
                          onClick={() =>
                            handleStatusUpdate(
                              item.id,
                              ParticipationStatus.APPROVED,
                            )
                          }
                        >
                          Approve
                        </Button>
                        <Button
                          size="small"
                          color="error"
                          variant="outlined"
                          disabled={isPending}
                          onClick={() =>
                            handleStatusUpdate(
                              item.id,
                              ParticipationStatus.REJECTED,
                            )
                          }
                        >
                          Reject
                        </Button>
                      </>
                    )}
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ParticipantDrawer
        open={drawerOpen}
        participant={selectedParticipant}
        onClose={() => setDrawerOpen(false)}
      />
    </>
  );
}
