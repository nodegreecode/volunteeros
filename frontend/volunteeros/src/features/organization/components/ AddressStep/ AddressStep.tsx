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
                            value={formik.values.registrationNumber}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={Boolean(
                                formik.touched.registrationNumber && formik.errors.registrationNumber,
                            )}
                            helperText={
                                formik.touched.registrationNumber && formik.errors.registrationNumber
                            }
                            fullWidth
                        />
                        <TextField
                            name="registrationCountry"
                            label="Registration Country"
                            value={formik.values.registrationCountry}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={Boolean(
                                formik.touched.registrationCountry && formik.errors.registrationCountry,
                            )}
                            helperText={
                                formik.touched.registrationCountry && formik.errors.registrationCountry
                            }
                            fullWidth
                        />
                    </Box>
                    <Box sx={{display: "flex", gap: 2,}}>

                        <TextField
                            name="city"
                            label="City"
                            value={formik.values.city}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={Boolean(
                                formik.touched.city && formik.errors.city,
                            )}
                            helperText={
                                formik.touched.city && formik.errors.city
                            }
                            fullWidth
                        />

                        <TextField
                            name="street"
                            label="Street"
                            value={formik.values.street}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={Boolean(
                                formik.touched.street && formik.errors.street,
                            )}
                            helperText={
                                formik.touched.street && formik.errors.street
                            }
                            fullWidth
                        />


                    </Box>
                </Stack>
            </Box>
        </>
    );
}