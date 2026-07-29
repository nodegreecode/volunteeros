import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
} from "@mui/material";
import { useFormik } from "formik";
import type { OrganizationUpdateRequestDto } from "@/features/organization/orgTypes";
import type { Organization } from "@/features/admin/adminTypes.ts";
import { useEditOrganization } from "@/features/organization/orgHooks.ts";

interface Props {
  open: boolean;
  organization: Organization;
  onClose: () => void;
}

export default function EditOrganizationDialog({
  open,
  organization,
  onClose,
}: Props) {
  const updateOrganization = useEditOrganization();

  const formik = useFormik<OrganizationUpdateRequestDto>({
    initialValues: {
      orgName: organization.orgName ?? "",
      orgForm: organization.orgForm ?? "",
      description: organization.description ?? "",
      website: organization.website ?? "",
      city: organization.city ?? "",
      phone: organization.phone ?? "",
    },
    onSubmit: async (values, { setSubmitting }) => {
      await updateOrganization.mutateAsync({
        organizationId: organization.id,
        values,
      });

      onClose();
    },
  });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <Box component="form" onSubmit={formik.handleSubmit}>
        <DialogTitle>Edit Organization</DialogTitle>

        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            name="orgName"
            value={formik.values.orgName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          <TextField
            label="Form"
            fullWidth
            margin="normal"
            name="orgForm"
            value={formik.values.orgForm}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          <TextField
            label="Description"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          <TextField
            label="Website"
            fullWidth
            margin="normal"
            name="website"
            value={formik.values.website}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          <TextField
            label="City"
            fullWidth
            margin="normal"
            name="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          <TextField
            label="Phone"
            fullWidth
            margin="normal"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>

          <Button
            variant="contained"
            type="submit"
            disabled={updateOrganization.isPending}
          >
            {updateOrganization.isPending ? "Saving..." : "Save"}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
