"use client"

import CustomForm from "@/components/Forms/CustomForm";
import {Button, Grid, Typography, Box, CircularProgress} from "@mui/material";
import CustomInputField from "@/components/Forms/CustomInputField";
import CustomSelectField from "@/components/Forms/CustomSelectField";
import {Gender} from "@/constants/gender";
import {FieldValues} from "react-hook-form";
import {useRouter} from "next/navigation";
import {useGetSingleDoctorQuery, useUpdateDoctorMutation} from "@/redux/api/doctorApi";
import {toast} from "sonner";

type TParams = {
    params: {
        doctorId: string;
    }
}

const DoctorUpdatePage = ({params}: TParams) => {

    const router = useRouter();

    const id = params?.doctorId;

    const { data, isLoading } = useGetSingleDoctorQuery(id);
    const [updateDoctor] = useUpdateDoctorMutation();

    const handleFormSubmit = async (values: FieldValues) => {
        values.experience = Number(values.experience);
        values.apointmentFee = Number(values.apointmentFee);
        values.id = id;

        try {
            const res = await updateDoctor({ id: values.id, body: values }).unwrap();
            if (res?.id) {
                toast.success("Doctor Updated Successfully");
                router.push(`/dashboard/admin/doctors`);
            }
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    const defaultValues = {
        email: data?.email || "",
        name: data?.name || "",
        contactNumber: data?.contactNumber || "",
        address: data?.address || "",
        registrationNumber: data?.registrationNumber || "",
        gender: data?.gender || "",
        experience: data?.experience || 0,
        apointmentFee: data?.apointmentFee || 0,
        qualification: data?.qualification || "",
        currentWorkingPlace: data?.currentWorkingPlace || "",
        designation: data?.designation || "",
    };

    return (
        <Box>
            <Typography component="h5" variant="h5">
                Update Doctor Info
            </Typography>
            {isLoading ? (
                <CircularProgress />
            ) : (
                <CustomForm
                    onSubmit={handleFormSubmit}
                    defaultValues={data && defaultValues}
                >
                    <Grid container spacing={2} sx={{ my: 5 }}>
                        <Grid item xs={12} sm={12} md={4}>
                            <CustomInputField
                                name="name"
                                label="Name"
                                fullWidth={true}
                                sx={{ mb: 2 }}
                             variant={"outlined"}

                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={4}>
                            <CustomInputField
                                name="email"
                                type="email"
                                label="Email"
                                fullWidth={true}
                                sx={{ mb: 2 }}
                                variant={"outlined"}
                            />
                        </Grid>

                        <Grid item xs={12} sm={12} md={4}>
                            <CustomInputField
                                name="contactNumber"
                                label="Contract Number"
                                fullWidth={true}
                                sx={{ mb: 2 }}
                                variant={"outlined"}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={4}>
                            <CustomInputField
                                name="address"
                                label="Address"
                                fullWidth={true}
                                sx={{ mb: 2 }}
                                variant={"outlined"}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={4}>
                            <CustomInputField
                                name="registrationNumber"
                                label="Registration Number"
                                fullWidth={true}
                                sx={{ mb: 2 }}
                                variant={"outlined"}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={4}>
                            <CustomInputField
                                name="experience"
                                type="number"
                                label="Experience"
                                fullWidth={true}
                                sx={{ mb: 2 }}
                                variant={"outlined"}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={4}>
                            <CustomSelectField
                                items={Gender}
                                name="gender"
                                label="Gender"
                                sx={{ mb: 2 }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={4}>
                            <CustomInputField
                                name="apointmentFee"
                                type="number"
                                label="ApointmentFee"
                                fullWidth={true}
                                sx={{ mb: 2 }}
                                variant={"outlined"}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={4}>
                            <CustomInputField
                                name="qualification"
                                label="Qualification"
                                fullWidth={true}
                                sx={{ mb: 2 }}
                                variant={"outlined"}
                            />
                        </Grid>

                        <Grid item xs={12} sm={12} md={4}>
                            <CustomInputField
                                name="currentWorkingPlace"
                                label="Current Working Place"
                                fullWidth={true}
                                sx={{ mb: 2 }}
                                variant={"outlined"}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={4}>
                            <CustomInputField
                                name="designation"
                                label="Designation"
                                fullWidth={true}
                                sx={{ mb: 2 }}
                                variant={"outlined"}
                            />
                        </Grid>
                    </Grid>

                    <Button type="submit">Update</Button>
                </CustomForm>
            )}
        </Box>
    );
};

export default DoctorUpdatePage;