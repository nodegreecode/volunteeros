import { useMyParticipations } from "@/features/volunteer/volHooks.ts";
import { Stack } from "@mui/material";
import Loading from "@/components/common/Loading";
import ApplicationCard from "@/features/volunteer/components/ApplicationCard.tsx";

export default function ApplicationList() {

  const { data: myParticipations, isLoading  } = useMyParticipations();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Stack spacing={2}>
      {myParticipations?.map((application) => (
        <ApplicationCard key={application.id} application={application} />
      ))}
    </Stack>
  );
}
