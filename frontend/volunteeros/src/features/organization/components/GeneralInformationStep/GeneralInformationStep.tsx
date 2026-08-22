import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    FormHelperText
} from "@mui/material";


export default function GeneralInformationStep({formik}) {

    return <>
        <Stack spacing={2} sx={{flex: 1}}>
            <Box sx={{display: "flex", gap: 2,}}>
                <FormControl error={Boolean(formik.touched.organizationForm && formik.errors.organizationForm)}
                             fullWidth>
                    <InputLabel>Organization Form</InputLabel>
                    <Select
                        name="organizationForm"
                        value={formik.values.organizationForm}
                        label="Organization Form"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={Boolean(
                            formik.touched.organizationForm && formik.errors.organizationForm,
                        )}
                    >
                        <MenuItem value="COMPANY">Company</MenuItem>
                        <MenuItem value="NON_PROFIT">Non-profit</MenuItem>
                        <MenuItem value="COMMUNITY">Community</MenuItem>
                    </Select>
                    {
                        formik.touched.organizationForm && formik.errors.organizationForm && (
                            <FormHelperText>
                                {formik.errors.organizationForm}
                            </FormHelperText>)
                    }
                </FormControl>
                <TextField
                    label="Organization Name"
                    name="organizationName"
                    type="text"
                    value={formik.values.organizationName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={Boolean(
                        formik.touched.organizationName && formik.errors.organizationName,
                    )}
                    helperText={
                        formik.touched.organizationName && formik.errors.organizationName
                    }
                    fullWidth
                />
            </Box>

            <TextField
                name="description"
                label="Description"
                multiline
                rows={4}
                fullWidth
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={Boolean(
                    formik.touched.description && formik.errors.description,
                )}
                helperText={
                    formik.touched.description && formik.errors.description
                }
            />
        </Stack>
    </>
}