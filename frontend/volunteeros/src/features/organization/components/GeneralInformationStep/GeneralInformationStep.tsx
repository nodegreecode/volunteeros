import {Avatar, Box, Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField} from "@mui/material";
import logo from "@/assets/planting-flowers.jpg";

export default function GeneralInformationStep({formik}) {
    function handleLogoChange() {

    }

    return <>
        <Box sx={{display: "flex", gap: 4, mt: 4, alignItems: "flex-start"}}>
            <Stack spacing={1} alignItems="center">
                <Avatar
                    src={logo}
                    sx={{
                        width: 120,
                        height: 120
                    }}
                >
                    ORG
                </Avatar>

                <Button
                    variant="outlined"
                    component="label"
                    size="small"
                >
                    Edit Logo
                    <input
                        hidden
                        type="file"
                        accept="image/*"
                        onChange={handleLogoChange}
                    />
                </Button>
            </Stack>


            <Stack spacing={2} sx={{flex: 1}}>
                <Box sx={{display: "flex", gap: 2,}}>
                    <FormControl fullWidth>
                        <InputLabel>Organization Form</InputLabel>
                        <Select
                            name="organizationForm"
                            value={formik.values.organizationForm}
                            label="Organization Form"
                            onChange={formik.handleChange}
                        >
                            <MenuItem value="COMPANY">Company</MenuItem>
                            <MenuItem value="NON_PROFIT">Non-profit</MenuItem>
                            <MenuItem value="COMMUNITY">Community</MenuItem>
                        </Select>
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
        </Box>
    </>
}