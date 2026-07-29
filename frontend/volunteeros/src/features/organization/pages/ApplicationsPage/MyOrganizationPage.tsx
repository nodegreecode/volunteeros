import { useState } from "react";
import {
  useApplication,
  useOrganization,
} from "@/features/organization/orgHooks";
import OrganizationPending from "@/features/organization/components/OrganizationPending.tsx";
import OrganizationEmpty from "@/features/organization/components/OrganizationEmpty.tsx";
import OrganizationOverview from "@/features/organization/components/OrganizationOverview.tsx";
import OrganizationRejected from "@/features/organization/components/OrganizationRejected.tsx";
import Loading from "@/components/common/Loading.tsx";

export default function MyOrganizationPage() {
  const { organization, isLoading: organizationLoading } = useOrganization();
  const { application, isLoading: applicationLoading } = useApplication();

  const [showApplicationForm, setShowApplicationForm] = useState();

  function handleSubmitAgain() {
    setShowApplicationForm(false);
  }

  function handleApplyAgain() {
    setShowApplicationForm(true);
  }

  if (organizationLoading || applicationLoading) {
    return <Loading />;
  }

  if (!application && !organization) {
    return <OrganizationEmpty onSubmitAgain={handleSubmitAgain} />;
  }

  if (showApplicationForm) {
    return <OrganizationEmpty onSubmitAgain={handleSubmitAgain} />;
  }

  switch (application?.applicationStatus) {
    case "PENDING":
      return <OrganizationPending application={application} />;

    case "APPROVED":
      return <OrganizationOverview organization={organization} />;

    case "REJECTED":
      return (
        <OrganizationRejected
          application={application}
          onApplyAgain={handleApplyAgain}
        />
      );

    default:
      return <OrganizationEmpty onSubmitAgain={handleSubmitAgain} />;
  }
}
