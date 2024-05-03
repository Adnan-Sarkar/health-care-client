"use client";

import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import assets from "@/assets";
import Link from "next/link";
import { modifyPayload } from "@/utils/modifypayload";
import { registerPatient } from "@/services/actions/registerPatient";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import CustomForm from "@/components/Forms/CustomForm";
import CustomInputField from "@/components/Forms/CustomInputField";
import { FieldValues } from "react-hook-form";

const RegisterPage = () => {
  const router = useRouter();

  const handleRegistration = async (values: FieldValues) => {
    const data = modifyPayload(values);
    try {
      const res = await registerPatient(data);
      if (res?.success) {
        toast.success(res.message);
        router.push("/login");
      } else {
        throw new Error(res?.message);
      }
    } catch (error: any) {
      console.log(error?.message);
    }
  };

  return (
    <Container>
      <Stack
        sx={{
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: "600px",
            width: "100%",
            boxShadow: 1,
            borderRadius: 1,
            p: 4,
            textAlign: "center",
          }}
        >
          <Stack
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box>
              <Image src={assets.svgs.logo} alt="logo" width={50} height={50} />
            </Box>
            <Box>
              <Typography variant="h6" fontWeight={600}>
                Patient Registration
              </Typography>
            </Box>
          </Stack>
          <Box>
            <CustomForm onSubmit={handleRegistration}>
              <Grid container spacing={3} my={1}>
                <Grid item sm={12}>
                  <CustomInputField
                    variant="outlined"
                    label={"Name"}
                    fullWidth={true}
                    name="patient.name"
                  />
                </Grid>
                <Grid item sm={6}>
                  <CustomInputField
                    variant="outlined"
                    label={"Email"}
                    type="email"
                    fullWidth={true}
                    name="patient.email"
                  />
                </Grid>
                <Grid item sm={6}>
                  <CustomInputField
                    variant="outlined"
                    label={"Password"}
                    type="password"
                    fullWidth={true}
                    name="password"
                  />
                </Grid>
                <Grid item sm={6}>
                  <CustomInputField
                    variant="outlined"
                    label={"Contact Number"}
                    type="tel"
                    fullWidth={true}
                    name="patient.contactNumber"
                  />
                </Grid>
                <Grid item sm={6}>
                  <CustomInputField
                    variant="outlined"
                    label={"Address"}
                    fullWidth={true}
                    name="patient.address"
                  />
                </Grid>
              </Grid>
              <Button type="submit" fullWidth sx={{ my: 2 }}>
                Register
              </Button>
              <Typography component="p" fontWeight={300}>
                Do you already have an account?{" "}
                <Link href="/login">
                  <Typography
                    component="span"
                    fontWeight={500}
                    sx={{ color: "primary.main" }}
                  >
                    Login
                  </Typography>
                </Link>
              </Typography>
            </CustomForm>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default RegisterPage;
