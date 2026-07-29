import { Box, Drawer, Divider } from "@mui/material";
import DrawerHeader from "@/features/admin/components/OrganizationDrawer/DrawerHeader.tsx";
import OrganizationInfoCard from "@/features/admin/components/OrganizationDrawer/OrganizationInfoCard.tsx";
import ApplicationsSection from "@/features/admin/components/OrganizationDrawer/ApplicationsSection.tsx";
import NotesSection from "@/features/admin/components/NotesSection.tsx";
import { useUserApplications } from "@/features/admin/adminHooks";
import type { Organization } from "@/features/admin/adminTypes";
import Loading from "@/components/common/Loading.tsx";

type OrganizationDrawerProps = {
  open: boolean;
  organization: Organization | null;
  onClose: () => void;
};

export default function OrganizationDrawer({
  open,
  organization,
  onClose,
}: OrganizationDrawerProps) {
  const { applications, isLoading } = useUserApplications(
    organization?.ownerId,
  );

  if (isLoading) {
    return <Loading />;
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
          {organization && (
            <>
              <DrawerHeader orgName={organization.orgName} onClose={onClose} />
              <OrganizationInfoCard organization={organization} />
              <Divider />
              <ApplicationsSection applications={applications} />
              <Divider />
              <NotesSection />
            </>
          )}
        </Box>
      </Drawer>
    </>
  );
}
