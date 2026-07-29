import { Box, IconButton, Typography, Chip } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import type { Participant } from "@/features/organization/components/Participants/ParticipationTable";
import { useEffect, useState } from "react";

interface Props {
  participant: Participant;
  onClose: () => void;
}

function statusColor(status: string) {
  switch (status) {
    case "APPROVED":
      return "success";
    case "REJECTED":
      return "error";
    case "PENDING":
      return "warning";
    case "CANCELLED":
      return "default";
    default:
      return "default";
  }
}

export default function ParticipantDrawerHeader({
  participant,
  onClose,
}: Props) {



  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Box>
        <Typography variant="h6">
          {participant?.volunteerFirstName} {participant?.volunteerLastName}
        </Typography>

        <Chip
          label={participant.status}
          color={statusColor(participant.status)}
          size="small"
        />
      </Box>

      <IconButton onClick={onClose}>
        <CloseIcon />
      </IconButton>
    </Box>
  );
}
