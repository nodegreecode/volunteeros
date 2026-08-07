import {Avatar, Box, Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField} from "@mui/material";
import logo from "@/assets/planting-flowers.jpg";

export default function AddressStep({formik}) {
    return (
        <>
            <Box sx={{display: "flex", gap: 4, mt: 4, alignItems: "flex-start"}}>
                <Stack spacing={2} sx={{flex: 1}}>
                    <Box sx={{display: "flex", gap: 2,}}>
                        <TextField
                            name="registrationNumber"
                            label="Registration Number"
                            fullWidth
                            value={formik.values.registrationNumber}
                            onChange={formik.handleChange}
                        />
                        <TextField
                            name="registrationCountry"
                            label="Registration Country"
                            fullWidth
                            value={formik.values.registrationCountry}
                            onChange={formik.handleChange}
                        />
                    </Box>
                    <Box sx={{display: "flex", gap: 2,}}>

                        <TextField
                            name="city"
                            label="City"
                            fullWidth
                            value={formik.values.city}
                            onChange={formik.handleChange}
                        />

                        <TextField
                            name="street"
                            label="Street"
                            fullWidth
                            value={formik.values.street}
                            onChange={formik.handleChange}
                        />


                    </Box>
                </Stack>
            </Box>
        </>
    );
}