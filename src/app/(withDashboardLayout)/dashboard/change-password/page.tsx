'use client';

import {zodResolver} from '@hookform/resolvers/zod';
import {Box, Button, Grid, Stack, Typography} from '@mui/material';
import KeyIcon from '@mui/icons-material/Key';
import CustomForm from "@/components/Forms/CustomForm";
import CustomInputField from "@/components/Forms/CustomInputField";
import {FieldValues} from "react-hook-form";
import {toast} from "sonner";
import {z} from "zod";
import {useChangePasswordMutation} from "@/redux/api/authApi";
import logoutUser from "@/services/actions/logoutUser";
import {useRouter} from "next/navigation";

const validationSchema = z.object({
    oldPassword: z.string().min(6, 'Must be at least 6 characters long'),
    newPassword: z.string().min(6, 'Must be at least 6 characters long'),
});

const ChangePasswordPage = () => {
    const [changePassword, {error}] = useChangePasswordMutation();
    const router = useRouter();


    const onSubmit = async (values: FieldValues) => {
        try {
            const res = await changePassword(values).unwrap();
            console.log(res)

            if (res?.statusCode === 200) {
                logoutUser(router);
                toast.success('Password Changed Successfully');
                logoutUser(router);
            } else {
                throw new Error('Incorrect Old Password!!');
            }
        } catch (error: any) {
            toast.error(error.message);
        }
    };


    return (
        <Box
            sx={{
                px: 4,
                py: 2,
                maxWidth: 600,
                width: '100%',
                boxShadow: 1,
                borderRadius: 1,
                mx: 'auto',
                mt: {
                    xs: 2,
                    md: 5,
                },
            }}
        >
            <Stack alignItems='center' justifyContent='center'>
                <Box
                    sx={{
                        '& svg': {
                            width: 100,
                            height: 100,
                        },
                    }}
                >
                    <KeyIcon sx={{color: 'primary.main'}}/>
                </Box>
                <Typography variant='h5' fontWeight={600} sx={{mb: 2, mt: -1.5}}>
                    Change password
                </Typography>
            </Stack>
            <CustomForm
                onSubmit={onSubmit}
                defaultValues={{oldPassword: '', newPassword: ''}}
                resolver={zodResolver(validationSchema)}
            >
                <Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <CustomInputField
                            name='oldPassword'
                            type='password'
                            label='Old Password'
                            fullWidth
                            sx={{mb: 2}}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <CustomInputField
                            name='newPassword'
                            type='password'
                            label='New Password'
                            fullWidth
                            sx={{mb: 2}}
                        />
                    </Grid>
                </Grid>

                <Button type='submit' sx={{width: '100%', my: 2}}>
                    Change Password
                </Button>
            </CustomForm>
        </Box>
    );

};

export default ChangePasswordPage;