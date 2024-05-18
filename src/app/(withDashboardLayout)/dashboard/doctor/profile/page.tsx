"use client"

import {useGetMyProfileQuery, useUpdateMyProfileMutation} from "@/redux/api/profileApi";
import {Box, CircularProgress, Container} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import Image from "next/image";
import Avatar from "@mui/material/Avatar";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import DoctorProfileInformation
    from "@/app/(withDashboardLayout)/dashboard/doctor/profile/components/DoctorProfileInformation";
import AutoFileUploader from "@/components/Forms/AutoFileUploader";


const Page = () => {
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
        <Container>
            <Grid container spacing={2}>
                <Grid xs={12} md={4}>
                    <Box sx={{
                        height: 300,
                        width: "100%",
                        overflow: "hidden",
                        borderRadius: 1
                    }}>
                        {
                            data?.profilePhoto ?
                                <Image src={data?.profilePhoto} alt={"Profile photo"} width={300} height={300}/>
                                : <Avatar/>
                        }
                    </Box>
                    <Box my={3}>
                        {
                            updating ? <p>Uploading...</p> :
                                <AutoFileUploader
                                    name='file'
                                    label='Choose Your Profile Photo'
                                    icon={<CloudUploadIcon/>}
                                    onFileUpload={handleProfilePictureUpload}
                                    variant='contained'
                                />
                        }
                    </Box>
                </Grid>
                <Grid xs={12} md={8}>
                    <DoctorProfileInformation data={data}/>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Page;