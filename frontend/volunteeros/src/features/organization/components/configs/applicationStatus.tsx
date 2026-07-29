const statusConfig = {
  PENDING: {
    title: "Application Under Review",
    chipColor: "warning",
    iconColor: "warning",
    message:
      "Your organization application is currently being reviewed. You will receive a notification after the review is completed.",
  },

  REJECTED: {
    title: "Application Rejected",
    chipColor: "error",
    iconColor: "error",
    message:
      "Your organization application was rejected. Please review the feedback and submit again.",
  },

  APPROVED: {
    title: "Application Approved",
    chipColor: "success",
    iconColor: "success",
    message: "Your organization application has been approved.",
  },
} as const;
