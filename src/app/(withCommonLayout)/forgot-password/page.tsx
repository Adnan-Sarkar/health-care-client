import React from 'react';
import {Alert, Box, Button, Grid, Stack, Typography} from "@mui/material";
import KeyIcon from "@mui/icons-material/Key";
import CheckIcon from '@mui/icons-material/Check';
import CustomForm from "@/components/Forms/CustomForm";
import CustomInputField from "@/components/Forms/CustomInputField";
import {zodResolver} from "@hookform/resolvers/zod";
import {FieldValues} from "react-hook-form";
import {toast} from "sonner";
import {z} from "zod";
import {useForgotPasswordMutation} from "@/redux/api/authApi";

const validationSchema = z.object({
    email: z.string().email('Please enter a valid email address!'),
});

const Page = () => {
    const [forgotPassword, isSuccess] = useForgotPasswordMutation();

    const onSubmit = async (values: FieldValues) => {
        try {
            const res = await forgotPassword(values);

            if ('data' in res && res.data.status === 200) {
                toast.success('Check Your Email for Reset Link');
            } else {
                throw new Error('Something Went Wrong, Try Again');
            }
        } catch (error: any) {
            toast.error(error.message);
        }
    };
    return (
        <Stack
            sx={{
                alignItems: 'center',
                justifyContent: 'center',
                height: {sm: '100vh'},
            }}
        >
            <Box
                sx={{
                    px: 4,
                    py: 2,
                    maxWidth: 600,
                    width: '100%',
                    boxShadow: 1,
                    borderRadius: 1,
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
                        Forgot password
                    </Typography>
                </Stack>

                {isSuccess && (
                    <Box>
                        <Alert
                            icon={<CheckIcon fontSize='inherit'/>}
                            severity='success'
                        >
                            An Email with reset password link was sent to your email
                        </Alert>
                    </Box>
                )}

                {!isSuccess && (
                    <CustomForm
                        onSubmit={onSubmit}
                        defaultValues={{email: ''}}
                        resolver={zodResolver(validationSchema)}
                    >
                        <Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                <CustomInputField
                                    name='email'
                                    type='email'
                                    label='Your email'
                                    sx={{mb: 2}}
                                    fullWidth
                                />
                            </Grid>
                        </Grid>

                        <Button type='submit' sx={{width: '100%', my: 2}}>
                            forgot Password
                        </Button>
                    </CustomForm>
                )}
            </Box>
        </Stack>
    );
};

export default Page;