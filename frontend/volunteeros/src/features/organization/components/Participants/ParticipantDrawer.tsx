import { Box, Drawer, Divider } from "@mui/material";
import { useState, useEffect } from "react";
import ParticipantDrawerHeader from "./ParticipantDrawerHeader";
import ParticipantInfoCard from "./ParticipantInfoCard";
import ParticipationActions from "./ParticipationActions";

import type { Participant } from "@/features/organization/components/Participants/ParticipationTable";
import { useUpdateParticipationStatus } from "@/features/organization/orgHooks.ts";

type ParticipantDrawerProps = {
  open: boolean;
  participant: Participant | null;
  onClose: () => void;
};
enum ParticipationStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  CANCELLED = "CANCELLED",
}

export default function ParticipantDrawer({
  open,
  participant,
  onClose,
}: ParticipantDrawerProps) {
  const [currentParticipant, setCurrentParticipant] =
    useState<Participant | null>(participant);

  useEffect(() => {
    setCurrentParticipant(participant);
  }, [participant]);

  const { mutate: updateParticipationStatus, isPending } =
    useUpdateParticipationStatus();

  function handleStatusUpdate(
    participantId: number,
    status: ParticipationStatus,
  ) {
    updateParticipationStatus(
      {
        participationId: participantId,
        status: status,
      },
      {
        onSuccess: () => {
          setCurrentParticipant((prev) =>
            prev
              ? {
                  ...prev,
                  status,
                }
              : prev,
          );
        },
      },
    );
  }

  return (
    <>
      <Drawer anchor="right" open={open} onClose={onClose}>
        <Box
          sx={{
            width: 500,
            p: 3,
          }}
        >
          {participant && (
            <>
              <ParticipantDrawerHeader
                participant={currentParticipant}
                onClose={onClose}
              />

              <Divider sx={{ my: 2 }} />
              <ParticipantInfoCard participant={participant} />
              <Divider sx={{ my: 2 }} />
              <ParticipationActions
                onApprove={() =>
                  handleStatusUpdate(
                    participant.id,
                    ParticipationStatus.APPROVED,
                  )
                }
                onReject={() =>
                  handleStatusUpdate(
                    participant.id,
                    ParticipationStatus.REJECTED,
                  )
                }
                participant={participant}
                isPending={isPending}
              />
            </>
          )}
        </Box>
      </Drawer>
    </>
  );
}
