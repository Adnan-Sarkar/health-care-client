"use client";

import React, {useEffect} from 'react';
import {Box, Button, Grid, Stack, Typography} from "@mui/material";
import KeyIcon from "@mui/icons-material/Key";
import CustomForm from "@/components/Forms/CustomForm";
import {FieldValues} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {toast} from "sonner";
import CustomInputField from "@/components/Forms/CustomInputField";
import deleteCookies from "@/services/actions/deleteCookies";
import {useRouter, useSearchParams} from "next/navigation";
import {authKey} from "@/constants/authKey";
import {useResetPasswordMutation} from "@/redux/api/authApi";

const validationSchema = z.object({
    newPassword: z.string().min(6, 'Must be at least 6 characters long'),
});

const Page = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const token = searchParams.get('token');
    const router = useRouter();

    const [resetPassword] = useResetPasswordMutation();

    useEffect(() => {
        if (!token) return;
        localStorage.setItem(authKey, token);
    }, [token]);

    const onSubmit = async (values: FieldValues) => {
        console.log(values);
        const updatedData = {...values, id};

        try {
            const res = await resetPassword(updatedData);

            if ('data' in res && res.data.status === 200) {
                toast.success('Password Reset Successful');
                localStorage.removeItem(authKey);
                deleteCookies([authKey, 'refreshToken']);
                router.push('/login');
            } else {
                throw new Error('Something Went Wrong, Try Again');
            }
        } catch (error) {
            toast.error('Something Went Wrong, Try Again');
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
                mt: {xs: 2, md: 10},
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
                <Typography variant='h5' fontWeight={600} sx={{mb: 2}}>
                    Reset password
                </Typography>
            </Stack>
            <CustomForm
                onSubmit={onSubmit}
                defaultValues={{newPassword: ''}}
                resolver={zodResolver(validationSchema)}
            >
                <Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <CustomInputField
                            name='newPassword'
                            type='password'
                            label='New Password'
                            sx={{mb: 2}}
                            fullWidth
                        />
                    </Grid>
                </Grid>

                <Button type='submit' sx={{width: '100%', my: 2}}>
                    Reset Password
                </Button>
            </CustomForm>
        </Box>
    );
};

export default Page;