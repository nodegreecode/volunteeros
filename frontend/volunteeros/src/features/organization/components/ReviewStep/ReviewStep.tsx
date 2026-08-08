import {Box, Divider, Stack, Typography} from "@mui/material";

export default function ReviewStep({formik}) {
    const values = formik.values;
    return (
        <Stack spacing={2}>
            <Typography variant="h6">
                Review your application
            </Typography>
            <Box>
                <Typography variant="subtitle2">
                    Organization information
                </Typography>
                <Typography>
                    Name: {values.organizationName}
                </Typography>
                <Typography>
                    Type: {values.organizationForm}
                </Typography>
                <Typography>
                    Description: {values.description}
                </Typography>
            </Box>
            <Divider/>
            <Box>
                <Typography variant="subtitle2">
                    Address
                </Typography>
                <Typography>
                    Country: {values.registrationCountry}
                </Typography>
                <Typography>
                    City: {values.city}
                </Typography>
                <Typography>
                    Street: {values.street}
                </Typography>
            </Box>
            <Divider/>
            <Box>
                <Typography variant="subtitle2">
                    Contact
                </Typography>
                <Typography>
                    Email: {values.email}
                </Typography>
                <Typography>
                    Phone: {values.phone}
                </Typography>
                <Typography>
                    Website: {values.website}
                </Typography>
            </Box>
        </Stack>
    );
}