import {Avatar, Box, Card, CardContent, Typography, Button} from "@mui/material";
import TextField from "@mui/material/TextField";
import {useFormik} from "formik";
import {useOutletContext} from "react-router-dom";
import {useState} from "react";
import {useEditProfile} from "@/features/users/userHooks";

export default function PersonalInformation() {

    const {user} = useOutletContext();

    const updateProfile = useEditProfile();

    const [isEditing, setIsEditing] = useState(false);

    function handleEditing() {
        if (isEditing) {
            formik.handleSubmit();
        } else {
            setIsEditing(true);
        }
    }

    function handleAvatarChange() {

    }

    const formik = useFormik({
        initialValues: {
            firstName: user.firstName,
            lastName: user.lastName,
            city: user.city,
            phone: user.phone,
            bio: user.bio
        },
        onSubmit: async (values) => {
            console.log(values);
            await updateProfile.mutateAsync({
                values
            })
            setIsEditing(false);
        }
    });
    return <>
        <Card>
            <CardContent sx={{p: 4}}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 2,
                        mb: 4,
                        border: 1,
                        borderColor: "divider",
                        borderRadius: 2,
                        p: 2,
                    }}
                >
                    <Box sx={{display: "flex", alignItems: "center", gap: 2}}>
                        <Avatar
                            src={
                                formik.values.avatar
                                    ? URL.createObjectURL(formik.values.avatar)
                                    : undefined
                            }
                            sx={{
                                width: 80,
                                height: 80,
                            }}
                        />

                        <Box>
                            <Typography variant="subtitle1">
                                {`${user.firstName} ${user.lastName}`}
                            </Typography>
                            <Typography>{user.email}</Typography>

                        </Box>
                    </Box>
                    <Button
                        component="label"
                        variant="outlined"
                        sx={{alignSelf: "center", mt: 0}}
                    >
                        Edit
                        <input
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={handleAvatarChange}
                        />
                    </Button>
                </Box>
                <Box sx={{
                    border: 1,
                    borderColor: "divider",
                    borderRadius: 2,
                    p: 2,
                }}>
                    <Box sx={{display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2}}>
                        <Typography variant="h5">Personal Information</Typography>
                        <Button
                            component="label"
                            variant="outlined"
                            type={isEditing ? "submit" : "button"}
                            sx={{mt: 1}}
                            onClick={handleEditing}
                        >
                            {isEditing ? "Save" : "Edit"}
                        </Button>
                    </Box>

                    <Box component="form" onSubmit={formik.handleSubmit} sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        gap: 2,
                    }}>
                        <TextField
                            label="First name"
                            name="firstName"
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            fullWidth
                            disabled={!isEditing}
                        />

                        <TextField
                            label="Last name"
                            name="lastName"
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            fullWidth
                            disabled={!isEditing}
                        />

                        <TextField
                            label="City"
                            name="city"
                            value={formik.values.city}
                            onChange={formik.handleChange}
                            fullWidth
                            disabled={!isEditing}
                        />

                        <TextField
                            label="Phone"
                            name="phone"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            fullWidth
                            disabled={!isEditing}
                        />

                        <TextField
                            name="bio"
                            label="About me"
                            multiline
                            rows={4}
                            sx={{gridColumn: "1/-1"}}
                            value={formik.values.bio}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={Boolean(
                                formik.touched.bio && formik.errors.bio,
                            )}
                            helperText={
                                formik.touched.bio && formik.errors.bio
                            }
                            fullWidth
                            disabled={!isEditing}
                        />
                    </Box>
                </Box>
            </CardContent>


        </Card>

    </>
}