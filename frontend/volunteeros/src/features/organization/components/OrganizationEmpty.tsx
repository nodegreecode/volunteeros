import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Stack,
  Typography,
} from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import {
  useApplyApplication,
  useApplication,
} from "@/features/organization/orgHooks.ts";
import { type FormikHelpers, useFormik } from "formik";
import { type ApplicationRequestDto } from "@/features/organization/orgApi.ts";
import { useProfile } from "@/features/auth/authHooks.ts";
import { useState } from "react";
import OrganizationApplicationForm from "@/features/organization/components/OrganizationApplicationForm/OrganizationApplicationForm.tsx";

interface OrganizationEmptyProps {
  onSubmitAgain: () => void;
}

export default function OrganizationEmpty({ onSubmitAgain }) {
  const [showForm, setShowForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { data: user } = useProfile();
  const applyMutation = useApplyApplication();

  const formik = useFormik({
    initialValues: {
      organizationForm: "",
      organizationName: "",
      description: "",
      memberRole: "",
    },
    onSubmit: async (values, helper: FormikHelpers<typeof initialValues>) => {
      if (!user) {
        return;
      }

      const payload: ApplicationRequestDto = {
        userId: user.id,
        organizationForm: values.organizationForm,
        organizationName: values.organizationName,
        description: values.description,
        memberRole: values.memberRole,
      };

      try {
        await applyMutation.mutateAsync(payload);
        helper.resetForm();
        onSubmitAgain();
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage("Something went wrong. Please try again.");
        }
      }
    },
  });

  if (!showForm) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Card
          variant="outlined"
          sx={{
            maxWidth: 600,
            width: "100%",
            borderStyle: "dashed",
            borderColor: "grey.400",
            backgroundColor: "grey.50",
          }}
        >
          <CardContent>
            <Stack
              spacing={2}
              alignItems="center"
              justifyContent="center"
              sx={{ py: 5 }}
            >
              <Button
                variant="outlined"
                onClick={() => setShowForm(true)}
                sx={{
                  minWidth: 56,
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  fontSize: "2rem",
                  lineHeight: 1,
                }}
              >
                +
              </Button>

              <Typography variant="h6">Create your organization</Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                textAlign="center"
              >
                Start by submitting an application to create or join an
                organization.
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <Card sx={{ maxWidth: 600, width: "100%" }}>
          <CardContent>
            <Box>
              <BusinessIcon sx={{ fontSize: 60, mb: 2 }} color="primary" />

              <Typography variant="h5">
                You don't have an organization yet
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Submit an application to create or join an organization.
              </Typography>
            </Box>

            <OrganizationApplicationForm
              form={formik.values}
              onChange={formik.handleChange}
              onSubmit={formik.handleSubmit}
              isSubmitting={applyMutation.isPending}
            />
          </CardContent>
        </Card>
      </Box>
    </>
  );
}
