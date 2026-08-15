import {
    Card,
    CardContent,
    Typography,
    Button,
    Divider,
    Box,
    IconButton,
    Avatar,
    Stack,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import SettingsIcon from "@mui/icons-material/Settings";

import type {Organization} from "@/features/admin/adminTypes.ts";
import {useUploadLogo} from "@/features/organization/orgHooks.ts";

interface Props {
    organization: Organization;
    onEdit: () => void;
}

export default function OrganizationDetailsCard({
                                                    organization,
                                                    onEdit,
                                                }: Props) {

    const uploadLogo = useUploadLogo();

    function handleLogoChange(event) {
        const file = event.target.files[0];

        uploadLogo.mutateAsync(file);
    }

    return (
        <Card sx={{flex: 1, backgroundColor: "#F1F2F7",}}>
            <CardContent>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 2,
                        mb: 4,
                        borderRadius: 2,
                        p: 2,
                    }}
                >
                    <Box sx={{display: "flex", alignItems: "center", gap: 2}}>
                        <Avatar
                            src={organization?.avatar.url || undefined}
                            sx={{
                                width: 80,
                                height: 80,
                            }}
                        />
                    </Box>
                    <Button
                        component="label"
                        variant="outlined"
                        sx={{alignSelf: "center", mt: 0}}
                        disabled={uploadLogo.isPending}
                    >
                        {uploadLogo.isPending ? "Uploading..." : "Edit"}
                        <input
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={handleLogoChange}
                        />
                    </Button>
                </Box>

                <Typography variant="subtitle1">
                    {organization.orgName}
                </Typography>

                <Typography>
                    {organization.description}
                </Typography>

                <Divider sx={{my: 3}}/>
                <Stack direction="row" spacing={2}>
                    <IconButton onClick={onEdit} aria-label="Organization settings">
                        <SettingsIcon/>
                    </IconButton>
                    <Button variant="outlined" onClick={onEdit}>
                        Details
                    </Button>
                </Stack>

            </CardContent>
        </Card>
    );
}
