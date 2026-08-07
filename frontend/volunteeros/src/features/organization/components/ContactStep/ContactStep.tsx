import {Box, FormControl, InputLabel, MenuItem, Select, Stack, TextField} from "@mui/material";

export default function ContactStep({formik}) {
    return <>
        <Box sx={{display: "flex", gap: 4, mt: 4, alignItems: "flex-start"}}>
            <Stack spacing={2} sx={{flex: 1}}>
                <Box sx={{display: "flex", gap: 2,}}>
                    <TextField
                        name="phone"
                        label="Phone"
                        fullWidth
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                    />
                    <TextField
                        name="email"
                        label="Email"
                        fullWidth
                        value={formik.values.email}
                        onChange={formik.handleChange}
                    />
                </Box>
                <Box sx={{display: "flex", gap: 2,}}>
                    <TextField
                        name="website"
                        label="Website"
                        fullWidth
                        value={formik.values.website}
                        onChange={formik.handleChange}
                    />
                    <FormControl fullWidth>
                        <InputLabel>Your Role</InputLabel>

                        <Select
                            name="memberRole"
                            value={formik.values.memberRole}
                            label="Your Role"
                            onChange={formik.handleChange}
                        >
                            <MenuItem value="OWNER">Owner</MenuItem>
                            <MenuItem value="ADMIN">Administrator</MenuItem>
                            <MenuItem value="MEMBER">Member</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Stack>
        </Box>
    </>
}