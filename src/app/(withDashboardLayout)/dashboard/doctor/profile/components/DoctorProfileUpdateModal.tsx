import CustomFullScreenModal from "@/components/shared/Modal/CustomFullScreenModal";
import {useGetSingleDoctorQuery, useUpdateDoctorMutation} from "@/redux/api/doctorApi";
import {FieldValues} from "react-hook-form";
import {Button, Grid} from "@mui/material";
import CustomInputField from "@/components/Forms/CustomInputField";
import CustomSelectField from "@/components/Forms/CustomSelectField";
import {Gender} from "@/constants/gender";
import MultipleSelectOptions
    from "@/app/(withDashboardLayout)/dashboard/doctor/profile/components/MultipleSelectOptions";
import CustomForm from "@/components/Forms/CustomForm";
import {useGetAllSpecialtiesQuery} from "@/redux/api/specialtiesApi";
import React, {useEffect, useState} from "react";
import {toast} from "sonner";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";

type TProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    id: string;
};

const validationSchema = z.object({
    experience: z.preprocess(
        (x) => (x ? x : undefined),
        z.coerce.number().int().optional()
    ),
    apointmentFee: z.preprocess(
        (x) => (x ? x : undefined),
        z.coerce.number().int().optional()
    ),
    name: z.string().optional(),
    contactNumber: z.string().optional(),
    registrationNumber: z.string().optional(),
    gender: z.string().optional(),
    qualification: z.string().optional(),
    currentWorkingPlace: z.string().optional(),
    designation: z.string().optional(),
});

const DoctorProfileUpdateModal = ({open, setOpen, id}: TProps) => {
    const [selectedSpecialtiesIds, setSelectedSpecialtiesIds] = useState<string[]>([]);
    const {data: doctorData, refetch, isSuccess} = useGetSingleDoctorQuery(id);
    const {data: allSpecialties} = useGetAllSpecialtiesQuery("");
    const [updateDoctor, {isLoading: updating}] = useUpdateDoctorMutation();

    useEffect(() => {
        if (isSuccess) {
            setSelectedSpecialtiesIds(doctorData.doctorSpecialties?.map((speciality: any) => speciality.specialtiesId));
        }
    }, [isSuccess, doctorData]);

    const handleSubmit = async (values: FieldValues) => {
        const excludedFields: Array<keyof typeof values> = [
            'email',
            'id',
            'role',
            'needPasswordChange',
            'status',
            'createdAt',
            'updatedAt',
            'isDeleted',
            'averageRating',
            'review',
            'profilePhoto',
            'registrationNumber',
            'schedules',
            'doctorSpecialties',
        ];

        const updatedValues = Object.fromEntries(Object.entries(values).filter(([key]) => {
            return !excludedFields.includes(key);
        }))

        updatedValues.specialties = selectedSpecialtiesIds.map((specialtiesId: string) => ({
            specialtiesId,
            isDeleted: false
        }));

        try {
            const res = await updateDoctor({body: updatedValues, id}).unwrap();
            if (res?.id) {
                toast.success("Profile Updated Successfully");
                setOpen(false);
                refetch();
            }
        } catch (error: any) {
            toast.error(error.message);
        }

    }

    return (
        <CustomFullScreenModal title={"Update Profile Information"} open={open}
                               setOpen={setOpen}>
            <CustomForm onSubmit={handleSubmit}
                        defaultValues={doctorData}
                        resolver={zodResolver(validationSchema)}
            >
                <Grid container spacing={2} sx={{my: 5}}>
                    <Grid item xs={12} sm={12} md={4}>
                        <CustomInputField variant={"outlined"} name='name' label='Name' sx={{mb: 2}} fullWidth/>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <CustomInputField
                            name='email'
                            type='email'
                            label='Email'
                            sx={{mb: 2}}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <CustomInputField
                            name='contactNumber'
                            label='Contract Number'
                            sx={{mb: 2}}

                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <CustomInputField
                            name='address'
                            label='Address'
                            sx={{mb: 2}}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <CustomInputField
                            name='registrationNumber'
                            label='Registration Number'
                            sx={{mb: 2}}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <CustomInputField
                            name='experience'
                            type='number'
                            label='Experience'
                            sx={{mb: 2}}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <CustomSelectField
                            items={Gender}
                            name='gender'
                            label='Gender'
                            sx={{mb: 2}}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <CustomInputField
                            name='apointmentFee'
                            type='number'
                            label='ApointmentFee'
                            sx={{mb: 2}}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <CustomInputField
                            name='qualification'
                            label='Qualification'
                            sx={{mb: 2}}
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12} sm={12} md={4}>
                        <CustomInputField
                            name='currentWorkingPlace'
                            label='Current Working Place'
                            sx={{mb: 2}}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <CustomInputField
                            name='designation'
                            label='Designation'
                            sx={{mb: 2}}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <MultipleSelectOptions
                            allSpecialties={allSpecialties}
                            selectedIds={selectedSpecialtiesIds}
                            setSelectedIds={setSelectedSpecialtiesIds}
                        />
                    </Grid>
                </Grid>

                <Button type='submit' disabled={updating}>
                    Update Profile
                </Button>
            </CustomForm>
        </CustomFullScreenModal>
    );
};

export default DoctorProfileUpdateModal;