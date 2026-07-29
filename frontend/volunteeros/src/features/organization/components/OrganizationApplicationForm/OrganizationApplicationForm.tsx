import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

interface OrganizationApplicationFormProps {
  form: {
    organizationName: string;
    organizationForm: string;
    description: string;
    memberRole: string;
  };
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onSubmit: React.SubmitEvent<HTMLFormElement>;
  isSubmitting: boolean;
}

export default function OrganizationApplicationForm({
  form,
  onChange,
  onSubmit,
  isSubmitting,
}: OrganizationApplicationFormProps) {
  return (
    <Box component="form" display="flex" gap={2} mt={3} onSubmit={onSubmit}>
      <TextField
        label="Organization Name"
        name="organizationName"
        type="text"
        value={form.organizationName}
        onChange={onChange}
        fullWidth
      />

      <FormControl fullWidth>
        <InputLabel>Organization Form</InputLabel>

        <Select
          name="organizationForm"
          value={form.organizationForm}
          label="Organization Form"
          onChange={onChange}
        >
          <MenuItem value="COMPANY">Company</MenuItem>
          <MenuItem value="NON_PROFIT">Non-profit</MenuItem>
          <MenuItem value="COMMUNITY">Community</MenuItem>
        </Select>
      </FormControl>

      <TextField
        name="description"
        label="Description"
        multiline
        rows={4}
        fullWidth
        value={form.description}
        onChange={onChange}
      />

      <FormControl fullWidth>
        <InputLabel>Your Role</InputLabel>

        <Select
          name="memberRole"
          value={form.memberRole}
          label="Your Role"
          onChange={onChange}
        >
          <MenuItem value="OWNER">Owner</MenuItem>
          <MenuItem value="ADMIN">Administrator</MenuItem>
          <MenuItem value="MEMBER">Member</MenuItem>
        </Select>
      </FormControl>

      <Button
        type="submit"
        variant="contained"
        size="large"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "  Apply for Organization"}
      </Button>
    </Box>
  );
}
