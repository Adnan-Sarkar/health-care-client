"use client"

import {useGetMyProfileQuery, useUpdateMyProfileMutation} from "@/redux/api/profileApi";
import {Box, Button, CircularProgress, Container, Stack} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import Image from "next/image";
import Avatar from "@mui/material/Avatar";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import EditIcon from '@mui/icons-material/Edit';
import DoctorProfileInformation
    from "@/app/(withDashboardLayout)/dashboard/doctor/profile/components/DoctorProfileInformation";
import AutoFileUploader from "@/components/Forms/AutoFileUploader";
import DoctorProfileUpdateModal
    from "@/app/(withDashboardLayout)/dashboard/doctor/profile/components/DoctorProfileUpdateModal";
import React from "react";


const Page = () => {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const {data, isLoading} = useGetMyProfileQuery("");
    const [updateProfile, {isLoading: updating}] = useUpdateMyProfileMutation();

    const handleProfilePictureUpload = (file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('data', JSON.stringify({}));

        updateProfile(formData);
    };

    if (isLoading) {
        return <CircularProgress color="secondary"/>
    }
    return (
        <>
            <DoctorProfileUpdateModal open={isOpen} setOpen={setIsOpen} id={data?.id}/>
            <Container>
                <Grid container spacing={4} mt={4}>
                    <Grid xs={12} md={4}>
                        <Box sx={{
                            height: 300,
                            width: "100%",
                            overflow: "hidden",
                            borderRadius: 1,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            {
                                data?.profilePhoto ?
                                    <Image src={data?.profilePhoto} alt={"Profile photo"} width={300} height={300}/>
                                    : <Avatar/>
                            }
                        </Box>
                        <Stack direction={"column"} mt={6} gap={3}>
                            <Box sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                {
                                    updating ? <p>Uploading...</p> :
                                        <AutoFileUploader
                                            name='file'
                                            label='Choose Your Profile Photo'
                                            icon={<CloudUploadIcon/>}
                                            onFileUpload={handleProfilePictureUpload}
                                            variant='contained'
                                            sx={{width: "300px"}}
                                        />
                                }
                            </Box>
                            <Box sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <Button startIcon={<EditIcon/>} onClick={() => setIsOpen(true)} sx={{width: "300px"}}>
                                    Edit Profile Information
                                </Button>
                            </Box>
                        </Stack>
                    </Grid>
                    <Grid xs={12} md={8}>
                        <DoctorProfileInformation data={data}/>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default Page;