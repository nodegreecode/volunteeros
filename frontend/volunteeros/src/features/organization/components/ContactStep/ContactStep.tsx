import {Box, FormControl, InputLabel, MenuItem, Select, Stack, TextField, FormHelperText} from "@mui/material";

export default function ContactStep({formik}) {

    return <>
        <Box sx={{display: "flex", gap: 4, mt: 4, alignItems: "flex-start"}}>
            <Stack spacing={2} sx={{flex: 1}}>
                <Box sx={{display: "flex", gap: 2,}}>
                    <TextField
                        name="phone"
                        label="Phone"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={Boolean(
                            formik.touched.phone && formik.errors.phone,
                        )}
                        helperText={
                            formik.touched.phone && formik.errors.phone
                        }
                        fullWidth
                    />
                    <TextField
                        name="email"
                        label="Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={Boolean(
                            formik.touched.email && formik.errors.email,
                        )}
                        helperText={
                            formik.touched.email && formik.errors.email
                        }
                        fullWidth
                    />
                </Box>
                <Box sx={{display: "flex", gap: 2,}}>
                    <TextField
                        name="website"
                        label="Website"

                        value={formik.values.website}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={Boolean(
                            formik.touched.website && formik.errors.website,
                        )}
                        helperText={
                            formik.touched.website && formik.errors.website
                        }
                        fullWidth
                    />
                    <FormControl error={Boolean(formik.touched.memberRole && formik.errors.memberRole)} fullWidth>
                        <InputLabel>Your Role</InputLabel>

                        <Select
                            name="memberRole"
                            value={formik.values.memberRole}
                            label="Your Role"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={Boolean(
                                formik.touched.memberRole && formik.errors.memberRole,
                            )}
                        >
                            <MenuItem value="OWNER">Owner</MenuItem>
                            <MenuItem value="ADMIN">Administrator</MenuItem>
                            <MenuItem value="MEMBER">Member</MenuItem>
                        </Select>
                        {formik.touched.memberRole && formik.errors.memberRole && (
                            <FormHelperText>
                                {formik.errors.memberRole}
                            </FormHelperText>)}
                    </FormControl>
                </Box>
            </Stack>
        </Box>
    </>
}