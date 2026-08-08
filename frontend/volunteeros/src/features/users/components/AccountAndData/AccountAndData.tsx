import {Box, Button, Card, CardContent, Typography} from "@mui/material";

export default function AccountAndData() {
    return <>
        <Card>
            <CardContent sx={{p: 4}}>
                <Box sx={{
                    border: 1,
                    borderColor: "divider",
                    borderRadius: 2,
                    p: 2,
                    backgroundColor: "rgba(211, 47, 47, 0.2)",
                }}>
                    <Typography variant="h5">Account & data</Typography>
                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",

                    }}>
                        <Typography>Delete my account and associated data</Typography>
                        <Button
                            component="label"
                            variant="outlined"
                            color="error"
                            sx={{mt: 1}}
                        >
                            Delete
                        </Button>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    </>
}