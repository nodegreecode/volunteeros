import type { Organization } from "@/features/admin/adminTypes.ts";
import OrganizationStats from "@/features/organization/components/OrganizaitonOverview/OrganizationStats.tsx";
import OrganizationDetailsCard from "@/features/organization/components/OrganizaitonOverview/OrganizationDetailsCard.tsx";
import EditOrganizationDialog from "@/features/organization/components/OrganizaitonOverview/EditOrganizationDialog";
import { useState } from "react";

export default function OrganizationOverview({
  organization,
}: {
  organization: Organization;
}) {
  const [editOpen, setEditOpen] = useState();

  return (
    <>
      <OrganizationStats organization={organization} />

      <OrganizationDetailsCard
        organization={organization}
        onEdit={() => setEditOpen(true)}
      />

      <EditOrganizationDialog
        open={editOpen}
        organization={organization}
        onClose={() => setEditOpen(false)}
      />
    </>
  );
}
